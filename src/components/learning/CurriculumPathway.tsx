// src/components/learning/CurriculumPathway.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, BookOpen, Check, Lock } from 'lucide-react';
import { financeCourses, concentrations, programRequirements } from '@/data/financeProgram';

interface CurriculumPathwayProps {
  onSelectCourse?: (courseId: string) => void;
  userProgress?: {
    completedCourses: string[];
    enrolledCourses: string[];
  };
}

const CurriculumPathway: React.FC<CurriculumPathwayProps> = ({ 
  onSelectCourse, 
  userProgress = { completedCourses: ['eng-110', 'com-107'], enrolledCourses: ['fin-201', 'acc-111'] } 
}) => {
  const navigate = useNavigate();
  const [selectedConcentration, setSelectedConcentration] = useState('general');
  
  const concentration = concentrations.find(c => c.id === selectedConcentration) || concentrations[0];
  
  // Group courses by academic level  const coursesByLevel: { [level: number]: any[] } = {};
  financeCourses.forEach(course => {
    const isInConcentration = course.concentrations.includes(selectedConcentration);
    const isRequired = concentration.requiredCourses.includes(course.courseCode);
    const isElective = concentration.electiveCourses.includes(course.courseCode);
    const isGeneralCore = course.concentrations.includes('general');
    
    if (isInConcentration || isRequired || isElective || isGeneralCore) {
      if (!coursesByLevel[course.academicLevel]) {
        coursesByLevel[course.academicLevel] = [];
      }
      coursesByLevel[course.academicLevel].push(course);
    }
  });
  
  // Get all academic levels and sort them
  const academicLevels = Object.keys(coursesByLevel)
    .map(level => parseInt(level))
    .sort((a, b) => a - b);
  
  const getCourseStatus = (courseId: string) => {
    if (userProgress.completedCourses.includes(courseId)) return 'completed';
    if (userProgress.enrolledCourses.includes(courseId)) return 'enrolled';
    
    // Check if prerequisites are met
    const course = financeCourses.find(c => c.id === courseId);
    if (course && course.prerequisites.length > 0) {
      const prereqsMet = course.prerequisites.every(prereq => {
        const prereqCourse = financeCourses.find(c => c.courseCode === prereq);
        return prereqCourse && userProgress.completedCourses.includes(prereqCourse.id);
      });
      return prereqsMet ? 'available' : 'locked';
    }
    
    return 'available';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>BS in Finance Curriculum Pathway</CardTitle>
          <CardDescription>
            View your program requirements and course sequences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedConcentration} onValueChange={setSelectedConcentration} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full gap-1">
              {concentrations.map(concentration => (
                <TabsTrigger 
                  key={concentration.id} 
                  value={concentration.id}
                  className="text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {concentration.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {concentrations.map(concentration => (
              <TabsContent key={concentration.id} value={concentration.id} className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-medium">{concentration.name} Concentration</h3>
                  <p className="text-gray-600 text-sm">{concentration.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Required Courses</h4>
                      <div className="space-y-2">
                        {concentration.requiredCourses.map(courseCode => {
                          const course = financeCourses.find(c => c.courseCode === courseCode);
                          if (!course) return null;
                          
                          const status = getCourseStatus(course.id);
                          
                          return (
                            <div 
                              key={course.id} 
                              className={`flex items-center p-2 rounded border ${
                                status === 'completed' ? 'bg-green-50 border-green-200' :
                                status === 'enrolled' ? 'bg-blue-50 border-blue-200' :
                                status === 'locked' ? 'bg-gray-50 border-gray-200' :
                                'bg-white border-gray-200'
                              }`}
                            >
                              <div className="mr-2">
                                {status === 'completed' && <Check className="h-4 w-4 text-green-600" />}
                                {status === 'enrolled' && <BookOpen className="h-4 w-4 text-blue-600" />}
                                {status === 'locked' && <Lock className="h-4 w-4 text-gray-400" />}
                                {status === 'available' && <ArrowRight className="h-4 w-4 text-gray-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{course.courseCode}: {course.title}</div>
                                <div className="text-xs text-gray-500">{course.credits} Credits</div>
                              </div>
                              <Badge variant="outline" className="ml-2">
                                {course.academicLevel}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Elective Courses</h4>
                      <div className="space-y-2">
                        {concentration.electiveCourses.map((courseCode, index) => {
                          // Handle special case for "FIN 300-400 Level Elective"
                          if (courseCode.includes("Level Elective")) {
                            return (
                              <div 
                                key={`elective-${index}`}
                                className="flex items-center p-2 rounded border border-dashed border-gray-300"
                              >
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{courseCode}</div>
                                  <div className="text-xs text-gray-500">Choose any 300-400 level FIN course</div>
                                </div>
                                <Badge variant="outline" className="ml-2">
                                  300-400
                                </Badge>
                              </div>
                            );
                          }
                          
                          const course = financeCourses.find(c => c.courseCode === courseCode);
                          if (!course) return null;
                          
                          const status = getCourseStatus(course.id);
                          
                          return (
                            <div 
                              key={course.id}
                              className={`flex items-center p-2 rounded border ${
                                status === 'completed' ? 'bg-green-50 border-green-200' :
                                status === 'enrolled' ? 'bg-blue-50 border-blue-200' :
                                status === 'locked' ? 'bg-gray-50 border-gray-200' :
                                'bg-white border-gray-200'
                              }`}
                            >
                              <div className="mr-2">
                                {status === 'completed' && <Check className="h-4 w-4 text-green-600" />}
                                {status === 'enrolled' && <BookOpen className="h-4 w-4 text-blue-600" />}
                                {status === 'locked' && <Lock className="h-4 w-4 text-gray-400" />}
                                {status === 'available' && <ArrowRight className="h-4 w-4 text-gray-600" />}
                              </div>
                              <div className="flex-1">
                                <div className="font-medium text-sm">{course.courseCode}: {course.title}</div>
                                <div className="text-xs text-gray-500">{course.credits} Credits</div>
                              </div>
                              <Badge variant="outline" className="ml-2">
                                {course.academicLevel}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-medium mt-8 mb-4">Course Sequence</h3>
                <div className="space-y-8">
                  {academicLevels.map(level => (
                    <div key={level}>
                      <h4 className="text-md font-medium mb-2 flex items-center">
                        <span className="w-12 h-8 bg-app-purple/10 text-app-purple rounded-md flex items-center justify-center mr-2">
                          {level}
                        </span>
                        {level === 100 && 'Freshman Level Courses'}
                        {level === 200 && 'Sophomore Level Courses'}
                        {level === 300 && 'Junior Level Courses'}
                        {level === 400 && 'Senior Level Courses'}
                        {level === 500 && 'Graduate Level Courses'}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {coursesByLevel[level].map(course => {
                          const status = getCourseStatus(course.id);
                          
                          return (
                            <div 
                              key={course.id}
                              onClick={() => {
                                if (status !== 'locked' && onSelectCourse) {
                                  onSelectCourse(course.id);
                                } else if (status !== 'locked') {                  navigate(`/learning/course/${course.id}`);
                                }
                              }}
                              className={`p-3 rounded border cursor-pointer hover:shadow-md transition-shadow ${
                                status === 'completed' ? 'bg-green-50 border-green-200' :
                                status === 'enrolled' ? 'bg-blue-50 border-blue-200' :
                                status === 'locked' ? 'bg-gray-50 border-gray-200 cursor-not-allowed' :
                                'bg-white border-gray-200'
                              }`}
                            >
                              <div className="flex justify-between mb-1">
                                <div className="text-sm font-medium">{course.courseCode}</div>
                                <Badge variant="outline" className="text-xs">
                                  {course.credits} Credits
                                </Badge>
                              </div>
                              <div className="font-medium mb-1">{course.title}</div>
                              
                              {/* Prerequisites */}
                              {course.prerequisites.length > 0 && (
                                <div className="mt-2 text-xs">
                                  <span className="text-gray-500">Prerequisites: </span>
                                  {course.prerequisites.map((prereq, i) => (
                                    <span key={prereq}>
                                      {prereq}
                                      {i < course.prerequisites.length - 1 ? ', ' : ''}
                                    </span>
                                  ))}
                                </div>
                              )}
                              
                              {/* Status indicator */}
                              <div className={`flex items-center mt-2 text-xs ${
                                status === 'completed' ? 'text-green-600' :
                                status === 'enrolled' ? 'text-blue-600' :
                                status === 'locked' ? 'text-gray-400' :
                                'text-gray-600'
                              }`}>
                                {status === 'completed' && <><Check className="h-3 w-3 mr-1" /> Completed</>}
                                {status === 'enrolled' && <><BookOpen className="h-3 w-3 mr-1" /> In Progress</>}
                                {status === 'locked' && <><Lock className="h-3 w-3 mr-1" /> Prerequisites Required</>}
                                {status === 'available' && <><ArrowRight className="h-3 w-3 mr-1" /> Available</>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Program Requirements</CardTitle>
          <CardDescription>
            Overview of degree requirements by category
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {programRequirements.map(requirement => (
              <div key={requirement.id}>
                <h3 className="text-md font-medium mb-3">{requirement.name} ({requirement.requiredCredits} Credits)</h3>
                <p className="text-sm text-gray-600 mb-3">{requirement.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {requirement.categories.map(category => (
                    <div key={category.name} className="border rounded-md p-3">
                      <div className="font-medium mb-2">{category.name} ({category.requiredCredits} Credits)</div>
                      <div className="space-y-1 ml-2">
                        {category.courses.length > 0 ? (
                          category.courses.map(courseCode => {
                            const course = financeCourses.find(c => c.courseCode === courseCode);
                            if (!course) return <div key={courseCode}>{courseCode}</div>;
                            
                            const isCompleted = userProgress.completedCourses.includes(course.id);
                            const isEnrolled = userProgress.enrolledCourses.includes(course.id);
                            
                            return (
                              <div key={course.id} className="flex items-center text-sm">
                                {isCompleted && <Check className="h-3 w-3 text-green-600 mr-1" />}
                                {isEnrolled && <BookOpen className="h-3 w-3 text-blue-600 mr-1" />}
                                {!isCompleted && !isEnrolled && <div className="w-3 mr-1" />}
                                {course.courseCode}: {course.title} ({course.credits})
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-sm text-gray-500 italic">
                            Various courses available to fulfill this requirement
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CurriculumPathway;