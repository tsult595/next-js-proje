import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface User {
  _id: ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

let cachedClient: MongoClient | null = null;

export async function connectToAuthDatabase() {
  if (cachedClient) {
    return cachedClient.db('next').collection<User>('users');
  }
  
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined');
  }
  
  const client = new MongoClient(uri, {
    serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
  });
  
  try {
    await client.connect();
    cachedClient = client;
    return client.db('next').collection<User>('users');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function createUser(name: string, email: string, password: string) {
  const users = await connectToAuthDatabase();
  
  // Check if user already exists
  const existingUser = await users.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Create user
  const user = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = await users.insertOne(user as any);
  return { ...user, _id: result.insertedId };
}

export async function findUserByEmail(email: string) {
  const users = await connectToAuthDatabase();
  return await users.findOne({ email });
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  const secret = process.env.JWT_SECRET || 'your-secret-key';
  return jwt.verify(token, secret) as { userId: string };
}
