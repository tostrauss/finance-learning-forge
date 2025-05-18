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
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchlists, setWatchlists] = useState<Watchlist[]>([]);
  const [selectedWatchlist, setSelectedWatchlistState] = useState<Watchlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadAll = async () => {
    setLoading(true);
    try {
      const data = await fetchWatchlists();
      setWatchlists(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const select = async (id: string) => {
    setLoading(true);
    try {
      const data = await fetchWatchlist(id);
      setSelectedWatchlistState(data);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (name: string) => {
    setLoading(true);
    try {
      const newWL = await createWatchlist(name);
      setWatchlists(prev => [...prev, newWL]);
      setSelectedWatchlistState(newWL);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const updateItems = async (items: WatchlistItem[]) => {
    if (!selectedWatchlist) return;
    setLoading(true);
    try {
      const updated = await updateWatchlist(selectedWatchlist.id, items);
      setSelectedWatchlistState(updated);
      setWatchlists(prev => prev.map(w => w.id === updated.id ? updated : w));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    try {
      await deleteWatchlist(id);
      setWatchlists(prev => prev.filter(w => w.id !== id));
      if (selectedWatchlist?.id === id) setSelectedWatchlistState(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: WatchlistItem) => {
    if (!selectedWatchlist) return;
    setLoading(true);
    try {
      const updated = await addItemToWatchlist(selectedWatchlist.id, item);
      setSelectedWatchlistState(updated);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (symbol: string) => {
    if (!selectedWatchlist) return;
    setLoading(true);
    try {
      const updated = await removeItemFromWatchlist(selectedWatchlist.id, symbol);
      setSelectedWatchlistState(updated);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

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
      removeItem
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
