
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressStats from '../components/learning/ProgressStats';
import CourseCard from '../components/learning/CourseCard';
import LearningDashboard from '../components/learning/LearningDashboard';
import FinanceLearningPath from '../components/learning/FinanceLearningPath';
import { userProgress, courses } from '../data/learningData';
import { School } from 'lucide-react';

const Learning = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeDashboardView, setActiveDashboardView] = useState('dashboard');
  
  const filteredCourses = activeTab === 'all' 
    ? courses 
    : courses.filter(course => course.level === activeTab);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-app-purple flex items-center">
              <School className="mr-2 h-8 w-8" />
              Finance Learning Hub
            </h1>
            <p className="text-gray-600 mt-1">
              Build your financial knowledge and skills with interactive lessons
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div>
              <h2 className="text-xl font-medium">Student</h2>
              <p className="text-gray-600">Bachelor of Science in Finance</p>
            </div>
          </div>
          <ProgressStats userProgress={userProgress} />
          <div className="flex space-x-4">
            <button 
              onClick={() => setActiveDashboardView('dashboard')}
              className={`px-4 py-2 rounded transition-colors ${
                activeDashboardView === 'dashboard' ? 'bg-app-purple text-white' : 'bg-white border hover:bg-gray-50'
              }`}
            >
              Dashboard
            </button>
            <button 
              onClick={() => setActiveDashboardView('paths')}
              className={`px-4 py-2 rounded transition-colors ${
                activeDashboardView === 'paths' ? 'bg-app-purple text-white' : 'bg-white border hover:bg-gray-50'
              }`}
            >
              Learning Paths
            </button>
            <button 
              onClick={() => setActiveDashboardView('courses')}
              className={`px-4 py-2 rounded transition-colors ${
                activeDashboardView === 'courses' ? 'bg-app-purple text-white' : 'bg-white border hover:bg-gray-50'
              }`}
            >
              Courses
            </button>
          </div>
        </div>

        {activeDashboardView === 'dashboard' && (
          <div className="mb-8">
            <LearningDashboard userProgress={userProgress} />
          </div>
        )}

        {activeDashboardView === 'paths' && (
          <div className="mb-8">
            <FinanceLearningPath />
          </div>
        )}

        {activeDashboardView === 'courses' && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">Available Courses</h2>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="beginner">Beginner</TabsTrigger>
                  <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Learning;
