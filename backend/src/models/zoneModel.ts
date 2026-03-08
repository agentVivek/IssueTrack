import { client } from "../database/connectToPostgresql.js";

const createZoneTableQuery = `
    CREATE TABLE IF NOT EXISTS zones(
        zone_id BIGSERIAL PRIMARY KEY,
        name VARCHAR(50),
        description TEXT
    )
`;

export const createZoneTable = async ()=>{
    try{
        await client.query(createZoneTableQuery);
    } catch(error){
        console.log("Failed to create ZoneTable.", error);
    }
}