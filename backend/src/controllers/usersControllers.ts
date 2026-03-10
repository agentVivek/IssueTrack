import { type Request, type Response } from 'express';
import { client } from '../database/connectToPostgresql.js';
import { type AuthRequest } from '../middlewares/authMiddleware.js';
import bcrypt from 'bcrypt'; 

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryText = `
      SELECT 
        user_id, 
        profile_picture_url, 
        name, 
        email, 
        role, 
        status, 
        created_at 
      FROM users 
      ORDER BY created_at DESC;
    `;

    const result = await client.query(queryText);

    res.status(200).json({
      message: "Users fetched successfully",
      count: result.rowCount,
      users: result.rows
    });

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error while fetching users." });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format." });
      return;
    }

    const queryText = `
      SELECT user_id, profile_picture_url, name, email, role, status, created_at 
      FROM users 
      WHERE user_id = $1;
    `;
    
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: "User profile fetched successfully.",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error while fetching user profile." });
  }
};

export const updateUserStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format." });
      return;
    }


    if (status !== 'ACTIVE' && status !== 'DEACTIVATED') {
      res.status(400).json({ error: "Status must be either 'ACTIVE' or 'DEACTIVATED'." });
      return;
    }

    const queryText = `
      UPDATE users 
      SET status = $1 
      WHERE user_id = $2 
      RETURNING user_id, name, email, role, status;
    `;
    
    const result = await client.query(queryText, [status, id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: `User account status updated to ${status}.`,
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating user status:", error);
    res.status(500).json({ error: "Internal server error while updating status." });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, profile_picture_url, password } = req.body;

    if (!req.user) {
      res.status(401).json({ error: "Unauthorized. Please log in." });
      return;
    }

    const isOwner = req.user.id === Number(id);
    const isAdmin = req.user.role === 'ADMIN';

    if (!isOwner && !isAdmin) {
      res.status(403).json({ error: "Access denied. You can only edit your own profile." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid user ID format." });
      return;
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramIndex++}`);
      values.push(name);
    }

    if (profile_picture_url !== undefined) {
      updates.push(`profile_picture_url = $${paramIndex++}`);
      values.push(profile_picture_url);
    }

    if (password !== undefined) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updates.push(`password = $${paramIndex++}`);
      values.push(hashedPassword);
    }

    if (updates.length === 0) {
      res.status(400).json({ error: "No valid fields provided for update." });
      return;
    }

    values.push(id);
    const queryText = `
      UPDATE users 
      SET ${updates.join(', ')} 
      WHERE user_id = $${paramIndex} 
      RETURNING user_id, name, email, profile_picture_url, role, status;
    `;

    const result = await client.query(queryText, values);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "User not found." });
      return;
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      user: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error while updating profile." });
  }
};