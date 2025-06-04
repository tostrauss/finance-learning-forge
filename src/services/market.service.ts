import axios from 'axios';
import { logger } from '../utils/logger';
import WebSocket from 'ws';
import { cacheService } from './cacheService';

interface MarketQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  timestamp: Date;
}

interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockDataParams {
  symbol: string;
  interval: string;
  from: Date;
  to: Date;
}

class MarketService {
  private alphaVantageKey: string;
  private yahooFinanceUrl: string;
  private wsConnections: Map<string, WebSocket>;
  constructor() {
    this.alphaVantageKey = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY!;
    this.yahooFinanceUrl = 'https://query1.finance.yahoo.com/v8/finance';
    this.wsConnections = new Map();
  }
  async getQuote(symbol: string): Promise<MarketQuote> {
    const cacheKey = `quote:${symbol}`;
    
    // Check cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Using Alpha Vantage for this example
      const response = await axios.get(
        `https://www.alphavantage.co/query`,
        {
          params: {
            function: 'GLOBAL_QUOTE',
            symbol: symbol,
            apikey: this.alphaVantageKey
          }
        }
      );

      const data = response.data['Global Quote'];
      const quote: MarketQuote = {
        symbol: symbol,
        price: parseFloat(data['05. price']),
        change: parseFloat(data['09. change']),
        changePercent: parseFloat(data['10. change percent'].replace('%', '')),
        volume: parseInt(data['06. volume']),
        high: parseFloat(data['03. high']),
        low: parseFloat(data['04. low']),
        open: parseFloat(data['02. open']),
        previousClose: parseFloat(data['08. previous close']),
        timestamp: new Date()
      };      // Cache for 1 minute
      await cacheService.setex(cacheKey, 60, JSON.stringify(quote));
      
      return quote;
    } catch (error) {
      logger.error('Failed to fetch market quote:', error);
      throw new Error('Market data unavailable');
    }
  }

  async getChartData(
    symbol: string, 
    interval: string = '5min',
    outputSize: string = 'compact'
  ): Promise<ChartData[]> {    const cacheKey = `chart:${symbol}:${interval}`;
    
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query`,
        {
          params: {
            function: 'TIME_SERIES_INTRADAY',
            symbol: symbol,
            interval: interval,
            apikey: this.alphaVantageKey,
            outputsize: outputSize
          }
        }
      );

      const timeSeries = response.data[`Time Series (${interval})`];
      const chartData: ChartData[] = Object.entries(timeSeries)
        .map(([time, data]: [string, any]) => ({
          time: new Date(time).getTime(),
          open: parseFloat(data['1. open']),
          high: parseFloat(data['2. high']),
          low: parseFloat(data['3. low']),
          close: parseFloat(data['4. close']),
          volume: parseInt(data['5. volume'])
        }))
        .reverse();      // Cache based on interval
      const ttl = interval.includes('min') ? 300 : 3600; // 5 min or 1 hour
      await cacheService.setex(cacheKey, ttl, JSON.stringify(chartData));
      
      return chartData;
    } catch (error) {
      logger.error('Failed to fetch chart data:', error);
      throw new Error('Chart data unavailable');
    }
  }

  async searchSymbols(query: string): Promise<any[]> {
    try {
      const response = await axios.get(
        `https://www.alphavantage.co/query`,
        {
          params: {
            function: 'SYMBOL_SEARCH',
            keywords: query,
            apikey: this.alphaVantageKey
          }
        }
      );

      return response.data.bestMatches || [];
    } catch (error) {
      logger.error('Failed to search symbols:', error);
      return [];
    }
  }

  async fetchStockData(params: StockDataParams): Promise<ChartData[]> {
    const { symbol, interval, from, to } = params;
    const cacheKey = `stockData:${symbol}:${interval}:${from.getTime()}:${to.getTime()}`;
      // Check cache first
    const cached = await cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    try {
      // Use Alpha Vantage for intraday data
      let response;
      if (interval.includes('min')) {
        response = await axios.get(
          `https://www.alphavantage.co/query`,
          {
            params: {
              function: 'TIME_SERIES_INTRADAY',
              symbol,
              interval,
              apikey: this.alphaVantageKey,
              outputsize: 'full'
            }
          }
        );

        const timeSeries = response.data[`Time Series (${interval})`];
        if (!timeSeries) {
          throw new Error('No data returned from Alpha Vantage');
        }

        const chartData: ChartData[] = Object.entries(timeSeries)
          .filter(([time]) => {
            const dataDate = new Date(time);
            return dataDate >= from && dataDate <= to;
          })
          .map(([time, data]: [string, any]) => ({
            time: new Date(time).getTime(),
            open: parseFloat(data['1. open']),
            high: parseFloat(data['2. high']),
            low: parseFloat(data['3. low']),
            close: parseFloat(data['4. close']),
            volume: parseInt(data['5. volume'])          }))
          .reverse();

        // Cache for 1 hour
        await cacheService.setex(cacheKey, 3600, JSON.stringify(chartData));
        return chartData;
      } else {
        // Use Yahoo Finance for daily data
        const range = Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
        response = await axios.get(
          `${this.yahooFinanceUrl}/chart/${symbol}`,
          {
            params: {
              interval: '1d',
              range: `${range}d`
            }
          }
        );

        if (!response.data?.chart?.result?.[0]?.timestamp) {
          throw new Error('Invalid response from Yahoo Finance');
        }

        const result = response.data.chart.result[0];
        const chartData: ChartData[] = result.timestamp
          .map((ts: number, i: number) => {
            const quotes = result.indicators.quote[0];
            return {
              time: ts * 1000,
              open: quotes.open[i],
              high: quotes.high[i],
              low: quotes.low[i],
              close: quotes.close[i],
              volume: quotes.volume[i]
            };
          })
          .filter((data: ChartData) => {
            const dataDate = new Date(data.time);
            return dataDate >= from && dataDate <= to;          });

        // Cache for 1 hour
        await cacheService.setex(cacheKey, 3600, JSON.stringify(chartData));
        return chartData;
      }
    } catch (error) {
      logger.error('Failed to fetch stock data:', error);
      throw new Error('Stock data unavailable');
    }
  }

  // WebSocket methods for real-time data
  subscribeToRealTimeQuotes(symbols: string[], clientId: string): void {
    // Implementation would depend on your real-time data provider
    // This is a simplified example
    const ws = new WebSocket('wss://your-realtime-provider.com');
    
    ws.on('open', () => {
      ws.send(JSON.stringify({
        action: 'subscribe',
        symbols: symbols
      }));
    });

    ws.on('message', (data) => {
      // Broadcast to connected clients
      this.broadcastToClient(clientId, data.toString());
    });

    this.wsConnections.set(clientId, ws);
  }

  unsubscribeFromRealTimeQuotes(clientId: string): void {
    const ws = this.wsConnections.get(clientId);
    if (ws) {
      ws.close();
      this.wsConnections.delete(clientId);
    }
  }

  private broadcastToClient(clientId: string, data: string): void {
    // Implementation depends on your WebSocket setup
  }
}

export const marketService = new MarketService();
export const { fetchStockData } = marketService;