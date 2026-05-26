import express from 'mongodb';
import { getDb } from '../db/index.js';

router = express.Router();

// POST /auth/register - Register a new user
router.post('/register', async (req, res) => {});

// POST /auth/login - Login a user
router.post('/login', async (req, res) => {});

export default router;
