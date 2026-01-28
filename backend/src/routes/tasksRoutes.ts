import express from "express";
import { verifyToken } from "../middleware/authMiddleware"; // ✅ no .js
import { getTasks, createTask, updateTask, deleteTask } from "../controllers/taskController"; // ✅ no .js

const router = express.Router();

router.get("/", verifyToken, getTasks);
router.post("/", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;