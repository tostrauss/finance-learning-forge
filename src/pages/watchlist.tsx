// src/pages/Watchlist.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WatchlistWidget, { WatchlistItem, AssetType } from '@/components/trading/WatchlistWidget';

interface WatchlistBoard {
  id: string;
  title: string;
  items: WatchlistItem[];
}

const Watchlist: React.FC = () => {
  // load from localStorage or start empty
  const [boards, setBoards] = useState<WatchlistBoard[]>(() => {
    try {
      const stored = localStorage.getItem('watchlistBoards');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // persist boards
  useEffect(() => {
    localStorage.setItem('watchlistBoards', JSON.stringify(boards));
  }, [boards]);

  const toggleBoard = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const beginAddBoard = () => {
    setNewBoardTitle('');
    setIsAddingBoard(true);
  };
  const cancelAddBoard = () => {
    setNewBoardTitle('');
    setIsAddingBoard(false);
  };
  const saveNewBoard = () => {
    const title = newBoardTitle.trim();
    if (!title) return;
    const id = crypto.randomUUID();
    const newBoard: WatchlistBoard = { id, title, items: [] };
    setBoards(prev => [...prev, newBoard]);
    setSelectedIds(prev => [...prev, id]);
    setIsAddingBoard(false);
  };

  const updateBoardTitle = (boardId: string, title: string) => {
    setBoards(prev =>
      prev.map(b => (b.id === boardId ? { ...b, title } : b))
    );
  };

  const addItemToBoard = (boardId: string) => (
    symbol: string,
    assetType: AssetType
  ) => {
    const newItem: WatchlistItem = {
      symbol,
      assetType,
      price: 0,
      change: 0,
      changePercent: 0,
    };
    setBoards(prev =>
      prev.map(b =>
        b.id === boardId ? { ...b, items: [...b.items, newItem] } : b
      )
    );
  };

  const removeItemFromBoard = (boardId: string) => (symbol: string) => {
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
    // TODO: navigate to symbol detail
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 space-y-6">
        {/* Create New Watchlist */}
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          {isAddingBoard ? (
            <>
              <input
                type="text"
                value={newBoardTitle}
                onChange={e => setNewBoardTitle(e.target.value)}
                placeholder="New watchlist name"
                className="border rounded-md px-3 py-2 flex-1 focus:ring-2 focus:ring-app-purple"
                aria-label="New watchlist name"
              />
              <button
                onClick={saveNewBoard}
                className="px-4 py-2 bg-app-purple text-white rounded-md"
                aria-label="Save new watchlist"
              >
                Save
              </button>
              <button
                onClick={cancelAddBoard}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
                aria-label="Cancel new watchlist"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={beginAddBoard}
              className="px-4 py-2 border-dashed border rounded-md text-gray-500 hover:bg-gray-50"
              aria-label="Add watchlist"
            >
              + Create New Watchlist
            </button>
          )}
        </div>

        {/* Saved Watchlists Library */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Saved Watchlists</h2>
          <div className="flex flex-wrap gap-2">
            {boards.map(board => {
              const isSelected = selectedIds.includes(board.id);
              return isSelected ? (
                <button
                  key={board.id}
                  onClick={() => toggleBoard(board.id)}
                  className="px-4 py-2 rounded-md bg-app-purple text-white"
                  aria-pressed="true"
                  title="Hide watchlist"
                >
                  {board.title}
                </button>
              ) : (
                <button
                  key={board.id}
                  onClick={() => toggleBoard(board.id)}
                  className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                  aria-pressed="false"
                  title="Show watchlist"
                >
                  {board.title}
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Selected Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedIds.map(id => {
            const board = boards.find(b => b.id === id)!;
            return (
              <WatchlistWidget
                key={board.id}
                title={board.title}
                onTitleChange={t => updateBoardTitle(board.id, t)}
                items={board.items}
                onAdd={addItemToBoard(board.id)}
                onRemove={removeItemFromBoard(board.id)}
                onSelectSymbol={selectSymbol}
              />
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Watchlist;
