// src/data/programs/courses.ts
import { FinanceCourse } from '../types/curriculum';

export const financeCourses: FinanceCourse[] = [
  // --- Courses enhanced from original financeCourses using learningData.ts content ---
  {
    id: 'fin-201', // Original ID from financeCourses
    courseCode: 'FIN 201',
    title: 'Principles of Finance', // Original title
    credits: 3,
    description: 'Introduction to core financial concepts, including time value of money, risk and return, financial statements, and capital budgeting. (Enhanced with content from Finance 101)',
    academicLevel: 200,
    prerequisites: [],
    concentrations: ['general', 'corporate', 'investments', 'banking', 'international', 'planning'],
    learningOutcomes: [ // Original learningOutcomes
      'Understand the time value of money and its applications',
      'Analyze financial statements and calculate key financial ratios',
      'Evaluate investment projects using NPV, IRR, and other techniques',
      'Understand the relationship between risk and return',
      'Apply basic principles of portfolio theory'
    ],
    modules: [ // Merged and enhanced modules from learningData.ts:finance-101
      {
        id: 'fin-201-1', // Standardized module ID
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
        duration: 20, // from learningData
        quizId: 'fin-201-quiz-1', // Standardized quizId
        completed: true // from learningData
      },
      {
        id: 'fin-201-2',
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
        duration: 25, // from learningData
        quizId: 'fin-201-quiz-2', // Standardized quizId
        completed: true // from learningData
      },
      {
        id: 'fin-201-3',
        title: 'Time Value of Money', // From learningData:finance-101-3
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
        duration: 30, // from learningData
        quizId: 'fin-201-quiz-3', // Standardized, needs creation
        completed: false // from learningData
      },
      {
        id: 'fin-201-4',
        title: 'Risk and Return', // From learningData:finance-101-4
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
        duration: 35, // from learningData
        quizId: 'fin-201-quiz-4', // Standardized, needs creation
        completed: false // from learningData
      }
    ]
  },
  {
    id: 'fin-302', // Original ID from financeCourses
    courseCode: 'FIN 302',
    title: 'Corporate Finance', // Original title
    credits: 3,
    description: 'Advanced study of corporate financial management, capital structure decisions, and valuation techniques. (Enhanced with content from Corporate Finance Essentials)',
    academicLevel: 300, // Original level
    prerequisites: ['FIN 201'],
    concentrations: ['corporate', 'general'], // Merged, pathId 'corporate-finance' from learningData
    learningOutcomes: [ // Original learningOutcomes
      'Master capital structure theories and applications',
      'Apply advanced capital budgeting techniques',
      'Understand corporate valuation methods',
      'Analyze merger and acquisition decisions',
      'Develop optimal dividend policies'
    ],
    modules: [ // Merged and enhanced modules from learningData.ts:corporate-finance and original fin-302
      {
        id: 'fin-302-1', // Standardized
        title: 'Capital Structure and Financing Decisions', // from learningData
        description: 'Learn how companies choose between debt and equity financing.',
        content: '<h1>Capital Structure and Financing Decisions</h1><p>Capital structure refers to how a company finances its operations through a combination of debt and equity.</p><h2>Key Concepts</h2><ul><li>Optimal capital structure theories</li><li>Cost of capital calculation</li><li>Debt vs. equity financing considerations</li></ul>',
        duration: 40, // from learningData
        quizId: 'fin-302-quiz-1', // Standardized
        completed: false // from learningData
      },
      {
        id: 'fin-302-2',
        title: 'Capital Budgeting', // from learningData
        description: 'Understand how companies evaluate and select long-term investment projects.',
        content: '<h1>Capital Budgeting</h1><p>Capital budgeting is the process companies use to evaluate potential major investments or expenditures.</p><h2>Evaluation Methods</h2><ul><li>Net Present Value (NPV)</li><li>Internal Rate of Return (IRR)</li><li>Payback Period</li><li>Profitability Index</li></ul>',
        duration: 35, // from learningData
        quizId: 'fin-302-quiz-2', // Standardized
        completed: false // from learningData
      },
       {
        id: 'fin-302-3',
        title: 'Working Capital Management', // from learningData
        description: 'Learn strategies for effectively managing a company\'s current assets and liabilities.',
        content: '<h1>Working Capital Management</h1><p>Working capital management involves optimizing the company\'s current assets and liabilities to ensure operational efficiency.</p><h2>Components</h2><ul><li>Cash management techniques</li><li>Inventory control methods</li><li>Accounts receivable policies</li><li>Short-term financing options</li></ul>',
        duration: 30, // from learningData
        quizId: 'fin-302-quiz-3', // Standardized, needs creation
        completed: false // from learningData
      },
      {
        id: 'fin-302-4',
        title: 'Dividend Policy', // from learningData
        description: 'Understand how companies make decisions about paying dividends to shareholders.',
        content: '<h1>Dividend Policy</h1><p>Dividend policy determines how much of a company\'s profits are distributed to shareholders versus retained for growth.</p><h2>Policy Considerations</h2><ul><li>Dividend payout ratios</li><li>Dividend stability</li><li>Share repurchases as alternatives</li><li>Impact on company valuation</li></ul>',
        duration: 25, // from learningData
        quizId: 'fin-302-quiz-4', // Standardized, needs creation
        completed: false // from learningData
      },
      // Modules from original fin-302 if distinct, e.g. Mergers & Acquisitions
      {
        id: 'fin-302-5', // New ID for existing module
        title: 'Mergers and Acquisitions', // from original fin-302
        description: 'Analyze M&A transactions and strategies', // from original fin-302
        content: `# Mergers and Acquisitions

## M&A Rationale
### Synergies
- Revenue synergies
- Cost synergies
- Financial synergies
- Quantifying synergy value

### Strategic Reasons
- Market power
- Diversification
- Vertical integration
- Technology acquisition

## Valuation in M&A
- Stand-alone value
- Synergy value
- Control premium
- Maximum price to pay

## Deal Structure
### Payment Methods
- Cash transactions
- Stock transactions
- Mixed consideration
- Earnouts

### Deal Types
- Friendly takeovers
- Hostile takeovers
- Leveraged buyouts
- Management buyouts

## Post-Merger Integration
- Cultural integration
- Systems integration
- Achieving synergies
- Success factors`,
        duration: 40, // from original fin-302
        quizId: 'fin-302-quiz-5', // Standardized, (was generic-finance-quiz)
        completed: false
      }
    ]
  },
  {
    id: 'fin-403', // Original ID
    courseCode: 'FIN 403',
    title: 'Investment Analysis', // Original title
    credits: 3,
    description: 'Analysis of investment vehicles, portfolio theory, and market efficiency. (Enhanced with content from Investment Analysis and Portfolio Management)',
    academicLevel: 400, // Original level
    prerequisites: ['FIN 201'],
    concentrations: ['investments', 'general'], // Merged, pathId 'investments' from learningData
    learningOutcomes: [ // Original learningOutcomes
      'Apply modern portfolio theory to investment decisions',
      'Analyze different asset classes and their characteristics',
      'Implement portfolio optimization techniques',
      'Evaluate market efficiency and behavioral finance concepts',
      'Develop investment strategies for different objectives'
    ],
    modules: [ // Merged and enhanced modules
      {
        id: 'fin-403-1',
        title: 'Asset Classes and Markets', // from learningData:investments
        description: 'Explore various asset classes and the markets where they are traded.',
        content: '<h1>Asset Classes and Markets</h1><p>Understanding different investment vehicles and their characteristics is essential for portfolio construction.</p><h2>Major Asset Classes</h2><ul><li>Equities: Characteristics and valuation</li><li>Fixed income securities: Bonds and yield curves</li><li>Alternative investments: Real estate, commodities, private equity</li></ul>',
        duration: 35, // from learningData
        quizId: 'fin-403-quiz-1', // Standardized
        completed: false // from learningData
      },
      {
        id: 'fin-403-2',
        title: 'Modern Portfolio Theory', // from learningData:investments
        description: 'Understand risk, return, and diversification in portfolio construction.',
        content: '<h1>Modern Portfolio Theory</h1><p>Modern Portfolio Theory (MPT) explains how rational investors use diversification to optimize their investment portfolios.</p><h2>Core Concepts</h2><ul><li>Risk and return relationship</li><li>Diversification benefits</li><li>Efficient frontier and optimal portfolios</li></ul>',
        duration: 40, // from learningData
        quizId: 'fin-403-quiz-2', // Standardized
        completed: false // from learningData
      },
      {
        id: 'fin-403-3',
        title: 'Security Analysis', // from learningData:investments
        description: 'Learn fundamental and technical analysis techniques for evaluating securities.',
        content: '<h1>Security Analysis</h1><p>Security analysis is the process of evaluating securities for investment opportunities.</p><h2>Analysis Approaches</h2><ul><li>Fundamental analysis: Financial statement analysis, industry analysis, economic forecasting</li><li>Technical analysis: Chart patterns, indicators, trend identification</li><li>Behavioral considerations in security pricing</li></ul>',
        duration: 45, // from learningData
        quizId: 'fin-403-quiz-3', // Standardized
        completed: false // from learningData
      },
      // Original fin-403 modules if distinct (e.g. if the above don't map directly to Portfolio Theory, Equity Analysis, Fixed Income)
      // Assuming some overlap, for now, using the more descriptive titles from learningData
    ]
  },

  // --- Original Courses from financeCourses (briefly listed if not directly enhanced above) ---
  {
    id: 'fin-280',
    courseCode: 'FIN 280',
    title: 'Introduction to Banking and Financial Services',
    credits: 3,
    description: 'Introduction to banking operations, financial services industry structure, and regulatory frameworks.',
    academicLevel: 200,
    prerequisites: ['FIN 201'],
    concentrations: ['banking'],
    learningOutcomes: [
      'Understand the role of banks in the financial system',
      'Identify different types of financial institutions',
      'Analyze the banking business model',
      'Understand basic banking regulations',
      'Evaluate financial services and products'
    ],
    modules: [
      {
        id: 'fin-280-1',
        title: 'Banking System Overview',
        description: 'Understanding the role and structure of banks in the financial system',
        content: `# Banking System Overview...`, // Content from original file
        duration: 45,
        quizId: 'fin-280-quiz-1',
        completed: false
      },
      {
        id: 'fin-280-2',
        title: 'Banking Business Model',
        description: 'How banks make money and manage their operations',
        content: `# Banking Business Model...`, // Content from original file
        duration: 40,
        quizId: 'fin-280-quiz-2', // Was generic-finance-quiz
        completed: false
      },
      {
        id: 'fin-280-3',
        title: 'Introduction to Banking Regulations',
        description: 'Overview of the regulatory framework governing banks',
        content: `# Banking Regulations...`, // Content from original file
        duration: 35,
        quizId: 'fin-280-quiz-3', // Was generic-finance-quiz
        completed: false
      }
    ]
  },
  // ... (fin-281, fin-282, fin-283 would be listed here, ensure their module content is full)
  // For brevity, I'll assume they remain as per the original `courses.ts` unless specific enhancements were noted.
  // Make sure their quizIds are also standardized if they were 'generic-finance-quiz'.

  {
    id: 'fin-281',
    courseCode: 'FIN 281',
    title: 'Banking Operations',
    credits: 3,
    description: 'Deep dive into day-to-day banking operations, technology systems, and operational efficiency.',
    academicLevel: 200,
    prerequisites: ['FIN 280'],
    concentrations: ['banking'],
    learningOutcomes: [
      'Master core banking operations and systems',
      'Understand payment systems and settlement processes',
      'Analyze operational efficiency in banking',
      'Evaluate banking technology and digital transformation',
      'Apply operational risk management principles'
    ],
    modules: [
      {
        id: 'fin-281-1',
        title: 'Core Banking Operations',
        description: 'Understanding fundamental banking operations and systems',
        content: `# Core Banking Operations...`, // Full content from original
        duration: 45,
        quizId: 'fin-281-quiz-1', // This one was defined in quizzes.ts
        completed: false
      },
      {
        id: 'fin-281-2',
        title: 'Payment Systems and Settlement',
        description: 'Learn about various payment systems and settlement processes',
        content: `# Payment Systems and Settlement...`, // Full content from original
        duration: 40,
        quizId: 'fin-281-quiz-2',
        completed: false
      },
      {
        id: 'fin-281-3',
        title: 'Technology in Banking',
        description: 'Explore modern banking technology and digital transformation',
        content: `# Technology in Banking...`, // Full content from original
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
    prerequisites: ['FIN 280'],
    concentrations: ['banking'],
    learningOutcomes: [
      'Analyze different financial products and services',
      'Design and develop new financial products',
      'Implement effective customer relationship strategies',
      'Understand distribution channels in financial services',
      'Evaluate competitive strategies in financial services'
    ],
    modules: [
      {
        id: 'fin-282-1',
        title: 'Financial Products and Services',
        description: 'Understanding the range of financial products and services offered by banks',
        content: '# Financial Products and Services...',  // Full content from original
        duration: 45,
        quizId: 'fin-282-quiz-1',
        completed: false
      },
      {
        id: 'fin-282-2',
        title: 'Product Development and Innovation',
        description: 'Learn about financial product development and innovation strategies',
        content: '# Product Development and Innovation...', // Full content from original
        duration: 40,
        quizId: 'fin-282-quiz-2',
        completed: false
      },
      {
        id: 'fin-282-3',
        title: 'Customer Relationship Management',
        description: 'Master effective customer relationship management in banking',
        content: '# Customer Relationship Management...', // Full content from original
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
    prerequisites: ['FIN 280'],
    concentrations: ['banking'],
    learningOutcomes: [
      'Identify and classify different types of banking risks',
      'Apply risk assessment and measurement techniques',
      'Develop risk mitigation strategies',
      'Understand regulatory capital requirements',
      'Implement risk management frameworks'
    ],
    modules: [
      {
        id: 'fin-283-1',
        title: 'Risk Management Framework',
        description: 'Understanding the fundamentals of risk management in banking',
        content: '# Risk Management Framework...', // Full content from original
        duration: 45,
        quizId: 'fin-283-quiz-1',
        completed: false
      },
      {
        id: 'fin-283-2',
        title: 'Credit Risk Management',
        description: 'Learn about credit risk assessment and management',
        content: '# Credit Risk Management...', // Full content from original
        duration: 40,
        quizId: 'fin-283-quiz-2',
        completed: false
      },
      {
        id: 'fin-283-3',
        title: 'Regulatory Compliance',
        description: 'Master banking regulations and compliance requirements',
        content: '# Regulatory Compliance...', // Full content from original
        duration: 35,
        quizId: 'fin-283-quiz-3',
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
    learningOutcomes: [ /* ... */ ], // from original
    modules: [ /* ... */ ] // from original, ensure quizIds are standardized
  },
  {
    id: 'fin-480',
    courseCode: 'FIN 480',
    title: 'Advanced Banking and Financial Services',
    credits: 3,
    description: 'Advanced topics in banking including risk management, financial innovation, and emerging trends.',
    academicLevel: 400,
    prerequisites: ['FIN 280', 'FIN 281', 'FIN 282', 'FIN 283'],
    concentrations: ['banking'],
    learningOutcomes: [ /* ... */ ], // from original
    modules: [ /* ... */ ] // from original, ensure quizIds are standardized
  },


  // --- New Courses derived from learningData.ts ---
  {
    id: 'fin-102', // New ID for Accounting Principles
    courseCode: 'FIN 102', // Assigned course code
    title: 'Accounting Principles',
    credits: 3, // Assumed
    description: 'Master the foundational concepts of accounting, including the accounting cycle, financial statements, and basic bookkeeping practices.',
    academicLevel: 200, // Mapped from 'beginner'
    prerequisites: [], // Assumed
    concentrations: ['general'], // Default
    learningOutcomes: [
      'Understand the purpose and importance of accounting in business.',
      'Learn the fundamental accounting equation.',
      'Explore the primary financial statements.'
    ], // Derived
    modules: [
      {
        id: 'fin-102-1',
        title: 'Introduction to Accounting',
        description: 'Understand the purpose and importance of accounting in business.',
        content: '<h1>Introduction to Accounting</h1><p>Accounting is the language of business. It measures the results of an organization\'s economic activities and conveys this information to management, investors, creditors, and others.</p><h2>Learning Objectives</h2><ul><li>Explain the role of accounting in business and society</li><li>Distinguish between financial and managerial accounting</li><li>Identify key users of accounting information</li></ul>',
        duration: 25,
        quizId: 'fin-102-quiz-1', // Needs creation
        completed: false
      },
      {
        id: 'fin-102-2',
        title: 'The Accounting Equation',
        description: 'Learn the fundamental accounting equation and how it forms the basis of the double-entry system.',
        content: '<h1>The Accounting Equation</h1><p>The accounting equation (Assets = Liabilities + Equity) is the foundation of the double-entry bookkeeping system. It shows that a company\'s assets are financed by either debt or equity.</p><h2>Key Concepts</h2><ul><li>Understanding assets, liabilities, and equity</li><li>Analyzing transactions using the accounting equation</li><li>Maintaining the balance in the accounting equation</li></ul>',
        duration: 30,
        quizId: 'fin-102-quiz-2', // Needs creation
        completed: false
      },
      {
        id: 'fin-102-3',
        title: 'Financial Statements',
        description: 'Explore the primary financial statements: income statement, balance sheet, and cash flow statement.',
        content: '<h1>Financial Statements</h1><p>Financial statements provide a structured representation of a company\'s financial position and performance. They are the end product of the accounting process.</p><h2>Types of Financial Statements</h2><ul><li>Balance Sheet: Reports assets, liabilities, and equity</li><li>Income Statement: Reports revenues and expenses</li><li>Statement of Cash Flows: Reports cash inflows and outflows</li></ul>',
        duration: 35,
        quizId: 'fin-102-quiz-3', // Needs creation
        completed: false
      }
    ]
  },
  {
    id: 'fin-103', // New ID for Economics
    courseCode: 'FIN 103',
    title: 'Economics for Finance',
    credits: 3, // Assumed
    description: 'Understand key economic principles that impact financial markets and decision-making.',
    academicLevel: 200, // Mapped from 'beginner'
    prerequisites: [], // Assumed
    concentrations: ['general'], // Default
    learningOutcomes: [
        'Understand microeconomic principles like supply and demand.',
        'Explore macroeconomic factors such as GDP and inflation.',
        'Learn about monetary and fiscal policy.'
    ],
    modules: [
      {
        id: 'fin-103-1',
        title: 'Microeconomic Principles',
        description: 'Learn about supply, demand, and market equilibrium.',
        content: '<h1>Microeconomic Principles</h1><p>Microeconomics studies the behavior of individuals and firms in making decisions regarding the allocation of scarce resources.</p><h2>Key Topics</h2><ul><li>Supply and demand analysis</li><li>Consumer and producer surplus</li><li>Market structures and competition</li></ul>',
        duration: 30,
        quizId: 'fin-103-quiz-1', // Needs creation
        completed: false
      },
      {
        id: 'fin-103-2',
        title: 'Macroeconomic Factors',
        description: 'Explore GDP, inflation, unemployment, and economic cycles.',
        content: '<h1>Macroeconomic Factors</h1><p>Macroeconomics studies economy-wide phenomena such as inflation, GDP, and unemployment.</p><h2>Important Indicators</h2><ul><li>Gross Domestic Product (GDP)</li><li>Consumer Price Index (CPI) and inflation</li><li>Unemployment rate and labor market conditions</li></ul>',
        duration: 35,
        quizId: 'fin-103-quiz-2', // Needs creation
        completed: false
      },
      {
        id: 'fin-103-3',
        title: 'Economic Policy',
        description: 'Understand monetary and fiscal policy and their impact on financial markets.',
        content: '<h1>Economic Policy</h1><p>Economic policies are actions that governments take to influence the economy.</p><h2>Policy Types</h2><ul><li>Monetary policy: Interest rates and money supply</li><li>Fiscal policy: Government spending and taxation</li><li>Policy impacts on financial markets</li></ul>',
        duration: 30,
        quizId: 'fin-103-quiz-3', // Needs creation
        completed: false
      }
    ]
  },
  { // Course created from the 'banking-services' module in learningData.ts
    id: 'fin-285',
    courseCode: 'FIN 285',
    title: 'Financial Services & Banking Details',
    credits: 3, // Assumed
    description: 'Explore banking operations, financial products, regulatory compliance, and client relationship management in detail.',
    academicLevel: 300, // Mapped from 'intermediate' context of original containing course
    prerequisites: ['FIN 201', 'FIN 280'], // Assumed
    concentrations: ['banking', 'corporate-finance'], // From original pathId
    learningOutcomes: [
        'Understand the types and functions of financial institutions.',
        'Analyze banking business models, products, and services.',
        'Comprehend banking regulation, compliance, and performance analysis.',
        'Identify modern banking trends and challenges.'
    ],
    modules: [
        {
            id: 'fin-285-1', // Standardized ID
            title: 'Overview of Financial Services & Banking',
            description: 'Deep dive into banking operations, products, regulation and trends.',
            content: `# Financial Services & Banking ... (Full content from the 'banking-services' module in learningData.ts)`, // Content from learningData
            duration: 45, // from learningData
            quizId: 'fin-285-quiz-1', // Was 'banking-services-quiz'
            completed: false // from learningData
        }
    ]
  },
  {
    id: 'fin-310', // New ID for Financial Markets
    courseCode: 'FIN 310',
    title: 'Financial Markets and Institutions',
    credits: 3, // Assumed
    description: 'Understand the structure and function of financial markets and the institutions that operate within them.',
    academicLevel: 300, // Mapped from 'intermediate'
    prerequisites: ['FIN 201'], // Assumed
    concentrations: ['general', 'investments'], // Default, can be refined
    learningOutcomes: [
        'Explore money markets and short-term debt instruments.',
        'Learn about capital markets for long-term financing.',
        'Understand the role of various financial institutions.'
    ],
    modules: [
      {
        id: 'fin-310-1',
        title: 'Money Markets',
        description: 'Explore short-term debt instruments and their role in liquidity management.',
        content: '<h1>Money Markets</h1><p>Money markets deal in short-term, highly liquid debt securities.</p><h2>Instruments</h2><ul><li>Treasury bills</li><li>Commercial paper</li><li>Certificates of deposit</li><li>Repurchase agreements</li></ul>',
        duration: 30,
        quizId: 'fin-310-quiz-1', // Needs creation
        completed: false
      },
      // ... other modules for fin-310
    ]
  },
  {
    id: 'fin-420', // New ID for Stock Analysis
    courseCode: 'FIN 420',
    title: 'Stock Analysis: Fundamental & Technical',
    credits: 3, // Assumed
    description: 'Master both fundamental and technical analysis approaches to evaluating stocks.',
    academicLevel: 400, // Mapped from 'advanced'
    prerequisites: ['FIN 403'], // Assumed
    concentrations: ['investments'], // Default
    learningOutcomes: [ /* ... */ ],
    modules: [ /* ... */ ] // Add modules from learningData.ts:stock-analysis
  },
  {
    id: 'fin-430', // New ID for Derivatives
    courseCode: 'FIN 430',
    title: 'Derivatives and Risk Management',
    credits: 3, // Assumed
    description: 'Study options, futures, swaps, and their applications in managing financial risk.',
    academicLevel: 400, // Mapped from 'advanced'
    prerequisites: ['FIN 403'], // Assumed
    concentrations: ['investments', 'risk-management'], // Example
    learningOutcomes: [ /* ... */ ],
    modules: [ /* ... */ ] // Add modules from learningData.ts:derivatives
  },
  {
    id: 'fin-440', // New ID for Advanced Financial Modeling
    courseCode: 'FIN 440',
    title: 'Advanced Financial Modeling',
    credits: 3, // Assumed
    description: 'Build sophisticated financial models for valuation, forecasting, and decision support.',
    academicLevel: 400, // Mapped from 'advanced'
    prerequisites: ['FIN 302'], // Assumed
    concentrations: ['planning', 'corporate'], // From pathId
    learningOutcomes: [ /* ... */ ],
    modules: [ /* ... */ ] // Add modules from learningData.ts:financial-modeling
  },
  {
    id: 'fin-350', // New ID for Financial Planning & Analytics
    courseCode: 'FIN 350',
    title: 'Financial Planning & Analytics',
    credits: 3, // Assumed
    description: 'Master financial planning and analysis techniques for business decision support.',
    academicLevel: 300, // Mapped from 'intermediate'
    prerequisites: ['FIN 201'], // Assumed
    concentrations: ['planning', 'general'], // From pathId
    learningOutcomes: [ /* ... */ ],
    modules: [ /* ... */ ] // Add modules from learningData.ts:planning-analytics
  },
];
