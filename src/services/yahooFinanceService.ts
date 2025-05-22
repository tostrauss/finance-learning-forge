import axios from 'axios';

// Define the AutocompleteQuote interface with relevant fields
export interface AutocompleteQuote {
  symbol: string;
  shortname?: string;
  longname?: string;
  name?: string;
  regularMarketPrice?: number; // Or whatever the actual field name is, e.g., currentPrice, price
  // Add any other relevant fields
}

// Response type for autocomplete
export type SearchResponse = {
  quotes: AutocompleteQuote[];
};

// Define a more specific type for the quote data within indicators
interface IndicatorQuote {
  close?: (number | null)[];
  open?: (number | null)[];
  high?: (number | null)[];
  low?: (number | null)[];
  volume?: (number | null)[];
}

// Response type for historical chart
export type HistoricalResponse = {
  chart: {
    result: [{
      timestamp: number[];
      indicators: { 
        quote: [IndicatorQuote] // Use the more specific IndicatorQuote type
      };
    }];
    error: any | null; // It's good practice to type the error as well if known
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
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`; // Common parameters
    const response = await axios.get<HistoricalResponse>(url);
    
    if (response.data?.chart?.error) {
      console.error(`Error from Yahoo Finance API for ${symbol}:`, response.data.chart.error);
      throw new Error(`API error for ${symbol}: ${JSON.stringify(response.data.chart.error)}`);
    }
    
    if (!response.data?.chart?.result?.[0]) {
      throw new Error(`Invalid data structure in API response for ${symbol}`);
    }
    
    const result = response.data.chart.result[0];
    
    if (!result.timestamp || !result.indicators?.quote?.[0]) {
      throw new Error(`Missing required data from API for ${symbol}`);
    }
    
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0]; // This will now be of type IndicatorQuote
    
    // Filter out invalid data points and ensure all OHLC values exist
    return timestamps
      .map((ts, i) => {
        const close = quotes.close?.[i];
        // Ensure close is a valid number before proceeding
        if (close === undefined || close === null || isNaN(close)) return null; 
        
        // Provide defaults if open, high, low are missing, using close as a fallback
        const open = quotes.open?.[i] ?? close;
        const high = quotes.high?.[i] ?? Math.max(open, close); // Ensure high is at least open or close
        const low = quotes.low?.[i] ?? Math.min(open, close);   // Ensure low is at most open or close
        const volume = quotes.volume?.[i];
        
        // Final check for NaN on all critical values if they were potentially null from API
        if (isNaN(open) || isNaN(high) || isNaN(low)) return null;

        return {
          date: new Date(ts * 1000).toISOString().slice(0, 10),
          open,
          high,
          low,
          close, // close is already validated
          volume: volume === undefined || volume === null || isNaN(volume) ? undefined : volume
        };
      })
      .filter((point): point is Exclude<typeof point, null> => point !== null); // Type guard for filter
  } catch (error) {
    // Log the error if it's not already an API error stringified above
    if (!(error instanceof Error && error.message.startsWith('API error for'))) {
        console.error(`Error fetching historical prices for ${symbol}:`, error);
    }
    throw error; // Re-throw the error to be handled by the caller
  }
}