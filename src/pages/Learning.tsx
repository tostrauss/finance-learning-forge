// src/pages/Learning.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressStats from '../components/learning/ProgressStats';
import CourseCard from '../components/learning/CourseCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SearchIcon, Filter } from 'lucide-react';
import { courses, financeTopics } from '../data/learningData';
import type { Course, UserProgress } from '../types/learning';
import { useAuth } from '@/contexts/AuthContext';
import { useLearning } from '@/contexts/LearningContext';

const Learning = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProgress, loading } = useLearning();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Filter courses based on search query, selected tab (category), and level
  useEffect(() => {
    if (!courses) return;
    
    let result = [...courses];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        course => course.title.toLowerCase().includes(query) || 
                 course.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category (tab)
    if (activeTab !== 'all') {
      result = result.filter(course => course.pathId === activeTab);
    }
    
    // Filter by level
    if (selectedLevel) {
      result = result.filter(course => course.level === selectedLevel.toLowerCase());
    }
    
    setFilteredCourses(result);
  }, [searchQuery, activeTab, selectedLevel, courses]);

  // Handle level filter click
  const handleLevelFilter = (level: string) => {
    if (selectedLevel === level) {
      setSelectedLevel(null); // Unselect if already selected
    } else {
      setSelectedLevel(level);
    }
  };

  // Redirect to sign in if not authenticated
  if (!user) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Sign In Required</h2>
              <p className="text-gray-600 mb-6">Please sign in to access the learning platform.</p>
              <Button onClick={() => navigate('/signin')}>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Show loading state
  if (loading || !userProgress) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto py-6">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-app-purple"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <ProgressStats userProgress={userProgress} />
        
        <Separator className="my-8" />

        {/* Course Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
          
          {/* Level filters */}
          {showFilters && (
            <div className="flex gap-2">
              {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                <Badge
                  key={level}
                  variant={selectedLevel === level ? 'default' : 'secondary'}
                  className="cursor-pointer"
                  onClick={() => handleLevelFilter(level)}
                >
                  {level}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Course Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Courses</TabsTrigger>
            {financeTopics.map(topic => (
              <TabsTrigger key={topic.id} value={topic.id}>{topic.name}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map(course => (
                  <CourseCard
                    key={course.id}
                    course={course}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses found matching your criteria.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Learning;