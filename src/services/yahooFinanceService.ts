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

/**
 * Fetch 1-month historical closing prices for a symbol via Vite proxy
 */
export async function getHistoricalPrices(
  symbol: string
): Promise<{ date: string; close: string }[]> {
  const url = `/api/v8/finance/chart/${encodeURIComponent(symbol)}?interval=1d&range=1mo`;
  const response = await axios.get<HistoricalResponse>(url);
  const result = response.data.chart.result[0];
  const timestamps = result.timestamp;
  const closes = result.indicators.quote[0].close;

  return timestamps.map((ts, i) => ({
    date: new Date(ts * 1000).toISOString().slice(0, 10),
    close: closes[i]?.toString() ?? '0',
  }));
}