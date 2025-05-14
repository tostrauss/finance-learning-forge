// src/components/trading/SearchSecurities.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ChevronDown, TrendingUp, BarChart2 } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, BarChart, Bar, ReferenceLine, Brush} from 'recharts';

// Generate more advanced chart data with candlestick format
const generateStockData = (symbol: string, days = 30) => {
  const basePrice = symbol === 'TSLA' ? 220 : symbol === 'AAPL' ? 180 : symbol === 'MSFT' ? 330 : 100;
  const volatility = symbol === 'TSLA' ? 0.04 : 0.02; // Tesla is more volatile
  const data = [];
  const today = new Date();
  
  let price = basePrice;
  let volume = 0;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Create more realistic price movements
    const changePercent = (Math.random() - 0.5) * volatility * 2;
    const change = price * changePercent;
    
    // Calculate OHLC values
    let open = price;
    let close = price + change;
    let high = Math.max(open, close) * (1 + Math.random() * 0.005);
    let low = Math.min(open, close) * (1 - Math.random() * 0.005);
    
    // Calculate volume - higher on big moves
    volume = Math.floor(Math.random() * 10000000) + 5000000 + (Math.abs(changePercent) * 20000000);
    
    data.push({
      date: date.toISOString().split('T')[0],
      price: close,
      open: open,
      high: high,
      low: low,
      close: close,
      volume: volume,
      change: change,
      changePercent: changePercent * 100
    });
    
    // Update price for next iteration
    price = close;
  }
  
  return data;
};

