// src/data/financeProgram.ts
import { FinanceCourse, Concentration, Program, Module, Quiz, ProgramRequirement } from '../types/curriculum';

export const financeQuizzes: Quiz[] = [
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
        id: 'fin302-q1',
        question: 'What is the weighted average cost of capital (WACC)?',
        options: [
          'The average interest rate a company pays on its debt',
          'The required rate of return on equity investments',
          'The weighted average of all capital sources used by a company',
          'The total cost of debt divided by total assets'
        ],
        correctAnswer: 2,
        explanation: 'WACC is the weighted average of all capital sources (debt, preferred stock, common stock) used by a company, weighted by their respective proportions in the company\'s capital structure.'
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
    {
      id: 'fin-302-1',
      title: 'Capital Structure and Cost of Capital',
      description: 'Understanding how firms choose between debt and equity financing',
      content: `# Capital Structure and Cost of Capital

This module explores how companies make financing decisions regarding the mix of debt and equity in their capital structure.

## Capital Structure Basics

Capital structure refers to the way a company finances its assets through a combination of debt, equity, and hybrid securities.

### Key Components:
- **Debt**: Borrowed money that must be repaid (bonds, loans)
- **Equity**: Ownership interest in the company (common stock, retained earnings)
- **Preferred Stock**: Hybrid security with characteristics of both debt and equity

## Cost of Capital

The cost of capital represents the minimum return a company must earn on investments to satisfy its investors.

### Weighted Average Cost of Capital (WACC)

WACC = (E/V × Re) + (D/V × Rd × (1-T))

Where:
- E = Market value of equity
- D = Market value of debt
- V = Total market value (E + D)
- Re = Cost of equity
- Rd = Cost of debt
- T = Corporate tax rate

### Cost of Debt (Rd)
- Interest rate on new debt
- Adjusted for tax benefits (interest is tax-deductible)
- Rd(after-tax) = Rd(before-tax) × (1 - Tax rate)

### Cost of Equity (Re)
Can be estimated using:

1. **Capital Asset Pricing Model (CAPM)**:
   Re = Rf + β(Rm - Rf)
   - Rf = Risk-free rate
   - β = Beta (measure of systematic risk)
   - Rm = Expected market return
   - (Rm - Rf) = Market risk premium

2. **Dividend Growth Model**:
   Re = (D1/P0) + g
   - D1 = Expected dividend one year from now
   - P0 = Current stock price
   - g = Constant dividend growth rate

## Capital Structure Theories

### Modigliani-Miller Theorems
- **Proposition I**: In perfect markets with no taxes, a firm's value is unaffected by its capital structure
- **Proposition II**: With taxes, firm value increases with debt due to tax shield

### Trade-Off Theory
Optimal capital structure balances:
- Tax benefits of debt
- Financial distress costs
- Agency costs

### Pecking Order Theory
Companies prefer financing in this order:
1. Internal financing (retained earnings)
2. Debt
3. Equity (last resort)

## Optimal Capital Structure

Factors influencing optimal capital structure:
- Industry norms
- Business risk
- Tax considerations
- Financial flexibility needs
- Growth opportunities
- Managerial preferences

## Capital Structure Management

Practical approaches:
- Target debt-to-equity ratio
- Interest coverage ratio constraints
- Credit rating considerations
- Matching financing to asset type (long-term assets with long-term financing)`,
      duration: 40,
      quizId: 'fin-302-quiz-1',
      completed: false
    }
  ],
  'fin-403': [
    {
      id: 'fin-403-1',
      title: 'Investment Principles and Asset Allocation',
      description: 'Understanding investment principles and portfolio construction',
      content: `# Investment Principles and Asset Allocation

This module covers the fundamental principles of investments and strategies for constructing portfolios.

## Investment Process

The investment process involves:
1. Setting investment objectives
2. Establishing investment policy
3. Selecting portfolio strategy
4. Asset selection
5. Performance measurement

## Risk and Return

### Types of Risk:
- **Systematic Risk**: Market-wide risk that cannot be diversified away
- **Unsystematic Risk**: Company or industry-specific risk that can be reduced through diversification
- **Total Risk** = Systematic Risk + Unsystematic Risk

### Measuring Risk:
- **Standard Deviation**: Measures total risk (volatility)
- **Beta**: Measures systematic risk relative to the market

### Risk-Return Relationship:
- Higher risk investments should provide higher expected returns
- The risk-free rate compensates for time value
- The risk premium compensates for taking additional risk

## Modern Portfolio Theory (MPT)

Developed by Harry Markowitz, MPT shows how rational investors use diversification to optimize portfolios.

### Key Concepts:
- **Efficient Frontier**: Set of optimal portfolios offering highest expected return for a given risk level
- **Capital Allocation Line**: Combines risk-free asset with risky portfolio
- **Capital Market Line**: Connects risk-free rate with market portfolio

## Capital Asset Pricing Model (CAPM)

The CAPM estimates the expected return of an asset based on its systematic risk.

E(Ri) = Rf + βi[E(Rm) - Rf]

Where:
- E(Ri) = Expected return on asset i
- Rf = Risk-free rate
- βi = Beta of asset i
- E(Rm) = Expected market return
- [E(Rm) - Rf] = Market risk premium

## Asset Allocation

Asset allocation is the process of dividing investments among different asset classes.

### Major Asset Classes:
- **Equities** (stocks): Ownership in companies
- **Fixed Income** (bonds): Debt instruments
- **Cash Equivalents**: Short-term, liquid investments
- **Alternative Investments**: Real estate, commodities, private equity, hedge funds

### Asset Allocation Strategies:
- **Strategic Asset Allocation**: Long-term mix based on expected returns
- **Tactical Asset Allocation**: Short-term adjustments to capitalize on market conditions
- **Dynamic Asset Allocation**: Systematic adjustments based on valuation metrics
- **Core-Satellite Approach**: Core of passive investments with actively managed satellites

## Portfolio Rebalancing

Rebalancing involves periodically buying or selling assets to maintain desired allocation.

### Rebalancing Strategies:
- **Calendar rebalancing**: Rebalancing at predetermined time intervals
- **Percentage-range rebalancing**: Rebalancing when allocations drift beyond predetermined thresholds
- **Constant-proportion portfolio insurance**: Adjusting based on cushion between portfolio value and floor value

## Investment Strategies

### Active vs. Passive:
- **Active Management**: Attempts to outperform benchmark through security selection and market timing
- **Passive Management**: Replicates market index performance with lower costs and taxes

### Value vs. Growth:
- **Value Investing**: Buying undervalued securities trading below intrinsic value
- **Growth Investing**: Buying companies expected to grow faster than average

### Other Strategies:
- **Income Investing**: Focus on regular income generation
- **Index Investing**: Matching market performance
- **Factor Investing**: Targeting specific factors like value, size, momentum, quality`,
      duration: 45,
      quizId: 'fin-403-quiz-1',
      completed: false
    }
  ]
};

