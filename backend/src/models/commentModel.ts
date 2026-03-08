import { client } from "../database/connectToPostgresql.js";

const createCommentTableQuery = `
    CREATE TABLE IF NOT EXISTS comments(
        comment_id BIGSERIAL PRIMARY KEY,
        content TEXT,
        issue_id BIGINT REFERENCES issues(issue_id),
        user_id BIGINT REFERENCES users(user_id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
`;

export const createCommentTable = async ()=> {
    try{
        await client.query(createCommentTableQuery);
    } catch(error){
        console.log("Failed to create CommentTable.", error);
    }
}