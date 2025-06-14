import dotenv from 'dotenv';
import { initializeDatabase } from '../config/database';
import { Quiz, QuizQuestion } from '../models/Quiz';
import { Module } from '../models/Course';
import { financeQuizzes } from '../data/quizzes';
import { logger } from '../utils/logger';

dotenv.config();

const seedQuizzes = async () => {
  try {
    await initializeDatabase();
    logger.info('Starting quiz seeding...');

    // Clear existing quiz data
    await QuizQuestion.destroy({ where: {}, truncate: true });
    await Quiz.destroy({ where: {}, truncate: true });
    logger.info('Cleared existing quizzes.');

    // Map quiz IDs to module IDs
    const quizModuleMap: { [key: string]: string } = {
      'fin-201-quiz-1': 'fin-201-1',
      'fin-201-quiz-2': 'fin-201-2',
      'fin-201-quiz-3': 'fin-201-3',
      'fin-201-quiz-4': 'fin-201-4',
      'fin-302-quiz-1': 'fin-302-1',
      'fin-302-quiz-2': 'fin-302-2',
      'fin-302-quiz-3': 'fin-302-3',
      'fin-302-quiz-4': 'fin-302-4',
      'fin-302-quiz-5': 'fin-302-5',
      'fin-403-quiz-1': 'fin-403-1',
      'fin-403-quiz-2': 'fin-403-2',
      'fin-403-quiz-3': 'fin-403-3',
      'fin-280-quiz-1': 'fin-280-1',
      'fin-280-quiz-2': 'fin-280-2',
      'fin-280-quiz-3': 'fin-280-3',
      'fin-281-quiz-1': 'fin-281-1',
      'fin-281-quiz-2': 'fin-281-2',
      'fin-281-quiz-3': 'fin-281-3',
      'fin-282-quiz-1': 'fin-282-1',
      'fin-282-quiz-2': 'fin-282-2',
      'fin-282-quiz-3': 'fin-282-3',
      'fin-283-quiz-1': 'fin-283-1',
      'fin-283-quiz-2': 'fin-283-2',
      'fin-283-quiz-3': 'fin-283-3',
      'fin-285-quiz-1': 'fin-285-1',
      'banking-services-quiz': 'fin-285-1' // Alias
    };

    for (const quizData of financeQuizzes) {
      // Check if module exists
      const moduleId = quizModuleMap[quizData.id];
      if (moduleId) {
        const moduleExists = await Module.findByPk(moduleId);
        if (!moduleExists) {
          logger.warn(`Module ${moduleId} not found for quiz ${quizData.id}, skipping module association.`);
        }
      }

      // Create quiz
      const quiz = await Quiz.create({
        id: quizData.id,
        title: quizData.title,
        moduleId: moduleId || null,
        passingScore: 70 // Default passing score
      });

      // Create questions
      for (let i = 0; i < quizData.questions.length; i++) {
        const questionData = quizData.questions[i];
        await QuizQuestion.create({
          id: `${quiz.id}-${questionData.id}`,
          quizId: quiz.id,
          question: questionData.question,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation,
          questionOrder: i + 1
        });
      }

      logger.info(`Created quiz: ${quiz.title} with ${quizData.questions.length} questions`);
    }

    logger.info('Quiz seeding completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error('Quiz seeding failed:', error);
    process.exit(1);
  }
};

seedQuizzes();