// src/components/trading/MarketWidget.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar, ReferenceLine,
  ComposedChart, Legend
} from 'recharts';
import { Search, Clock, Menu, CandlestickChart as CandlestickIcon, LineChart as LineChartIcon } from 'lucide-react';

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

// Custom candlestick chart component using Recharts
const CandlestickChart = ({ data }: { data: MarketDataPoint[] }) => {
  if (!data || data.length === 0) return null;
  
  // For each data point, create separate bars for up and down movements
  const processedData = data.map(d => {
    // If we only have close data, use it for all OHLC values
    const open = d.open ?? d.close;
    const high = d.high ?? Math.max(open, d.close);
    const low = d.low ?? Math.min(open, d.close);
    
    const isIncreasing = (d.close >= open);
    
    return {
      ...d,
      open,
      high,
      low,
      isIncreasing
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={processedData}>
        <XAxis 
          dataKey="date" 
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={false}
        />
        <YAxis 
          domain={["auto", "auto"]} 
          tick={{ fontSize: 12 }} 
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
          labelFormatter={(label) => `Date: ${label}`}
        />
        <Legend />
        
        {/* High-Low lines */}
        {processedData.map((entry, index) => (
          <ReferenceLine 
            key={`hl-${index}`}
            segment={[
              { x: index, y: entry.low },
              { x: index, y: entry.high }
            ]}
            stroke="#8884d8"
            strokeWidth={1}
            isFront={false}
          />
        ))}
        
        {/* Up candles */}
        <Bar 
          dataKey="open" 
          fill="#4caf50" 
          stroke="#4caf50"
          name="Increasing"
          barSize={8}
          isAnimationActive={false}
        />
        
        {/* Down candles */}
        <Bar 
          dataKey="close" 
          fill="#f44336" 
          stroke="#f44336"
          name="Decreasing"
          barSize={8}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

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
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Market Data</CardTitle>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-9">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        {loading ? (
          <div className="flex-grow flex items-center justify-center">
            <p>Loading chart data...</p>
          </div>
        ) : error ? (
          <div className="flex-grow flex items-center justify-center">
            <p className="text-red-500">Error: {error}</p>
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex-grow flex items-center justify-center">
            <p>No data available for {symbol}</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-baseline">
                <h3 className="text-xl font-bold">{symbol}</h3>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">
                  ${chartData[chartData.length - 1]?.close.toFixed(2) || '0.00'}
                </p>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Button 
                  variant={chartType === 'line' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('line')}
                  className={chartType === 'line' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
                >
                  <LineChartIcon className="h-4 w-4 mr-1" />
                  Line
                </Button>
                <Button 
                  variant={chartType === 'candlestick' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setChartType('candlestick')}
                  className={chartType === 'candlestick' ? 'bg-app-purple hover:bg-app-dark-purple' : ''}
                >
                  <CandlestickIcon className="h-4 w-4 mr-1" />
                  Candlestick
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                  <SelectTrigger className="w-20 h-8">
                    <SelectValue placeholder="1D" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1D">1D</SelectItem>
                    <SelectItem value="1W">1W</SelectItem>
                    <SelectItem value="1M">1M</SelectItem>
                    <SelectItem value="3M">3M</SelectItem>
                    <SelectItem value="1Y">1Y</SelectItem>
                    <SelectItem value="5Y">5Y</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline" size="sm" className="h-8">
                  <Clock className="h-4 w-4 mr-1" />
                  Real-time
                </Button>
              </div>
            </div>
            
            <div className="flex-grow">
              {chartType === 'line' ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']} />
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#6b3fa0" 
                      dot={false} 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <CandlestickChart data={chartData} />
              )}
            </div>
          </>
        )}
        
        {/* Trading actions */}
        <div className="flex space-x-3">
          <Button className="flex-1 bg-app-purple hover:bg-app-dark-purple">
            Buy
          </Button>
          <Button variant="outline" className="flex-1 border-app-purple text-app-purple hover:bg-app-light-purple/10">
            Sell
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketWidget;