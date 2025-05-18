import axios from 'axios';
import { Watchlist, WatchlistItem } from '@/types/watchlist';

// Fetch all watchlists
export async function fetchWatchlists(): Promise<Watchlist[]> {
  const response = await axios.get<Watchlist[]>('/api/watchlists');
  return response.data;
}

// Fetch a single watchlist by ID
export async function fetchWatchlist(id: string): Promise<Watchlist> {
  const response = await axios.get<Watchlist>(`/api/watchlists/${id}`);
  return response.data;
}

// Create a new watchlist
export async function createWatchlist(name: string): Promise<Watchlist> {
  const response = await axios.post<Watchlist>('/api/watchlists', { name });
  return response.data;
}

// Update an existing watchlist's items
export async function updateWatchlist(id: string, items: WatchlistItem[]): Promise<Watchlist> {
  const response = await axios.put<Watchlist>(`/api/watchlists/${id}`, { items });
  return response.data;
}

// Delete a watchlist
export async function deleteWatchlist(id: string): Promise<void> {
  await axios.delete(`/api/watchlists/${id}`);
}

// Add an item to a watchlist
export async function addItemToWatchlist(id: string, item: WatchlistItem): Promise<Watchlist> {
  const response = await axios.post<Watchlist>(`/api/watchlists/${id}/items`, item);
  return response.data;
}

// Remove an item from a watchlist by symbol
export async function removeItemFromWatchlist(id: string, symbol: string): Promise<Watchlist> {
  const response = await axios.delete<Watchlist>(`/api/watchlists/${id}/items/${symbol}`);
  return response.data;
}