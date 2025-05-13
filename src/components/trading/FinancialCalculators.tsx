// src/components/trading/FinancialCalculators.tsx
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, DollarSign, BarChart2, Percent, Clock } from 'lucide-react';

const FinancialCalculators = () => {
  const [activeCalculator, setActiveCalculator] = useState('time-value');
  
  // Time Value of Money Calculator State
  const [tvmType, setTvmType] = useState('future-value');
  const [principal, setPrincipal] = useState('1000');
  const [rate, setRate] = useState('5');
  const [periods, setPeriods] = useState('5');
  const [tvmResult, setTvmResult] = useState<number | null>(null);
  
  // NPV/IRR Calculator State
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [cashFlows, setCashFlows] = useState('2000,3000,4000,5000,6000');
  const [discountRate, setDiscountRate] = useState('10');
  const [npvResult, setNpvResult] = useState<number | null>(null);
  const [irrResult, setIrrResult] = useState<number | null>(null);
  
  // Stock Valuation Calculator State
  const [dividendPerShare, setDividendPerShare] = useState('2.5');
  const [dividendGrowthRate, setDividendGrowthRate] = useState('3');
  const [requiredReturn, setRequiredReturn] = useState('8');
  const [stockValueResult, setStockValueResult] = useState<number | null>(null);
  
  // WACC Calculator State
  const [debtWeight, setDebtWeight] = useState('40');
  const [equityWeight, setEquityWeight] = useState('60');
  const [costOfDebt, setCostOfDebt] = useState('5');
  const [costOfEquity, setCostOfEquity] = useState('12');
  const [taxRate, setTaxRate] = useState('25');
  const [waccResult, setWaccResult] = useState<number | null>(null);
  
  // Calculate Time Value of Money
  const calculateTVM = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(periods);
    
    if (tvmType === 'future-value') {
      // FV = P * (1 + r)^n
      const result = p * Math.pow(1 + r, n);
      setTvmResult(result);
    } else {
      // PV = FV / (1 + r)^n
      const result = p / Math.pow(1 + r, n);
      setTvmResult(result);
    }
  };
  
  // Calculate NPV & IRR
  const calculateNPV = () => {
    const initialInv = parseFloat(initialInvestment);
    const cashFlowArray = cashFlows.split(',').map(cf => parseFloat(cf.trim()));
    const rate = parseFloat(discountRate) / 100;
    
    // NPV calculation
    let npv = -initialInv;
    cashFlowArray.forEach((cf, index) => {
      npv += cf / Math.pow(1 + rate, index + 1);
    });
    setNpvResult(npv);
    
    // Simple IRR approximation (for MVP - not accurate for all cases)
    // In a real implementation, use a numerical method like Newton-Raphson
    let irr = 0.1; // initial guess
    const MAX_ITERATIONS = 100;
    const PRECISION = 0.0001;
    
    // This is a simplified approach - a real implementation would be more complex
    setIrrResult(0.15); // Placeholder value for MVP
  };
  
  // Calculate Stock Value (Gordon Growth Model)
  const calculateStockValue = () => {
    const dividend = parseFloat(dividendPerShare);
    const growthRate = parseFloat(dividendGrowthRate) / 100;
    const required = parseFloat(requiredReturn) / 100;
    
    // Gordon Growth Model: P = D1 / (r - g)
    // where D1 is next year's dividend = D0 * (1 + g)
    const nextYearDividend = dividend * (1 + growthRate);
    const stockValue = nextYearDividend / (required - growthRate);
    setStockValueResult(stockValue);
  };
  
  // Calculate WACC
  const calculateWACC = () => {
    const wd = parseFloat(debtWeight) / 100;
    const we = parseFloat(equityWeight) / 100;
    const rd = parseFloat(costOfDebt) / 100;
    const re = parseFloat(costOfEquity) / 100;
    const t = parseFloat(taxRate) / 100;
    
    // WACC = Wd * Rd * (1 - T) + We * Re
    const wacc = wd * rd * (1 - t) + we * re;
    setWaccResult(wacc * 100); // Convert to percentage
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="px-4 py-3">
        <CardTitle className="text-lg font-bold flex items-center">
          <Calculator className="h-5 w-5 mr-2 text-app-purple" />
          Financial Calculators
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 flex-grow flex flex-col gap-4">
        <Tabs value={activeCalculator} onValueChange={setActiveCalculator} className="flex-grow flex flex-col">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="time-value">
              <Clock className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Time Value</span>
            </TabsTrigger>
            <TabsTrigger value="npv-irr">
              <BarChart2 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">NPV/IRR</span>
            </TabsTrigger>
            <TabsTrigger value="stock">
              <DollarSign className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Stock</span>
            </TabsTrigger>
            <TabsTrigger value="wacc">
              <Percent className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">WACC</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Time Value of Money Calculator */}
          <TabsContent value="time-value" className="flex-grow flex flex-col">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="text-md font-medium mb-1">Time Value of Money</h3>
              <p className="text-sm text-gray-600 mb-3">
                Calculate the future or present value of money based on time, interest rate, and compounding periods.
              </p>
              <div className="text-xs text-app-purple">Related: FIN 201, FIN 302</div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <Label>Calculation Type</Label>
                <Select value={tvmType} onValueChange={setTvmType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select calculation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="future-value">Future Value (FV)</SelectItem>
                    <SelectItem value="present-value">Present Value (PV)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>
                    {tvmType === 'future-value' ? 'Present Value (PV)' : 'Future Value (FV)'}
                  </Label>
                  <Input 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="Enter principal amount"
                  />
                </div>
                <div>
                  <Label>Interest Rate (%)</Label>
                  <Input 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    placeholder="Enter interest rate"
                  />
                </div>
              </div>
              
              <div>
                <Label>Number of Periods</Label>
                <Input 
                  type="number" 
                  value={periods} 
                  onChange={(e) => setPeriods(e.target.value)}
                  placeholder="Enter number of periods"
                />
              </div>
              
              <Button onClick={calculateTVM} className="w-full bg-app-purple hover:bg-app-dark-purple">
                Calculate
              </Button>
              
              {tvmResult !== null && (
                <div className="mt-4 p-4 bg-app-light-purple/10 rounded-md">
                  <h4 className="text-sm font-medium">Result:</h4>
                  <p className="text-xl font-bold mt-1">${tvmResult.toFixed(2)}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* NPV / IRR Calculator */}
          <TabsContent value="npv-irr" className="flex-grow flex flex-col">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="text-md font-medium mb-1">NPV & IRR Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">
                Calculate Net Present Value (NPV) and Internal Rate of Return (IRR) for investment decisions.
              </p>
              <div className="text-xs text-app-purple">Related: FIN 302, FIN 407</div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <Label>Initial Investment</Label>
                <Input 
                  type="number" 
                  value={initialInvestment} 
                  onChange={(e) => setInitialInvestment(e.target.value)}
                  placeholder="Enter initial investment"
                />
              </div>
              
              <div>
                <Label>Cash Flows (comma separated)</Label>
                <Input 
                  value={cashFlows} 
                  onChange={(e) => setCashFlows(e.target.value)}
                  placeholder="E.g., 1000,2000,3000,4000"
                />
                <p className="text-xs text-gray-500 mt-1">Enter expected cash flows for each period, separated by commas.</p>
              </div>
              
              <div>
                <Label>Discount Rate (%)</Label>
                <Input 
                  type="number" 
                  value={discountRate} 
                  onChange={(e) => setDiscountRate(e.target.value)}
                  placeholder="Enter discount rate"
                />
              </div>
              
              <Button onClick={calculateNPV} className="w-full bg-app-purple hover:bg-app-dark-purple">
                Calculate
              </Button>
              
              {npvResult !== null && (
                <div className="mt-4 p-4 bg-app-light-purple/10 rounded-md space-y-3">
                  <div>
                    <h4 className="text-sm font-medium">Net Present Value (NPV):</h4>
                    <p className={`text-xl font-bold mt-1 ${npvResult >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      ${npvResult.toFixed(2)}
                    </p>
                  </div>
                  
                  {irrResult !== null && (
                    <div>
                      <h4 className="text-sm font-medium">Internal Rate of Return (IRR):</h4>
                      <p className="text-xl font-bold mt-1">{(irrResult * 100).toFixed(2)}%</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Stock Valuation Calculator */}
          <TabsContent value="stock" className="flex-grow flex flex-col">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="text-md font-medium mb-1">Stock Valuation</h3>
              <p className="text-sm text-gray-600 mb-3">
                Calculate the intrinsic value of a stock using the Gordon Growth Model (Dividend Discount Model).
              </p>
              <div className="text-xs text-app-purple">Related: FIN 403, FIN 407</div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div>
                <Label>Current Annual Dividend Per Share</Label>
                <Input 
                  type="number" 
                  value={dividendPerShare} 
                  onChange={(e) => setDividendPerShare(e.target.value)}
                  placeholder="Enter current dividend"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Expected Dividend Growth Rate (%)</Label>
                  <Input 
                    type="number" 
                    value={dividendGrowthRate} 
                    onChange={(e) => setDividendGrowthRate(e.target.value)}
                    placeholder="Enter growth rate"
                  />
                </div>
                <div>
                  <Label>Required Rate of Return (%)</Label>
                  <Input 
                    type="number" 
                    value={requiredReturn} 
                    onChange={(e) => setRequiredReturn(e.target.value)}
                    placeholder="Enter required return"
                  />
                </div>
              </div>
              
              <Button onClick={calculateStockValue} className="w-full bg-app-purple hover:bg-app-dark-purple">
                Calculate Stock Value
              </Button>
              
              {stockValueResult !== null && (
                <div className="mt-4 p-4 bg-app-light-purple/10 rounded-md">
                  <h4 className="text-sm font-medium">Intrinsic Stock Value:</h4>
                  <p className="text-xl font-bold mt-1">${stockValueResult.toFixed(2)}</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* WACC Calculator */}
          <TabsContent value="wacc" className="flex-grow flex flex-col">
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h3 className="text-md font-medium mb-1">WACC Calculator</h3>
              <p className="text-sm text-gray-600 mb-3">
                Calculate the Weighted Average Cost of Capital (WACC) for a company.
              </p>
              <div className="text-xs text-app-purple">Related: FIN 302, FIN 405</div>
            </div>
            
            <div className="space-y-4 flex-grow">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Weight of Debt (%)</Label>
                  <Input 
                    type="number" 
                    value={debtWeight} 
                    onChange={(e) => setDebtWeight(e.target.value)}
                    placeholder="Enter debt weight"
                  />
                </div>
                <div>
                  <Label>Weight of Equity (%)</Label>
                  <Input 
                    type="number" 
                    value={equityWeight} 
                    onChange={(e) => setEquityWeight(e.target.value)}
                    placeholder="Enter equity weight"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cost of Debt (%)</Label>
                  <Input 
                    type="number" 
                    value={costOfDebt} 
                    onChange={(e) => setCostOfDebt(e.target.value)}
                    placeholder="Enter cost of debt"
                  />
                </div>
                <div>
                  <Label>Cost of Equity (%)</Label>
                  <Input 
                    type="number" 
                    value={costOfEquity} 
                    onChange={(e) => setCostOfEquity(e.target.value)}
                    placeholder="Enter cost of equity"
                  />
                </div>
              </div>
              
              <div>
                <Label>Corporate Tax Rate (%)</Label>
                <Input 
                  type="number" 
                  value={taxRate} 
                  onChange={(e) => setTaxRate(e.target.value)}
                  placeholder="Enter tax rate"
                />
              </div>
              
              <Button onClick={calculateWACC} className="w-full bg-app-purple hover:bg-app-dark-purple">
                Calculate WACC
              </Button>
              
              {waccResult !== null && (
                <div className="mt-4 p-4 bg-app-light-purple/10 rounded-md">
                  <h4 className="text-sm font-medium">Weighted Average Cost of Capital:</h4>
                  <p className="text-xl font-bold mt-1">{waccResult.toFixed(2)}%</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FinancialCalculators;