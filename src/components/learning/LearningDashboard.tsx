
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Clock, School } from 'lucide-react';

type LearningDashboardProps = {
  userProgress: {
    streak: number;
    xpEarned: number;
    quizAverage: number;
    progress: number;
    completedModules: string[];
  };
};

const LearningDashboard = ({ userProgress }: LearningDashboardProps) => {
  const [activeTab, setActiveTab] = useState('path');
  const [stats] = useState({
    streak: userProgress.streak,
    xp: userProgress.xpEarned,
    completedLessons: userProgress.completedModules.length,
    totalLessons: 24,
    quizAverage: userProgress.quizAverage
  });
  
  // Sample learning paths based on Post University's finance curriculum
  const learningPaths = [
    { id: 'corp-finance', name: 'Corporate Finance', progress: 35, color: '#5C2D91' },
    { id: 'fpa', name: 'Financial Planning & Analysis', progress: 20, color: '#0078D4' },
    { id: 'fin-services', name: 'Financial Services & Banking', progress: 15, color: '#217346' },
    { id: 'gen-finance', name: 'General Finance', progress: 65, color: '#B7472A' },
    { id: 'int-finance', name: 'International Finance', progress: 10, color: '#8764B8' },
    { id: 'personal-fin', name: 'Personal Financial Planning', progress: 45, color: '#C74634' },
  ];
  
  const progressData = [
    { day: 'Mon', lessons: 2, xp: 45 },
    { day: 'Tue', lessons: 1, xp: 30 },
    { day: 'Wed', lessons: 3, xp: 65 },
    { day: 'Thu', lessons: 2, xp: 50 },
    { day: 'Fri', lessons: 1, xp: 25 },
    { day: 'Sat', lessons: 4, xp: 85 },
    { day: 'Sun', lessons: 2, xp: 45 }
  ];
  
  const quizData = [
    { subject: 'Markets', score: 75 },
    { subject: 'Investments', score: 85 },
    { subject: 'Analysis', score: 65 },
    { subject: 'Risk', score: 90 },
    { subject: 'Planning', score: 80 }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Learning Dashboard</h2>
          <p className="text-gray-600">Track your progress in Post University's finance curriculum</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-purple-100 p-2 rounded-lg">
            <div className="text-purple-800 font-medium flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              <span>{stats.streak}-Day Streak</span>
            </div>
          </div>
          <div className="flex items-center bg-blue-100 p-2 rounded-lg">
            <div className="text-blue-800 font-medium flex items-center">
              <School className="h-5 w-5 mr-2" />
              <span>{stats.xp} XP</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex mb-6 border-b">
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'path' ? 'text-purple-800 border-b-2 border-purple-800' : 'text-gray-600 hover:text-gray-800'}`} 
          onClick={() => setActiveTab('path')}
        >
          Learning Paths
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'progress' ? 'text-purple-800 border-b-2 border-purple-800' : 'text-gray-600 hover:text-gray-800'}`} 
          onClick={() => setActiveTab('progress')}
        >
          Weekly Progress
        </button>
        <button 
          className={`px-4 py-2 font-medium ${activeTab === 'performance' ? 'text-purple-800 border-b-2 border-purple-800' : 'text-gray-600 hover:text-gray-800'}`} 
          onClick={() => setActiveTab('performance')}
        >
          Quiz Performance
        </button>
      </div>
      
      {activeTab === 'path' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningPaths.map(path => (
              <div key={path.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">{path.name}</h3>
                  <span className="text-sm font-medium" style={{ color: path.color }}>{path.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="h-2 rounded-full" style={{ width: `${path.progress}%`, backgroundColor: path.color }}></div>
                </div>
                <button className="mt-3 text-sm font-medium flex items-center" style={{ color: path.color }}>
                  Continue Learning
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 border-t border-gray-100 pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Overall Progress</h3>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className="h-4 rounded-full bg-purple-600" style={{ width: `${(stats.completedLessons / stats.totalLessons) * 100}%` }}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-800">{Math.round((stats.completedLessons / stats.totalLessons) * 100)}%</span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {stats.completedLessons} of {stats.totalLessons} lessons completed
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'progress' && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={progressData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="xp" stroke="#5C2D91" strokeWidth={2} activeDot={{ r: 8 }} name="XP Gained" />
              <Line yAxisId="right" type="monotone" dataKey="lessons" stroke="#0078D4" strokeWidth={2} name="Lessons Completed" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
      
      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={quizData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#5C2D91" name="Quiz Score %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <div className="text-5xl font-bold text-purple-800">{stats.quizAverage}%</div>
              <div className="text-gray-600 mt-2">Average Quiz Score</div>
              <div className="mt-6">
                <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Top 15% of Students
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-6 border-t border-gray-100 pt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Recommended Next Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center text-blue-800 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
              </svg>
              <span className="font-medium">Continue Learning</span>
            </div>
            <h4 className="font-medium mb-1">Financial Statement Analysis</h4>
            <p className="text-sm text-gray-600">Learn to interpret balance sheets and income statements</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
            <div className="flex items-center text-purple-800 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Take a Quiz</span>
            </div>
            <h4 className="font-medium mb-1">Risk Management</h4>
            <p className="text-sm text-gray-600">Test your knowledge on portfolio risk assessment</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <div className="flex items-center text-green-800 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Daily Challenge</span>
            </div>
            <h4 className="font-medium mb-1">Corporate Valuation</h4>
            <p className="text-sm text-gray-600">Complete today's challenge to maintain your streak</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningDashboard;
