// src/types/trading.ts

/**
 * Market data point for charting
 */
export interface MarketDataPoint {
  timestamp: number;
  open: number;
  high: number;
  close: number;
  low: number;
  volume: number;
}

/**
 * Stock or ETF information
 */
export interface SecurityInfo {
  symbol: string;
  name: string;
  exchange: string;
  sector?: string;
  industry?: string;
  marketCap?: number;
  beta?: number;
  pe?: number;
  dividendYield?: number;
  eps?: number;
}

/**
 * Current market quote
 */
export interface MarketQuote {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: number;
  timestamp: number;
}

/**
 * Order types supported in the simulator
 */
export type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit';

/**
 * Order sides: buy or sell
 */
export type OrderSide = 'buy' | 'sell';

/**
 * Trade duration
 */
export type OrderDuration = 'day' | 'gtc' | 'gtd';

/**
 * Order status
 */
export type OrderStatus = 'open' | 'filled' | 'partially_filled' | 'canceled' | 'rejected' | 'expired';

/**
 * Trading order
 */
export interface Order {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  type: OrderType;
  side: OrderSide;
  limitPrice?: number;
  stopPrice?: number;
  duration: OrderDuration;
  status: OrderStatus;
  filledQuantity: number;
  filledPrice?: number;
  createdAt: number;
  updatedAt: number;
  courseLinkId?: string; // Link to specific course or module
}

/**
 * Position in a portfolio
 */
export interface Position {
  symbol: string;
  quantity: number;
  averageCost: number;
  currentPrice: number;
  marketValue: number;
  unrealizedPL: number;
  unrealizedPLPercent: number;
  realizedPL: number;
  costBasis: number;
  lastUpdated: number;
}

/**
 * User's trading account
 */
export interface TradingAccount {
  id: string;
  userId: string;
  cash: number;
  equity: number;
  buyingPower: number;
  dayTradingBuyingPower?: number;
  positions: Position[];
  openOrders: Order[];
  createdAt: number;
  lastUpdated: number;
}

/**
 * Transaction in the trading history
 */
export interface Transaction {
  id: string;
  userId: string;
  symbol: string;
  quantity: number;
  price: number;
  side: OrderSide;
  fee: number;
  total: number;
  timestamp: number;
  orderId: string;
}

/**
 * Trading journal entry
 */
export interface JournalEntry {
  id: string;
  userId: string;
  transactionIds?: string[];
  entryDate: number;
  title: string;
  description: string;
  strategy: string;
  outcome: string;
  lessonsLearned: string;
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  courseReference?: string; // Related course or module
  isPinned?: boolean;
}

/**
 * Item in a user's watchlist
 */
export interface WatchlistItem {
  symbol: string;
  addedAt: number;
  notes?: string;
}

/**
 * User watchlist
 */
export interface Watchlist {
  id: string;
  userId: string;
  name: string;
  items: WatchlistItem[];
  createdAt: number;
  updatedAt: number;
}

/**
 * Technical indicator for charts
 */
export interface TechnicalIndicator {
  id: string;
  name: string;
  type: string;
  parameters: Record<string, any>;
  color?: string;
}

/**
 * Chart configuration 
 */
export interface ChartConfig {
  id: string;
  userId: string;
  symbol: string;
  timeframe: '1m' | '5m' | '15m' | '30m' | '1h' | '4h' | '1d' | '1w' | '1mo';
  chartType: 'candlestick' | 'line' | 'bar' | 'heikin-ashi';
  indicators: TechnicalIndicator[];
  drawings?: any[]; // Drawing objects (lines, fibonacci, etc.)
  savedAt: number;
}

/**
 * Alert for price or indicator conditions
 */
export interface PriceAlert {
  id: string;
  userId: string;
  symbol: string;
  condition: 'above' | 'below' | 'percent_up' | 'percent_down';
  price: number;
  isActive: boolean;
  isTriggered: boolean;
  createdAt: number;
  triggeredAt?: number;
}

/**
 * Portfolio performance metrics
 */
export interface PortfolioPerformance {
  userId: string;
  periodStart: number;
  periodEnd: number;
  startingValue: number;
  endingValue: number;
  deposits: number;
  withdrawals: number;
  realizedPL: number;
  unrealizedPL: number;
  totalPL: number;
  totalPLPercent: number;
  dailyReturns: {date: number, value: number}[];
  sharpeRatio?: number;
  maxDrawdown?: number;
  winRate?: number;
  trades: number;
}

/**
 * Financial simulator tool configuration
 */
export interface SimulatorTool {
  id: string;
  type: 'dcf' | 'wacc' | 'portfolio' | 'retirement' | 'mortgage' | 'forex' | 'options' | 'valuation' | 'ratio';
  name: string;
  lastState?: Record<string, any>; // Last used configuration
  isFavorite: boolean;
  courseReference?: string; // Related course or module
}

/**
 * Trading challenges/scenarios for exercises
 */
export interface TradingChallenge {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  startingCash: number;
  duration: number; // in days
  allowedSecurities: string[]; // symbols or 'all'
  successCriteria: Record<string, any>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  courseReference: string; // Related course or module
  isCompleted: boolean;
  completionDate?: number;
}

/**
 * Market news item
 */
export interface MarketNews {
  id: string;
  headline: string;
  summary: string;
  source: string;
  url: string;
  symbols: string[];
  publishedAt: number;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

/**
 * User settings for trading simulator
 */
export interface TradingSettings {
  userId: string;
  defaultChartTimeframe: string;
  defaultChartType: string;
  showRealTimeData: boolean;
  enableMarketHoursOnly: boolean;
  defaultOrderType: OrderType;
  defaultOrderDuration: OrderDuration;
  enableTradeConfirmations: boolean;
  darkMode: boolean;
  riskWarningThreshold: number; // Percentage of account at risk to trigger warning
  notifications: {
    orders: boolean;
    trades: boolean;
    priceAlerts: boolean;
    marketNews: boolean;
  };
}