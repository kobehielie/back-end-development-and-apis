import express from 'express';
import authenticate from '../middleware/authenticate.js';
import authorizeRole from '../middleware/authorize.js';
import { readUsers } from '../utils/db.js';

const router = express.Router();

// Route protégée GET /users
router.get('/users', authenticate, authorizeRole("admin"), (req, res) => {
  const users = readUsers();

  // Suppression du champ passwordHash pour chaque utilisateur
  const safeUsers = users.map(({ passwordHash, ...userWithoutPassword }) => userWithoutPassword);

  res.json({ users: safeUsers });
});

export default router;