import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';
import {
  getUserProgress,
  updateCourseProgress,
  updateModuleProgress,
  saveQuizResult,
  updateStreakAndXP,
} from '@/services/learningService';
import { UserProgress } from '@/types/learning';

interface LearningContextType {
  userProgress: UserProgress | null;
  loading: boolean;
  error: Error | null;
  enrollInCourse: (courseId: string) => Promise<void>;
  completeCourse: (courseId: string) => Promise<void>;
  completeModule: (moduleId: string) => Promise<void>;
  submitQuizResult: (quizId: string, score: number, totalQuestions: number) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Load user progress when component mounts or user changes
  useEffect(() => {
    loadUserProgress();
  }, [user]);

  // Check streak daily
  useEffect(() => {
    if (user && userProgress) {
      const lastActive = new Date(userProgress.lastActive || 0);
      const today = new Date();
      const isNewDay = lastActive.getDate() !== today.getDate();
      
      if (isNewDay) {
        const yesterdayDate = new Date(today);
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const wasActiveYesterday = lastActive.getDate() === yesterdayDate.getDate();
        
        // Update streak
        const newStreak = wasActiveYesterday ? userProgress.streak + 1 : 1;
        updateStreakAndXP(user, newStreak, userProgress.xpEarned)
          .then(() => loadUserProgress())
          .catch(console.error);
      }
    }
  }, [user, userProgress]);

  const loadUserProgress = async () => {
    if (!user) {
      setUserProgress(null);
      setLoading(false);
      return;
    }

    try {
      const progress = await getUserProgress(user);
      setUserProgress(progress);
      setError(null);
    } catch (err: any) {
      setError(err);
      toast({
        title: "Error Loading Progress",
        description: "Failed to load your learning progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const enrollInCourse = async (courseId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateCourseProgress(user, courseId, true, false);
      await loadUserProgress();
      toast({
        title: "Course Enrolled",
        description: "You've successfully enrolled in the course.",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Enrollment Failed",
        description: "Failed to enroll in course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeCourse = async (courseId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateCourseProgress(user, courseId, true, true);
      await loadUserProgress();
      toast({
        title: "Course Completed",
        description: "Congratulations on completing the course!",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Update Failed",
        description: "Failed to update course progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!user) return;

    setLoading(true);
    try {
      await updateModuleProgress(user, moduleId, true);
      await loadUserProgress();
      toast({
        title: "Module Completed",
        description: "Module progress has been saved.",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Update Failed",
        description: "Failed to update module progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitQuizResult = async (quizId: string, score: number, totalQuestions: number) => {
    if (!user) return;

    setLoading(true);
    try {
      await saveQuizResult(user, quizId, score, totalQuestions);
      await loadUserProgress();
      toast({
        title: "Quiz Completed",
        description: `You scored ${score} out of ${totalQuestions}!`,
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Submission Failed",
        description: "Failed to save quiz results. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetProgress = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Reset all progress in Firebase
      await updateStreakAndXP(user, 0, 0);
      await loadUserProgress();
      toast({
        title: "Progress Reset",
        description: "Your learning progress has been reset.",
      });
    } catch (err: any) {
      setError(err);
      toast({
        title: "Reset Failed",
        description: "Failed to reset progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <LearningContext.Provider value={{
      userProgress,
      loading,
      error,
      enrollInCourse,
      completeCourse,
      completeModule,
      submitQuizResult,
      resetProgress,
    }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};
