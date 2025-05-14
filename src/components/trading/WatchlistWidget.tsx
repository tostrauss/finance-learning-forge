// src/components/trading/WatchlistWidget.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowUpRight, ArrowDownRight, Plus, Trash2, DollarSign } from 'lucide-react';

// Sample portfolio data
const initialPortfolio = {
  cash: 100000, // $100k paper trading balance
  positions: [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 15, avgCost: 145.30, currentPrice: 165.80, value: 2487.00 },
    { symbol: 'MSFT', name: 'Microsoft Corp', shares: 10, avgCost: 290.45, currentPrice: 310.20, value: 3102.00 }
  ],
  watchlist: [
    { symbol: 'TSLA', name: 'Tesla Inc.', currentPrice: 220.30, change: 2.5, changePercent: 1.14 },
    { symbol: 'AMZN', name: 'Amazon.com Inc', currentPrice: 142.50, change: -0.75, changePercent: -0.52 },
    { symbol: 'NVDA', name: 'NVIDIA Corp', currentPrice: 510.40, change: 15.30, changePercent: 3.09 }
  ]
};

const WatchlistWidget = () => {
  const [portfolio, setPortfolio] = useState(initialPortfolio);
  const [activeTab, setActiveTab] = useState('positions');
  const [buyDialogOpen, setBuyDialogOpen] = useState(false);
  const [symbolToBuy, setSymbolToBuy] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [orderType, setOrderType] = useState('market');
  const [limitPrice, setLimitPrice] = useState('');
  
  // Calculate portfolio totals
  const totalPositionsValue = portfolio.positions.reduce((sum, pos) => sum + pos.value, 0);
  const totalPortfolioValue = portfolio.cash + totalPositionsValue;
  
  const handleBuy = (symbol: string) => {
    setSymbolToBuy(symbol);
    setBuyDialogOpen(true);
  };
  
  const executeBuy = () => {
    // Find the stock
    const stock = [...portfolio.positions, ...portfolio.watchlist].find(item => item.symbol === symbolToBuy);
    
    if (!stock) return;
    
    const shares = parseInt(quantity);
    const price = stock.currentPrice;
    const value = shares * price;
    
    // Check if we have enough cash
    if (value > portfolio.cash) {
      alert('Insufficient funds!');
      return;
    }
    
    // Find if we already own this stock
    const existingPosition = portfolio.positions.find(pos => pos.symbol === symbolToBuy);
    
    const newPositions = [...portfolio.positions];
    
    if (existingPosition) {
      // Update existing position
      const index = newPositions.findIndex(pos => pos.symbol === symbolToBuy);
      const totalShares = existingPosition.shares + shares;
      const totalCost = (existingPosition.shares * existingPosition.avgCost) + (shares * price);
      const newAvgCost = totalCost / totalShares;
      
      newPositions[index] = {
        ...existingPosition,
        shares: totalShares,
        avgCost: newAvgCost,
        value: totalShares * price
      };
    } else {
      // Add new position
      newPositions.push({
        symbol: symbolToBuy,
        name: stock.name,
        shares: shares,
        avgCost: price,
        currentPrice: price,
        value: value
      });
    }
    
    // Update portfolio
    setPortfolio({
      ...portfolio,
      cash: portfolio.cash - value,
      positions: newPositions
    });
    
    setBuyDialogOpen(false);
  };
  
  return (
    <>
      <div className="p-4 h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Portfolio</h3>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm text-gray-500">Value</span>
            <span className="text-xl font-bold">${totalPortfolioValue.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-gray-500">Cash</span>
            <span className="font-medium">${portfolio.cash.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Positions</span>
            <span className="font-medium">${totalPositionsValue.toFixed(2)}</span>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow flex flex-col">
          <TabsList>
            <TabsTrigger value="positions" className="flex-1">Positions</TabsTrigger>
            <TabsTrigger value="watchlist" className="flex-1">Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positions" className="flex-grow overflow-auto">
            {portfolio.positions.map((position) => (
              <div key={position.symbol} className="py-2 border-b">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{position.symbol}</span>
                  <span className="font-medium">${position.value.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{position.shares} shares @ ${position.avgCost.toFixed(2)}</span>
                  <span className={position.currentPrice > position.avgCost ? "text-green-500" : "text-red-500"}>
                    {position.currentPrice > position.avgCost ? "+" : ""}
                    {((position.currentPrice / position.avgCost - 1) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
            
            {portfolio.positions.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <DollarSign className="h-12 w-12 mb-2 opacity-50" />
                <p>No positions yet</p>
                <p className="text-xs">Your portfolio is empty</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="watchlist" className="flex-grow overflow-auto">
            {portfolio.watchlist.map((stock) => (
              <div key={stock.symbol} className="py-2 border-b">
                <div className="flex justify-between mb-1">
                  <div>
                    <span className="font-medium">{stock.symbol}</span>
                    <span className="text-xs text-gray-500 ml-1">{stock.name}</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => handleBuy(stock.symbol)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">${stock.currentPrice.toFixed(2)}</span>
                  <span className={stock.change >= 0 ? "text-green-500 flex items-center" : "text-red-500 flex items-center"}>
                    {stock.change >= 0 ? 
                      <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    }
                    {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            ))}
            
            <div className="mt-2">
              <Button variant="ghost" className="w-full flex items-center justify-center text-gray-500">
                <Plus className="h-4 w-4 mr-1" />
                Add to Watchlist
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Buy Dialog */}
      <Dialog open={buyDialogOpen} onOpenChange={setBuyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buy {symbolToBuy}</DialogTitle>
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
                />
              </div>
            )}
            <div className="border-t pt-2">
              <div className="flex justify-between">
                <span>Cash Available:</span>
                <span className="font-semibold">${portfolio.cash.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={executeBuy} className="bg-app-purple hover:bg-app-dark-purple">
              Buy {symbolToBuy}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default WatchlistWidget;