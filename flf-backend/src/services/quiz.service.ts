import { Quiz, QuizQuestion, QuizResult } from '../models/Quiz';
import { UserProgress } from '../models/UserProgress';
import { Op } from 'sequelize';
import sequelize from '../config/database';

export class QuizService {
  /**
   * Get a quiz by ID with all questions
   */
  static async getQuizById(quizId: string) {
    return Quiz.findByPk(quizId, {
      include: [{
        model: QuizQuestion,
        order: [['questionOrder', 'ASC']]
      }]
    });
  }

  /**
   * Get all quizzes for a specific course
   */
  static async getQuizzesByCourse(courseId: string) {
    const quiz = await Quiz.findAll({
      include: [{
        model: QuizQuestion,
        attributes: ['id'] // Just get count
      }],
      where: {
        moduleId: {
          [Op.in]: sequelize.literal(`(
            SELECT id FROM modules WHERE "courseId" = '${courseId}'
          )`)
        }
      }
    });
    
    return quiz;
  }

  /**
   * Submit quiz answers and calculate results
   */
  static async submitQuiz(
    userId: string, 
    quizId: string, 
    answers: { questionId: string; selectedAnswer: number }[],
    timeSpentSeconds: number
  ) {
    const quiz = await this.getQuizById(quizId);
    
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    // Calculate score
    let correctAnswers = 0;
    const detailedAnswers = quiz.questions.map(question => {
      const userAnswer = answers.find(a => a.questionId === question.id);
      const isCorrect = userAnswer?.selectedAnswer === question.correctAnswer;
      
      if (isCorrect) correctAnswers++;
      
      return {
        questionId: question.id,
        selectedAnswer: userAnswer?.selectedAnswer ?? -1,
        isCorrect
      };
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Save quiz result
    const result = await QuizResult.create({
      quizId,
      userId,
      score,
      totalQuestions: quiz.questions.length,
      answers: detailedAnswers,
      timeSpentSeconds,
      completedAt: new Date()
    });

    // Update module progress if quiz is passed
    if (score >= quiz.passingScore && quiz.moduleId) {
      await UserProgress.findOrCreate({
        where: {
          userId,
          moduleId: quiz.moduleId
        },
        defaults: {
          userId,
          moduleId: quiz.moduleId,
          completedAt: new Date(),
          score
        }
      });
    }

    return {
      result,
      passed: score >= quiz.passingScore,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      score,
      detailedAnswers
    };
  }

  /**
   * Get user's quiz history
   */
  static async getUserQuizHistory(userId: string, limit = 10) {
    return QuizResult.findAll({
      where: { userId },
      include: [{
        model: Quiz,
        attributes: ['id', 'title']
      }],
      order: [['completedAt', 'DESC']],
      limit
    });
  }

  /**
   * Get user's best score for a quiz
   */
  static async getUserBestScore(userId: string, quizId: string) {
    const result = await QuizResult.findOne({
      where: { userId, quizId },
      order: [['score', 'DESC']]
    });
    
    return result?.score || 0;
  }

  /**
   * Get quiz statistics
   */
  static async getQuizStatistics(quizId: string) {
    const results = await QuizResult.findAll({
      where: { quizId },
      attributes: [
        [sequelize.fn('AVG', sequelize.col('score')), 'averageScore'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'attemptCount'],
        [sequelize.fn('MAX', sequelize.col('score')), 'highestScore'],
        [sequelize.fn('MIN', sequelize.col('score')), 'lowestScore']
      ],
      raw: true
    });

    return results[0] || {
      averageScore: 0,
      attemptCount: 0,
      highestScore: 0,
      lowestScore: 0
    };
  }
}