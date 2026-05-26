import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'uri_not_set_in_env_file';
const client = new MongoClient(uri);

let db;

async function connectDB() {
  try {
    db = client.db();
  } catch (error) {
    console.error('Failed to start the server due to MongoDB connection issue', error);
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected');
  }
  return db;
}

export { connectDB, getDb };
