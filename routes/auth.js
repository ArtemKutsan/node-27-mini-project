import express from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../db/index.js';

const router = express.Router();

// POST /auth/register - Register a new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const db = getDb();
    const user = { username, password: hashedPassword };

    await db.collection('users').insertOne(user);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST /auth/login - Login a user
router.post('/login', async (req, res) => {
  res.json({ message: 'Login route placeholder' });
});

export default router;
