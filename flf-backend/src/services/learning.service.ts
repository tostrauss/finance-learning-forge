import { Course, Module } from '../models/Course';
import { UserProgress } from '../models/UserProgress';
import { Op } from 'sequelize';

export class LearningService {
  /**
   * Fetches all courses with their associated modules.
   * Courses are ordered by academic level, then by course code.
   */
  static async getAllCourses() {
    return Course.findAll({
      include: [{
        model: Module,
        attributes: ['id', 'title', 'moduleOrder', 'duration'] // Only include necessary module fields for listing
      }],
      order: [['academicLevel', 'ASC'], ['courseCode', 'ASC']],
    });
  }

  /**
   * Fetches a single course by its ID, including all module details.
   */
  static async getCourseById(courseId: string) {
    return Course.findByPk(courseId, {
      include: [Module], // Include full module details
    });
  }

  /**
   * Retrieves all progress records for a specific user.
   */
  static async getUserProgress(userId: string) {
    return UserProgress.findAll({
      where: { userId },
      include: [Course],
    });
  }

  /**
   * Creates or updates a user's progress on a specific module.
   * This replaces the old updateModuleProgress and saveQuizResult functions.
   */
  static async updateProgress(userId: string, courseId: string, moduleId: string, score?: number) {
    const [progress, created] = await UserProgress.findOrCreate({
      where: { userId, courseId, moduleId },
      defaults: {
        userId,
        courseId,
        moduleId,
        completedAt: new Date(),
        score,
      },
    });

    // If the record already existed and a new score is provided, update it.
    if (!created) {
      progress.completedAt = new Date();
      if (score !== undefined) {
        progress.score = score;
      }
      await progress.save();
    }

    return progress;
  }

  /**
   * Calculates the total number of credits for all completed courses by a user.
   */
  static async getCompletedCredits(userId: string) {
    const completedProgress = await UserProgress.findAll({
      where: {
        userId,
        moduleId: { [Op.not]: null }, // Ensure it's module progress
        completedAt: { [Op.not]: null }, // Ensure it's completed
      },
      include: [{
        model: Course,
        attributes: ['id', 'credits']
      }],
      group: ['UserProgress.id', 'course.id'], // Group to handle multiple modules in one course
    });

    // Use a Set to count credits for each completed course only once
    const completedCourseIds = new Set<string>();
    completedProgress.forEach(progress => {
      if (progress.course) {
        completedCourseIds.add(progress.course.id);
      }
    });

    let totalCredits = 0;
    for (const courseId of completedCourseIds) {
        const course = await Course.findByPk(courseId, { attributes: ['credits'] });
        if (course) {
            totalCredits += course.credits;
        }
    }

    return totalCredits;
  }
}