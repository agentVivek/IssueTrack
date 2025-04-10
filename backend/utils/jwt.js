import jwt from "jsonwebtoken";
import env from "dotenv";
env.config(); 

const generateJWTandSetCookie = (userID, res) => {
    try{
        const token = jwt.sign({userID}, process.env.JWT_SECRET, {
        expiresIn: "30d",
        });
        res.cookie("jwtCookie", token, {
            maxAge: 30*24*60*60*1000,
            httpOnly: true,
            sameSite: "strict",
        });
    } catch(error){
        console.log("JWT generation failed:", error);
        throw new Error("Failed to generate authentication token");
    }
}

export default generateJWTandSetCookie;