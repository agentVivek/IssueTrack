import { type Request, type Response } from 'express';
import { client } from '../database/connectToPostgresql.js';
import { type AuthRequest } from '../middlewares/authMiddleware.js';
export const getIssues = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, limit } = req.query;

    let queryText = 'SELECT * FROM issues';
    const queryParams: any[] = [];
    let paramIndex = 1; 

    if (userId) {
      queryText += ` WHERE user_id = $${paramIndex}`;
      queryParams.push(userId);
      paramIndex++;
    }

    queryText += ' ORDER BY created_at DESC';

    if (limit) {
      const parsedLimit = parseInt(limit as string, 10);
      if (!isNaN(parsedLimit)) {
        queryText += ` LIMIT $${paramIndex}`;
        queryParams.push(parsedLimit);
      }
    }

    const result = await client.query(queryText, queryParams);
    res.status(200).json({
      message: "Issues fetched successfully",
      issues: result.rows
    });

  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Internal server error while fetching issues." });
  }
};

export const sendIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, categoryId, zoneId, imageUrls } = req.body;
    const userId = req.user?.id;

    if (!title || !description || !categoryId || !zoneId) {
      res.status(400).json({ error: "Title, description, categoryId, and zoneId are required." });
      return;
    }

    if (!userId) {
      res.status(401).json({ error: "Unauthorized. User ID is missing." });
      return;
    }

    const insertQuery = `
      INSERT INTO issues (title, description, category_id, zone_id, image_urls, user_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const values = [
      title,
      description,
      categoryId, 
      zoneId,     
      imageUrls || [],
      userId
    ];

    const result = await client.query(insertQuery, values);
    const newIssue = result.rows[0];

    res.status(201).json({
      message: "Issue reported successfully!",
      issue: newIssue
    });

  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ error: "Internal server error while creating the issue." });
  }
};

export const getIssueById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid issue ID format. It must be a number." });
      return;
    }

    const queryText = 'SELECT * FROM issues WHERE issue_id = $1';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found." });
      return;
    }

    res.status(200).json({
      message: "Issue fetched successfully",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Error fetching issue by ID:", error);
    res.status(500).json({ error: "Internal server error while fetching the issue." });
  }
};

export const voteIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: issueId } = req.params;
    const { type } = req.body; // We expect 'upvote' or 'downvote'
    
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized. Please log in to vote." });
      return;
    }

    if (isNaN(Number(issueId))) {
      res.status(400).json({ error: "Invalid issue ID format." });
      return;
    }

    if (type !== 'upvote' && type !== 'downvote') {
      res.status(400).json({ error: "Vote type must be either 'upvote' or 'downvote'." });
      return;
    }

    const columnToUpdate = type === 'upvote' ? 'upvotes' : 'downvotes';
    
    const updateQuery = `
      UPDATE issues 
      SET ${columnToUpdate} = ${columnToUpdate} + 1 
      WHERE issue_id = $1 
      RETURNING issue_id, upvotes, downvotes;
    `;

    const result = await client.query(updateQuery, [issueId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found." });
      return;
    }
    res.status(200).json({
      message: `Issue ${type}d successfully!`,
      votes: result.rows[0]
    });

  } catch (error) {
    console.error("Error voting on issue:", error);
    res.status(500).json({ error: "Internal server error while voting." });
  }
};

export const getIssueComments = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: issueId } = req.params;

    if (isNaN(Number(issueId))) {
      res.status(400).json({ error: "Invalid issue ID format." });
      return;
    }

    const queryText = `
      SELECT * FROM comments 
      WHERE issue_id = $1 
      ORDER BY created_at ASC;
    `;
    
    const result = await client.query(queryText, [issueId]);

    res.status(200).json({
      message: "Comments fetched successfully.",
      count: result.rowCount,
      comments: result.rows
    });

  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Internal server error while fetching comments." });
  }
};

export const addCommentToIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: issueId } = req.params;
    const { content } = req.body;
    
    // We expect the auth middleware to provide the logged-in user's ID
    const userId = req.user?.id; 

    if (!userId) {
      res.status(401).json({ error: "Unauthorized. Please log in to comment." });
      return;
    }

    if (!content || content.trim() === '') {
      res.status(400).json({ error: "Comment content cannot be empty." });
      return;
    }

    if (isNaN(Number(issueId))) {
      res.status(400).json({ error: "Invalid issue ID format." });
      return;
    }

    // A transaction ensures that if the comment insert fails, the count update won't happen, and vice versa.
    await client.query('BEGIN');

    const insertCommentQuery = `
      INSERT INTO comments (issue_id, user_id, content)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const commentResult = await client.query(insertCommentQuery, [issueId, userId, content]);
    const newComment = commentResult.rows[0];

    const updateIssueCountQuery = `
      UPDATE issues 
      SET comments_count = comments_count + 1 
      WHERE issue_id = $1;
    `;
    await client.query(updateIssueCountQuery, [issueId]);

    await client.query('COMMIT');

    res.status(201).json({
      message: "Comment added successfully!",
      comment: newComment
    });

  } catch (error) {
    // If anything goes wrong, rollback the transaction to undo any partial changes
    await client.query('ROLLBACK');
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Internal server error while adding the comment." });
  }
};

export const updateIssueStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid issue ID format." });
      return;
    }

    const validStatuses = ['OPEN', 'IN PROGRESS', 'RESOLVED'];
    if (!status || !validStatuses.includes(status)) {
      res.status(400).json({ error: "Status must be 'OPEN', 'IN PROGRESS', or 'RESOLVED'." });
      return;
    }

    const queryText = `
      UPDATE issues 
      SET status = $1 
      WHERE issue_id = $2 
      RETURNING *;
    `;
    
    const result = await client.query(queryText, [status, id]);
    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found." });
      return;
    }

    res.status(200).json({
      message: "Issue status updated successfully!",
      issue: result.rows[0]
    });

  } catch (error) {
    console.error("Error updating issue status:", error);
    res.status(500).json({ error: "Internal server error while updating status." });
  }
};

export const deleteIssue = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!req.user || req.user.role !== 'ADMIN') {
      res.status(403).json({ error: "Access denied. Admin privileges required." });
      return;
    }

    if (isNaN(Number(id))) {
      res.status(400).json({ error: "Invalid issue ID format." });
      return;
    }

    const queryText = 'DELETE FROM issues WHERE issue_id = $1 RETURNING issue_id;';
    const result = await client.query(queryText, [id]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Issue not found." });
      return;
    }
    res.status(200).json({
      message: `Issue #${id} was successfully deleted.`
    });

  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ error: "Internal server error while deleting the issue." });
  }
};