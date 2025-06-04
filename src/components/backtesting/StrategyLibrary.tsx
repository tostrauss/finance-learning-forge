import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useBacktesting } from '@/contexts/BacktestingContext';

interface Strategy {
  id: string;
  name: string;
  description: string;
  performance: {
    totalReturn: number;
    winRate: number;
    trades: number;
  };
}

const StrategyLibrary = () => {
  // This will be replaced with real data from the backend
  const demoStrategies: Strategy[] = [
    {
      id: '1',
      name: 'Moving Average Crossover',
      description: 'Simple strategy based on 50 and 200 day moving average crossovers',
      performance: {
        totalReturn: 15.5,
        winRate: 65,
        trades: 48,
      },
    },
    {
      id: '2',
      name: 'RSI Mean Reversion',
      description: 'Buy oversold conditions (RSI < 30) and sell overbought (RSI > 70)',
      performance: {
        totalReturn: 12.3,
        winRate: 58,
        trades: 86,
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Strategy Library</h2>
        <Button>Create New Strategy</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {demoStrategies.map((strategy) => (
          <Card key={strategy.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{strategy.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{strategy.description}</p>
                </div>
                <Button variant="outline" size="sm">Load</Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-sm text-gray-500">Total Return</p>
                  <p className={`text-lg font-semibold ${
                    strategy.performance.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {strategy.performance.totalReturn >= 0 ? '+' : ''}
                    {strategy.performance.totalReturn.toFixed(1)}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Win Rate</p>
                  <p className="text-lg font-semibold">
                    {strategy.performance.winRate}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Trades</p>
                  <p className="text-lg font-semibold">
                    {strategy.performance.trades}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StrategyLibrary;
