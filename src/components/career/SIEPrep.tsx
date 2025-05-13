import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ExternalLink } from "lucide-react";

// SIE Exam topics with recommended study time
const sieTopics = [
  { 
    id: 'knowledge',
    name: 'Knowledge of Capital Markets',
    weight: 16,
    progress: 0,
    subtopics: [
      'Market Structure',
      'Economic Factors',
      'Securities Markets',
    ]
  },
  { 
    id: 'understanding', 
    name: 'Understanding Products and their Risks',
    weight: 44,
    progress: 0,
    subtopics: [
      'Equity Securities',
      'Fixed Income Securities',
      'Investment Company Products',
      'Insurance-Based Products',
    ]
  },
  { 
    id: 'trading',
    name: 'Trading, Customer Accounts and Prohibited Activities',
    weight: 31,
    progress: 0,
    subtopics: [
      'Trading and Settlement',
      'Customer Accounts',
      'Prohibited Activities',
    ]
  },
  { 
    id: 'regulations',
    name: 'Overview of Regulatory Framework',
    weight: 9,
    progress: 0,
    subtopics: [
      'SRO Regulatory Requirements',
      'Employee Conduct',
      'Registration Requirements',
    ]
  },
];

// Study resources by topic
const studyResources = {
  knowledge: [
    { title: 'Capital Markets Structure', type: 'reading', duration: '1.5h' },
    { title: 'Economic Fundamentals', type: 'video', duration: '1h' },
    { title: 'Market Indicators Practice', type: 'practice', duration: '1h' },
  ],
  understanding: [
    { title: 'Securities Products Overview', type: 'reading', duration: '2h' },
    { title: 'Risk Analysis Workshop', type: 'interactive', duration: '1.5h' },
    { title: 'Investment Products Quiz', type: 'practice', duration: '1h' },
  ],
  trading: [
    { title: 'Trading Mechanisms', type: 'video', duration: '1.5h' },
    { title: 'Account Management', type: 'reading', duration: '2h' },
    { title: 'Compliance Guidelines', type: 'case-study', duration: '1h' },
  ],
  regulations: [
    { title: 'Regulatory Framework', type: 'reading', duration: '1.5h' },
    { title: 'FINRA Rules Overview', type: 'video', duration: '1h' },
    { title: 'Registration Requirements', type: 'practice', duration: '1h' },
  ],
};

const SIEPrep = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [overallProgress, setOverallProgress] = useState(0);
  
  // Exam details
  const examInfo = {
    questions: 75,
    duration: '1 hour and 45 minutes',
    passingScore: '70%',
    cost: '$80',
    registrationUrl: 'https://www.finra.org/registration-exams-ce/qualification-exams/securities-industry-essentials-exam',
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold">Securities Industry Essentials (SIE) Exam Preparation</h2>
          <p className="text-muted-foreground mt-2">
            Your gateway to a career in the securities industry
          </p>
        </div>
        <Button 
          className="bg-app-purple hover:bg-app-dark-purple"
          onClick={() => window.open(examInfo.registrationUrl, '_blank')}
        >
          Register for Exam <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="topics">Study Topics</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Exam Information</CardTitle>
                <CardDescription>Key details about the SIE Exam</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Questions</p>
                      <p className="text-lg font-medium">{examInfo.questions}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="text-lg font-medium">{examInfo.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Passing Score</p>
                      <p className="text-lg font-medium">{examInfo.passingScore}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Cost</p>
                      <p className="text-lg font-medium">{examInfo.cost}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your exam preparation</CardDescription>
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
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics">
          <Card>
            <CardHeader>
              <CardTitle>Study Topics</CardTitle>
              <CardDescription>Comprehensive coverage of exam content</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {sieTopics.map(topic => (
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
                        
                        <div className="mt-4">
                          <h4 className="font-medium mb-2">Subtopics:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {topic.subtopics.map((subtopic, index) => (
                              <li key={index} className="text-sm text-muted-foreground">
                                {subtopic}
                              </li>
                            ))}
                          </ul>
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
                  {sieTopics.map(topic => (
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
                      <h4 className="font-medium">Practice Exam 1</h4>
                      <p className="text-sm text-muted-foreground">75 questions • 1h 45m</p>
                    </div>
                    <Button>Start Exam</Button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Practice Exam 2</h4>
                      <p className="text-sm text-muted-foreground">75 questions • 1h 45m</p>
                    </div>
                    <Button>Start Exam</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Study Resources</CardTitle>
              <CardDescription>Comprehensive materials to help you prepare</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid gap-4">
                  {Object.entries(studyResources).map(([topicId, resources]) => (
                    <div key={topicId}>
                      <h3 className="font-medium mb-2">
                        {sieTopics.find(t => t.id === topicId)?.name}
                      </h3>
                      <div className="grid gap-2">
                        {resources.map((resource, index) => (
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
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SIEPrep;