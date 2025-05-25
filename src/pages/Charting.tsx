import Layout from '@/components/Layout';
import { useWatchlistManager, WatchlistBoard } from '@/hooks/useWatchlistManager';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const ChartingPage = () => {
  const { user } = useAuth();
  const {
    boards: watchlists,
    isLoading: loadingWatchlists,
    error: watchlistError,
    // addBoard, removeBoard etc. can be used here if you add UI for managing lists on this page
  } = useWatchlistManager();

  const [selectedWatchlist, setSelectedWatchlist] = useState<WatchlistBoard | null>(null);

  const handleSelectWatchlist = (watchlist: WatchlistBoard) => {
    setSelectedWatchlist(watchlist);
    // Future: Trigger chart updates based on selectedWatchlist.items
    console.log("Selected watchlist for charting:", watchlist);
  };

  return (
    <Layout>
      <div className="flex h-full">
        {/* Watchlist Column */}
        <div className="w-1/4 h-full bg-white border-r p-4 overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-app-purple">My Watchlists</h2>
            {/* Optional: Add button to create new watchlist if functionality is added here */}
          </div>
          {!user ? (
            <p className="text-gray-500">Please sign in to view and manage your watchlists.</p>
          ) : loadingWatchlists ? (
            <p className="text-gray-500">Loading watchlists...</p>
          ) : watchlistError ? (
            <p className="text-red-500">Error: {watchlistError.message}</p>
          ) : watchlists.length > 0 ? (
            <ul>
              {watchlists.map((watchlist) => (
                <li
                  key={watchlist.id}
                  className={`mb-3 p-3 border rounded hover:bg-gray-100 cursor-pointer transition-colors
                              ${selectedWatchlist?.id === watchlist.id ? 'bg-app-light-purple text-white shadow-md' : 'bg-white'}`}
                  onClick={() => handleSelectWatchlist(watchlist)}
                >
                  <h3 className={`font-medium ${selectedWatchlist?.id === watchlist.id ? 'text-white' : 'text-gray-800'}`}>
                    {watchlist.title}
                  </h3>
                  {watchlist.items.length > 0 ? (
                    <p className={`text-sm truncate ${selectedWatchlist?.id === watchlist.id ? 'text-purple-200' : 'text-gray-500'}`}>
                      {watchlist.items.map(item => item.symbol).join(', ')}
                    </p>
                  ) : (
                    <p className={`text-sm italic ${selectedWatchlist?.id === watchlist.id ? 'text-purple-200' : 'text-gray-400'}`}>
                      Empty
                    </p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No watchlists found. You can create them on the Watchlist page.</p>
          )}
        </div>

        {/* Charting Area */}
        <div className="flex-1 p-6 bg-app-light-gray overflow-y-auto">
          <h1 className="text-3xl font-bold text-app-purple mb-2">Charting</h1>
          {selectedWatchlist ? (
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700">
                {selectedWatchlist.title}
              </h2>
              {selectedWatchlist.items.length > 0 ? (
                <p className="text-gray-600">
                  Contains: {selectedWatchlist.items.map(item => `${item.symbol} (${item.assetType})`).join(', ')}
                </p>
              ) : (
                <p className="text-gray-600">This watchlist is empty. Add assets to see them on the chart.</p>
              )}
            </div>
          ) : (
            <p className="text-gray-700 mb-6">
              Select a watchlist from the left panel to display its assets and related charts.
            </p>
          )}
          <div className="bg-white p-4 rounded-lg shadow-lg">
            {/* Placeholder for Chart Component */}
            <div className="h-96 border-2 border-dashed border-gray-300 flex items-center justify-center rounded-md">
              <p className="text-gray-400 text-lg">
                {selectedWatchlist && selectedWatchlist.items.length > 0
                  ? `Chart for ${selectedWatchlist.items.map(i => i.symbol).join(', ')}`
                  : selectedWatchlist
                  ? 'Select assets from the watchlist to chart'
                  : 'Chart Area - Select a Watchlist'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChartingPage;