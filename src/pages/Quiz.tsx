
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { courses, quizzes } from '../data/learningData';
import { ArrowLeft, Check, HelpCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const Quiz = () => {
  const { courseId, moduleId, quizId } = useParams<{ courseId: string, moduleId: string, quizId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find course, module and quiz
  const course = courses.find(c => c.id === courseId);
  const module = course?.modules.find(m => m.id === moduleId);
  const quiz = quizzes.find(q => q.id === quizId);
  
  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(Array(quiz?.questions.length || 0).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  if (!course || !module || !quiz) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Found</h1>
          <p className="mb-4">The quiz you are looking for does not exist or has been removed.</p>
          <Link to="/learning" className="text-app-purple hover:underline">
            Return to Learning Hub
          </Link>
        </div>
      </Layout>
    );
  }
  
  const question = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  
  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = parseInt(value);
    setSelectedAnswers(newSelectedAnswers);
  };
  
  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correct = selectedAnswers.reduce((acc, answer, index) => {
        if (answer === quiz.questions[index].correctAnswer) {
          return acc + 1;
        }
        return acc;
      }, 0);
      
      setScore(correct);
      setShowResults(true);
      
      toast({
        title: "Quiz Completed",
        description: `You scored ${correct} out of ${quiz.questions.length}`,
      });
    }
  };
  
  // Go to previous question
  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Complete quiz and go back to course
  const finishQuiz = () => {
    navigate(`/learning/${courseId}`);
  };
  
  // Show results view
  if (showResults) {
    const percentScore = (score / quiz.questions.length) * 100;
    
    return (
      <Layout>
        <div className="max-w-3xl mx-auto">
          <Link 
            to={`/learning/${courseId}`}
            className="flex items-center text-app-purple hover:underline mb-6"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Course
          </Link>
          
          <Card className="bg-white mb-8">
            <CardHeader className="pb-2">
              <h1 className="text-2xl font-bold">{quiz.title} - Results</h1>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-app-light-purple/10 mb-4">
                  <span className="text-2xl font-bold text-app-purple">{score}/{quiz.questions.length}</span>
                </div>
                <h2 className="text-xl font-bold mb-2">
                  {percentScore >= 80 ? 'Excellent!' : percentScore >= 60 ? 'Good job!' : 'Keep learning!'}
                </h2>
                <p className="text-gray-600 mb-6">
                  You scored {score} out of {quiz.questions.length} questions correctly ({Math.round(percentScore)}%)
                </p>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">Score</span>
                    <span className="text-sm font-medium">{Math.round(percentScore)}%</span>
                  </div>
                  <Progress 
                    value={percentScore} 
                    className="h-3 bg-gray-200"
                    style={{ 
                      '--progress-width': `${percentScore}%`
                    } as React.CSSProperties}
                  />
                </div>
              </div>
              
              <div className="space-y-4 mt-4">
                <h3 className="font-semibold">Question Summary:</h3>
                {quiz.questions.map((q, idx) => (
                  <div 
                    key={q.id} 
                    className={cn(
                      "p-3 rounded-md",
                      selectedAnswers[idx] === q.correctAnswer 
                        ? "bg-green-50 border border-green-200" 
                        : "bg-red-50 border border-red-200"
                    )}
                  >
                    <div className="flex items-start">
                      <div className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center mr-2",
                        selectedAnswers[idx] === q.correctAnswer 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      )}>
                        {selectedAnswers[idx] === q.correctAnswer 
                          ? <Check size={14} /> 
                          : <X size={14} />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{idx+1}. {q.question}</p>
                        <p className="text-xs mt-1">
                          <span className="font-medium">Your answer:</span> {q.options[selectedAnswers[idx]]}
                        </p>
                        {selectedAnswers[idx] !== q.correctAnswer && (
                          <p className="text-xs mt-1 text-green-700">
                            <span className="font-medium">Correct answer:</span> {q.options[q.correctAnswer]}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={finishQuiz}
                className="w-full bg-app-purple hover:bg-app-dark-purple"
              >
                Back to Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Link 
          to={`/learning/${courseId}/${moduleId}`}
          className="flex items-center text-app-purple hover:underline mb-6"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Module
        </Link>
        
        <Card className="bg-white mb-8">
          <CardHeader className="pb-2">
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span className="text-sm font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress 
              value={progress} 
              className="h-2 bg-gray-200 mb-6"
              style={{ 
                '--progress-width': `${progress}%`
              } as React.CSSProperties}
            />
            
            <div className="p-4 rounded-lg bg-app-light-purple/5 mb-6">
              <h2 className="text-lg font-semibold mb-4">{question.question}</h2>
              
              <RadioGroup 
                value={selectedAnswers[currentQuestion].toString()} 
                onValueChange={handleAnswerSelect}
              >
                <div className="space-y-3">
                  {question.options.map((option, optionIdx) => (
                    <div key={optionIdx} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={optionIdx.toString()} 
                        id={`option-${optionIdx}`}
                        className="border-app-purple text-app-purple"
                      />
                      <Label 
                        htmlFor={`option-${optionIdx}`}
                        className="flex-1 cursor-pointer py-2"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex items-center text-gray-600 mb-2">
              <HelpCircle size={14} className="mr-1" />
              <span className="text-xs">Select the best answer and click Next to continue</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === -1}
              className="bg-app-purple hover:bg-app-dark-purple"
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Quiz;
