// src/context/watchlistContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchWatchlists,
  createWatchlist,
  updateWatchlist as updateWatchlistService,
  deleteWatchlist,
  addItemToWatchlist,
  removeItemFromWatchlist
} from '@/services/watchlistService';
import { WatchlistItem, WatchlistType } from '@/types/watchlist';
import { useAuth } from '@/contexts/AuthContext';

export interface WatchlistContextType {
  watchlists: WatchlistType[];
  loading: boolean;
  error: Error | null;
  create: (name: string) => Promise<void>;
  updateWatchlist: (id: string, data: Partial<WatchlistType>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  addItem: (watchlistId: string, item: WatchlistItem) => Promise<void>;
  removeItem: (watchlistId: string, symbol: string) => Promise<void>;
  migrateFromLocalStorage: () => Promise<void>;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = 'watchlistBoards';

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState<WatchlistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // load all
  const loadAll = async () => {
    if (!user) { setWatchlists([]); return; }
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

  // create
  const create = async (name: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const newWL = await createWatchlist(name, user);
      setWatchlists(prev => [...prev, newWL]);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // update metadata
  const updateWatchlist = async (id: string, data: Partial<WatchlistType>) => {
    if (!user) return;
    setLoading(true);
    try {
      // if the caller passed new items, persist them via the service
      if (data.items) {
        const updated = await updateWatchlistService(id, data.items, user);
        setWatchlists(prev =>
          prev.map(w => (w.id === id ? updated : w))
        );
      }
      // if only metadata (e.g. name) changed, update local state
      else if (data.name) {
        setWatchlists(prev =>
          prev.map(w => (w.id === id ? { ...w, name: data.name! } : w))
        );
        // TODO: call a metadata‐only service if you have one
      }
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // remove whole list
  const remove = async (id: string) => {
    if (!user) return;
    setLoading(true);
    try {
      await deleteWatchlist(id, user);
      setWatchlists(prev => prev.filter(w => w.id !== id));
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // add single item
  const addItem = async (watchlistId: string, item: WatchlistItem) => {
    if (!user) return;
    setLoading(true);
    try {
      const updated = await addItemToWatchlist(watchlistId, item, user);
      setWatchlists(prev =>
        prev.map(w => (w.id === updated.id ? updated : w))
      );
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // remove single item
  const removeItem = async (watchlistId: string, symbol: string) => {
    if (!user) return;
    setLoading(true);
    try {
      const updated = await removeItemFromWatchlist(watchlistId, symbol, user);
      setWatchlists(prev =>
        prev.map(w => (w.id === updated.id ? updated : w))
      );
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // migrate localStorage boards
  const migrateFromLocalStorage = async () => {
    if (!user) return;
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!stored) return;
    setLoading(true);
    try {
      const localBoards = JSON.parse(stored) as Array<{ title: string; items: WatchlistItem[] }>;
      for (const board of localBoards) {
        const newWL = await createWatchlist(board.title, user);
        for (const item of board.items) {
          await addItemToWatchlist(newWL.id, item, user);
        }
      }
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      await loadAll();
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [user?.uid]);

  return (
    <WatchlistContext.Provider
      value={{ watchlists, loading, error, create, updateWatchlist, remove, addItem, removeItem, migrateFromLocalStorage }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = (): WatchlistContextType => {
  const ctx = useContext(WatchlistContext);
  if (!ctx) throw new Error('useWatchlist must be inside WatchlistProvider');
  return ctx;
};
