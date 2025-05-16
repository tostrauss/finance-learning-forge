// src/components/trading/ImprovedCandlestickChart.tsx
import React from 'react';
import {
  ComposedChart, XAxis, YAxis, Tooltip, 
  CartesianGrid, ResponsiveContainer, Area
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
  height?: number | string;
  width?: number | string;
}

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload;
  return (
    <div className="bg-white p-3 border rounded shadow-lg">
      <p className="text-gray-600">{label}</p>
      {data.open && <p className="text-gray-800">Open: ${data.open.toFixed(2)}</p>}
      {data.high && <p className="text-gray-800">High: ${data.high.toFixed(2)}</p>}
      {data.low && <p className="text-gray-800">Low: ${data.low.toFixed(2)}</p>}
      <p className="text-gray-800">Close: ${data.close.toFixed(2)}</p>
      {data.volume && (
        <p className="text-gray-800">
          Volume: {(data.volume / 1000000).toFixed(2)}M
        </p>
      )}
    </div>
  );
};

// Custom candlestick renderer component
const CandlestickBar = (props: any) => {
  const { x, y, width, height, open, close, low, high } = props;
  
  if (!open || !close || !high || !low) return null;
  
  // Colors for bullish (up) and bearish (down) candles
  const fill = open > close ? '#ef4444' : '#22c55e';
  const stroke = open > close ? '#dc2626' : '#16a34a';
  
  // Calculate dimensions
  const candleHeight = Math.abs(open - close);
  const highLowHeight = Math.abs(high - low);
  const yStart = Math.min(open, close);
  
  return (
    <g>
      {/* Draw the high-low line */}
      <line
        x1={x + width / 2}
        y1={y + highLowHeight}
        x2={x + width / 2}
        y2={y}
        stroke={stroke}
        strokeWidth={1}
      />
      
      {/* Draw the candle body */}
      <rect
        x={x}
        y={yStart}
        width={width}
        height={candleHeight}
        fill={fill}
        stroke={stroke}
        strokeWidth={1}
      />
    </g>
  );
};

const ImprovedCandlestickChart: React.FC<CandlestickChartProps> = ({ 
  data, 
  height = "100%", 
  width = "100%" 
}) => {
  // Calculate min/max values for axis scaling
  const minValue = Math.min(...data.map(d => Math.min(d.open || d.close, d.low || d.close, d.close)));
  const maxValue = Math.max(...data.map(d => Math.max(d.open || d.close, d.high || d.close, d.close)));
  const padding = (maxValue - minValue) * 0.1;

  // Calculate max volume for the second y-axis
  const maxVolume = Math.max(...data.map(d => d.volume || 0));

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart 
        data={data} 
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis 
          dataKey="date" 
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
        />
        <YAxis 
          yAxisId="price"
          domain={[minValue - padding, maxValue + padding]}
          tickLine={false}
          axisLine={false}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        {data.some(d => d.volume !== undefined) && (
          <YAxis 
            yAxisId="volume"
            orientation="right"
            domain={[0, maxVolume]}
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
        )}
        <Tooltip content={<CustomTooltip />} />
        
        {data.some(d => d.volume !== undefined) && (
          <Area
            type="monotone"
            dataKey="volume"
            fill="rgba(107, 63, 160, 0.1)"
            stroke="none"
            yAxisId="volume"
          />
        )}
        
        {/* Render candlesticks */}
        {data.map((entry, index) => (
          <CandlestickBar
            key={`candle-${index}`}
            x={index * (width as number) / data.length}
            width={Math.max(1, (width as number) / data.length * 0.8)}
            open={entry.open}
            close={entry.close}
            high={entry.high}
            low={entry.low}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ImprovedCandlestickChart;