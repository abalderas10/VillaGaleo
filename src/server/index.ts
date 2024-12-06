import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import cors from 'cors';
import { z } from 'zod';
import path from 'path';
import authRouter from './auth';

const prisma = new PrismaClient();
const app = express();

// Middleware
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Enable CORS for development
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));

// Configure multer
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Auth routes
app.use('/api/auth/admin', authRouter);

// Validation schemas
const PostSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  content: z.string().min(1),
  category: z.string().min(1),
  image: z.string().url(),
  author: z.string().min(1),
  authorImage: z.string().url(),
});

// Routes
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { photos: true },
      orderBy: { date: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const data = PostSchema.parse(req.body);
    const slug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const post = await prisma.post.create({
      data: { ...data, slug },
    });
    res.json(post);
  } catch (error) {
    res.status(400).json({ error: 'Invalid post data' });
  }
});

app.post('/api/posts/:id/photos', upload.array('photos'), async (req, res) => {
  try {
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    
    const photos = await Promise.all(
      files.map(file => 
        prisma.photo.create({
          data: {
            url: `/uploads/${file.filename}`,
            alt: file.originalname,
            postId: id,
          },
        })
      )
    );
    
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload photos' });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.photo.deleteMany({ where: { postId: id } });
    await prisma.post.delete({ where: { id } });
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});