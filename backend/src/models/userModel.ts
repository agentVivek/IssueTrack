import { client } from "../database/connectToPostgresql.js";

const createUserTableQuery = `  
    CREATE TABLE IF NOT EXISTS users(
        user_id BIGSERIAL PRIMARY KEY, 
        profile_picture_url TEXT DEFAULT NULL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE, 
        password VARCHAR(255),
        role VARCHAR(50) CHECK (role IN ('ADMIN', 'STUDENT')) DEFAULT 'STUDENT',
        status VARCHAR(50) CHECK (status IN ('ACTIVE', 'DEACTIVATED')) DEFAULT 'ACTIVE',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export const createUserTable = async () => {
  try {
    await client.query(createUserTableQuery);
  } catch (error) {
    console.error("Error creating users table:", error);
  }
};
