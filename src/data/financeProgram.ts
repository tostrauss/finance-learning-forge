// src/data/financeProgram.ts
import { FinanceCourse, Concentration, Program, Module, Quiz, ProgramRequirement } from '../types/curriculum';

export const financeQuizzes: Quiz[] = [
  // Banking Operations Quizzes
  {
    id: 'fin-281-quiz-1',
    title: 'Core Banking Operations',
    questions: [
      {
        id: 'fin281-q1',
        question: 'Which of the following is a core banking system component?',
        options: [
          'Social media management',
          'Marketing automation',
          'Transaction processing',
          'Website development'
        ],
        correctAnswer: 2,
        explanation: 'Transaction processing is a fundamental component of core banking systems, handling all financial transactions within the bank.'
      },
      {
        id: 'fin281-q2',
        question: 'What is the primary purpose of a general ledger in banking operations?',
        options: [
          'Customer relationship management',
          'Financial record keeping and reporting',
          'Marketing campaign tracking',
          'Branch security management'
        ],
        correctAnswer: 1,
        explanation: 'The general ledger is crucial for financial record keeping and reporting, maintaining all financial transactions and accounts of the bank.'
      }
    ]
  },
  {
    id: 'fin-282-quiz-1',
    title: 'Financial Products and Services',
    questions: [
      {
        id: 'fin282-q1',
        question: 'Which of the following is NOT typically a retail banking product?',
        options: [
          'Savings account',
          'Syndicated loan',
          'Personal credit card',
          'Mortgage loan'
        ],
        correctAnswer: 1,
        explanation: 'Syndicated loans are commercial banking products typically offered to large corporations, not retail banking customers.'
      },
      {
        id: 'fin282-q2',
        question: 'What is the primary function of cash management services in commercial banking?',
        options: [
          'Personal financial planning',
          'ATM maintenance',
          'Optimizing corporate cash flows',
          'Branch security'
        ],
        correctAnswer: 2,
        explanation: 'Cash management services help businesses optimize their cash flows through collection, disbursement, and investment solutions.'
      }
    ]
  },
  {
    id: 'fin-283-quiz-1',
    title: 'Banking Risk Management',
    questions: [
      {
        id: 'fin283-q1',
        question: 'Which type of risk relates to the possibility that a borrower will fail to repay their loan?',
        options: [
          'Market risk',
          'Credit risk',
          'Operational risk',
          'Liquidity risk'
        ],
        correctAnswer: 1,
        explanation: 'Credit risk is the risk that a borrower will default on their debt obligations by failing to make required payments.'
      },
      {
        id: 'fin283-q2',
        question: 'What is the purpose of the Basel Accords in banking?',
        options: [
          'Set marketing standards',
          'Regulate employee benefits',
          'Establish capital requirements',
          'Control interest rates'
        ],
        correctAnswer: 2,
        explanation: 'The Basel Accords establish international banking regulations that set minimum capital requirements based on banks\' risk profiles.'
      }
    ]
  },
  // FIN-201 Quizzes
  {
    id: 'fin-201-quiz-1',
    title: 'Principles of Finance: Foundations',
    questions: [
      {
        id: 'fin201-q1',
        question: 'What is the primary goal of financial management in a corporation?',
        options: [
          'Maximizing shareholder wealth',
          'Minimizing tax liability',
          'Maximizing sales revenue',
          'Minimizing operational costs'
        ],
        correctAnswer: 0,
        explanation: 'The primary goal of financial management is maximizing shareholder wealth, which is achieved through making sound investment, financing, and dividend decisions.'
      },
      {
        id: 'fin201-q2',
        question: 'Which of the following is NOT one of the basic functions of finance?',
        options: [
          'Investment decision-making',
          'Financing decision-making',
          'Marketing strategy development',
          'Dividend policy decision-making'
        ],
        correctAnswer: 2,
        explanation: 'The three basic functions of finance include investment decisions (asset management), financing decisions (capital structure management), and dividend policy decisions. Marketing strategy is part of the marketing function, not finance.'
      },
      {
        id: 'fin201-q3',
        question: 'The time value of money concept is based on the principle that:',
        options: [
          'Money loses value over time due to inflation',
          'A dollar today is worth more than a dollar in the future',
          'Interest rates always increase over time',
          'Financial markets are always efficient'
        ],
        correctAnswer: 1,
        explanation: 'The time value of money concept states that a dollar today is worth more than a dollar in the future because of its earning potential and inflation effects.'
      },
      {
        id: 'fin201-q4',
        question: 'What does NPV stand for in capital budgeting?',
        options: [
          'New Present Value',
          'Net Present Value',
          'Negative Present Value',
          'Net Profitable Venture'
        ],
        correctAnswer: 1,
        explanation: 'NPV stands for Net Present Value, which is a capital budgeting technique that calculates the present value of future cash flows minus the initial investment.'
      },
      {
        id: 'fin201-q5',
        question: 'Which financial statement shows a company\'s assets, liabilities, and shareholders\' equity at a specific point in time?',
        options: [
          'Income Statement',
          'Balance Sheet',
          'Cash Flow Statement',
          'Statement of Retained Earnings'
        ],
        correctAnswer: 1,
        explanation: 'The Balance Sheet shows a company\'s financial position (assets, liabilities, and equity) at a specific point in time.'
      }
    ]
  },
  {
    id: 'fin-201-quiz-2',
    title: 'Time Value of Money',
    questions: [
      {
        id: 'fin201-tv-q1',
        question: 'If you invest $1,000 today at 8% annual interest, compounded annually, how much will you have after 5 years?',
        options: [
          '$1,400',
          '$1,469.33',
          '$1,500',
          '$1,200'
        ],
        correctAnswer: 1,
        explanation: 'Using the compound interest formula FV = PV(1+r)^n: $1,000(1+0.08)^5 = $1,469.33'
      },
      {
        id: 'fin201-tv-q2',
        question: 'Present value is:',
        options: [
          'The value of a future sum of money today',
          'The future value of a current sum of money',
          'The interest rate applied to a sum of money',
          'The difference between future value and present value'
        ],
        correctAnswer: 0,
        explanation: 'Present value is the current worth of a future sum of money given a specified rate of return.'
      }
    ]
  },
  {
    id: 'fin-302-quiz-1',
    title: 'Corporate Finance Fundamentals',
    questions: [
      {
        id: 'fin302-q1-1',
        question: 'According to the Modigliani-Miller Theorem (without taxes), what impact does capital structure have on firm value?',
        options: [
          'Capital structure has no impact on firm value',
          'More debt increases firm value due to the tax shield',
          'More equity increases firm value due to reduced bankruptcy risk',
          'Optimal capital structure maximizes firm value at a specific debt-to-equity ratio'
        ],
        correctAnswer: 0,
        explanation: 'The Modigliani-Miller Theorem (Proposition I) without taxes states that in perfect capital markets, a firm\'s value is unaffected by its capital structure. This implies that financing decisions (debt vs. equity) don\'t affect total firm value.'
      },
      {
        id: 'fin302-q1-2',
        question: 'Which of the following is NOT a component of the Weighted Average Cost of Capital (WACC) calculation?',
        options: [
          'Cost of debt',
          'Cost of equity',
          'Cost of preferred stock',
          'Cost of retained earnings'
        ],
        correctAnswer: 3,
        explanation: 'Retained earnings are already incorporated in the cost of equity calculation. The WACC components typically include the cost of debt (adjusted for tax), cost of equity, and sometimes cost of preferred stock, each weighted by their proportion in the capital structure.'
      },
      {
        id: 'fin302-q1-3',
        question: 'What does the Trade-Off Theory of capital structure suggest?',
        options: [
          'Firms should use 100% debt financing due to the tax shield',
          'Firms should use 100% equity financing to avoid bankruptcy costs',
          'Firms balance the tax benefits of debt against financial distress costs',
          'Firms should follow industry average capital structures regardless of individual circumstances'
        ],
        correctAnswer: 2,
        explanation: 'The Trade-Off Theory suggests that firms balance the tax benefits of debt (interest tax shield) against the costs of financial distress (including bankruptcy costs). This implies an optimal capital structure where marginal benefits equal marginal costs of debt.'
      },
      {
        id: 'fin302-q1-4',
        question: 'In the Capital Asset Pricing Model (CAPM), what does beta measure?',
        options: [
          'Unsystematic risk of a security',
          'Total risk of a security',
          'Systematic risk of a security',
          'Default risk of a security'
        ],
        correctAnswer: 2,
        explanation: 'In the CAPM, beta measures systematic risk, which is the sensitivity of a security\'s returns to market returns. A beta greater than 1 indicates higher systematic risk than the market, while a beta less than 1 indicates lower systematic risk.'
      },
      {
        id: 'fin302-q1-5',
        question: 'What is the primary implication of the Pecking Order Theory regarding financing decisions?',
        options: [
          'Firms prefer internal financing over external financing, and debt over equity when external financing is needed',
          'Firms prefer external financing over internal financing to signal growth potential',
          'Firms prefer equity over debt to maintain financial flexibility',
          'Firms randomly choose financing methods based on market conditions'
        ],
        correctAnswer: 0,
        explanation: 'The Pecking Order Theory, developed by Myers and Majluf, suggests that firms prefer internal financing (retained earnings) first, then debt, and finally equity as a last resort when external financing is required. This is due to information asymmetry between managers and investors.'
      }
    ]
  },
  {
    id: 'fin-302-quiz-2',
    title: 'Capital Budgeting Techniques',
    questions: [
      {
        id: 'fin302-q2-1',
        question: 'What does the Net Present Value (NPV) method measure?',
        options: [
          'The time it takes to recover the initial investment',
          'The percentage return on a project',
          'The absolute dollar value created by a project in today\'s dollars',
          'The maximum loss possible from a project'
        ],
        correctAnswer: 2,
        explanation: 'Net Present Value (NPV) measures the difference between the present value of cash inflows and the present value of cash outflows for a project. It represents the absolute dollar value that a project is expected to create or destroy in today\'s dollars.'
      },
      {
        id: 'fin302-q2-2',
        question: 'A project has an Internal Rate of Return (IRR) of 15% and a required rate of return of 12%. What decision should be made regarding this project?',
        options: [
          'Reject the project because IRR < 12%',
          'Accept the project because IRR > 12%',
          'More information is needed to make a decision',
          'Calculate the NPV to determine whether to accept or reject'
        ],
        correctAnswer: 1,
        explanation: 'When a project\'s IRR exceeds the required rate of return (or hurdle rate), the project should be accepted. In this case, the 15% IRR exceeds the 12% required return, indicating the project is expected to create value.'
      },
      {
        id: 'fin302-q2-3',
        question: 'Which of the following is NOT a weakness of the Payback Period method?',
        options: [
          'It ignores the time value of money',
          'It ignores cash flows after the payback period',
          'It cannot handle non-conventional cash flows',
          'It doesn\'t account for project risk'
        ],
        correctAnswer: 2,
        explanation: 'Unlike IRR, the Payback Period method does not have issues with non-conventional cash flows (those with multiple sign changes). Its primary weaknesses are ignoring the time value of money, ignoring cash flows after the payback period, and not accounting for project risk.'
      },
      {
        id: 'fin302-q2-4',
        question: 'Which capital budgeting technique is theoretically the most accurate for maximizing shareholder wealth?',
        options: [
          'Net Present Value (NPV)',
          'Internal Rate of Return (IRR)',
          'Payback Period',
          'Accounting Rate of Return'
        ],
        correctAnswer: 0,
        explanation: 'Net Present Value (NPV) is theoretically the most accurate capital budgeting technique for maximizing shareholder wealth. It directly measures the expected dollar impact on firm value, accounts for the time value of money, considers all cash flows, and uses the appropriate risk-adjusted discount rate.'
      },
      {
        id: 'fin302-q2-5',
        question: 'A project has the following cash flows: Initial investment = $10,000; Year 1 = $4,000; Year 2 = $4,000; Year 3 = $4,000. Using a 10% discount rate, what is the project\'s NPV?',
        options: [
          '$2,000',
          '$0',
          '-$1,000',
          '-$2,000'
        ],
        correctAnswer: 1,
        explanation: 'NPV = -$10,000 + $4,000/(1.1) + $4,000/(1.1)² + $4,000/(1.1)³ = -$10,000 + $3,636.36 + $4,115.23 + $4,641.59 = $2,393.18. Therefore, the NPV is approximately $2,000.'
      }
    ]
  },
  {
    id: 'fin-403-quiz-1',
    title: 'Investment Management Principles',
    questions: [
      {
        id: 'fin403-q1',
        question: 'What is the Capital Asset Pricing Model (CAPM) used for?',
        options: [
          'Determining optimal capital structure',
          'Calculating the expected return for a security',
          'Evaluating merger and acquisition targets',
          'Measuring a company\'s operational efficiency'
        ],
        correctAnswer: 1,
        explanation: 'The CAPM is used to determine a theoretically appropriate required rate of return for an asset, given its risk in relation to the market.'
      }
    ]
  },
  {
  id: 'corporate-finance-1-quiz',
  title: 'Capital Structure and Financing Decisions',
  questions: [
    {
      id: 'corp-fin-q1',
      question: "Which of the following is NOT a characteristic of debt financing?",
      options: [
        "Creates a legal obligation to repay the principal amount",
        "Interest payments are usually tax-deductible",
        "Provides investors with ownership rights in the company",
        "Often includes restrictive covenants"
      ],
      correctAnswer: 2,
      explanation: "Debt financing does not provide investors (lenders) with ownership rights in the company. This is a key characteristic of equity financing."
    },
    {
      id: 'corp-fin-q2',
      question: "A company has a market value of equity of $800 million, market value of debt of $200 million, cost of equity of 14%, cost of debt of 5%, and a tax rate of 30%. What is its WACC?",
      options: [
        "7.7%",
        "9.5%",
        "11.9%",
        "12.2%"
      ],
      correctAnswer: 2,
      explanation: "WACC = (E/V × Re) + (D/V × Rd × (1-Tc)). Substituting values: WACC = (800/1000 × 14%) + (200/1000 × 5% × (1-0.3)) = 11.2% + 0.7% = 11.9%"
    },
    {
      id: 'corp-fin-q3',
      question: "According to the Pecking Order Theory, what is the preferred order of financing sources?",
      options: [
        "Equity, debt, internal funds",
        "Internal funds, equity, debt",
        "Debt, internal funds, equity",
        "Internal funds, debt, equity"
      ],
      correctAnswer: 3,
      explanation: "The Pecking Order Theory suggests companies prefer: (1) internal funds (retained earnings), (2) debt financing, and (3) equity financing as a last resort."
    },
    {
      id: 'corp-fin-q4',
      question: "According to the Trade-Off Theory, what is the primary benefit of increasing debt in the capital structure?",
      options: [
        "Lower cost of equity",
        "Tax shield from interest payments",
        "Increased ownership control",
        "Reduced agency costs"
      ],
      correctAnswer: 1,
      explanation: "According to the Trade-Off Theory, the primary benefit of increasing debt is the tax shield created by interest payments."
    },
    {
      id: 'corp-fin-q5',
      question: "Which industry typically maintains the highest debt-to-equity ratios?",
      options: [
        "Software technology",
        "Pharmaceuticals",
        "Utilities",
        "Social media"
      ],
      correctAnswer: 2,
      explanation: "Utilities typically maintain higher debt-to-equity ratios due to their stable, predictable cash flows and capital-intensive operations."
    }
  ]
}
];

