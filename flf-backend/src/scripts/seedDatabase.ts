import dotenv from 'dotenv';
import { initializeDatabase } from '../config/database';
import { Course, Module } from '../models/Course';
// This path is now simple and self-contained within the backend project.
import { financeCourses } from '../data/courses'; 
import { logger } from '../utils/logger';

dotenv.config();

const seedDatabase = async () => {
  // ... the rest of the file remains exactly the same
  try {
    await initializeDatabase();
    logger.info('Starting database seeding...');

    await Module.destroy({ where: {}, truncate: true });
    await Course.destroy({ where: {}, truncate: true });
    logger.info('Cleared existing courses and modules.');

    for (const courseData of financeCourses) {
      const course = await Course.create({
        id: courseData.id,
        courseCode: courseData.courseCode,
        title: courseData.title,
        description: courseData.description,
        credits: courseData.credits,
        academicLevel: courseData.academicLevel,
        prerequisites: courseData.prerequisites,
        concentrations: courseData.concentrations,
      });
      
      if (courseData.modules && courseData.modules.length > 0) {
        for (let i = 0; i < courseData.modules.length; i++) {
          const moduleData = courseData.modules[i];
          await Module.create({
            id: moduleData.id,
            courseId: course.id,
            title: moduleData.title,
            description: moduleData.description,
            content: moduleData.content,
            duration: moduleData.duration,
            moduleOrder: i + 1,
          });
        }
      }
    }
    
    logger.info('Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Database seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();