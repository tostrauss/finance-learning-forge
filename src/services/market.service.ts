import axios from 'axios';
import { redis } from '../config/redis';
import { logger } from '../utils/logger';
import WebSocket from 'ws';

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

class MarketService {
  private alphaVantageKey: string;
  private yahooFinanceUrl: string;
  private wsConnections: Map<string, WebSocket>;

  constructor() {
    this.alphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY!;
    this.yahooFinanceUrl = 'https://query1.finance.yahoo.com/v8/finance';
    this.wsConnections = new Map();
  }

  async getQuote(symbol: string): Promise<MarketQuote> {
    const cacheKey = `quote:${symbol}`;
    
    // Check cache first
    const cached = await redis.get(cacheKey);
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
      };

      // Cache for 1 minute
      await redis.setex(cacheKey, 60, JSON.stringify(quote));
      
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
  ): Promise<ChartData[]> {
    const cacheKey = `chart:${symbol}:${interval}`;
    
    const cached = await redis.get(cacheKey);
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
        .reverse();

      // Cache based on interval
      const ttl = interval.includes('min') ? 300 : 3600; // 5 min or 1 hour
      await redis.setex(cacheKey, ttl, JSON.stringify(chartData));
      
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