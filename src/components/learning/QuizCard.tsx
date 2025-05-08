
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { UserProgress } from '../../types/learning';
import { FileQuestion } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type QuizCardProps = {
  quizId: string;
  title: string;
  courseId: string;
  moduleId: string;
  questionsCount: number;
  userProgress: UserProgress;
  isLocked?: boolean;
};

const QuizCard = ({ 
  quizId, 
  title, 
  courseId, 
  moduleId, 
  questionsCount,
  userProgress,
  isLocked = false 
}: QuizCardProps) => {
  const quizResult = userProgress.quizResults[quizId];
  const isCompleted = !!quizResult;
  const score = isCompleted ? quizResult.score : 0;
  const totalQuestions = isCompleted ? quizResult.totalQuestions : questionsCount;
  const scorePercentage = isCompleted ? (score / totalQuestions) * 100 : 0;
  
  // Get score color based on percentage
  const getScoreColor = () => {
    if (scorePercentage >= 80) return "text-green-600";
    if (scorePercentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 border-dashed",
      isCompleted ? "border-l-4 border-l-app-light-purple border-solid" : "",
      isLocked ? "opacity-60" : "hover:shadow-md"
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center">
        <h3 className="text-md font-medium flex items-center">
          <FileQuestion size={18} className="mr-2 text-app-purple" />
          {title}
        </h3>
        {isCompleted && (
          <span className={`text-sm font-medium ${getScoreColor()}`}>
            {score}/{totalQuestions} ({Math.round(scorePercentage)}%)
          </span>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600">
          {questionsCount} question{questionsCount !== 1 ? 's' : ''}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link 
          to={`/learning/${courseId}/${moduleId}/quiz/${quizId}`}
          className={cn(
            "w-full py-2 px-4 rounded text-center text-sm transition-colors",
            isLocked 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : isCompleted
                ? "bg-app-light-purple/10 text-app-purple border border-app-light-purple hover:bg-app-light-purple/20"
                : "bg-app-orange hover:bg-app-orange/90 text-white"
          )}
          onClick={e => isLocked && e.preventDefault()}
        >
          {isCompleted ? 'Review Quiz' : 'Take Quiz'}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default QuizCard;
