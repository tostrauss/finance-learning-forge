import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { History, Search, Loader2, Calendar } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { getHistoricalPrices, MarketDataPoint } from '@/services/yahooFinanceService';

// Remove the local MarketDataPoint interface since we're importing it
interface ExtendedMarketDataPoint extends MarketDataPoint {
  isWeekend?: boolean;
}

type TimeframeOption = 'week' | '3month' | '6month' | 'ytd' | '1year' | '5year' | 'all';

const ShowHistorical: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [historicalData, setHistoricalData] = useState<ExtendedMarketDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('week');

  const getDaysForTimeframe = (period: TimeframeOption): number => {
    const today = new Date();
    
    switch (period) {
      case 'week':
        return 7;
      case '3month':
        return 90;
      case '6month':
        return 180;
      case 'ytd':
        // Calculate days from January 1st to today
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        return Math.ceil((today.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      case '1year':
        return 365;
      case '5year':
        return 365 * 5;
      case 'all':
        return 365 * 30; // 30 years should cover most stocks
      default:
        return 7;
    }
  };

  const getFilteredData = (data: MarketDataPoint[], period: TimeframeOption): ExtendedMarketDataPoint[] => {
    if (period === 'week') {
      // For week view, show all calendar days including weekends (your existing logic)
      const today = new Date();
      const last7Days: string[] = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        // Format date manually to avoid timezone issues
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        last7Days.push(`${year}-${month}-${day}`);
      }
      
      return last7Days.map((dateStr: string): ExtendedMarketDataPoint => {
        // Use local date parsing to avoid timezone shifts
        const [year, month, day] = dateStr.split('-').map(Number);
        const date = new Date(year, month - 1, day); // month is 0-indexed
        // Saturday = 6, Sunday = 0 (markets are closed)
        const isWeekend = date.getDay() === 0 || date.getDay() === 6;
        
        // Find matching data point
        const dataPoint = data.find((d: MarketDataPoint) => d.date === dateStr);
        
        if (dataPoint) {
          return { ...dataPoint, isWeekend: false };
        } else if (isWeekend) {
          // Return weekend placeholder for Saturday and Sunday only
          return {
            date: dateStr,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
            volume: 0,
            isWeekend: true
          };
        } else {
          // For weekdays with missing data, still show as no data but not weekend
          return {
            date: dateStr,
            open: 0,
            high: 0,
            low: 0,
            close: 0,
            volume: 0,
            isWeekend: false
          };
        }
      });
    } else {
      // For all other timeframes, just return the data from the API as-is
      // The API already returned the correct timeframe data
      return data
        .map(d => ({ ...d, isWeekend: false }))
        .reverse(); // Show most recent first
    }
  };

  const getTimeframeLabel = (period: TimeframeOption): string => {
    switch (period) {
      case 'week': return 'Past Week';
      case '3month': return 'Past 3 Months';
      case '6month': return 'Past 6 Months';
      case 'ytd': return 'Year to Date';
      case '1year': return 'Past Year';
      case '5year': return 'Past 5 Years';
      case 'all': return 'All Available Data';
      default: return 'Historical Data';
    }
  };

  const getYahooRange = (period: TimeframeOption): string => {
    switch (period) {
      case 'week':
        return '7d';
      case '3month':
        return '3mo';
      case '6month':
        return '6mo';
      case 'ytd':
        return 'ytd';
      case '1year':
        return '1y';
      case '5year':
        return '5y';
      case 'all':
        return 'max';
      default:
        return '1mo';
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const symbol = searchQuery.trim().toUpperCase();
      setSelectedSymbol(symbol);
      setLoading(true);
      setError(null);
      
      try {
        const range = getYahooRange(timeframe);
        const data = await getHistoricalPrices(symbol, range);
        // Get filtered data based on selected timeframe
        const filteredData = getFilteredData(data, timeframe);
        setHistoricalData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
        setHistoricalData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTimeframeChange = (newTimeframe: TimeframeOption) => {
    setTimeframe(newTimeframe);
    // If we have data already, re-filter it
    if (historicalData.length > 0 && selectedSymbol) {
      // Re-search with new timeframe
      handleSearch({ preventDefault: () => {} } as React.FormEvent);
    }
  };

  // Add this helper function
  const formatDateDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: timeframe === 'week' ? undefined : 'numeric' // Show year for longer timeframes
    });
  };

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-3">
            <History size={32} className="text-app-purple" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Historical Data</h1>
              <p className="text-gray-600">View and analyze real historical market data</p>
            </div>
          </div>
          
          {/* Search Bar */}
          <Card>
            <CardHeader>
              <CardTitle>Search Historical Data</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="Enter stock symbol (e.g., AAPL, MSFT, GOOGL)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    disabled={loading}
                  />
                </div>
                <Button type="submit" disabled={!searchQuery.trim() || loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Search'
                  )}
                </Button>
              </form>
              
              {/* Timeframe Selector */}
              <div className="flex items-center gap-2 mb-2">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Timeframe:</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 mb-4">
                <Button
                  type="button"
                  variant={timeframe === 'week' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('week')}
                  disabled={loading}
                >
                  1W
                </Button>
                <Button
                  type="button"
                  variant={timeframe === '3month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('3month')}
                  disabled={loading}
                >
                  3M
                </Button>
                <Button
                  type="button"
                  variant={timeframe === '6month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('6month')}
                  disabled={loading}
                >
                  6M
                </Button>
                <Button
                  type="button"
                  variant={timeframe === 'ytd' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('ytd')}
                  disabled={loading}
                >
                  YTD
                </Button>
                <Button
                  type="button"
                  variant={timeframe === '1year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('1year')}
                  disabled={loading}
                >
                  1Y
                </Button>
                <Button
                  type="button"
                  variant={timeframe === '5year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('5year')}
                  disabled={loading}
                >
                  5Y
                </Button>
                <Button
                  type="button"
                  variant={timeframe === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleTimeframeChange('all')}
                  disabled={loading}
                >
                  ALL
                </Button>
              </div>

              {selectedSymbol && (
                <p className="text-sm text-gray-600">
                  Showing {getTimeframeLabel(timeframe).toLowerCase()} data for: <span className="font-semibold">{selectedSymbol}</span>
                </p>
              )}
              {error && (
                <p className="mt-2 text-sm text-red-600">
                  Error: {error}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Historical Data Display */}
          <Card>
            <CardHeader>
              <CardTitle>
                {getTimeframeLabel(timeframe)} Data - {selectedSymbol || 'Historical Market Analysis'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-600">Fetching real market data...</span>
                </div>
              ) : selectedSymbol && historicalData.length > 0 ? (
                <div className="space-y-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Open</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">High</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Low</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Close</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Change</th>
                          <th className="text-right py-3 px-4 font-semibold text-gray-700">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {historicalData.map((day, index) => {
                          const change = day.isWeekend ? 0 : day.close - day.open;
                          const changePercent = day.isWeekend ? 0 : ((change / day.open) * 100);
                          
                          return (
                            <tr key={index} className={`border-b border-gray-100 hover:bg-gray-50 ${
                              day.isWeekend ? 'bg-gray-50 opacity-75' : ''
                            }`}>
                              <td className="py-3 px-4 text-gray-900">
                                {formatDateDisplay(day.date)}
                                {day.isWeekend && <span className="ml-1 text-xs text-gray-500">(Market Closed)</span>}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-900">
                                {day.isWeekend ? '-' : `$${day.open.toFixed(2)}`}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-900">
                                {day.isWeekend ? '-' : `$${day.high.toFixed(2)}`}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-900">
                                {day.isWeekend ? '-' : `$${day.low.toFixed(2)}`}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-900">
                                {day.isWeekend ? '-' : `$${day.close.toFixed(2)}`}
                              </td>
                              <td className={`py-3 px-4 text-right font-medium ${
                                day.isWeekend ? 'text-gray-400' : 
                                change >= 0 ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {day.isWeekend ? '-' : `${change >= 0 ? '+' : ''}$${change.toFixed(2)} (${changePercent.toFixed(2)}%)`}
                              </td>
                              <td className="py-3 px-4 text-right text-gray-600">
                                {day.isWeekend ? '-' : (day.volume ? day.volume.toLocaleString() : 'N/A')}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">
                  Search for a stock symbol to view real historical market data.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowHistorical;