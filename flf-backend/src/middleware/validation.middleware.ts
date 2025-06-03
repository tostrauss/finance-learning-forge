// middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';

export const validateCacheBody = (req: Request, res: Response, next: NextFunction) => {
  const { key, value, ttl } = req.body;

  if (!key || typeof key !== 'string') {
    return res.status(400).json({ message: 'Key must be a non-empty string' });
  }

  if (!value || typeof value !== 'string') {
    return res.status(400).json({ message: 'Value must be a non-empty string' });
  }

  if (!ttl || typeof ttl !== 'number' || ttl <= 0) {
    return res.status(400).json({ message: 'TTL must be a positive number' });
  }

  next();
};