export const programRequirements: ProgramRequirement[] = [
  {
    id: 'core',
    name: 'Core Requirements',
    description: 'Foundational finance courses required for all concentrations',
    requiredCredits: 30,
    categories: [
      {
        name: 'Required Core Courses',
        requiredCredits: 30,
        courses: ['FIN 201', 'FIN 280', 'FIN 302', 'FIN 403']
      }
    ]
  },
  {
    id: 'concentration',
    name: 'Concentration Requirements',
    description: 'Specialized courses for your chosen concentration',
    requiredCredits: 18,
    categories: [
      {
        name: 'Required Concentration Courses',
        requiredCredits: 18,
        courses: [] // Varies by concentration
      }
    ]
  },
  {
    id: 'electives',
    name: 'Finance Electives',
    description: 'Additional finance courses of your choice',
    requiredCredits: 12,
    categories: [
      {
        name: 'Finance Electives',
        requiredCredits: 12,
        courses: [] // Any upper-level finance courses
      }
    ]
  }
];

export const concentrations: Concentration[] = [
  {
    id: 'general',
    name: 'General Finance',
    description: 'Build a broad foundation in finance principles covering investments, markets, and corporate finance.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 403'],
    electiveCourses: ['FIN 300-400 Level Elective']
  },
  {
    id: 'corporate',
    name: 'Corporate Finance',
    description: 'Specialize in financial management for corporations, focusing on capital structure and investment decisions.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 403', 'FIN 404'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 405', 'FIN 406']
  },
  {
    id: 'investments',
    name: 'Investment Management',
    description: 'Focus on portfolio management, securities analysis, and investment strategies.',
    requiredCourses: ['FIN 201', 'FIN 403', 'FIN 412', 'FIN 414'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 415', 'FIN 416']
  },
  {
    id: 'banking',
    name: 'Banking & Financial Services',
    description: 'Specialize in banking operations, financial services, and risk management.',
    requiredCourses: ['FIN 201', 'FIN 280', 'FIN 281', 'FIN 282', 'FIN 283'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 480', 'FIN 481']
  },
  {
    id: 'international',
    name: 'International Finance',
    description: 'Focus on global financial markets, cross-border transactions, and international investments.',
    requiredCourses: ['FIN 201', 'FIN 403', 'FIN 411', 'FIN 413'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 415', 'FIN 417']
  },
  {
    id: 'planning',
    name: 'Financial Planning',
    description: 'Prepare for a career in personal financial planning, wealth management, and advisory services.',
    requiredCourses: ['FIN 201', 'FIN 301', 'FIN 321', 'FIN 421'],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 422', 'FIN 423']
  }
];

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
        content: `# Banking System Overview

## The Role of Banks in the Economy
- Financial intermediation
- Payment systems
- Money creation through fractional reserve banking
- Credit allocation and economic growth

## Types of Financial Institutions
- Commercial banks
- Investment banks
- Credit unions
- Savings institutions
- Non-bank financial institutions`,
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
    modules: [
      {
        id: 'fin-281-1',
        title: 'Core Banking Operations',
        description: 'Understanding fundamental banking operations and systems',
        content: `# Core Banking Operations

## Introduction to Banking Operations
Banking operations encompass all the activities that support the delivery of banking services to customers. This module covers the key operational aspects of modern banking.

### Core Banking Systems
- Account management systems
- Transaction processing
- Customer information management
- Regulatory reporting systems
- General ledger and accounting

### Branch Operations
- Teller services
- Account opening procedures
- Cash management
- Security protocols
- Customer service operations

### Digital Banking Operations
- Online banking platforms
- Mobile banking applications
- ATM networks
- Payment processing systems
- Digital security measures

## Operational Efficiency
- Process automation
- Service level agreements
- Quality control measures
- Performance metrics
- Cost optimization strategies`,
        duration: 45,
        quizId: 'fin-281-quiz-1',
        completed: false
      },
      {
        id: 'fin-281-2',
        title: 'Payment Systems and Settlement',
        description: 'Learn about various payment systems and settlement processes',
        content: `# Payment Systems and Settlement

## Types of Payment Systems
- Real-time gross settlement (RTGS)
- Automated clearing house (ACH)
- Wire transfer systems
- Card payment networks
- Digital payment platforms

## Settlement Processes
- Clearing mechanisms
- Settlement finality
- Payment reconciliation
- Dispute resolution
- Cross-border settlements`,
        duration: 40,
        quizId: 'fin-281-quiz-2',
        completed: false
      },
      {
        id: 'fin-281-3',
        title: 'Technology in Banking',
        description: 'Explore modern banking technology and digital transformation',
        content: `# Technology in Banking

## Digital Transformation
- Core system modernization
- API integration
- Cloud computing
- Mobile-first strategies
- Digital customer onboarding

## Emerging Technologies
- Artificial Intelligence in banking
- Blockchain applications
- Open banking platforms
- Robotic process automation
- Big data analytics`,
        duration: 35,
        quizId: 'fin-281-quiz-3',
        completed: false
      }
    ]
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
    modules: [
      {
        id: 'fin-282-1',
        title: 'Financial Products and Services',
        description: 'Understanding the range of financial products and services offered by banks',
        content: `# Financial Products and Services

## Retail Banking Products
- Deposit accounts
- Consumer lending
- Mortgage products
- Credit cards
- Investment products

## Commercial Banking Services
- Business accounts
- Commercial lending
- Trade finance
- Cash management
- Merchant services

## Wealth Management
- Investment advisory
- Portfolio management
- Trust services
- Estate planning
- Private banking`,
        duration: 45,
        quizId: 'fin-282-quiz-1',
        completed: false
      },
      {
        id: 'fin-282-2',
        title: 'Product Development and Innovation',
        description: 'Learn about financial product development and innovation strategies',
        content: `# Product Development and Innovation

## Product Development Process
- Market research
- Product design
- Pricing strategies
- Regulatory compliance
- Launch planning

## Financial Innovation
- Fintech partnerships
- Digital product development
- Customer-centric design
- Market testing
- Performance monitoring`,
        duration: 40,
        quizId: 'fin-282-quiz-2',
        completed: false
      },
      {
        id: 'fin-282-3',
        title: 'Customer Relationship Management',
        description: 'Master effective customer relationship management in banking',
        content: `# Customer Relationship Management

## Customer Service Excellence
- Service quality standards
- Customer feedback systems
- Complaint resolution
- Client communications
- Relationship building

## Sales and Marketing
- Cross-selling strategies
- Customer segmentation
- Marketing campaigns
- Digital marketing
- Performance tracking`,
        duration: 35,
        quizId: 'fin-282-quiz-3',
        completed: false
      }
    ]
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
    modules: [
      {
        id: 'fin-283-1',
        title: 'Risk Management Framework',
        description: 'Understanding the fundamentals of risk management in banking',
        content: `# Risk Management Framework

## Types of Banking Risks
- Credit risk
- Market risk
- Operational risk
- Liquidity risk
- Compliance risk

## Risk Management Process
- Risk identification
- Risk assessment
- Risk monitoring
- Risk mitigation
- Risk reporting`,
        duration: 45,
        quizId: 'fin-283-quiz-1',
        completed: false
      },
      {
        id: 'fin-283-2',
        title: 'Credit Risk Management',
        description: 'Learn about credit risk assessment and management',
        content: `# Credit Risk Management

## Credit Analysis
- Credit scoring models
- Financial statement analysis
- Industry analysis
- Collateral evaluation
- Credit monitoring

## Portfolio Management
- Portfolio diversification
- Concentration limits
- Stress testing
- Loss provisioning
- Recovery strategies`,
        duration: 40,
        quizId: 'fin-283-quiz-2',
        completed: false
      },
      {
        id: 'fin-283-3',
        title: 'Regulatory Compliance',
        description: 'Master banking regulations and compliance requirements',
        content: `# Regulatory Compliance

## Banking Regulations
- Basel Accords
- Capital requirements
- Liquidity requirements
- Consumer protection
- Anti-money laundering

## Compliance Management
- Policy development
- Staff training
- Monitoring systems
- Reporting requirements
- Audit procedures`,
        duration: 35,
        quizId: 'fin-283-quiz-3',
        completed: false
      }
    ]
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
    modules: [
      {
        id: 'fin-480-1',
        title: 'Modern Banking Challenges',
        description: 'Explore contemporary issues and trends in banking',
        content: `# Modern Banking Challenges

## Digital Transformation
- Online and mobile banking
- Financial technology (FinTech)
- Digital payments and cryptocurrencies
- AI and machine learning applications

## Regulatory Compliance
- Basel Accords
- Anti-money laundering
- Consumer protection
- Capital requirements`,
        duration: 45,
        quizId: 'fin-480-quiz-1',
        completed: false
      }
    ]
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
    modules: [
      {
        id: 'fin-411-1',
        title: 'International Financial Markets',
        description: 'Overview of global financial markets and instruments',
        content: `# International Financial Markets

## Global Financial System
- Components: central banks, commercial banks, investment banks, insurance companies, pension funds, hedge funds, private equity
- Functions: monetary policy implementation, financial intermediation, risk management, price discovery, liquidity provision

## International Capital Markets
- Market for securities (stocks and bonds) issued outside the home country
- Involves foreign investments and cross-border capital flows
- Influenced by interest rates, exchange rates, and economic conditions

## Foreign Exchange Market
- Market for trading currencies
- Determines exchange rates
- Influenced by interest rates, inflation, political stability, and economic performance

## International Money Market
- Market for short-term borrowing and lending in foreign currencies
- Involves certificates of deposit, Eurocurrency deposits, and foreign commercial paper

## International Bond Market
- Market for debt securities issued in foreign currencies
- Includes Eurobonds and foreign bonds
- Influenced by interest rates, exchange rates, and credit risk

## International Equity Market
- Market for buying and selling shares of foreign companies
- Involves cross-listing and global depositary receipts (GDRs)
- Influenced by company performance, economic conditions, and political stability

## Derivatives Market
- Market for financial contracts whose value is derived from underlying assets
- Includes options, futures, and swaps
- Used for hedging and speculation`,
        duration: 45,
        quizId: 'fin-411-quiz-1',
        completed: false
      }
    ]
  }
];