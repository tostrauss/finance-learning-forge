import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { History, Search, Loader2, Calendar, Clock } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { 
  getHistoricalPrices, 
  getHistoricalPricesWithInfo, 
  getIntradayPricesWithInfo,
  MarketDataPoint, 
  CompanyInfo 
} from '@/services/yahooFinanceService';

// Remove the local MarketDataPoint interface since we're importing it
interface ExtendedMarketDataPoint extends MarketDataPoint {
  isWeekend?: boolean;
}

type TimeframeOption = 'today' | '5days' | 'week' | '3month' | '6month' | 'ytd' | '1year' | '5year' | 'all';
type DataType = 'daily' | 'intraday';

const ShowHistorical: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [historicalData, setHistoricalData] = useState<ExtendedMarketDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('week');
  const [dataType, setDataType] = useState<DataType>('daily');

  const isIntradayTimeframe = (period: TimeframeOption): boolean => {
    return period === 'today' || period === '5days';
  };

  const getIntradayInterval = (period: TimeframeOption): string => {
    switch (period) {
      case 'today':
        return '5m'; // 5-minute intervals for today
      case '5days':
        return '15m'; // 15-minute intervals for 5 days
      default:
        return '5m';
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
      case 'today': return 'Today (Intraday)';
      case '5days': return 'Past 5 Days (Intraday)';
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
      case 'today':
        return '1d';
      case '5days':
        return '5d';
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
        
        let data: MarketDataPoint[];
        let info: CompanyInfo | null;
        
        if (isIntradayTimeframe(timeframe)) {
          const interval = getIntradayInterval(timeframe);
          const result = await getIntradayPricesWithInfo(symbol, interval, range);
          data = result.data;
          info = result.companyInfo;
        } else {
          const result = await getHistoricalPricesWithInfo(symbol, range);
          data = result.data;
          info = result.companyInfo;
        }
        
        setCompanyInfo(info);
        
        // Get filtered data based on selected timeframe
        const filteredData = getFilteredData(data, timeframe);
        setHistoricalData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch market data');
        setHistoricalData([]);
        setCompanyInfo(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTimeframeChange = async (newTimeframe: TimeframeOption) => {
    setTimeframe(newTimeframe);
    
    // If we have a selected symbol, automatically fetch new data for the new timeframe
    if (selectedSymbol) {
      setLoading(true);
      setError(null);
      
      try {
        const range = getYahooRange(newTimeframe);
        console.log(`Fetching ${newTimeframe} data with range: ${range}`);
        
        let data: MarketDataPoint[];
        let info: CompanyInfo | null;
        
        if (isIntradayTimeframe(newTimeframe)) {
          const interval = getIntradayInterval(newTimeframe);
          console.log(`Using intraday interval: ${interval}`);
          const result = await getIntradayPricesWithInfo(selectedSymbol, interval, range);
          data = result.data;
          info = result.companyInfo;
        } else {
          const result = await getHistoricalPricesWithInfo(selectedSymbol, range);
          data = result.data;
          info = result.companyInfo;
        }
        
        setCompanyInfo(info);
        const filteredData = getFilteredData(data, newTimeframe);
        setHistoricalData(filteredData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch market data');
        setHistoricalData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Update the helper function to handle intraday data
  const formatDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    
    if (isIntradayTimeframe(timeframe)) {
      // For intraday, show time
      return date.toLocaleString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } else {
      // For daily data, show date only
      if (dateStr.includes('T')) {
        // Handle ISO datetime strings
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric',
          year: timeframe === 'week' ? undefined : 'numeric'
        });
      } else {
        // Handle YYYY-MM-DD date strings
        const [year, month, day] = dateStr.split('-').map(Number);
        const localDate = new Date(year, month - 1, day);
        return localDate.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric',
          year: timeframe === 'week' ? undefined : 'numeric'
        });
      }
    }
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
              <div className="space-y-3">
                {/* Intraday Options */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-blue-500" />
                    <span className="text-sm font-medium text-gray-700">Intraday:</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={timeframe === 'today' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTimeframeChange('today')}
                      disabled={loading}
                    >
                      Today (5m)
                    </Button>
                    <Button
                      type="button"
                      variant={timeframe === '5days' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleTimeframeChange('5days')}
                      disabled={loading}
                    >
                      5 Days (15m)
                    </Button>
                  </div>
                </div>

                {/* Daily Options */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={16} className="text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Daily:</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
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
                </div>
              </div>

              {selectedSymbol && (
                <p className="text-sm text-gray-600 mt-3">
                  Showing {getTimeframeLabel(timeframe).toLowerCase()} data for: <span className="font-semibold">{selectedSymbol}</span>
                  {isIntradayTimeframe(timeframe) && (
                    <span className="ml-2 text-blue-600 text-xs">
                      ({getIntradayInterval(timeframe)} intervals)
                    </span>
                  )}
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
              <CardTitle className="space-y-1">
                <div className="text-xl font-bold">
                  {getTimeframeLabel(timeframe)} Data
                  {isIntradayTimeframe(timeframe) && (
                    <span className="ml-2 text-sm text-blue-600 font-normal">
                      (Live Trading Data)
                    </span>
                  )}
                </div>
                {companyInfo && (
                  <div className="text-lg text-gray-700">
                    <span className="font-semibold">{companyInfo.symbol}</span>
                    {companyInfo.displayName && companyInfo.displayName !== companyInfo.symbol && (
                      <span className="ml-2 font-normal">- {companyInfo.displayName}</span>
                    )}
                  </div>
                )}
                {!companyInfo && selectedSymbol && (
                  <div className="text-lg text-gray-700">
                    <span className="font-semibold">{selectedSymbol}</span>
                  </div>
                )}
                {!selectedSymbol && (
                  <div className="text-lg text-gray-500">Historical Market Analysis</div>
                )}
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
                  {/* Company info summary */}
                  {companyInfo && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{companyInfo.displayName}</h3>
                          <p className="text-sm text-gray-600">Symbol: {companyInfo.symbol}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">
                            Showing {getTimeframeLabel(timeframe).toLowerCase()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {historicalData.length} data points
                            {isIntradayTimeframe(timeframe) && (
                              <span className="ml-1 text-blue-600">
                                ({getIntradayInterval(timeframe)} intervals)
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-700">
                            {isIntradayTimeframe(timeframe) ? 'Time' : 'Date'}
                          </th>
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