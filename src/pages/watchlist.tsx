// src/pages/Watchlist.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import { WatchlistItem, AssetType } from '@/types/watchlist';
import WatchlistWidget from '@/components/trading/WatchlistWidget';
import { useWatchlist } from '@/contexts/watchListContext'; // Corrected import path
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast'; // Assuming use-toast is the correct hook

const Watchlist: React.FC = () => {
  const { user } = useAuth();
  const {
    watchlists,
    loading,
    error,
    create,
    updateWatchlist, // e.g., updateWatchlist(id: string, data: Partial<WatchlistType>)
    remove,
    addItem, // Assuming this adds an item to a specific watchlist
    removeItem, // Assuming this removes an item from a specific watchlist
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
        .catch(migrationError => { // Renamed error to avoid conflict
          console.error("Migration failed:", migrationError);
          toast({
            title: "Migration Failed",
            description: "Failed to migrate your watchlists. Please try again.",
            variant: "destructive",
          });
        });
    }
  }, [user, hasMigrated, migrateFromLocalStorage]); // Added migrateFromLocalStorage to dependencies

  // Initialize selected watchlists or load from a preference if available
  useEffect(() => {
    if (!loading && watchlists.length > 0) {
      // Example: select all by default if no selection exists
      setSelectedIds(prev => prev.length === 0 ? watchlists.map(w => w.id) : prev);
    }
  }, [loading, watchlists]);

  const toggleBoard = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(selectedId => selectedId !== id) : [...prev, id]
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
      await create(newBoardTitle); // create hook likely takes the name
      setIsAddingBoard(false);
      setNewBoardTitle('');
      toast({
        title: "Watchlist Created",
        description: "Your new watchlist has been created.",
      });
    } catch (creationError) { // Renamed error
      console.error("Failed to create watchlist:", creationError);
      toast({
        title: "Creation Failed",
        description: "Failed to create watchlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleWidgetTitleChange = async (watchlistId: string, newName: string) => {
    const watchlist = watchlists.find(w => w.id === watchlistId);
    if (!watchlist) return;
    try {
      // Use a function designed to update watchlist metadata/name
      // This is an assumed function name, replace with your actual context function
      if (updateWatchlist) { // Check if the function exists
        await updateWatchlist(watchlistId, { name: newName });
        toast({
          title: "Watchlist Updated",
          description: `Watchlist name changed to "${newName}".`,
        });
      } else {
        console.error("updateWatchlist function is not available in the context.");
        toast({
          title: "Update Failed",
          description: "Watchlist update functionality is not configured.",
          variant: "destructive",
        });
      }
    } catch (updateError) { // Renamed error
      toast({
        title: "Update Failed",
        description: "Failed to update watchlist name.",
        variant: "destructive",
      });
    }
  };

  const handleAddItemToWidget = async (
    watchlistId: string,
    symbol: string,
    assetType: AssetType
  ) => {
    await addItem(watchlistId, {
      symbol,
      name: symbol,
      assetType,
      addedAt: new Date().toISOString(),
    });
  };

  const handleRemoveItemFromWidget = async (
    watchlistId: string,
    symbol: string,
    assetType: AssetType
  ) => {
    await removeItem(watchlistId, symbol);
  };


  const selectSymbol = (symbol: string) => {
    console.log('Selected from Watchlist Page:', symbol);
    // TODO: navigate to symbol detail page or open a modal
  };


  if (loading && !watchlists.length && !hasMigrated) { // Show loading only on initial load or migration
    return <Layout><div className="p-6 text-center">Loading your watchlists...</div></Layout>;
  }

  // This error display might need to be more nuanced if loading is true but there's an error
  if (error && !loading) { // Show error if not loading and error exists
    return <Layout><div className="p-6 text-center text-red-500">Error: {error.message || "Could not load watchlists."}</div></Layout>;
  }


  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6 space-y-6">
        {/* Create New Watchlist / Input Area */}
        <div className="bg-white p-4 rounded shadow">
          {isAddingBoard ? (
            <>
              <input
                type="text"
                value={newBoardTitle}
                onChange={(e) => setNewBoardTitle(e.target.value)}
                placeholder="Enter watchlist name"
                className="border p-2 rounded-md mr-2 w-full sm:w-auto"
                aria-label="New watchlist name"
              />
              <button
                onClick={saveNewBoard}
                className="px-4 py-2 bg-app-purple text-white rounded-md mr-2 mt-2 sm:mt-0"
                aria-label="Save new watchlist"
              >
                Save
              </button>
              <button
                onClick={cancelAddBoard}
                className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 mt-2 sm:mt-0"
                aria-label="Cancel new watchlist"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={beginAddBoard}
              className="px-4 py-2 border-dashed border rounded-md text-gray-500 hover:bg-gray-50 w-full"
              aria-label="Add watchlist"
            >
              + Create New Watchlist
            </button>
          )}
        </div>

        {/* Saved Watchlists Library / Selection Area */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">My Watchlists</h2>
          {loading && watchlists.length === 0 ? ( // More specific loading for this section
            <div className="flex justify-center p-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple"></div>
            </div>
          ) : error && watchlists.length === 0 ? ( // Error if no watchlists could be loaded
             <div className="text-red-500 p-4 text-center">
              {error.message || "An error occurred loading your watchlists"}
            </div>
          ) : watchlists.length === 0 ? (
            <p className="text-gray-500 text-center py-3">No watchlists created yet. Add one above!</p>
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
                      onClick={async () => { // Added async for remove
                        try {
                          await remove(watchlist.id);
                          toast({ title: "Watchlist Deleted", description: `"${watchlist.name}" has been deleted.` });
                          setSelectedIds(prev => prev.filter(id => id !== watchlist.id)); // Remove from selected if deleted
                        } catch (deleteError) {
                           toast({ title: "Delete Failed", description: "Could not delete watchlist.", variant: "destructive" });
                        }
                      }}
                      className="p-2 text-gray-500 hover:text-red-500 rounded-full"
                      aria-label={`Delete ${watchlist.name}`}
                      title="Delete watchlist"
                    >
                      × {/* Consider using a Trash icon here */}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Display Selected Widgets */}
        {selectedIds.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedIds
              .map(id => watchlists.find(w => w.id === id))
              .filter(watchlist => watchlist !== undefined) // Ensure watchlist is found
              .map(watchlist => (
                <WatchlistWidget
                  key={watchlist!.id}
                  title={watchlist!.name}
                  items={watchlist!.items || []} // Ensure items is an array
                  onTitleChange={(newName) => handleWidgetTitleChange(watchlist!.id, newName)}
                  onAdd={(symbol, assetType) => handleAddItemToWidget(watchlist!.id, symbol, assetType)}
                  onRemove={(symbol, assetType) => handleRemoveItemFromWidget(watchlist!.id, symbol, assetType)}
                  onSelectSymbol={selectSymbol}
                />
              ))}
          </div>
        )}
         {selectedIds.length === 0 && watchlists.length > 0 && !loading && (
          <div className="bg-white p-4 rounded shadow text-center text-gray-500">
            Select a watchlist from "My Watchlists" to view its details.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Watchlist; // Changed from WatchlistPage to Watchlist to match component name