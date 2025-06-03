// src/components/trading/WatchlistWidget.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Pencil, Check, X, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import StockSearch from '@/components/StockSearch';
import { useStockSearch } from '@/hooks/useStockSearch';
import { useStockTimeSeries } from '@/hooks/useStockTimeSeries';

export type AssetType = 'security' | 'crypto' | 'bond' | 'commodity';

export interface WatchlistItem {
  symbol: string;
  name: string;
  assetType?: AssetType;
  addedAt?: string;
  price?: number;
  change?: number;
  changePercent?: number;
}

export interface WatchlistWidgetProps {
  title?: string;
  onTitleChange?: (newTitle: string) => void;
  items: WatchlistItem[];
  loading?: boolean;
  error?: string;
  onRemove?: (symbol: string) => void;
  onSelectSymbol?: (symbol: string) => void;
  onAdd?: (symbol: string, assetType: AssetType) => void;
}

const WatchlistWidget: React.FC<WatchlistWidgetProps> = ({
  title = 'Watchlist',
  onTitleChange,
  items,
  loading = false,
  error,
  onRemove,
  onSelectSymbol,
  onAdd,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);
  const [isAdding, setIsAdding] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { query, setQuery, results, loading: searchLoading } = useStockSearch();

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  const saveTitle = () => {
    setIsEditing(false);
    const trimmed = draftTitle.trim();
    if (onTitleChange && trimmed && trimmed !== title) onTitleChange(trimmed);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setDraftTitle(title);
  };
  const [addingSymbol, setAddingSymbol] = useState<string | null>(null);
  
  const handleAdd = async (symbol: string) => {
    if (!onAdd) return;
    
    setAddingSymbol(symbol);
    try {
      await onAdd(symbol, 'security');
      setIsAdding(false);
      setQuery(''); // Clear search when successful
    } catch (error) {
      // Error handling is done in parent component via toast
    } finally {
      setAddingSymbol(null);
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(prev => !prev);
  };

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="px-4 py-3 border-b flex items-center justify-between cursor-pointer" onClick={toggleCollapse}>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <input
                className="border rounded px-2 py-1 text-lg font-bold"
                value={draftTitle}
                onChange={e => setDraftTitle(e.target.value)}
                onClick={e => e.stopPropagation()}
                placeholder="Title"
                aria-label="Edit watchlist title"
              />
              <button onClick={saveTitle} className="p-1 hover:bg-gray-100 rounded" aria-label="Save title">
                <Check size={16} />
              </button>
              <button onClick={cancelEdit} className="p-1 hover:bg-gray-100 rounded" aria-label="Cancel title edit">
                <X size={16} />
              </button>
            </>
          ) : (
            <>
              <CardTitle className="text-lg font-bold">{title}</CardTitle>
              {onTitleChange && (
                <button
                  onClick={e => { e.stopPropagation(); setIsEditing(true); }}
                  className="p-1 hover:bg-gray-100 rounded"
                  aria-label="Edit title"
                >
                  <Pencil size={16} />
                </button>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          {onAdd && (
            <button
              onClick={e => { e.stopPropagation(); setIsAdding(prev => !prev); }}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Add item"
              title="Add item"
            >
              <Plus size={16} />
            </button>
          )}
          {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </CardHeader>

      {!isCollapsed && (
        <>
          {isAdding && onAdd && (
            <div className="p-4 border-b">
              <StockSearch
                query={query}
                setQuery={setQuery}
                results={results}
                loading={searchLoading}
                onSelect={symbol => handleAdd(symbol)}
              />
            </div>
          )}

          <CardContent className="p-4 flex-1 overflow-auto">
            {loading ? (
              <div className="h-full flex items-center justify-center">
                <div role="status" aria-label="Loading" className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple" />
              </div>
            ) : error ? (
              <div role="alert" className="text-red-500 text-center">{error}</div>
            ) : items.length === 0 ? (
              <div className="text-gray-500 text-center">Your watchlist is empty.</div>
            ) : (
              <div className="space-y-2">
                {items.map(item => (
                  <ItemRow
                    key={item.symbol}
                    item={item}
                    onSelect={onSelectSymbol}
                    onRemove={onRemove}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

const ItemRow: React.FC<{
  item: WatchlistItem;
  onSelect?: (symbol: string) => void;
  onRemove?: (symbol: string) => void;
}> = ({ item, onSelect, onRemove }) => {
  const { series } = useStockTimeSeries(item.symbol);
  const last = series[series.length - 1] ?? { open: 0, close: 0 };
  const price = last.close ?? 0;
  const change = price - (last.open ?? price);
  const changePercent = last.open ? (change / last.open!) * 100 : 0;

  return (
    <div className="flex items-center justify-between bg-white p-2 rounded shadow-sm hover:bg-gray-50">
      <button onClick={() => onSelect?.(item.symbol)} className="font-medium text-app-purple hover:underline" aria-label={`View ${item.symbol}`}>
        {item.symbol}
      </button>
      <div className="flex items-center gap-4">
        <span>${price.toFixed(2)}</span>
        <span className={change >= 0 ? 'text-green-500' : 'text-red-500'}>
          {change >= 0 ? '+' : ''}{changePercent.toFixed(2)}%
        </span>
        <span className="italic text-sm lowercase">{item.assetType}</span>
        {onRemove && (
          <button onClick={() => onRemove(item.symbol)} className="text-sm text-gray-500 hover:text-red-600" aria-label={`Remove ${item.symbol}`}>
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default WatchlistWidget;