# Finance Learning Forge (FLF)

**From Students, For Students: Revolutionizing Finance Education**

Welcome to Finance Learning Forge! We are two former college athletes who, after transitioning from the field to the fast-paced worlds of finance and technology, noticed a significant gap in traditional finance education. We often found ourselves equipped with theories but yearning for more practical, hands-on experience. That's why we built FLF – the integrated learning platform we wish we had during our university years. Our mission is to bridge the divide between classroom concepts and real-world financial decision-making, empowering students like you to step into the finance industry with confidence and practical skills.

## What is Finance Learning Forge?

Finance Learning Forge is a comprehensive, web-based educational platform meticulously designed to transform how finance is taught and learned at the university level. FLF seamlessly integrates a structured academic curriculum with an interactive trading simulation environment and robust career preparation tools. It's an all-in-one solution for aspiring finance professionals.

Our platform is built around four core pillars:

1.  **The Learning Hub:** Your central dashboard for navigating the BS in Finance curriculum, understanding course pathways by concentration, accessing detailed course information, and tracking your academic progress towards graduation.
2.  **The Trading Simulator (Inspired by Webull):** A sophisticated, yet user-friendly paper trading environment where you can apply theoretical knowledge. Practice trading stocks, ETFs, and options with realistic market data, customizable charts, and essential analysis tools without risking real capital.
3.  **Course-Specific Tools & Simulations:** Unique, interactive tools and calculators directly linked to specific finance courses. Apply concepts from corporate finance, investments, financial planning, and more in targeted, practical simulations.
4.  **Career Preparation Module:** A dedicated suite of resources to get you job-ready, including preparation materials for the FINRA SIE exam, a dynamic finance resume builder, and an interview simulator for both technical and behavioral questions.

## Why We Built This: Our Story & Motivation

As former collegiate athletes, we learned the values of discipline, strategy, and performance under pressure. When we dove into finance and technology, we brought that same drive. However, we quickly realized that much of finance education was heavy on theory and light on the practical application needed to truly master the concepts. We saw an opportunity to change that.

Finance Learning Forge was born from our shared experience and a desire to create a more effective, engaging, and practical learning journey for finance students. We believe that the best way to learn finance is by *doing* finance.

FLF aims to:

*   **Bridge the Theory-Practice Gap:** Connect abstract financial concepts directly to their real-world applications through simulation and interactive tools.
*   **Provide Hands-On Experience:** Offer a safe, realistic environment to test strategies, understand market dynamics, and build practical trading skills.
*   **Enhance Learning & Retention:** Reinforce classroom learning through active engagement and immediate application.
*   **Foster Career Readiness:** Equip students with the specific knowledge (like SIE exam content), tools (like a tailored resume), and practice (interview simulations) needed to succeed in the competitive finance job market.

Our ultimate goal is to help produce finance graduates who not only understand complex financial theories but can also confidently apply them from day one of their careers.

## Key Features

*   **Integrated Learning Ecosystem:** Seamlessly transition between theoretical course modules, practical trading simulations, and career preparation resources.
*   **Personalized Progress Tracking:** Visualize your academic journey, monitor course completion, and track your performance in the trading simulator.
*   **Realistic Trading Simulator:**
    *   Inspired by platforms like Webull for a modern, intuitive experience.
    *   Trade US Stocks, ETFs, and Options with virtual capital.
    *   Access real-time or near real-time market data.
    *   Utilize customizable charts with 60+ technical indicators and 20+ drawing tools.
    *   Track your portfolio, P&L, and analyze your trading performance.
*   **Course-Specific Financial Tools:**
    *   Interactive calculators and mini-simulations for Corporate Finance (NPV, IRR, WACC, DCF), Investment Management (CAPM, portfolio construction), Financial Planning, International Finance (Forex simulation), and Banking.
*   **Comprehensive Career Preparation:**
    *   **SIE Exam Prep:** Structured modules and practice questions aligned with the FINRA SIE content outline.
    *   **Finance Resume Builder:** Dynamically generate resume points based on completed courses and platform achievements.
    *   **Interview Simulator:** Practice answering common technical and behavioral finance interview questions.
*   **Reflective Practice:** An integrated Trading Journal to analyze your trading decisions, link them to learning objectives, and reflect on your strategies.

## Technology Stack

*   **Frontend:** React, TypeScript, Vite
*   **UI Components:** shadcn/ui, Tailwind CSS
*   **Charts/Visualization:** Recharts (or similar, e.g., TradingView charting libraries if integrated)
*   **State Management:** React Query (or similar like Redux Toolkit, Zustand)
*   **Routing:** React Router

## Project Structure

A brief overview of our codebase organization:
/src
├── /components
│   ├── /learning       # Learning Hub UI components (ProgramDashboard, CurriculumPathway, etc.)
│   ├── /trading        # Trading Simulator UI components (TradingDashboard, MarketWidget, etc.)
│   ├── /courseSims     # Course-Specific simulation tools (CorporateFinanceTools, etc.)
│   ├── /career         # Career Preparation UI components (SIEPrep, FinanceResume, etc.)
│   └── /shared         # Common UI components used across the platform
├── /data               # Static data, e.g., financeProgram.ts (curriculum structure, course details)
├── /hooks              # Custom React hooks
├── /pages              # Top-level page components for routing (Learning, Dashboard, CourseDetail, etc.)
├── /services           # API interaction logic, utility functions
├── /store              # State management setup (if applicable)
├── /styles             # Global styles, Tailwind configuration
├── /types              # TypeScript type definitions (curriculum.ts, trading.ts, etc.)
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Getting Started

