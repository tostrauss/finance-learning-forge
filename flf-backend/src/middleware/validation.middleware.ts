// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateCacheBody = (req: Request, res: Response, next: NextFunction): void => {
  const { key, value, ttl } = req.body;

  if (!key || typeof key !== 'string') {
    res.status(400).json({ error: 'Key is required and must be a string' });
    return;
  }

  if (!value || typeof value !== 'string') {
    res.status(400).json({ error: 'Value is required and must be a string' });
    return;
  }

  if (!ttl || typeof ttl !== 'number' || ttl <= 0) {
    res.status(400).json({ error: 'TTL is required and must be a positive number' });
    return;
  }

  next();
};
