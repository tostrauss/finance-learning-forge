// src/pages/PracticePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useWatchlistManager } from '@/hooks/useWatchlistManager';
import PracticeWatchlistItemRow from '../components/PracticeWatchlistItemRow';
import type { AssetType } from '@/components/trading/WatchlistWidget';
import SearchSecurities from '@/components/trading/SearchSecurities';
import { X as XIcon, Plus as PlusIcon, Settings as SettingsIcon, Trash2 as Trash2Icon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { usePractice } from '@/contexts/PracticeContext';
import { useStockSearch } from '@/hooks/useStockSearch';
import { getHistoricalPrices } from '@/services/yahooFinanceService';
import type { Position } from '@/types/trading';

// Keys for storing displayed boards in localStorage
const COLUMN3_DISPLAYED_BOARDS_LS_KEY = 'practicePageColumn3Boards';

// Define interfaces for search and trade functionality
interface StockSearchResult {
  symbol: string;
  shortname?: string;
  longname?: string;
  name?: string;
  regularMarketPrice?: number;
}

const PracticePage: React.FC = () => {
  // Context and Hooks
  const {
    positions,
    cash,
    totalValue,
    loading,
    error: practiceError,
    executeBuy,
    executeSell,
    updatePositions,
    createNewPortfolio,
    resetPortfolio
  } = usePractice();

  const { boards, addItemToBoard, removeItemFromBoard } = useWatchlistManager();
  const {
    query: searchQuery,
    setQuery: setSearchQuery,
    results: searchResults,
    loading: searchLoading
  } = useStockSearch();

  // UI State
  const [displayedBoardIds, setDisplayedBoardIds] = useState<string[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [addingToBoard, setAddingToBoard] = useState<string | null>(null);
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  // Trading State
  const [tradeSymbol, setTradeSymbol] = useState('');
  const [tradeQuantity, setTradeQuantity] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeError, setTradeError] = useState<string | null>(null);
  const [tradeTotalCost, setTradeTotalCost] = useState<number>(0);
  const [isFetchingTradePrice, setIsFetchingTradePrice] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Position Trade Modal State
  const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);
  const [tradeModalQuantity, setTradeModalQuantity] = useState('');
  const [tradeModalPrice, setTradeModalPrice] = useState('');
  const [tradeModalError, setTradeModalError] = useState<string | null>(null);

  // Initialize portfolio
  useEffect(() => {
    if (!loading && !positions.length && cash === 0) {
      // No portfolio exists, create one
      createNewPortfolio(10000).catch(err => {
        console.error('Failed to create portfolio:', err);
        setTradeError(err instanceof Error ? err.message : 'Failed to create portfolio');
      });
    }
  }, [loading, positions.length, cash, createNewPortfolio]);

  // Initialize displayed boards
  useEffect(() => {
    // Load or default to all boards
    const stored = localStorage.getItem(COLUMN3_DISPLAYED_BOARDS_LS_KEY);
    if (stored) {
      try {
        setDisplayedBoardIds(JSON.parse(stored));
      } catch {
        setDisplayedBoardIds(boards.map(b => b.id));
      }
    } else {
      setDisplayedBoardIds(boards.map(b => b.id));
    }
  }, [boards]);

  // Persist displayed boards
  useEffect(() => {
    localStorage.setItem(COLUMN3_DISPLAYED_BOARDS_LS_KEY, JSON.stringify(displayedBoardIds));
  }, [displayedBoardIds]);

  // Effect to update current prices of positions
  useEffect(() => {
    if (loading || !positions.length) {
      return;
    }

    const symbolsInPortfolio = Array.from(new Set(positions.map(p => p.symbol)));

    if (!symbolsInPortfolio.length) {
      return;
    }

    let isMounted = true;
    const fetchPricesForPositions = async () => {
      if (!isMounted) return;
      try {
        const priceUpdates = await Promise.all(
          symbolsInPortfolio.map(async (symbol) => {
            const history = await getHistoricalPrices(symbol);
            if (history.length > 0) {
              const latestPrice = history[history.length - 1].close;
              return { symbol, currentPrice: latestPrice };
            }
            return null;
          })
        );
        
        const validUpdates = priceUpdates.filter((update): update is { symbol: string; currentPrice: number } => 
          update !== null
        );
        
        if (isMounted && validUpdates.length > 0) {
          updatePositions(validUpdates);
        }
      } catch (error) {
        console.error("Error fetching prices for positions:", error);
      }
    };

    fetchPricesForPositions(); // Initial fetch
    
    const intervalId = setInterval(fetchPricesForPositions, 60000); // Refresh every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [positions, loading, updatePositions]);

  // Effect to fetch live price for trade symbol
  useEffect(() => {
    let isMounted = true;
    const fetchLivePriceForTrade = async () => {
      if (tradeSymbol && tradeSymbol.trim().length > 0 && !showSearchResults) {
        setIsFetchingTradePrice(true);
        try {
          const history = await getHistoricalPrices(tradeSymbol.trim());
          if (isMounted && history && history.length > 0) {
            const latestPrice = history[history.length - 1].close;
            setTradePrice(latestPrice.toFixed(2));
            setTradeError(null);
          } else if (isMounted) {
            setTradeError(`Could not fetch a live price for ${tradeSymbol}.`);
          }
        } catch (error) {
          if (isMounted) {
            console.error(`Error fetching live price for ${tradeSymbol}:`, error);
            setTradeError(`Failed to fetch live price for ${tradeSymbol}.`);
          }
        } finally {
          if (isMounted) {
            setIsFetchingTradePrice(false);
          }
        }
      }
    };

    const timeoutId = setTimeout(fetchLivePriceForTrade, 750);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [tradeSymbol, showSearchResults]);

  // Trade handlers
  const handleTradeSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSymbol = e.target.value.toUpperCase();
    setTradeSymbol(newSymbol);
    setSearchQuery(newSymbol); // Update search query
    if (newSymbol.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
      setTradePrice(''); // Clear price if symbol is cleared
    }
  };

  const handleSelectTradeSymbol = (security: StockSearchResult) => {
    setTradeSymbol(security.symbol);
    // Use the price from search results for immediate UI update.
    // The useEffect will then fetch a more current "live" price.
    if (security.regularMarketPrice !== undefined) { 
      setTradePrice(security.regularMarketPrice.toFixed(2)); 
    } else {
      setTradePrice(''); 
    }
    setShowSearchResults(false); // This helps trigger the live price fetch in useEffect
    setSearchQuery(''); 
  };

  // Trade execution handlers
  const handleTrade = async (action: 'buy' | 'sell') => {
    setTradeError(null);
    const quantity = parseInt(tradeQuantity, 10);
    const price = parseFloat(tradePrice);

    if (!tradeSymbol || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
      setTradeError('Please enter valid symbol, quantity, and price.');
      return;
    }

    try {
      if (action === 'buy') {
        await executeBuy(tradeSymbol.toUpperCase(), quantity, price);
      } else {
        await executeSell(tradeSymbol.toUpperCase(), quantity, price);
      }

      // Clear form on success
      setTradeSymbol('');
      setTradeQuantity('');
      setTradePrice('');
    } catch (error) {
      setTradeError(error instanceof Error ? error.message : 'Trade execution failed');
    }
  };

  // Position Modal Handlers
  const handleOpenPositionTradeModal = (position: Position) => {
    setSelectedPosition(position);
    setTradeModalQuantity('');
    setTradeModalPrice(position.currentPrice ? position.currentPrice.toFixed(2) : '');
    setTradeModalError(null);
    setIsTradeModalOpen(true);
  };

  const handleClosePositionTradeModal = () => {
    setIsTradeModalOpen(false);
    setSelectedPosition(null);
    setTradeModalQuantity('');
    setTradeModalPrice('');
    setTradeModalError(null);
  };

  const handlePositionTrade = async (action: 'buy' | 'sell') => {
    if (!selectedPosition) {
      setTradeModalError("No position selected.");
      return;
    }

    const quantity = parseInt(tradeModalQuantity, 10);
    const price = parseFloat(tradeModalPrice);

    if (isNaN(quantity) || quantity <= 0) {
      setTradeModalError("Please enter a valid quantity.");
      return;
    }
    if (isNaN(price) || price <= 0) {
      setTradeModalError("Please enter a valid price.");
      return;
    }

    try {
      if (action === 'sell' && quantity > selectedPosition.quantity) {
        setTradeModalError(`Cannot sell more shares than you own (${selectedPosition.quantity}).`);
        return;
      }

      if (action === 'buy') {
        await executeBuy(selectedPosition.symbol, quantity, price);
      } else {
        await executeSell(selectedPosition.symbol, quantity, price);
      }
      handleClosePositionTradeModal();
    } catch (error) {
      setTradeModalError(error instanceof Error ? error.message : `${action === 'buy' ? 'Buy' : 'Sell'} execution failed.`);
    }
  };

  // Calculate total trade cost
  useEffect(() => {
    const quantityNum = parseInt(tradeQuantity, 10);
    const priceNum = parseFloat(tradePrice);

    if (!isNaN(quantityNum) && quantityNum > 0 && !isNaN(priceNum) && priceNum > 0) {
      setTradeTotalCost(quantityNum * priceNum);
    } else {
      setTradeTotalCost(0);
    }
  }, [tradeQuantity, tradePrice]);

  // Calculate chart title
  const chartTitle = "Portfolio Overview";

  // Board management
  const toggleBoard = useCallback((id: string) => {
    setDisplayedBoardIds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  }, []);

  const handleAddSecurity = (symbol: string) => {
    if (!addingToBoard) return;
    // Cast to AssetType because import is type-only. Use a valid AssetType.
    addItemToBoard(addingToBoard, symbol, 'security' as AssetType); // Changed 'Stock' to 'security'
    setAddingToBoard(null);
  };

  const boardsToShow = boards.filter(b => displayedBoardIds.includes(b.id));

  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full min-h-0">
        <div className="bg-purple-700 py-20 shrink-0">
          <div className="flex justify-center items-center space-x-4 h-full">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Find Classroom
            </button>
          </div>
        </div>

        <div className="flex flex-row flex-grow w-full min-h-0">
          <div className="w-[10%] bg-gray-100 border-r border-black h-full overflow-y-auto p-2">
            <nav>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Discover</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Apply Learning</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">News</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Trending</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200">Help</a>
            </nav>
          </div>

          <div className="w-[40.5%] border-r border-black h-full flex flex-col overflow-y-auto p-2">
            <div className="flex justify-between items-center p-2 border-b">
              <h2 className="text-lg font-semibold">{chartTitle}</h2>
            </div>

            <div className="bg-gray-200 h-3/5 flex flex-col p-3">
              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-800">
                    ${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </span>
                </div>
                <span className="text-xs text-gray-500">Total Portfolio Value</span>
              </div>

              <div className="flex-grow border border-gray-300 bg-white flex items-center justify-center my-2 rounded">
                <p className="text-gray-400 italic">Portfolio Value Over Time Chart Area</p>
              </div>

              <div className="flex justify-around items-center pt-2 border-t border-gray-300">
                {['1D', '5D', '1M', '3M', '6M', 'YTD', '1Y', 'MAX'].map(period => (
                  <button 
                    key={period} 
                    className="text-xs px-2 py-1 rounded hover:bg-gray-300 text-gray-700"
                    title={`Select ${period} view (feature to be implemented)`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 p-3 border-t bg-gray-50 rounded shadow-sm">
              <h3 className="text-md font-semibold mb-2 text-gray-700">
                Portfolio Summary
              </h3>
              <div className="text-sm space-y-1 text-gray-600">
                <p><strong>Total Value:</strong> <span className="font-medium text-gray-800">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                <p><strong>Available Cash:</strong> <span className="font-medium text-gray-800">${cash.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
              </div>
            </div>
          </div>

          <div className="w-[20.25%] border-r border-black h-full overflow-y-auto p-2">
            <div className="mb-4 p-2 border-b">
              <h3 className="text-md font-semibold mb-2">Trade</h3>
              <div className="space-y-2 relative">
                <div>
                  <label htmlFor="trade-symbol" className="block text-sm font-medium text-gray-700">Symbol</label>
                  <input
                    type="text"
                    id="trade-symbol"
                    value={tradeSymbol}
                    onChange={handleTradeSymbolChange}
                    onFocus={() => {
                      if (tradeSymbol.length > 0) {
                        setSearchQuery(tradeSymbol);
                        setShowSearchResults(true);
                      }
                    }}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., AAPL"
                    disabled={loading}
                    autoComplete="off"
                  />
                  {showSearchResults && searchResults.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {searchResults.map((item) => (
                        <li
                          key={item.symbol}
                          onClick={() => handleSelectTradeSymbol(item as StockSearchResult)}
                          className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                        >
                          {item.symbol} - {item.shortname || item.name || item.longname || 'N/A'}
                          {item.regularMarketPrice && (
                            <span className="text-xs text-gray-500 ml-2">(${item.regularMarketPrice.toFixed(2)})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                  {searchLoading && <p className="text-xs text-gray-500">Searching...</p>}
                </div>
                <div>
                  <label htmlFor="trade-quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                  <input
                    type="number"
                    id="trade-quantity"
                    value={tradeQuantity}
                    onChange={(e) => setTradeQuantity(e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 10"
                    disabled={loading}
                  />
                </div>
                <div>
                  <label htmlFor="trade-price" className="block text-sm font-medium text-gray-700">Price per Share</label>
                  <input
                    type="number"
                    id="trade-price"
                    value={tradePrice}
                    onChange={(e) => setTradePrice(e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder={isFetchingTradePrice ? "Fetching price..." : "e.g., 150.00"}
                    disabled={loading || isFetchingTradePrice}
                  />
                </div>
                {tradeTotalCost > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Total Cost: ${tradeTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleTrade('buy')}
                    className="w-full px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:opacity-50"
                    disabled={loading || tradeTotalCost === 0}
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleTrade('sell')}
                    className="w-full px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                    disabled={loading || positions.length === 0}
                  >
                    Sell
                  </button>
                </div>
                {tradeError && <p className="text-xs text-red-600 mt-1">{tradeError}</p>}
                {practiceError && <p className="text-xs text-red-600 mt-1">{practiceError}</p>}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">Portfolio Holdings</h2>
            {positions.length > 0 ? (
              <ul>
                {positions.map(position => (
                  <li 
                    key={position.symbol} 
                    className="border-b py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                    onClick={() => handleOpenPositionTradeModal(position)}
                  >
                    <div className="font-medium">{position.symbol}</div>
                    <div className="text-sm text-gray-600">Qty: {position.quantity} - Value: ${position.marketValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                    <div className="text-sm text-gray-600">
                      Avg Cost: ${position.averageCost.toFixed(2)} - Current: ${position.currentPrice.toFixed(2)} - Gain: 
                      <span className={position.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${position.unrealizedPL.toFixed(2)} ({position.unrealizedPLPercent.toFixed(2)}%)
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No holdings to display.</p>
            )}
          </div>

          <div className="w-[29.25%] h-full overflow-y-auto relative p-2">
            <div className="sticky top-0 bg-white z-10 border-b flex justify-between items-center p-2">
              <h2 className="text-lg font-semibold">My Watchlists</h2>
              <button 
                type="button"
                onClick={() => setIsManaging(!isManaging)} 
                className="text-sm text-blue-600 hover:text-blue-800"
                aria-label={isManaging ? "Done managing watchlists" : "Manage watchlists"}
              >
                {isManaging ? 'Done' : 'Manage'}
              </button>
            </div>

            {isManaging && (
              <div className="border-b p-2">
                <h3 className="text-md font-semibold mb-2">Select Watchlists:</h3>
                <ul>
                  {boards.map(b => (
                    <li key={b.id} className="flex items-center mb-1">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={displayedBoardIds.includes(b.id)}
                          onChange={() => toggleBoard(b.id)}
                          className="mr-2"
                        />
                        <span>{b.title}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {boardsToShow.length > 0 ? (
              boardsToShow.map(b => (
                <div key={b.id} className="mb-4 border rounded">
                  <div className="flex justify-between items-center bg-gray-100 p-2 border-b">
                    <span className="font-medium">{b.title}</span>
                    <div className="flex space-x-1">
                      <button onClick={() => setAddingToBoard(b.id)} className="p-1 hover:bg-gray-200 rounded" aria-label="Add">
                        <PlusIcon size={16} />
                      </button>
                      <button onClick={() => toggleBoard(b.id)} className="p-1 hover:bg-gray-200 rounded" aria-label="Remove">
                        <XIcon size={16} />
                      </button>
                    </div>
                  </div>
                  <ul className="p-2">
                    {b.items.length === 0 && <li className="text-sm text-gray-500">Empty list</li>}
                    {b.items.map(item => (
                      <PracticeWatchlistItemRow
                        key={item.symbol}
                        item={item}
                        assetType={item.assetType}
                        onSelect={() => console.log(item.symbol)}
                        onRemove={() => removeItemFromBoard(b.id, item.symbol)}
                      />
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 mt-4">
                <p>No watchlists selected.</p>
              </div>
            )}

            {addingToBoard && (
              <div className="absolute inset-x-0 top-16 bottom-0 bg-white border shadow-lg z-20 overflow-y-auto p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold">Add to: {boards.find(b => b.id === addingToBoard)?.title}</h4>
                  <button onClick={() => setAddingToBoard(null)} aria-label="Close">
                    <XIcon size={20} />
                  </button>
                </div>
                <SearchSecurities onSelectSymbol={handleAddSecurity} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Position Trade Modal */}
      {isTradeModalOpen && selectedPosition && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">
                Trade: {selectedPosition.symbol}
              </h3>
              <button onClick={handleClosePositionTradeModal} className="text-gray-500 hover:text-gray-700">
                <XIcon size={24} />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-1">Currently holding: {selectedPosition.quantity} shares</p>
            <p className="text-sm text-gray-600 mb-4">Last Price: ${selectedPosition.currentPrice.toFixed(2)}</p>

            <div className="space-y-3">
              <div>
                <label htmlFor="modal-trade-quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="modal-trade-quantity"
                  value={tradeModalQuantity}
                  onChange={(e) => setTradeModalQuantity(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label htmlFor="modal-trade-price" className="block text-sm font-medium text-gray-700">Price per Share</label>
                <input
                  type="number"
                  id="modal-trade-price"
                  value={tradeModalPrice}
                  onChange={(e) => setTradeModalPrice(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 150.00"
                />
              </div>
              {parseInt(tradeModalQuantity, 10) > 0 && parseFloat(tradeModalPrice) > 0 && (
                <div className="text-sm text-gray-600 mt-1">
                  Estimated Value: ${(parseInt(tradeModalQuantity, 10) * parseFloat(tradeModalPrice)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              )}
            </div>

            {tradeModalError && <p className="text-xs text-red-600 mt-3 py-1">{tradeModalError}</p>}

            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() => handlePositionTrade('buy')}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={!tradeModalQuantity || !tradeModalPrice || parseInt(tradeModalQuantity, 10) <= 0 || parseFloat(tradeModalPrice) <= 0}
              >
                Buy More
              </button>
              <button
                type="button"
                onClick={() => {
                  setTradeModalQuantity(selectedPosition.quantity.toString());
                  if (selectedPosition.currentPrice) {
                    setTradeModalPrice(selectedPosition.currentPrice.toFixed(2));
                  }
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
                disabled={selectedPosition.quantity <= 0}
              >
                Sell All ({selectedPosition.quantity})
              </button>
              <button
                type="button"
                onClick={() => handlePositionTrade('sell')}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={!tradeModalQuantity || !tradeModalPrice || parseInt(tradeModalQuantity, 10) <= 0 || parseFloat(tradeModalPrice) <= 0 || parseInt(tradeModalQuantity, 10) > selectedPosition.quantity}
              >
                Sell Selected Qty
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PracticePage;
