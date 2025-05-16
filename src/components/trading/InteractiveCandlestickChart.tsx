// src/components/trading/InteractiveCandlestickChart.tsx
import React, { useCallback } from 'react';
import {
  ComposedChart, XAxis, YAxis, Tooltip, 
  CartesianGrid, ResponsiveContainer, Area, Line,
  ReferenceLine
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
  chartType?: 'line' | 'candlestick' | 'area';
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

const ImprovedCandlestickChart: React.FC<CandlestickChartProps> = ({ 
  data, 
  height = "100%", 
  width = "100%",
  chartType = 'line'
}) => {
  // Calculate min/max values for axis scaling
  const minValue = Math.min(...data.map(d => Math.min(
    d.open !== undefined ? d.open : d.close, 
    d.low !== undefined ? d.low : d.close, 
    d.close
  )));
  const maxValue = Math.max(...data.map(d => Math.max(
    d.open !== undefined ? d.open : d.close, 
    d.high !== undefined ? d.high : d.close, 
    d.close
  )));
  const padding = (maxValue - minValue) * 0.1;

  // Calculate max volume for the second y-axis
  const maxVolume = Math.max(...data.filter(d => d.volume !== undefined).map(d => d.volume || 0));

  // Custom candlestick renderer - using Rectangle SVG elements for each candlestick
  const renderCandlesticks = useCallback(() => {
    if (chartType !== 'candlestick' || !data.length) return null;
    
    return (
      <g className="recharts-candlestick-bars">
        {data.map((entry, index) => {
          if (entry.open === undefined || entry.close === undefined || 
              entry.high === undefined || entry.low === undefined) {
            return null;
          }

          const isPositive = entry.close >= entry.open;
          const color = isPositive ? '#22c55e' : '#ef4444';
          const strokeColor = isPositive ? '#16a34a' : '#dc2626';
          
          // Calculate position percentages relative to domain
          const valueRange = maxValue - minValue + padding * 2;
          const xSize = 1 / data.length * 0.8; // 80% of the space allocated per data point
          const xPosition = index / data.length + (1 / data.length) * 0.1; // Centered with 10% padding
          
          // Calculate wickY positions
          const wickTop = 1 - (entry.high - minValue + padding) / valueRange;
          const wickBottom = 1 - (entry.low - minValue + padding) / valueRange;
          
          // Calculate candleY positions
          const candleTop = 1 - (Math.max(entry.open, entry.close) - minValue + padding) / valueRange;
          const candleBottom = 1 - (Math.min(entry.open, entry.close) - minValue + padding) / valueRange;
          
          return (
            <g key={`candle-${index}`}>
              {/* Wick line */}
              <line
                x1={`${xPosition * 100 + xSize * 50}%`}
                y1={`${wickTop * 100}%`}
                x2={`${xPosition * 100 + xSize * 50}%`}
                y2={`${wickBottom * 100}%`}
                stroke={strokeColor}
                strokeWidth={1}
              />
              
              {/* Candle body */}
              <rect
                x={`${xPosition * 100}%`}
                y={`${candleTop * 100}%`}
                width={`${xSize * 100}%`}
                height={`${(candleBottom - candleTop) * 100}%`}
                fill={color}
                stroke={strokeColor}
                strokeWidth={1}
              />
            </g>
          );
        })}
      </g>
    );
  }, [data, chartType, minValue, maxValue, padding]);

  return (
    <ResponsiveContainer width={width} height={height}>
      <ComposedChart 
        data={data} 
        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
      >
        <defs>
          <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
          </linearGradient>
        </defs>
        
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
            fill="url(#colorVolume)"
            stroke="none"
            yAxisId="volume"
          />
        )}
        
        {/* Render different chart types based on chartType prop */}
        {chartType === 'line' && (
          <Line
            type="monotone"
            dataKey="close"
            stroke="#6b3fa0"
            strokeWidth={2}
            dot={false}
            yAxisId="price"
          />
        )}
        
        {chartType === 'area' && (
          <Area
            type="monotone"
            dataKey="close"
            stroke="#6b3fa0"
            fill="#6b3fa0"
            fillOpacity={0.1}
            yAxisId="price"
          />
        )}
        
        {/* Use custom renderer for candlestick chart */}
        {chartType === 'candlestick' && renderCandlesticks()}
        
        {/* Add reference lines for daily high and low if available */}
        {chartType !== 'candlestick' && data.length > 0 && data[0].high !== undefined && (
          <ReferenceLine 
            y={Math.max(...data.map(d => d.high || 0))} 
            stroke="#16a34a" 
            strokeDasharray="3 3" 
            yAxisId="price" 
          />
        )}
        
        {chartType !== 'candlestick' && data.length > 0 && data[0].low !== undefined && (
          <ReferenceLine 
            y={Math.min(...data.map(d => d.low || 0))} 
            stroke="#dc2626" 
            strokeDasharray="3 3" 
            yAxisId="price" 
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ImprovedCandlestickChart;