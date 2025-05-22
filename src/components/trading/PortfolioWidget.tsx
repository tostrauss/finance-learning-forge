// src/components/trading/PortfolioWidget.tsx
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight, DollarSign, Activity, PlusCircle, MinusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { usePaperTrading } from '@/hooks/usePaperTrading';
import { useToast } from '@/hooks/use-toast';

// Colors for pie chart
const COLORS = ['#6b3fa0', '#9b87f5', '#ff4088', '#ff9f4a'];

// Performance data - will be replaced with real data in a production app
const performanceData = [
  { date: '05/01', value: 9850 },
  { date: '05/02', value: 9920 },
  { date: '05/03', value: 9880 },
  { date: '05/06', value: 10050 },
  { date: '05/07', value: 10120 },
  { date: '05/08', value: 10200 },
  { date: '05/09', value: 10350 },
  { date: '05/10', value: 10385 },
];

// Define or import PaperMetrics type
interface PaperMetrics {
  totalValue: number;
  cashBalance: number;
  totalGain: number;
  dayGain: number; // Assuming this exists based on usage
  dayGainPercent: number; // Assuming this exists
  // Add any other properties that paperMetrics from usePaperTrading might have
}

// Assuming PaperPosition and SimulationSettings types are accessible
// If not, they might need to be imported from where they are defined or redefined here.
interface PaperPosition {
  symbol: string;
  name: string;
  shares: number;
  avgCost: number;
  currentPrice: number;
  value: number;
  gain: number;
  gainPercent: number;
}

interface SimulationSettings {
  id: string;
  name: string;
  startingCash: number;
}

interface PortfolioWidgetProps {
  allSimulations: SimulationSettings[];
  activePortfolioId: string | null;
  activePortfolioName?: string;
  onPortfolioChange: (id: string) => void;
  
  tradeableSecuritySymbol?: string;
  tradeableSecurityPrice?: number | null;
  tradeableSecurityName?: string;

  executeBuyAction: (marketSymbol: string, name: string, price: number, shares: number) => Promise<void>;
  executeSellAction: (marketSymbol: string, price: number, shares: number) => Promise<void>;
  // currentPortfolioCash: number; // This will come from currentPortfolioMetrics
  currentPortfolioPositions: PaperPosition[] | undefined; // Allow undefined initially if that's possible
  currentPortfolioMetrics: PaperMetrics | null; // <<<< ADD THIS PROP
}

