import express from "express";
import bcrypt from "bcryptjs";
import db from "../db.js";
import { generateToken } from "../middleware/auth.js";
import { validateUser } from "../middleware/validation.js";
import { asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

// Guest login (for demo)
router.post("/guest", asyncHandler(async (req, res) => {
  const guestUser = await db("users").where({ id: 1 }).first();
  
  if (!guestUser) {
    return res.status(404).json({ error: "Guest user not found" });
  }

  const token = generateToken(guestUser);
  
  res.json({
    message: "Guest login successful",
    token,
    user: {
      id: guestUser.id,
      username: guestUser.username,
      email: guestUser.email
    }
  });
}));

// Register new user
router.post("/register", validateUser, asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user exists
  const existingUser = await db("users").where({ email }).first();
  if (existingUser) {
    return res.status(409).json({ error: "User already exists" });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const [userId] = await db("users").insert({
    username,
    email,
    password: hashedPassword
  });

  const user = await db("users").where({ id: userId }).first();
  const token = generateToken(user);

  res.status(201).json({
    message: "User created successfully",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
}));

// Login user
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }

  // Find user
  const user = await db("users").where({ email }).first();
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    }
  });
}));

export default router;