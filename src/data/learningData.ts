
import { Course, UserProgress, Quiz } from '../types/learning';

export const userProgress: UserProgress = {
  streak: 5,
  xpEarned: 325,
  quizAverage: 82,
  progress: 33,
  completedModules: ['finance-101-1', 'finance-101-2'],
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
    id: 'corporate-finance',
    title: 'Corporate Finance Essentials',
    description: 'Understand how corporations make financial decisions, manage capital structure, and evaluate investments.',
    level: 'intermediate',
    progress: 0,
    modules: [
      {
        id: 'corporate-finance-1',
        title: 'Capital Structure and Financing Decisions',
        description: 'Learn how companies choose between debt and equity financing.',
        content: '',
        duration: 40,
        quizId: '',
        completed: false
      },
      {
        id: 'corporate-finance-2',
        title: 'Capital Budgeting',
        description: 'Understand how companies evaluate and select long-term investment projects.',
        content: '',
        duration: 35,
        quizId: '',
        completed: false
      }
    ]
  },
  {
    id: 'stock-analysis',
    title: 'Stock Analysis: Fundamental & Technical',
    description: 'Master both fundamental and technical analysis approaches to evaluating stocks.',
    level: 'intermediate',
    progress: 0,
    modules: [
      {
        id: 'stock-analysis-1',
        title: 'Fundamental Analysis Basics',
        description: 'Learn how to evaluate a company\'s financial health and growth prospects.',
        content: '',
        duration: 45,
        quizId: '',
        completed: false
      },
      {
        id: 'stock-analysis-2',
        title: 'Technical Analysis Foundations',
        description: 'Understand price patterns, indicators, and chart analysis.',
        content: '',
        duration: 50,
        quizId: '',
        completed: false
      }
    ]
  }
];
