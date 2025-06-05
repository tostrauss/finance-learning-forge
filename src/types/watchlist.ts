import { FieldValue, Timestamp } from 'firebase/firestore';

export type AssetType = 'security' | 'crypto' | 'bond' | 'commodity';

export interface WatchlistItem {
  symbol:    string;
  name:      string;
  assetType: AssetType;
  // allow a Firestore timestamp or serverTimestamp() FieldValue
  addedAt:   string | Date | Timestamp | FieldValue;
}

export interface WatchlistWidgetProps {
   title: string;
   items: WatchlistItem[];
   onTitleChange?: (newTitle: string) => void;
   onAdd?:    (symbol: string, assetType: AssetType) => void;
   onRemove?: (symbol: string, assetType: AssetType) => void;
   onSelectSymbol?: (symbol: string) => void;
 }

export interface WatchlistType {
  id:        string;
  name:      string;
  userId:    string;
  items:     WatchlistItem[];
  createdAt: string;
  updatedAt?: string;
}