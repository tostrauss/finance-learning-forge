// src/components/learning/CourseDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, BookOpen, Clock, FileText, Check, AlertCircle, Star, BookMarked, 
  BarChart2, BookText, Building, Briefcase, GraduationCap
} from 'lucide-react';
import { 
  financeCourses, tradingSimulationTools 
} from '@/data/financeProgram';
import { FinanceCourse, Module } from '@/types/curriculum';

interface CourseDetailProps {
  userProgress?: {
    completedCourses: string[];
    enrolledCourses: string[];
    completedModules: string[];
  };
}

const CourseDetail: React.FC<CourseDetailProps> = ({ 
  userProgress = { 
    completedCourses: [], 
    enrolledCourses: ['fin-201'], 
    completedModules: ['fin-201-1'] 
  } 
}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find course
  const course = financeCourses.find(c => c.id === courseId);
  
  // Find related tools
  const relatedTools = tradingSimulationTools.filter(
    tool => tool.applicableCourses.includes(course?.courseCode || '')
  );

  // Calculate progress
  const calculateProgress = (course: FinanceCourse) => {
    if (!course.modules || course.modules.length === 0) return 0;
    
    const completedCount = course.modules.filter(
      module => userProgress.completedModules.includes(module.id)
    ).length;
    
    return Math.round((completedCount / course.modules.length) * 100);
  };

  if (!course) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center text-red-700">
              <AlertCircle className="mr-2 h-5 w-5" />
              Course Not Found
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">The course you are looking for does not exist or has been removed.</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/learning')}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Learning Hub
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isEnrolled = userProgress.enrolledCourses.includes(course.id);
  const isCompleted = userProgress.completedCourses.includes(course.id);
  const progress = calculateProgress(course);
  
  // Find prerequisite courses
  const prerequisiteCourses = course.prerequisites
    .map(prereq => financeCourses.find(c => c.courseCode === prereq))
    .filter(Boolean) as FinanceCourse[];
  
  // Check if prerequisites are met
  const prerequisitesMet = prerequisiteCourses.length === 0 || 
    prerequisiteCourses.every(prereq => userProgress.completedCourses.includes(prereq.id));

  // Get next incomplete module
  const getNextModule = () => {
    if (!course.modules || course.modules.length === 0) return null;
    
    return course.modules.find(module => !userProgress.completedModules.includes(module.id));
  };

  const nextModule = getNextModule();

  const renderModuleStatus = (module: Module) => {
    const isCompleted = userProgress.completedModules.includes(module.id);
    
    if (isCompleted) {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
          <Check className="mr-1 h-3 w-3" />
          Completed
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
        Available
      </Badge>
    );
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-6">
        <Link 
          to="/learning" 
          className="flex items-center text-app-purple hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Courses
        </Link>
      </div>
      
      <Card className="mb-6">
        <CardHeader className="border-b bg-app-light-purple/5">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div>
              <Badge className="mb-2">
                {course.academicLevel}00 Level
              </Badge>
              <CardTitle className="text-2xl">{course.courseCode}: {course.title}</CardTitle>
              <CardDescription className="mt-2 text-base">
                {course.description}
              </CardDescription>
            </div>
            
            <div className="flex flex-col items-end">
              <Badge variant="outline" className="mb-2">{course.credits} Credits</Badge>
              
              {isCompleted ? (
                <Badge className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Completed
                </Badge>
              ) : isEnrolled ? (
                <div className="text-right">
                  <div className="text-sm mb-1">
                    <span className="font-medium">{progress}%</span> Complete
                  </div>
                  <Progress value={progress} className="w-32 h-2" />
                </div>
              ) : (
                <Badge variant="outline">
                  {prerequisitesMet ? 'Available' : 'Prerequisites Required'}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <div>
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 md:w-auto md:inline-flex md:p-0">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Course Information</h3>
                  
                  {course.learningOutcomes && course.learningOutcomes.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Learning Outcomes</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        {course.learningOutcomes.map((outcome, index) => (
                          <li key={index} className="text-sm">{outcome}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {prerequisiteCourses.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-medium mb-2">Prerequisites</h4>
                      <div className="space-y-2">
                        {prerequisiteCourses.map(prereq => {
                          const isComplete = userProgress.completedCourses.includes(prereq.id);
                          
                          return (
                            <div 
                              key={prereq.id}
                              className={`p-3 rounded-md border ${
                                isComplete ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium text-sm">
                                    {prereq.courseCode}: {prereq.title}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {prereq.credits} Credits • {prereq.academicLevel}00 Level
                                  </div>
                                </div>
                                
                                {isComplete ? (
                                  <Badge className="bg-green-100 text-green-800">
                                    <Check className="mr-1 h-3 w-3" />
                                    Completed
                                  </Badge>
                                ) : (
                                  <Button 
                                    size="sm" 
                                    variant="outline"                                    onClick={() => navigate(`/learning/course/${prereq.id}`)}
                                  >
                                    View Course
                                  </Button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6">
                    <h4 className="font-medium mb-2">Course Content Overview</h4>
                    <div className="text-sm space-y-1 max-w-prose">
                      <p>
                        This course covers key concepts in {course.title.toLowerCase()}, 
                        providing students with both theoretical understanding and practical
                        application skills.
                      </p>
                      <p>
                        Students will develop competencies in the core areas outlined in the 
                        learning outcomes through a combination of lectures, interactive modules,
                        and hands-on simulations using the financial trading tools.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Quick Info</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-md bg-app-purple/10 flex items-center justify-center mr-3">
                        <Clock className="h-4 w-4 text-app-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Duration</div>
                        <div className="text-sm text-gray-600">
                          {course.modules.reduce((total, module) => total + module.duration, 0)} minutes
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-md bg-app-purple/10 flex items-center justify-center mr-3">
                        <BookText className="h-4 w-4 text-app-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Modules</div>
                        <div className="text-sm text-gray-600">
                          {course.modules.length} modules + quizzes
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-md bg-app-purple/10 flex items-center justify-center mr-3">
                        <Building className="h-4 w-4 text-app-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Department</div>
                        <div className="text-sm text-gray-600">
                          {course.courseCode.split(' ')[0]}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-md bg-app-purple/10 flex items-center justify-center mr-3">
                        <GraduationCap className="h-4 w-4 text-app-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Level</div>
                        <div className="text-sm text-gray-600">
                          {course.academicLevel}00 Level • {course.credits} Credits
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-md bg-app-purple/10 flex items-center justify-center mr-3">
                        <Briefcase className="h-4 w-4 text-app-purple" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Career Relevance</div>
                        <div className="text-sm text-gray-600">
                          Financial Analyst, Investment Banking, Corporate Finance
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    {isCompleted ? (
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Check className="mr-2 h-4 w-4" />
                        Completed
                      </Button>
                    ) : isEnrolled ? (
                      <Button 
                        className="w-full bg-app-purple hover:bg-app-dark-purple"                        onClick={() => {
                          if (nextModule) {
                            navigate(`/learning/course/${course.id}/${nextModule.id}`);
                          } else {
                            // If all modules are completed but course isn't marked complete
                            navigate(`/learning/course/${course.id}/${course.modules[0].id}`);
                          }
                        }}
                      >
                        {progress > 0 ? 'Continue Course' : 'Start Course'}
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        disabled={!prerequisitesMet}
                        onClick={() => {
                          // Enrollment logic would go here
                          // For now, we'll just navigate to the first module
                          if (course.modules.length > 0) {                            navigate(`/learning/course/${course.id}/${course.modules[0].id}`);
                          }
                        }}
                      >
                        {prerequisitesMet ? 'Enroll in Course' : 'Prerequisites Required'}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Modules Tab */}
            <TabsContent value="modules" className="p-6">
              <h3 className="text-lg font-semibold mb-4">Course Modules</h3>
              
              <div className="space-y-4">
                {course.modules.map((module, index) => {
                  const isCompleted = userProgress.completedModules.includes(module.id);
                  const isAvailable = index === 0 || userProgress.completedModules.includes(course.modules[index - 1].id);
                  
                  return (
                    <Card 
                      key={module.id}
                      className={`${
                        isCompleted ? 'border-l-4 border-l-green-500' : 
                        isAvailable ? 'hover:shadow-md' : 'opacity-60'
                      }`}
                    >
                      <CardHeader className="p-4 pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            Module {index + 1}: {module.title}
                          </CardTitle>
                          {renderModuleStatus(module)}
                        </div>
                        <CardDescription>
                          {module.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <div className="flex items-center text-sm text-gray-500 gap-3">
                          <div className="flex items-center">
                            <Clock size={14} className="mr-1" />
                            <span>{module.duration} minutes</span>
                          </div>
                          {module.quizId && (
                            <div className="flex items-center">
                              <FileText size={14} className="mr-1" />
                              <span>Includes Quiz</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-2">
                        <Button 
                          variant={isCompleted ? "outline" : "default"}
                          className={`w-full ${
                            isCompleted 
                              ? "border-green-500 text-green-700 hover:bg-green-50"
                              : isAvailable
                                ? "bg-app-purple hover:bg-app-dark-purple"
                                : "bg-gray-300 cursor-not-allowed"
                          }`}
                          disabled={!isAvailable}
                onClick={() => navigate(`/learning/course/${course.id}/${module.id}`)}
                        >
                          {isCompleted ? 'Review Module' : isAvailable ? 'Start Module' : 'Complete Previous Module'}
                        </Button>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources" className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Trading Tools</h3>
                  
                  {relatedTools.length > 0 ? (
                    <div className="space-y-3">
                      {relatedTools.map(tool => (
                        <Card key={tool.id}>
                          <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-base flex items-center">
                              <BarChart2 className="mr-2 h-4 w-4" />
                              {tool.name}
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-4 pt-0 pb-2">
                            <p className="text-sm text-gray-600">{tool.description}</p>
                          </CardContent>
                          <CardFooter className="p-4 pt-2">
                            <Button 
                              variant="outline" 
                              className="w-full"
                              onClick={() => navigate(`/trading/tools/${tool.id}?courseRef=${course.id}`)}
                            >
                              Launch Tool
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="border-dashed">
                      <CardContent className="p-6 text-center">
                        <p className="text-gray-500">No specific trading tools are available for this course yet.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
                  
                  <div className="space-y-3">
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BookMarked className="mr-2 h-4 w-4" />
                          Course Formula Sheet
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-gray-600">
                          Quick reference guide for all formulas and equations covered in this course.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2">
                        <Button variant="outline" className="w-full">
                          View Formula Sheet
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Star className="mr-2 h-4 w-4" />
                          Practice Problems
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-gray-600">
                          Additional exercises and problems to reinforce course concepts.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2">
                        <Button variant="outline" className="w-full">
                          View Problems
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="p-4 pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Supplementary Readings
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0 pb-2">
                        <p className="text-sm text-gray-600">
                          Additional articles and resources to deepen your understanding.
                        </p>
                      </CardContent>
                      <CardFooter className="p-4 pt-2">
                        <Button variant="outline" className="w-full">
                          View Readings
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default CourseDetail;