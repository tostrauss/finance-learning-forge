<<<<<<< HEAD
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchlistManager, WatchlistBoard } from '@/hooks/useWatchlistManager';
// MODIFIED: WatchlistWidget import might no longer be needed here if all its display logic is moved.
// If WatchlistWidget is used for other things or you want to keep its internal logic,
// you might adjust this differently. For now, we'll bypass it for item display.
// import WatchlistWidget, { WatchlistItem, AssetType } from '@/components/trading/WatchlistWidget';
import { AssetType, WatchlistItem } from '@/components/trading/WatchlistWidget'; // Assuming AssetType and WatchlistItem are exported here or from types file

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Edit3, Trash2, Save } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";


const WatchlistPage: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const {
    boards,
    isLoading: watchlistsLoading,
    isInitialized: watchlistsInitialized,
    error: watchlistError,
    addBoard,
    removeBoard,
    updateBoardTitle,
    addItemToBoard,
    removeItemFromBoard,
  } = useWatchlistManager();

  const [newBoardName, setNewBoardName] = useState('');
  const [editingBoard, setEditingBoard] = useState<{ id: string; title: string } | null>(null);
  const [addingItem, setAddingItem] = useState<{ boardId: string; symbol: string; assetType: AssetType } | null>(null);

  const canModify = user && !authLoading && watchlistsInitialized && !watchlistsLoading;

  const handleAddBoard = async () => {
    if (!newBoardName.trim() || !canModify) return;
    await addBoard(newBoardName.trim());
    setNewBoardName('');
  };
=======
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
>>>>>>> origin

  const handleStartEditTitle = (board: WatchlistBoard) => {
    if (!canModify) return;
    setEditingBoard({ id: board.id, title: board.title });
  };

  const handleSaveTitle = async () => {
    if (!editingBoard || !editingBoard.title.trim() || !canModify) return;
    await updateBoardTitle(editingBoard.id, editingBoard.title.trim());
    setEditingBoard(null);
  };

  const handleAddItem = async (boardId: string) => {
    if (!addingItem || addingItem.boardId !== boardId || !addingItem.symbol.trim() || !canModify) return;
    await addItemToBoard(boardId, addingItem.symbol.trim().toUpperCase(), addingItem.assetType);
    setAddingItem(null); // Reset form
  };

  // MODIFIED: Corrected loading condition
  if (authLoading || (user && watchlistsLoading)) {
    return <Layout><div className="p-6 text-center">Loading your watchlists...</div></Layout>;
  }

  if (!user && !authLoading) {
    return (
      <Layout>
        <div className="p-6 text-center">
          <p>Please log in to view and manage your watchlists.</p>
          {/* Optionally, add a login button here */}
        </div>
      </Layout>
    );
  }

<<<<<<< HEAD
  if (watchlistError) {
    return <Layout><div className="p-6 text-center text-red-500">Error loading watchlists: {watchlistError.message}</div></Layout>;
  }
