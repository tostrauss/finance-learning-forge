// New file: src/hooks/usePaperTrading.ts
import { useState, useEffect } from 'react';

export interface Position {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
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

const DEFAULT_CASH = 10000; // $10,000 starting cash

export const usePaperTrading = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [metrics, setMetrics] = useState<PortfolioMetrics>({
    totalValue: DEFAULT_CASH,
    cashBalance: DEFAULT_CASH,
    totalGain: 0,
    dayGain: 0,
    dayGainPercent: 0,
  });
  
  // Load portfolio from localStorage
  useEffect(() => {
    try {
      const savedPortfolio = localStorage.getItem('paperTradingPortfolio');
      if (savedPortfolio) {
        const { positions, metrics } = JSON.parse(savedPortfolio);
        setPositions(positions);
        setMetrics(metrics);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    }
  }, []);
  
  // Save portfolio to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('paperTradingPortfolio', JSON.stringify({
        positions,
        metrics,
      }));
    } catch (error) {
      console.error('Error saving portfolio:', error);
    }
  }, [positions, metrics]);
  
  // Buy stock
  const executeBuy = (symbol: string, name: string, price: number, shares: number) => {
    const orderValue = price * shares;
    
    if (orderValue > metrics.cashBalance) {
      throw new Error('Insufficient funds for this trade');
    }
    
    const existingPosition = positions.find(p => p.symbol === symbol);
    
    if (existingPosition) {
      // Update existing position
      const newShares = existingPosition.shares + shares;
      const newAvgCost = ((existingPosition.avgCost * existingPosition.shares) + orderValue) / newShares;
      
      setPositions(positions.map(p => 
        p.symbol === symbol 
          ? { 
              ...p, 
              shares: newShares, 
              avgCost: newAvgCost,
              value: newShares * price,
              gain: (price - newAvgCost) * newShares,
              gainPercent: ((price / newAvgCost) - 1) * 100
            } 
          : p
      ));
    } else {
      // Create new position
      setPositions([
        ...positions,
        {
          symbol,
          name,
          shares,
          avgCost: price,
          currentPrice: price,
          value: shares * price,
          gain: 0,
          gainPercent: 0
        }
      ]);
    }
    
    // Update cash balance
    setMetrics({
      ...metrics,
      cashBalance: metrics.cashBalance - orderValue,
    });
  };
  
  // Sell stock
  const executeSell = (symbol: string, price: number, shares: number) => {
    const position = positions.find(p => p.symbol === symbol);
    
    if (!position) {
      throw new Error(`You don't own ${symbol}`);
    }
    
    if (position.shares < shares) {
      throw new Error(`You only have ${position.shares} shares of ${symbol}`);
    }
    
    const saleValue = price * shares;
    const costBasis = position.avgCost * shares;
    const realizedGain = saleValue - costBasis;
    
    // Update or remove position
    if (position.shares === shares) {
      setPositions(positions.filter(p => p.symbol !== symbol));
    } else {
      setPositions(positions.map(p => 
        p.symbol === symbol 
          ? { 
              ...p, 
              shares: p.shares - shares,
              value: (p.shares - shares) * price,
              gain: (price - p.avgCost) * (p.shares - shares),
              gainPercent: ((price / p.avgCost) - 1) * 100
            } 
          : p
      ));
    }
    
    // Update portfolio metrics
    setMetrics({
      ...metrics,
      cashBalance: metrics.cashBalance + saleValue,
      totalValue: metrics.totalValue + realizedGain,
      totalGain: metrics.totalGain + realizedGain,
    });
  };

  return {
    positions,
    metrics,
    executeBuy,
    executeSell,
  };
};