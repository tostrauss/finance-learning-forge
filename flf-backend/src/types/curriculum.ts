export interface Module {
  id: string;
  title: string;
  description: string;
  content: string;
  duration: number;
  quizId: string;
  completed: boolean;
}

export interface FinanceCourse {
  id: string;
  courseCode: string;
  title: string;
  credits: number;
  description: string;
  academicLevel: number;
  prerequisites: string[];
  concentrations: string[];
  learningOutcomes: string[];
  modules: Module[];
}