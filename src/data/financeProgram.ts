// src/data/financeProgram.ts
import { FinanceCourse, Concentration, Program, Module, Quiz, ProgramRequirement } from '../types/curriculum';

export const financeQuizzes: Quiz[] = [
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
    id: 'fin-302',
    courseCode: 'FIN 302',
    title: 'Corporate Finance',
    credits: 3,
    description: 'Advanced study of corporate financial management, including capital structure, dividend policy, and working capital management.',
    academicLevel: 300,
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'corporate'],
    modules: [
      {
        id: 'fin-302-1',
        title: 'Capital Structure and Cost of Capital',
        description: 'Understanding how firms choose between debt and equity financing.',
        content: '# Capital Structure and Cost of Capital\n\nCapital structure refers to the mix of debt and equity...',
        duration: 60,
        quizId: 'fin-302-quiz-1',
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
    id: 'fin-380',
    courseCode: 'FIN 380',
    title: 'Bank Management',
    credits: 3,
    description: 'Analysis of bank performance, risk management, and regulatory compliance.',
    academicLevel: 300,
    prerequisites: ['FIN 280'],
    concentrations: ['banking'],
    pathId: 'banking',
    modules: [
      {
        id: 'fin-380-1',
        title: 'Bank Performance Analysis',
        description: 'Learn to evaluate bank financial statements and key performance metrics',
        content: `# Bank Performance Analysis

## Key Performance Indicators
- Net interest margin
- Return on assets
- Return on equity
- Efficiency ratio
- Capital adequacy ratios

## Risk Management
- Credit risk assessment
- Interest rate risk
- Liquidity risk
- Operational risk
- Market risk`,
        duration: 45,
        quizId: 'fin-380-quiz-1',
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
- Used for hedging and speculation

## Key Concepts
- **Exchange Rate**: Price of one currency in terms of another
- **Appreciation/Depreciation**: Increase/Decrease in currency value
- **Foreign Exchange Reserves**: Holdings of foreign currencies by a central bank
- **Balance of Payments**: Record of all economic transactions between residents and the rest of the world
- **Capital Account**: Record of all financial transactions that affect a country's assets and liabilities
- **Current Account**: Record of all economic transactions that affect a country's income and expenditure

## Conclusion
Understanding international financial markets is crucial for making informed investment and business decisions in an increasingly globalized economy.`,
        duration: 40,
        quizId: 'fin-411-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'fin-422',
    courseCode: 'FIN 422',
    title: 'International Banking',
    credits: 3,
    description: 'Focus on multinational banking operations, global markets, and cross-border regulations.',
    academicLevel: 400,
    prerequisites: ['FIN 280', 'FIN 411'],
    concentrations: ['international', 'banking'],
    pathId: 'international',
    modules: [
      {
        id: 'fin-422-1',
        title: 'Global Banking Environment',
        description: 'Understand the international banking landscape and regulatory framework',
        content: `# Global Banking Environment

## Introduction
The global banking environment encompasses the various factors and conditions that influence the operations and activities of banks and financial institutions worldwide. It is essential for finance professionals to understand this environment to navigate the complexities of international finance and banking.

## 1. International Financial Markets
- **Foreign Exchange Market**: The market where currencies are traded. It determines the exchange rate between different currencies.
- **International Money Market**: The market for short-term borrowing and lending in foreign currencies.
- **International Bond Market**: The market for debt securities issued in foreign currencies.
- **International Equity Market**: The market for buying and selling shares of foreign companies.

## 2. Key Players in International Banking
- **Multinational Banks**: Banks that operate in multiple countries, offering a wide range of financial services.
- **Central Banks**: National banks that provide financial and banking services for a country's government and commercial banking system, also responsible for monetary policy.
- **International Organizations**: Such as the International Monetary Fund (IMF) and World Bank, which provide financial assistance and advice to countries.

## 3. Regulatory Environment
- **Basel Accords**: International banking regulations (Basel I, II, and III) that set out the requirements for capital risk, market risk, and operational risk.
- **Dodd-Frank Act**: A US federal law that places regulations on financial institutions to protect consumers and reduce the risk of financial crises.
- **Anti-Money Laundering (AML) Regulations**: Laws and regulations aimed at preventing money laundering activities.

## 4. Risks in International Banking
- **Credit Risk**: The risk of default on a debt that may arise from a borrower failing to make required payments.
- **Market Risk**: The risk of losses in positions arising from movements in market prices.
- **Operational Risk**: The risk of loss from inadequate or failed internal processes, people, and systems, or from external events.
- **Liquidity Risk**: The risk that a bank will not be able to meet its financial obligations as they come due.

## 5. Trends and Challenges
- **Digital Transformation**: The adoption of digital technologies to improve customer experience and operational efficiency.
- **Fintech Disruption**: The rise of financial technology companies that offer innovative solutions and compete with traditional banks.
- **Regulatory Changes**: Ongoing changes in regulations that impact how banks operate internationally.
- **Geopolitical Risks**: Political instability or changes in government policy in countries where the bank operates.

## Conclusion
The global banking environment is complex and constantly evolving. Finance professionals must stay informed about the various factors that can impact banking operations and be prepared to adapt to changes in the regulatory, economic, and technological landscape.`,
        duration: 40,
        quizId: 'fin-422-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'fin-306',
    courseCode: 'FIN 306',
    title: 'Personal Financial Planning',
    credits: 3,
    description: 'Comprehensive financial planning for individuals, including retirement, tax, and estate planning.',
    academicLevel: 300,
    prerequisites: ['FIN 201'],
    concentrations: ['planning', 'personal'],
    pathId: 'personal',
    modules: [
      {
        id: 'fin-306-1',
        title: 'Introduction to Personal Financial Planning',
        description: 'Understand the basics of personal financial planning and wealth management',
        content: `# Introduction to Personal Financial Planning

## What is Personal Financial Planning?
Personal financial planning is the process of managing your finances to achieve personal economic satisfaction. It involves creating a plan to accumulate, preserve, and distribute your wealth over your lifetime.

## Importance of Personal Financial Planning
- Helps you set and achieve financial goals
- Provides a sense of financial security and independence
- Prepares you for unexpected expenses or emergencies
- Aids in retirement planning and ensuring a comfortable retirement
- Assists in effective tax planning and minimizing tax liabilities
- Facilitates estate planning and wealth transfer to heirs

## Key Components of Personal Financial Planning
1. **Goal Setting**: Defining short-term and long-term financial goals.
2. **Budgeting**: Creating a plan for income allocation and expenditure control.
3. **Saving and Investing**: Building wealth through savings accounts, stocks, bonds, mutual funds, etc.
4. **Risk Management**: Protecting assets and income through insurance and other risk management strategies.
5. **Tax Planning**: Minimizing tax liabilities through strategic planning and use of tax-advantaged accounts.
6. **Retirement Planning**: Ensuring sufficient savings and income for a comfortable retirement.
7. **Estate Planning**: Planning for the transfer of assets and wealth to heirs.

## The Financial Planning Process
1. **Establishing and Defining the Client-Planner Relationship**: Understanding the client's needs and expectations.
2. **Gathering Client Data and Financial History**: Collecting relevant financial information from the client.
3. **Analyzing and Evaluating the Client's Financial Status**: Assessing the client's financial situation and identifying gaps or issues.
4. **Developing and Presenting Financial Planning Recommendations**: Creating a comprehensive financial plan with recommendations.
5. **Implementing the Financial Plan**: Putting the recommended actions into effect.
6. **Monitoring and Reviewing the Financial Plan**: Regularly reviewing the plan's performance and making adjustments as needed.

## Conclusion
Personal financial planning is essential for achieving financial security and reaching your financial goals. It is a lifelong process that requires regular review and adjustment to adapt to changing circumstances and objectives.`,
        duration: 40,
        quizId: 'fin-306-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'fin-402',
    courseCode: 'FIN 402',
    title: 'Retirement and Estate Planning',
    credits: 3,
    description: 'Advanced retirement planning strategies and estate planning techniques.',
    academicLevel: 400,
    prerequisites: ['FIN 306'],
    concentrations: ['planning', 'personal'],
    pathId: 'personal',
    modules: [
      {
        id: 'fin-402-1',
        title: 'Retirement Planning Strategies',
        description: 'Explore various strategies for effective retirement planning',
        content: `# Retirement Planning Strategies

## Introduction
Retirement planning is the process of preparing for life after paid work, ensuring you have the necessary income and resources to maintain your desired lifestyle. It involves setting retirement goals, estimating expenses, and creating a plan to accumulate the required funds.

## Importance of Retirement Planning
- Ensures financial independence and security in retirement
- Helps maintain your desired standard of living
- Prepares you for healthcare and long-term care expenses
- Provides a sense of purpose and fulfillment in retirement

## Key Components of Retirement Planning
1. **Setting Retirement Goals**: Determining the lifestyle you want and the associated costs.
2. **Estimating Retirement Expenses**: Projecting future expenses, including housing, healthcare, and leisure activities.
3. **Calculating Retirement Income Needs**: Determining how much income you'll need to cover expenses.
4. **Social Security Benefits**: Understanding and optimizing your Social Security benefits.
5. **Pension Plans**: Evaluating and maximizing pension benefits, if available.
6. **Personal Savings and Investments**: Building a retirement nest egg through savings accounts, IRAs, 401(k)s, and other investment vehicles.
7. **Asset Allocation and Investment Strategies**: Developing an investment strategy that aligns with your retirement goals and risk tolerance.
8. **Withdrawal Strategies**: Planning how and when to withdraw funds from retirement accounts.

## Retirement Accounts and Plans
- **401(k) Plan**: Employer-sponsored retirement savings plan allowing employees to save and invest for retirement on a tax-deferred basis.
- **Traditional IRA**: Individual retirement account allowing individuals to direct pre-tax income towards investments that can grow tax-deferred until retirement withdrawals.
- **Roth IRA**: Individual retirement account allowing individuals to invest after-tax income, with tax-free withdrawals in retirement.
- **Pension Plan**: Employer-sponsored retirement plan that provides a fixed monthly benefit based on salary and years of service.

## Conclusion
Effective retirement planning is crucial for ensuring a secure and fulfilling retirement. It requires careful consideration of your goals, resources, and potential challenges. Regularly reviewing and updating your retirement plan is essential to stay on track and make necessary adjustments as circumstances change.`,
        duration: 40,
        quizId: 'fin-402-quiz-1',
        completed: false
      }
    ]
  }
];

export const concentrations: Concentration[] = [
  {
    id: 'general',
    name: 'General Finance',
    description: 'A broad foundation in financial principles and practices, suitable for students seeking a comprehensive understanding of finance.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 403'],
    electiveCourses: ['FIN 306', 'FIN 402', 'FIN 405', 'FIN 411']
  },
  {
    id: 'corporate',
    name: 'Corporate Finance',
    description: 'Focus on financial management within corporations, including capital structure, investments, and value creation.',
    requiredCourses: ['FIN 201', 'FIN 302', 'FIN 405', 'FIN 407'],
    electiveCourses: ['FIN 403', 'FIN 411', 'FIN 422']
  },
  {
    id: 'investments',
    name: 'Investment Management',
    description: 'Specialization in portfolio management, securities analysis, and investment strategies.',
    requiredCourses: ['FIN 201', 'FIN 403', 'FIN 404', 'FIN 406'],
    electiveCourses: ['FIN 302', 'FIN 405', 'FIN 422']
  },
  {
    id: 'banking',
    name: 'Banking and Financial Services',
    description: 'Focus on banking operations, financial institutions, and financial services management.',
    requiredCourses: ['FIN 201', 'FIN 280', 'FIN 380', 'FIN 480'],
    electiveCourses: ['FIN 302', 'FIN 403', 'FIN 411']
  },
  {
    id: 'planning',
    name: 'Financial Planning',
    description: 'Preparation for careers in personal financial planning, wealth management, and advisory services.',
    requiredCourses: ['FIN 201', 'FIN 306', 'FIN 402', 'FIN 408'],
    electiveCourses: ['FIN 403', 'FIN 405', 'FIN 411']
  }
];

export const financeModules: { [key: string]: Module[] } = {
  'fin-201': [
    {
      id: 'fin-201-1',
      title: 'Introduction to Financial Principles',
      description: 'Understand the fundamentals of finance and financial systems',
      content: `# Introduction to Financial Principles

Finance is the study of money management and the process of acquiring needed funds. This module covers the basic principles that form the foundation of finance.

## What is Finance?

Finance encompasses:
- Management of money and other assets
- The process of raising capital
- Investment decision-making
- The time value of money

## Three Main Areas of Finance

1. **Personal Finance**: Managing individual or family financial decisions including budgeting, savings, investments, and retirement planning.

2. **Corporate Finance**: Focuses on how businesses fund their operations and maximize shareholder value through investment and financing decisions.

3. **Public Finance**: Examines government revenue, expenditure, and debt management.

## Key Finance Concepts

### Risk and Return
- Higher risk investments typically offer higher potential returns
- Diversification helps manage risk
- Risk can be systematic (market-wide) or unsystematic (company-specific)

### Financial Markets
- Places where buyers and sellers exchange financial assets
- Examples: stock markets, bond markets, money markets, derivatives markets
- Provide liquidity and price discovery

### Financial Institutions
- Organizations that facilitate financial transactions
- Examples: banks, credit unions, insurance companies, investment firms

## Financial Statements

The three main financial statements:

1. **Balance Sheet**: Shows a company's assets, liabilities, and equity at a specific point in time.
2. **Income Statement**: Reports revenues and expenses over a period of time.
3. **Cash Flow Statement**: Tracks the flow of cash in and out of a business.

## Finance in Organizations

Finance plays a critical role in businesses through:
- Capital budgeting (evaluating investment opportunities)
- Capital structure decisions (debt vs. equity financing)
- Working capital management
- Dividend policy
- Financial planning and forecasting`,
      duration: 30,
      quizId: 'fin-201-quiz-1',
      completed: false
    },
    {
      id: 'fin-201-2',
      title: 'Time Value of Money',
      description: 'Understand the concepts of present value and future value',
      content: `# Time Value of Money

The time value of money is one of the most fundamental concepts in finance. This module explores how money's value changes over time.

## Core Principle

A dollar today is worth more than a dollar in the future because:
- Money can be invested to earn returns
- Inflation erodes purchasing power over time
- Future payments have uncertainty

## Key Formulas

### Future Value (FV)
The value of a present amount at a specified date in the future.

FV = PV × (1 + r)^n

Where:
- PV = Present Value
- r = Interest rate per period
- n = Number of periods

### Present Value (PV)
The current value of a future amount.

PV = FV ÷ (1 + r)^n

### Compound Interest
Interest earned on both the principal and previously earned interest.

FV = P × (1 + r)^n

Where:
- P = Principal
- r = Interest rate per period
- n = Number of periods

### Simple Interest
Interest earned only on the original principal.

FV = P × (1 + r × n)

## Applications

### Annuities
An annuity is a series of equal payments or receipts that occur at evenly spaced intervals.

Present Value of an Ordinary Annuity:
PVA = PMT × [1 - (1 + r)^-n] ÷ r

Future Value of an Ordinary Annuity:
FVA = PMT × [(1 + r)^n - 1] ÷ r

### Perpetuities
A perpetuity is a type of annuity that pays a fixed payment forever.

PV of a Perpetuity = PMT ÷ r

## Real-World Applications

- Loan amortization schedules
- Bond valuation
- Stock valuation using dividend discount models
- Retirement planning
- Corporate investment decisions (NPV, IRR)

## Rule of 72

A quick way to estimate how long it will take for an investment to double:

Years to double = 72 ÷ Interest Rate

Example: At 8% interest, money doubles in approximately 9 years (72 ÷ 8 = 9)`,
      duration: 35,
      quizId: 'fin-201-quiz-2',
      completed: false
    },
    {
      id: 'fin-201-3',
      title: 'Financial Markets and Institutions',
      description: 'Overview of financial markets, securities, and financial intermediaries',
      content: `# Financial Markets and Institutions

This module explores the structure and function of financial markets and institutions in the global economy.

## Financial Markets

Financial markets facilitate the exchange of financial assets between buyers and sellers.

### Types of Financial Markets

1. **Money Markets**: For short-term debt instruments (less than one year)
   - Treasury bills
   - Commercial paper
   - Certificates of deposit
   - Repurchase agreements

2. **Capital Markets**: For long-term securities (greater than one year)
   - Stock markets
   - Bond markets
   - Mortgage markets

3. **Derivatives Markets**: For derivatives contracts
   - Options
   - Futures
   - Swaps
   - Forwards

4. **Foreign Exchange Markets**: For trading currencies

### Market Efficiency

The Efficient Market Hypothesis (EMH) states that asset prices reflect all available information:
- Weak form: Prices reflect all historical information
- Semi-strong form: Prices reflect all publicly available information
- Strong form: Prices reflect all information, including insider information

## Financial Institutions

Financial institutions act as intermediaries between savers and borrowers.

### Commercial Banks
- Accept deposits and make loans
- Provide payment services
- Manage risk
- Create money through fractional reserve banking

### Investment Banks
- Underwrite securities
- Facilitate mergers and acquisitions
- Provide advisory services
- Market making and trading

### Insurance Companies
- Provide risk protection
- Collect premiums and pay claims
- Significant institutional investors

### Mutual Funds and ETFs
- Pool investor money to purchase diversified portfolios
- Provide professional management
- Offer liquidity and diversification

### Pension Funds
- Manage retirement assets
- Long-term investment horizon
- Significant institutional investors

## Regulation of Financial Markets

Financial markets are regulated to protect investors and ensure stability:

- Securities and Exchange Commission (SEC)
- Federal Reserve System
- Office of the Comptroller of the Currency (OCC)
- Federal Deposit Insurance Corporation (FDIC)
- Financial Industry Regulatory Authority (FINRA)

## Globalization of Financial Markets

Financial markets have become increasingly integrated globally:
- 24-hour trading
- Cross-border capital flows
- International financial institutions
- Regulatory cooperation and challenges`,
      duration: 30,
      quizId: '',
      completed: false
    }
  ],
  'fin-302': [
    // Module 1: Capital Structure and Cost of Capital
    {
      id: 'fin-302-1',
      title: 'Capital Structure and Cost of Capital',
      description: 'Understanding how firms choose between debt and equity financing, and how to calculate the cost of capital.',
      content: `# Capital Structure and Cost of Capital

## Introduction to Capital Structure

Capital structure refers to the specific mix of debt and equity a company uses to finance its overall operations and growth. Making optimal capital structure decisions is crucial for maximizing firm value and minimizing the cost of capital.

## The Modigliani-Miller Theorems

### Proposition I (without taxes)
In perfect capital markets with no taxes, bankruptcy costs, agency costs, or asymmetric information, a firm's value is unaffected by how it is financed. This means the value of a levered firm equals the value of an unlevered firm.

### Proposition I (with taxes)
When corporate taxes are introduced, the value of a levered firm equals the value of an unlevered firm plus the present value of the tax shield from debt. This suggests that firms should use 100% debt financing.

### Proposition II
The cost of equity increases with the firm's debt-equity ratio. This reflects the higher financial risk borne by equity holders as leverage increases.

## Factors Affecting Capital Structure Decisions

1. **Tax Benefits of Debt**: Interest payments are tax-deductible, creating a "tax shield" that increases firm value.

2. **Financial Distress Costs**: As debt increases, so does the probability of financial distress and bankruptcy, which can be costly.

3. **Agency Costs**: 
   - Between shareholders and managers
   - Between shareholders and bondholders

4. **Asymmetric Information**: Managers have more information about the firm's prospects than outside investors.

5. **Market Timing**: Firms may issue equity when they believe their shares are overvalued.

## Optimal Capital Structure Theories

### Trade-off Theory
Firms balance the tax benefits of debt against the costs of financial distress to determine an optimal capital structure.

![Trade-off Theory](https://example.com/trade-off-theory.png)

### Pecking Order Theory
Due to information asymmetry, firms prefer internal financing over external financing, and debt over equity when external financing is required.

### Market Timing Theory
Firms issue equity when market conditions are favorable (i.e., when stock prices are high).

## Cost of Capital

### Weighted Average Cost of Capital (WACC)
WACC represents the average rate of return a company must earn on its existing assets to satisfy all security holders.

\\[ WACC = \\frac{E}{V} \\times R_e + \\frac{D}{V} \\times R_d \\times (1-T_c) \\]

Where:
- E = Market value of equity
- D = Market value of debt
- V = E + D
- Re = Cost of equity
- Rd = Cost of debt
- Tc = Corporate tax rate

### Cost of Debt (Rd)
The effective rate a company pays on its debt, adjusted for tax benefits.

\\[ R_d\\text{ (after-tax)} = R_d\\text{ (before-tax)} \\times (1 - T_c) \\]

### Cost of Equity (Re)
Can be estimated using the Capital Asset Pricing Model (CAPM):

\\[ R_e = R_f + \\beta (R_m - R_f) \\]

Where:
- Rf = Risk-free rate
- β = Beta (systematic risk)
- Rm = Expected market return
- (Rm - Rf) = Market risk premium

## Example: Calculating WACC

Consider a firm with the following characteristics:
- Market value of equity (E) = $600 million
- Market value of debt (D) = $400 million
- Cost of equity (Re) = 12%
- Before-tax cost of debt (Rd) = 6%
- Corporate tax rate (Tc) = 25%

\\[ WACC = \\frac{600}{1000} \\times 12\\% + \\frac{400}{1000} \\times 6\\% \\times (1 - 0.25) \\]
\\[ WACC = 60\\% \\times 12\\% + 40\\% \\times 6\\% \\times 0.75 \\]
\\[ WACC = 7.2\\% + 1.8\\% = 9\\% \\]

## Capital Structure in Practice

Real-world capital structures vary significantly across industries:
- Technology firms often use little debt
- Utilities and manufacturing firms often use more debt
- Financial firms typically have high leverage ratios

## Key Takeaways

1. No universally optimal capital structure exists for all firms
2. Optimal capital structure depends on firm-specific factors and industry characteristics
3. Capital structure decisions should aim to minimize the cost of capital
4. The benefits of financial leverage must be weighed against financial distress costs`,
      duration: 60,
      quizId: 'fin-302-quiz-1',
      completed: false
    },
    
    // Module 2: Capital Budgeting Techniques
    {
      id: 'fin-302-2',
      title: 'Capital Budgeting Techniques',
      description: 'Learn how to evaluate long-term investment projects using various capital budgeting methods.',
      content: `# Capital Budgeting Techniques

## Introduction to Capital Budgeting

Capital budgeting is the process companies use to evaluate potential major investments or expenditures. These investments might include new plants, machinery, products, or even acquisitions. The goal is to identify which projects will create the most value for shareholders.

## The Capital Budgeting Process

1. **Generate investment ideas** aligned with corporate strategy
2. **Analyze project proposals** for viability
3. **Evaluate projects** using appropriate methods
4. **Select the best projects** based on analysis
5. **Implement selected projects**
6. **Monitor and review** project performance

## Estimating Cash Flows

When evaluating projects, we focus on **incremental cash flows**:
- Cash flows that occur only if the project is undertaken
- Include all indirect effects (cannibalization, working capital changes)
- Exclude sunk costs
- Include opportunity costs
- Consider after-tax cash flows

### Components of Project Cash Flows:
1. **Initial investment** (t=0)
2. **Operating cash flows** during project life
3. **Terminal cash flow** at project end

## Capital Budgeting Techniques

### 1. Net Present Value (NPV)

NPV is the difference between the present value of cash inflows and outflows.

\\[ NPV = \\sum_{t=0}^{n} \\frac{CF_t}{(1+r)^t} \\]

Where:
- CFt = Cash flow at time t
- r = Discount rate (usually WACC)
- n = Project lifetime

**Decision rule**: Accept projects with positive NPV; reject those with negative NPV.

### 2. Internal Rate of Return (IRR)

IRR is the discount rate that makes the NPV equal to zero.

\\[ 0 = \\sum_{t=0}^{n} \\frac{CF_t}{(1+IRR)^t} \\]

**Decision rule**: Accept projects with IRR > required return; reject those with IRR < required return.

### 3. Payback Period

The payback period is the time required to recover the initial investment.

**Decision rule**: Accept projects with payback periods less than some predetermined threshold.

### 4. Discounted Payback Period

Similar to the payback period, but using the present value of cash flows.

**Decision rule**: Accept projects with discounted payback periods less than some predetermined threshold.

### 5. Profitability Index (PI)

PI is the ratio of the present value of future cash flows to the initial investment.

\\[ PI = \\frac{PV\\text{ of future cash flows}}{Initial\\text{ investment}} \\]

**Decision rule**: Accept projects with PI > 1; reject those with PI < 1.

## Comparing Capital Budgeting Techniques

| Method | Advantages | Disadvantages |
|--------|------------|---------------|
| NPV | Directly measures value creation; Considers time value of money; Considers all cash flows | Requires accurate estimation of WACC |
| IRR | Easy to understand and communicate; Considers time value of money | Multiple IRRs possible; Inappropriate for mutually exclusive projects or non-conventional cash flows |
| Payback Period | Simple; Focuses on liquidity and risk | Ignores time value of money; Ignores cash flows after payback period |
| Profitability Index | Good for capital rationing; Considers time value of money | May lead to incorrect decisions with mutually exclusive projects |

## Real-World Complications

### Risk Assessment
- **Sensitivity analysis**: How does NPV change when inputs change?
- **Scenario analysis**: Evaluate projects under different scenarios
- **Monte Carlo simulation**: Simulate thousands of possible outcomes
- **Real options analysis**: Value the flexibility inherent in some projects

### Capital Rationing
When a company has more positive-NPV projects than it can fund, it must:
1. Rank projects by PI
2. Select projects starting with highest PI until budget is exhausted

## Example: NPV Calculation

Consider a project with the following cash flows:
- Initial investment: $100,000
- Year 1 cash flow: $40,000
- Year 2 cash flow: $50,000
- Year 3 cash flow: $60,000
- Discount rate: 10%

\\[ NPV = -\\$100,000 + \\frac{\\$40,000}{(1+0.10)^1} + \\frac{\\$50,000}{(1+0.10)^2} + \\frac{\\$60,000}{(1+0.10)^3} \\]
\\[ NPV = -\\$100,000 + \\$36,364 + \\$41,322 + \\$45,079 \\]
\\[ NPV = \\$22,765 \\]

Since NPV > 0, the project should be accepted.

## Key Takeaways

1. Focus on cash flows, not accounting profits
2. Consider only incremental cash flows
3. Account for time value of money
4. NPV is theoretically the best method, but multiple methods provide different insights
5. Consider risk through sensitivity and scenario analysis
6. Real options can significantly impact project value`,
      duration: 55,
      quizId: 'fin-302-quiz-2',
      completed: false
    },
    
    // Module 3: Working Capital Management
    {
      id: 'fin-302-3',
      title: 'Working Capital Management',
      description: 'Learn strategies for effectively managing a company\'s current assets and liabilities.',
      content: `# Working Capital Management

## Introduction to Working Capital

Working capital management involves optimizing a company's current assets and current liabilities to ensure operational efficiency, sufficient liquidity, and maximum profitability.

### Key Components
- **Working Capital** = Current Assets - Current Liabilities
- **Net Working Capital** = Current Assets - Current Liabilities
- **Working Capital Cycle** = Inventory Conversion Period + Receivables Collection Period - Payables Payment Period

## The Working Capital Cycle

![Working Capital Cycle](/lovable-uploads/working-capital-cycle.png)

1. **Cash** is used to purchase raw materials
2. Raw materials become **inventory**
3. Inventory is sold, creating **accounts receivable**
4. Accounts receivable are collected, converting back to **cash**

The goal is to minimize the time it takes to complete this cycle.

## Cash Management

### Objectives
1. Meet cash requirements for operations
2. Minimize idle cash balances
3. Invest excess cash efficiently

### Cash Management Techniques
- **Cash forecasting**: Project future cash inflows and outflows
- **Cash concentration**: Centralize cash management
- **Zero-balance accounts**: Minimize idle cash in multiple accounts
- **Cash pooling**: Offset cash deficits with surpluses across business units

### Optimal Cash Balance Models
1. **Baumol Model**: Treats cash like inventory, balancing holding costs vs. transaction costs
2. **Miller-Orr Model**: Accounts for uncertainty in cash flows with upper and lower control limits

## Inventory Management

### Objectives
1. Ensure adequate inventory for production and sales
2. Minimize inventory holding costs
3. Optimize order quantities and timing

### Inventory Management Techniques
- **Economic Order Quantity (EOQ)**: Minimizes the total of ordering and holding costs

\\[ EOQ = \\sqrt{\\frac{2DS}{H}} \\]

Where:
- D = Annual demand
- S = Order cost
- H = Annual holding cost per unit

- **Just-in-Time (JIT)**: Minimize inventory by receiving goods only as needed
- **ABC Analysis**: Categorize inventory by importance (A = high value, B = medium value, C = low value)
- **Safety Stock**: Extra inventory to guard against uncertainties

## Accounts Receivable Management

### Objectives
1. Attract and retain customers through credit policies
2. Minimize bad debt losses
3. Maximize cash flow by minimizing collection period

### Accounts Receivable Management Techniques
- **Credit policy development**: Establish standards for extending credit
- **Credit evaluation**: Assess customer creditworthiness (5 C's: Character, Capacity, Capital, Collateral, Conditions)
- **Collection policy**: Establish procedures for collecting payments
- **Aging schedules**: Monitor outstanding receivables by age
- **Receivables turnover ratio**: Measure efficiency of credit management

### Factors in Credit Decisions
- Lost sales from refusing credit
- Collection expenses
- Bad debt losses
- Interest income foregone

## Accounts Payable Management

### Objectives
1. Take advantage of credit terms without damaging supplier relationships
2. Optimize payment timing

### Accounts Payable Management Techniques
- **Evaluate early payment discounts**
- **Establish payment policies**
- **Negotiate favorable credit terms**
- **Supplier concentration vs. diversification**

## Working Capital Financing

### Short-term Financing Options
1. **Trade credit**: Credit extended by suppliers
2. **Commercial paper**: Short-term unsecured promissory notes
3. **Bank loans**: Working capital loans, lines of credit, revolving credit
4. **Factoring**: Selling accounts receivable
5. **Inventory financing**: Using inventory as collateral

### Working Capital Financing Strategies
1. **Matching approach**: Match asset and liability maturities
2. **Conservative approach**: Finance some short-term needs with long-term capital
3. **Aggressive approach**: Finance some long-term needs with short-term capital

## Working Capital Ratios and Metrics

### Liquidity Ratios
- **Current Ratio** = Current Assets / Current Liabilities
- **Quick Ratio (Acid-Test Ratio)** = (Current Assets - Inventory) / Current Liabilities
- **Cash Ratio** = Cash and Cash Equivalents / Current Liabilities

### Efficiency Ratios
- **Inventory Turnover** = Cost of Goods Sold / Average Inventory
- **Days Inventory Outstanding (DIO)** = 365 / Inventory Turnover
- **Receivables Turnover** = Sales / Average Accounts Receivable
- **Days Sales Outstanding (DSO)** = 365 / Receivables Turnover
- **Payables Turnover** = Cost of Goods Sold / Average Accounts Payable
- **Days Payables Outstanding (DPO)** = 365 / Payables Turnover
- **Cash Conversion Cycle** = DIO + DSO - DPO

## Examples of Working Capital Management

### Example 1: Cash Conversion Cycle Improvement
A manufacturing company has the following metrics:
- Days Inventory Outstanding: 60 days
- Days Sales Outstanding: 45 days
- Days Payables Outstanding: 30 days

Current Cash Conversion Cycle = 60 + 45 - 30 = 75 days

By implementing JIT inventory, negotiating better supplier terms, and improving collections, the company improves to:
- Days Inventory Outstanding: 45 days
- Days Sales Outstanding: 35 days
- Days Payables Outstanding: 40 days

New Cash Conversion Cycle = 45 + 35 - 40 = 40 days

This 35-day improvement reduces working capital needs and frees up cash.

### Example 2: Evaluating Early Payment Discounts
A supplier offers terms of 2/10, net 30 (2% discount if paid within 10 days, full amount due in 30 days).

Annualized cost of foregoing the discount:
\\[ \\text{Annualized cost} = \\frac{\\text{Discount %}}{1 - \\text{Discount %}} \\times \\frac{365}{\\text{Full payment days} - \\text{Discount days}} \\]

\\[ \\text{Annualized cost} = \\frac{2\\%}{98\\%} \\times \\frac{365}{30 - 10} = \\frac{0.02}{0.98} \\times \\frac{365}{20} \\approx 37.2\\% \\]

Since 37.2% exceeds the company's cost of short-term borrowing, the company should take the discount.

## Key Takeaways

1. Efficient working capital management increases firm value by reducing financing needs
2. The cash conversion cycle is a key metric for measuring working capital efficiency
3. Working capital policies involve tradeoffs between liquidity and profitability
4. Optimizing inventory, receivables, and payables can significantly improve cash flow
5. Working capital needs vary by industry and business model`,
      duration: 50,
      quizId: 'fin-302-quiz-3',
      completed: false
    },
    
    // Module 4: Dividend Policy and Corporate Governance
    {
      id: 'fin-302-4',
      title: 'Dividend Policy and Corporate Governance',
      description: 'Examine how companies make decisions about dividend payments and corporate governance structures.',
      content: `# Dividend Policy and Corporate Governance

## Part I: Dividend Policy

### Introduction to Dividend Policy

Dividend policy determines how much of a company's earnings should be paid to shareholders versus retained for reinvestment. This decision directly affects:
- Company growth prospects
- Capital structure
- Stock price
- Shareholder wealth

### Dividend Theories

#### Dividend Irrelevance Theory (Miller & Modigliani)
In perfect capital markets with no taxes or transaction costs, dividend policy doesn't affect firm value.

#### Bird-in-the-Hand Theory (Gordon & Lintner)
Investors prefer the certainty of dividends to the uncertainty of future capital gains, making high-dividend stocks more valuable.

#### Tax Preference Theory
Due to typically lower tax rates on capital gains compared to dividends, investors may prefer companies that retain earnings over those that pay dividends.

#### Signaling Theory
Dividend changes signal management's views about future prospects:
- Dividend increases suggest positive outlook
- Dividend decreases suggest negative outlook

#### Clientele Effect
Different investors prefer different dividend policies:
- Retirees often prefer high dividends for income
- High-income investors may prefer low dividends for tax reasons
- Institutional investors may have specific dividend requirements

### Types of Dividend Policies

#### Stable Dividend Policy
Paying a fixed dividend per share regardless of earnings fluctuations. Most common approach.

#### Constant Payout Ratio Policy
Paying a constant percentage of earnings as dividends. Results in fluctuating dividend amounts.

#### Residual Dividend Policy
Paying dividends only after funding all positive-NPV projects. Results in highly variable dividends.

#### Progressive Dividend Policy
Gradually increasing dividend payments over time.

### Dividend Metrics

#### Dividend Yield
\\[ \\text{Dividend Yield} = \\frac{\\text{Annual Dividends per Share}}{\\text{Current Share Price}} \\]

#### Dividend Payout Ratio
\\[ \\text{Payout Ratio} = \\frac{\\text{Dividends}}{\\text{Net Income}} \\]

#### Dividend Coverage Ratio
\\[ \\text{Dividend Coverage} = \\frac{\\text{Net Income}}{\\text{Dividends}} \\]

### Factors Influencing Dividend Policy

1. **Legal Restrictions**: Companies cannot pay dividends if they are insolvent
2. **Contractual Restrictions**: Loan covenants may limit dividend payments
3. **Growth Opportunities**: High-growth firms typically retain more earnings
4. **Shareholder Preferences**: Different investor groups prefer different policies
5. **Tax Considerations**: Dividend and capital gains tax rates affect optimal policy
6. **Stability of Earnings**: Firms with stable earnings can commit to higher dividends
7. **Access to Capital Markets**: Firms with easy market access can pay more dividends
8. **Industry Norms**: Dividend policies often cluster by industry

### Dividend Alternatives

#### Share Repurchases
Companies buy back their own shares, reducing shares outstanding and typically increasing stock price.

Advantages:
- Tax efficiency (shareholders only pay taxes if they sell)
- Flexibility (easier to adjust than dividends)
- Signals undervaluation
- Offsets dilution from employee stock options

#### Stock Dividends and Splits
- **Stock Dividend**: Distribution of additional shares to existing shareholders
- **Stock Split**: Increase in shares outstanding with proportional decrease in share price

Unlike cash dividends, these don't transfer wealth to shareholders but may improve stock liquidity.

## Part II: Corporate Governance

### Introduction to Corporate Governance

Corporate governance is the system of rules, practices, and processes by which companies are directed and controlled. It involves balancing the interests of stakeholders including shareholders, management, customers, suppliers, financiers, government, and the community.

### Agency Theory

Agency theory addresses conflicts of interest between principals (shareholders) and agents (managers):
- Information asymmetry
- Risk appetite differences
- Self-interested behavior

### Key Corporate Governance Mechanisms

#### Internal Mechanisms

1. **Board of Directors**
   - Structure (size, composition, independence)
   - Responsibilities (oversight, strategy, succession planning)
   - Committees (audit, compensation, nomination, governance)

2. **Ownership Structure**
   - Concentrated vs. dispersed ownership
   - Institutional ownership
   - Insider ownership

3. **Executive Compensation**
   - Salary, bonuses, stock options, restricted stock
   - Pay-for-performance
   - Long-term vs. short-term incentives

4. **Internal Controls and Auditing**
   - Financial reporting
   - Risk management
   - Compliance

#### External Mechanisms

1. **Market for Corporate Control**
   - Takeovers and mergers
   - Proxy contests

2. **Legal and Regulatory Framework**
   - Sarbanes-Oxley Act
   - Dodd-Frank Act
   - Stock exchange listing requirements

3. **Product Market Competition**
   - Forces efficiency and good governance

4. **Labor Market for Executives**
   - Reputation concerns

### Corporate Governance Best Practices

1. **Board Independence**
   - Majority of independent directors
   - Separation of CEO and Chair roles
   - Regular executive sessions

2. **Transparency and Disclosure**
   - Timely and accurate financial reporting
   - Risk disclosure
   - Executive compensation disclosure

3. **Shareholder Rights**
   - One share, one vote
   - Proxy access
   - Say-on-pay votes

4. **Ethical Culture**
   - Code of ethics
   - Whistleblower protection
   - Tone at the top

### Corporate Governance and Firm Performance

Research indicates that good governance is associated with:
- Higher firm valuations
- Lower cost of capital
- Better operational performance
- Reduced fraud risk
- Greater resilience during crises

### Corporate Governance Failures and Case Studies

#### Enron (2001)
- Complex financial engineering
- Accounting fraud
- Board oversight failure
- Conflicts of interest

#### WorldCom (2002)
- Accounting fraud
- Weak internal controls
- Excessive CEO power

#### Lehman Brothers (2008)
- Excessive risk-taking
- Inadequate risk management
- Insufficient board oversight

## The Connection Between Dividend Policy and Corporate Governance

Strong corporate governance typically leads to more shareholder-friendly dividend policies:
- More transparent dividend decisions
- Better alignment with shareholder interests
- More stable and predictable dividends
- Appropriate balance between reinvestment and distributions

## Key Takeaways

### Dividend Policy
1. No universally optimal dividend policy exists
2. Dividend policy should consider tax effects, signaling, and clientele effects
3. Stability of dividends often matters more than amount
4. Share repurchases have become increasingly important as a distribution method

### Corporate Governance
1. Good governance helps align management and shareholder interests
2. Boards of directors play a critical role in governance
3. Transparency and accountability are essential elements
4. Governance systems vary internationally but are converging on best practices`,
      duration: 65,
      quizId: 'fin-302-quiz-4',
      completed: false
    },
    
    // Module 5: Mergers and Acquisitions
    {
      id: 'fin-302-5',
      title: 'Mergers and Acquisitions',
      description: 'Explore the financial aspects of corporate mergers, acquisitions, and restructuring.',
      content: `# Mergers and Acquisitions

## Introduction to Mergers and Acquisitions

Mergers and acquisitions (M&A) involve the consolidation of companies or assets through various financial transactions. These strategic decisions can create substantial changes in company ownership, operations, and market position.

### Key Definitions

- **Merger**: Combination of two companies to form a new company
- **Acquisition**: Purchase of one company by another where no new company is formed
- **Consolidation**: Combination of two or more companies to form an entirely new company
- **Tender Offer**: Public offer to purchase shares directly from shareholders
- **Asset Acquisition**: Purchase of assets rather than stock
- **Management Buyout (MBO)**: Management team purchases the company from shareholders

## Types of M&A Transactions

### Based on Business Relationship

1. **Horizontal Integration**: Combination of companies in the same industry and stage of production
   - Example: Exxon and Mobil

2. **Vertical Integration**: Combination of companies at different stages of the same production chain
   - **Forward Integration**: Acquiring customers
   - **Backward Integration**: Acquiring suppliers
   - Example: Amazon acquiring Whole Foods

3. **Conglomerate**: Combination of companies in unrelated business activities
   - **Pure Conglomerate**: Completely unrelated businesses
   - **Concentric**: Related by technology, production processes, or markets
   - Example: General Electric's diverse business units

### Based on Financing Method

1. **Cash Deal**: Target shareholders receive cash
2. **Stock Deal**: Target shareholders receive acquirer's stock
3. **Mixed/Hybrid Deal**: Combination of cash and stock
4. **Leveraged Buyout (LBO)**: Acquisition primarily financed with debt

## Motivations for M&A

### Value Creation Through Synergies

1. **Operating Synergies**
   - Economies of scale
   - Economies of scope
   - Revenue enhancement
   - Cost reduction

2. **Financial Synergies**
   - Tax benefits
   - Debt capacity
   - Diversification
   - Cash utilization

3. **Strategic Benefits**
   - Market power
   - Eliminating competition
   - Geographic expansion
   - Acquiring technology or talent
   - Entering new markets

### Other Motivations

1. **Managerial Motives**
   - Empire building
   - Diversification of personal risk
   - Hubris (overconfidence)

2. **Market Timing**
   - Using overvalued stock as currency
   - Taking advantage of undervaluation in targets

## The M&A Process

### Pre-Acquisition Phase

1. **Strategic Planning**
   - Identify acquisition criteria
   - Industry analysis
   - Target screening

2. **Target Selection**
   - Financial analysis
   - Strategic fit assessment
   - Initial valuation

3. **Initial Approach**
   - Letter of intent
   - Confidentiality agreement
   - Preliminary discussions

### Due Diligence Phase

1. **Financial Due Diligence**
   - Audited financial statements
   - Financial projections
   - Quality of earnings analysis

2. **Operational Due Diligence**
   - Facilities assessment
   - Customer and supplier relationships
   - IT systems

3. **Legal Due Diligence**
   - Contracts review
   - Litigation analysis
   - Regulatory compliance

4. **Human Resources Due Diligence**
   - Key talent identification
   - Compensation structures
   - Cultural assessment

### Transaction Structuring

1. **Valuation and Pricing**
2. **Payment Method Determination**
3. **Tax Structuring**
4. **Legal Structure Design**
5. **Financing Arrangements**

### Post-Acquisition Integration

1. **Integration Planning**
   - Day 1 readiness
   - 100-day plan
   - Long-term integration roadmap

2. **Implementation**
   - Leadership and governance
   - Organizational restructuring
   - Systems integration
   - Cultural integration

3. **Performance Monitoring**
   - Synergy tracking
   - Integration milestones
   - Financial performance

## Valuation Methods in M&A

### Comparative Methods

1. **Comparable Company Analysis**
   - P/E ratio
   - EV/EBITDA multiple
   - EV/Sales multiple

2. **Precedent Transaction Analysis**
   - Control premium consideration
   - Similar transaction multiples

### Intrinsic Valuation Methods

1. **Discounted Cash Flow (DCF)**
   - Projection of future cash flows
   - Terminal value calculation
   - Discount rate determination

2. **Adjusted Present Value (APV)**
   - Base-case value as if all-equity financed
   - Add present value of financing side effects

3. **Leveraged Buyout (LBO) Analysis**
   - Modeling debt paydown
   - Exit multiple assumptions
   - IRR calculations

### Synergy Valuation

1. **Revenue Synergies**
   - Cross-selling opportunities
   - Pricing power
   - Market expansion

2. **Cost Synergies**
   - Overhead reduction
   - Operational efficiencies
   - Supply chain optimization

## Deal Structuring Considerations

### Form of Acquisition

1. **Stock Purchase**
   - Acquires target company stock
   - All assets and liabilities transfer
   - Requires shareholder approval

2. **Asset Purchase**
   - Selectively acquires assets
   - Can leave liabilities behind
   - More complex but more flexible

3. **Merger**
   - Statutory combination
   - Universal succession of assets and liabilities
   - Typically requires shareholder approval

### Tax Considerations

1. **Taxable vs. Tax-Free Transactions**
   - Stock vs. cash consideration
   - Qualification for tax-free reorganization

2. **Basis Step-Up**
   - Depreciable/amortizable basis
   - Section 338 elections

3. **NOL Utilization**
   - Section 382 limitations
   - Structuring to preserve tax assets

### Legal and Regulatory Considerations

1. **Antitrust Review**
   - Hart-Scott-Rodino filing requirements
   - Competitive impact analysis
   - Potential remedies

2. **Securities Laws**
   - Disclosure requirements
   - Insider trading concerns
   - Proxy solicitation rules

3. **Corporate Governance**
   - Shareholder approval requirements
   - Board fiduciary duties
   - Business judgment rule

## Hostile Takeovers and Defenses

### Hostile Takeover Mechanisms

1. **Tender Offer**
   - Direct offer to shareholders
   - Premium over market price
   - Bypass management/board

2. **Proxy Contest**
   - Solicit shareholder votes
   - Replace board members
   - Change corporate policies

### Takeover Defenses

1. **Preventive Defenses**
   - Poison pill (shareholder rights plan)
   - Staggered board
   - Supermajority voting provisions
   - Dual-class stock structure

2. **Active Defenses**
   - White knight (friendly acquirer)
   - White squire (friendly investor)
   - Pac-Man defense (target tries to acquire bidder)
   - Litigation
   - Share repurchase

## M&A Performance and Success Factors

### Empirical Evidence on Returns

1. **Target Shareholders**
   - Typically receive 20-30% premium
   - Capture most of the immediate value creation

2. **Acquirer Shareholders**
   - Often experience negative or zero returns
   - Long-term performance frequently disappoints

3. **Combined Entity**
   - Modest positive combined returns
   - Significant variation in outcomes

### Success Factors

1. **Strategic Fit**
   - Clear strategic rationale
   - Realistic synergy estimates
   - Complementary capabilities

2. **Cultural Compatibility**
   - Similar values and working styles
   - Retention of key talent
   - Effective communication

3. **Integration Execution**
   - Detailed integration planning
   - Dedicated integration team
   - Clear governance and decision rights

4. **Appropriate Valuation**
   - Disciplined pricing
   - Conservative synergy estimates
   - Flexible deal structure

## Case Study: Disney's Acquisition of Pixar (2006)

### Transaction Details
- Disney acquired Pixar for $7.4 billion in an all-stock transaction
- Pixar shareholders received 2.3 Disney shares for each Pixar share
- Steve Jobs became Disney's largest individual shareholder

### Strategic Rationale
- Disney gained Pixar's computer animation technology and creative talent
- Pixar gained access to Disney's distribution network and theme parks
- Cultural preservation was a key consideration

### Outcome
- Highly successful integration
- Multiple successful Pixar films under Disney ownership
- Technology and creativity infused throughout Disney animation

## Key Takeaways

1. M&A can create value through synergies but requires careful planning and execution
2. Valuation should incorporate multiple methodologies and conservative assumptions
3. Transaction structure significantly impacts tax, legal, and financial outcomes
4. Integration planning is critical to realizing projected synergies
5. Cultural fit is often the difference between success and failure in M&A
6. The most successful acquirers have disciplined M&A strategies and processes`,
      duration: 70,
      quizId: 'fin-302-quiz-5',
      completed: false
    },
    
    // Module 6: International Corporate Finance
    {
      id: 'fin-302-6',
      title: 'International Corporate Finance',
      description: 'Understand how multinational corporations manage financial decisions across borders.',
      content: `# International Corporate Finance

## Introduction to International Corporate Finance

International corporate finance encompasses the financial management decisions made by multinational corporations (MNCs) operating across borders. It extends domestic financial management principles to the global arena, addressing additional complexities related to currency risk, political risk, market differences, and regulatory environments.

## The Multinational Corporation

### Definition and Characteristics

A multinational corporation (MNC) conducts significant business operations in multiple countries through foreign direct investment. MNCs typically:
- Generate revenue from multiple countries
- Maintain production facilities internationally
- Employ a global workforce
- Make capital budgeting decisions across borders
- Access international capital markets

### Advantages of Multinational Operations

1. **Market Expansion**: Access to larger customer bases
2. **Resource Access**: Utilization of global resources (labor, materials, technology)
3. **Risk Diversification**: Reduced exposure to single-country economic cycles
4. **Tax Optimization**: Strategic use of international tax differences
5. **Knowledge Transfer**: Acquisition and sharing of global knowledge

### Additional Complexities

1. **Exchange Rate Risk**: Exposure to currency fluctuations
2. **Political Risk**: Vulnerability to government actions and instability
3. **Cultural Differences**: Impact on management practices and marketing
4. **Regulatory Compliance**: Multiple and sometimes conflicting rules
5. **Information Asymmetry**: Less information available about foreign markets

## The International Financial Environment

### Foreign Exchange Markets

#### Key Components
- **Spot Market**: Immediate exchange of currencies
- **Forward Market**: Agreement to exchange currencies at a future date
- **Swap Market**: Simultaneous spot and forward transactions
- **Options Market**: Right but not obligation to exchange currencies

#### Exchange Rate Determinants
1. **Inflation Rates**: Higher inflation tends to weaken currency
2. **Interest Rates**: Higher rates tend to strengthen currency
3. **Current Account Balance**: Deficits tend to weaken currency
4. **Public Debt**: Higher debt tends to weaken currency
5. **Political Stability**: Greater stability tends to strengthen currency
6. **Economic Performance**: Stronger growth tends to strengthen currency

### International Capital Markets

#### International Debt Markets
- **Eurobond Market**: Bonds issued outside issuer's country in currency not native to the country of issue
- **Foreign Bond Market**: Bonds issued by foreign borrowers in a domestic market
- **Bank Loans**: International syndicated loans

#### International Equity Markets
- **Cross-Listing**: Listing shares on foreign exchanges
- **Global Depositary Receipts (GDRs)**: Certificates representing foreign shares
- **American Depositary Receipts (ADRs)**: US dollar-denominated equity shares of foreign companies

### International Taxation

#### Key Tax Concepts
1. **Territorial vs. Worldwide Taxation**: Taxation based on source vs. residence
2. **Tax Credit vs. Tax Deduction**: Methods of avoiding double taxation
3. **Tax Treaties**: Bilateral agreements to prevent double taxation
4. **Transfer Pricing**: Pricing of transactions between related entities
5. **Thin Capitalization Rules**: Limits on interest deductibility
6. **Controlled Foreign Corporation (CFC) Rules**: Anti-deferral provisions

## Exchange Rate Risk Management

### Types of Currency Exposure

1. **Transaction Exposure**: Risk from specific foreign currency transactions
   - Example: US company sells goods to EU customer with payment in euros in 90 days

2. **Translation Exposure**: Risk from converting financial statements into reporting currency
   - Example: US parent must consolidate Japanese subsidiary's yen-denominated financial statements

3. **Economic Exposure**: Risk to company value from exchange rate changes
   - Example: US manufacturer competes with Japanese exporters whose competitiveness varies with USD/JPY exchange rate

### Hedging Strategies

#### Internal Hedging Techniques
1. **Netting**: Offsetting exposures within the company
2. **Matching**: Financing assets in the same currency
3. **Leading and Lagging**: Adjusting payment timing based on expected currency movements
4. **Price Adjustment Clauses**: Contractual provisions for exchange rate changes
5. **Currency Diversification**: Spreading risk across multiple currencies

#### External Hedging Techniques
1. **Forward Contracts**: Agreement to exchange currencies at a predetermined rate
2. **Futures Contracts**: Standardized forward contracts traded on exchanges
3. **Currency Options**: Right to exchange currencies at a predetermined rate
4. **Currency Swaps**: Exchange of principal and interest payments in different currencies
5. **Money Market Hedge**: Borrowing in one currency and converting to another

### Exchange Rate Theories

1. **Purchasing Power Parity (PPP)**: Exchange rates adjust to equalize prices across countries
2. **Interest Rate Parity (IRP)**: Forward premium/discount equals interest rate differential
3. **International Fisher Effect**: Exchange rate changes reflect interest rate differentials
4. **Balance of Payments Theory**: Exchange rates adjust to equilibrate balance of payments

## International Capital Budgeting

### Additional Considerations

1. **Parent vs. Project Perspective**: Evaluating from whose viewpoint
2. **Adjusted Present Value (APV) Approach**: Separate valuation of project and financing effects
3. **Cash Flow Remittance Restrictions**: Limitations on moving cash across borders
4. **Differential Inflation Rates**: Impact on future cash flows
5. **Tax Complexity**: Different rates, rules, and treaties
6. **Subsidized Financing**: Government incentives affecting cost of capital
7. **Terminal Value Uncertainty**: Greater difficulty projecting exit values

### Case Example: International Capital Budgeting

A US manufacturer is considering building a plant in Mexico:

**Initial Investment**: $10 million
**Expected Cash Flows (MXN millions)**: 50 per year for 5 years
**Terminal Value (MXN millions)**: 200
**Current Exchange Rate**: 20 MXN/USD
**Expected MXN Depreciation**: 3% per year
**US Tax Rate**: 21%
**Mexico Tax Rate**: 30%
**US Discount Rate for Similar Projects**: 10%
**Country Risk Premium for Mexico**: 3%

#### Steps in Analysis:
1. **Forecast MXN cash flows** for each year
2. **Convert to USD** using projected exchange rates
3. **Apply appropriate tax treatment** based on tax treaties
4. **Discount at adjusted rate** (10% + 3% = 13%)
5. **Calculate NPV** to make investment decision

## International Working Capital Management

### Cash Management Challenges

1. **Multiple Currency Balances**: Need to manage cash in various currencies
2. **Banking System Differences**: Varying clearing times and procedures
3. **Transfer Pricing Implications**: Tax impacts of internal transactions
4. **Exchange Controls**: Restrictions on currency movement
5. **Political Risk**: Potential for blocked funds or expropriation

### International Cash Management Techniques

1. **Centralized Cash Management**: Regional or global treasury centers
2. **Cash Pooling**: Physical or notional combination of balances
3. **In-House Banks**: Internal banking operations for group companies
4. **Multilateral Netting**: Offsetting intracompany obligations
5. **Transfer Pricing Optimization**: Strategic pricing of intracompany transactions

### International Trade Finance

1. **Letters of Credit**: Bank guarantees for international trade
2. **Documentary Collections**: Using banks as intermediaries for documents
3. **Open Account**: Direct shipment with payment terms
4. **Advance Payment**: Payment before shipment
5. **Factoring and Forfaiting**: Selling receivables at a discount

## Managing International Financial Risk

### Political Risk

#### Types of Political Risk
1. **Transfer Risk**: Restrictions on moving funds
2. **Operational Risk**: Government interference in operations
3. **Ownership-Control Risk**: Expropriation or forced divestiture
4. **Security Risk**: Violence or terrorism

#### Political Risk Management
1. **Risk Assessment**: Country risk analysis
2. **Joint Ventures**: Partnering with local entities
3. **Project Finance**: Non-recourse financing structures
4. **Political Risk Insurance**: Coverage for specific political risks
5. **Host Country Negotiations**: Obtaining government guarantees

### Tax Risk

#### International Tax Planning Strategies
1. **Holding Company Structures**: Strategic location of holding companies
2. **Intellectual Property Planning**: Location of IP ownership
3. **Supply Chain Restructuring**: Strategic location of functions
4. **Treaty Network Utilization**: Using beneficial tax treaties
5. **Foreign Tax Credit Planning**: Maximizing tax credit utilization

### Ethical Considerations

1. **Tax Avoidance vs. Evasion**: Legal planning vs. illegal non-compliance
2. **Transfer Pricing Fairness**: Arm's length principle
3. **Social Responsibility**: Impact on host countries
4. **Transparency**: Disclosure practices
5. **Stakeholder Interests**: Balancing shareholder and societal interests

## International Corporate Governance

### Governance Models

1. **Anglo-Saxon Model** (US, UK)
   - Shareholder-focused
   - External monitoring
   - Active market for corporate control

2. **Continental European Model** (Germany, France)
   - Stakeholder-oriented
   - Bank and large shareholder monitoring
   - Less active market for corporate control

3. **Japanese Model**
   - Keiretsu relationships
   - Bank-centered monitoring
   - Employee lifetime employment

### Cross-Border Governance Challenges

1. **Legal System Differences**: Common law vs. civil law
2. **Disclosure Requirements**: Varying transparency standards
3. **Shareholder Rights**: Different voting and protection mechanisms
4. **Board Structures**: One-tier vs. two-tier boards
5. **Institutional Frameworks**: Varying regulatory environments

## Current Trends in International Corporate Finance

1. **Financial Technology (FinTech)**: Digital transformation of financial services
2. **Environmental, Social, and Governance (ESG)**: Growing importance globally
3. **Global Tax Reform**: OECD BEPS initiatives and minimum corporate tax
4. **Currency Digitalization**: Central bank digital currencies (CBDCs)
5. **Supply Chain Reconfiguration**: Reshoring and nearshoring trends
6. **Sustainable Finance**: Green bonds and climate-related financial disclosures

## Key Takeaways

1. International corporate finance adds layers of complexity to financial management
2. Exchange rate risk management is crucial for multinational operations
3. International capital budgeting requires consideration of multiple country-specific factors
4. Working capital management across borders presents unique challenges and opportunities
5. Political and tax risks require proactive management strategies
6. Corporate governance varies significantly across countries and legal systems
7. Global trends continue to reshape the international financial landscape`,
      duration: 60,
      quizId: 'fin-302-quiz-6',
      completed: false
    },
  
  // Find where the module is defined - likely in "corporate-finance" course
{
  id: 'corporate-finance-1',
  title: 'Capital Structure and Financing Decisions',
  description: 'Learn how companies choose between debt and equity financing.',
  content: `# Capital Structure and Financing Decisions

## What is Capital Structure?

Capital structure refers to the specific mix of debt and equity a company uses to finance its operations and growth. It represents how a firm's assets are financed through a combination of:
- Long-term debt
- Preferred stock
- Common equity

Every business must decide on the optimal balance between debt and equity to maximize firm value while managing risk.

## Debt vs. Equity Financing

### Debt Financing

Debt financing involves borrowing money that must be repaid over time with interest.

#### Key Characteristics
- Creates a legal obligation to repay
- Interest payments are generally tax-deductible
- Lenders have no ownership stake
- Fixed payment schedule

#### Advantages
- **Tax Shield**: Interest payments reduce taxable income
- **Retained Control**: No dilution of ownership
- **Lower Cost**: Usually cheaper than equity
- **Predictable Expense**: Fixed payments aid financial planning

#### Disadvantages
- **Financial Risk**: Required payments increase chance of financial distress
- **Restrictive Covenants**: Loan agreements may limit business flexibility
- **Limited Growth**: Too much debt can constrain future borrowing
- **Cash Flow Burden**: Regular payments regardless of performance

### Equity Financing

Equity financing raises funds by selling ownership interests in the company.

#### Key Characteristics
- No legal obligation to repay
- Investors gain partial ownership
- May involve dividend payments (not mandatory)
- No fixed payment schedule

#### Advantages
- **No Repayment Obligation**: Lower financial distress risk
- **No Fixed Burden**: Payments to shareholders are discretionary
- **Additional Resources**: Investors may bring expertise and connections
- **Increased Borrowing Capacity**: Improves debt-to-equity ratio

#### Disadvantages
- **Ownership Dilution**: Reduces control and earnings per share
- **Higher Cost**: Typically more expensive than debt
- **Dividend Expectations**: Shareholders expect returns
- **Reporting Requirements**: Especially for publicly traded companies

## Capital Structure Theories

### Modigliani-Miller Propositions

The foundational theory in capital structure was developed by Franco Modigliani and Merton Miller.

#### Proposition I (Without Taxes)
- In perfect markets, a firm's value is unaffected by how it is financed
- The total pie doesn't change, just how it's sliced

#### Proposition I (With Taxes)
- When corporate taxes exist, firm value increases with debt due to interest tax shields
- More debt = More tax savings = Higher firm value

### Trade-Off Theory

The Trade-Off Theory suggests that companies balance the benefits of debt against its costs.

#### Key Concepts
- **Benefits of Debt**: Tax shields from interest deductions
- **Costs of Debt**: Financial distress and bankruptcy costs
- **Optimal Point**: Where marginal benefit equals marginal cost

### Pecking Order Theory

The Pecking Order Theory suggests that companies have a hierarchy of preferred financing sources.

#### Financing Preference Hierarchy
1. **Internal Financing** (Retained earnings)
2. **Debt Financing**
3. **Equity Financing** (Last resort)

#### Rationale
- Information asymmetry between managers and investors
- Issuing new equity signals overvaluation
- Debt issuance has less negative signaling effect

## Calculating the Weighted Average Cost of Capital (WACC)

The WACC represents the average rate a company pays to finance its assets.

### WACC Formula

WACC = (E/V × Re) + (D/V × Rd × (1-Tc))

Where:
- E = Market value of equity
- D = Market value of debt
- V = Total market value (E + D)
- Re = Cost of equity
- Rd = Cost of debt
- Tc = Corporate tax rate

### Example Calculation

Consider a company with:
- Market value of equity = $600 million
- Market value of debt = $400 million
- Cost of equity = 12%
- Cost of debt = 6%
- Corporate tax rate = 25%

WACC = ($600M/$1000M × 12%) + ($400M/$1000M × 6% × (1-0.25))
WACC = (0.6 × 12%) + (0.4 × 6% × 0.75)
WACC = 7.2% + 1.8% = 9%

## Industry Patterns

### Capital-Intensive Industries
- Utilities
- Telecommunications
- Manufacturing
- Transportation
- **Example:** Duke Energy (D/E ratio ~1.3)

### Knowledge-Based Industries
- Technology
- Pharmaceuticals
- Software
- **Example:** Microsoft (D/E ratio ~0.4)

### Cyclical Industries
- Retail
- Hospitality
- Entertainment
- **Example:** Marriott (Moderate leverage, flexible terms)

## Key Takeaways

- Capital structure is the mix of debt and equity used to finance a company
- The optimal structure balances cost, risk, control, and flexibility
- Different theories explain why companies choose particular structures
- Industry patterns provide useful benchmarks
- WACC calculation helps quantify financing costs`,
  duration: 40,
  quizId: 'corporate-finance-1-quiz',
  completed: false
},
  {
  id: 'banking-services',
  title: 'Financial Services & Banking',
  description: 'Explore banking operations, financial products, regulatory compliance, and client relationship management.',
  content: `# Financial Services & Banking

## Introduction to Banking and Financial Services

Banking and financial services form the backbone of the modern economy by:
- Facilitating the flow of funds between savers and borrowers
- Providing safe storage of wealth
- Enabling efficient payment mechanisms
- Supporting economic growth through credit creation
- Offering risk management tools

Financial institutions serve as intermediaries, transforming short-term deposits into longer-term loans, managing risk, and providing specialized services to meet diverse client needs.

## Types of Financial Institutions

### Commercial Banks
Commercial banks are the most visible financial institutions, providing everyday banking services including:
- Deposit accounts (checking, savings, certificates of deposit)
- Loans (mortgages, personal loans, business loans)
- Payment services
- Basic investment products

Examples: JPMorgan Chase, Bank of America, Wells Fargo

### Investment Banks
Investment banks focus on capital markets activities:
- Securities underwriting
- Mergers and acquisitions advisory
- Trading and market-making
- Institutional asset management
- Research services

Examples: Goldman Sachs, Morgan Stanley, Credit Suisse

### Credit Unions
Credit unions are member-owned, not-for-profit institutions that:
- Serve defined membership groups
- Typically offer higher deposit rates and lower loan rates
- Focus on consumer financial services
- Operate with a member-first philosophy

### Insurance Companies
Insurance companies provide protection against financial loss:
- Life and health insurance
- Property and casualty coverage
- Annuities and retirement products
- Reinsurance services

### Asset Management Firms
These firms manage investments on behalf of clients:
- Mutual funds
- Exchange-traded funds (ETFs)
- Separately managed accounts
- Alternative investments

### Fintech Companies
Technology-driven financial service providers:
- Digital payment platforms
- Online lending services
- Robo-advisors
- Blockchain and cryptocurrency services

## Banking Operations

### The Banking Business Model

Banks operate on a fundamental principle of borrowing at lower rates (deposits) and lending at higher rates (loans):

#### Key Revenue Streams:
- **Net Interest Income**: The difference between interest earned on assets and paid on liabilities
- **Fee Income**: Service charges, account fees, loan origination fees
- **Trading Revenue**: For banks with capital markets operations
- **Investment Banking Fees**: Advisory and underwriting revenues

#### Key Expense Categories:
- **Interest Expense**: Cost of deposits and other funding
- **Operating Costs**: Branches, staff, technology
- **Credit Costs**: Provisions for loan losses
- **Regulatory Compliance**: Cost of meeting regulatory requirements

### The Balance Sheet

Banking balance sheets have unique characteristics:

**Assets:**
- Cash and reserves (highly liquid)
- Investment securities (moderately liquid)
- Loans (less liquid)
- Fixed assets (illiquid)

**Liabilities:**
- Deposits (customer funds)
- Wholesale funding (market-based financing)
- Debt securities
- Other liabilities

**Equity:**
- Common equity
- Preferred equity
- Retained earnings

### Fractional Reserve Banking

Modern banking systems operate on a fractional reserve basis:
- Banks keep only a fraction of deposits as reserves
- The remainder is lent out or invested
- This process creates "bank money" beyond the original deposit
- The money multiplier effect amplifies the money supply

Example: With a 10% reserve requirement, a $1,000 deposit could theoretically lead to $10,000 in new money creation through multiple rounds of lending.

## Banking Products and Services

### Deposit Products
- **Checking Accounts**: Transactional accounts with check-writing privileges
- **Savings Accounts**: Interest-bearing accounts for short-term savings
- **Money Market Accounts**: Higher-yield accounts with limited transactions
- **Certificates of Deposit**: Time deposits with higher rates and penalties for early withdrawal

### Lending Products
- **Consumer Loans**: Auto loans, personal loans, credit cards
- **Mortgages**: Home loans (fixed, adjustable, conforming, jumbo)
- **Commercial Loans**: Business loans, lines of credit, equipment financing
- **Specialized Lending**: Construction loans, agricultural loans, SBA loans

### Payment Services
- Electronic funds transfers
- Wire transfers
- Credit and debit card processing
- Digital payment solutions
- Foreign exchange services

### Wealth Management
- Financial planning
- Investment management
- Trust services
- Retirement planning
- Estate planning

## Banking Regulation and Compliance

### Regulatory Bodies
- **Federal Reserve**: Central bank and primary regulator of bank holding companies
- **Office of the Comptroller of the Currency (OCC)**: Regulates national banks
- **Federal Deposit Insurance Corporation (FDIC)**: Insures deposits and regulates state-chartered banks
- **Consumer Financial Protection Bureau (CFPB)**: Focuses on consumer protection

### Key Banking Regulations
- **Basel Accords**: International framework for bank capital requirements
- **Dodd-Frank Act**: Post-2008 reform focusing on systemic risk and consumer protection
- **Bank Secrecy Act/Anti-Money Laundering**: Rules to prevent financial crimes
- **Truth in Lending Act**: Disclosure requirements for consumer credit

### Capital Requirements
Banks must maintain adequate capital to absorb potential losses:
- **Tier 1 Capital**: Core capital (common equity, retained earnings)
- **Tier 2 Capital**: Supplementary capital (subordinated debt, loan loss reserves)
- **Risk-Weighted Assets**: Assets weighted by credit risk
- **Capital Adequacy Ratio**: Capital as a percentage of risk-weighted assets

### Banking Supervision
- Regular examinations by regulatory authorities
- Stress testing to assess resilience
- Resolution planning ("living wills")
- Reporting requirements

## Bank Performance Analysis

### Key Performance Indicators

#### Profitability Metrics:
- **Return on Assets (ROA)**: Net income ÷ Total assets
- **Return on Equity (ROE)**: Net income ÷ Shareholders' equity
- **Net Interest Margin (NIM)**: Net interest income ÷ Average earning assets
- **Efficiency Ratio**: Non-interest expense ÷ Revenue (lower is better)

#### Asset Quality Metrics:
- **Non-Performing Loan Ratio**: Non-performing loans ÷ Total loans
- **Loan Loss Provision Ratio**: Loan loss provisions ÷ Total loans
- **Net Charge-Off Ratio**: Net charge-offs ÷ Total loans

#### Liquidity Metrics:
- **Loan-to-Deposit Ratio**: Total loans ÷ Total deposits
- **Liquidity Coverage Ratio (LCR)**: High-quality liquid assets ÷ Short-term obligations

#### Capital Metrics:
- **Common Equity Tier 1 (CET1) Ratio**: CET1 capital ÷ Risk-weighted assets
- **Leverage Ratio**: Tier 1 capital ÷ Total assets

### Example: Bank Performance Analysis

Comparing two major banks:

| Metric | Bank A | Bank B | Industry Average |
|--------|--------|--------|------------------|
| ROA    | 1.1%   | 0.9%   | 1.0%             |
| ROE    | 12.5%  | 10.2%  | 11.0%            |
| NIM    | 3.2%   | 2.8%   | 3.0%             |
| Efficiency Ratio | 55%  | 62%   | 58%      |
| NPL Ratio | 0.8% | 1.2%  | 1.0%             |
| CET1 Ratio | 12.3% | 13.5% | 12.0%          |

This analysis shows Bank A with stronger profitability and asset quality, while Bank B maintains higher capital levels.

## Modern Banking Trends

### Digital Transformation
- Mobile and online banking platforms
- API-enabled open banking
- Cloud migration
- AI and machine learning applications

### Fintech Disruption and Collaboration
- Digital-only "neobanks"
- Banking-as-a-Service (BaaS)
- Embedded finance
- Strategic partnerships between traditional banks and fintech companies

### Changing Customer Expectations
- Seamless omnichannel experiences
- Personalized financial services
- Real-time transactions and information
- Enhanced user interfaces and experiences

### Regulatory Evolution
- Open banking mandates
- Data privacy regulations
- Regulatory technology ("regtech")
- Digital asset regulation

### Sustainable Banking
- ESG (Environmental, Social, Governance) integration
- Green financing
- Impact investing
- Climate risk assessment

## Key Takeaways

- Banks and financial institutions serve as crucial intermediaries in the financial system
- Different types of financial institutions serve various market segments and needs
- Banking operations revolve around managing the spread between assets and liabilities
- Regulatory frameworks ensure stability, transparency, and consumer protection
- Bank performance analysis uses specialized metrics to evaluate financial health
- The financial services industry continues to evolve with technological and social changes`,
  duration: 45,
  quizId: 'banking-services-quiz',
  completed: false
}]
}