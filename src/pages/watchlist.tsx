// src/pages/Watchlist.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WatchlistWidget, { WatchlistItem } from '@/components/trading/WatchlistWidget';

const Watchlist: React.FC = () => {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [widgetTitle, setWidgetTitle] = useState<string>('Your Watchlist');

  useEffect(() => {
    // Replace with real data fetch
    const sampleData: WatchlistItem[] = [
      { symbol: 'AAPL', price: 200.14, change: 1.23, changePercent: 0.62 },
      { symbol: 'MSFT', price: 305.22, change: -0.45, changePercent: -0.15 },
      { symbol: 'GOOGL', price: 125.50, change: 2.10, changePercent: 1.70 },
    ];
    setTimeout(() => {
      setItems(sampleData);
      setLoading(false);
    }, 500);
  }, []);

  const handleRemove = (symbol: string) => {
    setItems(prev => prev.filter(item => item.symbol !== symbol));
  };

  const handleSelect = (symbol: string) => {
    console.log('Selected symbol:', symbol);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <WatchlistWidget
          title={widgetTitle}
          onTitleChange={setWidgetTitle}
          items={items}
          loading={loading}
          error={error}
          onRemove={handleRemove}
          onSelectSymbol={handleSelect}
        />
      </div>
    </Layout>
  );
};

export default Watchlist;
