import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser'; // <-- Added for refresh tokens
import { redis } from './config/redis';
import { initializeDatabase } from './config/database';
import { logger } from './utils/logger';

// Import routes
import authRoutes from './routes/auth.routes';
import learningRoutes from './routes/learning.routes';
import cacheRoutes from './routes/cache.routes';

const app = express();

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

// Centralized service initialization
const initializeServices = async () => {
  try {
    // 1. Initialize Database
    await initializeDatabase();
    
    // 2. Initialize Redis
    await redis.connect();
    
    logger.info('All services initialized successfully');
  } catch (error) {
    logger.error('Failed to initialize services:', error);
    process.exit(1); // Exit if critical services fail
  }
};

// --- Middleware ---
// Security headers
app.use(helmet()); 
// Gzip compression
app.use(compression()); 
// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
// JSON body parser
app.use(express.json());
// Cookie parser for handling refresh tokens
app.use(cookieParser());
// Apply rate limiter to all API requests
app.use('/api/', limiter);

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/cache', cacheRoutes); // Keep existing cache routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// --- Error Handling ---
// Centralized error handling for unhandled errors
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 3001;

// Start the server only after services are initialized
initializeServices().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
});

export default app;