const PortfolioWidget: React.FC<PortfolioWidgetProps> = ({
  allSimulations,
  activePortfolioId,
  activePortfolioName,
  onPortfolioChange,
  tradeableSecuritySymbol,
  tradeableSecurityPrice,
  tradeableSecurityName,
  executeBuyAction,
  executeSellAction,
  // currentPortfolioCash, // Remove if it's part of metrics
  currentPortfolioPositions,
  currentPortfolioMetrics, // <<<< DESTRUCTURE THIS PROP
}) => {
  const { toast } = useToast();
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeShares, setTradeShares] = useState('10');
  const [quantity, setQuantity] = useState('');
  const [amount, setAmount] = useState(''); // Total dollar amount
  const [tradeError, setTradeError] = useState<string | null>(null);

  // Effect to auto-calculate amount when quantity or tradeableSecurityPrice changes
  useEffect(() => {
    const qtyNum = parseInt(quantity, 10);
    if (tradeableSecurityPrice && qtyNum > 0) {
      setAmount((qtyNum * tradeableSecurityPrice).toFixed(2));
    } else if (!quantity) {
      // setAmount(''); // Optionally clear amount if quantity is cleared
    }
  }, [quantity, tradeableSecurityPrice]);

  // Reset quantity and amount when the tradeable security changes
  useEffect(() => {
    setQuantity('');
    setAmount('');
    setTradeError(null);
  }, [tradeableSecuritySymbol]);
  
  // Calculate allocation data for pie chart
  const allocationData = (currentPortfolioPositions && currentPortfolioPositions.length > 0)
    ? currentPortfolioPositions.map(pos => ({ name: pos.symbol, value: pos.value }))
    : [{ name: 'Cash', value: currentPortfolioMetrics?.cashBalance || 0 }]; // Use metrics here

  // Handle opening trade dialog
  const openTradeDialog = (type: 'buy' | 'sell') => {
    if (!tradeableSecuritySymbol || !tradeableSecurityPrice) {
      toast({ 
        title: "Cannot execute trade",
        description: "Please select a stock first",
        variant: "destructive"
      });
      return;
    }
    
    if (type === 'sell') {
      const position = currentPortfolioPositions?.find(p => p.symbol === tradeableSecuritySymbol);
      if (!position) {
        toast({ 
          title: "Cannot Sell",
          description: `You don't own any shares of ${tradeableSecuritySymbol}`,
          variant: "destructive"
        });
        return;
      }
      setTradeShares(position.shares.toString());
    } else {
      // Use metrics for cash balance
      const maxShares = currentPortfolioMetrics ? Math.floor(currentPortfolioMetrics.cashBalance / tradeableSecurityPrice) : 0;
      setTradeShares(Math.min(10, maxShares > 0 ? maxShares : 10).toString()); // ensure maxShares isn't 0 if cash is 0
    }
    
    setTradeType(type);
    setTradeDialogOpen(true);
  };
  
  // Handle executing a trade
  const executeTrade = async () => { // Make async if actions are async
    if (!tradeableSecuritySymbol || !tradeableSecurityPrice) return;
    
    const shares = parseInt(tradeShares);
    if (isNaN(shares) || shares <= 0) {
      toast({ 
        title: "Invalid Shares",
        description: "Please enter a valid number of shares",
        variant: "destructive"
      });
      return;
    }
    
    try {
      if (tradeType === 'buy') {
        // Check cash from metrics before buying
        if (currentPortfolioMetrics && (shares * tradeableSecurityPrice) > currentPortfolioMetrics.cashBalance) {
            toast({
                title: "Insufficient Funds",
                description: "Not enough cash to complete this purchase.",
                variant: "destructive"
            });
            return;
        }
        await executeBuyAction(tradeableSecuritySymbol, tradeableSecurityName || tradeableSecuritySymbol, tradeableSecurityPrice, shares);
        toast({ 
          title: "Trade Executed",
          description: `Bought ${shares} shares of ${tradeableSecuritySymbol} at $${tradeableSecurityPrice.toFixed(2)}`
        });
      } else {
        await executeSellAction(tradeableSecuritySymbol, tradeableSecurityPrice, shares);
        toast({ 
          title: "Trade Executed",
          description: `Sold ${shares} shares of ${tradeableSecuritySymbol} at $${tradeableSecurityPrice.toFixed(2)}`
        });
      }
      setTradeDialogOpen(false);
    } catch (error: any) { // Explicitly type error
      toast({ 
        title: "Trade Failed",
        description: error.message || "An unknown error occurred",
        variant: "destructive"
      });
    }
  };
  
  // Update prices of existing positions (in a real app, this would fetch current prices)
  const updatePositionPrices = () => {
    if (tradeableSecuritySymbol && tradeableSecurityPrice && currentPortfolioPositions?.some(p => p.symbol === tradeableSecuritySymbol)) {
      // In a real implementation, you would update all positions with current prices
      // This is just updating the selected symbol for demo purposes
      toast({
        title: "Prices Updated",
        description: "Portfolio values have been refreshed"
      });
    }
  };

  const handleExecuteInternalTrade = async (action: 'buy' | 'sell') => {
    setTradeError(null);
    const quantityNum = parseInt(quantity, 10);
    const totalAmountNum = parseFloat(amount);

    if (!activePortfolioId) {
      setTradeError('No active portfolio selected in widget.');
      return;
    }
    if (!tradeableSecuritySymbol || !tradeableSecurityPrice) {
      setTradeError('No security selected for trading.');
      return;
    }
    if (isNaN(quantityNum) || quantityNum <= 0) {
      setTradeError('Please enter a valid quantity.');
      return;
    }
    if (isNaN(totalAmountNum) || totalAmountNum <= 0) {
        setTradeError('Please enter or calculate a valid total amount.');
        return;
    }

    // Use the price of the security that was passed in
    const pricePerShareToExecute = tradeableSecurityPrice;

    // Validate amount against calculated amount if needed, or trust tradeableSecurityPrice
    // For simplicity, we'll trust tradeableSecurityPrice and quantity to derive the cost.
    const costOfTrade = quantityNum * pricePerShareToExecute;

    // Use metrics for cash balance
    if (action === 'buy' && currentPortfolioMetrics && costOfTrade > currentPortfolioMetrics.cashBalance) {
      setTradeError(`Insufficient cash. Trade cost: $${costOfTrade.toFixed(2)}, Available: $${currentPortfolioMetrics.cashBalance.toFixed(2)}`);
      return;
    }

    try {
      const securityName = tradeableSecurityName || tradeableSecuritySymbol;
      if (action === 'buy') {
        await executeBuyAction(tradeableSecuritySymbol, securityName, pricePerShareToExecute, quantityNum);
      } else {
        await executeSellAction(tradeableSecuritySymbol, pricePerShareToExecute, quantityNum);
      }
      setQuantity('');
      setAmount('');
    } catch (error: any) {
      setTradeError(error.message || 'Trade execution failed.');
    }
  };

  // Conditional rendering if metrics are not yet available
  if (!currentPortfolioMetrics) {
    return (
        <Card className="h-full flex flex-col items-center justify-center">
            <CardHeader>
                <CardTitle className="text-lg font-bold">Portfolio</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Loading portfolio data...</p>
                {/* Or show a spinner/skeleton loader */}
            </CardContent>
        </Card>
    );
  }

  // Now use currentPortfolioMetrics instead of the undefined 'metrics'
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg font-bold">Portfolio</CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        {/* Portfolio summary */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Portfolio Value</p>
            {/* Assuming totalValue in metrics includes cash. If not, adjust. */}
            <p className="text-2xl font-bold">${(currentPortfolioMetrics.totalValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Today's Change</p>
            <div className={`text-lg font-bold flex items-center justify-end ${currentPortfolioMetrics.dayGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentPortfolioMetrics.dayGain >= 0 ? 
                <ArrowUpRight className="h-5 w-5 mr-1" /> : 
                <ArrowDownRight className="h-5 w-5 mr-1" />
              }
              ${currentPortfolioMetrics.dayGain.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({currentPortfolioMetrics.dayGainPercent.toFixed(2)}%)
            </div>
          </div>
        </div>
        
        {/* Quick stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <DollarSign className="h-4 w-4 mr-1" />
              <p className="text-sm">Cash Balance</p>
            </div>
            <p className="text-lg font-bold">${currentPortfolioMetrics.cashBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          <div className="bg-gray-50 rounded-md p-3">
            <div className="flex items-center text-gray-600 mb-1">
              <Activity className="h-4 w-4 mr-1" />
              <p className="text-sm">Total Return</p>
            </div>
            <p className={`text-lg font-bold ${currentPortfolioMetrics.totalGain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {currentPortfolioMetrics.totalGain >= 0 ? '+' : ''}${currentPortfolioMetrics.totalGain.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
        </div>
        
        {/* Trade buttons */}
        <div className="flex gap-3">
          <Button 
            onClick={() => openTradeDialog('buy')} 
            className="flex-1 bg-app-purple hover:bg-app-dark-purple"
            disabled={!tradeableSecuritySymbol || !tradeableSecurityPrice}
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Buy
          </Button>
          <Button 
            onClick={() => openTradeDialog('sell')} 
            variant="outline" 
            className="flex-1 border-app-purple text-app-purple hover:bg-app-light-purple/10"
            disabled={!tradeableSecuritySymbol || !tradeableSecurityPrice || !currentPortfolioPositions?.some(p => p.symbol === tradeableSecuritySymbol)}
          >
            <MinusCircle className="mr-1 h-4 w-4" />
            Sell
          </Button>
        </div>
        
        {/* Portfolio tabs */}
        <Tabs defaultValue="positions" className="flex-grow flex flex-col">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="positions" className="flex-grow overflow-auto">
            {currentPortfolioPositions && currentPortfolioPositions.length > 0 ? (
              <div className="divide-y">
                {currentPortfolioPositions.map(position => (
                  <div key={position.symbol} className="py-3 flex justify-between">
                    <div>
                      <p className="font-medium">{position.symbol}</p>
                      <p className="text-xs text-gray-500">{position.name || position.symbol}</p>
                      <p className="text-sm">{position.shares} shares @ ${position.avgCost.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                      <p className={`text-xs flex items-center justify-end ${position.gain >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {position.gain >= 0 ? 
                          <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        }
                        ${Math.abs(position.gain).toFixed(2)} ({position.gainPercent.toFixed(2)}%)
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-4">
                <p>No positions in your portfolio yet.</p>
                <p className="text-sm mt-2">Search for a stock and click Buy to start trading.</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="performance" className="flex-grow">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    domain={['auto', 'auto']} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <Tooltip formatter={(value) => [`$${value}`, 'Portfolio Value']} />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#6b3fa0" 
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Portfolio performance over the last 7 trading days
            </div>
          </TabsContent>
          
          <TabsContent value="allocation" className="flex-grow">
            <div className="h-64 flex justify-center">
              <ResponsiveContainer width="80%" height="100%">
                <PieChart>
                  <Pie
                    data={allocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {allocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${parseFloat(value.toString()).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Value']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-3 text-xs text-gray-500 text-center">
              Portfolio allocation by symbol
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      {/* Trade Dialog */}
      <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {tradeType === 'buy' ? 'Buy' : 'Sell'} {tradeableSecuritySymbol}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="shares">Number of Shares</Label>
              <Input
                id="shares"
                type="number"
                min="1"
                value={tradeShares}
                onChange={(e) => setTradeShares(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label>Trade Summary</Label>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="flex justify-between text-sm">
                  <span>Price per Share:</span>
                  <span>${tradeableSecurityPrice?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span>Total Value:</span>
                  <span>${(parseFloat(tradeShares) * (tradeableSecurityPrice || 0)).toFixed(2)}</span>
                </div>
                {tradeType === 'buy' && (
                  <div className="flex justify-between text-sm mt-1">
                    <span>Cash Remaining After Trade:</span>
                    <span>${(currentPortfolioMetrics.cashBalance - (parseFloat(tradeShares) * (tradeableSecurityPrice || 0))).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTradeDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={executeTrade}
              className="bg-app-purple hover:bg-app-dark-purple"
            >
              Confirm {tradeType === 'buy' ? 'Purchase' : 'Sale'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PortfolioWidget;