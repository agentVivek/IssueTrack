import { client } from "../database/connectToPostgresql.js";

const createIssueTableQuery = `
    CREATE TABLE IF NOT EXISTS issues(
        issue_id BIGSERIAL PRIMARY KEY,
        image_urls TEXT[],
        title varchar(255),
        description TEXT, 
        status varchar(50) CHECK (status IN ('OPEN', 'IN PROGRESS', 'RESOLVED')) DEFAULT 'OPEN',
        upvotes INT DEFAULT 0,
        downvotes INT DEFAULT 0,
        comments_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id BIGINT REFERENCES users(user_id),
        category_id BIGINT REFERENCES categories(category_id),
        zone_id BIGINT REFERENCES zones(zone_id)
    ) 
`;

export const createIssueTable = async () => {
    try{
        await client.query(createIssueTableQuery);
    } catch(error){
        console.log("Failed to create IssueTable.", error);
    }
}