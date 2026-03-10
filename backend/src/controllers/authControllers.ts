import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { client } from '../database/connectToPostgresql.js';
import { redisClient } from '../database/connectToRedis.js';
import generateJWTAndSetCookie from '../utils/jwt.js';

const OAuth2 = google.auth.OAuth2;

// Helper function to dynamically generate the Nodemailer transporter with a fresh Access Token
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.OAUTH_CLIENTID,
    process.env.OAUTH_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.OAUTH_REFRESH_TOKEN as string,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        console.error("Failed to create access token:", err);
        reject("Failed to create access token");
      }
      resolve(token);
    });
  });

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL_USER,
      accessToken: accessToken as string,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
};

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { fullName, email, password, confirmPassword } = req.body;

  if (!fullName || !email || !password || !confirmPassword) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }
  if (!email.endsWith('@iitism.ac.in')) {
    res.status(400).json({ error: "Email must end with @iitism.ac.in" });
    return;
  }
  if (password.length < 6) {
    res.status(400).json({ error: "Password must be at least 6 characters" });
    return;
  }
  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match." });
    return;
  }

  try {
    const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      res.status(409).json({ error: "Email is already registered." });
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const cacheData = JSON.stringify({ fullName, email, password: hashedPassword, otp });
    await redisClient.setEx(`signup:${email}`, 300, cacheData);

    //  Configure Nodemailer with OAuth2
    const transporter = await createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your IssueTrack Account',
      html: `
        <h2>Welcome to IssueTrack, ${fullName}!</h2>
        <p>Your verification OTP is: <strong>${otp}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ 
      message: "OTP sent successfully. Please check your email.",
      email: email 
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error during signup." });
  }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ error: "Email and OTP are required." });
    return;
  }

  try {
    // Fetch the temporarily stored data from Redis
    const cachedDataString = await redisClient.get(`signup:${email}`);

    // If it returns null, the 5 minutes are up or the email is wrong
    if (!cachedDataString) {
      res.status(400).json({ error: "OTP has expired or invalid email. Please sign up again." });
      return;
    }

    const cachedData = JSON.parse(cachedDataString);
    if (cachedData.otp !== otp) {
      res.status(400).json({ error: "Invalid OTP. Please try again." });
      return;
    }

    const insertUserQuery = `
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) 
      RETURNING user_id; 
    `;

    const values = [cachedData.fullName, cachedData.email, cachedData.password];
    
    const result = await client.query(insertUserQuery, values);
    const newUser = result.rows[0];

    // Clean up the cache (Prevent the OTP from being used twice)
    await redisClient.del(`signup:${email}`);

    await generateJWTAndSetCookie(newUser.user_id, 'STUDENT', res);

    res.status(201).json({
      message: "Account verified and created successfully!"
    });

  } catch (error) {
    console.error("OTP Verification Error:", error);
    res.status(500).json({ error: "Internal server error during OTP verification." });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  try {
    const userQuery = await client.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userQuery.rows.length === 0) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    const user = userQuery.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: "Invalid email or password." });
      return;
    }
    await generateJWTAndSetCookie(user.id, 'STUDENT', res);

    res.status(200).json({
      message: "Login successful!"
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal server error during login." });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {    
    res.clearCookie("jwtCookie"); 
    res.status(200).json({message: "Logged out successfully"});
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ error: "Internal server error during logout." });
  }
};

