// src/pages/Watchlist.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WatchlistWidget, { WatchlistItem, AssetType } from '@/components/trading/WatchlistWidget';
import { useWatchlist } from '@/contexts/watchListContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const Watchlist: React.FC = () => {
  const { user } = useAuth();
  const {
    watchlists,
    loading,
    error,
    create,
    updateItems,
    remove,
    addItem,
    removeItem,
    migrateFromLocalStorage
  } = useWatchlist();
  const [selectedIds, setSelectedIds] = useState<string[]>([]); 
  const [isAddingBoard, setIsAddingBoard] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [hasMigrated, setHasMigrated] = useState(false);

  // Attempt to migrate localStorage data when user first logs in
  useEffect(() => {
    if (user && !hasMigrated) {
      migrateFromLocalStorage()
        .then(() => {
          setHasMigrated(true);
          toast({
            title: "Watchlists Migrated",
            description: "Your watchlists have been migrated to your account.",
          });
        })
        .catch(error => {
          console.error("Migration failed:", error);
          toast({
            title: "Migration Failed",
            description: "Failed to migrate your watchlists. Please try again.",
            variant: "destructive",
          });
        });
    }
  }, [user, hasMigrated]);
  // Initialize selected watchlists
  useEffect(() => {
    if (!loading && watchlists.length > 0) {
      // Only set selected IDs if there are no existing selections
      setSelectedIds(prev => prev.length === 0 ? watchlists.map(w => w.id) : prev);
    }
  }, [loading, watchlists]);

  const toggleBoard = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const beginAddBoard = () => {
    if (!user) {
      toast({
        title: "Sign In Required",
        description: "Please sign in to create watchlists.",
        variant: "destructive",
      });
      return;
    }
    setNewBoardTitle('');
    setIsAddingBoard(true);
  };

  const cancelAddBoard = () => {
    setNewBoardTitle('');
    setIsAddingBoard(false);
  };

  const saveNewBoard = async () => {
    if (!newBoardTitle.trim()) {
      toast({
        title: "Invalid Name",
        description: "Please enter a name for your watchlist.",
        variant: "destructive",
      });
      return;
    }

    try {
      await create(newBoardTitle);
      setIsAddingBoard(false);
      setNewBoardTitle('');
      toast({
        title: "Watchlist Created",
        description: "Your new watchlist has been created.",
      });
    } catch (error) {
      console.error("Failed to create watchlist:", error);
      toast({
        title: "Creation Failed",
        description: "Failed to create watchlist. Please try again.",
        variant: "destructive",
      });
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
        </div>        {/* Saved Watchlists Library */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Saved Watchlists</h2>
          {loading ? (
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 p-4 text-center">
              {error.message || "An error occurred loading your watchlists"}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {watchlists.map(watchlist => {
                const isSelected = selectedIds.includes(watchlist.id);
                return (
                  <div key={watchlist.id} className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBoard(watchlist.id)}
                      className={`px-4 py-2 rounded-md ${
                        isSelected 
                          ? 'bg-app-purple text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      aria-pressed={isSelected}
                      title={isSelected ? "Hide watchlist" : "Show watchlist"}
                    >
                      {watchlist.name}
                    </button>
                    <button
                      onClick={() => remove(watchlist.id)}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-full"
                      aria-label={`Delete ${watchlist.name}`}
                      title="Delete watchlist"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Display Selected Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedIds
            .map(id => watchlists.find(w => w.id === id))
            .filter(watchlist => watchlist !== undefined)
            .map(watchlist => (
              <WatchlistWidget
                key={watchlist!.id}
                title={watchlist!.name}
                onTitleChange={async (newName) => {
                  try {
                    await updateItems(watchlist!.items);
                    toast({
                      title: "Watchlist Updated",
                      description: "Watchlist name has been updated.",
                    });
                  } catch (error) {
                    toast({
                      title: "Update Failed",
                      description: "Failed to update watchlist name.",
                      variant: "destructive",
                    });
                  }
                }}
                items={watchlist!.items}
                onAdd={async (symbol, assetType) => {
                  try {
                    await addItem({
                      symbol,
                      name: symbol,
                      assetType,
                      addedAt: new Date().toISOString()
                    });
                  } catch (error) {
                    toast({
                      title: "Add Failed",
                      description: "Failed to add item to watchlist.",
                      variant: "destructive",
                    });
                  }
                }}
                onRemove={async (symbol) => {
                  try {
                    await removeItem(symbol);
                  } catch (error) {
                    toast({
                      title: "Remove Failed",
                      description: "Failed to remove item from watchlist.",
                      variant: "destructive",
                    });
                  }
                }}
                onSelectSymbol={selectSymbol}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Watchlist;
