// src/pages/Learning.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FinanceLearningPath from '../components/learning/FinanceLearningPath';
import { userProgress, courses } from '../data/learningData';
import { School, BookOpen, GraduationCap, CheckCircle, BarChart2, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

// Sample progress data for weekly chart
const progressData = [
  { day: 'Mon', lessons: 2, xp: 45, minutes: 35 },
  { day: 'Tue', lessons: 1, xp: 30, minutes: 22 },
  { day: 'Wed', lessons: 3, xp: 65, minutes: 55 },
  { day: 'Thu', lessons: 2, xp: 50, minutes: 40 },
  { day: 'Fri', lessons: 1, xp: 25, minutes: 18 },
  { day: 'Sat', lessons: 4, xp: 85, minutes: 70 },
  { day: 'Sun', lessons: 2, xp: 45, minutes: 38 }
];

// Sample quiz data
const quizData = [
  { subject: 'Financial Markets', score: 75, date: '2025-05-10' },
  { subject: 'Investment Analysis', score: 85, date: '2025-05-05' },
  { subject: 'Corporate Finance', score: 65, date: '2025-04-28' },
  { subject: 'Risk Management', score: 90, date: '2025-04-20' },
  { subject: 'Financial Planning', score: 80, date: '2025-04-15' }
];

// Sample finance topic categories
const financeTopics = [
  { id: 'corporate-finance', name: 'Corporate Finance', progress: 35, color: '#5C2D91' },
  { id: 'planning', name: 'Financial Planning & Analysis', progress: 20, color: '#0078D4' },
  { id: 'investments', name: 'Investment Management', progress: 30, color: '#217346' },
  { id: 'banking', name: 'Financial Services & Banking', progress: 15, color: '#4A154B' },
  { id: 'general', name: 'General Finance', progress: 65, color: '#B7472A' },
  { id: 'international', name: 'International Finance', progress: 10, color: '#8764B8' },
  { id: 'personal', name: 'Personal Financial Planning', progress: 45, color: '#C74634' },
];

const Learning = () => {
  const navigate = useNavigate();
  
  // Find last worked on course
  const findLastWorkedOnCourse = () => {
    if (!userProgress.enrolledCourses || userProgress.enrolledCourses.length === 0) {
      return null;
    }
    return courses.find(c => c.id === userProgress.enrolledCourses[0]);
  };
  
  const lastCourse = findLastWorkedOnCourse();
  
  // Get enrolled courses
  const enrolledCourses = courses.filter(course => 
    userProgress.enrolledCourses && userProgress.enrolledCourses.includes(course.id)
  );
  
  // Calculate overall progress
  const totalLessons = 24; // Total number of lessons in curriculum
  const completedLessons = userProgress.completedModules ? userProgress.completedModules.length : 0;
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);
  
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-app-purple">Post University Finance Hub</h1>
          <p className="text-gray-600 mt-1">Extensive Curriculum to ease financial journey</p>
        </div>
        
        {/* User Info & Last Thing Worked On */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium">Finance Student</h2>
                <p className="text-gray-600">Bachelor of Science in Finance</p>
                <p className="text-sm text-gray-500 mt-2">Last thing you worked on:</p>
              </div>
            </div>
            
            {lastCourse && (
              <div className="mt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">{lastCourse.title}</span>
                  <span>{lastCourse.progress}%</span>
                </div>
                <Progress value={lastCourse.progress} className="mb-3" />
                <Button 
                  className="bg-app-purple hover:bg-app-dark-purple"
                  onClick={() => navigate(`/learning/${lastCourse.id}`)}
                >
                  Continue Learning
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Learning Dashboard Section */}
        <LearningDashboardSection />
        
        {/* Course Categories with Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-6">Finance Courses</h2>
          <div className="space-y-5">
            {financeTopics.map(topic => (
              <div key={topic.id}>
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{topic.name}</span>
                  <span>{topic.progress}%</span>
                </div>
                <Progress 
                  value={topic.progress} 
                  className="h-2" 
                  style={{backgroundColor: `${topic.color}20`}}
                />
                <div className="mt-2 text-right">                <Button 
                  variant="link" 
                  className="text-sm px-0" 
                  style={{color: topic.color}}                  onClick={() => navigate(`/learning/${topic.id}`)}
                >
                  Continue Learning →
                </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Overall Progress */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Overall Progress</h2>
          <Progress value={overallProgress} className="h-4 bg-gray-200" />
          <p className="mt-2 text-sm text-gray-600">
            {completedLessons} of {totalLessons} lessons completed ({overallProgress}%)
          </p>
        </div>
        
        {/* Current Courses */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Current Courses</h2>
          <div className="space-y-4">
            {enrolledCourses.map(course => (
              <div key={course.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                <div className="flex-1">
                  <p className="font-medium">{course.title}</p>
                  <div className="flex items-center mt-1">
                    <Progress value={course.progress} className="flex-1 mr-3" />
                    <span className="text-sm">{course.progress}%</span>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="ml-4 bg-app-purple hover:bg-app-dark-purple"
                  onClick={() => navigate(`/learning/${course.id}`)}
                >
                  Continue
                </Button>
              </div>
            ))}
            
            {enrolledCourses.length === 0 && (
              <div className="text-center p-8 bg-gray-50 rounded-md">
                <p className="text-gray-500">No courses enrolled yet.</p>
                <Button 
                  className="mt-4 bg-app-purple hover:bg-app-dark-purple"
                  onClick={() => navigate('/learning?view=all')}
                >
                  Browse Courses
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Recommended Next Steps */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">Recommended Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center text-app-purple mb-2">
                  <BookOpen className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Continue Learning</h3>
                </div>
                <p className="text-sm text-gray-600">Financial Statement Analysis</p>
                <p className="text-xs text-gray-500 mt-1">Learn to interpret balance sheets and income statements</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center text-app-purple mb-2">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Take a Quiz</h3>
                </div>
                <p className="text-sm text-gray-600">Risk Management</p>
                <p className="text-xs text-gray-500 mt-1">Test your knowledge on portfolio risk assessment</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center text-app-purple mb-2">
                  <Clock className="h-5 w-5 mr-2" />
                  <h3 className="font-medium">Daily Challenge</h3>
                </div>
                <p className="text-sm text-gray-600">Corporate Valuation</p>
                <p className="text-xs text-gray-500 mt-1">Complete today's challenge to maintain your streak</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const LearningDashboardSection = () => {
  const [activeTab, setActiveTab] = useState('paths');
  
  return (
    <Card className="mb-8">
      <CardHeader className="pb-2">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 text-app-purple mr-2" />
          <h2 className="text-xl font-medium">Learning Dashboard</h2>
        </div>
        <p className="text-gray-600">Track your progress in Post University's finance curriculum</p>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="weekly">Weekly Progress</TabsTrigger>
            <TabsTrigger value="quiz">Quiz Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="paths">
            <PathsTabContent />
          </TabsContent>
          
          <TabsContent value="weekly">
            <WeeklyProgressTabContent />
          </TabsContent>
          
          <TabsContent value="quiz">
            <QuizPerformanceTabContent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Learning Paths tab content
const PathsTabContent = () => {
  const navigate = useNavigate();
  const learningPaths = [
    { id: 'corporate-finance', name: 'Corporate Finance', level: 1, progress: 1, nextModule: 'Capital Structure Optimization' },
    { id: 'planning', name: 'Financial Planning & Analysis', level: 1, progress: 1, nextModule: 'Budgeting and Forecasting' },
    { id: 'investments', name: 'Investment Management', level: 1, progress: 1, nextModule: 'Portfolio Construction' },
  ];
  
  return (
    <div className="space-y-6 py-2">
      {learningPaths.map(path => (
        <Card key={path.id} className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-lg">{path.name}</h3>
              <p className="text-sm text-gray-500">Level {path.level}</p>
            </div>
            <Button 
              onClick={() => navigate(`/learning/path/${path.id}`)}
              className="bg-app-purple hover:bg-app-dark-purple text-white"
            >
              Continue
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{path.progress}%</span>
            </div>
            <Progress value={path.progress} />
            <p className="text-sm text-gray-500">
              Next: {path.nextModule}
            </p>
          </div>
        </Card>
      ))}

      <div className="mt-4 text-center">
        <Button variant="link" className="text-app-purple">
          View All Learning Paths
        </Button>
      </div>
    </div>
  );
};

// Weekly Progress tab content
const WeeklyProgressTabContent = () => {
  const weeklyData = [
    { day: 'Mon', lessons: 2, xp: 45, minutes: 35 },
    { day: 'Tue', lessons: 1, xp: 30, minutes: 22 },
    { day: 'Wed', lessons: 3, xp: 65, minutes: 55 },
    { day: 'Thu', lessons: 2, xp: 50, minutes: 40 },
    { day: 'Fri', lessons: 1, xp: 25, minutes: 18 },
    { day: 'Sat', lessons: 4, xp: 85, minutes: 70 },
    { day: 'Sun', lessons: 2, xp: 45, minutes: 38 }
  ];
  
  const weeklyStats = {
    totalLessons: 15,
    totalXP: 345,
    totalMinutes: 278,
    averagePerDay: 2.1
  };
  
  const [chartMetric, setChartMetric] = useState('xp');
  
  return (
    <div className="py-2">
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <Button 
            variant={chartMetric === 'xp' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setChartMetric('xp')}
            className={chartMetric === 'xp' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
          >
            XP Gained
          </Button>
          <Button 
            variant={chartMetric === 'lessons' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setChartMetric('lessons')}
            className={chartMetric === 'lessons' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
          >
            Lessons
          </Button>
          <Button 
            variant={chartMetric === 'minutes' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setChartMetric('minutes')}
            className={chartMetric === 'minutes' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
          >
            Study Time
          </Button>
        </div>
        
        <Select defaultValue="week">
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey={chartMetric} 
              stroke="#5C2D91" 
              strokeWidth={2} 
              name={chartMetric === 'xp' ? 'XP Gained' : chartMetric === 'lessons' ? 'Lessons Completed' : 'Minutes Studied'} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Total Lessons</p>
            <p className="text-2xl font-bold text-app-purple">{weeklyStats.totalLessons}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Total XP</p>
            <p className="text-2xl font-bold text-app-purple">{weeklyStats.totalXP}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Study Time</p>
            <p className="text-2xl font-bold text-app-purple">{weeklyStats.totalMinutes} min</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Daily Average</p>
            <p className="text-2xl font-bold text-app-purple">{weeklyStats.averagePerDay}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Quiz Performance tab content
const QuizPerformanceTabContent = () => {
  const navigate = useNavigate();
  const averageScore = quizData.reduce((sum, quiz) => sum + quiz.score, 0) / quizData.length;
  
  return (
    <div className="py-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#5C2D91" name="Quiz Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-3">Recent Quiz Results</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {quizData.map((quiz, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{quiz.subject}</p>
                    <p className="text-xs text-gray-500">{quiz.date}</p>
                  </div>
                  <div className={`px-2 py-1 rounded ${
                    quiz.score >= 80 ? 'bg-green-100 text-green-800' : 
                    quiz.score >= 60 ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {quiz.score}<span>%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-3">Average Score</h3>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-app-purple">{averageScore.toFixed(2)}<span>%</span></p>
            <Button 
              size="sm" 
              variant="outline" 
              className="text-app-purple border-app-purple"
              onClick={() => navigate('/learning/quiz')}
            >
              Take a Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learning;