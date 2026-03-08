import { client } from "../database/connectToPostgresql.js";

const createCategoryTableQuery = `
    CREATE TABLE IF NOT EXISTS categories(
        category_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(50),
        description TEXT
    )
`;

export const createCategoryTable = async ()=>{
    try{
        await client.query(createCategoryTableQuery);
    } catch(error){
        console.log("Failed to create CategoryTable.", error);
    }
}