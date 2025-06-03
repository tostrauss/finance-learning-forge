import express from 'express';
import cors from 'cors';
import { redis } from './config/redis';
import cacheRoutes from './routes/cache.routes';

const app = express();

// Initialize Redis connection
redis.connect().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/cache', cacheRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
