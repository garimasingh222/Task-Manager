import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db"; // ✅ use your db.ts
import authRoutes from "./routes/authRoutes";
import tasksRoutes from "./routes/tasksRoutes";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// ✅ Allow multiple origins (local + deployed)
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-garima.netlify.app",
  "https://task-manager-ten-sage.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

// ✅ Connect DB before starting server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});