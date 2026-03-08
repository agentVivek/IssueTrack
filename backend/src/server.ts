import express from "express"
import config from "./config/config.js";
import connectToPostgresql from "./database/connectToPostgresql.js";
import authRoutes from "./routes/authRoutes.js";
import issueRoutes from "./routes/issuesRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoriesRoutes.js";
import zoneRoutes from "./routes/zonesRoutes.js";
import { connectToRedis } from "./database/connectToRedis.js";

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/zones', zoneRoutes);

const startServer = async () => {
    try{
        await connectToPostgresql();    //connect to database
        await connectToRedis();         //connect to redis
        app.listen(config.port, ()=>{
            console.log(`Server running on port ${config.port}`);
        })
    } catch(error){
        process.exit(1);
    }
}
startServer();