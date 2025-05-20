// src/pages/PracticePage.tsx
import React from 'react';
import Layout from '@/components/Layout';

const PracticePage: React.FC = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Practice</h1>
        <p className="text-gray-600 mb-6">
          Welcome to the Practice area! Here you can hone your trading skills with interactive exercises and quizzes.
        </p>

        {/* TODO: Replace the placeholders below with actual practice modules */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-medium mb-2">Stock Price Guess</h2>
            <p className="text-gray-500">Try to predict tomorrow's closing price for a given stock.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2">Chart Pattern Quiz</h2>
            <p className="text-gray-500">Identify common candlestick patterns from historical data.</p>
          </section>

          <section>
            <h2 className="text-xl font-medium mb-2">Risk Assessment</h2>
            <p className="text-gray-500">Calculate the risk-reward ratio of sample trades.</p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