const SearchSecurities = () => {
  const [symbol, setSymbol] = useState('');
  const [searchedSymbol, setSearchedSymbol] = useState('');
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<'line' | 'area' | 'candle'>('candle');
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M'>('1M');
  const [showIndicators, setShowIndicators] = useState(true);
  const [loading, setLoading] = useState(false);
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [quantity, setQuantity] = useState('1');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');

  useEffect(() => {
    if (searchedSymbol) {
      const days = timeframe === '1D' ? 1 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 90;
      setChartData(generateStockData(searchedSymbol, days));
    }
  }, [searchedSymbol, timeframe]);

  const handleSearch = () => {
    if (!symbol) return;
    
    setLoading(true);
    setTimeout(() => {
      setSearchedSymbol(symbol.toUpperCase());
      setLoading(false);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleBuy = () => {
    // In a real app, this would execute a trade
    alert(`Bought ${quantity} shares of ${searchedSymbol} at ${getLatestPrice()}`);
    setBuyDialogOpen(false);
  };

  const getLatestPrice = () => {
    if (chartData.length > 0) {
      return chartData[chartData.length - 1].close.toFixed(2);
    }
    return '0.00';
  };

  return (
    <>
      <div className="p-4 flex flex-col h-full">
        <div className="flex space-x-2 mb-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Enter symbol (e.g., AAPL, MSFT, TSLA)"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-3 pr-10"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="bg-app-purple hover:bg-app-dark-purple"
          >
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>
        
        {loading && (
          <div className="flex-grow flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-app-purple"></div>
          </div>
        )}
        
        {!loading && searchedSymbol && (
          <>
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-xl font-bold">{searchedSymbol}</h3>
                <p className="text-sm text-gray-500">Last price: ${getLatestPrice()}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant="default" 
                  className="bg-app-purple hover:bg-app-dark-purple"
                  onClick={() => setBuyDialogOpen(true)}
                >
                  Buy
                </Button>
                
                <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)}>
                  <TabsList>
                    <TabsTrigger value="1D">1D</TabsTrigger>
                    <TabsTrigger value="1W">1W</TabsTrigger>
                    <TabsTrigger value="1M">1M</TabsTrigger>
                    <TabsTrigger value="3M">3M</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <Tabs value={chartType} onValueChange={(v) => setChartType(v as any)}>
                <TabsList>
                  <TabsTrigger value="line">Line</TabsTrigger>
                  <TabsTrigger value="area">Area</TabsTrigger>
                  <TabsTrigger value="candle">Candle</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowIndicators(!showIndicators)}
              >
                <BarChart2 className="h-4 w-4 mr-1" />
                {showIndicators ? 'Hide Indicators' : 'Show Indicators'}
              </Button>
            </div>
            
            <div className="flex-grow" style={{ minHeight: "200px" }}>
              <ResponsiveContainer width="100%" height="80%">
                {chartType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.substring(5)} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} />
                    <Tooltip 
                      formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#6b3fa0" 
                      dot={false} 
                      strokeWidth={2}
                    />
                    {showIndicators && (
                      <>
                        <Line 
                          type="monotone" 
                          dataKey="ema" 
                          stroke="#ff4088" 
                          dot={false} 
                          strokeWidth={1.5}
                          strokeDasharray="5 5"
                        />
                      </>
                    )}
                  </LineChart>
                ) : chartType === 'area' ? (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.substring(5)} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis domain={['auto', 'auto']} tickLine={false} axisLine={false} />
                    <Tooltip 
                      formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="close" 
                      stroke="#6b3fa0" 
                      fill="#9b87f5" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                ) : (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.substring(5)} 
                    />
                    <YAxis domain={['auto', 'auto']} />
                    <Tooltip 
                      formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Price']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    {/* Custom Candlestick Rendering */}
                    {chartData.map((d, i) => {
                      const isGreen = d.close >= d.open;
                      return (
                        <g key={i}>
                          {/* Wick */}
                          <line
                            x1={i + 0.5}
                            y1={d.low}
                            x2={i + 0.5}
                            y2={d.high}
                            stroke={isGreen ? '#22c55e' : '#ef4444'}
                            strokeWidth={1}
                          />
                          {/* Body */}
                          <rect
                            x={i + 0.2}
                            y={isGreen ? d.open : d.close}
                            width={0.6}
                            height={Math.abs(d.close - d.open)}
                            fill={isGreen ? '#22c55e' : '#ef4444'}
                          />
                        </g>
                      );
                    })}
                  </LineChart>
                )}
              </ResponsiveContainer>
              
              {/* Volume Chart */}
              {showIndicators && (
                <ResponsiveContainer width="100%" height="20%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.substring(5)} 
                      tickLine={false} 
                      axisLine={false}
                      height={0}  
                      tick={false}
                    />
                    <YAxis 
                      domain={['auto', 'auto']} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => (value / 1000000).toFixed(0) + 'M'}
                    />
                    <Tooltip 
                      formatter={(value: any) => [`${(Number(value) / 1000000).toFixed(2)}M`, 'Volume']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Bar 
                      dataKey="volume" 
                      fill="#6b3fa0"
                      opacity={0.5}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </>
        )}
        
        {!loading && !searchedSymbol && (
          <div className="flex-grow flex items-center justify-center flex-col text-gray-400">
            <Search className="h-12 w-12 mb-2 opacity-50" />
            <p>Enter a symbol and click Search to view chart</p>
          </div>
        )}
      </div>

      {/* Buy Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy {searchedSymbol}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Order Type</Label>
              <Select value={orderType} onValueChange={setOrderType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="market">Market</SelectItem>
                  <SelectItem value="limit">Limit</SelectItem>
                  <SelectItem value="stop">Stop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {orderType === 'limit' && (
              <div className="grid gap-2">
                <Label htmlFor="limitPrice">Limit Price</Label>
                <Input
                  id="limitPrice"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={`Current: $${getLatestPrice()}`}
                />
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span>Estimated Cost:</span>
                <span className="font-semibold">
                  ${(Number(quantity) * Number(getLatestPrice())).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBuy} className="bg-app-purple hover:bg-app-dark-purple">
              Buy {searchedSymbol}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SearchSecurities;