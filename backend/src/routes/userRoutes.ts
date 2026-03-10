import { Router } from "express";
import { getAllUsers, getUserProfile, updateUserProfile, updateUserStatus } from "../controllers/usersControllers.js";
import { requireAuth } from "../middlewares/authMiddleware.js";
const router = Router();

router.get('/', requireAuth, getAllUsers);
router.get('/:id', requireAuth, getUserProfile);
router.patch('/:id/status', requireAuth, updateUserStatus);
router.patch('/:id', requireAuth, updateUserProfile);

export default router;