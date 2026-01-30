import express from "express";
// ✅ add `.js` extension because Node ESM requires it after build
import { registerUser, loginUser, refreshToken, googleLogin } from "../controllers/authControllers.js";
const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", refreshToken);
router.post("/google", googleLogin);
export default router; // ✅ default export so server.ts can import it
