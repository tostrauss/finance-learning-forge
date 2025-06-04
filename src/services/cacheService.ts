// src/services/cacheService.ts
import axios from 'axios';
import { logger } from '../utils/logger';

import { env } from '../config/environment';
const API_BASE_URL = env.API_BASE_URL;

interface CacheOperations {
  get(key: string): Promise<string | null>;
  setex(key: string, seconds: number, value: string): Promise<void>;
  del(key: string): Promise<void>;
  flushAll(): Promise<void>;
}

class CacheService implements CacheOperations {
  async get(key: string): Promise<string | null> {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cache/${key}`);
      return response.data.value;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      logger.error('Failed to get cached value:', error);
      return null;
    }
  }

  async setex(key: string, seconds: number, value: string): Promise<void> {
    try {
      await axios.post(`${API_BASE_URL}/api/cache`, {
        key,
        value,
        ttl: seconds
      });
    } catch (error) {
      logger.error('Failed to set cached value:', error);
    }
  }

  async del(key: string): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/api/cache/${key}`);
    } catch (error) {
      logger.error('Failed to delete cached value:', error);
    }
  }

  async flushAll(): Promise<void> {
    try {
      await axios.delete(`${API_BASE_URL}/api/cache`);
    } catch (error) {
      logger.error('Failed to flush cache:', error);
    }
  }
}

export const cacheService = new CacheService();
