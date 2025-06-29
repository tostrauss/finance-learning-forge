import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { 
  getHistoricalPricesWithInfo, 
  getIntradayPricesWithInfo,
  MarketDataPoint, 
  CompanyInfo 
} from '@/services/yahooFinanceService';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExtendedMarketDataPoint extends MarketDataPoint {
  isWeekend?: boolean;
}

type TimeframeOption = 'today' | '5days' | 'week' | '1month' | '3month' | '6month' | 'ytd' | '1year' | '5year' | 'all';

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
  const [hoveredDataPoint, setHoveredDataPoint] = useState<ExtendedMarketDataPoint | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, panX: 0, panY: 0 });
  const [selectedInterval, setSelectedInterval] = useState('15m');
  const svgRef = useRef<SVGSVGElement>(null);

  const getYahooRange = (period: TimeframeOption): string => {
    switch (period) {
      case 'today': return '1d';
      case '5days': return '5d';
      case 'week': return '7d';
      case '1month': return '1mo';
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
      case '1month': return 'Past Month (30-min)';
      case '3month': return 'Past 3 Months (Hourly)';
      case '6month': return 'Past 6 Months (Daily)';
      case 'ytd': return 'Year to Date';
      case '1year': return 'Past Year';
      case '5year': return 'Past 5 Years';
      case 'all': return 'All Available Data';
      default: return 'Historical Data';
    }
  };

  // Enhanced Y-axis scaling based on timeframe and interval
  const getOptimalPriceRange = (validPrices: number[], timeframe: TimeframeOption, interval: string) => {
    if (validPrices.length === 0) return { min: 0, max: 100, padding: 10 };

    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    const priceRange = maxPrice - minPrice;

    // Dynamic padding based on timeframe and volatility
    let paddingMultiplier = 0.05; // Default 5% padding

    // Adjust padding based on specific timeframe characteristics
    switch (timeframe) {
      case 'today':
        // Very short-term intraday - minimal padding for granular view
        paddingMultiplier = 0.02;
        break;
      case '5days':
        // Short-term intraday - small padding
        paddingMultiplier = 0.03;
        break;
      case 'week':
        // Week intraday - moderate padding but still tight
        paddingMultiplier = 0.04;
        break;
      case '1month':
        // Month intraday - slightly more padding
        paddingMultiplier = 0.05;
        break;
      case '3month':
      case '6month':
        // Medium-term data - standard padding
        paddingMultiplier = 0.08;
        break;
      case 'ytd':
      case '1year':
        // Longer-term data - more padding for better visualization
        paddingMultiplier = 0.10;
        break;
      case '5year':
      case 'all':
        // Very long-term data - maximum padding
        paddingMultiplier = 0.15;
        break;
    }

    // Further adjust padding based on interval granularity for intraday timeframes
    if (isIntradayTimeframe(timeframe)) {
      const intervalMultiplier = getIntervalPaddingMultiplier(interval, timeframe);
      paddingMultiplier *= intervalMultiplier;
    }

    // Calculate volatility-adjusted padding
    const volatility = priceRange / minPrice; // Price range as percentage of minimum price
    
    // If volatility is very low (stable price), use minimum padding
    if (volatility < 0.005) {
      paddingMultiplier = Math.max(paddingMultiplier, 0.015); // Minimum 1.5% for very stable prices
    }
    // If volatility is very high, cap the padding
    else if (volatility > 0.3) {
      paddingMultiplier = Math.min(paddingMultiplier, 0.06); // Cap at 6% for very volatile prices
    }

    const padding = Math.max(priceRange * paddingMultiplier, 0.01); // Minimum $0.01 padding
    
    return {
      min: minPrice - padding,
      max: maxPrice + padding,
      padding: padding
    };
  };

  // New helper function to get interval-specific padding multipliers
  const getIntervalPaddingMultiplier = (interval: string, timeframe: TimeframeOption): number => {
    switch (interval) {
      case '1m':
      case '2m':
        // Very high frequency - minimal padding for granular detail
        return timeframe === 'today' ? 0.4 : 0.5;
      case '5m':
        // High frequency - reduced padding
        return timeframe === 'today' ? 0.6 : timeframe === '5days' ? 0.7 : 0.8;
      case '15m':
        // Medium frequency - moderate padding
        return timeframe === '5days' ? 0.8 : timeframe === 'week' ? 0.9 : 1.0;
      case '30m':
        // Lower frequency - standard padding
        return timeframe === 'week' ? 0.9 : timeframe === '1month' ? 1.0 : 1.1;
      case '60m':
      case '90m':
        // Lowest intraday frequency - slightly more padding
        return 1.0;
      default:
        return 1.0;
    }
  };

  // Enhanced Y-axis label generation with timeframe-specific logic
  const generateYAxisLabels = (minPrice: number, maxPrice: number, timeframe: TimeframeOption): number[] => {
    const priceRange = maxPrice - minPrice;
    
    // Determine number of Y-axis labels based on timeframe
    let numLabels = 6;
    switch (timeframe) {
      case 'today':
        numLabels = 10; // Very granular for today
        break;
      case '5days':
        numLabels = 8; // More granular for 5 days
        break;
      case 'week':
        numLabels = 7; // Moderate granularity for week
        break;
      case '1month':
        numLabels = 6; // Standard for month
        break;
      case '3month':
      case '6month':
      case 'ytd':
        numLabels = 5;
        break;
      case '1year':
      case '5year':
      case 'all':
        numLabels = 4; // Fewer labels for long-term charts
        break;
    }

    // Calculate appropriate step size
    const rawStep = priceRange / numLabels;
    
    // For intraday timeframes, use more precise step calculation
    if (isIntradayTimeframe(timeframe)) {
      // Use smaller step sizes for intraday data
      const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
      const normalizedStep = rawStep / magnitude;
      
      let niceStep;
      if (normalizedStep <= 0.5) niceStep = 0.5;
      else if (normalizedStep <= 1) niceStep = 1;
      else if (normalizedStep <= 2) niceStep = 2;
      else if (normalizedStep <= 5) niceStep = 5;
      else niceStep = 10;
      
      const step = niceStep * magnitude;
      
      // Generate labels with finer precision
      const labels: number[] = [];
      const startValue = Math.ceil(minPrice / step) * step;
      
      for (let value = startValue; value <= maxPrice; value += step) {
        labels.push(parseFloat(value.toFixed(4))); // Higher precision for intraday
      }
      
      // Ensure we have reasonable coverage
      if (labels.length === 0 || labels[0] > minPrice + priceRange * 0.05) {
        labels.unshift(parseFloat(minPrice.toFixed(4)));
      }
      if (labels.length === 0 || labels[labels.length - 1] < maxPrice - priceRange * 0.05) {
        labels.push(parseFloat(maxPrice.toFixed(4)));
      }
      
      return labels;
    } else {
      // Original logic for non-intraday timeframes
      const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
      const normalizedStep = rawStep / magnitude;
      
      let niceStep;
      if (normalizedStep <= 1) niceStep = 1;
      else if (normalizedStep <= 2) niceStep = 2;
      else if (normalizedStep <= 5) niceStep = 5;
      else niceStep = 10;
      
      const step = niceStep * magnitude;
      
      // Generate labels
      const labels: number[] = [];
      const startValue = Math.ceil(minPrice / step) * step;
      
      for (let value = startValue; value <= maxPrice; value += step) {
        labels.push(value);
      }
      
      // Ensure we have at least min and max
      if (labels.length === 0 || labels[0] > minPrice + priceRange * 0.1) {
        labels.unshift(minPrice);
      }
      if (labels[labels.length - 1] < maxPrice - priceRange * 0.1) {
        labels.push(maxPrice);
      }
      
      return labels;
    }
  };

  const getFilteredData = (data: MarketDataPoint[], period: TimeframeOption): ExtendedMarketDataPoint[] => {
    const sortedData = [...data].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });
    
    return sortedData.map(d => ({ ...d, isWeekend: false }));
  };

  const getAvailableIntervals = (period: TimeframeOption): string[] => {
    if (isIntradayTimeframe(period)) {
      switch (period) {
        case 'today': return ['1m', '2m', '5m', '15m', '30m', '60m'];
        case '5days': return ['1m', '2m', '5m', '15m', '30m', '60m', '90m'];
        case 'week': return ['1m', '2m', '5m', '15m', '30m', '60m', '90m'];
        case '1month': return ['5m', '15m', '30m', '60m', '90m'];
        case '3month': return ['1d'];
        case '6month': return ['1d'];
        default: return ['1d'];
      }
    } else {
      return ['1d', '5d', '1wk', '1mo'];
    }
  };

  const formatInterval = (interval: string): string => {
    switch (interval) {
      case '1m': return '1 minute';
      case '2m': return '2 minutes';
      case '5m': return '5 minutes';
      case '15m': return '15 minutes';
      case '30m': return '30 minutes';
      case '60m': return '60 minutes';
      case '90m': return '90 minutes';
      case '1h': return '1 hour';
      case '2h': return '2 hours';
      case '4h': return '4 hours';
      case '1d': return '1 day';
      case '5d': return '5 days';
      case '1wk': return '1 week';
      case '1mo': return '1 month';
      default: return interval;
    }
  };

  const getDefaultInterval = (period: TimeframeOption): string => {
    switch (period) {
      case 'today': return '5m';      // Changed from '1m' to '5m' for better performance
      case '5days': return '15m';     // Changed from '1m' to '15m'
      case 'week': return '30m';      // Changed from '5m' to '30m'
      case '1month': return '1h';     // Changed from '5m' to '1h'
      case '3month': return '1d';
      case '6month': return '1d';
      case 'ytd': return '1d';
      case '1year': return '1d';
      case '5year': return '1wk';     // Changed from '1d' to '1wk' for less data points
      case 'all': return '1mo';       // Changed from '1d' to '1mo' for manageable data
      default: return '1d';
    }
  };

  const isIntradayTimeframe = (period: TimeframeOption): boolean => {
    return period === 'today' || period === '5days' || period === 'week' || period === '1month';
  };

  const fetchChartDataWithInterval = async (selectedTimeframe: TimeframeOption, interval: string) => {
    if (!symbol) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const range = getYahooRange(selectedTimeframe);
      
      let data: MarketDataPoint[];
      let info: CompanyInfo | null;
      
      if (isIntradayTimeframe(selectedTimeframe)) {
        const result = await getIntradayPricesWithInfo(symbol, interval, range);
        data = result.data;
        info = result.companyInfo;
      } else {
        const result = await getHistoricalPricesWithInfo(symbol, range);
        data = result.data;
        info = result.companyInfo;
      }
      
      setCompanyInfo(info);
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
    console.log(`Changing timeframe to: ${newTimeframe}`);
    
    setTimeframe(newTimeframe);
    
    const shortestInterval = getDefaultInterval(newTimeframe);
    console.log(`Setting interval to: ${shortestInterval}`);
    
    setSelectedInterval(shortestInterval);
    
    fetchChartDataWithInterval(newTimeframe, shortestInterval);
    setHoveredDataPoint(null);
    setIsHovering(false);
    resetZoom();
  };

  const handleIntervalChange = (newInterval: string) => {
    setSelectedInterval(newInterval);
    fetchChartDataWithInterval(timeframe, newInterval);
    resetZoom();
  };

  const handleMouseDown = (event: React.MouseEvent<SVGSVGElement>) => {
    if (event.button === 0) {
      setIsDragging(true);
      setDragStart({ 
        x: event.clientX, 
        y: event.clientY,
        panX: panOffset.x,
        panY: panOffset.y
      });
      event.preventDefault();
    }
  };

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const leftPadding = 80;
    const topPadding = 20;
    const plotWidth = 900 - 80 - 20;
    const plotHeight = height - 60 - 20 - 60;
    
    if (isDragging) {
      const deltaX = event.clientX - dragStart.x;
      const deltaY = event.clientY - dragStart.y;
      
      const maxXOffset = Math.max(0, plotWidth * (zoomLevel - 1) + plotWidth * 0.8);
      const newPanX = Math.max(-plotWidth * 0.4, Math.min(maxXOffset, dragStart.panX - deltaX));
      
      const maxYOffset = plotHeight * 0.5;
      const newPanY = Math.max(-maxYOffset, Math.min(maxYOffset, dragStart.panY + deltaY));
      
      setPanOffset({ x: newPanX, y: newPanY });
      return;
    }
    
    if (mouseX >= leftPadding && mouseX <= leftPadding + plotWidth &&
        mouseY >= topPadding && mouseY <= topPadding + plotHeight) {
      
      const adjustedMouseX = (mouseX - leftPadding + Math.max(0, panOffset.x)) / zoomLevel;
      const relativeX = adjustedMouseX / plotWidth;
      
      const validDataPoints = chartData.filter(d => !d.isWeekend && d.close > 0);
      const dataIndex = Math.round(relativeX * (validDataPoints.length - 1));
      
      if (dataIndex >= 0 && dataIndex < validDataPoints.length) {
        const dataPoint = validDataPoints[dataIndex];
        setHoveredDataPoint(dataPoint);
        setIsHovering(true);
      }
    } else {
      setIsHovering(false);
      setHoveredDataPoint(null);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredDataPoint(null);
    setIsDragging(false);
  };

  const handleWheel = (event: WheelEvent) => {
    event.preventDefault();
    
    if (event.shiftKey) {
      const panDelta = event.deltaY * 2;
      const plotWidth = 900 - 80 - 20;
      const maxXOffset = Math.max(0, plotWidth * (zoomLevel - 1) + plotWidth * 0.8);
      const newPanX = Math.max(-plotWidth * 0.4, Math.min(maxXOffset, panOffset.x + panDelta));
      setPanOffset(prev => ({ ...prev, x: newPanX }));
    } else if (event.ctrlKey || event.metaKey) {
      const panDelta = event.deltaY * 2;
      const plotHeight = height - 60 - 20 - 60;
      const maxYOffset = plotHeight * 0.5;
      const newPanY = Math.max(-maxYOffset, Math.min(maxYOffset, panOffset.y + panDelta));
      setPanOffset(prev => ({ ...prev, y: newPanY }));
    } else {
      const zoomFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newZoomLevel = Math.max(1, Math.min(10, zoomLevel * zoomFactor));
      
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const leftPadding = 80;
        const plotWidth = 900 - 80 - 20;
        
        if (mouseX >= leftPadding && mouseX <= leftPadding + plotWidth) {
          const relativeMouseX = (mouseX - leftPadding) / plotWidth;
          const oldMaxOffset = Math.max(0, plotWidth * (zoomLevel - 1) + plotWidth * 0.8);
          const newMaxOffset = Math.max(0, plotWidth * (newZoomLevel - 1) + plotWidth * 0.8);
          
          let newPanX = panOffset.x + (newZoomLevel - zoomLevel) * relativeMouseX * plotWidth;
          newPanX = Math.max(-plotWidth * 0.4, Math.min(newMaxOffset, newPanX));
          
          setPanOffset(prev => ({ ...prev, x: newPanX }));
        }
        
        setZoomLevel(newZoomLevel);
      }
    }
  };

  useEffect(() => {
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('wheel', handleWheel, { passive: false });
      return () => {
        svgElement.removeEventListener('wheel', handleWheel);
      };
    }
  }, [zoomLevel, panOffset.x, panOffset.y, height]);

  const resetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const getPriceChange = (dataPoint?: ExtendedMarketDataPoint) => {
    const validData = chartData.filter(d => !d.isWeekend && d.close > 0);
    
    if (validData.length < 2) return { change: 0, changePercent: 0, isPositive: true };
    
    if (dataPoint && !dataPoint.isWeekend && dataPoint.close > 0) {
      const startPrice = validData[0].close;
      const currentPrice = dataPoint.close;
      const change = currentPrice - startPrice;
      const changePercent = (change / startPrice) * 100;
      return {
        change,
        changePercent,
        isPositive: change >= 0
      };
    }
    
    const startPrice = validData[0].close;
    const endPrice = validData[validData.length - 1].close;
    
    const change = endPrice - startPrice;
    const changePercent = (change / startPrice) * 100;
    
    return {
      change,
      changePercent,
      isPositive: change >= 0
    };
  };

  const currentDataPoint = isHovering && hoveredDataPoint ? hoveredDataPoint : 
                          chartData.filter(d => !d.isWeekend && d.close > 0).slice(-1)[0] || null;
  
  const priceStats = getPriceChange(currentDataPoint);

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

  const formatXAxisLabel = (dateStr: string, index: number) => {
    const date = new Date(dateStr);
    
    if (isIntradayTimeframe(timeframe)) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
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

  // Enhanced chart rendering with optimized Y-axis
  const renderEnhancedChart = () => {
    if (chartData.length === 0) return null;

    const validPrices = chartData
      .filter(d => !d.isWeekend && d.close > 0)
      .map(d => d.close);
    
    if (validPrices.length === 0) return null;

    // Use enhanced price range calculation
    const priceRange = getOptimalPriceRange(validPrices, timeframe, selectedInterval);
    const adjustedMinPrice = priceRange.min;
    const adjustedMaxPrice = priceRange.max;
    const adjustedPriceRange = adjustedMaxPrice - adjustedMinPrice;
    
    // Debug logging to verify Y-axis scaling
    console.log(`Y-axis scaling for ${timeframe} (${selectedInterval}):`, {
      originalRange: `${Math.min(...validPrices).toFixed(2)} - ${Math.max(...validPrices).toFixed(2)}`,
      adjustedRange: `${adjustedMinPrice.toFixed(2)} - ${adjustedMaxPrice.toFixed(2)}`,
      padding: priceRange.padding.toFixed(2),
      dataPoints: validPrices.length
    });
    
    const chartWidth = 900;
    const chartHeight = height - 60;
    const leftPadding = 80;
    const rightPadding = 20;
    const topPadding = 20;
    const bottomPadding = 60;
    
    const plotWidth = chartWidth - leftPadding - rightPadding;
    const plotHeight = chartHeight - topPadding - bottomPadding;

    const validDataPoints = chartData
      .filter(d => !d.isWeekend && d.close > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const zoomedPlotWidth = plotWidth * zoomLevel;
    
    const points = validDataPoints.map((data, index) => {
      const x = leftPadding + (index / (validDataPoints.length - 1)) * zoomedPlotWidth - panOffset.x;
      const y = topPadding + ((adjustedMaxPrice - data.close) / adjustedPriceRange) * plotHeight + panOffset.y;
      return `${x},${y}`;
    }).join(' ');

    // Enhanced Y-axis labels using the new function
    const yAxisLabelValues = generateYAxisLabels(adjustedMinPrice, adjustedMaxPrice, timeframe);
    const yAxisLabels = yAxisLabelValues.map(price => ({
      price,
      y: topPadding + ((adjustedMaxPrice - price) / adjustedPriceRange) * plotHeight + panOffset.y
    }));

    // X-axis labels with horizontal panning
    const xAxisLabels: { date: string; x: number; label: string }[] = [];
    
    // Adjust number of X-axis labels based on timeframe
    let maxXLabels;
    switch (timeframe) {
      case 'today':
      case '5days':
        maxXLabels = Math.min(10, Math.max(6, Math.floor(10 / zoomLevel)));
        break;
      case 'week':
      case '1month':
        maxXLabels = Math.min(8, Math.max(5, Math.floor(8 / zoomLevel)));
        break;
      case '3month':
      case '6month':
        maxXLabels = Math.min(6, Math.max(4, Math.floor(6 / zoomLevel)));
        break;
      default:
        maxXLabels = Math.min(5, Math.max(3, Math.floor(5 / zoomLevel)));
        break;
    }
    
    const step = Math.max(1, Math.floor(validDataPoints.length / maxXLabels));
    
    for (let i = 0; i < validDataPoints.length; i += step) {
      const data = validDataPoints[i];
      const x = leftPadding + (i / (validDataPoints.length - 1)) * zoomedPlotWidth - panOffset.x;
      
      if (x >= leftPadding - 50 && x <= leftPadding + plotWidth + 50) {
        xAxisLabels.push({ 
          date: data.date, 
          x,
          label: formatXAxisLabel(data.date, i)
        });
      }
    }

    // Crosshair with panning
    let crosshairX = 0;
    let crosshairY = 0;
    if (isHovering && hoveredDataPoint) {
      const validIndex = validDataPoints.findIndex(d => d.date === hoveredDataPoint.date);
      if (validIndex >= 0) {
        crosshairX = leftPadding + (validIndex / (validDataPoints.length - 1)) * zoomedPlotWidth - panOffset.x;
        crosshairY = topPadding + ((adjustedMaxPrice - hoveredDataPoint.close) / adjustedPriceRange) * plotHeight + panOffset.y;
      }
    }

    return (
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Zoom: {zoomLevel.toFixed(1)}x</span>
            <span>• Y-axis: ${adjustedMinPrice.toFixed(2)} - ${adjustedMaxPrice.toFixed(2)}</span>
            <span>• Padding: {((priceRange.padding / (Math.max(...validPrices) - Math.min(...validPrices))) * 100).toFixed(1)}%</span>
            {(zoomLevel > 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
              <span>• Drag to pan • Scroll to zoom • Shift+scroll: horizontal • Ctrl+scroll: vertical</span>
            )}
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Timeframe</label>
              <Select value={timeframe} onValueChange={handleTimeframeChange}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="5days">5 Days</SelectItem>
                  <SelectItem value="week">1 Week</SelectItem>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3month">3 Months</SelectItem>
                  <SelectItem value="6month">6 Months</SelectItem>
                  <SelectItem value="ytd">Year to Date</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                  <SelectItem value="5year">5 Years</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-gray-500 mb-1">Interval</label>
              <Select 
                value={selectedInterval} 
                onValueChange={handleIntervalChange}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableIntervals(timeframe).map((interval) => (
                    <SelectItem key={interval} value={interval}>
                      {formatInterval(interval)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(zoomLevel > 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
              <div className="flex flex-col">
                <label className="text-xs text-gray-500 mb-1 opacity-0">Reset</label>
                <Button size="sm" variant="outline" onClick={resetZoom}>
                  Reset View
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded border">
          <svg 
            ref={svgRef}
            width={chartWidth} 
            height={chartHeight} 
            className="bg-white"
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <defs>
              <clipPath id="plotClip">
                <rect 
                  x={leftPadding} 
                  y={topPadding} 
                  width={plotWidth} 
                  height={plotHeight} 
                />
              </clipPath>
              <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f3f4f6" strokeWidth="1"/>
              </pattern>
            </defs>
            
            <rect 
              x={leftPadding} 
              y={topPadding} 
              width={plotWidth} 
              height={plotHeight} 
              fill="url(#grid)" 
            />
            
            {/* Enhanced Y-axis labels with timeframe-specific formatting */}
            {yAxisLabels
              .filter(label => label.y >= topPadding - 20 && label.y <= topPadding + plotHeight + 20)
              .map((label, index) => {
                // Enhanced price formatting based on timeframe and price magnitude
                let formattedPrice;
                
                // For intraday timeframes, show higher precision
                if (isIntradayTimeframe(timeframe)) {
                  if (label.price >= 1000) {
                    formattedPrice = `$${(label.price / 1000).toFixed(2)}K`;
                  } else if (label.price >= 100) {
                    formattedPrice = `$${label.price.toFixed(2)}`;
                  } else if (label.price >= 10) {
                    formattedPrice = `$${label.price.toFixed(3)}`;
                  } else {
                    formattedPrice = `$${label.price.toFixed(4)}`;
                  }
                } else {
                  // For longer timeframes, use standard precision
                  if (label.price >= 10000) {
                    formattedPrice = `$${(label.price / 1000).toFixed(1)}K`;
                  } else if (label.price >= 1000) {
                    formattedPrice = `$${(label.price / 1000).toFixed(2)}K`;
                  } else if (label.price >= 100) {
                    formattedPrice = `$${label.price.toFixed(0)}`;
                  } else if (label.price >= 10) {
                    formattedPrice = `$${label.price.toFixed(1)}`;
                  } else {
                    formattedPrice = `$${label.price.toFixed(2)}`;
                  }
                }

                return (
                  <g key={index}>
                    <line
                      x1={leftPadding}
                      y1={label.y}
                      x2={leftPadding + plotWidth}
                      y2={label.y}
                      stroke="#e5e7eb"
                      strokeWidth="1"
                      strokeDasharray="2,2"
                    />
                    <text
                      x={leftPadding - 10}
                      y={label.y + 4}
                      fontSize="12"
                      fill="#6b7280"
                      textAnchor="end"
                    >
                      {formattedPrice}
                    </text>
                  </g>
                );
              })}
            
            <g clipPath="url(#plotClip)">
              {/* X-axis grid lines */}
              {xAxisLabels.map((label, index) => (
                <g key={index}>
                  <line
                    x1={label.x}
                    y1={topPadding}
                    x2={label.x}
                    y2={topPadding + plotHeight}
                    stroke="#e5e7eb"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              ))}
              
              {/* Main price line with stroke width based on timeframe */}
              <polyline
                points={points}
                fill="none"
                stroke={priceStats.isPositive ? "#10b981" : "#ef4444"}
                strokeWidth={isIntradayTimeframe(timeframe) ? "2" : "3"}
              />
              
              {/* Crosshair */}
              {isHovering && hoveredDataPoint && 
               crosshairX >= leftPadding && crosshairX <= leftPadding + plotWidth &&
               crosshairY >= topPadding && crosshairY <= topPadding + plotHeight && (
                <g>
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
                  {/* Price indicator dot */}
                  <circle
                    cx={crosshairX}
                    cy={crosshairY}
                    r="4"
                    fill={priceStats.isPositive ? "#10b981" : "#ef4444"}
                    stroke="white"
                    strokeWidth="2"
                  />
                </g>
              )}
            </g>
            
            {/* X-axis labels */}
            {xAxisLabels
              .filter(label => label.x >= leftPadding - 50 && label.x <= leftPadding + plotWidth + 50)
              .map((label, index) => (
              <text
                key={index}
                x={label.x}
                y={topPadding + plotHeight + 20}
                fontSize="11"
                fill="#6b7280"
                textAnchor="middle"
              >
                {label.label}
              </text>
            ))}
            
            <rect 
              x={leftPadding} 
              y={topPadding} 
              width={plotWidth} 
              height={plotHeight} 
              fill="none" 
              stroke="#d1d5db" 
              strokeWidth="2"
            />
            
            {/* Enhanced hover tooltip with price formatting */}
            {isHovering && hoveredDataPoint && 
             crosshairX >= leftPadding && crosshairX <= leftPadding + plotWidth &&
             crosshairY >= topPadding && crosshairY <= topPadding + plotHeight && (
              <g>
                <rect
                  x={Math.min(chartWidth - 140, crosshairX + 10)}
                  y={Math.max(10, crosshairY - 45)}
                  width="130"
                  height="40"
                  fill="#374151"
                  rx="4"
                  opacity="0.95"
                />
                <text
                  x={Math.min(chartWidth - 135, crosshairX + 15)}
                  y={Math.max(27, crosshairY - 28)}
                  fontSize="12"
                  fill="white"
                  fontWeight="600"
                >
                  ${hoveredDataPoint.close.toFixed(isIntradayTimeframe(timeframe) ? 2 : 2)}
                </text>
                <text
                  x={Math.min(chartWidth - 135, crosshairX + 15)}
                  y={Math.max(42, crosshairY - 13)}
                  fontSize="9"
                  fill="#d1d5db"
                >
                  {formatDisplayDate(hoveredDataPoint.date)}
                </text>
              </g>
            )}
            
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
      </div>
    );
  };

  useEffect(() => {
    if (symbol) {
      const defaultInterval = getDefaultInterval(timeframe);
      setSelectedInterval(defaultInterval);
      fetchChartDataWithInterval(timeframe, defaultInterval);
    }
  }, [symbol]);

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
              {selectedInterval && (
                <span className="ml-2 text-blue-600">
                  • {formatInterval(selectedInterval)}
                </span>
              )}
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
                  <span className="text-xs text-gray-500 ml-1">
                    {isHovering ? 'from start' : `${getTimeframeLabel(timeframe).split(' ')[0].toLowerCase()}`}
                  </span>
                </div>
                {isHovering && (
                  <span className="text-xs text-blue-600 ml-2">
                    📍 Hover: {formatDisplayDate(currentDataPoint.date)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading {formatInterval(selectedInterval)} data for {getTimeframeLabel(timeframe).toLowerCase()}...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center" style={{ height }}>
            <div className="text-center text-red-600">
              <p>Error loading chart: {error}</p>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => fetchChartDataWithInterval(timeframe, selectedInterval)}
                className="mt-2"
              >
                Retry
              </Button>
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