// src/components/learning/ProgramDashboard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { School, BookOpen, Award, Star, Clock, ArrowRight, Check } from 'lucide-react';
import { financeCourses, concentrations, programRequirements } from '@/data/financeProgram';

interface ProgramDashboardProps {
  userProgress?: {
    completedCredits: number;
    enrolledCourses: string[];
    completedCourses: string[];
    selectedConcentration?: string;
  };
}

const ProgramDashboard: React.FC<ProgramDashboardProps> = ({ userProgress = {
  completedCredits: 24, // Sample data
  enrolledCourses: ['fin-201', 'acc-111'],
  completedCourses: ['eng-110', 'com-107', 'cis-110', 'mat-120'],
  selectedConcentration: 'general'
}}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
    // Calculate program progress percentage - assuming 120 total credits for BS in Finance
  const totalCredits = 120;
  const progressPercentage = Math.round((userProgress.completedCredits / totalCredits) * 100);
  
  // Get selected concentration
  const selectedConcentration = concentrations.find(c => c.id === userProgress.selectedConcentration) || concentrations[0];
  
  return (
    <div className="space-y-6">
      {/* Program Header */}
      <Card>
        <CardHeader className="bg-app-purple/10 border-b">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl text-app-purple flex items-center">
                <School className="mr-2 h-6 w-6" />                Bachelor of Science in Finance
              </CardTitle>
              <CardDescription className="mt-2 text-base">
                A comprehensive program that prepares you for a career in finance through a blend of theoretical knowledge and practical applications.
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Accredited by</div>
              <div className="font-medium">ACBSP</div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Total Credits</span>
              <span className="text-2xl font-bold">{totalCredits}</span>
              <span className="text-xs text-gray-500 mt-1">Required for graduation</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Your Progress</span>
              <span className="text-2xl font-bold">{userProgress.completedCredits} Credits</span>
              <Progress value={progressPercentage} className="h-2 mt-2" />
              <span className="text-xs text-gray-500 mt-1">{progressPercentage}% Complete</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Concentration</span>
              <span className="text-2xl font-bold">{selectedConcentration.name}</span>
              <span className="text-xs text-gray-500 mt-1">{selectedConcentration.description.substring(0, 60)}...</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Courses</span>
              <div className="flex gap-2 mt-1">
                <div className="bg-green-100 text-green-800 rounded px-2 py-1 text-xs font-medium">
                  {userProgress.completedCourses.length} Completed
                </div>
                <div className="bg-blue-100 text-blue-800 rounded px-2 py-1 text-xs font-medium">
                  {userProgress.enrolledCourses.length} In Progress
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-1">Next milestone in 3 credits</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dashboard Tabs */}
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="pathway">Pathway</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Program Requirements Card */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Program Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programRequirements.map(requirement => (
                    <div key={requirement.id} className="border-b pb-4 last:border-0">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{requirement.name}</span>
                        <span className="text-sm">{requirement.requiredCredits} Credits</span>
                      </div>
                      <Progress 
                        value={30} // Would calculate from actual user data
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="w-full"                  onClick={() => navigate('/learning/curriculum-pathway')}
                >
                  View Full Curriculum
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/learning/courses')}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse Courses
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/trading')}>
                    <Star className="mr-2 h-4 w-4" />
                    Trading Simulator
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/career/sie-prep')}>
                    <Award className="mr-2 h-4 w-4" />
                    SIE Exam Prep
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => navigate('/career/resume')}>
                    <Clock className="mr-2 h-4 w-4" />
                    Resume Builder
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Recent Progress & Upcoming Deadlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-md">
                    <div className="h-8 w-8 bg-green-100 text-green-800 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Completed Quiz: Principles of Finance</div>
                      <div className="text-sm text-gray-500">Score: 85% • 2 days ago</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-md">
                    <div className="h-8 w-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">Started Module: Time Value of Money</div>
                      <div className="text-sm text-gray-500">FIN 201 • 3 days ago</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <div className="h-10 w-10 bg-app-purple/10 text-app-purple rounded-md flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">MAY</span>
                      <span className="text-sm font-bold">15</span>
                    </div>
                    <div>
                      <div className="font-medium">Quiz: Financial Markets and Institutions</div>
                      <div className="text-sm text-gray-500">FIN 201 • Due in 2 days</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 border rounded-md">
                    <div className="h-10 w-10 bg-app-purple/10 text-app-purple rounded-md flex flex-col items-center justify-center">
                      <span className="text-xs font-bold">MAY</span>
                      <span className="text-sm font-bold">20</span>
                    </div>
                    <div>
                      <div className="font-medium">Assignment: Financial Statement Analysis</div>
                      <div className="text-sm text-gray-500">ACC 111 • Due in 7 days</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pathway">
          <Card>
            <CardHeader>
              <CardTitle>Program Pathway</CardTitle>
              <CardDescription>
                Your journey to a BS in Finance, with {selectedConcentration.name} concentration
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Pathway Visualization Placeholder */}
              <div className="h-80 border-2 border-dashed border-gray-200 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <div className="text-gray-500 mb-2">Curriculum Pathway Visualization</div>
                  <Button 
                    onClick={() => navigate('/learning/curriculum-pathway')}
                    className="bg-app-purple hover:bg-app-dark-purple"
                  >
                    View Full Pathway <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Program Handbook
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Financial Glossary
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Formula Sheet
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button onClick={() => navigate('/tools/calculator')} variant="outline" className="w-full justify-start">
                    Financial Calculator
                  </Button>
                  <Button onClick={() => navigate('/tools/excel-templates')} variant="outline" className="w-full justify-start">
                    Excel Templates
                  </Button>
                  <Button onClick={() => navigate('/tools/formulas')} variant="outline" className="w-full justify-start">
                    Formula Reference
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Career Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button onClick={() => navigate('/career/pathways')} variant="outline" className="w-full justify-start">
                    Career Pathways
                  </Button>
                  <Button onClick={() => navigate('/career/certifications')} variant="outline" className="w-full justify-start">
                    Industry Certifications
                  </Button>
                  <Button onClick={() => navigate('/career/interview-prep')} variant="outline" className="w-full justify-start">
                    Interview Preparation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProgramDashboard;