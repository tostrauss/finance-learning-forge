import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { db } from '@/lib/firebase';
import { Position, Portfolio, Transaction } from '@/types/trading';
import { createPortfolio, getPortfolio, updatePortfolio, deletePortfolio } from '@/services/paperTradingService';

interface PracticeContextType {
  portfolio: Portfolio | null;
  positions: Position[];
  cash: number;
  totalValue: number;
  loading: boolean;
  error: string | null;
  executeBuy: (symbol: string, quantity: number, price: number) => Promise<void>;
  executeSell: (symbol: string, quantity: number, price: number) => Promise<void>;
  updatePositions: (positions: Position[]) => Promise<void>;
  resetPortfolio: () => Promise<void>;
  createNewPortfolio: (initialCash: number) => Promise<void>;
}

const PracticeContext = createContext<PracticeContextType | undefined>(undefined);

interface PracticeProviderProps {
  children: React.ReactNode;
  user: User | null;
}

export const PracticeProvider: React.FC<PracticeProviderProps> = ({ children, user }) => {
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [cash, setCash] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const loadPortfolio = async () => {
      try {
        const portfolio = await getPortfolio(user.uid);
        if (portfolio) {
          setPortfolio(portfolio);
          setPositions(portfolio.positions);
          setCash(portfolio.cash);
          setTotalValue(portfolio.totalValue);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load portfolio');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [user]);

  const executeBuy = async (symbol: string, quantity: number, price: number) => {
    if (!user || !portfolio) throw new Error('No active portfolio');
    
    const totalCost = quantity * price;
    if (totalCost > cash) {
      throw new Error('Insufficient funds');
    }

    try {
      // Update local state
      const existingPosition = positions.find(p => p.symbol === symbol);
      let newPositions: Position[];

      if (existingPosition) {
        const avgPrice = (existingPosition.quantity * existingPosition.averagePrice + quantity * price) / 
                        (existingPosition.quantity + quantity);
        newPositions = positions.map(p => 
          p.symbol === symbol 
            ? { ...p, quantity: p.quantity + quantity, averagePrice: avgPrice }
            : p
        );
      } else {
        newPositions = [...positions, { 
          symbol, 
          quantity, 
          averagePrice: price,
          currentPrice: price,
          totalValue: quantity * price
        }];
      }

      const newCash = cash - totalCost;
      const newTotalValue = totalValue; // Total value doesn't change on buy, just the composition

      // Update Firestore
      await updatePortfolio(user.uid, {
        positions: newPositions,
        cash: newCash,
        totalValue: newTotalValue,
      });

      // Update local state
      setPositions(newPositions);
      setCash(newCash);
      setTotalValue(newTotalValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute buy');
      throw err;
    }
  };

  const executeSell = async (symbol: string, quantity: number, price: number) => {
    if (!user || !portfolio) throw new Error('No active portfolio');
    
    const position = positions.find(p => p.symbol === symbol);
    if (!position) throw new Error('Position not found');
    if (position.quantity < quantity) throw new Error('Insufficient shares');

    try {
      const totalProceeds = quantity * price;
      const newCash = cash + totalProceeds;

      let newPositions: Position[];
      if (position.quantity === quantity) {
        newPositions = positions.filter(p => p.symbol !== symbol);
      } else {
        newPositions = positions.map(p => 
          p.symbol === symbol 
            ? { ...p, quantity: p.quantity - quantity }
            : p
        );
      }

      const newTotalValue = totalValue; // Total value doesn't change on sell, just the composition

      // Update Firestore
      await updatePortfolio(user.uid, {
        positions: newPositions,
        cash: newCash,
        totalValue: newTotalValue,
      });

      // Update local state
      setPositions(newPositions);
      setCash(newCash);
      setTotalValue(newTotalValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to execute sell');
      throw err;
    }
  };

  const updatePositions = async (updatedPositions: Position[]) => {
    if (!user || !portfolio) return;

    try {
      const newTotalValue = updatedPositions.reduce(
        (total, pos) => total + pos.quantity * pos.currentPrice,
        cash
      );

      await updatePortfolio(user.uid, {
        positions: updatedPositions,
        totalValue: newTotalValue,
      });

      setPositions(updatedPositions);
      setTotalValue(newTotalValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update positions');
      throw err;
    }
  };

  const resetPortfolio = async () => {
    if (!user) return;

    try {
      await createPortfolio(user.uid, 10000); // Reset with default initial cash
      const portfolio = await getPortfolio(user.uid);
      if (portfolio) {
        setPortfolio(portfolio);
        setPositions(portfolio.positions);
        setCash(portfolio.cash);
        setTotalValue(portfolio.totalValue);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset portfolio');
      throw err;
    }
  };

  const createNewPortfolio = async (initialCash: number) => {
    if (!user) throw new Error('No user signed in');

    try {
      await createPortfolio(user.uid, initialCash);
      const portfolio = await getPortfolio(user.uid);
      if (portfolio) {
        setPortfolio(portfolio);
        setPositions(portfolio.positions);
        setCash(portfolio.cash);
        setTotalValue(portfolio.totalValue);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create portfolio');
      throw err;
    }
  };

  return (
    <PracticeContext.Provider
      value={{
        portfolio,
        positions,
        cash,
        totalValue,
        loading,
        error,
        executeBuy,
        executeSell,
        updatePositions,
        resetPortfolio,
        createNewPortfolio,
      }}
    >
      {children}
    </PracticeContext.Provider>
  );
};

export const usePractice = () => {
  const context = useContext(PracticeContext);
  if (context === undefined) {
    throw new Error('usePractice must be used within a PracticeProvider');
  }
  return context;
};
