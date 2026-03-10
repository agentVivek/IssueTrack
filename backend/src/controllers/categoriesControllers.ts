import { type Request, type Response } from 'express';
import { client } from '../database/connectToPostgresql.js';
import { type AuthRequest } from '../middlewares/authMiddleware.js';


export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
  try {
    const queryText = 'SELECT * FROM categories ORDER BY name ASC;';
    const result = await client.query(queryText);

    res.status(200).json({
      message: "Categories fetched successfully.",
      count: result.rowCount,
      categories: result.rows
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error while fetching categories." });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid category ID format." });
      return;
    }

    const queryText = 'SELECT * FROM categories WHERE category_id = $1;';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    res.status(200).json({
      message: "Category fetched successfully.",
      category: result.rows[0]
    });
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error while fetching category." });
  }
};

export const addCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required to add categories." });
      return;
    }

    if (!name) {
      res.status(400).json({ error: "Category name is required." });
      return;
    }
    const queryText = `
      INSERT INTO categories (name, description) 
      VALUES ($1, $2) 
      RETURNING *;
    `;
    const result = await client.query(queryText, [name, description || null]);

    res.status(201).json({
      message: "Category created successfully!",
      category: result.rows[0]
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ error: "Internal server error while adding category." });
  }
};

export const deleteCategory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required to delete categories." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid category ID format." });
      return;
    }
    const queryText = 'DELETE FROM categories WHERE category_id = $1 RETURNING *;';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Category not found." });
      return;
    }

    res.status(200).json({
      message: `Category '${result.rows[0].name}' deleted successfully.`
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    // A common error here is a Foreign Key Violation (e.g., trying to delete a category that issues are still using)
    res.status(500).json({ error: "Internal server error. Ensure no issues are currently using this category before deleting." });
  }
};