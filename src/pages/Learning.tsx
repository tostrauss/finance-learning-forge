
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressStats from '../components/learning/ProgressStats';
import CourseCard from '../components/learning/CourseCard';
import LearningDashboard from '../components/learning/LearningDashboard';
import FinanceLearningPath from '../components/learning/FinanceLearningPath';
import { userProgress, courses } from '../data/learningData';
import { School, GraduationCap, BookOpen } from 'lucide-react';

const Learning = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeDashboardView, setActiveDashboardView] = useState('dashboard');
  const [activeLevel, setActiveLevel] = useState('all-levels');
  
  // Filter courses based on level
  const levelFilteredCourses = activeLevel === 'all-levels'
    ? courses
    : courses.filter(course => {
        if (activeLevel === 'beginner') return course.level === 'beginner';
        if (activeLevel === 'intermediate') return course.level === 'intermediate';
        if (activeLevel === 'advanced') return course.level === 'advanced';
        return true;
      });
  
  // Then apply additional filtering based on active tab
  const filteredCourses = activeTab === 'all'
    ? levelFilteredCourses
    : levelFilteredCourses.filter(course => course.level === activeTab);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-app-purple flex items-center">
              <School className="mr-2 h-8 w-8" />
              Post University Finance Program
            </h1>
            <p className="text-gray-600 mt-1">
              Comprehensive curriculum for financial education and professional development
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 mb-8">
          <div className="flex items-center mb-4">
            <div>
              <h2 className="text-xl font-medium">Finance Student</h2>
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold flex items-center">
                <GraduationCap className="mr-2 h-6 w-6" />
                Academic Course Catalog
              </h2>
              
              <div className="flex items-center gap-4">
                <Tabs value={activeLevel} onValueChange={setActiveLevel} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all-levels">All Levels</TabsTrigger>
                    <TabsTrigger value="beginner">100-200 Level</TabsTrigger>
                    <TabsTrigger value="intermediate">300-400 Level</TabsTrigger>
                    <TabsTrigger value="advanced">500+ Level</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="beginner">Beginner</TabsTrigger>
                    <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            {activeLevel === 'beginner' && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-app-purple">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Introductory (100-200 Level) Courses</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Foundational courses covering core principles and concepts in finance, accounting, and economics.
                </p>
              </div>
            )}
            
            {activeLevel === 'intermediate' && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-app-purple">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Intermediate (300-400 Level) Courses</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  More specialized courses building upon foundational knowledge with deeper analysis and practical applications.
                </p>
              </div>
            )}
            
            {activeLevel === 'advanced' && (
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3 text-app-purple">
                  <BookOpen className="h-5 w-5" />
                  <h3 className="text-lg font-medium">Advanced (500+ Level) Courses</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Advanced courses featuring specialized topics and sophisticated analysis techniques for graduate-level study.
                </p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
            
            {filteredCourses.length === 0 && (
              <div className="bg-gray-50 p-10 rounded-lg text-center">
                <p className="text-gray-500">No courses match your current filter selection.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Learning;
