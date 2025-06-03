import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { UserProgress, QuizResult } from '@/types/learning';

const COLLECTION = 'userProgress';

interface FirestoreUserProgress {
  courseProgress: {
    [courseId: string]: {
      courseId: string;
      enrolled: boolean;
      completed: boolean;
      lastAccessed: any; // Firestore Timestamp
    };
  };
  moduleProgress: {
    [moduleId: string]: {
      moduleId: string;
      completed: boolean;
      lastAccessed: any; // Firestore Timestamp
    };
  };
  quizResults: {
    [quizId: string]: {
      score: number;
      totalQuestions: number;
      dateTaken: string;
    };
  };
  streak: number;
  xpEarned: number;
  lastActive: any; // Firestore Timestamp
}

// Initialize user progress
export async function initializeUserProgress(user: User): Promise<void> {
  const docRef = doc(db, COLLECTION, user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    const initialProgress: FirestoreUserProgress = {
      courseProgress: {},
      moduleProgress: {},
      quizResults: {},
      streak: 0,
      xpEarned: 0,
      lastActive: serverTimestamp(),
    };
    await setDoc(docRef, initialProgress);
  }
}

// Get user progress
export async function getUserProgress(user: User): Promise<UserProgress> {
  const docRef = doc(db, COLLECTION, user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    await initializeUserProgress(user);
    return {
      streak: 0,
      xpEarned: 0,
      quizAverage: 0,
      progress: 0,
      completedModules: [],
      quizResults: {},
      enrolledCourses: [],
      completedCourses: [],
    };
  }

  const data = docSnap.data() as FirestoreUserProgress;
  
  // Calculate quiz average
  const quizScores = Object.values(data.quizResults);
  const quizAverage = quizScores.length > 0
    ? quizScores.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions * 100), 0) / quizScores.length
    : 0;

  // Get enrolled and completed courses
  const enrolledCourses = Object.values(data.courseProgress)
    .filter(course => course.enrolled)
    .map(course => course.courseId);

  const completedCourses = Object.values(data.courseProgress)
    .filter(course => course.completed)
    .map(course => course.courseId);

  // Get completed modules
  const completedModules = Object.values(data.moduleProgress)
    .filter(module => module.completed)
    .map(module => module.moduleId);

  // Calculate overall progress (completed modules / total modules)
  const progress = completedModules.length / 100; // You might want to adjust this based on total available modules

  return {
    streak: data.streak,
    xpEarned: data.xpEarned,
    quizAverage,
    progress,
    completedModules,
    quizResults: data.quizResults,
    enrolledCourses,
    completedCourses,
  };
}

// Update course progress
export async function updateCourseProgress(
  user: User,
  courseId: string,
  enrolled: boolean,
  completed: boolean
): Promise<void> {
  const docRef = doc(db, COLLECTION, user.uid);
  const update = {
    [`courseProgress.${courseId}`]: {
      courseId,
      enrolled,
      completed,
      lastAccessed: serverTimestamp(),
    },
    lastActive: serverTimestamp(),
  };
  await updateDoc(docRef, update);
}

// Update module completion
export async function updateModuleProgress(
  user: User,
  moduleId: string,
  completed: boolean
): Promise<void> {
  const docRef = doc(db, COLLECTION, user.uid);
  const update = {
    [`moduleProgress.${moduleId}`]: {
      moduleId,
      completed,
      lastAccessed: serverTimestamp(),
    },
    lastActive: serverTimestamp(),
  };
  await updateDoc(docRef, update);
}

// Save quiz result
export async function saveQuizResult(
  user: User,
  quizId: string,
  score: number,
  totalQuestions: number
): Promise<void> {
  const docRef = doc(db, COLLECTION, user.uid);
  const update = {
    [`quizResults.${quizId}`]: {
      score,
      totalQuestions,
      dateTaken: new Date().toISOString(),
    },
    lastActive: serverTimestamp(),
  };
  // Add XP for completing quiz
  const baseXP = 10; // Base XP for completing a quiz
  const performanceBonus = Math.round((score / totalQuestions) * 20); // Up to 20 bonus XP based on performance
  const docSnap = await getDoc(docRef);
  const currentXP = docSnap.exists() ? (docSnap.data() as FirestoreUserProgress).xpEarned : 0;
  update['xpEarned'] = currentXP + baseXP + performanceBonus;

  await updateDoc(docRef, update);
}

// Update streak and XP
export async function updateStreakAndXP(
  user: User,
  newStreak: number,
  additionalXP: number
): Promise<void> {
  const docRef = doc(db, COLLECTION, user.uid);
  const update = {
    streak: newStreak,
    xpEarned: additionalXP,
    lastActive: serverTimestamp(),
  };
  await updateDoc(docRef, update);
}

// Get specific quiz result
export async function getQuizResult(
  user: User,
  quizId: string
): Promise<QuizResult | null> {
  const docRef = doc(db, COLLECTION, user.uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data() as FirestoreUserProgress;
  return data.quizResults[quizId] || null;
}
