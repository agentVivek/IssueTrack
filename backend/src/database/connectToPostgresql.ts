import { Client } from 'pg'
import { createUserTable } from '../models/userModel.js';
import { createCategoryTable } from '../models/categoryModel.js';
import { createZoneTable } from '../models/zoneModel.js';
import { createIssueTable } from '../models/issueModel.js';
import { createCommentTable } from '../models/commentModel.js';
import dotenv from "dotenv";
dotenv.config();
export const client = new Client({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
})

const connectToPostgresql = async () => {
  try {
    await client.connect();
    console.log("Connected to database.");
    await createUserTable();
    await createCategoryTable();
    await createZoneTable();
    await createIssueTable();
    await createCommentTable();
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
}

export default connectToPostgresql;