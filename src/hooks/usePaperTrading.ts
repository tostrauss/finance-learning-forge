// New file: src/hooks/usePaperTrading.ts
import { useState, useEffect, useCallback } from 'react';

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number; // Changed from averagePrice to avgCost to match usage
  currentPrice: number;
  value: number;
  gain: number;
  gainPercent: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  cashBalance: number;
  totalGain: number;
  dayGain: number;
  dayGainPercent: number;
}

// Define an interface for Trade History
export interface TradeHistoryEntry {
  id: string;
  type: 'BUY' | 'SELL';
  symbol: string;
  shares: number;
  price: number;
  date: string; // ISO string date
  total: number;
}

// Define an interface for portfolio history data points (for the chart)
interface PortfolioHistoryPoint {
  timestamp: number;
  totalValue: number;
}

interface PortfolioData {
  positions: Position[];
  metrics: PortfolioMetrics;
  initialCash: number;
  tradeHistory?: TradeHistoryEntry[]; // Renamed from history for clarity
  portfolioValueHistory?: PortfolioHistoryPoint[]; // For chart data
}

interface AllPortfolios {
  [portfolioId: string]: PortfolioData;
}

const ALL_PORTFOLIOS_LS_KEY = 'userAllPaperTradingPortfolios';
const DEFAULT_CASH = 10000;

const defaultMetrics = (cash: number): PortfolioMetrics => ({
  totalValue: cash,
  cashBalance: cash,
  totalGain: 0,
  dayGain: 0,
  dayGainPercent: 0,
});

const emptyPositions: Position[] = [];
const emptyMetrics: PortfolioMetrics = defaultMetrics(0);
const emptyHistory: TradeHistoryEntry[] = []; // Define empty history
const emptyPortfolioValueHistory: PortfolioHistoryPoint[] = []; // For chart data


