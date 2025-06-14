import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import { logger } from '../utils/logger';
import { User } from '../models/User';
import { Course, Module } from '../models/Course';
import { RefreshToken } from '../models/RefreshToken';
import { UserProgress } from '../models/UserProgress';
import { Quiz, QuizQuestion, QuizResult } from '../models/Quiz';

dotenv.config();

// 1. Initialize Sequelize WITHOUT the models option
const sequelize = new Sequelize({
  database: process.env.DB_NAME!,
  username: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  host: process.env.DB_HOST!,
  port: parseInt(process.env.DB_PORT!),
  dialect: 'postgres',
  logging: (msg) => logger.debug(msg),
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// 2. Add all of our models to the instance manually
sequelize.addModels([
  User, 
  Course, 
  Module, 
  RefreshToken, 
  UserProgress,
  Quiz,
  QuizQuestion,
  QuizResult
]);

export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    logger.info('Database connection established successfully.');

    // Sync models with database
    await sequelize.sync({ alter: true });
    logger.info('Database models synchronized.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;