=======
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
>>>>>>> origin

  return (
    <Layout>
      <div className="container mx-auto p-4 md:p-6">
        <Card className="mb-6 bg-white shadow-lg">
          <CardHeader>
            <CardTitle>Create New Watchlist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="text"
                placeholder="New watchlist name"
                value={newBoardName}
                onChange={(e) => setNewBoardName(e.target.value)}
                className="flex-grow"
                disabled={!canModify}
              />
<<<<<<< HEAD
              <Button onClick={handleAddBoard} disabled={!canModify || !newBoardName.trim()} className="bg-app-blue hover:bg-app-blue-dark">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Watchlist
              </Button>
            </div>
          </CardContent>
        </Card>

        {boards.length === 0 && watchlistsInitialized && !watchlistsLoading && (
          <p className="text-center text-gray-500">You don't have any watchlists yet. Create one above!</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boards.map((board) => (
            <Card key={board.id} className="bg-white shadow-lg flex flex-col">
              <CardHeader className="flex flex-row justify-between items-start">
                {editingBoard && editingBoard.id === board.id ? (
                  <div className="flex-grow flex items-center gap-2">
                    <Input
                      type="text"
                      value={editingBoard.title}
                      onChange={(e) => setEditingBoard({ ...editingBoard, title: e.target.value })}
                      autoFocus
                      className="flex-grow"
                      disabled={!canModify}
                    />
                    <Button onClick={handleSaveTitle} size="icon" variant="ghost" disabled={!canModify || !editingBoard.title.trim()} title="Save title">
                      <Save className="h-5 w-5 text-green-600" />
                    </Button>
                    <Button onClick={() => setEditingBoard(null)} size="icon" variant="ghost" title="Cancel edit">
                      <Trash2 className="h-5 w-5 text-gray-500" /> {/* Using Trash2 as a generic cancel/close icon */}
                    </Button>
                  </div>
                ) : (
                  <CardTitle className="flex-grow cursor-pointer hover:text-app-blue" onClick={() => handleStartEditTitle(board)}>
                    {board.title}
                  </CardTitle>
                )}
                <div className="flex items-center">
                  {!editingBoard || editingBoard.id !== board.id ? (
                    <Button onClick={() => handleStartEditTitle(board)} size="icon" variant="ghost" disabled={!canModify} title="Edit title">
                      <Edit3 className="h-5 w-5" />
                    </Button>
                  ) : null}
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" disabled={!canModify} title="Delete watchlist">
                        <Trash2 className="h-5 w-5 text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                          This action will permanently delete the watchlist "{board.title}". This cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                          variant="destructive"
                          onClick={async () => {
                            if (canModify) await removeBoard(board.id);
                          }}
                        >
                          Delete Watchlist
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="flex-grow pt-2"> {/* Added pt-2 for a little space */}
                {/* MODIFIED: Display items directly here */}
                {board.items && board.items.length > 0 ? (
                  <ul className="space-y-1 text-sm">
                    {board.items.map((item) => (
                      <li
                        key={`${item.symbol}-${item.assetType}`}
                        className="flex justify-between items-center p-1.5 hover:bg-gray-50 rounded"
                      >
                        <div>
                          <span className="font-semibold">{item.symbol}</span>
                          <span className="text-xs text-gray-500 ml-1">({item.assetType})</span>
                          {/* You can add more item details here if available, e.g., price, change */}
                          {item.price != null && ( /* MODIFIED: Check for null as well */
                            <span className={`ml-2 ${ (item.change || 0) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                               ${item.price.toFixed(2)}
                            </span>
                          )}
                          {item.changePercent != null && ( /* MODIFIED: Check for null as well */
                             <span className={`ml-1 text-xs ${ (item.changePercent || 0) < 0 ? 'text-red-500' : 'text-green-500'}`}>
                               ({item.changePercent.toFixed(2)}%)
                             </span>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            if (canModify) removeItemFromBoard(board.id, item.symbol, item.assetType);
                          }}
                          disabled={!canModify}
                          className="text-red-500 hover:text-red-700 px-1"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-400 italic py-2">No items in this watchlist yet.</p>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full space-y-2">
                  <p className="text-sm font-medium">Add New Item</p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      type="text"
                      placeholder="Symbol (e.g., AAPL)"
                      value={addingItem?.boardId === board.id ? addingItem.symbol : ''}
                      onChange={(e) => setAddingItem({ boardId: board.id, symbol: e.target.value, assetType: addingItem?.assetType || AssetType.EQUITY })}
                      className="flex-grow"
                      disabled={!canModify}
                    />
                    <Select
                      value={addingItem?.boardId === board.id ? addingItem.assetType : AssetType.EQUITY}
                      onValueChange={(value) => setAddingItem({ boardId: board.id, symbol: addingItem?.symbol || '', assetType: value as AssetType })}
                      disabled={!canModify}
                    >
                      <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Asset Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={AssetType.EQUITY}>Equity</SelectItem>
                        <SelectItem value={AssetType.CRYPTO}>Crypto</SelectItem>
                        <SelectItem value={AssetType.FOREX}>Forex</SelectItem>
                        <SelectItem value={AssetType.COMMODITY}>Commodity</SelectItem> {/* Error Here */}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => handleAddItem(board.id)} disabled={!canModify || !addingItem || addingItem.boardId !== board.id || !addingItem.symbol.trim()} className="w-full bg-app-green hover:bg-app-green-dark">
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
=======
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
>>>>>>> origin
        </div>
      </div>
    </Layout>
  );
};

export default WatchlistPage;