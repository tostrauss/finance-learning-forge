// src/pages/Watchlist.tsx
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import WatchlistWidget, { WatchlistItem } from '@/components/trading/WatchlistWidget';

interface WatchlistBoard {
  id: string;
  title: string;
  items: WatchlistItem[];
}

// Sample initial boards—replace with real data fetch
const initialBoards: WatchlistBoard[] = [
  {
    id: 'board-1',
    title: 'Tech Stocks',
    items: [
      { symbol: 'AAPL', price: 200.14, change: 1.23, changePercent: 0.62 },
      { symbol: 'MSFT', price: 305.22, change: -0.45, changePercent: -0.15 },
    ],
  },
  {
    id: 'board-2',
    title: 'Crypto',
    items: [
      { symbol: 'BTC', price: 58000, change: 300, changePercent: 0.52 },
      { symbol: 'ETH', price: 3500, change: -20, changePercent: -0.57 },
    ],
  },
];

const Watchlist: React.FC = () => {
  const [boards, setBoards] = useState<WatchlistBoard[]>(initialBoards);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleBoard = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const addBoard = () => {
    const title = prompt('Enter new watchlist name');
    if (title) {
      const newBoard: WatchlistBoard = {
        id: crypto.randomUUID(),
        title: title.trim(),
        items: [],
      };
      setBoards(prev => [...prev, newBoard]);
    }
  };

  const updateBoardTitle = (id: string, newTitle: string) => {
    setBoards(prev =>
      prev.map(b => (b.id === id ? { ...b, title: newTitle } : b))
    );
  };

  const removeItem = (boardId: string, symbol: string) => {
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId
          ? { ...b, items: b.items.filter(i => i.symbol !== symbol) }
          : b
      )
    );
  };

  const selectSymbol = (symbol: string) => {
    console.log('Selected:', symbol);
    // TODO: navigate to detail page
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Saved Watchlists</h2>
          <div className="flex flex-wrap gap-2">
            {boards.map(board => {
              const isSelected = selectedIds.includes(board.id);
              return isSelected ? (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => toggleBoard(board.id)}
                  className="px-3 py-1 rounded bg-app-purple text-white"
                  aria-pressed="true"
                  title="Hide watchlist"
                >
                  {board.title}
                </button>
              ) : (
                <button
                  key={board.id}
                  type="button"
                  onClick={() => toggleBoard(board.id)}
                  className="px-3 py-1 rounded bg-gray-100 text-gray-700"
                  aria-pressed="false"
                  title="Show watchlist"
                >
                  {board.title}
                </button>
              );
            })}
            <button
              type="button"
              onClick={addBoard}
              className="px-3 py-1 rounded border border-dashed text-gray-500 hover:bg-gray-100"
              title="Add Watchlist"
            >
              + Add Watchlist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedIds.map(id => {
            const board = boards.find(b => b.id === id);
            return (
              board && (
                <WatchlistWidget
                  key={board.id}
                  title={board.title}
                  onTitleChange={newTitle => updateBoardTitle(board.id, newTitle)}
                  items={board.items}
                  loading={false}
                  error={undefined}
                  onRemove={symbol => removeItem(board.id, symbol)}
                  onSelectSymbol={selectSymbol}
                />
              )
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Watchlist;
