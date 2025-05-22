// src/pages/PracticePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useWatchlistManager } from '@/hooks/useWatchlistManager';
import PracticeWatchlistItemRow from '../components/PracticeWatchlistItemRow';
import type { AssetType } from '@/components/trading/WatchlistWidget';
import SearchSecurities from '@/components/trading/SearchSecurities';
import { X as XIcon, Plus as PlusIcon, Settings as SettingsIcon, Trash2 as Trash2Icon } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import { usePaperTrading, type Holding } from '@/hooks/usePaperTrading'; // Modified: Import Holding type
import { useStockSearch } from '@/hooks/useStockSearch';
import { getHistoricalPrices } from '@/services/yahooFinanceService';

// Keys for storing displayed boards in localStorage
const COLUMN3_DISPLAYED_BOARDS_LS_KEY = 'practicePageColumn3Boards';
const USER_SIMULATIONS_LS_KEY = 'userPaperTradingSimulations'; // For storing all simulations

// Define a type for simulation settings if you plan to expand it
interface SimulationSettings {
  id: string; // Unique ID for the simulation
  name: string;
  startingCash: number;
}

// Define an interface for the expected stock search result item
interface StockSearchResult {
  symbol: string;
  shortname?: string;
  longname?: string;
  name?: string;
  regularMarketPrice?: number;
  // Add other fields you might expect or need from fetchYahooAutocomplete
}


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
  const [tradeTotalCost, setTradeTotalCost] = useState<number>(0);
  const [isFetchingTradePrice, setIsFetchingTradePrice] = useState(false);

  // Stock Search for Trading
  const {
    query: tradeSearchQuery,
    setQuery: setTradeSearchQuery,
    results: tradeSearchResults,
    loading: tradeSearchLoading
  } = useStockSearch();
  const [showTradeSearchResults, setShowTradeSearchResults] = useState(false);


  // State for all created simulations and the active one
  const [simulations, setSimulations] = useState<SimulationSettings[]>([]);
  const [activePortfolioId, setActivePortfolioId] = useState<string | null>(null);

  // State for "Simulate Portfolio" Modal
  const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
  const [simulationNameInput, setSimulationNameInput] = useState('');
  const [simulationCashInput, setSimulationCashInput] = useState('10000');

  // State for Portfolio Settings Dropdown
  const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);

  // Determine initial cash for the hook based on the active portfolio
  const activeSimulation = simulations.find(s => s.id === activePortfolioId);
  const currentInitialCashForHook = activeSimulation?.startingCash;

  const {
    positions: paperPositions,
    metrics: paperMetrics,
    executeBuy,
    executeSell,
    updatePositionCurrentPrices,
  } = usePaperTrading(activePortfolioId, currentInitialCashForHook);

  // State for Holding Trade Modal
  const [selectedHoldingForTrade, setSelectedHoldingForTrade] = useState<Holding | null>(null);
  const [holdingTradeQuantityInput, setHoldingTradeQuantityInput] = useState('');
  const [holdingTradePriceInput, setHoldingTradePriceInput] = useState('');
  const [holdingTradeError, setHoldingTradeError] = useState<string | null>(null);
  const [isHoldingTradeModalOpen, setIsHoldingTradeModalOpen] = useState(false);

  // Load simulations from localStorage on mount
  useEffect(() => {
    const storedSimulations = localStorage.getItem(USER_SIMULATIONS_LS_KEY);
    if (storedSimulations) {
      try {
        const parsedSimulations: SimulationSettings[] = JSON.parse(storedSimulations);
        setSimulations(parsedSimulations);
        if (parsedSimulations.length > 0) {
          // Activate the first simulation by default, or the last active one (more advanced)
          setActivePortfolioId(parsedSimulations[0].id);
        }
      } catch (e) {
        console.error("Error parsing simulations from localStorage", e);
        setSimulations([]);
      }
    }
  }, []);

  // Save simulations to localStorage when they change
  useEffect(() => {
    // Only save if there are simulations or if there was something previously in localStorage
    // This prevents writing an empty array if it was never initialized.
    if (simulations.length > 0 || localStorage.getItem(USER_SIMULATIONS_LS_KEY) !== null) {
        localStorage.setItem(USER_SIMULATIONS_LS_KEY, JSON.stringify(simulations));
    }
  }, [simulations]);


  // Initialize displayed boards (existing logic)
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

  // Effect to update current prices of positions in the active portfolio
  useEffect(() => {
    if (!activePortfolioId || !updatePositionCurrentPrices) {
      return;
    }

    const symbolsInPortfolio = Array.from(new Set(paperPositions.map(p => p.symbol)));

    if (!symbolsInPortfolio.length) {
      return;
    }

    let isMounted = true;
    const fetchPricesForPortfolio = async () => {
      if (!isMounted) return;
      try {
        const priceUpdatesPromises = symbolsInPortfolio.map(async (symbol) => {
          const history = await getHistoricalPrices(symbol);
          if (history.length > 0) {
            const latestPrice = history[history.length - 1].close;
            return { symbol, newPrice: latestPrice };
          }
          return null;
        });
        
        const resolvedPriceUpdates = await Promise.all(priceUpdatesPromises);
        const validUpdates = resolvedPriceUpdates.filter(update => update !== null) as Array<{ symbol: string; newPrice: number }>;
        
        if (isMounted && validUpdates.length > 0) {
          updatePositionCurrentPrices(validUpdates);
        }
      } catch (error) {
        console.error("Error fetching prices for portfolio positions:", error);
      }
    };

    fetchPricesForPortfolio(); // Initial fetch
    
    const intervalId = setInterval(fetchPricesForPortfolio, 60000); // Refresh every 60 seconds

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [activePortfolioId, updatePositionCurrentPrices, paperPositions.map(p => p.symbol).join(',')]); // Re-run if active portfolio or its symbols change


  // Effect to fetch live price for the tradeSymbol when it changes or search is dismissed
  useEffect(() => {
    const fetchLivePriceForTrade = async () => {
      // Only fetch if a symbol is present AND search results are not currently shown
      if (tradeSymbol && tradeSymbol.trim().length > 0 && !showTradeSearchResults) {
        setIsFetchingTradePrice(true);
        // setTradeError(null); // Clear previous errors - let's be more specific
        try {
          const history = await getHistoricalPrices(tradeSymbol.trim());
          if (history && history.length > 0) {
            const latestPrice = history[history.length - 1].close;
            setTradePrice(latestPrice.toFixed(2).toString()); // Rounded to 2 decimal places
            setTradeError(null); // Clear error if price fetch is successful
          } else {
            // Don't clear tradePrice, allow manual entry or use stale price from search
            setTradeError(`Could not fetch a live price for ${tradeSymbol}.`);
          }
        } catch (error) {
          console.error(`Error fetching live price for ${tradeSymbol}:`, error);
          // Don't clear tradePrice
          setTradeError(`Failed to fetch live price for ${tradeSymbol}.`);
        } finally {
          setIsFetchingTradePrice(false);
        }
      }
    };

    // Debounce to avoid fetching on every keystroke and to allow search results to hide
    const debounceTimeout = setTimeout(() => {
      fetchLivePriceForTrade();
    }, 750);

    return () => clearTimeout(debounceTimeout);
  }, [tradeSymbol, showTradeSearchResults]); // Re-run when tradeSymbol or showTradeSearchResults changes


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

  const handleTradeSymbolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSymbol = e.target.value.toUpperCase();
    setTradeSymbol(newSymbol);
    setTradeSearchQuery(newSymbol); // Update search query
    if (newSymbol.length > 0) {
      setShowTradeSearchResults(true);
      // tradePrice will be updated by the useEffect or can be manually entered
    } else {
      setShowTradeSearchResults(false);
      setTradePrice(''); // Clear price if symbol is cleared
    }
  };

  const handleSelectTradeSymbol = (security: StockSearchResult) => {
    console.log('Selected security data:', security); // <-- ADD THIS LINE
    setTradeSymbol(security.symbol);
    // Use the price from search results for immediate UI update.
    // The useEffect will then fetch a more current "live" price.
    if (security.regularMarketPrice !== undefined) { 
      setTradePrice(security.regularMarketPrice.toFixed(2).toString()); // Rounded to 2 decimal places
    } else {
      setTradePrice(''); 
    }
    setShowTradeSearchResults(false); // This helps trigger the live price fetch in useEffect
    setTradeSearchQuery(''); 
  };


  const handleExecuteTrade = async (action: 'buy' | 'sell') => {
    setTradeError(null);
    const quantityNum = parseInt(tradeQuantity, 10);
    const priceNum = parseFloat(tradePrice);

    if (!activePortfolioId) {
      setTradeError('No active portfolio. Please create or select one.');
      return;
    }
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
      // tradeTotalCost will reset automatically due to tradeQuantity and tradePrice changing
    } catch (error: any) {
      setTradeError(error.message || 'Trade execution failed.');
    }
  };


  // Handlers for Holding Trade Modal
  const handleOpenHoldingTradeModal = (holding: Holding) => {
    setSelectedHoldingForTrade(holding);
    setHoldingTradeQuantityInput('');
    setHoldingTradePriceInput(holding.currentPrice ? holding.currentPrice.toFixed(2) : '');
    setHoldingTradeError(null);
    setIsHoldingTradeModalOpen(true);
  };

  const handleCloseHoldingTradeModal = () => {
    setIsHoldingTradeModalOpen(false);
    setSelectedHoldingForTrade(null); // Clear selected holding
    setHoldingTradeQuantityInput('');
    setHoldingTradePriceInput('');
    setHoldingTradeError(null);
  };

  const handleExecuteHoldingTrade = async (action: 'buy' | 'sell') => {
    if (!selectedHoldingForTrade || !activePortfolioId) {
      setHoldingTradeError("No holding selected or portfolio inactive.");
      return;
    }

    const quantityNum = parseInt(holdingTradeQuantityInput, 10);
    const priceNum = parseFloat(holdingTradePriceInput);

    if (isNaN(quantityNum) || quantityNum <= 0) {
      setHoldingTradeError("Please enter a valid quantity.");
      return;
    }
    if (isNaN(priceNum) || priceNum <= 0) {
      setHoldingTradeError("Please enter a valid price.");
      return;
    }

    setHoldingTradeError(null);

    try {
      if (action === 'buy') {
        executeBuy(selectedHoldingForTrade.symbol, selectedHoldingForTrade.name, priceNum, quantityNum);
      } else { // sell
        if (quantityNum > selectedHoldingForTrade.shares) {
          setHoldingTradeError(`Cannot sell more shares than you own (${selectedHoldingForTrade.shares}).`);
          return;
        }
        executeSell(selectedHoldingForTrade.symbol, priceNum, quantityNum);
      }
      handleCloseHoldingTradeModal(); // Close modal on successful trade
    } catch (error: any) {
      setHoldingTradeError(error.message || `${action === 'buy' ? 'Buy' : 'Sell'} execution failed.`);
    }
  };


  const boardsToShow = boards.filter(b => displayedBoardIds.includes(b.id));

  const handleChartSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = event.target.value;
    setActivePortfolioId(selectedId);
  };

  const openSimulateModal = () => {
    setSimulationNameInput(''); // Reset fields
    setSimulationCashInput('10000');
    setIsSimulateModalOpen(true);
  };

  const handleCreateSimulation = () => {
    const cash = parseInt(simulationCashInput, 10);
    const name = simulationNameInput.trim();
    if (name && !isNaN(cash) && cash > 0) {
      if (simulations.find(s => s.name.toLowerCase() === name.toLowerCase())) {
        alert('A simulation with this name already exists. Please choose a different name.');
        return;
      }
      const newSimulation: SimulationSettings = {
        id: `sim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`, // More unique ID
        name: name,
        startingCash: cash,
      };
      
      const updatedSimulations = [...simulations, newSimulation];
      setSimulations(updatedSimulations);
      setActivePortfolioId(newSimulation.id); // Activate the new simulation
      
      console.log(`Creating simulation: ${name} with $${cash}, ID: ${newSimulation.id}`);
      setIsSimulateModalOpen(false);
      setIsSettingsDropdownOpen(false); // Close dropdown if open
    } else {
      alert('Please enter a valid simulation name and starting cash amount.');
    }
  };

  const handleDeletePortfolio = () => {
    if (!activePortfolioId) {
      alert("No portfolio selected to delete.");
      return;
    }
    const portfolioToDelete = simulations.find(s => s.id === activePortfolioId);
    if (!portfolioToDelete) {
        alert("Could not find the selected portfolio to delete.");
        return;
    }

    if (window.confirm(`Are you sure you want to delete the portfolio "${portfolioToDelete.name}"? This action cannot be undone.`)) {
      const updatedSimulations = simulations.filter(s => s.id !== activePortfolioId);
      setSimulations(updatedSimulations);

      // Clear associated data from localStorage for the deleted portfolio
      localStorage.removeItem(`paperTradingPortfolio_${activePortfolioId}`);
      localStorage.removeItem(`paperTradingMetrics_${activePortfolioId}`);
      localStorage.removeItem(`paperTradingHistory_${activePortfolioId}`);


      if (updatedSimulations.length > 0) {
        setActivePortfolioId(updatedSimulations[0].id); // Activate the first remaining simulation
      } else {
        setActivePortfolioId(null); // No simulations left
      }
      setIsSettingsDropdownOpen(false); // Close dropdown
    }
  };

  const chartTitle = activeSimulation ? activeSimulation.name : "Portfolio Overview";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown and the settings button
      // This requires refs to the button and dropdown elements
      // For simplicity, we'll just close if it's open and a click occurs.
      // A more robust solution would involve checking event.target.
      if (isSettingsDropdownOpen) {
        // A simple way, but might close unintentionally if clicking on elements that open other modals.
        // Consider adding refs to the button and dropdown for more precise control.
        const target = event.target as HTMLElement;
        if (!target.closest('.settings-dropdown-container') && !target.closest('.settings-button')) {
             setIsSettingsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsDropdownOpen]);


  return (
    <div className="flex flex-row h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow w-full min-h-0">
        <div className="bg-purple-700 py-20 shrink-0">
          <div className="flex justify-center items-center space-x-4 h-full">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Find Classroom
            </button>
            <button
              onClick={openSimulateModal}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Simulate Portfolio
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
              <div className="flex items-center space-x-2 relative settings-dropdown-container"> {/* Added relative and class */}
                {simulations.length > 0 && ( // Ensure dropdown only shows if there are simulations
                  <select
                    aria-label="Select active portfolio"
                    className="text-sm border border-gray-300 rounded px-2 py-1"
                    onChange={(e) => {
                      handleChartSelectionChange(e);
                      setIsSettingsDropdownOpen(false); // Close dropdown on selection change
                    }}
                    value={activePortfolioId || ''}
                  >
                    {simulations.map(sim => (
                      <option key={sim.id} value={sim.id}>{sim.name}</option>
                    ))}
                  </select>
                )}
                {!simulations.length && !activePortfolioId && ( // Show "No simulations" only if truly none
                     <span className="text-sm text-gray-500">No simulations created</span>
                )}
                {activePortfolioId && (
                  <button
                    onClick={() => setIsSettingsDropdownOpen(prev => !prev)}
                    className="p-1.5 text-gray-600 hover:text-gray-800 border border-gray-300 rounded hover:bg-gray-100 settings-button" // Added class
                    aria-label="Portfolio Settings"
                    aria-expanded={isSettingsDropdownOpen}
                    aria-haspopup="true"
                  >
                    <SettingsIcon size={16} />
                  </button>
                )}
                {/* Settings Dropdown */}
                {isSettingsDropdownOpen && activePortfolioId && (
                  <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-300 rounded-md shadow-lg z-20 py-1">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-gray-700">Portfolio Settings</p>
                      {activeSimulation && <p className="text-xs text-gray-500 truncate" title={activeSimulation.name}>{activeSimulation.name}</p>}
                    </div>
                    <div className="border-t border-gray-200"></div>
                    {/* <button
                      onClick={() => {
                        console.log('Rename portfolio:', activePortfolioId);
                        setIsSettingsDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center"
                    >
                      <PencilIcon size={14} className="mr-2" /> Rename (Soon)
                    </button> */}
                    <button
                      onClick={handleDeletePortfolio}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center"
                    >
                      <Trash2Icon size={14} className="mr-2" /> Delete Portfolio
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Chart Area with defined height and new structure */}
            <div className="bg-gray-200 h-3/5 flex flex-col p-3">
              {activePortfolioId && paperMetrics && activeSimulation ? (
                <>
                  {/* Top: Total Value Display */}
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">{activeSimulation.name}</span>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-800">
                        ${paperMetrics.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                      </span>
                      {/* Placeholder for change/percentage if available later */}
                    </div>
                    <span className="text-xs text-gray-500">Total Portfolio Value</span>
                  </div>

                  {/* Middle: Chart Placeholder */}
                  <div className="flex-grow border border-gray-300 bg-white flex items-center justify-center my-2 rounded">
                    <p className="text-gray-400 italic">Portfolio Value Over Time Chart Area</p>
                  </div>

                  {/* Bottom: Time Variables (Placeholder Buttons/Labels) */}
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
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500 text-lg text-center px-4">
                    {chartTitle === "Portfolio Overview" && !activePortfolioId 
                      ? "Create or select a portfolio to view its performance." 
                      : `${chartTitle} - Performance data will appear here.`}
                  </p>
                </div>
              )}
            </div>

            {/* Portfolio Metrics Display - MOVED to be directly underneath the chart block */}
            {activePortfolioId && paperMetrics && activeSimulation && (
                 <div className="mt-3 p-3 border-t bg-gray-50 rounded shadow-sm">
                    <h3 className="text-md font-semibold mb-2 text-gray-700">
                        {activeSimulation.name} Summary
                    </h3>
                    <div className="text-sm space-y-1 text-gray-600">
                        <p><strong>Total Value:</strong> <span className="font-medium text-gray-800">${paperMetrics.totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                        <p><strong>Available Cash:</strong> <span className="font-medium text-gray-800">${paperMetrics.cashBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                        <p><strong>Total Gain / Loss:</strong> <span className={`font-medium ${paperMetrics.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>${paperMetrics.totalGain.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span></p>
                    </div>
                </div>
            )}
          </div>

          <div className="w-[20.25%] border-r border-black h-full overflow-y-auto p-2">
            <div className="mb-4 p-2 border-b">
              <h3 className="text-md font-semibold mb-2">Trade</h3>
              <div className="space-y-2 relative"> {/* Added relative for positioning search results */}
                <div>
                  <label htmlFor="trade-symbol" className="block text-sm font-medium text-gray-700">Symbol</label>
                  <input
                    type="text"
                    id="trade-symbol"
                    value={tradeSymbol}
                    onChange={handleTradeSymbolChange}
                    onFocus={() => { // MODIFIED: Changed to a block
                      if (tradeSymbol.length > 0) {
                        setTradeSearchQuery(tradeSymbol); // Call separately
                        setShowTradeSearchResults(true);  // Call separately
                      }
                    }}
                    // onBlur={() => setTimeout(() => setShowTradeSearchResults(false), 150)} // Delay to allow click on results
                    className="mt-1 block w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="e.g., AAPL"
                    disabled={!activePortfolioId}
                    autoComplete="off"
                  />
                  {showTradeSearchResults && tradeSearchResults.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
                      {(tradeSearchResults as StockSearchResult[]).map((item) => (
                        <li
                          key={item.symbol}
                          onClick={() => handleSelectTradeSymbol(item)}
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
                  {tradeSearchLoading && <p className="text-xs text-gray-500">Searching...</p>}
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
                    disabled={!activePortfolioId || isSettingsDropdownOpen} // Disable if dropdown is open
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
                    disabled={!activePortfolioId || isSettingsDropdownOpen || isFetchingTradePrice} // Disable if fetching or dropdown open
                  />
                </div>
                {/* Display Total Trade Cost */}
                {tradeTotalCost > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Total Cost: ${tradeTotalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleExecuteTrade('buy')}
                    className="w-full px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 text-sm disabled:opacity-50"
                    disabled={!activePortfolioId || tradeTotalCost === 0 || isSettingsDropdownOpen} // Disable if dropdown is open
                  >
                    Buy
                  </button>
                  <button
                    onClick={() => handleExecuteTrade('sell')}
                    className="w-full px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                    disabled={!activePortfolioId || paperPositions.length === 0 || isSettingsDropdownOpen} // Disable if dropdown is open
                  >
                    Sell
                  </button>
                </div>
                {tradeError && <p className="text-xs text-red-600 mt-1">{tradeError}</p>}
                {!activePortfolioId && <p className="text-xs text-orange-600 mt-1">Create or select a portfolio to start trading.</p>}
              </div>
            </div>

            <h2 className="text-lg font-semibold mb-2">Portfolio Holdings</h2>
            {activePortfolioId ? (
                paperPositions.length > 0 ? (
                <ul>
                    {paperPositions.map(h => (
                    <li 
                        key={h.symbol} 
                        className="border-b py-2 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                        onClick={() => handleOpenHoldingTradeModal(h)}
                    >
                        <div className="font-medium">{h.name} ({h.symbol})</div>
                        <div className="text-sm text-gray-600">Qty: {h.shares} - Value: ${h.value.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
                        <div className="text-sm text-gray-600">
                            Avg Cost: ${h.avgCost.toFixed(2)} - Current: ${h.currentPrice.toFixed(2)} - Gain: <span className={h.gain >=0 ? 'text-green-600' : 'text-red-600'}>${h.gain.toFixed(2)} ({h.gainPercent.toFixed(2)}%)</span>
                        </div>
                    </li>
                    ))}

                </ul>
                ) : (
                <p className="text-gray-500">No holdings to display for {activeSimulation?.name || 'this portfolio'}.</p>
                )
            ) : (
                <p className="text-gray-500">Select or create a portfolio to view holdings.</p>
            )}
          </div>

          <div className="w-[29.25%] h-full overflow-y-auto relative p-2">
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
                      <PracticeWatchlistItemRow
                        key={item.symbol}
                        item={item} // Pass the whole item object
                        assetType={item.assetType} // Pass assetType from the item
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

      {/* "Simulate Portfolio" Modal */}
      {isSimulateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Create New Portfolio Simulation</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="sim-name" className="block text-sm font-medium text-gray-700">Simulation Name</label>
                <input
                  type="text"
                  id="sim-name"
                  value={simulationNameInput}
                  onChange={(e) => setSimulationNameInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., My First Competition"
                />
              </div>
              <div>
                <label htmlFor="sim-cash" className="block text-sm font-medium text-gray-700">Starting Cash ($)</label>
                <input
                  type="number"
                  id="sim-cash"
                  value={simulationCashInput}
                  onChange={(e) => setSimulationCashInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsSimulateModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateSimulation}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Create Simulation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Trade Holding Modal */}
      {isHoldingTradeModalOpen && selectedHoldingForTrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">
                    Trade: {selectedHoldingForTrade.name} ({selectedHoldingForTrade.symbol})
                </h3>
                <button onClick={handleCloseHoldingTradeModal} className="text-gray-500 hover:text-gray-700">
                    <XIcon size={24} />
                </button>
            </div>
            <p className="text-sm text-gray-600 mb-1">Currently holding: {selectedHoldingForTrade.shares} shares</p>
            <p className="text-sm text-gray-600 mb-4">Last Price: ${selectedHoldingForTrade.currentPrice ? selectedHoldingForTrade.currentPrice.toFixed(2) : 'N/A'}</p>

            <div className="space-y-3">
              <div>
                <label htmlFor="holding-trade-quantity" className="block text-sm font-medium text-gray-700">Quantity</label>
                <input
                  type="number"
                  id="holding-trade-quantity"
                  value={holdingTradeQuantityInput}
                  onChange={(e) => setHoldingTradeQuantityInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label htmlFor="holding-trade-price" className="block text-sm font-medium text-gray-700">Price per Share</label>
                <input
                  type="number"
                  id="holding-trade-price"
                  value={holdingTradePriceInput}
                  onChange={(e) => setHoldingTradePriceInput(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="e.g., 150.00"
                />
              </div>
              {
                parseInt(holdingTradeQuantityInput, 10) > 0 && parseFloat(holdingTradePriceInput) > 0 && (
                  <div className="text-sm text-gray-600 mt-1">
                    Estimated Value: ${(parseInt(holdingTradeQuantityInput, 10) * parseFloat(holdingTradePriceInput)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )
              }
            </div>

            {holdingTradeError && <p className="text-xs text-red-600 mt-3 py-1">{holdingTradeError}</p>}

            <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() => handleExecuteHoldingTrade('buy')}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
                disabled={!holdingTradeQuantityInput || !holdingTradePriceInput || parseInt(holdingTradeQuantityInput, 10) <= 0 || parseFloat(holdingTradePriceInput) <= 0}
              >
                Buy More
              </button>
              <button
                type="button"
                onClick={() => {
                    setHoldingTradeQuantityInput(selectedHoldingForTrade.shares.toString());
                    if (selectedHoldingForTrade.currentPrice) {
                        setHoldingTradePriceInput(selectedHoldingForTrade.currentPrice.toFixed(2));
                    }
                }}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
                disabled={selectedHoldingForTrade.shares <= 0}
              >
                Sell All ({selectedHoldingForTrade.shares})
              </button>
              <button
                type="button"
                onClick={() => handleExecuteHoldingTrade('sell')}
                className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 disabled:opacity-50"
                disabled={!holdingTradeQuantityInput || !holdingTradePriceInput || parseInt(holdingTradeQuantityInput, 10) <= 0 || parseFloat(holdingTradePriceInput) <= 0 || parseInt(holdingTradeQuantityInput, 10) > selectedHoldingForTrade.shares}
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
