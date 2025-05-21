// src/pages/PracticePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useWatchlistManager } from '@/hooks/useWatchlistManager';
import PracticeWatchlistItemRow from '../components/PracticeWatchlistItemRow';
import type { AssetType } from '@/components/trading/WatchlistWidget';
import SearchSecurities from '@/components/trading/SearchSecurities';
import { X as XIcon, Plus as PlusIcon } from 'lucide-react';
import Sidebar from '@/components/Sidebar'; // Added import for Sidebar
import { usePaperTrading } from '@/hooks/usePaperTrading'; // Added import for usePaperTrading

// Keys for storing displayed boards in localStorage
const COLUMN3_DISPLAYED_BOARDS_LS_KEY = 'practicePageColumn3Boards';

const PracticePage: React.FC = () => {
  const { boards, addItemToBoard, removeItemFromBoard } = useWatchlistManager();
  const [displayedBoardIds, setDisplayedBoardIds] = useState<string[]>([]);
  const [isManaging, setIsManaging] = useState(false);
  const [addingToBoard, setAddingToBoard] = useState<string | null>(null);

  // Paper Trading State
  const [tradeSymbol, setTradeSymbol] = useState('');
  const [tradeQuantity, setTradeQuantity] = useState('');
  const [tradePrice, setTradePrice] = useState('');
  const [tradeError, setTradeError] = useState<string | null>(null);

  // Initialize paper trading hook
  const {
    positions: paperPositions,
    metrics: paperMetrics,
    executeBuy,
    executeSell,
  } = usePaperTrading();

  // Initialize mock holdings and displayed boards
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

  const toggleBoard = useCallback((id: string) => {
    setDisplayedBoardIds(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );
  }, []);

  const handleAddSecurity = (symbol: string) => {
    if (!addingToBoard) return;
    // Cast to AssetType because import is type-only
    addItemToBoard(addingToBoard, symbol, 'Stock' as AssetType);
    setAddingToBoard(null);
  };

  const handleExecuteTrade = async (action: 'buy' | 'sell') => {
    setTradeError(null);
    const quantityNum = parseInt(tradeQuantity, 10);
    const priceNum = parseFloat(tradePrice);

    if (!tradeSymbol || isNaN(quantityNum) || quantityNum <= 0 || isNaN(priceNum) || priceNum <= 0) {
      setTradeError('Please enter valid symbol, quantity, and price.');
      return;
    }

    try {
      if (action === 'buy') {
        // For simplicity, we'll use the symbol as the name for now.
        // In a real app, you'd fetch the name based on the symbol.
        executeBuy(tradeSymbol.toUpperCase(), tradeSymbol.toUpperCase(), priceNum, quantityNum);
      } else {
        executeSell(tradeSymbol.toUpperCase(), priceNum, quantityNum);
      }
      // Clear fields on successful trade
      setTradeSymbol('');
      setTradeQuantity('');
      setTradePrice('');
    } catch (error: any) {
      setTradeError(error.message || 'Trade execution failed.');
    }
  };

  const boardsToShow = boards.filter(b => displayedBoardIds.includes(b.id));

  return (
    <div className="flex flex-row h-screen"> {/* Outermost container is flex-row */}
      <Sidebar /> {/* Sidebar is a direct child of the h-screen container */}

      {/* Container for Header and Main Content Area */}
      <div className="flex flex-col flex-grow w-full min-h-0"> {/* Wrapper for header and content */}
        {/* Header */}
        <div className="bg-purple-700 py-20 shrink-0">
          <div className="flex justify-center items-center space-x-4 h-full">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Find Classroom
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Simulate Portfolio
            </button>
          </div>
        </div>

        {/* Main Area - Content columns */}
        <div className="flex flex-row flex-grow w-full min-h-0"> {/* This container holds ALL content columns */}
          {/* RE-ADDED: Secondary Left Navigation Panel (10% width) */}
          <div className="w-[10%] bg-gray-100 border-r border-black h-full overflow-y-auto p-2">
            <nav>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Discover</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Apply Learning</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">News</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200 border-b border-gray-300">Trending</a>
              <a href="#" className="block py-2 px-1 text-sm text-gray-700 hover:bg-gray-200">Help</a>
            </nav>
          </div>

          {/* Chart Column - Adjusted width */}
          <div className="w-[40.5%] border-r border-black h-full flex flex-col overflow-y-auto"> {/* MODIFIED width from 45% */}
            <div className="bg-gray-200 h-1/2 flex items-center justify-center">
              <p className="text-gray-500 text-lg">Portfolio Chart Area</p>
            </div>
            {/* Potentially other content for the chart column */}
          </div>

          {/* Holdings Column - Adjusted width */}
          <div className="w-[20.25%] border-r border-black h-full overflow-y-auto p-2"> {/* MODIFIED width from 22.5% */}
            {/* Buy/Sell Section */}
            <div className="mb-4 p-2 border-b">
              <h3 className="text-md font-semibold mb-2">Trade</h3>
              <div className="space-y-2">
                <div>
                  <label htmlFor="trade-symbol" className="block text-sm font-medium text-gray-700">Symbol</label>
                  <input
                    type="text"
                    id="trade-symbol"
                    value={tradeSymbol}
                    onChange={(e) => setTradeSymbol(e.target.value.toUpperCase())}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., AAPL"
                  />
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
                  />
                </div>
                <div>
                  <label htmlFor="trade-price" className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    id="trade-price"
                    value={tradePrice}
                    onChange={(e) => setTradePrice(e.target.value)}
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., 150.00"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExecuteTrade('buy')}
                    className="w-full px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleExecuteTrade('sell')}
                    className="w-full px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                  >
                    Sell
                  </button>
                </div>
                {tradeError && <p className="text-xs text-red-600 mt-1">{tradeError}</p>}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">Portfolio Holdings</h2>
            {paperPositions.length > 0 ? (
              <ul>
                {paperPositions.map(h => (
                  <li key={h.symbol} className="border-b py-2">
                    <div className="font-medium">{h.name} ({h.symbol})</div>
                    <div className="text-sm text-gray-600">Qty: {h.shares} - Value: ${h.value.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Avg Cost: ${h.avgCost.toFixed(2)} - Gain: ${h.gain.toFixed(2)} ({h.gainPercent.toFixed(2)}%)</div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No holdings to display.</p>
            )}
          </div>

          {/* Watchlists Column - Adjusted width */}
          <div className="w-[29.25%] h-full overflow-y-auto relative p-2"> {/* MODIFIED width from 32.5% */}
            <div className="sticky top-0 bg-white z-10 border-b flex justify-between items-center p-2">
              <h2 className="text-lg font-semibold">My Watchlists</h2>
              <button onClick={() => setIsManaging(!isManaging)} className="text-sm text-blue-600 hover:text-blue-800">
                {isManaging ? 'Done' : 'Add'}
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
                      <PracticeWatchlistItemRow key={item.symbol} symbol={item.symbol} assetType={item.assetType as AssetType} onSelect={() => console.log(item.symbol)} onRemove={() => removeItemFromBoard(b.id, item.symbol)} />
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
      </div> {/* Closes the new wrapper for header and content */}
    </div>
  );
};

export default PracticePage;
