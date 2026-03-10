import { Router } from "express";
import { login, logout, signup, verifyOtp } from "../controllers/authControllers.js";
const router = Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);  
router.post('/login', login);
router.post('/logout', logout);

export default router;