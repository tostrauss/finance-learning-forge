import React, { useState } from 'react';

const FinanceLearningPath = () => {
  const [selectedPath, setSelectedPath] = useState('corporate');
  
  const paths = [
    {
      id: 'corporate',
      name: 'Corporate Finance',
      description: 'Develop skills in financial management for corporations, including capital structure optimization, investment analysis, and corporate valuation.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: '#5C2D91',
      modules: [
        { id: 'corp-1', name: 'Capital Structure and Financing Decisions', level: 1, locked: false, completed: true },
        { id: 'corp-2', name: 'Capital Budgeting', level: 2, locked: false, completed: false },
        { id: 'corp-3', name: 'Working Capital Management', level: 3, locked: false, completed: false },
        { id: 'corp-4', name: 'Dividend Policy', level: 4, locked: true, completed: false }
      ]
    },
    {
      id: 'planning',
      name: 'Financial Planning & Analysis',
      description: 'Learn to build financial models, perform budget analysis, and develop forecasts to support strategic business decisions.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: '#0078D4',
      modules: [
        { id: 'plan-1', name: 'Financial Modeling Fundamentals', level: 1, locked: false, completed: true },
        { id: 'plan-2', name: 'Budgeting and Forecasting', level: 2, locked: false, completed: false },
        { id: 'plan-3', name: 'Variance Analysis', level: 3, locked: true, completed: false },
        { id: 'plan-4', name: 'Scenario Planning', level: 4, locked: true, completed: false },
        { id: 'plan-5', name: 'Finance Business Partnering', level: 5, locked: true, completed: false }
      ]
    },
    {
      id: 'banking',
      name: 'Financial Services & Banking',
      description: 'Explore banking operations, financial product development, regulatory compliance, and client relationship management.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: '#217346',
      modules: [
        { id: 'bank-1', name: 'Banking Operations Fundamentals', level: 1, locked: false, completed: false },
        { id: 'bank-2', name: 'Financial Regulations & Compliance', level: 2, locked: true, completed: false },
        { id: 'bank-3', name: 'Credit Analysis & Lending', level: 3, locked: true, completed: false },
        { id: 'bank-4', name: 'Financial Products & Services', level: 4, locked: true, completed: false },
        { id: 'bank-5', name: 'Risk Management in Banking', level: 5, locked: true, completed: false }
      ]
    },
    {
      id: 'general',
      name: 'General Finance',
      description: 'Build a broad foundation in finance principles, including investments, financial markets, portfolio management, and corporate finance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#B7472A',
      modules: [
        { id: 'gen-1', name: 'Financial Markets Overview', level: 1, locked: false, completed: true },
        { id: 'gen-2', name: 'Investment Fundamentals', level: 2, locked: false, completed: true },
        { id: 'gen-3', name: 'Financial Statement Analysis', level: 3, locked: false, completed: false },
        { id: 'gen-4', name: 'Time Value of Money', level: 4, locked: true, completed: false },
        { id: 'gen-5', name: 'Portfolio Management', level: 5, locked: true, completed: false }
      ]
    },
    {
      id: 'international',
      name: 'International Finance',
      description: 'Study global financial markets, exchange rates, international investments, and cross-border financial management.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: '#8764B8',
      modules: [
        { id: 'int-1', name: 'Global Financial Markets', level: 1, locked: false, completed: false },
        { id: 'int-2', name: 'Exchange Rates & Currency Markets', level: 2, locked: true, completed: false },
        { id: 'int-3', name: 'International Investments', level: 3, locked: true, completed: false },
        { id: 'int-4', name: 'Country Risk Analysis', level: 4, locked: true, completed: false },
        { id: 'int-5', name: 'International Trade Finance', level: 5, locked: true, completed: false }
      ]
    },
    {
      id: 'personal',
      name: 'Personal Financial Planning',
      description: 'Master financial planning for individuals, including retirement planning, tax strategies, estate planning, and insurance.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      color: '#C74634',
      modules: [
        { id: 'pers-1', name: 'Retirement Planning Strategies', level: 1, locked: false, completed: true },
        { id: 'pers-2', name: 'Tax Strategies for Individuals', level: 2, locked: false, completed: false },
        { id: 'pers-3', name: 'Estate Planning', level: 3, locked: true, completed: false },
        { id: 'pers-4', name: 'Insurance Planning', level: 4, locked: true, completed: false },
        { id: 'pers-5', name: 'Personal Investment Planning', level: 5, locked: true, completed: false }
      ]
    }
  ];
  
  const selectedPathData = paths.find(p => p.id === selectedPath);
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Post University Finance Curriculum</h2>
        <p className="text-gray-600 mb-6">Select a concentration to explore the learning path</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {paths.map(path => (
            <button
              key={path.id}
              className={`flex flex-col items-center p-4 rounded-lg transition-all ${
                selectedPath === path.id 
                  ? 'bg-opacity-10 border-2'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
              }`}
              onClick={() => setSelectedPath(path.id)}
              style={{
                backgroundColor: selectedPath === path.id ? hexToRgba(path.color, 0.1) : '',
                borderColor: selectedPath === path.id ? path.color : 'transparent'
              }}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full mb-2" style={{ color: path.color }}>
                {path.icon}
              </div>
              <span className="text-sm font-medium text-center" style={{ color: path.color }}>{path.name}</span>
            </button>
          ))}
        </div>
        
        {selectedPathData && (
          <div>
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 flex items-center justify-center rounded-full mr-4" style={{ color: selectedPathData.color, backgroundColor: hexToRgba(selectedPathData.color, 0.1) }}>
                {selectedPathData.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">{selectedPathData.name}</h3>
                <p className="text-gray-600">{selectedPathData.description}</p>
                
                <div className="mt-2">
                  <span className="text-sm font-medium text-gray-600">Career paths: </span>
                  <span className="text-sm text-gray-800">Financial Manager, Treasury Analyst, Corporate Financial Analyst</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>
              
              {selectedPathData.modules.map((module, index) => (
                <div key={module.id} className="relative mb-6 pl-16">
                  <div className={`absolute left-4 w-5 h-5 rounded-full border-4 ${
                    module.completed 
                      ? 'bg-green-500 border-green-200' 
                      : module.locked 
                        ? 'bg-gray-300 border-gray-200' 
                        : 'bg-white border-2'
                  }`} style={{ borderColor: !module.completed && !module.locked ? selectedPathData.color : '' }}></div>
                  
                  <div className={`p-4 rounded-lg ${
                    module.completed 
                      ? 'bg-green-50 border border-green-100' 
                      : module.locked 
                        ? 'bg-gray-50 border border-gray-200' 
                        : 'bg-white border-2 shadow-sm'
                  }`} style={{ borderColor: !module.completed && !module.locked ? selectedPathData.color : '' }}>
                    <div className="flex justify-between items-center">
                      <h4 className={`font-medium ${module.locked ? 'text-gray-500' : 'text-gray-800'}`}>
                        {module.name}
                      </h4>
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          Level {module.level}
                        </span>
                        {module.completed && (
                          <span className="ml-2 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                        {module.locked && (
                          <span className="ml-2 text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {!module.locked && (
                      <div className="mt-3 flex">
                        <button 
                          className={`text-sm font-medium rounded-md px-3 py-1 mr-2 ${
                            module.completed 
                              ? 'bg-green-500 text-white' 
                              : 'text-white'
                          }`}
                          style={{ backgroundColor: !module.completed ? selectedPathData.color : '' }}
                        >
                          {module.completed ? 'Completed' : 'Start Learning'}
                        </button>
                        
                        {!module.completed && (
                          <button className="text-sm font-medium rounded-md px-3 py-1 border border-gray-300 text-gray-700 hover:bg-gray-50">
                            View Quiz
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to convert hex color to rgba
function hexToRgba(hex: string, alpha = 1) {
  // Check if hex is a valid color format
  const isValidHex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
  if (!isValidHex) return `rgba(0, 0, 0, ${alpha})`;
  
  // Convert hex to rgba
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default FinanceLearningPath;
