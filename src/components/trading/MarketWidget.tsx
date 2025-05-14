// src/components/trading/MarketWidget.tsx
import React, { useState, useEffect, useRef } from 'react';
import ChartControls from '@/components/ChartControls';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { getHistoricalPrices } from '@/services/yahooFinanceService';

type Props = { selectedSymbol: string };

const MarketWidget: React.FC<Props> = ({ selectedSymbol }) => {
  const [chartType, setChartType] = useState('line');
  const [interval, setInterval] = useState('daily');
  const [timeframe, setTimeframe] = useState('1M');
  const [chartData, setChartData] = useState<any[]>([]);
  const cacheRef = useRef<Record<string, any[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (cacheRef.current[selectedSymbol]) {
        setChartData(cacheRef.current[selectedSymbol]);
        return;
      }
      try {
        const data = await getHistoricalPrices(selectedSymbol);
        const formatted = data
          .filter(point => point.date && point.close)
          .map(point => ({
            date: point.date,
            price: typeof point.close === 'string' ? parseFloat(point.close) : point.close
          }));
        cacheRef.current[selectedSymbol] = formatted;
        setChartData(formatted);
      } catch (error) {
        console.error('Error fetching historical prices:', error);
        setChartData([]);
      }
    };

    fetchData();
  }, [selectedSymbol]);

  const getFilteredData = () => {
    const total = chartData.length;

    switch (timeframe) {
      case '1D':
        return chartData.slice(-Math.min(1, total));
      case '5D':
      case '1W':
        return chartData.slice(-Math.min(5, total));
      case '1M':
        return chartData.slice(-Math.min(22, total));
      case '3M':
        return chartData.slice(-Math.min(66, total));
      case '6M':
        return chartData.slice(-Math.min(132, total));
      case '1Y':
        return chartData.slice(-Math.min(264, total));
      case '5Y':
        return chartData;
      default:
        return chartData;
    }
  };

  const filtered = getFilteredData();

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle>Market Overview: {selectedSymbol}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <ChartControls
          timeframe={timeframe}
          chartType={chartType}
          interval={interval}
          onTimeframeChange={setTimeframe}
          onChartTypeChange={setChartType}
          onIntervalChange={setInterval}
        />

        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No chart data available.</p>
        ) : (
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <>
                {chartType === 'line' && (
                  <LineChart
                    data={filtered}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="price" stroke="#6b3fa0" strokeWidth={2} />
                  </LineChart>
                )}
                {chartType === 'area' && (
                  <AreaChart
                    data={filtered}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke="#6b3fa0"
                      fill="#9b87f5"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                )}
              </>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketWidget;
