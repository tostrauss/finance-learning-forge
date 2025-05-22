// New file: src/hooks/usePaperTrading.ts
import { useState, useEffect, useCallback } from 'react';

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number; // This would ideally be updated by a market data feed
  value: number;
  gain: number;
  gainPercent: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  cashBalance: number;
  totalGain: number; // Overall gain/loss from trades
  // dayGain and dayGainPercent would require tracking initial daily values or price changes
  dayGain: number; 
  dayGainPercent: number;
}

interface PortfolioData {
  positions: Position[];
  metrics: PortfolioMetrics;
  initialCash: number; // Store the initial cash for this specific portfolio
  // name?: string; // Optional: if you want to store the simulation name here too
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


export const usePaperTrading = (
  portfolioId: string | null,
  initialCashForNewPortfolio?: number
) => {
  const [positions, setPositions] = useState<Position[]>(emptyPositions);
  const [metrics, setMetrics] = useState<PortfolioMetrics>(emptyMetrics);

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
      allPortfolios[id] = data;
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
      return;
    }

    const allPortfolios = loadAllPortfolios();
    const currentPortfolioData = allPortfolios[portfolioId];

    if (currentPortfolioData) {
      setPositions(currentPortfolioData.positions);
      setMetrics(currentPortfolioData.metrics);
    } else {
      // New portfolio for this ID, initialize it
      const startingCash = initialCashForNewPortfolio !== undefined ? initialCashForNewPortfolio : DEFAULT_CASH;
      const newPortfolioData: PortfolioData = {
        positions: [],
        metrics: defaultMetrics(startingCash),
        initialCash: startingCash,
      };
      setPositions(newPortfolioData.positions);
      setMetrics(newPortfolioData.metrics);
      // Save this new portfolio structure immediately
      savePortfolioData(portfolioId, newPortfolioData);
    }
  }, [portfolioId, initialCashForNewPortfolio, loadAllPortfolios, savePortfolioData]);

  // Effect to save the active portfolio's data when it changes
  useEffect(() => {
    if (portfolioId && (positions !== emptyPositions || metrics !== emptyMetrics)) {
      // Avoid saving if it's still the initial empty state before loading
      const allPortfolios = loadAllPortfolios();
      const currentPortfolioData = allPortfolios[portfolioId];
      const initialCash = currentPortfolioData?.initialCash || 
                          (initialCashForNewPortfolio !== undefined ? initialCashForNewPortfolio : DEFAULT_CASH);

      savePortfolioData(portfolioId, { positions, metrics, initialCash });
    }
  }, [portfolioId, positions, metrics, initialCashForNewPortfolio, savePortfolioData, loadAllPortfolios]);


  const recalculateMetrics = useCallback((updatedPositions: Position[], currentCashBalance: number): PortfolioMetrics => {
    const positionsValue = updatedPositions.reduce((sum, pos) => sum + pos.value, 0); // pos.value is currentPrice * shares
    const newTotalValue = currentCashBalance + positionsValue;
    
    const allPortfolios = loadAllPortfolios();
    const activePortfolioInitialCash = portfolioId ? (allPortfolios[portfolioId]?.initialCash || DEFAULT_CASH) : DEFAULT_CASH;
    const newTotalGain = newTotalValue - activePortfolioInitialCash;

    // Note: dayGain and dayGainPercent would require more complex tracking of start-of-day prices.
    // Preserving previous values or using placeholders for now.
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


  const executeBuy = useCallback((symbol: string, name: string, price: number, shares: number) => {
    if (!portfolioId) throw new Error("No active portfolio to execute buy.");

    const orderValue = price * shares;
    if (orderValue > metrics.cashBalance) {
      throw new Error('Insufficient funds for this trade');
    }

    let updatedPositions;
    const existingPosition = positions.find(p => p.symbol === symbol);

    if (existingPosition) {
      const newShares = existingPosition.shares + shares;
      const newAvgCost = ((existingPosition.avgCost * existingPosition.shares) + orderValue) / newShares;
      updatedPositions = positions.map(p =>
        p.symbol === symbol
          ? {
            ...p,
            shares: newShares,
            avgCost: newAvgCost,
            currentPrice: price, // Trade price becomes current price
            value: newShares * price,
            gain: (price - newAvgCost) * newShares,
            gainPercent: newAvgCost > 0 ? ((price / newAvgCost) - 1) * 100 : 0,
          }
          : p
      );
    } else {
      updatedPositions = [
        ...positions,
        {
          symbol,
          name,
          shares,
          avgCost: price,
          currentPrice: price, // Trade price becomes current price
          value: shares * price,
          gain: 0,
          gainPercent: 0,
        },
      ];
    }
    
    setPositions(updatedPositions);
    const newCashBalance = metrics.cashBalance - orderValue;
    setMetrics(recalculateMetrics(updatedPositions, newCashBalance));

  }, [portfolioId, positions, metrics, recalculateMetrics]);

  const executeSell = useCallback((symbol: string, price: number, sharesToSell: number) => {
    if (!portfolioId) throw new Error("No active portfolio to execute sell.");

    const position = positions.find(p => p.symbol === symbol);
    if (!position) throw new Error(`You don't own ${symbol}`);
    if (position.shares < sharesToSell) {
      throw new Error(`You only have ${position.shares} shares of ${symbol} to sell.`);
    }

    const saleValue = price * sharesToSell;
    let updatedPositions;

    if (position.shares === sharesToSell) {
      updatedPositions = positions.filter(p => p.symbol !== symbol);
    } else {
      const remainingShares = position.shares - sharesToSell;
      updatedPositions = positions.map(p =>
        p.symbol === symbol
          ? {
            ...p,
            shares: remainingShares,
            currentPrice: price, // Trade price becomes current price
            value: remainingShares * price,
            gain: (price - p.avgCost) * remainingShares,
            gainPercent: p.avgCost > 0 ? ((price / p.avgCost) - 1) * 100 : 0,
          }
          : p
      );
    }

    setPositions(updatedPositions);
    const newCashBalance = metrics.cashBalance + saleValue;
    setMetrics(recalculateMetrics(updatedPositions, newCashBalance));
  }, [portfolioId, positions, metrics, recalculateMetrics]);

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

    // Only update state if there were actual changes to prices or derived values
    if (JSON.stringify(updatedPositions) !== JSON.stringify(positions)) {
      setPositions(updatedPositions);
      setMetrics(prevMetrics => recalculateMetrics(updatedPositions, prevMetrics.cashBalance));
    }
  }, [positions, recalculateMetrics]);


  return {
    positions,
    metrics,
    executeBuy,
    executeSell,
    updatePositionCurrentPrices,
  };
};