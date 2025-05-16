// src/components/trading/MarketWidget.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ChartControls from '../ChartControls';
import ImprovedCandlestickChart from './InteractiveCandlestickChart';

interface MarketDataPoint {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

interface MarketWidgetProps {
  symbol?: string;
  chartData: MarketDataPoint[];
  loading: boolean;
  error?: string;
  onSelectSymbol?: (symbol: string) => void;
}

const MarketWidget: React.FC<MarketWidgetProps> = ({ 
  symbol = 'AAPL', 
  chartData = [], 
  loading = false, 
  error, 
  onSelectSymbol 
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [chartType, setChartType] = useState<'line' | 'candlestick'>('line');

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between border-b">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold">{symbol}</CardTitle>
          <p className="text-sm text-gray-500">Market Data</p>
        </div>
        <ChartControls 
          timeframe={selectedTimeframe}
          chartType={chartType}
          interval="1d"
          onTimeframeChange={setSelectedTimeframe}
          onChartTypeChange={(value) => {
            if (value === 'line' || value === 'candlestick') {
              setChartType(value);
            }
          }}
          onIntervalChange={() => {}}
        />
      </CardHeader>
      
      <CardContent className="p-4 flex-1 min-h-0">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple"></div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center text-red-500">
            {error}
          </div>
        ) : (
          <div className="h-full w-full">
            <ImprovedCandlestickChart 
              data={chartData} 
              height="100%" 
              width="100%" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketWidget;