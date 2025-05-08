
import React from 'react';
import { Module } from '../../types/learning';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

type ModuleCardProps = {
  module: Module;
  courseId: string;
  isLocked?: boolean;
};

const ModuleCard = ({ module, courseId, isLocked = false }: ModuleCardProps) => {
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200",
      module.completed ? "border-l-4 border-l-green-500" : "",
      isLocked ? "opacity-60" : "hover:shadow-md"
    )}>
      <CardHeader className="p-4 pb-2 flex flex-row justify-between items-center">
        <h3 className="text-md font-medium flex-1">{module.title}</h3>
        {module.completed && (
          <CheckCircle size={18} className="text-green-500 ml-2" />
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{module.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <Clock size={14} className="mr-1" />
          <span>{module.duration} mins</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-2">
        <Link 
          to={`/learning/${courseId}/${module.id}`}
          className={cn(
            "w-full py-2 px-4 rounded text-center text-sm transition-colors",
            isLocked 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : module.completed 
                ? "bg-app-light-purple/10 text-app-purple border border-app-light-purple hover:bg-app-light-purple/20"
                : "bg-app-purple hover:bg-app-dark-purple text-white"
          )}
          onClick={e => isLocked && e.preventDefault()}
        >
          {module.completed ? 'Review' : 'Start Learning'}
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;
