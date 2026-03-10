import jwt from "jsonwebtoken"
import { type Response } from 'express';

const generateJWTAndSetCookie = async (userId: string, role: string, res: Response) => {
    const token = jwt.sign({userId, role}, process.env.JWT_SECRET as string, {
        expiresIn: "15d",
    });
       // Set the cookie 
    res.cookie("jwtCookie", token, {
        maxAge: 15*24*60*60*1000, // in ms
        httpOnly: true, //Prevent XSS attacks
        sameSite: "strict" //Cross-site request forgery (CSRF) attacks
    });
}

export default generateJWTAndSetCookie;