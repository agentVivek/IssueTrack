import { Router } from "express";
import { addCommentToIssue, deleteIssue, getIssueById, getIssueComments, getIssues, sendIssue, updateIssueStatus, voteIssue } from "../controllers/issuesControllers.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.get('/', requireAuth, getIssues);
router.get('/:id', requireAuth,  getIssueById);
router.get('/:id/comments', requireAuth, getIssueComments);
router.post('/send', requireAuth, sendIssue);
router.post(':id/vote', requireAuth, voteIssue);
router.post('/:id/comments', requireAuth, addCommentToIssue);
router.patch('/:id/status', requireAuth, updateIssueStatus);
router.delete('/:id', requireAuth, deleteIssue);

export default router;