import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Slider } from '../ui/slider';

// Types for banking calculations
interface ReserveRequirementResult {
  requiredReserves: number;
  excessReserves: number;
  loanableAmount: number;
  moneyMultiplier: number;
}

interface InterestSpreadResult {
  netInterestMargin: number;
  interestSpread: number;
  returnOnAssets: number;
}

interface CreditRiskResult {
  probabilityOfDefault: number;
  lossGivenDefault: number;
  expectedLoss: number;
  riskAdjustedReturn: number;
}

const BankingTools: React.FC = () => {
  // State for Reserve Requirements Calculator
  const [deposits, setDeposits] = useState('1000000');
  const [reserveRatio, setReserveRatio] = useState('10');
  const [actualReserves, setActualReserves] = useState('150000');
  const [reserveResult, setReserveResult] = useState<ReserveRequirementResult | null>(null);

  // State for Interest Spread Analysis
  const [loanRate, setLoanRate] = useState('6.5');
  const [depositRate, setDepositRate] = useState('2.0');
  const [totalAssets, setTotalAssets] = useState('10000000');
  const [netIncome, setNetIncome] = useState('450000');
  const [spreadResult, setSpreadResult] = useState<InterestSpreadResult | null>(null);

  // State for Credit Risk Assessment
  const [loanAmount, setLoanAmount] = useState('500000');
  const [creditScore, setCreditScore] = useState('700');
  const [collateralValue, setCollateralValue] = useState('400000');
  const [industryRisk, setIndustryRisk] = useState('medium');
  const [riskResult, setRiskResult] = useState<CreditRiskResult | null>(null);

  // Calculate Reserve Requirements
  const calculateReserves = () => {
    const depositAmount = parseFloat(deposits);
    const ratio = parseFloat(reserveRatio) / 100;
    const reserves = parseFloat(actualReserves);

    const requiredReserves = depositAmount * ratio;
    const excessReserves = reserves - requiredReserves;
    const loanableAmount = excessReserves > 0 ? excessReserves : 0;
    const moneyMultiplier = 1 / ratio;

    setReserveResult({
      requiredReserves,
      excessReserves,
      loanableAmount,
      moneyMultiplier
    });
  };

  // Calculate Interest Spread
  const calculateSpread = () => {
    const loan = parseFloat(loanRate);
    const deposit = parseFloat(depositRate);
    const assets = parseFloat(totalAssets);
    const income = parseFloat(netIncome);

    const interestSpread = loan - deposit;
    const netInterestMargin = (income / assets) * 100;
    const returnOnAssets = (income / assets) * 100;

    setSpreadResult({
      netInterestMargin,
      interestSpread,
      returnOnAssets
    });
  };

  // Calculate Credit Risk
  const calculateCreditRisk = () => {
    const amount = parseFloat(loanAmount);
    const score = parseFloat(creditScore);
    const collateral = parseFloat(collateralValue);
    
    // Simple credit risk model
    const pdBase = Math.max(0, Math.min(1, (850 - score) / 850));
    const industryMultiplier = 
      industryRisk === 'low' ? 0.8 : 
      industryRisk === 'medium' ? 1.0 : 1.2;
    
    const probabilityOfDefault = pdBase * industryMultiplier;
    const lossGivenDefault = Math.max(0, (amount - collateral) / amount);
    const expectedLoss = amount * probabilityOfDefault * lossGivenDefault;
    const riskAdjustedReturn = (parseFloat(loanRate) / 100) - (probabilityOfDefault * lossGivenDefault);

    setRiskResult({
      probabilityOfDefault,
      lossGivenDefault,
      expectedLoss,
      riskAdjustedReturn
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Banking Operations Simulator</h1>
      
      <Tabs defaultValue="reserves" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reserves">Reserve Requirements</TabsTrigger>
          <TabsTrigger value="spread">Interest Spread</TabsTrigger>
          <TabsTrigger value="credit">Credit Risk</TabsTrigger>
        </TabsList>

        {/* Reserve Requirements Calculator */}
        <TabsContent value="reserves">
          <Card>
            <CardHeader>
              <CardTitle>Reserve Requirements Calculator</CardTitle>
              <CardDescription>
                Calculate required reserves, excess reserves, and potential money creation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="deposits">Total Deposits ($)</Label>
                  <Input
                    id="deposits"
                    value={deposits}
                    onChange={(e) => setDeposits(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reserveRatio">Reserve Ratio (%)</Label>
                  <Input
                    id="reserveRatio"
                    value={reserveRatio}
                    onChange={(e) => setReserveRatio(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="actualReserves">Actual Reserves ($)</Label>
                  <Input
                    id="actualReserves"
                    value={actualReserves}
                    onChange={(e) => setActualReserves(e.target.value)}
                    type="number"
                  />
                </div>
              </div>
              
              <Button onClick={calculateReserves} className="w-full">
                Calculate
              </Button>

              {reserveResult && (
                <div className="mt-4 space-y-2">
                  <p>Required Reserves: ${reserveResult.requiredReserves.toFixed(2)}</p>
                  <p>Excess Reserves: ${reserveResult.excessReserves.toFixed(2)}</p>
                  <p>Loanable Amount: ${reserveResult.loanableAmount.toFixed(2)}</p>
                  <p>Money Multiplier: {reserveResult.moneyMultiplier.toFixed(2)}x</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Interest Spread Analysis */}
        <TabsContent value="spread">
          <Card>
            <CardHeader>
              <CardTitle>Interest Spread Analysis</CardTitle>
              <CardDescription>
                Analyze bank's interest spread and profitability metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanRate">Average Loan Rate (%)</Label>
                  <Input
                    id="loanRate"
                    value={loanRate}
                    onChange={(e) => setLoanRate(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="depositRate">Average Deposit Rate (%)</Label>
                  <Input
                    id="depositRate"
                    value={depositRate}
                    onChange={(e) => setDepositRate(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="totalAssets">Total Assets ($)</Label>
                  <Input
                    id="totalAssets"
                    value={totalAssets}
                    onChange={(e) => setTotalAssets(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="netIncome">Net Interest Income ($)</Label>
                  <Input
                    id="netIncome"
                    value={netIncome}
                    onChange={(e) => setNetIncome(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button onClick={calculateSpread} className="w-full">
                Calculate
              </Button>

              {spreadResult && (
                <div className="mt-4 space-y-2">
                  <p>Interest Spread: {spreadResult.interestSpread.toFixed(2)}%</p>
                  <p>Net Interest Margin: {spreadResult.netInterestMargin.toFixed(2)}%</p>
                  <p>Return on Assets: {spreadResult.returnOnAssets.toFixed(2)}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Credit Risk Assessment */}
        <TabsContent value="credit">
          <Card>
            <CardHeader>
              <CardTitle>Credit Risk Assessment</CardTitle>
              <CardDescription>
                Evaluate credit risk and expected loss for loans
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input
                    id="loanAmount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="creditScore">Credit Score</Label>
                  <Input
                    id="creditScore"
                    value={creditScore}
                    onChange={(e) => setCreditScore(e.target.value)}
                    type="number"
                    min="300"
                    max="850"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collateralValue">Collateral Value ($)</Label>
                  <Input
                    id="collateralValue"
                    value={collateralValue}
                    onChange={(e) => setCollateralValue(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industryRisk">Industry Risk Level</Label>
                  <Select value={industryRisk} onValueChange={setIndustryRisk}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={calculateCreditRisk} className="w-full">
                Calculate Risk
              </Button>

              {riskResult && (
                <div className="mt-4 space-y-2">
                  <p>Probability of Default: {(riskResult.probabilityOfDefault * 100).toFixed(2)}%</p>
                  <p>Loss Given Default: {(riskResult.lossGivenDefault * 100).toFixed(2)}%</p>
                  <p>Expected Loss: ${riskResult.expectedLoss.toFixed(2)}</p>
                  <p>Risk-Adjusted Return: {(riskResult.riskAdjustedReturn * 100).toFixed(2)}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BankingTools;