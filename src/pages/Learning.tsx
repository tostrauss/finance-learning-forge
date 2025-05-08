
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProgressStats from '../components/learning/ProgressStats';
import CourseCard from '../components/learning/CourseCard';
import { userProgress, courses } from '../data/learningData';
import { School } from 'lucide-react';

const Learning = () => {
  const [activeTab, setActiveTab] = useState('all');
  
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
            <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50">
              Dashboard
            </button>
            <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50">
              Learning Paths
            </button>
            <button className="px-4 py-2 bg-white border rounded hover:bg-gray-50">
              Quizzes
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Learning Analytics</h2>
          <div className="bg-white p-6 rounded-lg">
            <p className="text-gray-600 mb-4">Track your progress across all finance topics</p>
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
              <p className="text-gray-500">Learning analytics visualization will appear here</p>
            </div>
          </div>
        </div>

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
      </div>
    </Layout>
  );
};

export default Learning;
