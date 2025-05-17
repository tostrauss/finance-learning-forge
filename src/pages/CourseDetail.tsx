import React from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import { courses, quizzes, userProgress, financeTopics } from '../data/learningData';
import { ArrowLeft, BookOpen, Clock } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import ModuleCard from '../components/learning/ModuleCard';
import QuizCard from '../components/learning/QuizCard';
import { Button } from '@/components/ui/button';

const CourseDetail = () => {
  const { courseId, pathId } = useParams<{ courseId?: string; pathId?: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  
  // First check if we're viewing a learning path
  if (location.pathname.includes('/learning/path/')) {
    const learningPath = financeTopics.find(topic => topic.id === pathId);
    if (learningPath) {
      const pathCourses = courses.filter(course => course.pathId === learningPath.id);
      
      return (
        <Layout>
          <div className="max-w-4xl mx-auto p-6">
            <Link to="/learning" className="flex items-center text-app-purple hover:underline mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Back to Learning Hub
            </Link>
            
            <div className="bg-white rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-4">{learningPath.name}</h1>
              <p className="text-gray-600 mb-6">This learning path helps you master the essential skills needed for {learningPath.name.toLowerCase()}.</p>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="font-medium">Progress</span>
                  <span>{learningPath.progress}%</span>
                </div>
                <Progress value={learningPath.progress} />
              </div>
              
              <div className="space-y-6 mt-8">
                <h2 className="text-xl font-semibold">Available Courses</h2>
                {pathCourses.length > 0 ? (
                  pathCourses.map(course => (
                    <div key={course.id} className="bg-white rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{course.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                        </div>
                        <Button 
                          onClick={() => navigate(`/learning/course/${course.id}`)}
                          className="bg-app-purple hover:bg-app-dark-purple text-white"
                        >
                          Start Course
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No courses are currently available for this learning path.</p>
                )}
              </div>
            </div>
          </div>
        </Layout>
      );
    }
  }

  // If not a learning path or path not found, handle as a regular course
  const course = courses.find(c => c.id === courseId);

  if (!course) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
          <p className="mb-4">The course you are looking for does not exist or has been removed.</p>
          <Link to="/learning" className="text-app-purple hover:underline">
            Return to Learning Hub
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Regular course handling
  const totalDuration = course.modules.reduce((total, module) => total + module.duration, 0);
  const completedModules = course.modules.filter(module => module.completed).length;
  
  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <Link 
            to="/learning" 
            className="flex items-center text-app-purple hover:underline mb-4"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Learning Hub
          </Link>
          
          <div className="bg-white rounded-lg p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
                <p className="text-gray-600">{course.description}</p>
              </div>
            </div>
            
            <div className="flex items-center text-sm text-gray-500 gap-4 my-4">
              <div className="flex items-center">
                <BookOpen size={16} className="mr-1" />
                <span>{course.modules.length} modules</span>
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{totalDuration} mins</span>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">
                  Progress: {completedModules} of {course.modules.length} modules completed
                </span>
                <span className="text-sm font-medium">{course.progress}%</span>
              </div>
              <Progress 
                value={course.progress} 
                className="h-2 bg-gray-200"
                style={{ 
                  '--progress-width': `${course.progress}%`
                } as React.CSSProperties}
              />
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                <span className="font-medium">Level:</span> {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </p>
              
              {course.progress > 0 && course.progress < 100 ? (
                <Button className="bg-app-purple hover:bg-app-dark-purple">
                  Continue Course
                </Button>
              ) : course.progress === 0 ? (
                <Button className="bg-app-purple hover:bg-app-dark-purple">
                  Start Course
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  Course Completed
                </Button>
              )}
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Course Content</h2>
            
            <div className="space-y-4">
              {course.modules.map((module, index) => (
                <div key={module.id} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <ModuleCard 
                      module={module} 
                      courseId={course.id} 
                      isLocked={index > 0 && !course.modules[index-1].completed}
                    />
                  </div>
                  {module.quizId && (
                    <div className="md:col-span-1">
                      <QuizCard
                        quizId={module.quizId}
                        title={quizzes.find(q => q.id === module.quizId)?.title || 'Quiz'}
                        courseId={course.id}
                        moduleId={module.id}
                        questionsCount={quizzes.find(q => q.id === module.quizId)?.questions.length || 0}
                        userProgress={userProgress}
                        isLocked={!module.completed}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CourseDetail;