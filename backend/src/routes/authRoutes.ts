import express from "express";
import { registerUser, loginUser, refreshToken, googleLogin } from "../controllers/authControllers";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/google", googleLogin);

export default router;