export const usePaperTrading = (portfolioId: string | null, initialCash?: number) => {
  const [positions, setPositions] = useState<Position[]>(emptyPositions); // Initialized as []
  const [metrics, setMetrics] = useState<PortfolioMetrics>(emptyMetrics);
  const [tradeHistory, setTradeHistory] = useState<TradeHistoryEntry[]>(emptyHistory); // Renamed from history
  const [portfolioValueHistory, setPortfolioValueHistory] = useState<PortfolioHistoryPoint[]>(emptyPortfolioValueHistory); // New state for chart

  const loadAllPortfolios = useCallback((): AllPortfolios => {
    try {
      const saved = localStorage.getItem(ALL_PORTFOLIOS_LS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (error) {
      console.error('Error loading all portfolios from localStorage:', error);
      return {};
    }
  }, []);

  const savePortfolioData = useCallback((id: string, data: PortfolioData) => {
    try {
      const allPortfolios = loadAllPortfolios();
      allPortfolios[id] = data; // data now includes tradeHistory and portfolioValueHistory
      localStorage.setItem(ALL_PORTFOLIOS_LS_KEY, JSON.stringify(allPortfolios));
    } catch (error) {
      console.error(`Error saving portfolio data for ${id}:`, error);
    }
  }, [loadAllPortfolios]);

  // Effect to load data for the active portfolioId
  useEffect(() => {
    if (!portfolioId) {
      setPositions(emptyPositions);
      setMetrics(emptyMetrics);
      setTradeHistory(emptyHistory);
      setPortfolioValueHistory(emptyPortfolioValueHistory); // Reset portfolio value history
      return;
    }

    const allPortfolios = loadAllPortfolios();
    const currentPortfolioData = allPortfolios[portfolioId];

    if (currentPortfolioData) {
      setPositions(currentPortfolioData.positions);
      setMetrics(currentPortfolioData.metrics);
      setTradeHistory(currentPortfolioData.tradeHistory || emptyHistory);
      setPortfolioValueHistory(currentPortfolioData.portfolioValueHistory || emptyPortfolioValueHistory); // Load portfolio value history
    } else {
      const startingCash = initialCash !== undefined ? initialCash : DEFAULT_CASH;
      const initialPortfolioValuePoint: PortfolioHistoryPoint = { timestamp: Date.now(), totalValue: startingCash };
      const newPortfolioData: PortfolioData = {
        positions: [],
        metrics: defaultMetrics(startingCash),
        initialCash: startingCash,
        tradeHistory: [],
        portfolioValueHistory: [initialPortfolioValuePoint], // Initialize with current value
      };
      setPositions(newPortfolioData.positions);
      setMetrics(newPortfolioData.metrics);
      setTradeHistory(newPortfolioData.tradeHistory);
      setPortfolioValueHistory(newPortfolioData.portfolioValueHistory); // Set initial portfolio value history
      savePortfolioData(portfolioId, newPortfolioData);
    }
  }, [portfolioId, initialCash, loadAllPortfolios, savePortfolioData]);

  // Effect to save the active portfolio's data when it changes
  useEffect(() => {
    if (portfolioId && (positions !== emptyPositions || metrics !== emptyMetrics || tradeHistory !== emptyHistory || portfolioValueHistory !== emptyPortfolioValueHistory)) {
      const allPortfolios = loadAllPortfolios();
      const currentPortfolioData = allPortfolios[portfolioId];
      
      const resolvedPortfolioInitialCash = currentPortfolioData?.initialCash || 
                                      (initialCash !== undefined ? initialCash : DEFAULT_CASH);

      savePortfolioData(portfolioId, { positions, metrics, initialCash: resolvedPortfolioInitialCash, tradeHistory, portfolioValueHistory });
    }
  }, [portfolioId, positions, metrics, tradeHistory, portfolioValueHistory, initialCash, savePortfolioData, loadAllPortfolios]);

  // Effect to update portfolioValueHistory when metrics.totalValue changes
  useEffect(() => {
    // Ensure portfolioId is active, metrics are populated (not empty/initial), and totalValue is a number.
    if (portfolioId && metrics !== emptyMetrics && typeof metrics.totalValue === 'number') {
      setPortfolioValueHistory(prevValueHistory => {
        const newPoint: PortfolioHistoryPoint = { timestamp: Date.now(), totalValue: metrics.totalValue };

        if (prevValueHistory.length === 0) {
          // This case handles if initial history was empty and metrics just got populated.
          return [newPoint];
        }

        const lastPoint = prevValueHistory[prevValueHistory.length - 1];
        // Add new point only if total value has actually changed.
        if (lastPoint.totalValue !== newPoint.totalValue) {
          // Optional: Limit history size
          // const MAX_HISTORY_POINTS = 1000;
          // const updatedHistory = [...prevValueHistory, newPoint];
          // if (updatedHistory.length > MAX_HISTORY_POINTS) {
          //   return updatedHistory.slice(updatedHistory.length - MAX_HISTORY_POINTS);
          // }
          // return updatedHistory;
          return [...prevValueHistory, newPoint];
        }
        
        // If value is the same, do not add a new point to prevent clutter,
        // unless specific logic for time-based points is added (e.g., daily snapshot).
        return prevValueHistory; // No change to history
      });
    }
  }, [portfolioId, metrics]); // Rely on `metrics` object changing.


  const recalculateMetrics = useCallback((updatedPositions: Position[], currentCashBalance: number): PortfolioMetrics => {
    const positionsValue = updatedPositions.reduce((sum, pos) => sum + pos.value, 0);
    const newTotalValue = currentCashBalance + positionsValue;
    
    const allPortfolios = loadAllPortfolios();
    const activePortfolioInitialCash = portfolioId ? (allPortfolios[portfolioId]?.initialCash || DEFAULT_CASH) : DEFAULT_CASH;
    const newTotalGain = newTotalValue - activePortfolioInitialCash;

    const currentDayGain = metrics.dayGain; 
    const currentDayGainPercent = metrics.dayGainPercent;

    return {
      cashBalance: currentCashBalance,
      totalValue: newTotalValue,
      totalGain: newTotalGain,
      dayGain: currentDayGain, 
      dayGainPercent: currentDayGainPercent,
    };
  }, [portfolioId, loadAllPortfolios, metrics.dayGain, metrics.dayGainPercent]);


  const executeBuy = async (marketSymbol: string, name: string, price: number, shares: number): Promise<void> => {
    if (!portfolioId) {
      console.error("No active portfolio to execute buy order.");
      return;
    }
    const cost = price * shares;
    
    let buySuccessful = false;
    setMetrics(prevMetrics => {
      const currentCash = prevMetrics?.cashBalance ?? initialCash ?? 0;
      if (cost > currentCash) {
        console.error("Insufficient funds to buy.");
        return prevMetrics || defaultMetrics(initialCash ?? 0);
      }
      buySuccessful = true; // Mark as successful if cash check passes

      // Update positions (can be done outside if preferred, but needs access to prevPositions)
      setPositions(prevPositions => {
        const existingPosition = prevPositions.find(p => p.symbol === marketSymbol);
        let newPositions;
        if (existingPosition) {
          const totalShares = existingPosition.shares + shares;
          const totalValue = existingPosition.value + cost;
          newPositions = prevPositions.map(p =>
            p.symbol === marketSymbol
              ? {
                  ...p,
                  shares: totalShares,
                  avgCost: totalValue / totalShares, // Corrected avgCost calculation
                  value: totalValue, // Value is shares * currentPrice, but here it's cost basis
                  currentPrice: price, // Assuming price is current market price
                }
              : p
          );
        } else {
          newPositions = [
            ...prevPositions,
            {
              symbol: marketSymbol,
              name: name || marketSymbol,
              shares: shares,
              avgCost: price,
              currentPrice: price,
              value: cost,
              gain: 0,
              gainPercent: 0,
            },
          ];
        }
        // localStorage.setItem(`paperTradingPortfolio_${portfolioId}`, JSON.stringify(newPositions)); // Handled by savePortfolioData effect
        return newPositions;
      });

      const newCashBalance = currentCash - cost;
      // Recalculate total portfolio value based on new positions and cash
      // This needs to be done after positions state is updated, or pass newPositions to recalculateMetrics
      // For now, simplifying:
      const updatedMetrics = recalculateMetrics(positions, newCashBalance); // Pass current positions state
      return updatedMetrics;
    });

    if (buySuccessful) { // Only add to history if buy was successful
      setTradeHistory(prevTradeHistory => {
        const newEntry: TradeHistoryEntry = { // Explicitly type newEntry
          id: `trade_${Date.now()}_${marketSymbol}`,
          type: 'BUY' as 'BUY',
          symbol: marketSymbol,
          shares,
          price,
          date: new Date().toISOString(),
          total: cost,
        };
        // const updatedHistory = [newEntry, ...prevHistory];
        // localStorage.setItem(`paperTradingHistory_${portfolioId}`, JSON.stringify(updatedHistory)); // Handled by savePortfolioData effect
        return [newEntry, ...prevTradeHistory];
      });
    }
  };

  const executeSell = async (marketSymbol: string, price: number, sharesToSell: number): Promise<void> => {
    if (!portfolioId) {
      console.error("No active portfolio to execute sell order.");
      return;
    }

    let sellSuccessful = false;
    let proceeds = 0;

    setPositions(prevPositions => {
      const positionToSell = prevPositions.find(p => p.symbol === marketSymbol);
      if (!positionToSell || positionToSell.shares < sharesToSell) {
        console.error("Not enough shares to sell or position not found.");
        return prevPositions;
      }
      
      sellSuccessful = true;
      proceeds = price * sharesToSell;
      let newPositions;
      if (positionToSell.shares === sharesToSell) {
        newPositions = prevPositions.filter(p => p.symbol !== marketSymbol);
      } else {
        newPositions = prevPositions.map(p =>
          p.symbol === marketSymbol
            ? {
                ...p,
                shares: p.shares - sharesToSell,
                // Value should be updated based on currentPrice * new shares
                value: (p.shares - sharesToSell) * p.currentPrice, 
                // avgCost remains the same
              }
            : p
        );
      }
      // localStorage.setItem(`paperTradingPortfolio_${portfolioId}`, JSON.stringify(newPositions)); // Handled by savePortfolioData effect
      return newPositions;
    });

    if (sellSuccessful) {
      setMetrics(prevMetrics => {
        const currentCash = prevMetrics?.cashBalance ?? initialCash ?? 0;
        const newCashBalance = currentCash + proceeds;
        const updatedMetrics = recalculateMetrics(positions, newCashBalance); // Pass current positions state
        return updatedMetrics;
      });
      
      setTradeHistory(prevTradeHistory => {
          const newEntry: TradeHistoryEntry = { // Explicitly type newEntry
              id: `trade_${Date.now()}_${marketSymbol}`,
              type: 'SELL' as 'SELL',
              symbol: marketSymbol,
              shares: sharesToSell,
              price,
              date: new Date().toISOString(),
              total: proceeds,
          };
          // const updatedHistory = [newEntry, ...prevHistory];
          // localStorage.setItem(`paperTradingHistory_${portfolioId}`, JSON.stringify(updatedHistory)); // Handled by savePortfolioData effect
          return [newEntry, ...prevTradeHistory];
      });
    }
  };

  const updatePositionCurrentPrices = useCallback((priceUpdates: Array<{ symbol: string; newPrice: number }>) => {
    if (!positions.length || !priceUpdates.length) return;

    const updatedPositions = positions.map(pos => {
      const priceUpdate = priceUpdates.find(p => p.symbol === pos.symbol);
      if (priceUpdate && priceUpdate.newPrice !== pos.currentPrice) {
        const newCurrentPrice = priceUpdate.newPrice;
        const newValue = newCurrentPrice * pos.shares;
        const newGain = (newCurrentPrice - pos.avgCost) * pos.shares;
        const newGainPercent = pos.avgCost > 0 ? ((newCurrentPrice / pos.avgCost) - 1) * 100 : 0;
        return {
          ...pos,
          currentPrice: newCurrentPrice,
          value: newValue,
          gain: newGain,
          gainPercent: newGainPercent,
        };
      }
      return pos;
    });

    if (JSON.stringify(updatedPositions) !== JSON.stringify(positions)) {
      setPositions(updatedPositions);
      setMetrics(prevMetrics => recalculateMetrics(updatedPositions, prevMetrics.cashBalance));
    }
  }, [positions, recalculateMetrics]);


  return {
    positions,
    metrics,
    tradeHistory, // Renamed from 'history'
    portfolioHistory: portfolioValueHistory, // This is for the chart
    executeBuy,
    executeSell,
    updatePositionCurrentPrices,
  };
};