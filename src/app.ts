import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { errorMiddleware } from './middleware/error.middleware';
import { logger } from './utils/logger';
import routes from './routes';
import { setupSwagger } from './config/swagger';
import { connectDatabase } from './config/database';
import { connectRedis } from './config/redis';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeConnections();
  }

  private initializeMiddlewares(): void {
    this.app.use(helmet());
    this.app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      credentials: true
    }));
    this.app.use(compression());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
    
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP'
    });
    this.app.use('/api/', limiter);
  }

  private initializeRoutes(): void {
    this.app.use('/api/v1', routes);
    setupSwagger(this.app);
  }

  private initializeErrorHandling(): void {
    this.app.use(errorMiddleware);
  }

  private async initializeConnections(): Promise<void> {
    try {
      await connectDatabase();
      await connectRedis();
      logger.info('All connections established successfully');
    } catch (error) {
      logger.error('Failed to establish connections:', error);
      process.exit(1);
    }
  }
}

export default new App().app;