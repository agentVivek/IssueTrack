import express from "express";
import { deleteIssue, getAllIssues, getIssue, reportIssue, updateIssue } from "../controllers/issuesControllers.js";
import protectRoutes from "../middlewares/protectRoutes.js";
const router = express.Router();

router.get('/',protectRoutes, getAllIssues);
router.post('/',protectRoutes, reportIssue);

router.get('/:id', protectRoutes, getIssue);
router.put('/:id', protectRoutes, updateIssue);
router.delete('/:id', protectRoutes, deleteIssue);

export default router;