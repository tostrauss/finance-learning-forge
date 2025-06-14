import express from 'express';
import { authMiddleware, AuthRequest } from '../middleware/auth.middleware';
import { LearningService } from '../services/learning.service';

const router = express.Router();

// Get all courses (Public)
router.get('/courses', async (req, res) => {
  try {
    const courses = await LearningService.getAllCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get a specific course by its ID (Public)
router.get('/courses/:courseId', async (req, res) => {
  try {
    const course = await LearningService.getCourseById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Get user's progress and completed credits (Protected)
router.get('/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.userId;
    const progress = await LearningService.getUserProgress(userId);
    const completedCredits = await LearningService.getCompletedCredits(userId);
    
    res.json({
      progress,
      completedCredits,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress' });
  }
});

// Update user's progress on a module (Protected)
router.post('/progress', authMiddleware, async (req: AuthRequest, res) => {
  try {
    const { courseId, moduleId, score } = req.body;

    if (!courseId || !moduleId) {
      return res.status(400).json({ error: 'courseId and moduleId are required' });
    }

    const progress = await LearningService.updateProgress(
      req.user!.userId,
      courseId,
      moduleId,
      score
    );
    res.status(201).json(progress);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

export default router;