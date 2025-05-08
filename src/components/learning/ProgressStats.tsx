
import React from 'react';
import { UserProgress } from '../../types/learning';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ProgressStatsProps = {
  userProgress: UserProgress;
};

const ProgressStats = ({ userProgress }: ProgressStatsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-end">
            {userProgress.streak} 
            <span className="text-sm ml-1 font-normal text-gray-600">days</span>
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-600">XP Earned</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-end">
            {userProgress.xpEarned}
            <span className="text-sm ml-1 font-normal text-gray-600">points</span>
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-600">Quiz Average</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-end">
            {userProgress.quizAverage}%
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardHeader className="py-3">
          <CardTitle className="text-sm font-medium text-gray-600">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold flex items-end mb-2">
            {userProgress.progress}%
          </p>
          <Progress 
            value={userProgress.progress} 
            className="h-2 bg-gray-200"
            style={{ 
              '--progress-width': `${userProgress.progress}%`
            } as React.CSSProperties}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProgressStats;
