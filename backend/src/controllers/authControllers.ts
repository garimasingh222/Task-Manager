import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import User from "../models/Users"; // 👈 make sure your file is User.ts, not Users.ts

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID!);

// ✅ Manual Registration
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Registration successful",
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

// ✅ Manual Login
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Issue JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

// ✅ Refresh token (optional)
export const refreshToken = (req: Request, res: Response) => {
  res.json({ message: "Token refreshed successfully" });
};

// ✅ Google login with MongoDB + JWT issuance
export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) {
      return res.status(400).json({ message: "Invalid Google token" });
    }

    const { email, name, picture, sub } = payload;

    // Find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, picture, googleId: sub });
      await user.save();
    }

    // Issue JWT
    const jwtToken = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );

    return res.json({
      message: "Google login successful",
      user: { id: user._id, email: user.email, name: user.name, picture: user.picture },
      token: jwtToken,
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({ message: "Google login failed" });
  }
};