// src/context/watchlistContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchWatchlists,
  fetchWatchlist,
  createWatchlist,
  updateWatchlist,
  deleteWatchlist,
  addItemToWatchlist,
  removeItemFromWatchlist
} from '@/services/watchlistService';
import { Watchlist, WatchlistItem } from '@/types/watchlist';
import { useAuth } from '@/contexts/AuthContext';

interface WatchlistContextType {
  watchlists: Watchlist[];
  selectedWatchlist: Watchlist | null;
  loading: boolean;
  error: Error | null;
  fetchWatchlists: () => Promise<void>;
  setSelectedWatchlist: (id: string) => Promise<void>;
  create: (name: string) => Promise<void>;
  updateItems: (items: WatchlistItem[]) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addItem: (item: WatchlistItem) => Promise<void>;
  removeItem: (symbol: string) => Promise<void>;
  migrateFromLocalStorage: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'watchlistBoards';

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlistState] = useState<Watchlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadAll = async () => {
    if (!user) {
      setWatchlists([]);
      setSelectedWatchlistState(null);
      return;
    }

    setLoading(true);
    try {
      const data = await fetchWatchlists(user);
      setWatchlists(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const select = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const data = await fetchWatchlist(id, user);
      setSelectedWatchlistState(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (name: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const newWL = await createWatchlist(name, user);
      setWatchlists(prev => [...prev, newWL]);
      setSelectedWatchlistState(newWL);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateItems = async (items: WatchlistItem[]) => {
    if (!selectedWatchlist || !user) return;
    
    setLoading(true);
    try {
      const updated = await updateWatchlist(selectedWatchlist.id, items, user);
      setSelectedWatchlistState(updated);
      setWatchlists(prev => prev.map(w => w.id === updated.id ? updated : w));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      await deleteWatchlist(id, user);
      setWatchlists(prev => prev.filter(w => w.id !== id));
      if (selectedWatchlist?.id === id) setSelectedWatchlistState(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  const addItem = async (item: WatchlistItem) => {
    if (!selectedWatchlist || !user) {
      setError(new Error('No watchlist selected or user not logged in'));
      return;
    }
    
    // Check if item already exists in the watchlist
    if (selectedWatchlist.items.some(i => i.symbol === item.symbol)) {
      setError(new Error(`${item.symbol} is already in this watchlist`));
      return;
    }
    
    setLoading(true);
    try {
      const updated = await addItemToWatchlist(selectedWatchlist.id, item, user);
      setSelectedWatchlistState(updated);
      setWatchlists(prev => prev.map(w => w.id === updated.id ? updated : w));
      setError(null); // Clear any previous errors
    } catch (err: any) {
      setError(err instanceof Error ? err : new Error(err.message || 'Failed to add item'));
      throw err; // Rethrow to allow handling in UI components
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (symbol: string) => {
    if (!selectedWatchlist || !user) return;
    
    setLoading(true);
    try {
      const updated = await removeItemFromWatchlist(selectedWatchlist.id, symbol, user);
      setSelectedWatchlistState(updated);
      setWatchlists(prev => prev.map(w => w.id === updated.id ? updated : w));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const migrateFromLocalStorage = async () => {
    if (!user) return;

    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!stored) return;

      const localBoards = JSON.parse(stored);
      if (!Array.isArray(localBoards)) return;

      setLoading(true);

      // Create each local board in Firebase
      for (const board of localBoards) {
        const newWL = await createWatchlist(board.title, user);
        if (board.items?.length > 0) {
          await updateWatchlist(newWL.id, board.items.map(item => ({
            symbol: item.symbol,
            name: item.symbol, // Use symbol as name if not available
            assetType: item.assetType || 'security',
            addedAt: new Date().toISOString()
          })), user);
        }
      }

      // Clear localStorage after successful migration
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      
      // Reload all watchlists
      await loadAll();
    } catch (err: any) {
      setError(err);
      console.error('Error migrating watchlists:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load watchlists when user changes
  useEffect(() => {
    loadAll();
  }, [user?.uid]);

  return (
    <WatchlistContext.Provider value={{
      watchlists,
      selectedWatchlist,
      loading,
      error,
      fetchWatchlists: loadAll,
      setSelectedWatchlist: select,
      create,
      updateItems,
      remove,
      addItem,
      removeItem,
      migrateFromLocalStorage
    }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextType => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within WatchlistProvider');
  return context;
};
