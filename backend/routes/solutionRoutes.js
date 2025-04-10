import express from "express";
import protectRoutes from "../middlewares/protectRoutes.js";
import { createSolution, getSolution } from "../controllers/solutionControllers.js";
const router = express.Router();

router.get("/:issue_id", protectRoutes, getSolution);
router.post("/:issue_id", protectRoutes, createSolution);

export default router; 