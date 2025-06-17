import Layout from '@/components/Layout';
import { useWatchlistManager, WatchlistBoard } from '@/hooks/useWatchlistManager';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import StockChart from '@/components/StockChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp } from 'lucide-react';

const ChartingPage = () => {
  const { user } = useAuth();
  const {
    boards: watchlists,
    isLoading: loadingWatchlists,
    error: watchlistError,
  } = useWatchlistManager();

  const [selectedWatchlist, setSelectedWatchlist] = useState<WatchlistBoard | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState<string>('SPY'); // Default to S&P 500
  const [searchQuery, setSearchQuery] = useState('');

  // Auto-load S&P 500 on page load
  useEffect(() => {
    // Only set SPY if no symbol is already selected
    if (!selectedSymbol) {
      setSelectedSymbol('SPY');
    }
  }, []);

  const handleSelectWatchlist = (watchlist: WatchlistBoard) => {
    setSelectedWatchlist(watchlist);
    // Auto-select first symbol if available
    if (watchlist.items.length > 0) {
      setSelectedSymbol(watchlist.items[0].symbol);
    } else {
      setSelectedSymbol('SPY'); // Fallback to S&P 500
    }
    console.log("Selected watchlist for charting:", watchlist);
  };

  const handleSelectSymbol = (symbol: string) => {
    setSelectedSymbol(symbol);
    // Clear search when selecting from watchlist
    setSearchQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const symbol = searchQuery.trim().toUpperCase();
      setSelectedSymbol(symbol);
      // Clear watchlist selection when searching
      setSelectedWatchlist(null);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Quick access button for S&P 500
  const handleLoadSP500 = () => {
    setSelectedSymbol('SPY');
    setSelectedWatchlist(null);
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="flex h-full">
        {/* Watchlist Column */}
        <div className="w-1/4 h-full bg-white border-r p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-app-purple">Chart Selection</h2>
          </div>
          
          {/* Quick Access Section */}
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Access:</h3>
            <Button 
              onClick={handleLoadSP500}
              variant={selectedSymbol === 'SPY' ? 'default' : 'outline'}
              size="sm"
              className="w-full mb-2"
            >
              📈 S&P 500 (SPY)
            </Button>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>
          
          {/* Search Section */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <Search size={16} />
              Search Stocks:
            </h3>
            <form onSubmit={handleSearch} className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Enter symbol (e.g., AAPL, MSFT)"
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  className="pl-10 text-sm"
                />
              </div>
              <Button 
                type="submit" 
                disabled={!searchQuery.trim()}
                className="w-full"
                size="sm"
              >
                Chart Symbol
              </Button>
            </form>
            
            {selectedSymbol && !selectedWatchlist && selectedSymbol !== 'SPY' && (
              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700">
                Currently charting: <span className="font-semibold">{selectedSymbol}</span>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Watchlist Section */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
              <TrendingUp size={16} />
              My Watchlists:
            </h3>
            
            {!user ? (
              <p className="text-gray-500 text-sm">Please sign in to view and manage your watchlists.</p>
            ) : loadingWatchlists ? (
              <p className="text-gray-500 text-sm">Loading watchlists...</p>
            ) : watchlistError ? (
              <p className="text-red-500 text-sm">Error: {watchlistError.message}</p>
            ) : watchlists.length > 0 ? (
              <div className="space-y-4">
                {/* Watchlist Selection */}
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-2">Select Watchlist:</h4>
                  {watchlists.map((watchlist) => (
                    <div
                      key={watchlist.id}
                      className={`mb-2 p-2 border rounded cursor-pointer transition-colors text-sm
                                  ${selectedWatchlist?.id === watchlist.id ? 
                                    'bg-app-light-purple text-white shadow-md' : 
                                    'bg-white hover:bg-gray-50'}`}
                      onClick={() => handleSelectWatchlist(watchlist)}
                    >
                      <h5 className={`font-medium ${selectedWatchlist?.id === watchlist.id ? 'text-white' : 'text-gray-800'}`}>
                        {watchlist.title}
                      </h5>
                      <p className={`text-xs ${selectedWatchlist?.id === watchlist.id ? 'text-purple-200' : 'text-gray-500'}`}>
                        {watchlist.items.length} symbols
                      </p>
                    </div>
                  ))}
                </div>

                {/* Symbol Selection */}
                {selectedWatchlist && selectedWatchlist.items.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-gray-600 mb-2">Select Symbol:</h4>
                    <div className="grid grid-cols-1 gap-1">
                      {selectedWatchlist.items.map((item) => (
                        <Button
                          key={item.symbol}
                          variant={selectedSymbol === item.symbol ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => handleSelectSymbol(item.symbol)}
                          className="justify-start h-auto py-2"
                        >
                          <div className="text-left">
                            <div className="text-xs font-medium">{item.symbol}</div>
                            <div className="text-xs opacity-75">{item.assetType}</div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedWatchlist && selectedWatchlist.items.length === 0 && (
                  <p className="text-gray-500 text-xs">This watchlist is empty.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No watchlists found. You can create them on the Watchlist page.</p>
            )}
          </div>
        </div>

        {/* Charting Area */}
        <div className="flex-1 p-6 bg-app-light-gray overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-app-purple">Advanced Charting</h1>
            {selectedSymbol && (
              <div className="text-right">
                <p className="text-sm text-gray-600">Currently Viewing:</p>
                <p className="text-lg font-semibold text-app-purple">
                  {selectedSymbol}
                  {selectedSymbol === 'SPY' && <span className="text-sm text-gray-600 ml-2">(S&P 500)</span>}
                </p>
              </div>
            )}
          </div>
          
          {selectedSymbol ? (
            <StockChart 
              symbol={selectedSymbol} 
              initialTimeframe="week"
              height={500}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Advanced Charting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Get started by either searching for a stock symbol or selecting from your watchlists.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                        <Search size={16} />
                        Quick Search
                      </h3>
                      <p className="text-blue-800 text-sm mb-2">
                        Type any stock symbol in the search bar to instantly chart it.
                      </p>
                      <p className="text-blue-700 text-xs">
                        Examples: AAPL, MSFT, GOOGL, TSLA
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                        <TrendingUp size={16} />
                        Watchlist Charts
                      </h3>
                      <p className="text-green-800 text-sm mb-2">
                        Select from your saved watchlists to chart your favorite stocks.
                      </p>
                      <p className="text-green-700 text-xs">
                        Create watchlists on the Watchlist page
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-900 mb-2">Chart Features:</h3>
                    <div className="text-gray-700 text-sm space-y-1">
                      <div>Real-time intraday data (5-minute and 15-minute intervals)</div>
                      <div>Historical daily data (1 week to all available data)</div>
                      <div>Interactive price charts with trend indicators</div>
                      <div>Multiple timeframe analysis</div>
                      <div>Live price updates and change indicators</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ChartingPage;