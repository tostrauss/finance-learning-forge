import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { QuizService } from '../services/quiz.service';
import joi from 'joi';

const router = express.Router();

// Validation schemas
const submitQuizSchema = joi.object({
  answers: joi.array().items(
    joi.object({
      questionId: joi.string().required(),
      selectedAnswer: joi.number().integer().min(0).required()
    })
  ).required(),
  timeSpentSeconds: joi.number().integer().min(0).required()
});

// Get a specific quiz by ID (Public - for studying)
router.get('/:quizId', async (req, res) => {
  try {
    const quiz = await QuizService.getQuizById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    // Remove correct answers from response for active quiz
    const sanitizedQuiz = {
      id: quiz.id,
      title: quiz.title,
      moduleId: quiz.moduleId,
      passingScore: quiz.passingScore,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options,
        questionOrder: q.questionOrder
        // Don't include correctAnswer or explanation
      }))
    };
    
    res.json(sanitizedQuiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// Get quiz with answers (Protected - for review after submission)
router.get('/:quizId/answers', authMiddleware, async (req: AuthRequest, res) => {
  try {
    // Check if user has attempted this quiz
    const userAttempts = await QuizService.getUserQuizHistory(req.user!.userId);
    const hasAttempted = userAttempts.some(attempt => attempt.quizId === req.params.quizId);
    
    if (!hasAttempted) {
      return res.status(403).json({ error: 'You must complete the quiz before viewing answers' });
    }
    
    const quiz = await QuizService.getQuizById(req.params.quizId);
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }
    
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz answers' });
  }
});

// Submit quiz answers (Protected)
router.post('/:quizId/submit', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { error } = submitQuizSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const { answers, timeSpentSeconds } = req.body;
    const result = await QuizService.submitQuiz(
      req.user!.userId,
      req.params.quizId,
      answers,
      timeSpentSeconds
    );
    
    res.status(201).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to submit quiz' });
  }
});

// Get user's quiz history (Protected)
router.get('/history/me', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const history = await QuizService.getUserQuizHistory(req.user!.userId, limit);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz history' });
  }
});

// Get user's best score for a quiz (Protected)
router.get('/:quizId/best-score', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const score = await QuizService.getUserBestScore(req.user!.userId, req.params.quizId);
    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch best score' });
  }
});

// Get quiz statistics (Public - for displaying quiz difficulty)
router.get('/:quizId/statistics', async (req, res) => {
  try {
    const stats = await QuizService.getQuizStatistics(req.params.quizId);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quiz statistics' });
  }
});

// Get all quizzes for a course (Public)
router.get('/course/:courseId', async (req, res) => {
  try {
    const quizzes = await QuizService.getQuizzesByCourse(req.params.courseId);
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course quizzes' });
  }
});

export default router;