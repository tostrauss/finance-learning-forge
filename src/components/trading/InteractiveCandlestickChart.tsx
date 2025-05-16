// src/components/trading/InteractiveCandlestickChart.tsx
import React, { useState } from 'react';
import {
  ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, ReferenceLine
} from 'recharts';
import { cn } from '@/lib/utils';

interface MarketDataPoint {
  date: string;
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
}

interface CandlestickChartProps {
  data: MarketDataPoint[];
}

const InteractiveCandlestickChart: React.FC<CandlestickChartProps> = ({ data }) => {
  // Process data into bullish and bearish sets
  const processedData = data.map(d => {
    const open = d.open ?? d.close;
    const high = d.high ?? Math.max(open, d.close);
    const low = d.low ?? Math.min(open, d.close);
    const isUp = d.close >= open;
    
    return {
      ...d,
      open,
      high,
      low,
      isUp,
      // For bullish candles (close >= open)
      bullishStart: isUp ? open : null,
      bullishEnd: isUp ? close : null,
      // For bearish candles (close < open)
      bearishStart: !isUp ? close : null,
      bearishEnd: !isUp ? open : null,
    };
  });

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const change = (data.close - data.open).toFixed(2);
      const percentChange = ((data.close - data.open) / data.open * 100).toFixed(2);
      const sign = data.isUp ? '+' : '';
      
      return (
        <div className="bg-white border rounded shadow-lg p-3 text-xs">
          <p className="font-bold">{label}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">
            <span className="text-gray-500">Open:</span>
            <span className="font-mono">${data.open.toFixed(2)}</span>
            <span className="text-gray-500">High:</span>
            <span className="font-mono">${data.high.toFixed(2)}</span>
            <span className="text-gray-500">Low:</span>
            <span className="font-mono">${data.low.toFixed(2)}</span>
            <span className="text-gray-500">Close:</span>
            <span className="font-mono">${data.close.toFixed(2)}</span>
            <span className="text-gray-500">Change:</span>
            <span className={cn("font-mono", data.isUp ? "text-green-600" : "text-red-600")}>
              {sign}{change} ({sign}{percentChange}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={processedData} margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis 
          dataKey="date" 
          tickLine={false} 
          axisLine={false}
        />
        <YAxis 
          domain={['auto', 'auto']} 
          tickLine={false} 
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Tooltip content={<CustomTooltip />} />
        
        {/* Draw high-low wicks for each point */}
        {processedData.map((entry, index) => (
          <ReferenceLine 
            key={`wick-${index}`}
            segment={[
              { x: entry.date, y: entry.low },
              { x: entry.date, y: entry.high }
            ]}
            stroke={entry.isUp ? "#4caf50" : "#f44336"}
            strokeWidth={1}
          />
        ))}
        
        {/* Bullish candles (green) */}
        <Bar 
          dataKey="bullishStart" 
          stackId="candle"
          fill="#4caf50"
          stroke="#4caf50"
          barSize={8}
        />
        <Bar 
          dataKey="bullishEnd" 
          stackId="candle"
          fill="#4caf50"
          stroke="#4caf50"
          barSize={8}
        />
        
        {/* Bearish candles (red) */}
        <Bar 
          dataKey="bearishStart" 
          stackId="candle"
          fill="#f44336"
          stroke="#f44336"
          barSize={8}
        />
        <Bar 
          dataKey="bearishEnd" 
          stackId="candle"
          fill="#f44336"
          stroke="#f44336"
          barSize={8}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default InteractiveCandlestickChart;