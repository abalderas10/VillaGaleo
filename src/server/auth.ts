import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

// Validation schema
const LoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(6),
});

// Middleware to verify admin token
export const verifyAdminToken = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

// Login route
router.post('/login', async (req, res) => {
  try {
    const { username, password } = LoginSchema.parse(req.body);
    console.log('Login attempt:', { username });

    const admin = await prisma.admin.findUnique({
      where: { username },
    });

    if (!admin) {
      console.log('Admin not found');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, admin.passwordHash);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id }, JWT_SECRET, { expiresIn: '1d' });
    console.log('Login successful');
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({ error: 'Invalid request' });
  }
});

// Create initial admin account (should be removed in production)
router.post('/setup', async (req, res) => {
  try {
    const { username, password } = LoginSchema.parse(req.body);
    
    const existingAdmin = await prisma.admin.findFirst();
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin account already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const admin = await prisma.admin.create({
      data: {
        username,
        passwordHash,
      },
    });

    res.json({ message: 'Admin account created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid request' });
  }
});

export default router;