import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import issuesRoutes from "./routes/issuesRoutes.js";
import solutionRoutes from "./routes/solutionRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/issues", issuesRoutes);
app.use("/api/solution", solutionRoutes);

app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
});
