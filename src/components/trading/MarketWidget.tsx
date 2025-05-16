// src/components/trading/MarketWidget.tsx
import React, { useState, useEffect } from 'react';
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
  const [chartType, setChartType] = useState<'line' | 'candlestick' | 'area'>('line');
  const [interval, setInterval] = useState('hourly');
  
  // Filter data based on selected timeframe
  const filteredData = React.useMemo(() => {
    if (!chartData.length) return [];

    // Calculate cutoff date based on timeframe
    const now = new Date();
    let cutoffDate = new Date();
    
    switch (selectedTimeframe) {
      case '1D':
        cutoffDate.setDate(now.getDate() - 1);
        break;
      case '5D':
        cutoffDate.setDate(now.getDate() - 5);
        break;
      case '1M':
        cutoffDate.setMonth(now.getMonth() - 1);
        break;
      case '3M':
        cutoffDate.setMonth(now.getMonth() - 3);
        break;
      case '6M':
        cutoffDate.setMonth(now.getMonth() - 6);
        break;
      case '1Y':
        cutoffDate.setFullYear(now.getFullYear() - 1);
        break;
      case '5Y':
        cutoffDate.setFullYear(now.getFullYear() - 5);
        break;
      default:
        return chartData;
    }
    
    // Filter data by date
    return chartData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
  }, [chartData, selectedTimeframe]);

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
          interval={interval}
          onTimeframeChange={setSelectedTimeframe}
          onChartTypeChange={(value) => {
            if (value === 'line' || value === 'candlestick' || value === 'area') {
              setChartType(value);
            }
          }}
          onIntervalChange={setInterval}
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
              data={filteredData.length > 0 ? filteredData : chartData} 
              height="100%" 
              width="100%" 
              chartType={chartType}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketWidget;