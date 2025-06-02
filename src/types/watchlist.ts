/// src/types/watchlist.ts
export interface WatchlistItem {
  symbol: string;
  name: string;
  addedAt?: string;
  assetType?: 'security' | 'crypto' | 'bond' | 'commodity';
}

export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  items: WatchlistItem[];
  createdAt: string;
  updatedAt?: string;
}

