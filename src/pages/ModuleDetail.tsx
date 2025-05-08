
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { courses, quizzes } from '../data/learningData';
import { ArrowLeft, ArrowRight, BookText, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Module } from '../types/learning';
import { useToast } from '@/hooks/use-toast';

const ModuleDetail = () => {
  const { courseId, moduleId } = useParams<{ courseId: string, moduleId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find course and module
  const course = courses.find(c => c.id === courseId);
  const moduleIndex = course?.modules.findIndex(m => m.id === moduleId) ?? -1;
  const module = moduleIndex !== -1 ? course?.modules[moduleIndex] : undefined;
  
  // State for reading progress
  const [readingProgress, setReadingProgress] = useState(0);
  const [completed, setCompleted] = useState(module?.completed || false);
  
  // Handle scroll to track reading progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight - element.clientHeight;
    const progress = Math.min(Math.round((scrollTop / scrollHeight) * 100), 100);
    setReadingProgress(progress);
  };
  
  // Mark as completed
  const markAsCompleted = () => {
    setCompleted(true);
    toast({
      title: "Module Completed",
      description: `You've completed ${module?.title}`,
    });
    
    // Check if there's a quiz for this module
    if (module?.quizId) {
      navigate(`/learning/${courseId}/${moduleId}/quiz/${module.quizId}`);
    } else if (course && moduleIndex < course.modules.length - 1) {
      // Navigate to next module
      navigate(`/learning/${courseId}/${course.modules[moduleIndex + 1].id}`);
    } else {
      // Navigate back to course
      navigate(`/learning/${courseId}`);
    }
  };
  
  if (!course || !module) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <p className="mb-4">The module you are looking for does not exist or has been removed.</p>
          <Link to="/learning" className="text-app-purple hover:underline">
            Return to Learning Hub
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Get next and previous modules
  const prevModule = moduleIndex > 0 ? course.modules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < course.modules.length - 1 ? course.modules[moduleIndex + 1] : null;
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <Link 
            to={`/learning/${courseId}`}
            className="flex items-center text-app-purple hover:underline"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back to Course
          </Link>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <BookText size={14} />
              <span>Module {moduleIndex + 1} of {course.modules.length}</span>
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span>{module.duration} mins</span>
            </Badge>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold">{module.title}</h1>
            <p className="text-gray-600 mt-1">{module.description}</p>
          </div>
          
          <div 
            className="p-6 prose prose-blue max-w-none h-[60vh] overflow-y-auto" 
            onScroll={handleScroll}
            dangerouslySetInnerHTML={{ __html: module.content }}
          />
          
          <div className="p-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">Reading Progress</span>
              <span className="text-sm font-medium">{readingProgress}%</span>
            </div>
            <Progress 
              value={readingProgress} 
              className="h-2 bg-gray-200 mb-6"
              style={{ 
                '--progress-width': `${readingProgress}%`
              } as React.CSSProperties}
            />
            
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                {prevModule && (
                  <Link 
                    to={`/learning/${courseId}/${prevModule.id}`}
                    className="flex items-center text-gray-600 hover:text-app-purple"
                  >
                    <ArrowLeft size={16} className="mr-1" />
                    Previous
                  </Link>
                )}
              </div>
              
              <div className="flex gap-4 items-center">
                {nextModule && (
                  <Link 
                    to={`/learning/${courseId}/${nextModule.id}`}
                    className="flex items-center text-gray-600 hover:text-app-purple"
                  >
                    Next
                    <ArrowRight size={16} className="ml-1" />
                  </Link>
                )}
                
                <Button 
                  onClick={markAsCompleted}
                  disabled={completed}
                  className={completed ? "bg-green-600" : "bg-app-purple hover:bg-app-dark-purple"}
                >
                  {completed ? (
                    <>
                      <Check size={16} className="mr-1" />
                      Completed
                    </>
                  ) : 'Mark as Completed'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ModuleDetail;
