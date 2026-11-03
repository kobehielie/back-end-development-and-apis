import express from 'express';
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { findByEmail, readUsers, writeUsers } from '../utils/db.js';
import { signToken } from '../utils/jwt.js';
import authenticate from '../middleware/authenticate.js';
import { blacklistToken } from '../utils/token-blacklist.js';

const router = express.Router();

// Route POST /register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const existingUser = findByEmail(email);
  if (existingUser) {
    return res.status(409).json({ error: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = {
    id: randomUUID(),
    email,
    passwordHash,
    role: "user"
  };

  const users = readUsers();
  users.push(newUser);
  writeUsers(users);

  const token = signToken({
    id: newUser.id,
    email: newUser.email,
    role: newUser.role
  });

  return res.status(201).json({
    message: "User registered successfully",
    token
  });
});

// Route POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = findByEmail(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role
  });

  return res.status(200).json({
    message: "Logged in successfully",
    token
  });
});

// Route GET /profile
router.get('/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Leçon 28 : Route POST /logout
router.post('/logout', authenticate, (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  blacklistToken(token);

  res.json({ message: "Logged out successfully" });
});

export default router;