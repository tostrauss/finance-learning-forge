import axios from 'axios';

// Define the AutocompleteQuote interface with relevant fields
export interface AutocompleteQuote {
  symbol: string;
  shortname?: string;
  longname?: string;
  name?: string;
  regularMarketPrice?: number;
}

// Add the MarketDataPoint interface
export interface MarketDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
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
        quote: [IndicatorQuote];
      };
      meta?: {
        symbol?: string;
        shortName?: string;
        longName?: string;
        currency?: string;
        exchangeName?: string;
        instrumentType?: string;
        firstTradeDate?: number;
        regularMarketTime?: number;
        gmtoffset?: number;
        timezone?: string;
        exchangeTimezoneName?: string;
        regularMarketPrice?: number;
        chartPreviousClose?: number;
        priceHint?: number;
        currentTradingPeriod?: any;
        dataGranularity?: string;
        range?: string;
        validRanges?: string[];
      };
    }];
    error: any | null;
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

// Update getHistoricalPrices function to accept a range parameter
export async function getHistoricalPrices(
  symbol: string,
  range: string = '1mo'
): Promise<MarketDataPoint[]> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
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

        // Update the date formatting in the return statement
        return {
          date: new Date(ts * 1000).toISOString().split('T')[0], // This gives YYYY-MM-DD
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

// Add a new interface for company info
export interface CompanyInfo {
  symbol: string;
  shortName?: string;
  longName?: string;
  displayName?: string;
}

// Add a function to get company info
export async function getCompanyInfo(symbol: string): Promise<CompanyInfo | null> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1d`;
    const response = await axios.get<HistoricalResponse>(url);
    
    if (response.data?.chart?.result?.[0]?.meta) {
      const meta = response.data.chart.result[0].meta;
      return {
        symbol: symbol.toUpperCase(),
        shortName: meta.shortName,
        longName: meta.longName,
        displayName: meta.longName || meta.shortName || symbol.toUpperCase()
      };
    }
    return {
      symbol: symbol.toUpperCase(),
      displayName: symbol.toUpperCase()
    };
  } catch (error) {
    console.error('Error fetching company info:', error);
    return null;
  }
}

// Update getHistoricalPricesWithInfo to safely access meta
export async function getHistoricalPricesWithInfo(
  symbol: string,
  range: string = '1mo'
): Promise<{ data: MarketDataPoint[], companyInfo: CompanyInfo | null }> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=${range}`;
    const response = await axios.get<HistoricalResponse>(url);

    if (!response.data?.chart?.result?.[0]) {
      throw new Error('No data found for this symbol');
    }

    const result = response.data.chart.result[0];
    const { timestamp: timestamps, indicators, meta } = result;

    // Extract company info from meta (safely)
    const companyInfo: CompanyInfo = {
      symbol: symbol.toUpperCase(),
      shortName: meta?.shortName,
      longName: meta?.longName,
      displayName: meta?.longName || meta?.shortName || symbol.toUpperCase()
    };

    // Process historical data (existing logic)
    const quote = indicators.quote[0];
    const data: MarketDataPoint[] = [];

    for (let i = 0; i < timestamps.length; i++) {
      const ts = timestamps[i];
      const open = quote.open?.[i];
      const high = quote.high?.[i];
      const low = quote.low?.[i];
      const close = quote.close?.[i];
      const volume = quote.volume?.[i];

      if (open !== null && open !== undefined && !isNaN(open) &&
          high !== null && high !== undefined && !isNaN(high) &&
          low !== null && low !== undefined && !isNaN(low) &&
          close !== null && close !== undefined && !isNaN(close)) {
        
        data.push({
          date: new Date(ts * 1000).toISOString().split('T')[0],
          open,
          high,
          low,
          close,
          volume: volume === undefined || volume === null || isNaN(volume) ? undefined : volume
        });
      }
    }

    return { data, companyInfo };
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
}

// Add a new function for intraday data
export async function getIntradayPrices(
  symbol: string,
  interval: string = '5m',
  range: string = '1d'
): Promise<MarketDataPoint[]> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
    const response = await axios.get<HistoricalResponse>(url);

    if (!response.data?.chart?.result?.[0]) {
      throw new Error('No intraday data found for this symbol');
    }

    const result = response.data.chart.result[0];
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];

    return timestamps
      .map((ts, i) => {
        const close = quotes.close?.[i];
        if (close === undefined || close === null || isNaN(close)) {
          return null;
        }

        const open = quotes.open?.[i] ?? close;
        const high = quotes.high?.[i] ?? Math.max(open, close);
        const low = quotes.low?.[i] ?? Math.min(open, close);
        const volume = quotes.volume?.[i];

        if (isNaN(open) || isNaN(high) || isNaN(low)) {
          return null;
        }

        return {
          date: new Date(ts * 1000).toISOString(), // Full datetime for intraday
          open,
          high,
          low,
          close,
          volume: volume === undefined || volume === null || isNaN(volume) ? undefined : volume
        };
      })
      .filter((point): point is Exclude<typeof point, null> => point !== null);
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    throw error;
  }
}

// Add intraday version with company info
export async function getIntradayPricesWithInfo(
  symbol: string,
  interval: string = '5m',
  range: string = '1d'
): Promise<{ data: MarketDataPoint[], companyInfo: CompanyInfo | null }> {
  try {
    const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=${interval}&range=${range}`;
    const response = await axios.get<HistoricalResponse>(url);

    if (!response.data?.chart?.result?.[0]) {
      throw new Error('No intraday data found for this symbol');
    }

    const result = response.data.chart.result[0];
    const { timestamp: timestamps, indicators, meta } = result;

    // Extract company info from meta
    const companyInfo: CompanyInfo = {
      symbol: symbol.toUpperCase(),
      shortName: meta?.shortName,
      longName: meta?.longName,
      displayName: meta?.longName || meta?.shortName || symbol.toUpperCase()
    };

    // Process intraday data
    const quote = indicators.quote[0];
    const data: MarketDataPoint[] = [];

    for (let i = 0; i < timestamps.length; i++) {
      const ts = timestamps[i];
      const open = quote.open?.[i];
      const high = quote.high?.[i];
      const low = quote.low?.[i];
      const close = quote.close?.[i];
      const volume = quote.volume?.[i];

      if (open !== null && open !== undefined && !isNaN(open) &&
          high !== null && high !== undefined && !isNaN(high) &&
          low !== null && low !== undefined && !isNaN(low) &&
          close !== null && close !== undefined && !isNaN(close)) {
        
        data.push({
          date: new Date(ts * 1000).toISOString(), // Full datetime for intraday
          open,
          high,
          low,
          close,
          volume: volume === undefined || volume === null || isNaN(volume) ? undefined : volume
        });
      }
    }

    return { data, companyInfo };
  } catch (error) {
    console.error('Error fetching intraday data:', error);
    throw error;
  }
}