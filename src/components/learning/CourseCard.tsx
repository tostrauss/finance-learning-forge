
import React from 'react';
import { Course } from '../../types/learning';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Book, BookOpen, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

type CourseCardProps = {
  course: Course;
};

const CourseCard = ({ course }: CourseCardProps) => {
  const totalDuration = course.modules.reduce((total, module) => total + module.duration, 0);
  const completedModules = course.modules.filter(module => module.completed).length;
  
  // Get level color
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-app-purple';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="border-b bg-app-light-purple/5 p-4">
        <div className="flex justify-between items-start">
          <div>
            <Badge className={`mb-2 ${getLevelColor(course.level)}`}>
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
            <h3 className="text-lg font-semibold">{course.title}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
        <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
          <div className="flex items-center">
            <BookOpen size={14} className="mr-1" />
            <span>{course.modules.length} modules</span>
          </div>
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{totalDuration} mins</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">Progress</span>
          <span className="text-sm font-medium">{course.progress}%</span>
        </div>
        <Progress 
          value={course.progress} 
          className="h-2 bg-gray-200"
          style={{ 
            '--progress-width': `${course.progress}%`
          } as React.CSSProperties}
        />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link 
          to={`/learning/${course.id}`}
          className="w-full bg-app-purple hover:bg-app-dark-purple transition-colors text-white py-2 px-4 rounded text-center"
        >
          {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
