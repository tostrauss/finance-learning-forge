// src/contexts/LearningContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { learningAPI } from '@/services/api';
import { toast } from '@/hooks/use-toast';
import type { FinanceCourse, Module, UserProgress } from '@/types/curriculum';

interface LearningContextType {
  courses: FinanceCourse[];
  loading: boolean;
  error: string | null;
  userProgress: UserProgress;
  currentCourse: FinanceCourse | null;
  
  // Actions
  fetchCourses: () => Promise<void>;
  fetchCourse: (courseId: string) => Promise<void>;
  fetchUserProgress: () => Promise<void>;
  updateModuleProgress: (courseId: string, moduleId: string, score?: number) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
}

const defaultUserProgress: UserProgress = {
  streak: 0,
  xpEarned: 0,
  quizAverage: 0,
  progress: 0,
  completedModules: [],
  quizResults: {},
  enrolledCourses: [],
  completedCourses: [],
  selectedConcentration: 'general'
};

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within LearningProvider');
  }
  return context;
};

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<FinanceCourse[]>([]);
  const [currentCourse, setCurrentCourse] = useState<FinanceCourse | null>(null);
  const [userProgress, setUserProgress] = useState<UserProgress>(defaultUserProgress);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all courses
  const fetchCourses = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await learningAPI.getCourses();
      const coursesData = response.data;
      
      // Transform backend data to match frontend types if needed
      const transformedCourses = coursesData.map((course: any) => ({
        ...course,
        modules: course.modules || [],
        progress: 0, // Will be calculated based on user progress
      }));
      
      setCourses(transformedCourses);
    } catch (err: any) {
      console.error('Failed to fetch courses:', err);
      setError(err.response?.data?.error || 'Failed to fetch courses');
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch a specific course
  const fetchCourse = useCallback(async (courseId: string) => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await learningAPI.getCourse(courseId);
      setCurrentCourse(response.data);
    } catch (err: any) {
      console.error('Failed to fetch course:', err);
      setError(err.response?.data?.error || 'Failed to fetch course');
      toast({
        title: "Error",
        description: "Failed to load course details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Fetch user progress
  const fetchUserProgress = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await learningAPI.getProgress();
      const { progress, completedCredits } = response.data;
      
      // Transform progress data
      const completedModules: string[] = [];
      const enrolledCourses: string[] = [];
      const completedCourses: string[] = [];
      const quizResults: Record<string, any> = {};
      
      progress.forEach((item: any) => {
        if (item.moduleId) {
          completedModules.push(item.moduleId);
          
          // Track quiz results if score exists
          if (item.score !== null && item.score !== undefined) {
            const quizId = `${item.courseId}-quiz-${item.moduleId.split('-').pop()}`;
            quizResults[quizId] = {
              score: item.score,
              totalQuestions: 100, // This should come from backend
              dateTaken: item.completedAt
            };
          }
        }
        
        if (item.courseId && !enrolledCourses.includes(item.courseId)) {
          enrolledCourses.push(item.courseId);
        }
      });
      
      // Calculate which courses are completed (all modules done)
      courses.forEach(course => {
        const courseModuleIds = course.modules.map(m => m.id);
        const allModulesCompleted = courseModuleIds.every(moduleId => 
          completedModules.includes(moduleId)
        );
        
        if (allModulesCompleted && courseModuleIds.length > 0) {
          completedCourses.push(course.id);
        }
      });
      
      // Calculate overall progress and quiz average
      const totalModules = courses.reduce((sum, course) => sum + course.modules.length, 0);
      const overallProgress = totalModules > 0 
        ? Math.round((completedModules.length / totalModules) * 100)
        : 0;
      
      const quizScores = Object.values(quizResults);
      const quizAverage = quizScores.length > 0
        ? Math.round(quizScores.reduce((sum, result) => sum + result.score, 0) / quizScores.length)
        : 0;
      
      setUserProgress({
        ...userProgress,
        completedModules,
        enrolledCourses,
        completedCourses,
        quizResults,
        progress: overallProgress,
        quizAverage,
        xpEarned: completedCredits * 10, // Simple XP calculation
      });
      
    } catch (err: any) {
      console.error('Failed to fetch user progress:', err);
      setError(err.response?.data?.error || 'Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  }, [user, courses, userProgress]);

  // Update module progress
  const updateModuleProgress = useCallback(async (
    courseId: string, 
    moduleId: string, 
    score?: number
  ) => {
    if (!user) return;
    
    try {
      await learningAPI.updateProgress({ courseId, moduleId, score });
      
      // Update local state
      setUserProgress(prev => ({
        ...prev,
        completedModules: [...prev.completedModules, moduleId],
        xpEarned: prev.xpEarned + 10,
      }));
      
      // Refresh progress from server
      await fetchUserProgress();
      
      toast({
        title: "Progress Updated",
        description: "Your progress has been saved.",
      });
    } catch (err: any) {
      console.error('Failed to update progress:', err);
      toast({
        title: "Error",
        description: "Failed to save progress. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, fetchUserProgress]);

  // Enroll in a course
  const enrollInCourse = useCallback(async (courseId: string) => {
    if (!user) return;
    
    try {
      // Get the first module of the course
      const course = courses.find(c => c.id === courseId);
      if (!course || course.modules.length === 0) {
        throw new Error('Invalid course or no modules available');
      }
      
      // Mark first module as started (0 score just tracks enrollment)
      await learningAPI.updateProgress({ 
        courseId, 
        moduleId: course.modules[0].id,
        score: 0 
      });
      
      setUserProgress(prev => ({
        ...prev,
        enrolledCourses: [...prev.enrolledCourses, courseId]
      }));
      
      toast({
        title: "Enrolled Successfully",
        description: `You've been enrolled in ${course.title}`,
      });
    } catch (err: any) {
      console.error('Failed to enroll in course:', err);
      toast({
        title: "Enrollment Failed",
        description: "Could not enroll in the course. Please try again.",
        variant: "destructive",
      });
    }
  }, [user, courses]);

  // Initial data fetch
  useEffect(() => {
    if (user) {
      fetchCourses();
    } else {
      // Reset state when user logs out
      setCourses([]);
      setUserProgress(defaultUserProgress);
      setCurrentCourse(null);
    }
  }, [user, fetchCourses]);

  // Fetch user progress after courses are loaded
  useEffect(() => {
    if (user && courses.length > 0) {
      fetchUserProgress();
    }
  }, [user, courses.length, fetchUserProgress]);

  const value: LearningContextType = {
    courses,
    loading,
    error,
    userProgress,
    currentCourse,
    fetchCourses,
    fetchCourse,
    fetchUserProgress,
    updateModuleProgress,
    enrollInCourse,
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};
