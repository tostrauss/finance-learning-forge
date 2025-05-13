// src/components/trading/PortfolioWidget.tsx
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ArrowUpRight, ArrowDownRight, DollarSign, BarChart2, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// Sample portfolio data
const portfolioPositions = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, avgCost: 145.30, currentPrice: 165.80, value: 2487.00, gain: 307.50, gainPercent: 14.11 },
  { symbol: 'MSFT', name: 'Microsoft Corp', shares: 10, avgCost: 290.45, currentPrice: 310.20, value: 3102.00, gain: 197.50, gainPercent: 6.80 },
  { symbol: 'AMZN', name: 'Amazon.com Inc', shares: 5, avgCost: 135.20, currentPrice: 142.50, value: 712.50, gain: 36.50, gainPercent: 5.40 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', shares: 8, avgCost: 420.80, currentPrice: 510.40, value: 4083.20, gain: 716.80, gainPercent: 21.28 },
];

// Sample portfolio metrics
const portfolioMetrics = {
  totalValue: 10384.70,
  cashBalance: 2500.30,
  totalGain: 1258.30,
  dayGain: 235.40,
  dayGainPercent: 2.32,
};

// Sample allocation data for pie chart
const allocationData = [
  { name: 'Technology', value: 7589.20 },
  { name: 'Consumer', value: 712.50 },
  { name: 'Healthcare', value: 1325.00 },
  { name: 'Financial', value: 758.00 },
];

// Sample performance data for line chart
const performanceData = [
  { date: '05/01', value: 9850 },
  { date: '05/02', value: 9920 },
  { date: '05/03', value: 9880 },
  { date: '05/06', value: 10050 },
  { date: '05/07', value: 10120 },
  { date: '05/08', value: 10200 },
  { date: '05/09', value: 10350 },
  { date: '05/10', value: 10385 },
];

// Colors for pie chart
const COLORS = ['#6b3fa0', '#9b87f5', '#ff4088', '#ff9f4a'];

const PortfolioWidget = () => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg font-bold">Portfolio</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        {/* Portfolio summary */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Portfolio Value</p>
            <p className="text-2xl font-bold">${portfolioMetrics.totalValue.toLocaleString()}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today's Change</p>
            <div className={`text-lg font-bold flex items-center justify-end ${portfolioMetrics.dayGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {portfolioMetrics.dayGain >= 0 ? 
                <ArrowUpRight className="h-5 w-5 mr-1" /> : 
                <ArrowDownRight className="h-5 w-5 mr-1" />
              }
              ${portfolioMetrics.dayGain.toLocaleString()} ({portfolioMetrics.dayGainPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              <p className="text-sm">Cash Balance</p>
            </div>
            <p className="text-lg font-bold">${portfolioMetrics.cashBalance.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <Activity className="h-4 w-4 mr-1" />
              <p className="text-sm">Total Return</p>
            </div>
            <p className="text-lg font-bold text-green-600">+${portfolioMetrics.totalGain.toLocaleString()}</p>
          </div>
        </div>
        
        {/* Portfolio tabs */}
        <Tabs defaultValue="positions" className="flex-grow flex flex-col">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positions" className="flex-grow overflow-auto">
            <div className="divide-y">
              {portfolioPositions.map(position => (
                <div key={position.symbol} className="py-3 flex justify-between">
                  <div>
                    <p className="font-medium">{position.symbol}</p>
                    <p className="text-xs text-gray-500">{position.name}</p>
                    <p className="text-sm">{position.shares} shares @ ${position.avgCost.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${position.value.toLocaleString()}</p>
                    <p className={`text-xs flex items-center justify-end ${position.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {position.gain >= 0 ? 
                        <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      }
                      ${position.gain.toFixed(2)} ({position.gainPercent.toFixed(2)}%)
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="performance" className="flex-grow">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    domain={['auto', 'auto']} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip formatter={(value) => [`$${value}`, 'Portfolio Value']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6b3fa0" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Portfolio performance over the last 7 trading days
            </div>
          </TabsContent>
          
          <TabsContent value="allocation" className="flex-grow">
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="80%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Value']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Portfolio allocation by sector
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioWidget;