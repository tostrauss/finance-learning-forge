// src/pages/Watchlist.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WatchlistWidget, { WatchlistItem, AssetType } from '@/components/trading/WatchlistWidget';
import { useWatchlistManager } from '@/hooks/useWatchlistManager'; // IMPORT THE HOOK

interface WatchlistBoard {
  id: string;
  title: string;
  items: WatchlistItem[];
}

const Watchlist: React.FC = () => {
  const {
    boards,
    addBoard: addBoardLogic, // Use the hook's addBoard
    updateBoardTitle,
    addItemToBoard,
    removeItemFromBoard,
    // removeBoard, // if you add UI to delete boards directly on this page
  } = useWatchlistManager();

  const [selectedIds, setSelectedIds] = useState<string[]>([]); // Keep this for UI display logic
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');

  // Initialize selectedIds, e.g., select all or first, or load from localStorage if you persist this UI state
   useEffect(() => {
    if (boards.length > 0 && selectedIds.length === 0) {
      // setSelectedIds(boards.map(b => b.id)); // Optionally select all by default
    }
  }, [boards, selectedIds.length]);


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

  const saveNewBoard = () => { // This function now uses the hook's logic
    const newBoardId = addBoardLogic(newBoardTitle);
    if (newBoardId) { // Check if board was actually added (title wasn't empty)
      setSelectedIds(prev => [...prev, newBoardId]); // Optionally auto-select new board
      setIsAddingBoard(false);
      setNewBoardTitle('');
    } else {
      // Handle case where title was empty, e.g., show an error
      console.warn("New board title was empty.");
    }
  };

  // updateBoardTitle, addItemToBoard, removeItemFromBoard are directly from the hook

  const selectSymbol = (symbol: string) => {
    console.log('Selected from Watchlist Page:', symbol);
    // TODO: navigate to symbol detail
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6 space-y-6">
        {/* Create New Watchlist UI (uses saveNewBoard which calls hook's addBoardLogic) */}
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
                onClick={saveNewBoard} // This now calls the local saveNewBoard which uses the hook
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

        {/* Saved Watchlists Library (uses boards from hook) */}
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

        {/* Display Selected Widgets (uses boards from hook and handlers from hook) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedIds
            .map(id => boards.find(b => b.id === id))
            .filter(board => board !== undefined)
            .map(board => (
              <WatchlistWidget
                key={board!.id}
                title={board!.title}
                onTitleChange={t => updateBoardTitle(board!.id, t)}
                items={board!.items}
                onAdd={(symbol, assetType) => addItemToBoard(board!.id, symbol, assetType)}
                onRemove={symbol => removeItemFromBoard(board!.id, symbol)}
                onSelectSymbol={selectSymbol}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Watchlist;
