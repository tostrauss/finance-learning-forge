import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ExternalLink } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

// CFA Level 1 topic areas with weights
const cfaTopics = [
  { id: 'ethics', name: 'Ethics and Professional Standards', weight: 15, progress: 0 },
  { id: 'quant', name: 'Quantitative Methods', weight: 10, progress: 0 },
  { id: 'econ', name: 'Economics', weight: 10, progress: 0 },
  { id: 'accounting', name: 'Financial Reporting and Analysis', weight: 15, progress: 0 },
  { id: 'corporate', name: 'Corporate Finance', weight: 10, progress: 0 },
  { id: 'equity', name: 'Equity Investments', weight: 11, progress: 0 },
  { id: 'fixed-income', name: 'Fixed Income', weight: 11, progress: 0 },
  { id: 'derivatives', name: 'Derivatives', weight: 6, progress: 0 },
  { id: 'alternative', name: 'Alternative Investments', weight: 6, progress: 0 },
  { id: 'portfolio', name: 'Portfolio Management', weight: 6, progress: 0 },
];

// Study resources by topic
const studyResources = {
  ethics: [
    { title: 'Code of Ethics and Standards', type: 'reading', duration: '2h' },
    { title: 'Professional Conduct Program', type: 'case-study', duration: '1.5h' },
    { title: 'Ethics Practice Problems', type: 'practice', duration: '1h' },
  ],
  quant: [
    { title: 'Time Value of Money', type: 'reading', duration: '2h' },
    { title: 'Statistical Concepts', type: 'video', duration: '1.5h' },
    { title: 'Probability Concepts', type: 'reading', duration: '2h' },
  ],
  // Add resources for other topics...
};

interface StudySession {
  topic: string;
  date: string;
  duration: number;
  questionsAnswered: number;
  correctAnswers: number;
}

const CFAPrep = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [studyHistory, setStudyHistory] = useState<StudySession[]>([]);
  const [examDate, setExamDate] = useState('2025-11-15');
  const [overallProgress, setOverallProgress] = useState(35); // Example progress

  // Calculate days until exam
  const today = new Date();
  const examDateObj = new Date(examDate);
  const daysUntilExam = Math.ceil((examDateObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate recommended study hours per day
  const totalRequiredHours = 300; // CFA recommends 300 hours of study
  const remainingHours = totalRequiredHours * (1 - overallProgress / 100);
  const recommendedHoursPerDay = Math.ceil(remainingHours / daysUntilExam);

  // Exam registration information
  const examInfo = {
    level: 'Level I',
    duration: '4 hours and 30 minutes',
    questions: '180 questions',
    format: 'Computer-based testing',
    cost: '$1,200 (early registration)',
    registrationUrl: 'https://www.cfainstitute.org/en/programs/cfa/register',
    deadlines: {
      early: 'August 9, 2025',
      standard: 'October 11, 2025',
      late: 'October 25, 2025'
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">CFA Level I Exam Preparation</h2>
          <p className="text-muted-foreground mt-2">
            Comprehensive preparation for the CFA Program
          </p>
        </div>
        <Button 
          className="bg-app-purple hover:bg-app-dark-purple"
          onClick={() => window.open(examInfo.registrationUrl, '_blank')}
        >
          Register for CFA Exam <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Topic Areas</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exam Information</CardTitle>
                <CardDescription>Key details about the CFA Level I Exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Format</p>
                      <p className="text-lg font-medium">{examInfo.format}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Questions</p>
                      <p className="text-lg font-medium">{examInfo.questions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-medium">{examInfo.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Registration Fee</p>
                      <p className="text-lg font-medium">{examInfo.cost}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Registration Deadlines</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Early Registration</span>
                        <span className="text-sm font-medium">{examInfo.deadlines.early}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Standard Registration</span>
                        <span className="text-sm font-medium">{examInfo.deadlines.standard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Late Registration</span>
                        <span className="text-sm font-medium">{examInfo.deadlines.late}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exam Preparation Status</CardTitle>
                <CardDescription>Track your overall preparation progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>Overall Progress</span>
                      <span>{overallProgress}%</span>
                    </div>
                    <Progress value={overallProgress} />
                  </div>
                  
                  <div className="space-y-2">
                    <p><strong>Days until exam:</strong> {daysUntilExam}</p>
                    <p><strong>Recommended daily study:</strong> {recommendedHoursPerDay} hours</p>
                    <p><strong>Total study hours logged:</strong> {totalRequiredHours * (overallProgress / 100)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>CFA Level 1 Topic Areas</CardTitle>
              <CardDescription>Study materials organized by exam topic</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {cfaTopics.map(topic => (
                  <AccordionItem key={topic.id} value={topic.id}>
                    <AccordionTrigger>
                      <div className="flex justify-between w-full pr-4">
                        <span>{topic.name}</span>
                        <Badge variant="secondary">{topic.weight}%</Badge>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <Progress value={topic.progress} className="w-[200px]" />
                            <p className="text-sm text-muted-foreground mt-1">
                              Progress: {topic.progress}%
                            </p>
                          </div>
                          <Button onClick={() => setSelectedTopic(topic.id)}>
                            Start Studying
                          </Button>
                        </div>
                        
                        <div className="grid gap-4 mt-4">
                          {studyResources[topic.id as keyof typeof studyResources]?.map((resource, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <h4 className="font-medium">{resource.title}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {resource.type} • {resource.duration}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm">
                                    Start
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Practice Questions</CardTitle>
                <CardDescription>Test your knowledge with topic-specific questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cfaTopics.map(topic => (
                    <div key={topic.id} className="flex justify-between items-center">
                      <span>{topic.name}</span>
                      <Button variant="outline">
                        Start Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mock Exams</CardTitle>
                <CardDescription>Full-length practice exams under exam conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Mock Exam 1</h4>
                      <p className="text-sm text-muted-foreground">180 questions • 4.5 hours</p>
                    </div>
                    <Button>Start Exam</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Mock Exam 2</h4>
                      <p className="text-sm text-muted-foreground">180 questions • 4.5 hours</p>
                    </div>
                    <Button>Start Exam</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Study Progress Analytics</CardTitle>
              <CardDescription>Track your preparation and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Topic Progress</h3>
                  <div className="space-y-2">
                    {cfaTopics.map(topic => (
                      <div key={topic.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{topic.name}</span>
                          <span className="text-sm">{topic.progress}%</span>
                        </div>
                        <Progress value={topic.progress} />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Average Score</p>
                        <p className="text-2xl font-bold">72%</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Questions Completed</p>
                        <p className="text-2xl font-bold">1,240</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Study Hours</p>
                        <p className="text-2xl font-bold">105</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Mock Exams Taken</p>
                        <p className="text-2xl font-bold">2</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CFAPrep;