// src/data/programs/courses.ts
import { FinanceCourse } from '../../types/curriculum';

export const financeCourses: FinanceCourse[] = [
  // 200-Level Courses
  {
    id: 'fin-201',
    courseCode: 'FIN 201',
    title: 'Principles of Finance',
    credits: 3,
    description: 'Introduction to core financial concepts, including time value of money, risk and return, financial statements, and capital budgeting.',
    academicLevel: 200,
    prerequisites: [],
    concentrations: ['general', 'corporate', 'investments', 'banking', 'international', 'planning'],
    learningOutcomes: [
      'Understand the time value of money and its applications',
      'Analyze financial statements and calculate key financial ratios',
      'Evaluate investment projects using NPV, IRR, and other techniques',
      'Understand the relationship between risk and return',
      'Apply basic principles of portfolio theory'
    ],
    modules: [
      {
        id: 'fin-201-1',
        title: 'Introduction to Financial Concepts',
        description: 'Learn the fundamental principles and concepts of finance.',
        content: `# Introduction to Financial Concepts

## What is Finance?
Finance is the study of money management and the process of acquiring needed funds. It encompasses:
- Personal finance
- Corporate finance
- Public finance

## Key Financial Decisions
1. **Investment Decisions**: What assets to invest in
2. **Financing Decisions**: How to raise capital
3. **Dividend Decisions**: How much to return to shareholders

## The Goal of Financial Management
The primary goal is to maximize shareholder wealth through:
- Maximizing stock price
- Making profitable investments
- Managing risks effectively`,
        duration: 30,
        quizId: 'fin-201-quiz-1',
        completed: false
      },
      {
        id: 'fin-201-2',
        title: 'Time Value of Money',
        description: 'Understand present value, future value, and their applications.',
        content: `# Time Value of Money

## Core Concept
A dollar today is worth more than a dollar tomorrow because:
- Money can earn interest
- Inflation reduces purchasing power
- There's risk in future payments

## Key Formulas

### Future Value (FV)
FV = PV × (1 + r)^n

### Present Value (PV)
PV = FV ÷ (1 + r)^n

### Annuity Formulas
- Present Value of Annuity: PVA = PMT × [(1 - (1 + r)^-n) / r]
- Future Value of Annuity: FVA = PMT × [((1 + r)^n - 1) / r]

## Applications
- Loan calculations
- Investment valuation
- Retirement planning`,
        duration: 45,
        quizId: 'fin-201-quiz-2',
        completed: false
      },
      {
        id: 'fin-201-3',
        title: 'Financial Statement Analysis',
        description: 'Learn to read and analyze the three main financial statements.',
        content: `# Financial Statement Analysis

## The Three Main Statements

### 1. Balance Sheet
Shows financial position at a point in time:
- Assets = Liabilities + Equity
- Current vs. Non-current classifications
- Working capital analysis

### 2. Income Statement
Shows performance over a period:
- Revenue - Expenses = Net Income
- Gross profit margins
- Operating efficiency

### 3. Cash Flow Statement
Shows cash movements:
- Operating activities
- Investing activities
- Financing activities

## Key Financial Ratios
- Liquidity ratios (Current, Quick)
- Profitability ratios (ROA, ROE, Profit Margin)
- Leverage ratios (Debt-to-Equity)
- Efficiency ratios (Asset Turnover)`,
        duration: 40,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-201-4',
        title: 'Risk and Return',
        description: 'Explore the fundamental relationship between risk and return in finance.',
        content: `# Risk and Return

## Understanding Risk
Risk is the uncertainty about future returns:
- Systematic risk (market risk)
- Unsystematic risk (specific risk)
- Total risk = Systematic + Unsystematic

## Measuring Risk
- Standard deviation
- Variance
- Beta coefficient
- Value at Risk (VaR)

## Risk-Return Tradeoff
Higher expected returns require accepting higher risk:
- Risk-free rate
- Risk premium
- Required return = Risk-free rate + Risk premium

## Portfolio Theory Basics
- Diversification reduces unsystematic risk
- Correlation between assets
- Efficient frontier concept`,
        duration: 35,
        quizId: 'generic-finance-quiz',
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
        content: `# Banking System Overview

## The Role of Banks in the Economy
Banks serve as financial intermediaries:
- Channel funds from savers to borrowers
- Provide payment systems
- Create money through fractional reserve banking
- Support economic growth through credit allocation

## Types of Financial Institutions
1. **Commercial Banks**
   - Accept deposits
   - Make loans
   - Provide payment services

2. **Investment Banks**
   - Underwrite securities
   - Facilitate M&A
   - Trading and market making

3. **Credit Unions**
   - Member-owned cooperatives
   - Non-profit focus
   - Community-based

4. **Other Institutions**
   - Savings and loan associations
   - Finance companies
   - Insurance companies`,
        duration: 45,
        quizId: 'fin-280-quiz-1',
        completed: false
      },
      {
        id: 'fin-280-2',
        title: 'Banking Business Model',
        description: 'How banks make money and manage their operations',
        content: `# Banking Business Model

## Revenue Sources
1. **Net Interest Income (NII)**
   - Interest earned on loans minus interest paid on deposits
   - Interest rate spread
   - Asset-liability management

2. **Non-Interest Income**
   - Fee income
   - Trading revenue
   - Service charges

## The Banking Balance Sheet
### Assets
- Cash and reserves
- Securities
- Loans (largest component)
- Fixed assets

### Liabilities
- Deposits (largest component)
- Borrowed funds
- Other liabilities

### Equity
- Common stock
- Retained earnings

## Key Performance Metrics
- Return on Assets (ROA)
- Return on Equity (ROE)
- Net Interest Margin (NIM)
- Efficiency Ratio`,
        duration: 40,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-280-3',
        title: 'Introduction to Banking Regulations',
        description: 'Overview of the regulatory framework governing banks',
        content: `# Banking Regulations

## Why Regulate Banks?
- Protect depositors
- Maintain financial stability
- Prevent systemic risk
- Ensure fair practices

## Key Regulatory Bodies
1. **Federal Reserve**
   - Monetary policy
   - Bank supervision
   - Financial stability

2. **FDIC**
   - Deposit insurance
   - Bank resolution
   - Consumer protection

3. **OCC**
   - National bank charters
   - Supervision and examination

4. **CFPB**
   - Consumer financial protection
   - Fair lending enforcement

## Major Regulations
- Basel Accords (Capital requirements)
- Dodd-Frank Act
- Bank Secrecy Act / AML
- Fair lending laws`,
        duration: 35,
        quizId: 'generic-finance-quiz',
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
        content: `# Core Banking Operations

## Introduction to Banking Operations
Banking operations encompass all activities that support the delivery of banking services to customers.

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
1. **Real-Time Gross Settlement (RTGS)**
   - Immediate settlement
   - High-value transactions
   - Central bank operated

2. **Automated Clearing House (ACH)**
   - Batch processing
   - Low-value, high-volume
   - Next-day settlement

3. **Wire Transfer Systems**
   - Fedwire (domestic)
   - SWIFT (international)
   - Same-day settlement

4. **Card Payment Networks**
   - Credit cards
   - Debit cards
   - Processing networks

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
1. **Core System Modernization**
   - Cloud migration
   - API-first architecture
   - Microservices

2. **Customer-Facing Technology**
   - Mobile-first design
   - Omnichannel experience
   - Digital onboarding

## Emerging Technologies
### Artificial Intelligence
- Fraud detection
- Customer service chatbots
- Credit decisioning
- Personalized recommendations

### Blockchain
- Cross-border payments
- Trade finance
- Digital identity
- Smart contracts

### Open Banking
- API platforms
- Third-party integrations
- Data sharing
- New business models

## Automation
- Robotic Process Automation (RPA)
- Straight-through processing
- Automated compliance
- Digital workflows`,
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
        content: `# Financial Products and Services

## Retail Banking Products
### Deposit Products
- Checking accounts
- Savings accounts
- Money market accounts
- Certificates of deposit (CDs)

### Lending Products
- Personal loans
- Auto loans
- Mortgages
- Home equity loans
- Credit cards

### Investment Products
- Mutual funds
- Brokerage services
- Retirement accounts (IRAs)
- Wealth management

## Commercial Banking Services
### Business Accounts
- Business checking
- Business savings
- Merchant services
- Payroll services

### Commercial Lending
- Term loans
- Lines of credit
- Equipment financing
- Commercial real estate

### Cash Management
- Lockbox services
- Zero balance accounts
- Sweep accounts
- International payments`,
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
1. **Market Research**
   - Customer needs analysis
   - Competitive analysis
   - Market sizing
   - Trend identification

2. **Product Design**
   - Feature definition
   - Pricing strategy
   - Risk assessment
   - Regulatory review

3. **Testing and Launch**
   - Pilot programs
   - Customer feedback
   - Refinement
   - Full market launch

## Financial Innovation
### Fintech Partnerships
- API integrations
- White-label solutions
- Joint ventures
- Acquisition strategies

### Digital Products
- Mobile payment solutions
- Robo-advisors
- Peer-to-peer payments
- Cryptocurrency services

## Success Factors
- Customer-centric design
- Agile development
- Regulatory compliance
- Scalable technology`,
        duration: 40,
        quizId: 'fin-282-quiz-2',
        completed: false
      },
      {
        id: 'fin-282-3',
        title: 'Customer Relationship Management',
        description: 'Master effective customer relationship management in banking',
        content: `# Customer Relationship Management

## CRM Strategy
### Customer Segmentation
- Demographics
- Behavior patterns
- Profitability analysis
- Lifecycle stage

### Relationship Building
- Personalization
- Multi-channel engagement
- Proactive communication
- Problem resolution

## Customer Experience
### Service Excellence
- Service standards
- Training programs
- Performance metrics
- Continuous improvement

### Digital Experience
- User interface design
- Mobile optimization
- Self-service options
- Seamless integration

## Sales and Marketing
### Cross-Selling
- Product bundling
- Needs-based selling
- Timing strategies
- Incentive programs

### Customer Retention
- Loyalty programs
- Satisfaction measurement
- Churn prevention
- Win-back campaigns`,
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
        content: `# Risk Management Framework

## Types of Banking Risks
1. **Credit Risk**
   - Default risk
   - Counterparty risk
   - Concentration risk
   - Country risk

2. **Market Risk**
   - Interest rate risk
   - Foreign exchange risk
   - Equity price risk
   - Commodity risk

3. **Operational Risk**
   - Process failures
   - System failures
   - Human errors
   - External events

4. **Liquidity Risk**
   - Funding liquidity risk
   - Market liquidity risk
   - Contingent liquidity risk

## Risk Management Process
1. Risk Identification
2. Risk Assessment
3. Risk Measurement
4. Risk Monitoring
5. Risk Mitigation
6. Risk Reporting`,
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
### The 5 C's of Credit
1. **Character**: Borrower's reputation
2. **Capacity**: Ability to repay
3. **Capital**: Financial resources
4. **Collateral**: Security for the loan
5. **Conditions**: Economic environment

### Credit Scoring
- FICO scores
- Internal rating systems
- Probability of default models
- Loss given default estimation

## Portfolio Management
### Diversification Strategies
- Industry diversification
- Geographic diversification
- Product diversification
- Borrower size diversification

### Credit Monitoring
- Early warning systems
- Covenant tracking
- Regular reviews
- Stress testing

## Risk Mitigation
- Collateral requirements
- Guarantees
- Credit derivatives
- Loan syndication
- Insurance`,
        duration: 40,
        quizId: 'fin-283-quiz-2',
        completed: false
      },
      {
        id: 'fin-283-3',
        title: 'Regulatory Compliance',
        description: 'Master banking regulations and compliance requirements',
        content: `# Regulatory Compliance

## Basel Accords
### Basel III Requirements
- Minimum capital ratios
- Capital conservation buffer
- Countercyclical buffer
- Leverage ratio
- Liquidity requirements

### Capital Components
- Common Equity Tier 1 (CET1)
- Additional Tier 1
- Tier 2 capital
- Total capital

## Key Regulations
### Anti-Money Laundering (AML)
- Know Your Customer (KYC)
- Suspicious Activity Reports (SARs)
- Currency Transaction Reports (CTRs)
- OFAC compliance

### Consumer Protection
- Fair lending laws
- Truth in Lending Act
- Fair Credit Reporting Act
- Privacy regulations

## Compliance Management
- Policy development
- Training programs
- Monitoring systems
- Internal audits
- Regulatory reporting`,
        duration: 35,
        quizId: 'fin-283-quiz-3',
        completed: false
      }
    ]
  },

  // 300-Level Courses
  {
    id: 'fin-302',
    courseCode: 'FIN 302',
    title: 'Corporate Finance',
    credits: 3,
    description: 'Advanced study of corporate financial management, capital structure decisions, and valuation techniques.',
    academicLevel: 300,
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'corporate'],
    learningOutcomes: [
      'Master capital structure theories and applications',
      'Apply advanced capital budgeting techniques',
      'Understand corporate valuation methods',
      'Analyze merger and acquisition decisions',
      'Develop optimal dividend policies'
    ],
    modules: [
      {
        id: 'fin-302-1',
        title: 'Capital Structure Theory',
        description: 'Explore theories of optimal capital structure',
        content: `# Capital Structure Theory

## Modigliani-Miller Propositions
### MM Without Taxes
- Proposition I: Firm value is independent of capital structure
- Proposition II: Cost of equity increases with leverage
- Assumptions and limitations

### MM With Taxes
- Tax shield benefit of debt
- Optimal capital structure with 100% debt?
- Real-world considerations

## Trade-Off Theory
- Benefits of debt (tax shield)
- Costs of debt (financial distress)
- Optimal capital structure balances benefits and costs

## Pecking Order Theory
1. Internal financing preferred
2. Debt if external financing needed
3. Equity as last resort
- Information asymmetry implications

## Market Timing Theory
- Issue equity when overvalued
- Issue debt when undervalued
- Long-term capital structure effects`,
        duration: 45,
        quizId: 'fin-302-quiz-1',
        completed: false
      },
      {
        id: 'fin-302-2',
        title: 'Advanced Capital Budgeting',
        description: 'Master sophisticated project evaluation techniques',
        content: `# Advanced Capital Budgeting

## Review of Basic Techniques
- Net Present Value (NPV)
- Internal Rate of Return (IRR)
- Payback Period
- Profitability Index

## Advanced Topics
### Real Options
- Option to expand
- Option to abandon
- Option to delay
- Valuing flexibility

### Risk Analysis
- Sensitivity analysis
- Scenario analysis
- Monte Carlo simulation
- Decision trees

### Special Situations
- Mutually exclusive projects
- Capital rationing
- Projects with unequal lives
- International projects

## Cost of Capital
- Weighted Average Cost of Capital (WACC)
- Marginal cost of capital
- Project-specific discount rates
- Country risk adjustments`,
        duration: 50,
        quizId: 'fin-302-quiz-2',
        completed: false
      },
      {
        id: 'fin-302-3',
        title: 'Corporate Valuation',
        description: 'Learn various methods to value companies',
        content: `# Corporate Valuation

## Discounted Cash Flow (DCF) Valuation
### Free Cash Flow to the Firm (FCFF)
- Operating cash flow
- Capital expenditures
- Working capital changes
- Terminal value calculation

### Free Cash Flow to Equity (FCFE)
- Cash flow available to shareholders
- Levered vs. unlevered analysis
- Cost of equity calculation

## Relative Valuation
### Multiple Analysis
- P/E ratio
- EV/EBITDA
- P/B ratio
- PEG ratio

### Comparable Company Analysis
- Selecting peer companies
- Adjusting for differences
- Multiple selection
- Applying to target

## Other Valuation Methods
- Asset-based valuation
- Contingent claim valuation
- EVA/MVA approach
- Sum-of-the-parts analysis`,
        duration: 45,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-302-4',
        title: 'Mergers and Acquisitions',
        description: 'Analyze M&A transactions and strategies',
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
        duration: 40,
        quizId: 'generic-finance-quiz',
        completed: false
      }
    ]
  },

  // 400-Level Courses
  {
    id: 'fin-403',
    courseCode: 'FIN 403',
    title: 'Investment Analysis',
    credits: 3,
    description: 'Analysis of investment vehicles, portfolio theory, and market efficiency.',
    academicLevel: 400,
    prerequisites: ['FIN 201'],
    concentrations: ['general', 'investments'],
    learningOutcomes: [
      'Apply modern portfolio theory to investment decisions',
      'Analyze different asset classes and their characteristics',
      'Implement portfolio optimization techniques',
      'Evaluate market efficiency and behavioral finance concepts',
      'Develop investment strategies for different objectives'
    ],
    modules: [
      {
        id: 'fin-403-1',
        title: 'Portfolio Theory',
        description: 'Learn modern portfolio theory and asset allocation strategies',
        content: `# Portfolio Theory

## Markowitz Portfolio Theory
### Risk and Return
- Expected return calculation
- Portfolio variance and standard deviation
- Correlation and covariance
- Diversification benefits

### Efficient Frontier
- Minimum variance portfolio
- Optimal portfolio selection
- Risk-return tradeoff
- Two-fund theorem

## Capital Asset Pricing Model (CAPM)
### Key Concepts
- Systematic vs. unsystematic risk
- Beta measurement
- Security Market Line
- Alpha generation

### CAPM Formula
E(Ri) = Rf + βi[E(Rm) - Rf]

## Extensions to CAPM
- Multi-factor models
- Arbitrage Pricing Theory
- Fama-French Three-Factor Model
- Momentum factor`,
        duration: 45,
        quizId: 'fin-403-quiz-1',
        completed: false
      },
      {
        id: 'fin-403-2',
        title: 'Equity Analysis',
        description: 'Master stock selection and valuation techniques',
        content: `# Equity Analysis

## Fundamental Analysis
### Top-Down Approach
1. Economic analysis
2. Industry analysis
3. Company analysis
4. Valuation

### Financial Statement Analysis
- Quality of earnings
- Cash flow analysis
- Ratio analysis
- Trend analysis

## Valuation Models
### Dividend Discount Models
- Gordon Growth Model
- Two-stage growth model
- H-Model
- Three-stage model

### Other Valuation Approaches
- Free cash flow models
- Residual income models
- Economic value added
- Price multiples

## Growth Stock vs. Value Stock
- Characteristics
- Investment strategies
- Performance patterns
- Risk considerations`,
        duration: 40,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-403-3',
        title: 'Fixed Income Securities',
        description: 'Understand bonds and other fixed income investments',
        content: `# Fixed Income Securities

## Bond Fundamentals
### Bond Characteristics
- Par value and coupon rate
- Maturity and yield
- Credit quality
- Embedded options

### Bond Pricing
- Present value of cash flows
- Yield to maturity
- Current yield
- Yield curve

## Duration and Convexity
### Duration Measures
- Macaulay duration
- Modified duration
- Effective duration
- Dollar duration

### Risk Management
- Interest rate risk
- Reinvestment risk
- Credit risk
- Liquidity risk

## Fixed Income Strategies
- Passive strategies
- Active strategies
- Immunization
- Cash flow matching`,
        duration: 35,
        quizId: 'generic-finance-quiz',
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
    learningOutcomes: [
      'Understand foreign exchange markets and exchange rate determination',
      'Analyze international investment and financing decisions',
      'Manage foreign exchange risk',
      'Evaluate international capital budgeting projects',
      'Understand international financial markets and institutions'
    ],
    modules: [
      {
        id: 'fin-411-1',
        title: 'International Financial Markets',
        description: 'Overview of global financial markets and instruments',
        content: `# International Financial Markets

## Global Financial System
### Major Financial Centers
- New York
- London
- Tokyo
- Hong Kong
- Singapore

### Market Participants
- Central banks
- Commercial banks
- Investment banks
- Hedge funds
- Multinational corporations

## International Capital Markets
### Equity Markets
- Cross-listing
- American Depositary Receipts (ADRs)
- Global Depositary Receipts (GDRs)
- International IPOs

### Bond Markets
- Eurobonds
- Foreign bonds
- Global bonds
- Sovereign bonds

## Money Markets
### Eurocurrency Markets
- Eurodollar deposits
- LIBOR and alternatives
- Eurocommercial paper
- International banking facilities`,
        duration: 45,
        quizId: 'fin-411-quiz-1',
        completed: false
      },
      {
        id: 'fin-411-2',
        title: 'Foreign Exchange Markets',
        description: 'Understanding currency markets and exchange rates',
        content: `# Foreign Exchange Markets

## FX Market Structure
### Market Characteristics
- 24-hour trading
- OTC market
- Major currency pairs
- Trading volumes

### Exchange Rate Quotations
- Direct vs. indirect quotes
- Bid-ask spreads
- Cross rates
- Forward rates

## Exchange Rate Determination
### Parity Conditions
- Purchasing Power Parity (PPP)
- Interest Rate Parity (IRP)
- Fisher Effect
- International Fisher Effect

### Exchange Rate Theories
- Balance of payments approach
- Asset market approach
- Technical analysis
- Central bank intervention

## FX Derivatives
- Forward contracts
- Futures contracts
- Currency options
- Currency swaps`,
        duration: 40,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-411-3',
        title: 'International Financial Management',
        description: 'Managing finances across borders',
        content: `# International Financial Management

## Foreign Exchange Risk Management
### Types of Exposure
- Transaction exposure
- Translation exposure
- Economic exposure
- Tax exposure

### Hedging Strategies
- Natural hedging
- Forward market hedge
- Money market hedge
- Options hedge

## International Investment Decisions
### Capital Budgeting
- NPV in foreign currency
- Cost of capital adjustments
- Country risk premium
- Real options approach

### Working Capital Management
- Cash management
- Accounts receivable
- Inventory management
- Transfer pricing

## International Financing
- International bond issuance
- Syndicated loans
- Export financing
- Project finance`,
        duration: 45,
        quizId: 'generic-finance-quiz',
        completed: false
      }
    ]
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
    learningOutcomes: [
      'Analyze complex banking strategies and business models',
      'Evaluate financial innovations and their impact',
      'Develop comprehensive risk management frameworks',
      'Understand the future of banking and financial services',
      'Apply advanced analytical techniques to banking problems'
    ],
    modules: [
      {
        id: 'fin-480-1',
        title: 'Modern Banking Challenges',
        description: 'Explore contemporary issues and trends in banking',
        content: `# Modern Banking Challenges

## Digital Disruption
### Fintech Competition
- Neobanks and challenger banks
- Payment providers
- Lending platforms
- Wealth management apps

### Big Tech in Finance
- Apple Pay, Google Pay
- Amazon lending
- Facebook's digital currency
- Embedded finance

## Regulatory Evolution
### Post-Crisis Reforms
- Dodd-Frank implementation
- Volcker Rule
- Stress testing
- Living wills

### Emerging Regulations
- Open banking mandates
- Data privacy (GDPR, CCPA)
- Cryptocurrency regulation
- Climate risk disclosure

## Strategic Responses
- Digital transformation
- Partnership strategies
- Platform banking
- Ecosystem development`,
        duration: 45,
        quizId: 'fin-480-quiz-1',
        completed: false
      },
      {
        id: 'fin-480-2',
        title: 'Advanced Risk Management',
        description: 'Sophisticated risk management techniques and frameworks',
        content: `# Advanced Risk Management

## Enterprise Risk Management (ERM)
### ERM Framework
- Risk appetite statement
- Risk identification and assessment
- Risk measurement and monitoring
- Risk reporting and governance

### Risk Culture
- Tone from the top
- Risk awareness training
- Incentive alignment
- Three lines of defense

## Advanced Risk Analytics
### Quantitative Methods
- Value at Risk (VaR)
- Expected Shortfall (ES)
- Stress testing methodologies
- Scenario analysis

### Machine Learning Applications
- Credit scoring models
- Fraud detection
- AML pattern recognition
- Operational risk prediction

## Emerging Risks
- Cyber risk management
- Climate risk
- Model risk
- Third-party risk
- Conduct risk`,
        duration: 50,
        quizId: 'generic-finance-quiz',
        completed: false
      },
      {
        id: 'fin-480-3',
        title: 'Future of Banking',
        description: 'Explore the future landscape of banking and financial services',
        content: `# Future of Banking

## Technology Trends
### Artificial Intelligence
- Conversational AI
- Predictive analytics
- Automated decision-making
- Personalization at scale

### Blockchain and DLT
- Central Bank Digital Currencies
- Cross-border payments
- Trade finance
- Identity management

### Cloud and APIs
- Banking as a Service (BaaS)
- Open banking ecosystems
- Microservices architecture
- Real-time processing

## Business