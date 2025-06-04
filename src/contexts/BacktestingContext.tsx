import React, { createContext, useContext, useState } from 'react';
import { BacktestStrategy, BacktestResult, backtestingService } from '../services/backtestingService';

interface BacktestingContextType {
  currentStrategy: BacktestStrategy | null;
  lastResult: BacktestResult | null;
  isLoading: boolean;
  runBacktest: (strategy: BacktestStrategy) => Promise<void>;
  saveStrategy: (strategy: BacktestStrategy) => Promise<void>;
  loadStrategies: () => Promise<BacktestStrategy[]>;
  error: string | null;
}

const BacktestingContext = createContext<BacktestingContextType | undefined>(undefined);

export function BacktestingProvider({ children }: { children: React.ReactNode }) {
  const [currentStrategy, setCurrentStrategy] = useState<BacktestStrategy | null>(null);
  const [lastResult, setLastResult] = useState<BacktestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runBacktest = async (strategy: BacktestStrategy) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await backtestingService.runBacktest(strategy);
      setLastResult(result);
      setCurrentStrategy(strategy);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run backtest');
    } finally {
      setIsLoading(false);
    }
  };

  const saveStrategy = async (strategy: BacktestStrategy) => {
    setIsLoading(true);
    setError(null);
    try {
      await backtestingService.saveStrategy(strategy);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save strategy');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStrategies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      return await backtestingService.getStrategies();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load strategies');
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BacktestingContext.Provider
      value={{
        currentStrategy,
        lastResult,
        isLoading,
        error,
        runBacktest,
        saveStrategy,
        loadStrategies,
      }}
    >
      {children}
    </BacktestingContext.Provider>
  );
}

export function useBacktesting() {
  const context = useContext(BacktestingContext);
  if (context === undefined) {
    throw new Error('useBacktesting must be used within a BacktestingProvider');
  }
  return context;
}
