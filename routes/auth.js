import express from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../db/index.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined');
}

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
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const db = getDb();

    const user = await db.collection('users').findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      JWT_SECRET,
      { expiresIn: '1h' },
    );

    return res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login error' });
  }
});

export default router;
