import { Course, UserProgress, Quiz } from '../types/learning';

// Export finance topics
export const financeTopics = [
  { id: 'corporate-finance', name: 'Corporate Finance', progress: 35, color: '#5C2D91' },
  { id: 'planning', name: 'Financial Planning & Analysis', progress: 20, color: '#0078D4' },
  { id: 'banking', name: 'Financial Services & Banking', progress: 15, color: '#217346' },
  { id: 'general', name: 'General Finance', progress: 65, color: '#B7472A' },
  { id: 'international', name: 'International Finance', progress: 10, color: '#8764B8' },
  { id: 'personal', name: 'Personal Financial Planning', progress: 45, color: '#C74634' },
];

export const userProgress: UserProgress = {
  streak: 5,
  xpEarned: 325,
  quizAverage: 82,
  progress: 33,
  completedModules: ['finance-101-1', 'finance-101-2'],
  enrolledCourses: ['corp-finance', 'financial-markets'],
  completedCourses: ['finance-101', 'accounting-principles'],
  selectedConcentration: 'general',
  quizResults: {
    'finance-101-quiz-1': {
      score: 9,
      totalQuestions: 10,
      dateTaken: '2025-04-28'
    },
    'finance-101-quiz-2': {
      score: 7,
      totalQuestions: 10,
      dateTaken: '2025-05-01'
    }
  }
};

export const quizzes: Quiz[] = [
  {
    id: 'finance-101-quiz-1',
    title: 'Financial Fundamentals Quiz',
    questions: [
      {
        id: 'q1',
        question: 'What does ROI stand for?',
        options: [
          'Return On Investment',
          'Rate Of Inflation',
          'Risk Of Investment',
          'Return On Income'
        ],
        correctAnswer: 0,
        explanation: 'Return On Investment (ROI) measures the gain or loss generated on an investment relative to the amount of money invested.'
      },
      {
        id: 'q2',
        question: 'Which financial statement shows a company\'s assets, liabilities, and shareholders\' equity?',
        options: [
          'Income Statement',
          'Cash Flow Statement',
          'Balance Sheet',
          'Statement of Retained Earnings'
        ],
        correctAnswer: 2,
        explanation: 'The Balance Sheet provides a snapshot of a company\'s financial position at a point in time, showing what the company owns (assets) and owes (liabilities), as well as the amount invested by shareholders (equity).'
      },
      {
        id: 'q3',
        question: 'What is the primary goal of financial planning?',
        options: [
          'To minimize all types of risk',
          'To maximize investment returns',
          'To achieve financial goals while managing risk',
          'To eliminate all debt'
        ],
        correctAnswer: 2,
        explanation: 'The primary goal of financial planning is to help individuals or organizations achieve their financial goals while managing an appropriate level of risk for their situation.'
      },
      {
        id: 'q4',
        question: 'Which of the following best describes liquidity?',
        options: [
          'The ability to generate long-term profits',
          'The ease of converting an asset to cash without significant price change',
          'The total value of all assets owned',
          'The amount of cash on hand'
        ],
        correctAnswer: 1,
        explanation: 'Liquidity refers to how easily an asset can be converted into cash without affecting its market price. Cash is the most liquid asset, while real estate typically has lower liquidity.'
      },
      {
        id: 'q5',
        question: 'What is diversification in investing?',
        options: [
          'Investing all your money in different stocks',
          'Spreading investments across various asset classes to reduce risk',
          'Frequently buying and selling investments',
          'Investing only in blue-chip companies'
        ],
        correctAnswer: 1,
        explanation: 'Diversification is a risk management strategy that involves spreading investments across various asset classes, industries, or geographic regions to reduce exposure to any single risk.'
      }
    ]
  },
  {
    id: 'finance-101-quiz-2',
    title: 'Financial Statements Quiz',
    questions: [
      {
        id: 'q1',
        question: 'Which financial statement reports a company\'s revenues and expenses over a specific period?',
        options: [
          'Balance Sheet',
          'Income Statement',
          'Cash Flow Statement',
          'Statement of Shareholders\' Equity'
        ],
        correctAnswer: 1,
        explanation: 'The Income Statement (also called Profit & Loss Statement) reports a company\'s revenues and expenses over a specific period, showing whether the company is profitable.'
      },
      {
        id: 'q2',
        question: 'What does a negative cash flow from operating activities typically indicate?',
        options: [
          'The company is expanding rapidly',
          'The company is paying dividends',
          'The company may have trouble sustaining operations',
          'The company has high depreciation expenses'
        ],
        correctAnswer: 2,
        explanation: 'Negative operating cash flow often indicates that a company\'s core business operations are not generating enough cash, which could signal potential financial difficulties.'
      },
      {
        id: 'q3',
        question: 'Which of the following is NOT typically included in a company\'s balance sheet?',
        options: [
          'Cash and Cash Equivalents',
          'Revenue',
          'Long-term Debt',
          'Accumulated Depreciation'
        ],
        correctAnswer: 1,
        explanation: 'Revenue is reported on the Income Statement, not the Balance Sheet. The Balance Sheet includes assets (like cash), liabilities (like debt), and equity.'
      },
      {
        id: 'q4',
        question: 'What does the Price-to-Earnings (P/E) ratio measure?',
        options: [
          'A company\'s debt relative to its equity',
          'A stock\'s current price relative to its earnings per share',
          'A company\'s ability to pay short-term obligations',
          'The percentage of profits paid as dividends'
        ],
        correctAnswer: 1,
        explanation: 'The P/E ratio measures a stock\'s current price relative to its per-share earnings, helping investors assess whether a stock is relatively expensive or cheap compared to its earnings.'
      },
      {
        id: 'q5',
        question: 'Which financial metric is calculated as (Current Assets - Inventory) / Current Liabilities?',
        options: [
          'Current Ratio',
          'Debt-to-Equity Ratio',
          'Quick Ratio (Acid-Test Ratio)',
          'Return on Equity'
        ],
        correctAnswer: 2,
        explanation: 'The Quick Ratio (also known as the Acid-Test Ratio) measures a company\'s ability to pay short-term obligations with its most liquid assets, excluding inventory which may take time to sell.'
      }
    ]
  }
];

