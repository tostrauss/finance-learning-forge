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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SearchIcon, BookOpen, Bookmark, GraduationCap, Clock, Filter, ChevronRight } from 'lucide-react';
import { courses, userProgress, financeTopics } from '../data/learningData';
import { Course } from '../types/learning';

const Learning = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Filter courses based on search query, selected tab (category), and level
  useEffect(() => {
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
      result = result.filter(course => course.level === selectedLevel);
    }
    
    setFilteredCourses(result);
  }, [searchQuery, activeTab, selectedLevel]);

  // Handle level filter click
  const handleLevelFilter = (level: string) => {
    if (selectedLevel === level) {
      setSelectedLevel(null); // Unselect if already selected
    } else {
      setSelectedLevel(level);
    }
  };

  // User stats for the header
  const stats = {
    coursesInProgress: userProgress.enrolledCourses.length,
    coursesCompleted: userProgress.completedCourses.length,
    streak: userProgress.streak,
    totalCoursesAvailable: courses.length
  };

  // Calculate recommended courses (based on user's progress and interests)
  const recommendedCourses = courses
    .filter(course => !userProgress.completedCourses.includes(course.id))
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-app-purple/10 to-app-light-purple/5 rounded-xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl font-bold text-app-purple mb-2">Finance Learning Hub</h1>
              <p className="text-lg text-gray-700 mb-6">
                Your central dashboard for navigating the BS in Finance curriculum.
                Track your progress, explore course pathways, and build your financial expertise.
              </p>              <div className="flex gap-3">                <Button 
                  onClick={() => navigate('/learning/course')}
                  className="bg-app-purple hover:bg-app-dark-purple"
                >
                  View Curriculum
                </Button>
                <Button 
                  variant="outline" 
                  className="border-app-purple text-app-purple hover:bg-app-purple/5"
                  onClick={() => navigate('/learning/path')}
                >
                  Explore Pathways
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-app-purple mb-2">
                    <BookOpen size={18} />
                    <h3 className="font-semibold">Courses</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>In Progress:</span>
                    <span className="font-semibold">{stats.coursesInProgress}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Completed:</span>
                    <span className="font-semibold">{stats.coursesCompleted}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Available:</span>
                    <span className="font-semibold">{stats.totalCoursesAvailable}</span>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 text-app-purple mb-2">
                    <GraduationCap size={18} />
                    <h3 className="font-semibold">Progress</h3>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Program:</span>
                    <span className="font-semibold">{userProgress.progress}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Learning Streak:</span>
                    <span className="font-semibold">{stats.streak} days</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>XP Earned:</span>
                    <span className="font-semibold">{userProgress.xpEarned} pts</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Continue Learning Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
            <Button 
              variant="ghost" 
              className="text-app-purple"
              onClick={() => navigate('/dashboard')}
            >
              View All <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
          
          {userProgress.enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses
                .filter(course => userProgress.enrolledCourses.includes(course.id))
                .map(course => (
                  <CourseCard key={course.id} course={course} />
                ))
              }
            </div>
          ) : (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Courses In Progress</h3>
                <p className="text-gray-600 mb-4">You don't have any courses in progress. Start learning today!</p>
                <Button 
                  onClick={() => document.getElementById('coursesSection')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-app-purple hover:bg-app-dark-purple"
                >
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Learning Paths Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {financeTopics.map(topic => (
              <Card key={topic.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div 
                  className="h-2" 
                  style={{ backgroundColor: topic.color || '#6b3fa0' }}
                ></div>
                <CardHeader className="pb-2">
                  <CardTitle>{topic.name}</CardTitle>
                  <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <BookOpen size={14} className="mr-1" />
                      <span>{courses.filter(c => c.pathId === topic.id).length} Courses</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      <span>{topic.progress}% Complete</span>
                    </div>
                  </div>                  <Button                    onClick={() => navigate(`/learning/path/${topic.id}`)}
                    variant="outline"
                    className="w-full border-app-purple text-app-purple hover:bg-app-purple/5"
                  >
                    View Path
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recommendedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* All Courses Section */}
        <div id="coursesSection" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Browse All Courses</h2>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for courses..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedLevel === 'beginner' ? "default" : "outline"}
                size="sm"
                onClick={() => handleLevelFilter('beginner')}
                className={selectedLevel === 'beginner' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
              >
                Beginner
              </Button>
              <Button
                variant={selectedLevel === 'intermediate' ? "default" : "outline"}
                size="sm"
                onClick={() => handleLevelFilter('intermediate')}
                className={selectedLevel === 'intermediate' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedLevel === 'advanced' ? "default" : "outline"}
                size="sm"
                onClick={() => handleLevelFilter('advanced')}
                className={selectedLevel === 'advanced' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
              >
                Advanced
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Courses</TabsTrigger>
              {financeTopics.map(topic => (
                <TabsTrigger key={topic.id} value={topic.id}>{topic.name}</TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              {filteredCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center p-12 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-2">No courses found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </TabsContent>
            
            {financeTopics.map(topic => (
              <TabsContent key={topic.id} value={topic.id} className="mt-0">
                {filteredCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map(course => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-12 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">No courses found</h3>
                    <p className="text-gray-600">Try adjusting your search or filters</p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Help box */}
        <Card className="bg-app-light-purple/10 border-app-light-purple mt-12">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-app-purple mb-1">Need help planning your finance curriculum?</h3>
                <p className="text-gray-600">
                  Our curriculum pathway tool can help you visualize course requirements and plan your academic schedule.
                </p>
              </div>
              <Button 
                onClick={() => navigate('/learning/curriculum-pathway')}
                className="bg-app-purple hover:bg-app-dark-purple whitespace-nowrap"
              >
                View Curriculum Pathway
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Learning;