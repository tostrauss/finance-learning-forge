import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useBacktesting } from '@/contexts/BacktestingContext';
import BacktestChart from './BacktestChart';

const BacktestResults = () => {
  const { lastResult, isLoading } = useBacktesting();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!lastResult) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No backtest results available. Run a backtest to see results here.</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Backtest Results</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Total Return</h3>
            <p className={`text-2xl font-bold ${lastResult.metrics.totalReturn >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {lastResult.metrics.totalReturn >= 0 ? '+' : ''}{lastResult.metrics.totalReturn.toFixed(2)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
            <p className="text-2xl font-bold">{lastResult.metrics.winRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-medium text-gray-500">Profit Factor</h3>
            <p className="text-2xl font-bold">{lastResult.metrics.profitFactor.toFixed(2)}</p>
          </CardContent>
        </Card>
      </div>      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Equity Curve</h3>
          <BacktestChart result={lastResult} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-4">Trade List</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                </tr>
              </thead>              <tbody className="divide-y divide-gray-200">
                {lastResult.trades.map((trade, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(trade.timestamp).toLocaleDateString()}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      trade.type === 'entry' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.type === 'entry' ? 'Buy' : 'Sell'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">${trade.price.toFixed(2)}</td>
                    <td className={`px-6 py-4 whitespace-nowrap ${
                      trade.profitLoss && trade.profitLoss >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {trade.profitLoss ? `${trade.profitLoss >= 0 ? '+' : ''}$${Math.abs(trade.profitLoss).toFixed(2)}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">Sell</td>
                  <td className="px-6 py-4 whitespace-nowrap">$98.50</td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">-$50</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BacktestResults;
