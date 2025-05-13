import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Brain, ChevronLeft, ChevronRight, Clock, Lightbulb, MessageSquare, Save, ThumbsUp } from 'lucide-react';

// Sample interview questions data
const interviewQuestions = {
  technical: [
    {
      id: 'tech-1',
      question: 'How would you calculate the weighted average cost of capital (WACC)?',
      category: 'Corporate Finance',
      difficulty: 'intermediate',
      sampleAnswer: 'WACC is calculated by taking the weighted average of a company\'s cost of debt and equity. The formula is: WACC = (E/V × Re) + (D/V × Rd × (1-T)), where E is market value of equity, D is market value of debt, V is total market value (E+D), Re is cost of equity, Rd is cost of debt, and T is tax rate. Each source of capital is weighted by its proportion in the company\'s structure.',
      tips: ['Remember to use market values, not book values', 'Consider the tax shield of debt', 'Reference the Capital Asset Pricing Model (CAPM) for cost of equity'],
    },
    {
      id: 'tech-2',
      question: 'What is the difference between NPV and IRR?',
      category: 'Investment Analysis',
      difficulty: 'beginner',
      sampleAnswer: 'NPV (Net Present Value) is the difference between the present value of cash inflows and outflows, giving a dollar value result. IRR (Internal Rate of Return) is the discount rate that makes the NPV equal to zero, giving a percentage result. While NPV tells you the project\'s absolute value-add, IRR tells you its efficiency. NPV is generally preferred for decision-making because it accounts for project size and reinvestment assumptions.',
      tips: ['NPV is preferred for mutually exclusive projects', 'IRR can give misleading results with non-conventional cash flows', 'NPV directly measures shareholder value creation'],
    },
    {
      id: 'tech-3',
      question: 'Walk me through a DCF (Discounted Cash Flow) analysis.',
      category: 'Valuation',
      difficulty: 'advanced',
      sampleAnswer: 'A DCF analysis has several steps: First, project free cash flows for 5-10 years. Second, determine a terminal value using either perpetuity growth or exit multiple method. Third, calculate the discount rate (typically WACC). Fourth, discount all projected cash flows to present value. Fifth, sum these PVs to find enterprise value. Finally, subtract debt and add cash to get equity value. Additional adjustments for minority interests or non-operating assets may be needed.',
      tips: ['Be prepared to discuss key assumptions', 'Know how to handle different growth phases', 'Understand sensitivity analysis for key variables'],
    },
  ],
  behavioral: [
    {
      id: 'beh-1',
      question: 'Tell me about a time you had to make a difficult financial decision with limited information.',
      category: 'Decision Making',
      difficulty: 'intermediate',
      sampleAnswer: 'In my previous role, I needed to recommend whether to proceed with a capital expenditure project when market data was inconsistent. I created three scenarios (best, base, worst case), conducted sensitivity analysis on key variables, and calculated the expected value using probability-weighted outcomes. I presented all scenarios to leadership with my recommendation for the base case, while highlighting key risk factors. The transparent approach gained stakeholder buy-in despite the uncertainties.',
      tips: ['Use the STAR method (Situation, Task, Action, Result)', 'Emphasize analytical approach and risk management', 'Show how you communicated uncertainty to stakeholders'],
    },
    {
      id: 'beh-2',
      question: 'How do you explain complex financial concepts to non-finance colleagues?',
      category: 'Communication',
      difficulty: 'beginner',
      sampleAnswer: 'When explaining complex concepts, I first assess the audience\'s knowledge level. For instance, when explaining NPV to marketing, I avoided jargon and used a simple example of comparing different investment options. I used visual aids showing cash flows over time and created an analogy to purchasing decisions they make daily. I checked understanding throughout by asking questions, and offered to provide more technical details separately to interested team members. This approach led to better cross-functional decision-making.',
      tips: ['Demonstrate adaptability to different audiences', 'Show how you use analogies or visuals', 'Emphasize how clarity improved outcomes'],
    },
    {
      id: 'beh-3',
      question: 'Describe a situation where you identified a financial risk that others missed.',
      category: 'Risk Management',
      difficulty: 'advanced',
      sampleAnswer: 'While reviewing a potential acquisition target, I noticed unusual patterns in their working capital that weren\'t highlighted in the initial analysis. By digging deeper into their accounts receivable aging and inventory turnover, I discovered that their cash conversion cycle was deteriorating despite strong reported growth. This raised red flags about the sustainability of their business model. I developed a more conservative valuation model accounting for this risk and presented my findings, which led to a reassessment of the acquisition price and ultimately better deal terms.',
      tips: ['Highlight your attention to detail', 'Show how you took initiative', 'Quantify the impact of your discovery if possible'],
    },
  ]
};

