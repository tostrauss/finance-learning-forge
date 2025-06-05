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
): Promise<MarketDataPoint[]> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`;
    const response = await axios.get<HistoricalResponse>(url);

    console.log(`Yahoo Finance API response for ${symbol}:`, JSON.stringify(response.data, null, 2));

    if (response.data?.chart?.error) {
      console.error(`Error from Yahoo Finance API for ${symbol}:`, response.data.chart.error);
      throw new Error(`API error for ${symbol}: ${JSON.stringify(response.data.chart.error)}`);
    }
    
    // This is where your error is likely originating (around original line 63)
    if (!response.data?.chart?.result?.[0]) {
      console.error(`Invalid data structure for ${symbol}. Full response logged above.`);
      throw new Error(`Invalid data structure in API response for ${symbol}`);
    }
    
    const result = response.data.chart.result[0];
    
    if (!result.timestamp || !result.indicators?.quote?.[0]) {
      // Add more specific logging if this condition is met
      console.error(`Missing timestamp or indicators.quote for ${symbol}:`, result);
      throw new Error(`Missing required data from API for ${symbol}`);
    }
    
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];
    
    return timestamps
      .map((ts, i) => {
        const close = quotes.close?.[i];
        if (close === undefined || close === null || isNaN(close)) {
          // console.warn(`Skipping data point for ${symbol} at timestamp ${ts} due to invalid close price.`);
          return null;
        }
        
        const open = quotes.open?.[i] ?? close;
        const high = quotes.high?.[i] ?? Math.max(open, close);
        const low = quotes.low?.[i] ?? Math.min(open, close);
        const volume = quotes.volume?.[i];
        
        if (isNaN(open) || isNaN(high) || isNaN(low)) {
          // console.warn(`Skipping data point for ${symbol} at timestamp ${ts} due to NaN in OHLC.`);
          return null;
        }

        return {
          date: new Date(ts * 1000).toISOString().slice(0, 10),
          open,
          high,
          low,
          close,
          volume: volume === undefined || volume === null || isNaN(volume) ? undefined : volume
        };
      })
      .filter((point): point is Exclude<typeof point, null> => point !== null);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(`❌ AxiosError in getHistoricalPrices for ${symbol}:`, {
        status: err.response?.status,
        body: err.response?.data,
        config: err.config,
      });
    } else {
      console.error(`❌ Non-Axios error in getHistoricalPrices for ${symbol}:`, err);
    }
    throw err;
  }
}