export const courses: Course[] = [
  {
    id: 'finance-101',
    title: 'Finance 101: Core Concepts',
    description: 'Learn the fundamental principles and concepts of finance that are essential for personal and business financial decision-making.',
    level: 'beginner',
    progress: 40,
    modules: [
      {
        id: 'finance-101-1',
        title: 'Introduction to Financial Concepts',
        description: 'Understand the basic concepts that form the foundation of finance.',
        content: `
# Introduction to Financial Concepts

Finance is the study of money and how it is used. It encompasses the creation, management, and study of money, banking, credit, investments, assets, and liabilities.

## Key Areas of Finance

1. **Personal Finance**: Managing individual or family financial decisions, including budgeting, saving, investing, and planning for retirement.

2. **Corporate Finance**: Focuses on how businesses fund their operations and how they plan to use their financial resources.

3. **Public Finance**: Examines the role of government in the economy, including taxation, spending, and managing public debt.

## Fundamental Concepts

### Time Value of Money
One of the most important concepts in finance is the time value of money, which states that a dollar today is worth more than a dollar in the future because of its earning potential.

### Risk and Return
There is a direct relationship between risk and potential return—generally, the higher the risk, the higher the potential return.

### Diversification
Don't put all your eggs in one basket. Spreading investments across different assets can help manage risk.

## Financial Markets

Financial markets facilitate the buying and selling of financial instruments like stocks, bonds, currencies, and derivatives. They play a crucial role in allocating resources and transferring risk.

## Financial Institutions

Banks, credit unions, insurance companies, and investment firms are all examples of financial institutions that facilitate financial transactions and help manage money.
        `,
        duration: 20,
        quizId: 'finance-101-quiz-1',
        completed: true
      },
      {
        id: 'finance-101-2',
        title: 'Understanding Financial Statements',
        description: 'Learn how to read and analyze the three main financial statements.',
        content: `
# Understanding Financial Statements

Financial statements are formal records of the financial activities and position of a business, person, or other entity. There are three primary financial statements:

## Balance Sheet

The balance sheet provides a snapshot of a company's financial position at a specific point in time. It follows the accounting equation:

**Assets = Liabilities + Equity**

### Key Components:

1. **Assets**: Resources owned by the company that have economic value.
   - Current Assets (cash, accounts receivable, inventory)
   - Non-current Assets (property, plant, equipment)

2. **Liabilities**: Obligations the company must fulfill.
   - Current Liabilities (accounts payable, short-term debt)
   - Non-current Liabilities (long-term debt, deferred tax liabilities)

3. **Equity**: The residual interest in the assets after deducting liabilities.
   - Common Stock
   - Retained Earnings

## Income Statement

The income statement shows a company's financial performance over a specific period (quarter, year). It details:

**Revenue - Expenses = Net Income**

### Key Components:

1. **Revenue**: Money earned from normal business operations
2. **Cost of Goods Sold (COGS)**: Direct costs attributable to the production of goods sold
3. **Gross Profit**: Revenue - COGS
4. **Operating Expenses**: Expenses that support business operations
5. **Operating Income**: Gross Profit - Operating Expenses
6. **Net Income**: Final profit after accounting for all costs, expenses, and taxes

## Cash Flow Statement

The cash flow statement shows how changes in balance sheet accounts and income affect cash and cash equivalents. It breaks down cash activities into:

1. **Operating Activities**: Cash flows from primary business operations
2. **Investing Activities**: Cash flows from buying/selling assets and investments
3. **Financing Activities**: Cash flows from debt and equity financing

## Key Financial Ratios

Financial ratios help analysts interpret financial statements:

1. **Liquidity Ratios**: Measure ability to pay short-term obligations
   - Current Ratio = Current Assets ÷ Current Liabilities
   - Quick Ratio = (Current Assets - Inventory) ÷ Current Liabilities

2. **Profitability Ratios**: Measure ability to generate profit
   - Profit Margin = Net Income ÷ Revenue
   - Return on Assets (ROA) = Net Income ÷ Total Assets
   - Return on Equity (ROE) = Net Income ÷ Shareholders' Equity

3. **Leverage Ratios**: Measure reliance on debt financing
   - Debt-to-Equity Ratio = Total Debt ÷ Total Equity
   - Interest Coverage Ratio = EBIT ÷ Interest Expenses

4. **Efficiency Ratios**: Measure how effectively assets are used
   - Inventory Turnover = COGS ÷ Average Inventory
   - Asset Turnover = Revenue ÷ Total Assets
        `,
        duration: 25,
        quizId: 'finance-101-quiz-2',
        completed: true
      },
      {
        id: 'finance-101-3',
        title: 'Time Value of Money',
        description: 'Explore the concept that money available now is worth more than the same amount in the future.',
        content: `
# Time Value of Money

Time Value of Money (TVM) is a fundamental concept in finance that recognizes that money available now is worth more than the same amount in the future due to its potential earning capacity.

## Core Principles

The time value of money is based on the principle that an investor prefers to receive money today rather than the same amount in the future because:

1. Money has the potential to grow over time through investment
2. Purchasing power may be eroded by inflation
3. There is always some risk of not receiving the money in the future

## Basic TVM Formulas

### Future Value (FV)
The value of a present amount at a future date, based on a specific interest rate:

FV = PV × (1 + r)^n

Where:
- PV = Present Value
- r = Interest rate per period
- n = Number of periods

### Present Value (PV)
The current worth of a future sum of money, based on a specific interest rate:

PV = FV ÷ (1 + r)^n

### Future Value of Annuity (FVA)
The future value of a series of equal payments:

FVA = PMT × [(1 + r)^n - 1] ÷ r

Where:
- PMT = Payment amount per period

### Present Value of Annuity (PVA)
The current value of a series of equal future payments:

PVA = PMT × [1 - (1 + r)^-n] ÷ r

## Applications in Finance

### Investment Analysis
TVM helps in evaluating investment opportunities through techniques like Net Present Value (NPV) and Internal Rate of Return (IRR).

### Loan Calculations
TVM formulas determine loan payments, amortization schedules, and the total interest paid over the loan's lifetime.

### Retirement Planning
TVM calculations show how much you need to save regularly to reach a retirement goal, or how long your savings will last.

### Business Valuation
Companies are often valued based on the present value of their expected future cash flows.

## Example: The Power of Compound Interest

Consider two scenarios:
1. Alex invests $10,000 at age 25 and stops at age 35 (10 years of $10,000 investments)
2. Beth starts investing $10,000 at age 35 and continues until age 65 (30 years of $10,000 investments)

Assuming an 8% annual return, by age 65:
- Alex's investment grows to approximately $1.4 million
- Beth's investment grows to approximately $1.2 million

Despite investing only one-third as much money, Alex ends up with more due to the longer time for compound interest to work.

## Rule of 72

A quick way to estimate how long it will take to double your money:

Years to double = 72 ÷ Interest Rate

For example, at 8% interest, money doubles in approximately 9 years (72 ÷ 8 = 9).
        `,
        duration: 30,
        quizId: '',
        completed: false
      },
      {
        id: 'finance-101-4',
        title: 'Risk and Return',
        description: 'Learn about the relationship between risk and return in investment decisions.',
        content: `
# Risk and Return

The relationship between risk and return is one of the fundamental concepts in finance and investment. Generally, investments with higher potential returns come with higher risks.

## Understanding Risk

Risk in finance refers to the possibility that an investment's actual return will differ from the expected return. The greater this variability, the riskier the investment.

### Types of Risk

1. **Market Risk**: Risk of losses due to factors that affect the overall performance of financial markets.

2. **Credit Risk**: Risk that a borrower will default on any type of debt.

3. **Liquidity Risk**: Risk that an asset cannot be sold quickly enough to minimize loss.

4. **Operational Risk**: Risk of loss due to inadequate or failed processes, people, and systems.

5. **Systematic Risk**: Market-wide risk that cannot be eliminated through diversification (e.g., recessions, wars).

6. **Unsystematic Risk**: Company or industry-specific risk that can be reduced through diversification.

## Measuring Risk

### Standard Deviation
Standard deviation measures the dispersion of returns around the average return, providing a statistical measure of volatility.

### Beta
Beta measures a stock's volatility relative to the overall market. A beta of:
- 1.0 means the stock moves in line with the market
- >1.0 means the stock is more volatile than the market
- <1.0 means the stock is less volatile than the market

## Understanding Return

Return is the gain or loss on an investment over a specified period, usually expressed as a percentage.

### Components of Return

1. **Capital Gains/Losses**: Changes in the price of an investment
2. **Income**: Dividends or interest received

### Measuring Return

#### Simple Return
R = (Ending Value - Beginning Value + Income) / Beginning Value

#### Annualized Return
For periods other than one year, returns are often annualized:
Annualized Return = (1 + R)^(365/days) - 1

## The Risk-Return Tradeoff

The concept that potential return rises with an increase in risk. Low levels of risk are associated with low potential returns, while high levels of risk are associated with high potential returns.

### Efficient Frontier

The efficient frontier represents the set of optimal portfolios that offer the highest expected return for a defined level of risk or the lowest risk for a given level of expected return.

## Risk Management Strategies

### Diversification
Spreading investments across various asset classes to reduce exposure to any single asset or risk.

### Asset Allocation
The process of dividing investments among different asset categories (stocks, bonds, cash) based on risk tolerance, goals, and investment timeline.

### Hedging
Using financial instruments or strategies to offset the risk of adverse price movements.

## Modern Portfolio Theory (MPT)

Developed by Harry Markowitz, MPT suggests that by combining assets with different correlations, investors can create portfolios with better risk-return profiles than any individual asset.
        `,
        duration: 35,
        quizId: '',
        completed: false
      },
    ]
  },
  {
    id: 'accounting-principles',
    title: 'Accounting Principles',
    description: 'Master the foundational concepts of accounting, including the accounting cycle, financial statements, and basic bookkeeping practices.',
    level: 'beginner',
    progress: 0,
    modules: [
      {
        id: 'accounting-1',
        title: 'Introduction to Accounting',
        description: 'Understand the purpose and importance of accounting in business.',
        content: '<h1>Introduction to Accounting</h1><p>Accounting is the language of business. It measures the results of an organization\'s economic activities and conveys this information to management, investors, creditors, and others.</p><h2>Learning Objectives</h2><ul><li>Explain the role of accounting in business and society</li><li>Distinguish between financial and managerial accounting</li><li>Identify key users of accounting information</li></ul>',
        duration: 25,
        quizId: '',
        completed: false
      },
      {
        id: 'accounting-2',
        title: 'The Accounting Equation',
        description: 'Learn the fundamental accounting equation and how it forms the basis of the double-entry system.',
        content: '<h1>The Accounting Equation</h1><p>The accounting equation (Assets = Liabilities + Equity) is the foundation of the double-entry bookkeeping system. It shows that a company\'s assets are financed by either debt or equity.</p><h2>Key Concepts</h2><ul><li>Understanding assets, liabilities, and equity</li><li>Analyzing transactions using the accounting equation</li><li>Maintaining the balance in the accounting equation</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      },
      {
        id: 'accounting-3',
        title: 'Financial Statements',
        description: 'Explore the primary financial statements: income statement, balance sheet, and cash flow statement.',
        content: '<h1>Financial Statements</h1><p>Financial statements provide a structured representation of a company\'s financial position and performance. They are the end product of the accounting process.</p><h2>Types of Financial Statements</h2><ul><li>Balance Sheet: Reports assets, liabilities, and equity</li><li>Income Statement: Reports revenues and expenses</li><li>Statement of Cash Flows: Reports cash inflows and outflows</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'economics-basics',
    title: 'Economics for Finance',
    description: 'Understand key economic principles that impact financial markets and decision-making.',
    level: 'beginner',
    progress: 0,
    modules: [
      {
        id: 'economics-1',
        title: 'Microeconomic Principles',
        description: 'Learn about supply, demand, and market equilibrium.',
        content: '<h1>Microeconomic Principles</h1><p>Microeconomics studies the behavior of individuals and firms in making decisions regarding the allocation of scarce resources.</p><h2>Key Topics</h2><ul><li>Supply and demand analysis</li><li>Consumer and producer surplus</li><li>Market structures and competition</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      },
      {
        id: 'economics-2',
        title: 'Macroeconomic Factors',
        description: 'Explore GDP, inflation, unemployment, and economic cycles.',
        content: '<h1>Macroeconomic Factors</h1><p>Macroeconomics studies economy-wide phenomena such as inflation, GDP, and unemployment.</p><h2>Important Indicators</h2><ul><li>Gross Domestic Product (GDP)</li><li>Consumer Price Index (CPI) and inflation</li><li>Unemployment rate and labor market conditions</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'economics-3',
        title: 'Economic Policy',
        description: 'Understand monetary and fiscal policy and their impact on financial markets.',
        content: '<h1>Economic Policy</h1><p>Economic policies are actions that governments take to influence the economy.</p><h2>Policy Types</h2><ul><li>Monetary policy: Interest rates and money supply</li><li>Fiscal policy: Government spending and taxation</li><li>Policy impacts on financial markets</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      }
    ]
  },
  
  // Intermediate Level Courses
  {
    id: 'corporate-finance',
    title: 'Corporate Finance Essentials',
    description: 'Understand how corporations make financial decisions, manage capital structure, and evaluate investments.',
    level: 'intermediate',
    progress: 35,
    modules: [
      {
        id: 'corporate-finance-1',
        title: 'Capital Structure and Financing Decisions',
        description: 'Learn how companies choose between debt and equity financing.',
        content: '<h1>Capital Structure and Financing Decisions</h1><p>Capital structure refers to how a company finances its operations through a combination of debt and equity.</p><h2>Key Concepts</h2><ul><li>Optimal capital structure theories</li><li>Cost of capital calculation</li><li>Debt vs. equity financing considerations</li></ul>',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'corporate-finance-2',
        title: 'Capital Budgeting',
        description: 'Understand how companies evaluate and select long-term investment projects.',
        content: '<h1>Capital Budgeting</h1><p>Capital budgeting is the process companies use to evaluate potential major investments or expenditures.</p><h2>Evaluation Methods</h2><ul><li>Net Present Value (NPV)</li><li>Internal Rate of Return (IRR)</li><li>Payback Period</li><li>Profitability Index</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'corporate-finance-3',
        title: 'Working Capital Management',
        description: 'Learn strategies for effectively managing a company\'s current assets and liabilities.',
        content: '<h1>Working Capital Management</h1><p>Working capital management involves optimizing the company\'s current assets and liabilities to ensure operational efficiency.</p><h2>Components</h2><ul><li>Cash management techniques</li><li>Inventory control methods</li><li>Accounts receivable policies</li><li>Short-term financing options</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      },
      {
        id: 'corporate-finance-4',
        title: 'Dividend Policy',
        description: 'Understand how companies make decisions about paying dividends to shareholders.',
        content: '<h1>Dividend Policy</h1><p>Dividend policy determines how much of a company\'s profits are distributed to shareholders versus retained for growth.</p><h2>Policy Considerations</h2><ul><li>Dividend payout ratios</li><li>Dividend stability</li><li>Share repurchases as alternatives</li><li>Impact on company valuation</li></ul>',
        duration: 25,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'investments',
    title: 'Investment Analysis and Portfolio Management',
    description: 'Learn how to analyze securities, construct portfolios, and manage investment risk.',
    level: 'intermediate',
    progress: 0,
    modules: [
      {
        id: 'investments-1',
        title: 'Asset Classes and Markets',
        description: 'Explore various asset classes and the markets where they are traded.',
        content: '<h1>Asset Classes and Markets</h1><p>Understanding different investment vehicles and their characteristics is essential for portfolio construction.</p><h2>Major Asset Classes</h2><ul><li>Equities: Characteristics and valuation</li><li>Fixed income securities: Bonds and yield curves</li><li>Alternative investments: Real estate, commodities, private equity</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'investments-2',
        title: 'Modern Portfolio Theory',
        description: 'Understand risk, return, and diversification in portfolio construction.',
        content: '<h1>Modern Portfolio Theory</h1><p>Modern Portfolio Theory (MPT) explains how rational investors use diversification to optimize their investment portfolios.</p><h2>Core Concepts</h2><ul><li>Risk and return relationship</li><li>Diversification benefits</li><li>Efficient frontier and optimal portfolios</li></ul>',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'investments-3',
        title: 'Security Analysis',
        description: 'Learn fundamental and technical analysis techniques for evaluating securities.',
        content: '<h1>Security Analysis</h1><p>Security analysis is the process of evaluating securities for investment opportunities.</p><h2>Analysis Approaches</h2><ul><li>Fundamental analysis: Financial statement analysis, industry analysis, economic forecasting</li><li>Technical analysis: Chart patterns, indicators, trend identification</li><li>Behavioral considerations in security pricing</li></ul>',
        duration: 45,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'financial-markets',
    title: 'Financial Markets and Institutions',
    description: 'Understand the structure and function of financial markets and the institutions that operate within them.',
    level: 'intermediate',
    progress: 0,
    modules: [
      {
        id: 'markets-1',
        title: 'Money Markets',
        description: 'Explore short-term debt instruments and their role in liquidity management.',
        content: '<h1>Money Markets</h1><p>Money markets deal in short-term, highly liquid debt securities.</p><h2>Instruments</h2><ul><li>Treasury bills</li><li>Commercial paper</li><li>Certificates of deposit</li><li>Repurchase agreements</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      },
      {
        id: 'markets-2',
        title: 'Capital Markets',
        description: 'Learn about long-term financing through stocks and bonds.',
        content: '<h1>Capital Markets</h1><p>Capital markets enable businesses and governments to raise long-term funds.</p><h2>Primary Components</h2><ul><li>Equity markets: IPO process, secondary markets</li><li>Bond markets: Government, municipal, and corporate bonds</li><li>Market efficiency concepts</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'markets-3',
        title: 'Financial Institutions',
        description: 'Understand banks, insurance companies, and other financial intermediaries.',
        content: '<h1>Financial Institutions</h1><p>Financial institutions serve as intermediaries between savers and borrowers.</p><h2>Types of Institutions</h2><ul><li>Commercial banks</li><li>Investment banks</li><li>Insurance companies</li><li>Pension funds</li><li>Mutual funds and ETFs</li></ul>',
        duration: 30,
        quizId: '',
        completed: false
      }
    ]
  },
  
  // Advanced Level Courses
  {
    id: 'stock-analysis',
    title: 'Stock Analysis: Fundamental & Technical',
    description: 'Master both fundamental and technical analysis approaches to evaluating stocks.',
    level: 'advanced',
    progress: 0,
    modules: [
      {
        id: 'stock-analysis-1',
        title: 'Fundamental Analysis Basics',
        description: 'Learn how to evaluate a company\'s financial health and growth prospects.',
        content: '<h1>Fundamental Analysis Basics</h1><p>Fundamental analysis involves examining a company\'s financial statements, industry position, and economic environment to determine its intrinsic value.</p><h2>Key Components</h2><ul><li>Financial statement analysis techniques</li><li>Ratio analysis: Profitability, liquidity, solvency</li><li>Growth rate estimation</li></ul>',
        duration: 45,
        quizId: '',
        completed: false
      },
      {
        id: 'stock-analysis-2',
        title: 'Technical Analysis Foundations',
        description: 'Understand price patterns, indicators, and chart analysis.',
        content: '<h1>Technical Analysis Foundations</h1><p>Technical analysis uses past price movement data to forecast future price movements.</p><h2>Technical Tools</h2><ul><li>Chart patterns: Head and shoulders, double tops/bottoms</li><li>Moving averages and crossovers</li><li>Momentum oscillators: RSI, MACD</li><li>Volume analysis</li></ul>',
        duration: 50,
        quizId: '',
        completed: false
      },
      {
        id: 'stock-analysis-3',
        title: 'Valuation Models',
        description: 'Explore discounted cash flow, relative valuation, and other stock valuation methods.',
        content: '<h1>Valuation Models</h1><p>Valuation models provide frameworks for determining the fair price of a stock.</p><h2>Common Models</h2><ul><li>Discounted Cash Flow (DCF) analysis</li><li>Relative valuation: P/E, P/B, EV/EBITDA</li><li>Dividend discount models</li><li>Free cash flow to equity models</li></ul>',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'stock-analysis-4',
        title: 'Advanced Chart Patterns',
        description: 'Master complex technical patterns and indicators for trading decisions.',
        content: '<h1>Advanced Chart Patterns</h1><p>Beyond basic patterns, advanced technical analysis involves more complex formations and indicators.</p><h2>Advanced Topics</h2><ul><li>Elliott Wave Theory</li><li>Fibonacci retracement levels</li><li>Ichimoku Cloud</li><li>Advanced candlestick patterns</li></ul>',
        duration: 45,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'derivatives',
    title: 'Derivatives and Risk Management',
    description: 'Study options, futures, swaps, and their applications in managing financial risk.',
    level: 'advanced',
    progress: 0,
    modules: [
      {
        id: 'derivatives-1',
        title: 'Options Fundamentals',
        description: 'Learn the basics of options contracts, terminology, and pricing.',
        content: '<h1>Options Fundamentals</h1><p>Options provide the right, but not the obligation, to buy or sell an underlying asset at a predetermined price.</p><h2>Key Concepts</h2><ul><li>Calls and puts</li><li>Strike prices and expiration</li><li>Option payoff diagrams</li><li>Basic options strategies</li></ul>',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'derivatives-2',
        title: 'Futures Markets',
        description: 'Explore futures contracts and their role in commodity and financial markets.',
        content: '<h1>Futures Markets</h1><p>Futures contracts obligate parties to buy or sell an asset at a predetermined price at a specified time.</p><h2>Market Mechanics</h2><ul><li>Contract specifications</li><li>Margin requirements</li><li>Contango and backwardation</li><li>Hedging with futures</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'derivatives-3',
        title: 'Swaps and Forward Contracts',
        description: 'Understand interest rate swaps, currency swaps, and forward agreements.',
        content: '<h1>Swaps and Forward Contracts</h1><p>Swaps are agreements to exchange cash flows or liabilities, while forwards are customized contracts to buy or sell an asset.</p><h2>Contract Types</h2><ul><li>Interest rate swaps</li><li>Currency swaps</li><li>Commodity swaps</li><li>Forward rate agreements</li></ul>',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'derivatives-4',
        title: 'Risk Management Applications',
        description: 'Learn how derivatives are used to hedge various financial risks.',
        content: '<h1>Risk Management Applications</h1><p>Derivatives serve as powerful tools for managing financial risks in various contexts.</p><h2>Hedging Strategies</h2><ul><li>Interest rate risk hedging</li><li>Foreign exchange risk management</li><li>Commodity price risk mitigation</li><li>Portfolio insurance techniques</li></ul>',
        duration: 45,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'financial-modeling',
    title: 'Advanced Financial Modeling',
    description: 'Build sophisticated financial models for valuation, forecasting, and decision support.',
    level: 'advanced',
    progress: 0,
    pathId: 'planning',
    modules: [
      {
        id: 'modeling-1',
        title: 'Financial Modeling Principles',
        description: 'Learn the core concepts and best practices in financial model development.',
        content: '<h1>Financial Modeling Principles</h1><p>Financial models are mathematical representations of a company\'s financials used for analysis and forecasting.</p><h2>Best Practices</h2><ul><li>Model structure and organization</li><li>Documentation standards</li><li>Input-process-output methodology</li><li>Model validation techniques</li></ul>',
        duration: 35,
        quizId: '',
        completed: false
      },
      {
        id: 'modeling-2',
        title: 'Three-Statement Modeling',
        description: 'Build integrated income statement, balance sheet, and cash flow models.',
        content: '<h1>Three-Statement Modeling</h1><p>Three-statement modeling connects the income statement, balance sheet, and cash flow statement in a dynamic financial model.</p><h2>Model Components</h2><ul><li>Revenue and expense forecasting</li><li>Balance sheet projections</li><li>Cash flow derivation</li><li>Balancing mechanisms</li></ul>',
        duration: 50,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'planning-analytics',
    title: 'Financial Planning & Analytics',
    description: 'Master financial planning and analysis techniques for business decision support.',
    level: 'intermediate',
    progress: 20,
    pathId: 'planning',
    modules: [
      {
        id: 'plan-1',
        title: 'Financial Modeling Fundamentals',
        description: 'Build foundational skills in financial modeling and analysis.',
        content: '<h1>Financial Modeling Fundamentals</h1><p>Learn to build structured and flexible financial models.</p>',
        duration: 40,
        quizId: '',
        completed: true
      },
      {
        id: 'plan-2',
        title: 'Budgeting and Forecasting',
        description: 'Develop comprehensive budgets and financial forecasts.',
        content: '<h1>Budgeting and Forecasting</h1><p>Master techniques for creating accurate budgets and forecasts.</p>',
        duration: 35,
        quizId: '',
        completed: false
      }
    ]
  }
];