const InterviewSimulator = () => {
  const [activeTab, setActiveTab] = useState('settings');
  const [questionType, setQuestionType] = useState('technical');
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);
  const [remainingTime, setRemainingTime] = useState(120); // 2 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Filter questions based on selected criteria
  const filteredQuestions = interviewQuestions[questionType as keyof typeof interviewQuestions].filter(q => {
    if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
    if (category !== 'all' && q.category !== q.category) return false;
    return true;
  });
  
  // Get all unique categories for the selected question type
  const categories = [...new Set(
    interviewQuestions[questionType as keyof typeof interviewQuestions].map(q => q.category)
  )];
  
  // Start interview simulation
  const startInterview = () => {
    // Randomly select 5 questions from filtered questions
    const randomized = [...filteredQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(randomized.slice(0, 5));
    setCurrentQuestion(0);
    setUserAnswer('');
    setIsAnswered(false);
    setShowFeedback(false);
    setRemainingTime(120);
    setActiveTab('interview');
    
    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Submit answer and show feedback
  const submitAnswer = () => {
    clearInterval(timerRef.current!);
    setIsAnswered(true);
    setShowFeedback(true);
  };
  
  // Go to next question
  const nextQuestion = () => {
    if (currentQuestion < selectedQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setUserAnswer('');
      setIsAnswered(false);
      setShowFeedback(false);
      setRemainingTime(120);
      
      // Restart timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      // End of interview
      setActiveTab('results');
    }
  };
  
  // Format remaining time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Get appropriate badge color based on difficulty
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-blue-100 text-blue-800';
      case 'advanced': return 'bg-app-purple/10 text-app-purple';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-app-purple">Finance Interview Simulator</CardTitle>
          <CardDescription>
            Practice answering common finance interview questions to prepare for your career
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings" disabled={activeTab === 'interview'}>
                Settings
              </TabsTrigger>
              <TabsTrigger value="interview" disabled={activeTab === 'settings' && selectedQuestions.length === 0}>
                Interview
              </TabsTrigger>
              <TabsTrigger value="results" disabled={activeTab !== 'results'}>
                Results
              </TabsTrigger>
            </TabsList>
            
            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6 pt-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Interview Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question Type</label>
                    <Tabs value={questionType} onValueChange={setQuestionType} className="w-full">
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="technical" className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Technical
                        </TabsTrigger>
                        <TabsTrigger value="behavioral" className="flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          Behavioral
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Difficulty Level</label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question Category</label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={startInterview} 
                      className="w-full bg-app-purple hover:bg-app-dark-purple"
                      disabled={filteredQuestions.length === 0}
                    >
                      Start Interview Practice
                    </Button>
                    
                    {filteredQuestions.length === 0 && (
                      <p className="text-sm text-red-500 mt-2">
                        No questions match your filters. Please adjust your criteria.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">Interview Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="mt-1 text-app-purple">
                        <ThumbsUp className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Structure Your Answers</h3>
                        <p className="text-sm text-gray-600">For technical questions, explain your approach step by step. For behavioral questions, use the STAR method (Situation, Task, Action, Result).</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="mt-1 text-app-purple">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Time Management</h3>
                        <p className="text-sm text-gray-600">Keep answers concise but thorough (1-2 minutes). Focus on the most relevant points and quantify impact when possible.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <div className="mt-1 text-app-purple">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Show Your Thinking</h3>
                        <p className="text-sm text-gray-600">Interviewers want to see your analytical approach. Explain your thought process, assumptions, and how you would verify them.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Interview Tab */}
            <TabsContent value="interview" className="pt-4">
              {selectedQuestions.length > 0 && (
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500">
                          Question {currentQuestion + 1} of {selectedQuestions.length}
                        </span>
                        <Badge className={`${getDifficultyColor(selectedQuestions[currentQuestion].difficulty)}`}>
                          {selectedQuestions[currentQuestion].difficulty.charAt(0).toUpperCase() + selectedQuestions[currentQuestion].difficulty.slice(1)}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className={`text-sm font-medium ${remainingTime < 30 ? 'text-red-500' : 'text-gray-500'}`}>
                          {formatTime(remainingTime)}
                        </span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">
                      {selectedQuestions[currentQuestion].question}
                    </CardTitle>
                    <Badge variant="outline">
                      {selectedQuestions[currentQuestion].category}
                    </Badge>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea 
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      placeholder="Type your answer here..."
                      className="min-h-[200px]"
                      disabled={isAnswered}
                    />
                    
                    {showFeedback && (
                      <Card className="bg-app-light-purple/5 border-app-light-purple">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-md flex items-center">
                            <Lightbulb className="h-5 w-5 mr-2 text-app-purple" />
                            Sample Answer
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-800">
                            {selectedQuestions[currentQuestion].sampleAnswer}
                          </p>
                          
                          {selectedQuestions[currentQuestion].tips.length > 0 && (
                            <div className="mt-3">
                              <h4 className="text-sm font-medium mb-1">Key Points to Remember:</h4>
                              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                {selectedQuestions[currentQuestion].tips.map((tip: string, index: number) => (
                                  <li key={index}>{tip}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {!isAnswered ? (
                      <Button 
                        onClick={submitAnswer} 
                        className="w-full bg-app-purple hover:bg-app-dark-purple"
                        disabled={userAnswer.trim().length < 10}
                      >
                        Submit Answer
                      </Button>
                    ) : (
                      <Button 
                        onClick={nextQuestion} 
                        className="w-full bg-app-purple hover:bg-app-dark-purple"
                      >
                        {currentQuestion < selectedQuestions.length - 1 ? 'Next Question' : 'See Results'}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            
            {/* Results Tab */}
            <TabsContent value="results" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Interview Practice Session Complete</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-app-light-purple/5 p-4 rounded-md">
                    <h3 className="font-medium text-app-purple mb-2">Practice Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-app-purple">{selectedQuestions.length}</p>
                        <p className="text-sm text-gray-600">Questions</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-app-purple">{questionType === 'technical' ? 'Technical' : 'Behavioral'}</p>
                        <p className="text-sm text-gray-600">Focus Area</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-app-purple">
                          {difficulty === 'all' ? 'Mixed' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </p>
                        <p className="text-sm text-gray-600">Difficulty</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Next Steps for Improvement</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <p className="text-sm">Review the sample answers and compare to your responses</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <p className="text-sm">Practice with a different question type or difficulty level</p>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="mt-1 text-green-600">
                          <ChevronRight className="h-4 w-4" />
                        </div>
                        <p className="text-sm">Focus on areas where you struggled to articulate clear answers</p>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-4 flex gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setActiveTab('settings')}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      New Practice Session
                    </Button>
                    <Button 
                      className="flex-1 bg-app-purple hover:bg-app-dark-purple"
                      onClick={() => alert('This would save your practice results in a complete implementation.')}
                    >
                      <Save className="h-4 w-4 mr-1" />
                      Save Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default InterviewSimulator;