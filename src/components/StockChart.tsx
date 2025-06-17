import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  getHistoricalPricesWithInfo, 
  getIntradayPricesWithInfo,
  MarketDataPoint, 
  CompanyInfo 
} from '@/services/yahooFinanceService';

interface ExtendedMarketDataPoint extends MarketDataPoint {
  isWeekend?: boolean;
}

type TimeframeOption = 'today' | '5days' | 'week' | '3month' | '6month' | 'ytd' | '1year' | '5year' | 'all';

interface StockChartProps {
  symbol: string;
  initialTimeframe?: TimeframeOption;
  height?: number;
}

const StockChart: React.FC<StockChartProps> = ({ 
  symbol, 
  initialTimeframe = 'week',
  height = 400 
}) => {
  const [timeframe, setTimeframe] = useState<TimeframeOption>(initialTimeframe);
  const [chartData, setChartData] = useState<ExtendedMarketDataPoint[]>([]);
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Add hover state
  const [hoveredDataPoint, setHoveredDataPoint] = useState<ExtendedMarketDataPoint | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const isIntradayTimeframe = (period: TimeframeOption): boolean => {
    return period === 'today' || period === '5days' || period === 'week' || period === '3month' || period === '6month';
  };

  const getIntradayInterval = (period: TimeframeOption): string => {
    switch (period) {
      case 'today': return '1m';      // 1-minute for today (most granular)
      case '5days': return '5m';      // 5-minute for 5 days
      case 'week': return '15m';      // 15-minute for week
      case '3month': return '1h';     // 1-hour for 3 months
      case '6month': return '1d';     // Daily for 6 months (but treated as intraday)
      default: return '1m';
    }
  };

  const getYahooRange = (period: TimeframeOption): string => {
    switch (period) {
      case 'today': return '1d';
      case '5days': return '5d';
      case 'week': return '7d';
      case '3month': return '3mo';
      case '6month': return '6mo';
      case 'ytd': return 'ytd';
      case '1year': return '1y';
      case '5year': return '5y';
      case 'all': return 'max';
      default: return '1mo';
    }
  };

  const getTimeframeLabel = (period: TimeframeOption): string => {
    switch (period) {
      case 'today': return 'Today (Intraday)';
      case '5days': return 'Past 5 Days (Intraday)';
      case 'week': return 'Past Week (Intraday)';
      case '3month': return 'Past 3 Months (Hourly)';
      case '6month': return 'Past 6 Months (Daily)';
      case 'ytd': return 'Year to Date';
      case '1year': return 'Past Year';
      case '5year': return 'Past 5 Years';
      case 'all': return 'All Available Data';
      default: return 'Historical Data';
    }
  };

  // Add the same filtering logic from ShowHistorical
  const getFilteredData = (data: MarketDataPoint[], period: TimeframeOption): ExtendedMarketDataPoint[] => {
    if (period === 'week') {
      // For week view with intraday data, don't try to create calendar days
      // Just return the intraday data in chronological order
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB; // Ascending order (oldest first)
      });
      
      return sortedData.map(d => ({ ...d, isWeekend: false }));
    } else {
      // For all other timeframes, return data in chronological order (oldest to newest)
      // Sort by date to ensure proper chronological order
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB; // Ascending order (oldest first)
      });
      
      return sortedData.map(d => ({ ...d, isWeekend: false }));
    }
  };

  const fetchChartData = async (selectedTimeframe: TimeframeOption) => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const range = getYahooRange(selectedTimeframe);
      
      let data: MarketDataPoint[];
      let info: CompanyInfo | null;
      
      if (isIntradayTimeframe(selectedTimeframe)) {
        const interval = getIntradayInterval(selectedTimeframe);
        const result = await getIntradayPricesWithInfo(symbol, interval, range);
        data = result.data;
        info = result.companyInfo;
      } else {
        const result = await getHistoricalPricesWithInfo(symbol, range);
        data = result.data;
        info = result.companyInfo;
      }
      
      setCompanyInfo(info);
      // Use the filtered data instead of raw data
      const filteredData = getFilteredData(data, selectedTimeframe);
      setChartData(filteredData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch chart data');
      setChartData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTimeframeChange = (newTimeframe: TimeframeOption) => {
    setTimeframe(newTimeframe);
    fetchChartData(newTimeframe);
    // Reset hover state when changing timeframes
    setHoveredDataPoint(null);
    setIsHovering(false);
  };

  useEffect(() => {
    fetchChartData(timeframe);
  }, [symbol]);

  // Calculate price change for display (use hovered data if available)
  const getPriceChange = (dataPoint?: ExtendedMarketDataPoint) => {
    const validData = chartData.filter(d => !d.isWeekend && d.close > 0);
    
    if (validData.length < 2) return { change: 0, changePercent: 0, isPositive: true };
    
    // If a specific data point is provided (hovered), calculate change from previous point
    if (dataPoint && !dataPoint.isWeekend && dataPoint.close > 0) {
      const currentIndex = validData.findIndex(d => d.date === dataPoint.date);
      if (currentIndex > 0) {
        const previous = validData[currentIndex - 1];
        const change = dataPoint.close - previous.close;
        const changePercent = (change / previous.close) * 100;
        return {
          change,
          changePercent,
          isPositive: change >= 0
        };
      }
    }
    
    // Default to latest data
    const latest = validData[validData.length - 1];
    const previous = validData[validData.length - 2];
    
    const change = latest.close - previous.close;
    const changePercent = (change / previous.close) * 100;
    
    return {
      change,
      changePercent,
      isPositive: change >= 0
    };
  };

  // Get current display data (hovered or latest)
  const currentDataPoint = isHovering && hoveredDataPoint ? hoveredDataPoint : 
                          chartData.filter(d => !d.isWeekend && d.close > 0).slice(-1)[0] || null;
  
  const priceStats = getPriceChange(currentDataPoint);

  // Format date/time for display
  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    
    if (isIntradayTimeframe(timeframe)) {
      return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short',
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  // Format date/time for x-axis labels
  const formatXAxisLabel = (dateStr: string, index: number) => {
    const date = new Date(dateStr);
    
    if (isIntradayTimeframe(timeframe)) {
      // For intraday, show time
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      // For daily data, format based on timeframe
      if (timeframe === 'week') {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        });
      } else if (timeframe === '3month' || timeframe === '6month') {
        return date.toLocaleDateString('en-US', { 
          month: 'short',
          day: 'numeric'
        });
      } else {
        return date.toLocaleDateString('en-US', { 
          month: 'short',
          year: '2-digit'
        });
      }
    }
  };

  // Enhanced chart with interactivity
  const renderEnhancedChart = () => {
    if (chartData.length === 0) return null;

    // Filter out weekend data points for price calculations
    const validPrices = chartData
      .filter(d => !d.isWeekend && d.close > 0)
      .map(d => d.close);
    
    if (validPrices.length === 0) return null;

    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    const priceRange = maxPrice - minPrice;
    
    // Add padding to price range for better visualization
    const pricePadding = priceRange * 0.1;
    const adjustedMinPrice = minPrice - pricePadding;
    const adjustedMaxPrice = maxPrice + pricePadding;
    const adjustedPriceRange = adjustedMaxPrice - adjustedMinPrice;
    
    const chartWidth = 900;
    const chartHeight = height - 60;
    const leftPadding = 80;
    const rightPadding = 20;
    const topPadding = 20;
    const bottomPadding = 60;
    
    const plotWidth = chartWidth - leftPadding - rightPadding;
    const plotHeight = chartHeight - topPadding - bottomPadding;

    // Generate price line points (skip weekend data)
    const validDataPoints = chartData.filter(d => !d.isWeekend && d.close > 0);
    const points = validDataPoints.map((data, index) => {
      const x = leftPadding + (index / (validDataPoints.length - 1)) * plotWidth;
      const y = topPadding + ((adjustedMaxPrice - data.close) / adjustedPriceRange) * plotHeight;
      return `${x},${y}`;
    }).join(' ');

    // Generate y-axis price labels
    const yAxisLabels: { price: number; y: number }[] = [];
    const numYLabels = 6;
    for (let i = 0; i <= numYLabels; i++) {
      const price = adjustedMinPrice + (adjustedPriceRange * (numYLabels - i) / numYLabels);
      const y = topPadding + (i / numYLabels) * plotHeight;
      yAxisLabels.push({ price, y });
    }

    // Generate x-axis date labels
    const xAxisLabels: { date: string; x: number; label: string }[] = [];
    const maxXLabels = isIntradayTimeframe(timeframe) ? 8 : 6;
    const step = Math.max(1, Math.floor(chartData.length / maxXLabels));
    
    for (let i = 0; i < chartData.length; i += step) {
      const data = chartData[i];
      const x = leftPadding + (i / (chartData.length - 1)) * plotWidth;
      xAxisLabels.push({ 
        date: data.date, 
        x,
        label: formatXAxisLabel(data.date, i)
      });
    }

    // Add the last point if it's not included
    if (chartData.length > 1 && (chartData.length - 1) % step !== 0) {
      const lastData = chartData[chartData.length - 1];
      const lastX = leftPadding + plotWidth;
      xAxisLabels.push({ 
        date: lastData.date, 
        x: lastX,
        label: formatXAxisLabel(lastData.date, chartData.length - 1)
      });
    }

    // Handle mouse movement for interactivity
    const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const mouseX = event.clientX - rect.left;
      
      // Check if mouse is within the plot area
      if (mouseX >= leftPadding && mouseX <= leftPadding + plotWidth) {
        // Calculate which data point is closest to the mouse
        const relativeX = (mouseX - leftPadding) / plotWidth;
        const dataIndex = Math.round(relativeX * (validDataPoints.length - 1));
        
        if (dataIndex >= 0 && dataIndex < validDataPoints.length) {
          const dataPoint = validDataPoints[dataIndex];
          setHoveredDataPoint(dataPoint);
          setIsHovering(true);
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setHoveredDataPoint(null);
    };

    // Find hovered point coordinates for crosshair
    let crosshairX = 0;
    let crosshairY = 0;
    if (isHovering && hoveredDataPoint) {
      const validIndex = validDataPoints.findIndex(d => d.date === hoveredDataPoint.date);
      if (validIndex >= 0) {
        crosshairX = leftPadding + (validIndex / (validDataPoints.length - 1)) * plotWidth;
        crosshairY = topPadding + ((adjustedMaxPrice - hoveredDataPoint.close) / adjustedPriceRange) * plotHeight;
      }
    }

    return (
      <div className="w-full overflow-x-auto">
        <svg 
          width={chartWidth} 
          height={chartHeight} 
          className="border rounded bg-white cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
            </pattern>
          </defs>
          
          {/* Chart background */}
          <rect 
            x={leftPadding} 
            y={topPadding} 
            width={plotWidth} 
            height={plotHeight} 
            fill="url(#grid)" 
          />
          
          {/* Y-axis grid lines and labels */}
          {yAxisLabels.map((label, index) => (
            <g key={index}>
              {/* Grid line */}
              <line
                x1={leftPadding}
                y1={label.y}
                x2={leftPadding + plotWidth}
                y2={label.y}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Price label */}
              <text
                x={leftPadding - 10}
                y={label.y + 4}
                fontSize="12"
                fill="#6b7280"
                textAnchor="end"
              >
                ${label.price.toFixed(2)}
              </text>
            </g>
          ))}
          
          {/* X-axis grid lines and labels */}
          {xAxisLabels.map((label, index) => (
            <g key={index}>
              {/* Grid line */}
              <line
                x1={label.x}
                y1={topPadding}
                x2={label.x}
                y2={topPadding + plotHeight}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Date label */}
              <text
                x={label.x}
                y={topPadding + plotHeight + 20}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
                transform={isIntradayTimeframe(timeframe) ? `rotate(-45, ${label.x}, ${topPadding + plotHeight + 20})` : undefined}
              >
                {label.label}
              </text>
            </g>
          ))}
          
          {/* Chart border */}
          <rect 
            x={leftPadding} 
            y={topPadding} 
            width={plotWidth} 
            height={plotHeight} 
            fill="none" 
            stroke="#d1d5db" 
            strokeWidth="2"
          />
          
          {/* Price line */}
          <polyline
            points={points}
            fill="none"
            stroke={priceStats.isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="3"
          />
          
          {/* Data points */}
          {validDataPoints.map((data, index) => {
            const x = leftPadding + (index / (validDataPoints.length - 1)) * plotWidth;
            const y = topPadding + ((adjustedMaxPrice - data.close) / adjustedPriceRange) * plotHeight;
            const isHovered = isHovering && hoveredDataPoint?.date === data.date;
            
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r={isHovered ? "6" : "4"}
                fill={priceStats.isPositive ? "#10b981" : "#ef4444"}
                stroke={isHovered ? "#ffffff" : "none"}
                strokeWidth={isHovered ? "2" : "0"}
                className="transition-all"
              />
            );
          })}
          
          {/* Crosshair lines when hovering */}
          {isHovering && hoveredDataPoint && (
            <g>
              {/* Vertical crosshair line */}
              <line
                x1={crosshairX}
                y1={topPadding}
                x2={crosshairX}
                y2={topPadding + plotHeight}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.7"
              />
              {/* Horizontal crosshair line */}
              <line
                x1={leftPadding}
                y1={crosshairY}
                x2={leftPadding + plotWidth}
                y2={crosshairY}
                stroke="#374151"
                strokeWidth="1"
                strokeDasharray="4,4"
                opacity="0.7"
              />
              {/* Tooltip */}
              <g>
                <rect
                  x={crosshairX + 10}
                  y={crosshairY - 40}
                  width="120"
                  height="35"
                  fill="#374151"
                  rx="4"
                  opacity="0.9"
                />
                <text
                  x={crosshairX + 15}
                  y={crosshairY - 25}
                  fontSize="11"
                  fill="white"
                  fontWeight="600"
                >
                  ${hoveredDataPoint.close.toFixed(2)}
                </text>
                <text
                  x={crosshairX + 15}
                  y={crosshairY - 12}
                  fontSize="9"
                  fill="#d1d5db"
                >
                  {formatDisplayDate(hoveredDataPoint.date)}
                </text>
              </g>
            </g>
          )}
          
          {/* Y-axis label */}
          <text
            x={20}
            y={topPadding + plotHeight / 2}
            fontSize="14"
            fill="#374151"
            textAnchor="middle"
            transform={`rotate(-90, 20, ${topPadding + plotHeight / 2})`}
            fontWeight="600"
          >
            Price (USD)
          </text>
          
          {/* X-axis label */}
          <text
            x={leftPadding + plotWidth / 2}
            y={chartHeight - 10}
            fontSize="14"
            fill="#374151"
            textAnchor="middle"
            fontWeight="600"
          >
            {isIntradayTimeframe(timeframe) ? 'Time' : 'Date'}
          </text>
        </svg>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">
              {companyInfo?.displayName || symbol}
            </CardTitle>
            <p className="text-sm text-gray-600">
              {symbol} • {getTimeframeLabel(timeframe)}
              {isHovering && currentDataPoint && (
                <span className="ml-2 text-blue-600">
                  • {formatDisplayDate(currentDataPoint.date)}
                </span>
              )}
            </p>
            {currentDataPoint && (
              <div className="flex items-center gap-2 mt-2">
                <span className="text-3xl font-bold">
                  ${currentDataPoint.close.toFixed(2)}
                </span>
                <div className={`flex items-center gap-1 ${
                  priceStats.isPositive ? 'text-green-600' : 'text-red-600'
                }`}>
                  {priceStats.isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                  <span className="font-medium">
                    {priceStats.isPositive ? '+' : ''}${priceStats.change.toFixed(2)} 
                    ({priceStats.changePercent.toFixed(2)}%)
                  </span>
                </div>
                {isHovering && (
                  <span className="text-xs text-gray-500 ml-2">
                    (Hover data)
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Timeframe Controls */}
        <div className="space-y-3 mt-4">
          {/* Intraday Options */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Intraday:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={timeframe === 'today' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('today')}
                disabled={loading}
              >
                Today
              </Button>
              <Button
                variant={timeframe === '5days' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('5days')}
                disabled={loading}
              >
                5D
              </Button>
              <Button
                variant={timeframe === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('week')}
                disabled={loading}
              >
                1W
              </Button>
              <Button
                variant={timeframe === '3month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('3month')}
                disabled={loading}
              >
                3M
              </Button>
              <Button
                variant={timeframe === '6month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleTimeframeChange('6month')}
                disabled={loading}
              >
                6M
              </Button>
            </div>
          </div>

          {/* Daily Options */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Daily:</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['ytd', '1year', '5year', 'all'] as TimeframeOption[]).map((tf) => (
                <Button
                  key={tf}
                  variant={timeframe === tf ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange(tf)}
                  disabled={loading}
                >
                  {tf === 'ytd' ? 'YTD' : 
                   tf === '1year' ? '1Y' : 
                   tf === '5year' ? '5Y' : 'ALL'}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading chart data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center text-red-600">
              <p>Error loading chart: {error}</p>
            </div>
          </div>
        ) : chartData.length > 0 ? (
          renderEnhancedChart()
        ) : (
          <div className="flex items-center justify-center" style={{ height }}>
            <p className="text-gray-400">No data available for {symbol}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StockChart;