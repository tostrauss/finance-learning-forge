import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, BookOpen, AlertCircle } from 'lucide-react';
import { programRequirements, financeCourses } from '@/data/financeProgram';

interface AcademicProgressProps {
  userProgress: {
    completedCredits: number;
    enrolledCourses: string[];
    completedCourses: string[];
    selectedConcentration?: string;
  };
}

const AcademicProgress: React.FC<AcademicProgressProps> = ({ userProgress }) => {
  const totalRequiredCredits = 120; // BS Finance program requirement
  const progressPercentage = Math.round((userProgress.completedCredits / totalRequiredCredits) * 100);
  
  // Calculate requirements progress
  const requirementsProgress = programRequirements.map(requirement => {
    const completedCourseIds = userProgress.completedCourses;
    const completedCoursesInRequirement = financeCourses
      .filter(course => 
        completedCourseIds.includes(course.id) && 
        requirement.categories.some(cat => 
          cat.courses.includes(course.courseCode)
        )
      );
    
    const creditsCompleted = completedCoursesInRequirement.reduce((sum, course) => sum + course.credits, 0);
    const percentage = Math.min(100, Math.round((creditsCompleted / requirement.requiredCredits) * 100));
    
    return {
      ...requirement,
      creditsCompleted,
      percentage
    };
  });

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-app-purple" />
          Academic Progress
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Overall progress */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium">Degree Progress</span>
            <span className="text-sm font-medium">{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="mt-2 text-sm text-gray-600">{userProgress.completedCredits} of {totalRequiredCredits} credits completed</p>
        </div>
        
        {/* Program requirements breakdown */}
        <div className="space-y-4">
          {requirementsProgress.map(req => (
            <div key={req.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">{req.name}</span>
                <span className="text-sm font-medium">{req.percentage}%</span>
              </div>
              <Progress value={req.percentage} className="h-2" />
              <p className="mt-2 text-sm text-gray-600">
                {req.creditsCompleted} of {req.requiredCredits} credits completed
              </p>
            </div>
          ))}
        </div>
        
        {/* Recently completed courses */}
        <div>
          <h4 className="text-sm font-medium mb-2">Recently Completed Courses</h4>
          <div className="space-y-2">
            {userProgress.completedCourses.slice(0, 3).map(courseId => {
              const course = financeCourses.find(c => c.id === courseId);
              return course ? (
                <div key={course.id} className="bg-green-50 border border-green-200 rounded-md p-2 flex items-center">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">{course.courseCode}: {course.title}</p>
                    <p className="text-xs text-gray-600">{course.credits} Credits</p>
                  </div>
                </div>
              ) : null;
            })}
            
            {userProgress.completedCourses.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center">
                <AlertCircle className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-sm text-gray-600">No completed courses yet</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Currently enrolled courses */}
        <div>
          <h4 className="text-sm font-medium mb-2">Currently Enrolled</h4>
          <div className="space-y-2">
            {userProgress.enrolledCourses.map(courseId => {
              const course = financeCourses.find(c => c.id === courseId);
              return course ? (
                <div key={course.id} className="bg-blue-50 border border-blue-200 rounded-md p-2 flex items-center">
                  <BookOpen className="h-4 w-4 text-blue-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium">{course.courseCode}: {course.title}</p>
                    <p className="text-xs text-gray-600">{course.credits} Credits</p>
                  </div>
                </div>
              ) : null;
            })}
            
            {userProgress.enrolledCourses.length === 0 && (
              <div className="bg-gray-50 border border-gray-200 rounded-md p-2 flex items-center">
                <AlertCircle className="h-4 w-4 text-gray-500 mr-2" />
                <p className="text-sm text-gray-600">No enrolled courses</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicProgress;