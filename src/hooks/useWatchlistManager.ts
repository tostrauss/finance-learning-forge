import { useState, useEffect, useCallback } from 'react';
import { WatchlistItem, AssetType } from '@/components/trading/WatchlistWidget'; // Ensure this path is correct

export interface WatchlistBoard {
  id: string;
  title: string;
  items: WatchlistItem[];
}

const LOCAL_STORAGE_KEY = 'watchlistBoards';

export function useWatchlistManager() {
  const [boards, setBoards] = useState<WatchlistBoard[]>(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading watchlists from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(boards));
    } catch (error) {
      console.error("Error saving watchlists to localStorage:", error);
    }
  }, [boards]);

  const addBoard = useCallback((title: string): string => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
        // Optionally throw an error or handle it, for now, let's prevent adding empty titles silently
        console.warn("Attempted to add a board with an empty title.");
        return ""; // Or throw new Error("Title cannot be empty.");
    }
    const id = crypto.randomUUID();
    const newBoard: WatchlistBoard = { id, title: trimmedTitle, items: [] };
    setBoards(prev => [...prev, newBoard]);
    return id;
  }, []);

  const removeBoard = useCallback((boardId: string) => {
    setBoards(prev => prev.filter(b => b.id !== boardId));
  }, []);

  const updateBoardTitle = useCallback((boardId: string, title: string) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return; 
    setBoards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, title: trimmedTitle } : b))
    );
  }, []);

  const addItemToBoard = useCallback((boardId: string, symbol: string, assetType: AssetType) => {
    const newItem: WatchlistItem = {
      symbol,
      assetType,
      price: 0, // Default price, WatchlistWidget's ItemRow fetches live price
      change: 0,
      changePercent: 0,
    };
    setBoards(prev =>
      prev.map(b => {
        if (b.id === boardId) {
          // Prevent adding duplicate symbols to the same board
          if (b.items.find(item => item.symbol === symbol)) {
            return b; 
          }
          return { ...b, items: [...b.items, newItem] };
        }
        return b;
      })
    );
  }, []);

  const removeItemFromBoard = useCallback((boardId: string, symbol: string) => {
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId
          ? { ...b, items: b.items.filter(i => i.symbol !== symbol) }
          : b
      )
    );
  }, []);

  return {
    boards,
    addBoard,
    removeBoard,
    updateBoardTitle,
    addItemToBoard,
    removeItemFromBoard,
  };
}