To get a local copy up and running, follow these simple steps:

```sh
# 1. Clone the repository
git clone [https://github.com/yourusername/finance-learning-forge.git](https://github.com/yourusername/finance-learning-forge.git) # <-- Replace with your actual repo URL

# 2. Navigate to the project directory
cd finance-learning-forge

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Your application should now be running on `http://localhost:5173` (or another port if specified by Vite).

## Platform Modules in Detail

### 1. Learning Hub

The academic core of FLF, designed to guide you through your finance degree.

*   **`ProgramDashboard.tsx`**: Your personalized homepage displaying an overview of the BS Finance program, your current progress, and quick access to key modules.
*   **`CurriculumPathway.tsx`**: Visually explore course requirements, filter by concentration, and understand prerequisite chains to plan your academic schedule effectively.
*   **`CourseDetail.tsx`**: An enhanced view for each course, featuring syllabi, learning objectives, prerequisites, and direct links to relevant Course-Specific Tools and Trading Simulator scenarios.
*   **`AcademicProgress.tsx`**: A comprehensive tool to track your degree completion status, credits earned, and progress within specific concentrations.

### 2. Trading Simulator

Experience the markets firsthand in our Webull-inspired paper trading environment.

*   **`TradingDashboard.tsx`**: The main trading interface, featuring customizable widgets for charts, order entry, news, and portfolio management.
*   **`MarketWidget.tsx`**: Powerful market data visualization with interactive charts (candlestick, line, etc.), a wide array of technical indicators (Moving Averages, RSI, MACD), and drawing tools for technical analysis.
*   **`PortfolioWidget.tsx`**: Track your virtual portfolio in real-time, monitor your positions, analyze profit & loss (P&L), and review your trading history.
*   **`FinancialCalculators.tsx`**: A suite of integrated calculators for essential financial computations (TVM, NPV, WACC, CAPM, etc.), often linked directly from relevant course modules.
*   **`TradingJournal.tsx`**: A crucial tool for reflective practice. Log your trades, articulate your rationale, link decisions to course learning objectives, and analyze your performance to identify patterns and improve your strategies.

### 3. Course-Specific Simulation Tools

Bridge theory and practice with tools tailored to your coursework.

*   **`CorporateFinanceTools.tsx` (FIN 302, FIN 405, FIN 407):** Interactive simulations for DCF analysis, WACC calculation, M&A scenario modeling, and other core corporate finance decisions.
*   **`InvestmentTools.tsx` (FIN 403):** Tools for portfolio construction, asset allocation visualization, risk/return calculations (Sharpe Ratio, Beta), and applying CAPM.
*   **`FinancialPlanningTools.tsx` (FIN 306, FIN 402):** Calculators and simulators for retirement planning, budgeting, loan amortization, and insurance needs analysis.
*   **`InternationalTools.tsx` (FIN 411, FIN 422):** A basic Forex simulator, tools for understanding currency hedging, and analyzing international cost of capital.
*   **`BankingTools.tsx` (ECO 303, FIN 280):** Simulators for understanding reserve requirements, interest rate spread analysis, and basic credit risk assessment.

### 4. Career Preparation Module

Get ready to launch your finance career.

*   **`SIEPrep.tsx`**: Comprehensive study materials, practice questions, and mock exams for the FINRA Securities Industry Essentials (SIE) exam, aligned with the official content outline.
*   **`FinanceResume.tsx`**: A dynamic resume builder that helps you articulate the skills and experiences gained from your coursework and FLF platform activities, with templates tailored for finance roles.
*   **`InterviewSimulator.tsx`**: Practice answering a wide range of technical and behavioral interview questions common in finance interviews, with guidance on structuring effective responses (e.g., STAR method).

## Future Roadmap

We're just getting started! Here are some of the exciting features and enhancements we envision for the future of FLF:

*   **Enhanced Market Data Integration:** Deeper Level 2 data, more sophisticated real-time feeds.
*   **Advanced Options Trading Simulation:** Support for multi-leg strategies and advanced options analytics.
*   **Expanded Course-Specific Tools:** More specialized tools covering all finance concentrations in greater depth.
*   **AI-Powered Feedback:** Personalized insights and suggestions within the Trading Journal and learning modules.
*   **Community Features:** Forums for peer-to-peer learning, discussion groups for courses, and collaborative simulation challenges.
*   **Mobile Application:** A dedicated mobile app for learning and trading on the go.
*   **Guest Lectures & Industry Insights:** Integrating content from finance professionals.
*   **Gamification:** Badges, leaderboards (optional), and challenges to enhance engagement.

## Contributing

We built Finance Learning Forge for students, and we believe in the power of collaboration. We welcome contributions from fellow students, educators, and developers who share our passion for improving finance education. If you're interested in contributing, please read our `CONTRIBUTING.md` file (to be created) for guidelines on how to submit pull requests, report issues, and suggest features.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

---

**Built with 💜 by students, for students. We believe finance education deserves better tools, and we're excited to build them with you.**
```