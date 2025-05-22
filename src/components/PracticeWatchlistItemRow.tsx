import React, { useState, useEffect } from 'react';
import { AssetType } from '@/components/trading/WatchlistWidget';
import { Sparklines, SparklinesLine, SparklinesSpots } from 'react-sparklines';
import { getHistoricalPrices } from '@/services/yahooFinanceService'; // Import your real API service

// Define the expected structure for our component's data state
interface DisplayData {
  price: number;
  change: number;
  changePercent: number;
  name: string; // We'll use the symbol as the name for now
  historicalData: number[];
}

export interface WatchlistItemType { // Or import the actual type
  symbol: string;
  name?: string;
  // ... other properties of your item
}

export interface PracticeWatchlistItemRowProps {
  item: WatchlistItemType; // Ensure this line exists and WatchlistItemType is correct
  assetType: AssetType; // assetType might not be used by getHistoricalPrices but good to keep for consistency
  onSelect: (symbol: string) => void;
  onRemove: (symbol: string) => void;
}

const PracticeWatchlistItemRow: React.FC<PracticeWatchlistItemRowProps> = ({ item, assetType, onSelect, onRemove }) => {
  const { symbol } = item; // Destructure symbol from item
  const [data, setData] = useState<DisplayData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch historical prices (e.g., last month, daily interval)
        const historical = await getHistoricalPrices(symbol);

        if (!historical || historical.length === 0) {
          throw new Error("No historical data returned");
        }

        // Extract data for display
        const latestData = historical[historical.length - 1];
        const previousData = historical.length > 1 ? historical[historical.length - 2] : null;

        const currentPrice = latestData.close;
        let priceChange = 0;
        let priceChangePercent = 0;

        if (previousData) {
          // Change from previous day's close
          priceChange = latestData.close - previousData.close;
          priceChangePercent = previousData.close !== 0 ? (priceChange / previousData.close) * 100 : 0;
        } else {
          // If only one day's data, change from open to close for that day
          priceChange = latestData.close - latestData.open;
          priceChangePercent = latestData.open !== 0 ? (priceChange / latestData.open) * 100 : 0;
        }
        
        // For sparkline, use the close prices
        const sparklineData = historical.map(d => d.close);

        setData({
          price: currentPrice,
          change: priceChange,
          changePercent: priceChangePercent,
          name: symbol, // Using symbol as name; API doesn't provide it here
          historicalData: sparklineData,
        });

      } catch (err) {
        console.error(`Error fetching data for ${symbol} in PracticeWatchlistItemRow:`, err);
        setError(`Failed to load data for ${symbol}`);
        setData(null); // Clear data on error
      } finally {
        setLoading(false);
      }
    };

    if (symbol) { // Only load if symbol is present
        loadData();
    } else {
        setLoading(false);
        setError("No symbol provided");
    }

    // Optional: set up an interval to refresh data if needed,
    // but be mindful of API rate limits with getHistoricalPrices.
    // const intervalId = setInterval(loadData, 60000); // e.g., every minute
    // return () => clearInterval(intervalId);
  }, [symbol, assetType]); // Rerun if symbol or assetType changes

  if (loading) {
    return (
      <li className="flex justify-between items-center py-2 border-b">
        <div className="truncate pr-1">{symbol}</div>
        <div className="text-xs text-gray-400">Loading...</div>
      </li>
    );
  }

  if (error || !data) {
    return (
      <li className="flex justify-between items-center py-2 border-b">
        <div className="truncate pr-1">{symbol}</div>
        <div className="text-xs text-red-500 truncate pl-1">{error || "Error loading data"}</div>
      </li>
    );
  }

  const changeColor = data.change >= 0 ? 'text-green-600' : 'text-red-600';
  const sparklineColor = data.change >= 0 ? 'green' : 'red';

  return (
    <li
      className="flex items-center py-2 border-b hover:bg-gray-50 cursor-pointer"
      onClick={() => onSelect(symbol)}
    >
      <div className="flex-grow w-1/3">
        <div className="font-medium truncate pr-1">{data.name}</div> {/* Displaying symbol as name */}
        <div className="text-xs text-gray-500">
          ${data.price.toFixed(2)}
        </div>
      </div>

      <div className="w-1/3 flex justify-center items-center px-1">
        {data.historicalData && data.historicalData.length > 1 ? (
          <div className="sparkline-container"> 
            <Sparklines data={data.historicalData} svgWidth={80} svgHeight={30}>
              <SparklinesLine color={sparklineColor} style={{ strokeWidth: 1.5 }} />
              <SparklinesSpots spotColors={{'-1': sparklineColor, '0': sparklineColor, '1': sparklineColor }} />
            </Sparklines>
          </div>
        ) : (
          <div className="sparkline-container flex items-center justify-center text-xs text-gray-400">No chart</div>
        )}
      </div>
      
      <div className="w-1/3 flex items-center justify-end pl-1">
        <div className="text-right mr-2">
          <div className={`text-sm font-medium ${changeColor}`}>
            {data.change >= 0 ? '+' : ''}{data.change.toFixed(2)}
          </div>
          <div className={`text-xs ${changeColor}`}>
            ({data.change >= 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(symbol);
          }}
          className="text-red-500 hover:text-red-700 text-xs p-1"
          aria-label={`Remove ${symbol} from watchlist`}
        >
          X
        </button>
      </div>
    </li>
  );
};

export default PracticeWatchlistItemRow;