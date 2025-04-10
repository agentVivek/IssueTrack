import jwt from "jsonwebtoken";
import pool from "../database/db.js";

const protectRoutes = async (req, res, next) => {
    try{
        const token = req.cookies.jwtCookie;
        if(!token){
            return res.status(401).json({error: "Unauthorized:- No token provided"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error: "Invalid Token"});
        }
        const userId = decoded.userID;
        const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [userId]);
        if(rows.length === 0) {
            return res.status(401).json({error: "User does not exist!"});
        }
        req.user = {
            id: rows[0].id,
            name: rows[0].name,
            admission_number: rows[0].admission_number,
            gender: rows[0].gender,
            profilePic: rows[0].profilePic,
            role: rows[0].role
        };
        next();
    } catch(error){
        console.log("Error in ProtectRoutes MiddleWare", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export default protectRoutes;