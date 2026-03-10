import { type Request, type Response } from 'express';
import { client } from '../database/connectToPostgresql.js';
import { type AuthRequest } from '../middlewares/authMiddleware.js';

export const getAllZones = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryText = 'SELECT * FROM zones ORDER BY name ASC;';
    const result = await client.query(queryText);

    res.status(200).json({
      message: "Zones fetched successfully.",
      count: result.rowCount,
      zones: result.rows
    });
  } catch (error) {
    console.error("Error fetching zones:", error);
    res.status(500).json({ error: "Internal server error while fetching zones." });
  }
};

export const getZoneById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid zone ID format." });
      return;
    }

    const queryText = 'SELECT * FROM zones WHERE zone_id = $1;';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Zone not found." });
      return;
    }

    res.status(200).json({
      message: "Zone fetched successfully.",
      zone: result.rows[0]
    });
  } catch (error) {
    console.error("Error fetching zone:", error);
    res.status(500).json({ error: "Internal server error while fetching zone." });
  }
};

export const addZone = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required to add zones." });
      return;
    }
    if (!name) {
      res.status(400).json({ error: "Zone name is required." });
      return;
    }

    const queryText = `
      INSERT INTO zones (name, description) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const result = await client.query(queryText, [name, description || null]);

    res.status(201).json({
      message: "Zone created successfully!",
      zone: result.rows[0]
    });
  } catch (error) {
    console.error("Error adding zone:", error);
    res.status(500).json({ error: "Internal server error while adding zone." });
  }
};

export const deleteZone = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required to delete zones." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid zone ID format." });
      return;
    }

    const queryText = 'DELETE FROM zones WHERE zone_id = $1 RETURNING *;';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Zone not found." });
      return;
    }

    res.status(200).json({
      message: `Zone '${result.rows[0].name}' deleted successfully.`
    });
  } catch (error) {
    console.error("Error deleting zone:", error);
    res.status(500).json({ error: "Internal server error. Ensure no issues are currently linked to this zone before deleting." });
  }
};