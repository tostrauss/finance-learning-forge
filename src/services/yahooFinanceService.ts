import axios from 'axios';

// Response type for autocomplete
export type SearchResponse = {
  quotes: any[];
};

// Response type for historical chart
export type HistoricalResponse = {
  chart: {
    result: [{
      timestamp: number[];
      indicators: { quote: [{ close: number[] }] };
    }];
  };
};

/**
 * Fetch autocomplete quotes via Vite proxy
 */
export async function fetchYahooAutocomplete(query: string): Promise<SearchResponse> {
  const url = `/api/v1/finance/search?q=${encodeURIComponent(query)}`;
  const response = await axios.get<SearchResponse>(url);
  return response.data;
}

// Update getHistoricalPrices function to ensure all OHLC data is returned
export async function getHistoricalPrices(
  symbol: string
): Promise<{ date: string; open: number; high: number; low: number; close: number; volume?: number }[]> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`;
    const response = await axios.get<HistoricalResponse>(url);
    
    // Check if we have valid data
    if (!response.data?.chart?.result?.[0]) {
      throw new Error("Invalid data structure in API response");
    }
    
    const result = response.data.chart.result[0];
    
    // Check if required properties exist
    if (!result.timestamp || !result.indicators?.quote?.[0]) {
      throw new Error("Missing required data from API");
    }
    
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];
    
    // Filter out invalid data points and ensure all OHLC values exist
    return timestamps
      .map((ts, i) => {
        const close = quotes.close?.[i];
        if (close === undefined || close === null) return null;
        
        const open = quotes.open?.[i] !== undefined ? quotes.open[i] : close;
        const high = quotes.high?.[i] !== undefined ? quotes.high[i] : Math.max(open, close);
        const low = quotes.low?.[i] !== undefined ? quotes.low[i] : Math.min(open, close);
        
        return {
          date: new Date(ts * 1000).toISOString().slice(0, 10),
          open,
          high,
          low,
          close,
          volume: quotes.volume?.[i]
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error(`Error fetching historical prices for ${symbol}:`, error);
    throw error;
  }
}