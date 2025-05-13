// src/components/trading/MarketWidget.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, ArrowUpRight, ArrowDownRight, Clock, Menu } from 'lucide-react';

// Sample market data - in a real implementation this would come from an API
const sampleMarketData = [
  { date: '2025-05-01', price: 157.25, volume: 45000000 },
  { date: '2025-05-02', price: 159.40, volume: 52000000 },
  { date: '2025-05-03', price: 158.90, volume: 38000000 },
  { date: '2025-05-06', price: 161.75, volume: 62000000 },
  { date: '2025-05-07', price: 160.45, volume: 41000000 },
  { date: '2025-05-08', price: 163.20, volume: 58000000 },
  { date: '2025-05-09', price: 165.80, volume: 63000000 },
  { date: '2025-05-10', price: 164.25, volume: 42000000 },
  { date: '2025-05-13', price: 167.90, volume: 56000000 },
];

// Sample market indices
const marketIndices = [
  { symbol: 'SPY', name: 'S&P 500', price: 487.32, change: 5.23, changePercent: 1.08 },
  { symbol: 'QQQ', name: 'NASDAQ', price: 432.18, change: 7.45, changePercent: 1.75 },
  { symbol: 'DIA', name: 'Dow Jones', price: 391.56, change: -2.14, changePercent: -0.54 },
  { symbol: 'IWM', name: 'Russell 2000', price: 218.75, change: 1.25, changePercent: 0.57 },
];

const MarketWidget = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL');
  const [chartType, setChartType] = useState('line');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold">Market Data</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative w-60">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search symbols..."
              className="pl-8 h-9"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        {/* Market summary panel */}
        <div className="grid grid-cols-4 gap-3">
          {marketIndices.map(index => (
            <div key={index.symbol} className="bg-gray-50 rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold">{index.symbol}</p>
                  <p className="text-xs text-gray-500">{index.name}</p>
                </div>
                <div className={`text-xs font-medium flex items-center ${index.changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {index.changePercent >= 0 ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  {index.changePercent.toFixed(2)}%
                </div>
              </div>
              <p className="text-lg font-bold mt-1">{index.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        
        {/* Stock chart section */}
        <div className="flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-baseline">
              <h3 className="text-xl font-bold">{selectedSymbol}</h3>
              <span className="text-sm text-gray-500 ml-2">Apple Inc.</span>
            </div>
            <div className="flex items-center space-x-2">
              <p className="text-lg font-bold">$165.80</p>
              <span className="text-sm font-medium text-green-600 flex items-center">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                2.55 (1.56%)
              </span>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <Tabs value={chartType} onValueChange={setChartType} className="w-auto">
              <TabsList>
                <TabsTrigger value="line">Line</TabsTrigger>
                <TabsTrigger value="area">Area</TabsTrigger>
                <TabsTrigger value="candle">Candle</TabsTrigger>
              </TabsList>
            </Tabs>
            
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
          
          <div className="flex-grow w-full" style={{ minHeight: "250px" }}>
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'line' ? (
                <LineChart data={sampleMarketData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#6b3fa0" 
                    dot={false} 
                    strokeWidth={2}
                  />
                </LineChart>
              ) : (
                <AreaChart data={sampleMarketData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} />
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
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Trading actions */}
        <div className="flex space-x-3">
          <Button className="flex-1 bg-app-purple hover:bg-app-dark-purple">
            Buy
          </Button>
          <Button variant="outline" className="flex-1 border-app-purple text-app-purple hover:bg-app-light-purple/10">
            Sell
          </Button>
          <Button variant="outline" className="flex-1">
            Add to Watchlist
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketWidget;