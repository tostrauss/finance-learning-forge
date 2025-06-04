import { logger } from '../utils/logger';

// In-memory cache for browser environment
const memoryCache = new Map<string, { value: string; expiry: number }>();

// Interface matching our Redis operations
interface CacheOperations {
  get(key: string): Promise<string | null>;
  setex(key: string, seconds: number, value: string): Promise<void>;
  del(key: string): Promise<void>;
  flushAll(): Promise<void>;
}

// Removed Redis client implementation for browser environment

// In-memory cache implementation
class MemoryCache implements CacheOperations {
  async get(key: string): Promise<string | null> {
    const item = memoryCache.get(key);
    if (!item) return null;
    if (Date.now() > item.expiry) {
      memoryCache.delete(key);
      return null;
    }
    return item.value;
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    memoryCache.set(key, {
      value,
      expiry: Date.now() + (seconds * 1000)
    });
  }

  async del(key: string): Promise<void> {
    memoryCache.delete(key);
  }

  async flushAll(): Promise<void> {
    memoryCache.clear();
  }
}

// Always use in-memory cache for browser environment
const cache = new MemoryCache();

export const connectRedis = async () => {
  logger.info('Using in-memory cache in browser environment');
};

export const redis = cache;