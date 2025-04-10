import pool from "../database/db.js";

const getAllIssues = async (req, res) => {
    try{
        const query = "SELECT * FROM issues ORDER BY created_at DESC";
        const { rows } = await pool.query(query);
        return res.status(200).json(rows);
    } catch(error){
        console.log("Error in issue Controller", error);
        return res.status(500).json({error: "Server side error in fetching issues"});
    }
} 

const reportIssue = async (req, res) => {
    try{
        const {title, description, user_id} = req.body;
        const query = "INSERT INTO issues (title, description, user_id) VALUES ($1, $2, $3) RETURNING *";
        const values = [title, description, user_id]
        const { rows } = await pool.query(query, values);
        return res.status(201).json(rows[0]);     
    } catch(error){
        console.log("Error in issue Controller", error.message);
        return res.status(500).json({error: "Server side error in reporting issues"});
    }
}

const getIssue = async (req, res) => {
    try{
        const {id : issues_id } = req.params;    
        const query = `SELECT * FROM issues WHERE id = $1`;
        const { rows } = await pool.query(query, [issues_id]);
        if(rows.length === 0){
            return res.status(400).json({ error: "Invalid issue ID" });
        }
        return res.status(200).json(rows[0]);
    } catch (error){
        console.log("Error in issueController", error.message);
        return res.status(500).json({error: "Server side error"});
    }
}

const updateIssue = async (req, res) => {
    try{
        const { id: issue_id } = req.params;
        const {title, description } = req.body;

        const checkQuery = "SELECT * FROM issues WHERE id = $1";
        const { rows: existingIssue } = await pool.query(checkQuery, [issue_id]);
        if (existingIssue.length === 0) {
            return res.status(404).json({ error: "Issue not found" });
        }

        //Check if user is authorised to update or not
        const user_id = req.user.id;
        if(existingIssue[0].user_id !== user_id){
            return res.status(404).json({ error: "Invalid user" });
        }

        const updateQuery = ` UPDATE issues SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *`;
        const values = [title, description, issue_id];
        const { rows } = await pool.query(updateQuery, values);
        return res.status(201).json(rows[0]);
    } catch(error){
        console.log("Error in issues controller", error);
        return res.status(500).json({error: "Servers side error"});
    }
}

const deleteIssue = async (req, res) => {
    try{
        const { id: issue_id } = req.params;
        const checkQuery = "SELECT * FROM issues WHERE id = $1";
        const { rows: existingIssue } = await pool.query(checkQuery, [issue_id]);
        if (existingIssue.length === 0) {
            return res.status(404).json({ error: "Issue does not exist" });
        }

        const user_id = req.user.id;
        if(existingIssue[0].user_id !== user_id){
            return res.status(404).json({ error: "Invalid user" });
        }

        const deleteQuery = "DELETE FROM issues WHERE id=$1";
        await pool.query(deleteQuery, [issue_id]);
        return res.status(200).json({ message: "Issue deleted successfully" });
    } catch (error){
        console.log("Error in issues controller", error);
        return res.status(500).json({error: "Servers side error"});
    }
}
export {getAllIssues, reportIssue, getIssue, updateIssue, deleteIssue};