export const financeCourses: FinanceCourse[] = [
  // Core Business Courses
  {
    id: 'acc-111',
    courseCode: 'ACC 111',
    title: 'Financial Accounting',
    credits: 3,
    description: 'Introduction to the basic concepts of financial accounting, including accounting cycle, preparation of financial statements, and analysis of accounting information.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: [
      {
        id: 'acc-111-1',
        title: 'Introduction to Accounting',
        description: 'Basic accounting principles and practices',
        content: `# Introduction to Accounting\n\nAccounting is the language of business. This module explores the fundamentals of accounting principles and practices...`,
        duration: 30,
        quizId: 'acc-111-quiz-1',
        completed: false
      }
    ]
  },
  {
    id: 'acc-211',
    courseCode: 'ACC 211',
    title: 'Managerial Accounting',
    credits: 3,
    description: 'Study of accounting information for internal planning and control, cost-volume-profit analysis, budgeting and performance reporting.',
    prerequisites: ['ACC 111'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'bus-211',
    courseCode: 'BUS 211',
    title: 'Baldrige Principles and Introduction to Quality Standards',
    credits: 3,
    description: 'Introduction to the Baldrige framework for performance excellence and quality management principles.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'cis-250',
    courseCode: 'CIS 250',
    title: 'Advanced Excel',
    credits: 3,
    description: 'Advanced spreadsheet techniques for business applications, including financial modeling, data analysis, and decision support.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'eco-201',
    courseCode: 'ECO 201',
    title: 'Macroeconomics',
    credits: 3,
    description: 'Study of aggregate economic behavior, including national income, monetary and fiscal policy, inflation, unemployment, and economic growth.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'eco-202',
    courseCode: 'ECO 202',
    title: 'Microeconomics',
    credits: 3,
    description: 'Analysis of individual economic behavior, market structure, price determination, and resource allocation.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'mgt-105',
    courseCode: 'MGT 105',
    title: 'Principles of Management',
    credits: 3,
    description: 'Introduction to management concepts, functions, and practices, including planning, organizing, leading, and controlling.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'mkt-200',
    courseCode: 'MKT 200',
    title: 'Principles of Marketing',
    credits: 3,
    description: 'Introduction to marketing concepts, strategies, and practices, including market analysis, consumer behavior, and marketing mix.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  // Finance Courses
  {
    id: 'fin-201',
    courseCode: 'FIN 201',
    title: 'Principles of Finance',
    credits: 3,
    description: 'This course introduces students to the world of finance through a wide lens. It covers foundation topics and broadly covers the world of corporate finance and investments through the development and use of the basic tools for financial administration, financial analysis, planning and control, investment decisions, and financial markets.',
    prerequisites: ['ACC 111'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: financeModules['fin-201']
  },
  {
    id: 'fin-280',
    courseCode: 'FIN 280',
    title: 'Introduction to the Securities Industry',
    credits: 3,
    description: 'FIN 280 is designed to prepare students to take FINRA\'s Securities Industry Essentials Exam (SIE). The SIE is a preliminary exam that tests the taker\'s knowledge about the investment securities world. Passing this exam proves to the world that the successful test-taker has mastered basic knowledge of securities, securities markets and securities regulation. A successful score indicates the individual is a viable candidate for employment in the financial services industries.',
    prerequisites: [],
    concentrations: ['banking', 'personal'],
    modules: []
  },
  {
    id: 'fin-302',
    courseCode: 'FIN 302',
    title: 'Corporate Finance',
    credits: 3,
    description: 'This course is an analysis of capital investments relative to rates of return, goals, risks, and other operational/quality measures. A study of equity and debt financing, dividend policy, and multinational operations is also reviewed.',
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: financeModules['fin-302']
  },
  {
    id: 'fin-305',
    courseCode: 'FIN 305',
    title: 'Analysis of Financial Statements',
    credits: 3,
    description: 'Modern investing and lending decisions are based on financial statement analysis. Investing and lending decisions require the application of thorough analysis to carefully evaluate data. Sound information is obtained by an understanding of the data from which it is derived, as well as by the application of tools of analysis to aid in its extrication and evaluation. The course focuses on understanding the data that are analyzed, as well as the methods by which they are analyzed and interpreted.',
    prerequisites: ['ACC 211'],
    concentrations: ['planning', 'corporate'],
    modules: []
  },
  {
    id: 'fin-306',
    courseCode: 'FIN 306',
    title: 'Personal Financial Planning',
    credits: 3,
    description: 'This course is an introduction to the principles of personal financial planning. Course material will introduce the student to financial markets, financial products, and investment alternatives. A study of the more common markets and investment trends and their contributions to corporate and personal wealth is included. Course is beneficial for students who are interested in pursuing the certified financial planner (CFP) designation.',
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'fin-401',
    courseCode: 'FIN 401',
    title: 'Insurance and Risk Management',
    credits: 3,
    description: 'This course explores principles of insurance and risk management, including identification and evaluation of risk, analysis of various risk control techniques, and implementation of risk management strategy.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  {
    id: 'fin-402',
    courseCode: 'FIN 402',
    title: 'Behavioral Finance in Personal Investment',
    credits: 3,
    description: 'This course examines the theoretical and practical foundation of the burgeoning field of Behavioral Finance, providing a practical foundation for the field of investment management, wealth accumulation, and financial therapy. Students will develop the skills and theoretical orientation that is necessary to succeed in the fields of personal wealth management and corporate financial management across multiple industries.',
    prerequisites: ['FIN 201'],
    concentrations: ['personal'],
    modules: []
  },
  {
    id: 'fin-403',
    courseCode: 'FIN 403',
    title: 'Investment Management',
    credits: 3,
    description: 'This course analyzes the theory and practice of investment measurement and management. Topics include principles of selection of assets, personal portfolio management, and performance criteria for selecting and making alternative corporate investment decisions.',
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: financeModules['fin-403']
  },
  {
    id: 'fin-405',
    courseCode: 'FIN 405',
    title: 'Seminar in Finance',
    credits: 3,
    description: 'This seminar is designed to provide a hands-on and project-based learning experience, focusing on factors that influence managerial policies and strategic measures. Students engage in comprehensive research, analysis, and practical application of financial management concepts. The primary emphasis is on real-world problem-solving and decision-making within the context of financial management.',
    prerequisites: ['FIN 302', 'FIN 305'],
    concentrations: ['corporate'],
    modules: []
  },
  {
    id: 'fin-407',
    courseCode: 'FIN 407',
    title: 'Business Valuations for Mergers and Acquisitions',
    credits: 3,
    description: 'This course considers the strategic development of business valuations from the point of view of mergers, friendly or unfriendly, and appraisal of businesses for acquisition purposes. Tax and accounting rules involved in merger and acquisition activity are reviewed. Tactics of defense in acquisition battles are discussed and the ultimate impact on shareholder wealth is examined. Valuation of closely held businesses for sale or estate purposes is explored.',
    prerequisites: ['FIN 302', 'FIN 305'],
    concentrations: ['corporate'],
    modules: []
  },
  {
    id: 'fin-411',
    courseCode: 'FIN 411',
    title: 'International Financial Management',
    credits: 3,
    description: 'This course covers international capital movements and balance of payment problems, as well as problems of international operations as they affect financial functions. Foreign and international institutions and the foreign exchange process are examined. Financial requirements, problems, sources, and policies of multinational corporations are considered.',
    prerequisites: ['ECO 201'],
    concentrations: ['international'],
    modules: []
  },
  {
    id: 'fin-422',
    courseCode: 'FIN 422',
    title: 'International Investments',
    credits: 3,
    description: 'This course helps students conceptualize the theories of fundamental investment and understand professional techniques and practical applications of international investments. Topics include economic analysis of investing opportunities, investment instruments, financial risk and return, organization and control, and general investment strategies.',
    prerequisites: ['FIN 201', 'IBA 301'],
    concentrations: ['international'],
    modules: []
  },
  // Related Courses
  {
    id: 'eco-303',
    courseCode: 'ECO 303',
    title: 'Money and Banking',
    credits: 3,
    description: 'This comprehensive course thoroughly analyzes the dynamics of financial intermediation, the pivotal role of money and banking, and the influence of the Federal Reserve within the economy. It covers a wide range of topics, including the nature of commercial banks and their operations, the interconnections between the banking sector and other sectors of the economy, the functions and responsibilities of the Federal Reserve, its impact on monetary policy and interest rates, its role in regulating and supervising financial institutions, and its proactive response to economic challenges and crises. Additionally, the course explores global financial interdependencies.',
    prerequisites: ['ECO 201'],
    concentrations: ['banking'],
    modules: []
  },
  {
    id: 'iba-301',
    courseCode: 'IBA 301',
    title: 'Principles of International Business',
    credits: 3,
    description: 'This course familiarizes students with the multidimensional macro-environment of international business and teaches them the tools necessary for the analysis and evaluation of diverse problems within that environment. Basic principles and issues of international economics are introduced, as well as global aspects of politics and culture. The different managerial functions within a multi-national firm are examined.',
    prerequisites: ['MGT 105'],
    concentrations: ['international'],
    modules: []
  },
  {
    id: 'acc-215',
    courseCode: 'ACC 215',
    title: 'Spreadsheet and General Ledger Software',
    credits: 3,
    description: 'Application of computerized accounting software and spreadsheet software to maintain financial records and prepare financial statements.',
    prerequisites: [],
    concentrations: ['planning'],
    modules: []
  },
  {
    id: 'acc-303',
    courseCode: 'ACC 303',
    title: 'Intermediate Accounting I',
    credits: 3,
    description: 'Detailed study of financial accounting theory and practice, including accounting standards, conceptual framework, and financial statement presentation.',
    prerequisites: [],
    concentrations: ['planning'],
    modules: []
  },
  {
    id: 'mat-230',
    courseCode: 'MAT 230',
    title: 'Finite Analysis',
    credits: 3,
    description: 'Applied mathematics for business, social, and life sciences, including linear programming, probability, statistics, and financial mathematics.',
    prerequisites: [],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  },
  // General Education Courses
  {
    id: 'eng-110',
    courseCode: 'ENG 110',
    title: 'College Writing',
    credits: 3,
    description: 'Development of writing skills including clear, effective expression, supporting evidence, and research techniques.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'eng-130',
    courseCode: 'ENG 130',
    title: 'Literature and Composition',
    credits: 3,
    description: 'Analysis of literary works and development of critical writing skills.',
    prerequisites: ['ENG 110'],
    concentrations: [],
    modules: []
  },
  {
    id: 'com-107',
    courseCode: 'COM 107',
    title: 'Introduction to Communication',
    credits: 3,
    description: 'Study of communication principles and practices in various contexts.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'cis-110',
    courseCode: 'CIS 110',
    title: 'Digital Skills for College and Career',
    credits: 3,
    description: 'Development of computer skills essential for academic and professional success.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'bus-340',
    courseCode: 'BUS 340',
    title: 'Business Ethics',
    credits: 3,
    description: 'Examination of ethical issues and dilemmas in business, including corporate social responsibility and professional ethics.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'law-204',
    courseCode: 'LAW 204',
    title: 'Business Law I',
    credits: 3,
    description: 'Introduction to legal principles affecting business operations, including contracts, torts, and agency.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'bus-311',
    courseCode: 'BUS 311',
    title: 'Managerial Communications',
    credits: 3,
    description: 'Development of written and oral communication skills for managers, including reports, presentations, and business correspondence.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'mat-120',
    courseCode: 'MAT 120',
    title: 'College Algebra',
    credits: 3,
    description: 'Study of algebraic expressions, equations, inequalities, functions, and their applications.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'mat-220',
    courseCode: 'MAT 220',
    title: 'Statistics I',
    credits: 3,
    description: 'Introduction to statistical concepts and methods, including descriptive statistics, probability, sampling, and hypothesis testing.',
    prerequisites: ['MAT 120'],
    concentrations: [],
    modules: []
  },
  // Career Development Courses
  {
    id: 'ctc-101',
    courseCode: 'CTC 101',
    title: 'College Success Seminar',
    credits: 3,
    description: 'Introduction to college resources, academic skills, and personal development strategies for success in higher education.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  {
    id: 'ctc-301',
    courseCode: 'CTC 301',
    title: 'Professional Success Seminar',
    credits: 3,
    description: 'Preparation for professional career, including job search strategies, resume development, and interview skills.',
    prerequisites: [],
    concentrations: [],
    modules: []
  },
  // Capstone Course
  {
    id: 'bus-411',
    courseCode: 'BUS 411',
    title: 'Business Policy Seminar',
    credits: 3,
    description: 'Capstone course integrating functional areas of business in strategic planning and decision making.',
    prerequisites: ['FIN 201', 'MGT 105', 'MKT 200', 'ACC 111'],
    concentrations: ['general', 'corporate', 'planning', 'banking', 'international', 'personal'],
    modules: []
  }
];

export const concentrations: Concentration[] = [
  {
    id: 'general',
    name: 'General Finance',
    description: 'Broad-based finance curriculum giving students flexibility to select upper-level finance courses based on their interests.',
    requiredCourses: [],
    electiveCourses: ['FIN 300-400 Level Elective', 'FIN 300-400 Level Elective', 'FIN 300-400 Level Elective']
  },
  {
    id: 'corporate',
    name: 'Corporate Finance',
    description: 'Focus on financial management and decision-making within corporations, including capital budgeting, mergers and acquisitions, and financial strategy.',
    requiredCourses: ['FIN 405', 'FIN 407'],
    electiveCourses: ['FIN 300-400 Level Elective']
  },
  {
    id: 'planning',
    name: 'Financial Planning and Analysis',
    description: 'Focus on financial analysis, accounting, and financial planning for organizations.',
    requiredCourses: ['ACC 215', 'ACC 303', 'FIN 305'],
    electiveCourses: []
  },
  {
    id: 'banking',
    name: 'Financial Services and Banking',
    description: 'Focus on banking operations, monetary policy, and securities industry regulations.',
    requiredCourses: ['ECO 303', 'FIN 280'],
    electiveCourses: ['FIN 300-400 Level Elective']
  },
  {
    id: 'international',
    name: 'International Finance',
    description: 'Focus on global financial markets, international investments, and multinational financial management.',
    requiredCourses: ['FIN 411', 'FIN 422', 'IBA 301'],
    electiveCourses: []
  },
  {
    id: 'personal',
    name: 'Personal Financial Planning',
    description: 'Focus on individual financial planning, wealth management, and behavioral finance.',
    requiredCourses: ['FIN 280', 'FIN 402'],
    electiveCourses: ['FIN 300-400 Level Elective']
  }
];

export const programRequirements: ProgramRequirement[] = [
  {
    id: 'general-education',
    name: 'General Education',
    description: 'Foundational courses that develop critical thinking, communication, and analytical skills.',
    requiredCredits: 60,
    categories: [
      {
        name: 'Common Core',
        requiredCredits: 12,
        courses: ['ENG 110', 'ENG 130', 'COM 107', 'CIS 110']
      },
      {
        name: 'Liberal Arts',
        requiredCredits: 21,
        courses: ['BUS 340', 'LAW 204']
      },
      {
        name: 'Designated Writing Course',
        requiredCredits: 3,
        courses: ['BUS 311']
      },
      {
        name: 'Math',
        requiredCredits: 6,
        courses: ['MAT 120', 'MAT 220']
      },
      {
        name: 'Science',
        requiredCredits: 3,
        courses: []
      },
      {
        name: 'Open Electives',
        requiredCredits: 15,
        courses: []
      }
    ]
  },
  {
    id: 'business-core',
    name: 'Business Core',
    description: 'Essential business courses that provide foundational knowledge across business disciplines.',
    requiredCredits: 21,
    categories: [
      {
        name: 'Business Core Courses',
        requiredCredits: 21,
        courses: ['ACC 111', 'BUS 211', 'CIS 250', 'ECO 201', 'FIN 201', 'MGT 105', 'MKT 200']
      }
    ]
  },
  {
    id: 'major-core',
    name: 'Major Core',
    description: 'Core finance courses that develop specialized knowledge and skills in finance.',
    requiredCredits: 21,
    categories: [
      {
        name: 'Finance Major Courses',
        requiredCredits: 21,
        courses: ['ACC 211', 'ECO 202', 'FIN 302', 'FIN 306', 'FIN 401', 'FIN 403', 'MAT 230']
      }
    ]
  },
  {
    id: 'concentration',
    name: 'Concentration',
    description: 'Specialized courses in a specific area of finance.',
    requiredCredits: 9,
    categories: [
      {
        name: 'Concentration Courses',
        requiredCredits: 9,
        courses: []
      }
    ]
  },
  {
    id: 'career-core',
    name: 'College to Career Core',
    description: 'Courses designed to prepare students for academic and professional success.',
    requiredCredits: 6,
    categories: [
      {
        name: 'Career Development',
        requiredCredits: 6,
        courses: ['CTC 101', 'CTC 301']
      }
    ]
  },
  {
    id: 'capstone',
    name: 'Capstone',
    description: 'Culminating course that integrates knowledge from across the curriculum.',
    requiredCredits: 3,
    categories: [
      {
        name: 'Capstone Course',
        requiredCredits: 3,
        courses: ['BUS 411']
      }
    ]
  }
];

export const financeProgram: Program = {
  id: 'bs-finance',
  name: 'Bachelor of Science in Finance',
  description: 'Students in the Bachelor of Science in Finance will develop the skills necessary to analyze financial situations, determine potential problems, and implement workable solutions. Through case studies, students will gain knowledge of the cultural, global, and ethical environments in which businesses operate. Students will also gain crucial foundational knowledge in the areas of mathematics and quantitative methods necessary to effectively analyze business and investment decisions.',
  totalCredits: 120,
  generalEducationCredits: 60,
  businessCoreCredits: 21,
  majorCoreCredits: 21,
  concentrationCredits: 9,
  careerCoreCredits: 6,
  electiveCredits: 3,
  programOutcomes: [
    'Financial Management - Students will develop theoretical and practical financial knowledge supported by the appropriate use of analytical and quantitative techniques to enable them to perform successfully in finance-related fields.',
    'Financial Policy Making - Students will evaluate market and organizational needs for developing, strengthening, and implementing corporate governance and dividend policy making practices.',
    'Strategic Financial Planning - Students will identify, synthesize and integrate relevant business, finance, and regulatory concepts to assist in providing innovative solutions to complex strategic and organizational challenges.',
    'Business Ethics - Students will examine and apply ethical and professional behaviors and standards to contemporary business situations.',
    'Communication - Students will communicate professionally with skills essential to success in the business environment.',
    'Fundamental Business Concepts - Students will demonstrate the ability to apply the fundamental concepts of management, marketing, accounting, finance, and economics in a business environment.'
  ],
  careerOpportunities: [
    'Financial Analyst',
    'Investment Banker',
    'Portfolio Manager',
    'Risk Management Specialist',
    'Financial Advisor',
    'Corporate Finance Manager',
    'Treasury Analyst',
    'Credit Analyst',
    'Financial Planner',
    'Insurance Underwriter',
    'Bank Manager',
    'Securities Trader'
  ],
  accreditation: 'This degree program is programmatically accredited by the Accreditation Council for Business Schools and Programs (ACBSP).'
};

// Define simulation tools for practical application
export const tradingSimulationTools = [
  {
    id: 'market-overview',
    name: 'Market Overview Dashboard',
    description: 'Live market data with major indices, sector performance, and market movers',
    applicableCourses: ['FIN 201', 'FIN 403', 'FIN 280']
  },
  {
    id: 'portfolio-simulator',
    name: 'Portfolio Construction & Management',
    description: 'Build and monitor investment portfolios with performance analytics',
    applicableCourses: ['FIN 403', 'FIN 306', 'FIN 402']
  },
  {
    id: 'valuation-tool',
    name: 'Business Valuation Calculator',
    description: 'DCF, comparable company, and precedent transaction valuation models',
    applicableCourses: ['FIN 407', 'FIN 302', 'FIN 405']
  },
  {
    id: 'financial-statement-analyzer',
    name: 'Financial Statement Analysis Tool',
    description: 'Ratio analysis, trend analysis, and benchmarking for company financials',
    applicableCourses: ['FIN 305', 'ACC 211', 'ACC 303']
  },
  {
    id: 'forex-simulator',
    name: 'Foreign Exchange Trading Simulator',
    description: 'Currency trading platform with exchange rate analysis tools',
    applicableCourses: ['FIN 411', 'FIN 422', 'IBA 301']
  },
  {
    id: 'risk-management-tool',
    name: 'Risk Analysis Dashboard',
    description: 'Measure and analyze various risk metrics for portfolios and investments',
    applicableCourses: ['FIN 401', 'FIN 403', 'FIN 306']
  },
  {
    id: 'financial-planning-calculator',
    name: 'Personal Financial Planning Suite',
    description: 'Retirement, education, insurance, and estate planning calculators',
    applicableCourses: ['FIN 306', 'FIN 402', 'FIN 401']
  },
  {
    id: 'ma-simulator',
    name: 'Mergers & Acquisitions Simulator',
    description: 'M&A case studies with deal structuring and synergy analysis',
    applicableCourses: ['FIN 407', 'FIN 405']
  },
  {
    id: 'banking-simulator',
    name: 'Banking System Simulator',
    description: 'Simulate banking operations and monetary policy effects',
    applicableCourses: ['ECO 303', 'FIN 280']
  },
  {
    id: 'capital-budgeting-calculator',
    name: 'Capital Budgeting Tool',
    description: 'NPV, IRR, payback period, and other investment analysis tools',
    applicableCourses: ['FIN 302', 'FIN 201']
  }
];

// Define career preparation resources
export const careerResources = [
  {
    id: 'sie-prep',
    name: 'Securities Industry Essentials (SIE) Exam Preparation',
    description: 'Practice tests, study guides, and resources for the FINRA SIE exam',
    relatedCourses: ['FIN 280']
  },
  {
    id: 'interview-simulator',
    name: 'Finance Interview Simulator',
    description: 'Practice common finance interview questions with feedback',
    relatedCourses: ['CTC 301']
  },
  {
    id: 'resume-builder',
    name: 'Finance Resume Builder',
    description: 'Templates and guidance for creating effective finance resumes',
    relatedCourses: ['CTC 301']
  },
  {
    id: 'networking-guide',
    name: 'Financial Industry Networking Guide',
    description: 'Strategies for building professional connections in finance',
    relatedCourses: ['CTC 301']
  },
  {
    id: 'certification-pathways',
    name: 'Professional Certification Pathways',
    description: 'Information on CFA, CFP, FRM, and other finance certifications',
    relatedCourses: ['FIN 306', 'FIN 403', 'FIN 401']
  }
];

export default {
  financeCourses,
  concentrations,
  financeProgram,
  programRequirements,
  financeQuizzes,
  tradingSimulationTools,
  careerResources
};