import bcrypt from "bcrypt";
import pool from "../database/db.js";
import generateJWTandSetCookie from "../utils/jwt.js";
const register = async (req, res) => {
    try{ 
        const { name, admission_number, password, confirmPassword, gender} = req.body;
        if(password !== confirmPassword) {
            return res.status(400).json({error: "Password do not match"});
        }
        const { rows } = await pool.query(`SELECT * FROM users WHERE admission_number=$1`, [admission_number]);
        if(rows.length > 0){
            return res.status(401).json({error: "User already exists"});
        }
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
            if(err){
                console.log("Error Hashing Password ", err);
            } else{
            const profilePic = gender==="male" ? `https://avatar.iran.liara.run/public/boy` :  `https://avatar.iran.liara.run/public/girl   `
            const query = "INSERT INTO users (name, admission_number, password, gender, profilePic, role) VALUES ($1, $2, $3, $4, $5, DEFAULT) RETURNING *";
            const values = [name, admission_number, hashedPassword, gender, profilePic];
            try{
                const { rows } = await pool.query(query, values);
                generateJWTandSetCookie(rows[0].id, res); 
                return res.status(201).json({
                    id: rows[0].id,
                    name: rows[0].name,
                    admission_number: rows[0].admission_number,
                    gender: rows[0].gender,
                    profilePic: rows[0].profilePic,
                })
            } catch(error){
                console.log(error);
                return res.status(500).json({error: "Database error"});
            }
            }
        }) 
    }  catch(error){
        console.log("Error in register controller");
        return res.status(500).json({error: "server side error in register"});
    }    
}

const login = async (req, res) => {
    try{
        const { admission_number, password } = req.body;
        const { rows } = await pool.query(`SELECT * FROM users WHERE admission_number=$1`, [admission_number]);
        if (!rows.length || !(await bcrypt.compare(password, rows[0].password))) {
            return res.status(400).json({ error: "Invalid admission number or password" });
        }
        generateJWTandSetCookie(rows[0].id, res);
        return res.status(201).json({
            id: rows[0].id, 
            name: rows[0].name,
            admission_number: rows[0].admission_number,
            gender: rows[0].gender,
            profilePic: rows[0].profilePic,
            role: rows[0].role
        })
    } catch(error){
        console.log("Error in login controller", error);
        return res.status(500).json({error: "server side error in login"});
    }
}

const logout = async (req, res) => {
    try{
        await res.clearCookie("jwtCookie");
        return res.status(200).json({ message: "Logged out successfully"});
    } catch(err){
        console.log("Error in logout controller", err);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

export { register, login, logout };