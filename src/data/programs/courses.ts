import { FinanceCourse } from '../../types/curriculum';

export const financeCourses: FinanceCourse[] = [
  {
    id: 'fin-201',
    courseCode: 'FIN 201',
    title: 'Principles of Finance',
    credits: 3,
    description: 'Introduction to core financial concepts, including time value of money, risk and return, financial statements, and capital budgeting.',
    academicLevel: 200,
    prerequisites: [],
    concentrations: ['general', 'corporate', 'investments', 'banking', 'planning'],
    pathId: 'general',
    modules: [
      {
        id: 'fin-201-1',
        title: 'Introduction to Financial Concepts',
        description: 'Learn the fundamental principles and concepts of finance.',
        content: '# Introduction to Financial Concepts\n\nFinance is the study of money management...',
        duration: 30,
        quizId: 'fin-201-quiz-1',
        completed: false
      },
      {
        id: 'fin-201-2',
        title: 'Time Value of Money',
        description: 'Understand present value, future value, and their applications.',
        content: '# Time Value of Money\n\nThe time value of money is a fundamental concept...',
        duration: 45,
        quizId: 'fin-201-quiz-2',
        completed: false
      }
    ]
  },
  {
    id: 'fin-280',
    courseCode: 'FIN 280',
    title: 'Introduction to Banking and Financial Services',
    credits: 3,
    description: 'Introduction to banking operations, financial services industry structure, and regulatory frameworks.',
    academicLevel: 200,
    prerequisites: ['FIN 201'],
    concentrations: ['banking'],
    pathId: 'banking',
    modules: [
      {
        id: 'fin-280-1',
        title: 'Banking System Overview',
        description: 'Understanding the role and structure of banks in the financial system',
        content: `# Banking System Overview\n\n## The Role of Banks in the Economy\n- Financial intermediation\n- Payment systems\n- Money creation through fractional reserve banking\n- Credit allocation and economic growth\n\n## Types of Financial Institutions\n- Commercial banks\n- Investment banks\n- Credit unions\n- Savings institutions\n- Non-bank financial institutions`,
        duration: 45,
        quizId: 'fin-280-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'fin-281',
    courseCode: 'FIN 281',
    title: 'Banking Operations',
    credits: 3,
    description: 'Deep dive into day-to-day banking operations, technology systems, and operational efficiency.',
    academicLevel: 200,
    prerequisites: ['FIN 201'],
    concentrations: ['banking'],
    modules: [/* ... modules ... */]
  },
  {
    id: 'fin-282',
    courseCode: 'FIN 282',
    title: 'Financial Services Management',
    credits: 3,
    description: 'Comprehensive coverage of financial services, product development, and customer relationship management.',
    academicLevel: 200,
    prerequisites: ['FIN 201'],
    concentrations: ['banking'],
    modules: [/* ... modules ... */]
  },
  {
    id: 'fin-283',
    courseCode: 'FIN 283',
    title: 'Banking Risk Management',
    credits: 3,
    description: 'Introduction to risk management principles and practices in banking.',
    academicLevel: 200,
    prerequisites: ['FIN 201'],
    concentrations: ['banking'],
    modules: [/* ... modules ... */]
  },
  {
    id: 'fin-403',
    courseCode: 'FIN 403',
    title: 'Investment Analysis',
    credits: 3,
    description: 'Analysis of investment vehicles, portfolio theory, and market efficiency.',
    academicLevel: 400,
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'investments'],
    modules: [
      {
        id: 'fin-403-1',
        title: 'Portfolio Theory',
        description: 'Learn modern portfolio theory and asset allocation strategies.',
        content: '# Portfolio Theory\n\nModern Portfolio Theory (MPT) is a framework...',
        duration: 45,
        quizId: 'fin-403-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'fin-480',
    courseCode: 'FIN 480',
    title: 'Advanced Banking and Financial Services',
    credits: 3,
    description: 'Advanced topics in banking including risk management, financial products, and emerging trends.',
    academicLevel: 400,
    prerequisites: ['FIN 380'],
    concentrations: ['banking'],
    pathId: 'banking',
    modules: [/* ... modules ... */]
  },
  {
    id: 'fin-411',
    courseCode: 'FIN 411',
    title: 'International Finance',
    credits: 3,
    description: 'Study of international financial markets, exchange rates, and cross-border financial management.',
    academicLevel: 400,
    prerequisites: ['FIN 201'],
    concentrations: ['international'],
    pathId: 'international',
    modules: [/* ... modules ... */]
  }
];
