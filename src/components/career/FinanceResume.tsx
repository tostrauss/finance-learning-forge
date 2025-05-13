import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { financeCourses } from '@/data/financeProgram';
import { FileDown, Edit, Eye, Plus, Trash2 } from 'lucide-react';

// Sample skills mapped to courses
const financeSkills = {
  'fin-201': ['Financial Analysis', 'Time Value of Money Calculations', 'Financial Market Knowledge'],
  'fin-302': ['Corporate Financial Planning', 'Capital Structure Analysis', 'Cost of Capital Calculation'],
  'fin-403': ['Investment Portfolio Analysis', 'Asset Allocation Strategies', 'Risk Assessment'],
  'fin-411': ['International Financial Management', 'Currency Risk Hedging', 'Global Market Analysis'],
};

interface ResumeState {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
  };
  education: {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa: string;
    highlights: string[];
  }[];
  experience: {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }[];
  skills: string[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    date: string;
  }[];
}

const FinanceResume = () => {
  // Sample user progress - in real app would come from user data
  const userProgress = {
    completedCourses: ['fin-201', 'fin-302'],
    enrolledCourses: ['fin-403'],
  };

  // Initial resume state
  const [resume, setResume] = useState<ResumeState>({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      location: '',
    },
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Finance',
        institution: 'Post University',
        location: 'Waterbury, CT',
        startDate: '2022-09',
        endDate: '2026-05',
        gpa: '3.8',
        highlights: [
          'Finance Learning Forge Trading Simulator Certification',
          'Dean\'s List: Fall 2022 - Present',
        ],
      },
    ],
    experience: [
      {
        id: '1',
        title: 'Finance Intern',
        company: 'ABC Financial Services',
        location: 'Hartford, CT',
        startDate: '2023-06',
        endDate: '2023-08',
        current: false,
        description: [
          'Assisted in financial analysis of potential investments',
          'Created financial models using Excel for company valuations',
          'Supported senior analysts in client portfolio reviews',
        ],
      },
    ],
    skills: [
      'Financial Analysis',
      'Time Value of Money Calculations',
      'Excel Financial Modeling',
      'Investment Research',
    ],
    certifications: [
      {
        id: '1',
        name: 'Bloomberg Market Concepts',
        issuer: 'Bloomberg LP',
        date: '2023-03',
      },
    ],
  });

  const [activeTab, setActiveTab] = useState('preview');

  // Add completed course skills
  const addCourseSkills = (courseId: string) => {
    if (financeSkills[courseId]) {
      const newSkills = [...resume.skills];
      financeSkills[courseId].forEach(skill => {
        if (!newSkills.includes(skill)) {
          newSkills.push(skill);
        }
      });
      setResume({ ...resume, skills: newSkills });
    }
  };

  // Get course name from ID
  const getCourseName = (courseId: string) => {
    const course = financeCourses.find(c => c.id === courseId);
    return course ? `${course.courseCode}: ${course.title}` : courseId;
  };

  // Add a new experience entry
  const addExperience = () => {
    const newExperience = {
      id: Date.now().toString(),
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    setResume({ ...resume, experience: [...resume.experience, newExperience] });
  };

  // Update personal info
  const updatePersonalInfo = (field: string, value: string) => {
    setResume({
      ...resume,
      personalInfo: {
        ...resume.personalInfo,
        [field]: value,
      },
    });
  };

  // Update experience
  const updateExperience = (id: string, field: string, value: string | boolean | string[]) => {
    setResume({
      ...resume,
      experience: resume.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const [year, month] = dateString.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-app-purple">Finance Resume Builder</CardTitle>
          <CardDescription>
            Create a professional resume that highlights your finance education and skills
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="edit" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="edit" className="space-y-6 pt-4">
              {/* Personal Information */}
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-md flex items-center">
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input 
                        id="name" 
                        value={resume.personalInfo.name} 
                        onChange={(e) => updatePersonalInfo('name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={resume.personalInfo.email} 
                        onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input 
                        id="phone" 
                        value={resume.personalInfo.phone} 
                        onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="linkedin">LinkedIn</Label>
                      <Input 
                        id="linkedin" 
                        value={resume.personalInfo.linkedin} 
                        onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      value={resume.personalInfo.location} 
                      onChange={(e) => updatePersonalInfo('location', e.target.value)}
                      placeholder="City, State"
                    />
                  </div>
                </CardContent>
              </Card>
              
              {/* Education, Experience, Skills, and Certifications sections would go here */}
              {/* Similar structure to the Personal Information section */}
              {/* Omitted for brevity */}
            </TabsContent>
            
            <TabsContent value="preview" className="pt-4">
              <Card className="border shadow-sm p-8">
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-app-purple">
                    {resume.personalInfo.name || 'Your Name'}
                  </h1>
                  <div className="flex items-center justify-center gap-3 mt-2 text-sm text-gray-600 flex-wrap">
                    {resume.personalInfo.email && (
                      <span>{resume.personalInfo.email}</span>
                    )}
                    {resume.personalInfo.phone && (
                      <span>{resume.personalInfo.phone}</span>
                    )}
                    {resume.personalInfo.linkedin && (
                      <span>{resume.personalInfo.linkedin}</span>
                    )}
                    {resume.personalInfo.location && (
                      <span>{resume.personalInfo.location}</span>
                    )}
                  </div>
                </div>
                
                {/* Education Section */}
                <div className="mb-6">
                  <h2 className="text-lg font-semibold border-b border-gray-300 pb-1 mb-3 text-app-purple">
                    EDUCATION
                  </h2>
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="mb-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{edu.institution}</h3>
                          <p>{edu.degree}{edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</p>
                        </div>
                        <div className="text-right">
                          <p>{edu.location}</p>
                          <p className="text-sm">
                            {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                          </p>
                        </div>
                      </div>
                      {edu.highlights.length > 0 && (
                        <ul className="list-disc list-inside mt-2 text-sm">
                          {edu.highlights.map((highlight, index) => (
                            <li key={index}>{highlight}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Experience, Skills, and Certifications preview sections would go here */}
                {/* Omitted for brevity */}
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setActiveTab(activeTab === 'edit' ? 'preview' : 'edit')}
          >
            {activeTab === 'edit' ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Preview Resume
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Resume
              </>
            )}
          </Button>
          <Button 
            className="bg-app-purple hover:bg-app-dark-purple"
            onClick={() => alert('This would generate a PDF of your resume in a complete implementation.')}
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download Resume
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default FinanceResume;