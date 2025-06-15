import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { History, Search, Loader2 } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { getHistoricalPrices, MarketDataPoint } from '@/services/yahooFinanceService';

// Remove the local MarketDataPoint interface since we're importing it
interface ExtendedMarketDataPoint extends MarketDataPoint {
  isWeekend?: boolean;
}

const ShowHistorical: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('');
  const [historicalData, setHistoricalData] = useState<ExtendedMarketDataPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getLastSevenDays = (data: MarketDataPoint[]): ExtendedMarketDataPoint[] => {
    // Get the last 7 calendar days
    const today = new Date();
    
    // Create array of last 7 calendar days
    const last7Days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }
    
    // Map each day to either real data or weekend placeholder
    return last7Days.map((dateStr: string): ExtendedMarketDataPoint => {
      const date = new Date(dateStr);
      // Saturday = 6, Sunday = 0 (markets are closed)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      
      // Find matching data point
      const dataPoint = data.find((d: MarketDataPoint) => d.date === dateStr);
      
      if (dataPoint) {
        return { ...dataPoint, isWeekend: false };
      } else if (isWeekend) {
        // Only create placeholder for actual weekends
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
        // For weekdays with missing data, try to get the most recent available data
        // or return a placeholder indicating no data available
        return {
          date: dateStr,
          open: 0,
          high: 0,
          low: 0,
          close: 0,
          volume: 0,
          isWeekend: false // This is a weekday, just no data available
        };
      }
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const symbol = searchQuery.trim().toUpperCase();
      setSelectedSymbol(symbol);
      setLoading(true);
      setError(null);
      
      try {
        const data = await getHistoricalPrices(symbol);
        // Get last 7 calendar days (including weekends)
        const lastWeek = getLastSevenDays(data);
        setHistoricalData(lastWeek);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch historical data');
        setHistoricalData([]);
      } finally {
        setLoading(false);
      }
    }
  };

  // Add this helper function
  const formatDateDisplay = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
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
              <form onSubmit={handleSearch} className="flex gap-2">
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
              {selectedSymbol && (
                <p className="mt-2 text-sm text-gray-600">
                  Showing historical data for: <span className="font-semibold">{selectedSymbol}</span>
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
              <CardTitle>Past Week Data - {selectedSymbol || 'Historical Market Analysis'}</CardTitle>
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
                  Search for a stock symbol to view real historical market data for the past week.
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