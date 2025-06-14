import { initializeDatabase } from '../config/database';
import { User } from '../models/User';
import { UserProgress } from '../models/UserProgress';
import { logger } from '../utils/logger';

export const createDemoData = async () => {
  try {
    // It's often best to initialize the DB without syncing for a demo data script
    // if the main app or seed script has already run.
    await initializeDatabase();
    logger.info('Creating demo data...');

    // Create a demo user
    const [demoStudent, created] = await User.findOrCreate({
      where: { email: 'demo.student@university.edu' },
      defaults: {
        email: 'demo.student@university.edu',
        passwordHash: 'demo123', // The hook will hash this
        firstName: 'Demo',
        lastName: 'Student',
      }
    });

    if (created) {
        logger.info('Demo student created.');
    } else {
        logger.info('Demo student already exists.');
    }

    // Add some learning progress for the demo student
    await UserProgress.bulkCreate([
      {
        userId: demoStudent.id,
        courseId: 'fin-201',
        moduleId: 'fin-201-1',
        completedAt: new Date(),
        score: 95,
      },
      {
        userId: demoStudent.id,
        courseId: 'fin-201',
        moduleId: 'fin-201-2',
        completedAt: new Date(),
        score: 88,
      },
    ], {
        ignoreDuplicates: true // Prevents errors if you run the script multiple times
    });

    logger.info('Demo data created successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Failed to create demo data:', error);
    process.exit(1);
  }
};

createDemoData();