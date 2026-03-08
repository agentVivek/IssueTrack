import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { client } from '../database/connectToPostgresql.js';
import { redisClient } from '../database/connectToRedis.js';

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

  // 1. Basic Validation
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
    // 2. Check if user already exists in PostgreSQL
    const userCheck = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userCheck.rows.length > 0) {
      res.status(409).json({ error: "Email is already registered." });
      return;
    }

    // 3. Hash the password immediately
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 5. Store user data and OTP in Redis
    // We store the hashed password, NOT the plain text one!
    const cacheData = JSON.stringify({ fullName, email, password: hashedPassword, otp });
    
    // setEx saves the key with an Expiration time (300 seconds = 5 minutes)
    await redisClient.setEx(`signup:${email}`, 300, cacheData);

    // 6. Configure Nodemailer with OAuth2
    const transporter = await createTransporter();

    // 7. Send the Email
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

    // 8. Send Success Response
    res.status(200).json({ 
      message: "OTP sent successfully. Please check your email.",
      email: email 
    });

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Internal server error during signup." });
  }
};

