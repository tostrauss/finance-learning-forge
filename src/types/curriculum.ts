// src/types/curriculum.ts

/**
 * Academic level of courses (100-500)
 */
export type AcademicLevel = 100 | 200 | 300 | 400 | 500;

/**
 * Module within a course
 */
export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number; // in minutes
  quizId: string;
  completed: boolean;
}

/**
 * Quiz question
 */
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

/**
 * Quiz for a course module
 */
export interface Quiz {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

/**
 * Course prerequisite requirement
 */
export interface Prerequisite {
  courseId: string;
  minGrade?: string;
}

/**
 * Finance course
 */
export interface FinanceCourse {
  id: string;
  courseCode: string; // e.g., "FIN 201"
  title: string;
  credits: number;
  description: string;
  academicLevel: AcademicLevel;
  prerequisites: string[]; // Course codes
  concentrations: string[]; // Concentration IDs this course belongs to
  modules: Module[];
  progress?: number; // Student's progress in the course (0-100)
  learningOutcomes?: string[];
  pathId?: string; // Learning path ID this course belongs to
}

/**
 * Concentration within the finance program
 */
export interface Concentration {
  id: string;
  name: string;
  description: string;
  requiredCourses: string[]; // Course codes
  electiveCourses: string[]; // Course codes
}

/**
 * Category of program requirements
 */
export interface ProgramCategory {
  name: string;
  requiredCredits: number;
  courses: string[]; // Course codes
}

/**
 * Program requirement section
 */
export interface ProgramRequirement {
  id: string;
  name: string;
  description: string;
  requiredCredits: number;
  categories: ProgramCategory[];
}

/**
 * Finance degree program
 */
export interface Program {
  id: string;
  name: string;
  description: string;
  totalCredits: number;
  generalEducationCredits: number;
  businessCoreCredits: number;
  majorCoreCredits: number;
  concentrationCredits: number;
  careerCoreCredits: number;
  electiveCredits: number;
  programOutcomes: string[];
  careerOpportunities?: string[];
  accreditation?: string;
}

/**
 * Quiz result
 */
export interface QuizResult {
  score: number;
  totalQuestions: number;
  dateTaken: string;
}

/**
 * User progress in the program
 */
export interface UserProgress {
  streak: number;
  xpEarned: number;
  quizAverage: number;
  progress: number;
  completedModules: string[];
  quizResults: Record<string, QuizResult>;
  enrolledCourses: string[];
  completedCourses: string[];
  selectedConcentration?: string;
}

/**
 * Trading simulation tool
 */
export interface TradingTool {
  id: string;
  name: string;
  description: string;
  applicableCourses: string[]; // Course codes
}

/**
 * Career resource
 */
export interface CareerResource {
  id: string;
  name: string;
  description: string;
  relatedCourses: string[]; // Course codes
}