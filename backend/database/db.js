import pg from "pg";
import env from "dotenv";
env.config();

const pool = new pg.Pool({  
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createTables = async () => {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            admission_number VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            gender VARCHAR(50) NOT NULL,
            profilePic VARCHAR(255) NOT NULL,
            role VARCHAR(50) DEFAULT 'user',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ); 
    `;
    
    const createIssuesTable = `
        CREATE TABLE IF NOT EXISTS issues (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50) DEFAULT 'open',
            user_id INT REFERENCES users(id) ON DELETE SET NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
     
    const createSolutionsTable = `
        CREATE TABLE IF NOT EXISTS solutions (
            id SERIAL PRIMARY KEY,
            issue_id INT REFERENCES issues(id) ON DELETE CASCADE,
            user_id INT REFERENCES users(id) ON DELETE SET NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `; 

    try {
        await pool.query(createUsersTable);
        await pool.query(createIssuesTable);
        await pool.query(createSolutionsTable);
    } catch (error) {
        console.error("❌ Error creating tables:", error);
    }
};

createTables();

export default pool;