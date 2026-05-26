import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import { connectDB, getDb } from './db/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postsRouter);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://127.0.0.1:${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server due to MongoDB connection issue', err);
  });

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API' });
});
