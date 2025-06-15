// src/routes/cache.routes.ts
import express from 'express';
import { redis } from '../config/redis';
import { validateCacheBody } from '../middleware/validation.middleware';

const router = express.Router();

// Get cached value
router.get('/:key', async (req, res): Promise<void> => {
  const { key } = req.params;
  try {
    const value = await redis.get(key);
    if (!value) {
      res.status(404).json({ message: 'Cache key not found' });
      return;
    }
    res.json({ value });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get cached value' });
  }
});

// Set cached value with TTL
router.post('/', validateCacheBody, async (req, res): Promise<void> => {
  const { key, value, ttl } = req.body;
  try {
    await redis.setex(key, ttl, value);
    res.status(201).json({ message: 'Cache value set successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to set cache value' });
  }
});

// Delete cached value
router.delete('/:key', async (req, res): Promise<void> => {
  const { key } = req.params;
  try {
    await redis.del(key);
    res.json({ message: 'Cache value deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete cache value' });
  }
});

// Flush all cache
router.delete('/', async (req, res): Promise<void> => {
  try {
    await redis.flushAll();
    res.json({ message: 'Cache flushed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to flush cache' });
  }
});

export default router;
