
export type Quiz = {
  id: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
};

export type Module = {
  id: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  duration: number; // in minutes
  quizId: string;
  completed: boolean;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  modules: Module[];
  progress: number; // 0-100
};

export type UserProgress = {
  streak: number;
  xpEarned: number;
  quizAverage: number;
  progress: number;
  completedModules: string[];
  quizResults: Record<string, {
    score: number;
    totalQuestions: number;
    dateTaken: string;
  }>;
  enrolledCourses: string[];
  completedCourses: string[];
  selectedConcentration?: string;
};
