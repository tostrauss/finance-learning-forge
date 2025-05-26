// src/data/programs/quizzes.ts
import { Quiz, QuizQuestion } from '../../types/curriculum'; //

export const financeQuizzes: Quiz[] = [
  // --- Migrated and ID-updated quizzes from learningData.ts ---

  // Originally finance-101-quiz-1, mapped to fin-201 course structure
  {
    id: 'fin-201-quiz-1',
    title: 'Financial Fundamentals Quiz (Principles of Finance)', //
    questions: [ // Questions from learningData.ts
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
  // Originally finance-101-quiz-2, mapped to fin-201 course structure
  {
    id: 'fin-201-quiz-2',
    title: 'Financial Statements Quiz (Principles of Finance)', //
    questions: [ // Questions from learningData.ts
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
  },
  // Originally banking-services-quiz, mapped to fin-285 course structure
  {
    id: 'fin-285-quiz-1',
    title: 'Financial Services & Banking Details Quiz', //
    questions: [ // Questions from learningData.ts
      {
        id: 'bank-q1',
        question: "Which of the following is NOT one of the primary functions of commercial banks?",
        options: [
          "Accepting deposits from customers",
          "Providing loans to individuals and businesses",
          "Setting monetary policy for the economy",
          "Facilitating payment services"
        ],
        correctAnswer: 2,
        explanation: "Setting monetary policy is a function of central banks (like the Federal Reserve), not commercial banks. Commercial banks focus on accepting deposits, making loans, and providing payment services."
      },
      {
        id: 'bank-q2',
        question: "What is the primary difference between investment banks and commercial banks?",
        options: [
          "Investment banks operate internationally while commercial banks operate domestically",
          "Investment banks primarily help companies raise capital while commercial banks focus on deposits and loans",
          "Investment banks are regulated while commercial banks are unregulated",
          "Investment banks only serve wealthy individuals while commercial banks serve everyone"
        ],
        correctAnswer: 1,
        explanation: "Investment banks primarily help companies raise capital through underwriting securities and facilitating mergers and acquisitions, while commercial banks focus on taking deposits and making loans."
      },
      // ... (include all 5 questions for this quiz from learningData.ts)
      {
        id: 'bank-q3',
        question: "Which regulatory requirement establishes minimum capital levels for banks to maintain based on their risk profile?",
        options: [
          "Truth in Lending Act",
          "Basel Accords",
          "Dodd-Frank Act",
          "Glass-Steagall Act"
        ],
        correctAnswer: 1,
        explanation: "The Basel Accords are international banking regulations that establish minimum capital requirements for banks based on their risk-weighted assets."
      },
      {
        id: 'bank-q4',
        question: "What is the process called when banks create money by lending out deposits?",
        options: [
          "Monetary expansion",
          "Capital creation",
          "Fractional reserve banking",
          "Quantitative easing"
        ],
        correctAnswer: 2,
        explanation: "Fractional reserve banking is the system where banks keep only a fraction of deposits as reserves and lend out the rest, effectively creating new money in the economy."
      },
      {
        id: 'bank-q5',
        question: "Which of the following metrics is most useful for evaluating a bank's ability to absorb unexpected losses?",
        options: [
          "Return on Assets (ROA)",
          "Net Interest Margin (NIM)",
          "Capital Adequacy Ratio (CAR)",
          "Loan-to-Deposit Ratio (LDR)"
        ],
        correctAnswer: 2,
        explanation: "The Capital Adequacy Ratio (CAR) measures a bank's capital as a percentage of its risk-weighted assets, indicating its ability to absorb unexpected losses while maintaining solvency."
      }
    ]
  },

  // --- Quiz from original src/data/programs/quizzes.ts ---
  {
    id: 'fin-281-quiz-1',
    title: 'Core Banking Operations', //
    questions: [ //
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

  // --- Placeholder Quizzes for IDs from the consolidated courses.ts ---
  // You will need to replace these with actual questions.

  {
    id: 'fin-201-quiz-3',
    title: 'Time Value of Money Quiz (Placeholder)',
    questions: [
      {
        id: 'tvm-q1',
        question: 'What is Present Value (PV)?',
        options: ['Future Value', 'Current Value', 'Past Value', 'Interest Rate'],
        correctAnswer: 1,
        explanation: 'PV is the current worth of a future sum of money or stream of cash flows given a specified rate of return.'
      }
    ]
  },
  {
    id: 'fin-201-quiz-4',
    title: 'Risk and Return Quiz (Placeholder)',
    questions: [
      {
        id: 'rr-q1',
        question: 'What is systematic risk?',
        options: ['Company-specific risk', 'Market-wide risk', 'Diversifiable risk', 'Operational risk'],
        correctAnswer: 1,
        explanation: 'Systematic risk is market-wide risk that affects the overall market, not just a particular stock or industry.'
      }
    ]
  },
  {
    id: 'fin-302-quiz-1',
    title: 'Capital Structure Quiz (Placeholder)',
    questions: [
      {
        id: 'cs-q1',
        question: 'What does WACC stand for?',
        options: ['Weighted Average Capital Cost', 'Weighted Average Cost of Capital', 'Working Average Cost of Capital', 'Weighted Asset Cost of Capital'],
        correctAnswer: 1,
        explanation: 'WACC stands for Weighted Average Cost of Capital.'
      }
    ]
  },
  // Add placeholders for: fin-302-quiz-2, fin-302-quiz-3, fin-302-quiz-4, fin-302-quiz-5
  { id: 'fin-302-quiz-2', title: 'Capital Budgeting Quiz (Placeholder)', questions: [{ id: 'cb-q1', question: 'What is NPV?', options: ['Net Profit Value', 'Net Present Value', 'Nominal Present Value', 'Net Past Value'], correctAnswer: 1, explanation: 'Net Present Value (NPV) is the difference between the present value of cash inflows and the present value of cash outflows over a period of time.' }] },
  { id: 'fin-302-quiz-3', title: 'Working Capital Management Quiz (Placeholder)', questions: [{ id: 'wcm-q1', question: 'What is a current asset?', options: ['Long-term investment', 'Asset expected to be converted to cash within one year', 'Intangible asset', 'Fixed asset'], correctAnswer: 1, explanation: 'Current assets are assets that are expected to be converted into cash within one year.' }] },
  { id: 'fin-302-quiz-4', title: 'Dividend Policy Quiz (Placeholder)', questions: [{ id: 'dp-q1', question: 'What is a dividend payout ratio?', options: ['Dividends per share / Market price per share', 'Dividends per share / Earnings per share', 'Total dividends / Net income', 'Retained earnings / Total assets'], correctAnswer: 1, explanation: 'The dividend payout ratio is the ratio of the total amount of dividends paid out to shareholders relative to the net income of the company.' }] },
  { id: 'fin-302-quiz-5', title: 'Mergers & Acquisitions Quiz (Placeholder)', questions: [{ id: 'ma-q1', question: 'What is synergy in M&A?', options: ['Hostile takeover', 'The combined value and performance of two companies will be greater than the sum of the separate individual parts', 'Acquisition premium', 'Due diligence process'], correctAnswer: 1, explanation: 'Synergy is the concept that the combined value and performance of two companies will be greater than the sum of the separate individual parts.' }] },

  { id: 'fin-403-quiz-1', title: 'Asset Classes Quiz (Placeholder)', questions: [{id: 'ac-q1', question: 'Example of an equity security?', options:['Bond', 'Stock', 'Commodity', 'Currency'], correctAnswer: 1, explanation: 'Stock represents ownership in a company and is an equity security.'}]},
  { id: 'fin-403-quiz-2', title: 'Modern Portfolio Theory Quiz (Placeholder)', questions: [{id: 'mpt-q1', question: 'Who developed Modern Portfolio Theory?', options:['Benjamin Graham', 'Warren Buffett', 'Harry Markowitz', 'Eugene Fama'], correctAnswer: 2, explanation: 'Harry Markowitz is credited with developing Modern Portfolio Theory.'}]},
  { id: 'fin-403-quiz-3', title: 'Security Analysis Quiz (Placeholder)', questions: [{id: 'sa-q1', question: 'Fundamental analysis focuses on?', options:['Price patterns', 'Intrinsic value', 'Market sentiment', 'Trading volume'], correctAnswer: 1, explanation: 'Fundamental analysis aims to determine the intrinsic value of a security.'}]},

  // fin-280
  { id: 'fin-280-quiz-1', title: 'Banking System Overview Quiz (Placeholder)', questions: [{ id: 'bso-q1', question: 'Role of commercial banks?', options: ['Set monetary policy', 'Accept deposits and make loans', 'Regulate stock markets', 'Issue government bonds'], correctAnswer: 1, explanation: 'Commercial banks primarily accept deposits and make loans.' }] },
  { id: 'fin-280-quiz-2', title: 'Banking Business Model Quiz (Placeholder)', questions: [{ id: 'bbm-q1', question: 'What is Net Interest Income (NII)?', options: ['Fee income', 'Interest earned minus interest paid', 'Trading revenue', 'Gross profit'], correctAnswer: 1, explanation: 'NII is the difference between interest earned on assets (like loans) and interest paid on liabilities (like deposits).' }] },
  { id: 'fin-280-quiz-3', title: 'Banking Regulations Quiz (Placeholder)', questions: [{ id: 'br-q1', question: 'What is FDIC?', options: ['Stock exchange regulator', 'Deposit insurance corporation', 'Investment banking supervisor', 'Consumer protection agency for all industries'], correctAnswer: 1, explanation: 'The Federal Deposit Insurance Corporation (FDIC) provides deposit insurance to depositors in U.S. commercial banks and savings banks.' }] },

  // fin-281 (fin-281-quiz-1 is already defined above)
  { id: 'fin-281-quiz-2', title: 'Payment Systems Quiz (Placeholder)', questions: [{ id: 'ps-q1', question: 'What is ACH?', options: ['Real-time gross settlement', 'Automated Clearing House for batch processing', 'International wire transfer system', 'Credit card network'], correctAnswer: 1, explanation: 'ACH (Automated Clearing House) is an electronic network for financial transactions in the U.S., typically used for batch processing of direct deposits and payments.' }] },
  { id: 'fin-281-quiz-3', title: 'Technology in Banking Quiz (Placeholder)', questions: [{ id: 'tb-q1', question: 'What is Fintech?', options: ['Traditional banking software', 'Financial technology companies disrupting or enhancing financial services', 'A type of bank charter', 'A stock market index'], correctAnswer: 1, explanation: 'Fintech refers to technology-enabled financial solutions, often provided by new companies aiming to improve or disrupt traditional financial services.' }] },

  // fin-282
  { id: 'fin-282-quiz-1', title: 'Financial Products & Services Quiz (Placeholder)', questions: [{ id: 'fps-q1', question: 'Example of a retail deposit product?', options: ['Corporate bond', 'Savings account', 'Stock option', 'Commercial paper'], correctAnswer: 1, explanation: 'A savings account is a common retail deposit product offered by banks.' }] },
  { id: 'fin-282-quiz-2', title: 'Product Development in Banking Quiz (Placeholder)', questions: [{ id: 'pdb-q1', question: 'First step in product development?', options: ['Launch', 'Market research', 'Testing', 'Pricing'], correctAnswer: 1, explanation: 'Market research to understand customer needs and market opportunities is typically the first step in product development.' }] },
  { id: 'fin-282-quiz-3', title: 'Customer Relationship Management (Banking) Quiz (Placeholder)', questions: [{ id: 'crmb-q1', question: 'What is cross-selling in banking?', options: ['Selling bank branches', 'Offering existing customers additional products or services', 'Acquiring new customers', 'Reducing service fees'], correctAnswer: 1, explanation: 'Cross-selling involves selling additional products or services to existing bank customers.' }] },

  // fin-283
  { id: 'fin-283-quiz-1', title: 'Banking Risk Management Framework Quiz (Placeholder)', questions: [{ id: 'brmf-q1', question: 'Define credit risk.', options: ['Risk of interest rate changes', 'Risk of operational failures', 'Risk of borrower default', 'Risk of market downturns'], correctAnswer: 2, explanation: 'Credit risk is the risk that a borrower will fail to meet their debt obligations.' }] },
  { id: 'fin-283-quiz-2', title: 'Credit Risk Management Techniques Quiz (Placeholder)', questions: [{ id: 'crmt-q1', question: 'What are the 5 Cs of Credit?', options: ['Cash, Collateral, Capacity, Capital, Character', 'Credit, Capacity, Conditions, Collateral, Capital', 'Character, Capacity, Capital, Collateral, Conditions', 'Cash, Credit, Conditions, Character, Capacity'], correctAnswer: 2, explanation: 'The 5 Cs of Credit (Character, Capacity, Capital, Collateral, Conditions) are a common framework for evaluating creditworthiness.' }] },
  { id: 'fin-283-quiz-3', title: 'Regulatory Compliance in Banking Quiz (Placeholder)', questions: [{ id: 'rcb-q1', question: 'What are the Basel Accords?', options: ['Trade agreements', 'International banking supervision standards, particularly regarding capital adequacy', 'Accounting principles', 'Consumer protection laws'], correctAnswer: 1, explanation: 'The Basel Accords are a set of international banking regulations focused on bank capital adequacy, stress testing, and market liquidity risk.' }] },

  // fin-411
  { id: 'fin-411-quiz-1', title: 'International Financial Markets Quiz (Placeholder)', questions: [{ id: 'ifm-q1', question: 'What is an ADR?', options: ['Adjusted Debt Ratio', 'American Depositary Receipt for foreign stocks', 'Asian Development Resource', 'Advanced Derivative Regulation'], correctAnswer: 1, explanation: 'An American Depositary Receipt (ADR) is a negotiable security that represents securities of a non-U.S. company that trades in the U.S. financial markets.' }] },
  { id: 'fin-411-quiz-2', title: 'Foreign Exchange Markets Quiz (Placeholder)', questions: [{ id: 'fxm-q1', question: 'What is PPP in FX?', options: ['Price Parity Power', 'Purchasing Power Parity', 'Portfolio Performance Parameter', 'Primary Payment Protocol'], correctAnswer: 1, explanation: 'Purchasing Power Parity (PPP) is a theory that states that exchange rates between currencies are in equilibrium when their purchasing power is the same in each of the two countries.' }] },
  { id: 'fin-411-quiz-3', title: 'International Financial Management Quiz (Placeholder)', questions: [{ id: 'ifmgmt-q1', question: 'What is transaction exposure?', options: ['Risk of financial statement translation', 'Risk that currency exchange rate fluctuations will adversely affect the value of contractual cash flows', 'Risk from macroeconomic changes', 'Risk of subsidiary nationalization'], correctAnswer: 1, explanation: 'Transaction exposure is the risk that a company faces when it has contractual payments or receipts in a foreign currency that are subject to exchange rate fluctuations.' }] },
  
  // fin-480
  { id: 'fin-480-quiz-1', title: 'Modern Banking Challenges Quiz (Placeholder)', questions: [{ id: 'mbc-q1', question: 'What is a Neobank?', options: ['A very old bank', 'A bank specializing in new currencies', 'A digital-only bank without physical branches', 'A government-owned bank'], correctAnswer: 2, explanation: 'Neobanks are direct banks that operate exclusively online without traditional physical branch networks.' }] },
  { id: 'fin-480-quiz-2', title: 'Advanced Risk Management (Banking) Quiz (Placeholder)', questions: [{ id: 'armb-q1', question: 'What is ERM?', options: ['Equity Risk Management', 'Enterprise Risk Management', 'External Risk Mitigation', 'Emerging Risk Model'], correctAnswer: 1, explanation: 'Enterprise Risk Management (ERM) is a framework for organizations to identify, assess, manage, and monitor risks from all sources.' }] },
  { id: 'fin-480-quiz-3', title: 'Future of Banking Quiz (Placeholder)', questions: [{ id: 'fob-q1', question: 'What is BaaS?', options: ['Bank as a Standard', 'Banking as a Service', 'Branch and ATM System', 'Business Account Servicing'], correctAnswer: 1, explanation: 'Banking as a Service (BaaS) is a model where licensed banks integrate their digital banking services directly into the products of other non-bank businesses.' }] },

  // fin-102 (Accounting)
  { id: 'fin-102-quiz-1', title: 'Intro to Accounting Quiz (Placeholder)', questions: [{ id: 'acc1-q1', question: 'Financial vs Managerial Accounting?', options:['Same thing', 'Financial for external, Managerial for internal users', 'Financial for future, Managerial for past', 'No difference'], correctAnswer: 1, explanation: 'Financial accounting provides information to external parties, while managerial accounting is for internal decision-making.'}]},
  { id: 'fin-102-quiz-2', title: 'Accounting Equation Quiz (Placeholder)', questions: [{ id: 'acc2-q1', question: 'Assets = ?', options:['Liabilities - Equity', 'Liabilities + Equity', 'Revenue - Expenses', 'Capital + Drawings'], correctAnswer: 1, explanation: 'The fundamental accounting equation is Assets = Liabilities + Equity.'}]},
  { id: 'fin-102-quiz-3', title: 'Financial Statements (Accounting) Quiz (Placeholder)', questions: [{ id: 'acc3-q1', question: 'Which statement shows financial position?', options:['Income Statement', 'Balance Sheet', 'Cash Flow Statement', 'Retained Earnings Statement'], correctAnswer: 1, explanation: 'The Balance Sheet shows a company\'s financial position at a specific point in time.'}]},

  // fin-103 (Economics)
  { id: 'fin-103-quiz-1', title: 'Microeconomics Quiz (Placeholder)', questions: [{ id: 'eco1-q1', question: 'Law of Demand?', options:['Price up, demand up', 'Price down, demand down', 'Price up, demand down', 'No relation'], correctAnswer: 2, explanation: 'The law of demand states that, all else being equal, as the price of a good increases, quantity demanded will decrease.'}]},
  { id: 'fin-103-quiz-2', title: 'Macroeconomics Quiz (Placeholder)', questions: [{ id: 'eco2-q1', question: 'What is GDP?', options:['Gross Domestic Price', 'General Debt Product', 'Gross Domestic Product', 'Government Deficit Program'], correctAnswer: 2, explanation: 'Gross Domestic Product (GDP) is the total monetary or market value of all the finished goods and services produced within a country\'s borders in a specific time period.'}]},
  { id: 'fin-103-quiz-3', title: 'Economic Policy Quiz (Placeholder)', questions: [{ id: 'eco3-q1', question: 'Monetary policy is set by?', options:['Government legislature', 'Central Bank', 'Commercial Banks', 'International Monetary Fund'], correctAnswer: 1, explanation: 'Monetary policy, which includes managing interest rates and money supply, is typically set by a country\'s central bank.'}]},

  // fin-310 (Financial Markets)
  { id: 'fin-310-quiz-1', title: 'Money Markets Quiz (Placeholder)', questions: [{ id: 'fm1-q1', question: 'Money market instruments are typically?', options:['Long-term and high-risk', 'Short-term and low-risk', 'Equity-based', 'Illiquid'], correctAnswer: 1, explanation: 'Money market instruments are generally short-term (less than one year) debt securities that are highly liquid and carry low risk.'}]},
  { id: 'fin-310-quiz-2', title: 'Capital Markets Quiz (Placeholder)', questions: [{ id: 'fm2-q1', question: 'Example of a capital market security?', options:['Treasury Bill', 'Commercial Paper', 'Stock', 'Certificate of Deposit'], correctAnswer: 2, explanation: 'Stocks (equities) and bonds are primary examples of capital market securities, used for long-term financing.'}]},
  { id: 'fin-310-quiz-3', title: 'Financial Institutions (Markets) Quiz (Placeholder)', questions: [{ id: 'fm3-q1', question: 'Role of an investment bank?', options:['Retail deposits', 'Consumer loans', 'Underwriting securities', 'Setting interest rates'], correctAnswer: 2, explanation: 'Investment banks specialize in helping companies and governments raise capital through underwriting securities, and also advise on mergers and acquisitions.'}]},

  // fin-420 (Stock Analysis) - Placeholder for 4 quizzes
  { id: 'fin-420-quiz-1', title: 'Fundamental Analysis Basics (Stock) Quiz (Placeholder)', questions: [{ id: 'sa1-q1', question: 'P/E ratio means?', options:['Price/Equity', 'Profit/Expense', 'Price/Earnings', 'Payout/Evaluation'], correctAnswer: 2, explanation: 'P/E ratio stands for Price-to-Earnings ratio.'}]},
  { id: 'fin-420-quiz-2', title: 'Technical Analysis Foundations (Stock) Quiz (Placeholder)', questions: [{ id: 'sa2-q1', question: 'A "support level" in technical analysis is?', options:['A price level where a stock tends to find buying interest and stop falling', 'A company\'s debt ceiling', 'The highest price a stock has reached', 'An industry average P/E'], correctAnswer: 0, explanation: 'A support level is a price point where a downtrending stock is expected to pause due to a concentration of demand.'}]},
  { id: 'fin-420-quiz-3', title: 'Stock Valuation Models Quiz (Placeholder)', questions: [{ id: 'sa3-q1', question: 'DCF stands for?', options:['Dividend Cash Flow', 'Discounted Company Finance', 'Discounted Cash Flow', 'Debt Coverage Factor'], correctAnswer: 2, explanation: 'DCF stands for Discounted Cash Flow, a common valuation method.'}]},
  { id: 'fin-420-quiz-4', title: 'Advanced Chart Patterns (Stock) Quiz (Placeholder)', questions: [{ id: 'sa4-q1', question: 'A "Head and Shoulders" pattern is typically?', options:['A bullish continuation pattern', 'A bearish reversal pattern', 'A sideways consolidation pattern', 'An indicator of low volatility'], correctAnswer: 1, explanation: 'A Head and Shoulders pattern is widely regarded as a bearish reversal pattern.'}]},

  // fin-430 (Derivatives) - Placeholder for 4 quizzes
  { id: 'fin-430-quiz-1', title: 'Options Fundamentals Quiz (Placeholder)', questions: [{ id: 'd1-q1', question: 'A call option gives the holder the right to?', options:['Sell an asset', 'Buy an asset', 'Short an asset', 'Lend an asset'], correctAnswer: 1, explanation: 'A call option gives the holder the right, but not the obligation, to buy an underlying asset at a specified strike price before or at expiration.'}]},
  { id: 'fin-430-quiz-2', title: 'Futures Markets Quiz (Placeholder)', questions: [{ id: 'd2-q1', question: 'Futures contracts are typically traded on?', options:['Over-the-counter (OTC) markets', 'Organized exchanges', 'Directly between banks', 'Informal networks'], correctAnswer: 1, explanation: 'Futures contracts are standardized and primarily traded on organized exchanges.'}]},
  { id: 'fin-430-quiz-3', title: 'Swaps and Forward Contracts Quiz (Placeholder)', questions: [{ id: 'd3-q1', question: 'An interest rate swap involves exchanging?', options:['Different currencies', 'Stock for bonds', 'Fixed interest payments for floating interest payments (or vice versa)', 'Physical commodities'], correctAnswer: 2, explanation: 'An interest rate swap is a derivative contract through which two parties exchange interest payments, typically one fixed and one floating.'}]},
  { id: 'fin-430-quiz-4', title: 'Risk Management with Derivatives Quiz (Placeholder)', questions: [{ id: 'd4-q1', question: 'Using a put option to protect a stock holding is a form of?', options:['Speculation', 'Arbitrage', 'Hedging', 'Leveraging'], correctAnswer: 2, explanation: 'Buying a put option on a stock you own is a common hedging strategy to protect against a potential decline in the stock\'s price (protective put).'}]},

  // fin-440 (Advanced Financial Modeling) - Placeholder for 2 quizzes
  { id: 'fin-440-quiz-1', title: 'Financial Modeling Principles Quiz (Placeholder)', questions: [{ id: 'afm1-q1', question: 'A good financial model should be?', options:['Complex and rigid', 'Simple and undocumented', 'Flexible, accurate, and well-documented', 'Only understandable by its creator'], correctAnswer: 2, explanation: 'Key principles of good financial modeling include flexibility, accuracy, transparency, and clear documentation.'}]},
  { id: 'fin-440-quiz-2', title: 'Three-Statement Modeling Quiz (Placeholder)', questions: [{ id: 'afm2-q1', question: 'The three core financial statements in an integrated model are?', options:['Income Statement, Balance Sheet, Cash Flow Statement', 'Budget, Forecast, Actuals', 'Revenue, Expenses, Profit', 'Assets, Liabilities, Equity Summaries'], correctAnswer: 0, explanation: 'The three-statement model integrates the Income Statement, Balance Sheet, and Cash Flow Statement.'}]},

  // fin-350 (Financial Planning & Analytics) - Placeholder for 2 quizzes
  { id: 'fin-350-quiz-1', title: 'Financial Modeling Fundamentals (Planning) Quiz (Placeholder)', questions: [{ id: 'fpa1-q1', question: 'Sensitivity analysis in a model helps to?', options:['Guarantee profits', 'Eliminate all risks', 'Understand how changes in input variables affect outputs', 'Simplify the model'], correctAnswer: 2, explanation: 'Sensitivity analysis shows how the output of a model changes when one input variable is changed, helping to understand key drivers and risks.'}]},
  { id: 'fin-350-quiz-2', title: 'Budgeting and Forecasting (Planning) Quiz (Placeholder)', questions: [{ id: 'fpa2-q1', question: 'A "rolling forecast" is one that?', options:['Is updated only annually', 'Is continuously updated by adding a new period as the most recent period ends', 'Only looks backward', 'Is never changed once set'], correctAnswer: 1, explanation: 'A rolling forecast is an add/drop process that continuously extends the forecast horizon, e.g., adding a new month or quarter as the current one concludes.'}]},

];
