import pool from "../database/db.js";

const createSolution = async (req, res) => {
    try{
        if(req.user.role !== "admin"){
            return res.status(400).json({ message: "Access Denied!"});
        } 
        const { issue_id } = req.params;
        const { description } = req.body;
        const createSolutionQuery = "INSERT INTO solutions (issue_id, user_id, description) VALUES ($1, $2, $3) RETURNING *";
        const { rows } = await pool.query(createSolutionQuery, [issue_id, req.user.id, description]);
        return res.status(201).json(rows[0]);
    } catch(error){
        console.log("Error in solution controller", error);
        return res.status(500).json({error: "Server side error"});
    }
}
  
const getSolution = async (req, res) => {
    try{
        const { issue_id } = req.params;
        const getSolutionQuery = "SELECT * FROM solutions WHERE issue_id=$1";
        const { rows } = await pool.query(getSolutionQuery, [issue_id]);
        if(rows.length === 0){
             return res.json({description: null, created_at: null});
        }
        return res.status(201).json(rows[0]);
    } catch(error){
        console.log("Error in solution controller", error);
        return res.status(500).json({error: "Server side error"});
    }
}

export { createSolution, getSolution}