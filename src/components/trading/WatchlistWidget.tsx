// src/components/trading/WatchlistWidget.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pencil, Check, X } from 'lucide-react';

export interface WatchlistItem {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface WatchlistWidgetProps {
  /** Header title */
  title?: string;
  /** Called when title is renamed */
  onTitleChange?: (newTitle: string) => void;
  /** List of watchlist items */
  items: WatchlistItem[];
  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string;
  /** Callback when removing a symbol */
  onRemove?: (symbol: string) => void;
  /** Callback when selecting a symbol */
  onSelectSymbol?: (symbol: string) => void;
}

const WatchlistWidget: React.FC<WatchlistWidgetProps> = ({
  title = 'Watchlist',
  onTitleChange,
  items,
  loading = false,
  error,
  onRemove,
  onSelectSymbol,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const handleSave = () => {
    setIsEditing(false);
    const trimmed = draftTitle.trim();
    if (onTitleChange && trimmed && trimmed !== title) {
      onTitleChange(trimmed);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      <CardHeader className="px-4 py-3 border-b flex items-center justify-between">
        {isEditing ? (
          <div className="flex items-center gap-2 w-full">
            <label htmlFor="watchlist-title-input" className="sr-only">
              Watchlist title
            </label>
            <input
              id="watchlist-title-input"
              className="border rounded px-2 py-1 text-lg font-bold flex-1"
              value={draftTitle}
              onChange={e => setDraftTitle(e.target.value)}
              placeholder="Enter title"
            />
            <button
              type="button"
              onClick={handleSave}
              aria-label="Save title"
              className="p-1 hover:bg-gray-100 rounded"
              title="Save title"
            >
              <Check size={16} />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              aria-label="Cancel title edit"
              className="p-1 hover:bg-gray-100 rounded"
              title="Cancel"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <CardTitle className="text-lg font-bold">{title}</CardTitle>
            {onTitleChange && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                aria-label="Edit title"
                className="p-1 hover:bg-gray-100 rounded"
                title="Edit title"
              >
                <Pencil size={16} />
              </button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="p-4 flex-1 overflow-auto">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <div
              className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple"
              role="status"
              aria-label="Loading"
            ></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center" role="alert">
            {error}
          </div>
        ) : items.length === 0 ? (
          <div className="text-gray-500 text-center">Your watchlist is empty.</div>
        ) : (
          <div className="space-y-2">
            {items.map(item => (
              <div
                key={item.symbol}
                className="flex items-center justify-between bg-white p-2 rounded shadow-sm hover:bg-gray-50"
              >
                <button
                  type="button"
                  onClick={() => onSelectSymbol?.(item.symbol)}
                  className="font-medium text-app-purple hover:underline"
                  aria-label={`View details for ${item.symbol}`}
                >
                  {item.symbol}
                </button>
                <div className="flex items-center gap-4">
                  <span>${item.price.toFixed(2)}</span>
                  <span className={item.change >= 0 ? 'text-green-500' : 'text-red-500'}>
                    {item.change >= 0 ? '+' : ''}
                    {item.changePercent.toFixed(2)}%
                  </span>
                  {onRemove && (
                    <button
                      type="button"
                      onClick={() => onRemove(item.symbol)}
                      className="text-sm text-gray-500 hover:text-red-600"
                      aria-label={`Remove ${item.symbol}`}
                      title="Remove"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WatchlistWidget;
