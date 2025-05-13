import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Switch } from '../ui/switch';

// Types for calculations
interface DCFResult {
  netPresentValue: number;
  terminalValue: number;
  totalValue: number;
  valuePerShare: number;
}

interface CapitalBudgetingResult {
  npv: number;
  irr: number;
  paybackPeriod: number;
  profitabilityIndex: number;
}

interface MandAResult {
  enterpriseValue: number;
  equityValue: number;
  postSynergyValue: number;
  accretionDilution: number;
}

interface WACCResult {
  wacc: number;
  costOfEquity: number;
  afterTaxCostOfDebt: number;
}

const CorporateFinanceTools: React.FC = () => {
  // DCF Valuation State
  const [fcf, setFcf] = useState('1000000');
  const [growthRate, setGrowthRate] = useState('3');
  const [discountRate, setDiscountRate] = useState('10');
  const [periods, setPeriods] = useState('5');
  const [sharesOutstanding, setSharesOutstanding] = useState('1000000');
  const [dcfResult, setDcfResult] = useState<DCFResult | null>(null);

  // Capital Budgeting State
  const [initialInvestment, setInitialInvestment] = useState('5000000');
  const [cashFlows, setCashFlows] = useState('1000000,1500000,2000000,2500000,3000000');
  const [requiredReturn, setRequiredReturn] = useState('12');
  const [budgetingResult, setBudgetingResult] = useState<CapitalBudgetingResult | null>(null);

  // M&A Analysis State
  const [targetRevenue, setTargetRevenue] = useState('100000000');
  const [targetEBITDA, setTargetEBITDA] = useState('15000000');
  const [targetDebt, setTargetDebt] = useState('20000000');
  const [synergies, setSynergies] = useState('5000000');
  const [multiple, setMultiple] = useState('8');
  const [mandaResult, setMandaResult] = useState<MandAResult | null>(null);

  // WACC Calculator State
  const [equityWeight, setEquityWeight] = useState('60');
  const [debtWeight, setDebtWeight] = useState('40');
  const [costOfEquity, setCostOfEquity] = useState('12');
  const [costOfDebt, setCostOfDebt] = useState('6');
  const [taxRate, setTaxRate] = useState('25');
  const [waccResult, setWaccResult] = useState<WACCResult | null>(null);

  // Calculate DCF Valuation
  const calculateDCF = () => {
    const fcfValue = parseFloat(fcf);
    const growth = parseFloat(growthRate) / 100;
    const discount = parseFloat(discountRate) / 100;
    const numPeriods = parseInt(periods);
    const shares = parseFloat(sharesOutstanding);

    let presentValue = 0;
    let currentFcf = fcfValue;

    // Calculate PV of explicit forecast period
    for (let i = 1; i <= numPeriods; i++) {
      currentFcf *= (1 + growth);
      presentValue += currentFcf / Math.pow(1 + discount, i);
    }

    // Terminal value calculation (Gordon Growth)
    const terminalFcf = currentFcf * (1 + growth);
    const terminalValue = terminalFcf / (discount - growth);
    const terminalPV = terminalValue / Math.pow(1 + discount, numPeriods);

    const totalValue = presentValue + terminalPV;
    const valuePerShare = totalValue / shares;

    setDcfResult({
      netPresentValue: presentValue,
      terminalValue: terminalPV,
      totalValue,
      valuePerShare
    });
  };

  // Calculate Capital Budgeting Metrics
  const calculateCapitalBudgeting = () => {
    const initial = parseFloat(initialInvestment);
    const cfArray = cashFlows.split(',').map(cf => parseFloat(cf));
    const rate = parseFloat(requiredReturn) / 100;

    // Calculate NPV
    const npv = cfArray.reduce((acc, cf, i) => 
      acc + cf / Math.pow(1 + rate, i + 1), -initial
    );

    // Calculate IRR using basic iteration
    let irr = 0;
    let step = 0.01;
    let currentNpv = npv;
    
    while (Math.abs(currentNpv) > 1 && irr < 1) {
      currentNpv = cfArray.reduce((acc, cf, i) => 
        acc + cf / Math.pow(1 + irr, i + 1), -initial
      );
      irr += step;
    }

    // Calculate Payback Period
    let cumulativeCf = -initial;
    let paybackPeriod = 0;
    for (let i = 0; i < cfArray.length; i++) {
      cumulativeCf += cfArray[i];
      if (cumulativeCf >= 0 && paybackPeriod === 0) {
        paybackPeriod = i + 1 + (cumulativeCf - cfArray[i]) / cfArray[i];
      }
    }

    // Calculate Profitability Index
    const pvOfCashFlows = cfArray.reduce((acc, cf, i) => 
      acc + cf / Math.pow(1 + rate, i + 1), 0
    );
    const profitabilityIndex = pvOfCashFlows / initial;

    setBudgetingResult({
      npv,
      irr: irr * 100,
      paybackPeriod,
      profitabilityIndex
    });
  };

  // Calculate M&A Analysis
  const calculateMandA = () => {
    const revenue = parseFloat(targetRevenue);
    const ebitda = parseFloat(targetEBITDA);
    const debt = parseFloat(targetDebt);
    const synergyValue = parseFloat(synergies);
    const evMultiple = parseFloat(multiple);

    const enterpriseValue = ebitda * evMultiple;
    const equityValue = enterpriseValue - debt;
    const postSynergyValue = enterpriseValue + synergyValue;
    const accretionDilution = ((postSynergyValue - enterpriseValue) / enterpriseValue) * 100;

    setMandaResult({
      enterpriseValue,
      equityValue,
      postSynergyValue,
      accretionDilution
    });
  };

  // Calculate WACC
  const calculateWACC = () => {
    const eWeight = parseFloat(equityWeight) / 100;
    const dWeight = parseFloat(debtWeight) / 100;
    const ke = parseFloat(costOfEquity) / 100;
    const kd = parseFloat(costOfDebt) / 100;
    const tax = parseFloat(taxRate) / 100;

    const afterTaxCostOfDebt = kd * (1 - tax);
    const wacc = (ke * eWeight) + (afterTaxCostOfDebt * dWeight);

    setWaccResult({
      wacc: wacc * 100,
      costOfEquity: ke * 100,
      afterTaxCostOfDebt: afterTaxCostOfDebt * 100
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Corporate Finance Tools</h1>

      <Tabs defaultValue="dcf" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dcf">DCF Valuation</TabsTrigger>
          <TabsTrigger value="capital">Capital Budgeting</TabsTrigger>
          <TabsTrigger value="manda">M&A Analysis</TabsTrigger>
          <TabsTrigger value="wacc">WACC Calculator</TabsTrigger>
        </TabsList>

        {/* DCF Valuation Tool */}
        <TabsContent value="dcf">
          <Card>
            <CardHeader>
              <CardTitle>Discounted Cash Flow Valuation</CardTitle>
              <CardDescription>
                Calculate firm value using DCF methodology
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fcf">Free Cash Flow ($)</Label>
                  <Input
                    id="fcf"
                    value={fcf}
                    onChange={(e) => setFcf(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="growthRate">Growth Rate (%)</Label>
                  <Input
                    id="growthRate"
                    value={growthRate}
                    onChange={(e) => setGrowthRate(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountRate">Discount Rate (%)</Label>
                  <Input
                    id="discountRate"
                    value={discountRate}
                    onChange={(e) => setDiscountRate(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="periods">Forecast Periods</Label>
                  <Input
                    id="periods"
                    value={periods}
                    onChange={(e) => setPeriods(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shares">Shares Outstanding</Label>
                  <Input
                    id="shares"
                    value={sharesOutstanding}
                    onChange={(e) => setSharesOutstanding(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button onClick={calculateDCF} className="w-full">
                Calculate Value
              </Button>

              {dcfResult && (
                <div className="mt-4 space-y-2">
                  <p>Net Present Value of FCF: ${dcfResult.netPresentValue.toFixed(2)}</p>
                  <p>Present Value of Terminal Value: ${dcfResult.terminalValue.toFixed(2)}</p>
                  <p>Total Enterprise Value: ${dcfResult.totalValue.toFixed(2)}</p>
                  <p>Value per Share: ${dcfResult.valuePerShare.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Capital Budgeting Tool */}
        <TabsContent value="capital">
          <Card>
            <CardHeader>
              <CardTitle>Capital Budgeting Analysis</CardTitle>
              <CardDescription>
                Evaluate investment projects using NPV, IRR, and other metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
                  <Input
                    id="initialInvestment"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="requiredReturn">Required Return (%)</Label>
                  <Input
                    id="requiredReturn"
                    value={requiredReturn}
                    onChange={(e) => setRequiredReturn(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="cashFlows">Cash Flows (comma-separated)</Label>
                  <Input
                    id="cashFlows"
                    value={cashFlows}
                    onChange={(e) => setCashFlows(e.target.value)}
                    placeholder="1000000,1500000,2000000..."
                  />
                </div>
              </div>

              <Button onClick={calculateCapitalBudgeting} className="w-full">
                Analyze Project
              </Button>

              {budgetingResult && (
                <div className="mt-4 space-y-2">
                  <p>Net Present Value: ${budgetingResult.npv.toFixed(2)}</p>
                  <p>Internal Rate of Return: {budgetingResult.irr.toFixed(2)}%</p>
                  <p>Payback Period: {budgetingResult.paybackPeriod.toFixed(2)} years</p>
                  <p>Profitability Index: {budgetingResult.profitabilityIndex.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* M&A Analysis Tool */}
        <TabsContent value="manda">
          <Card>
            <CardHeader>
              <CardTitle>M&A Analysis</CardTitle>
              <CardDescription>
                Analyze mergers and acquisitions with synergy calculations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetRevenue">Target Revenue ($)</Label>
                  <Input
                    id="targetRevenue"
                    value={targetRevenue}
                    onChange={(e) => setTargetRevenue(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetEBITDA">Target EBITDA ($)</Label>
                  <Input
                    id="targetEBITDA"
                    value={targetEBITDA}
                    onChange={(e) => setTargetEBITDA(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetDebt">Target Debt ($)</Label>
                  <Input
                    id="targetDebt"
                    value={targetDebt}
                    onChange={(e) => setTargetDebt(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="synergies">Expected Synergies ($)</Label>
                  <Input
                    id="synergies"
                    value={synergies}
                    onChange={(e) => setSynergies(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="multiple">EV/EBITDA Multiple</Label>
                  <Input
                    id="multiple"
                    value={multiple}
                    onChange={(e) => setMultiple(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>

              <Button onClick={calculateMandA} className="w-full">
                Calculate Deal Metrics
              </Button>

              {mandaResult && (
                <div className="mt-4 space-y-2">
                  <p>Enterprise Value: ${mandaResult.enterpriseValue.toFixed(2)}</p>
                  <p>Equity Value: ${mandaResult.equityValue.toFixed(2)}</p>
                  <p>Post-Synergy Value: ${mandaResult.postSynergyValue.toFixed(2)}</p>
                  <p>Accretion/Dilution: {mandaResult.accretionDilution.toFixed(2)}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* WACC Calculator */}
        <TabsContent value="wacc">
          <Card>
            <CardHeader>
              <CardTitle>WACC Calculator</CardTitle>
              <CardDescription>
                Calculate Weighted Average Cost of Capital
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="equityWeight">Equity Weight (%)</Label>
                  <Input
                    id="equityWeight"
                    value={equityWeight}
                    onChange={(e) => setEquityWeight(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="debtWeight">Debt Weight (%)</Label>
                  <Input
                    id="debtWeight"
                    value={debtWeight}
                    onChange={(e) => setDebtWeight(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costOfEquity">Cost of Equity (%)</Label>
                  <Input
                    id="costOfEquity"
                    value={costOfEquity}
                    onChange={(e) => setCostOfEquity(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="costOfDebt">Cost of Debt (%)</Label>
                  <Input
                    id="costOfDebt"
                    value={costOfDebt}
                    onChange={(e) => setCostOfDebt(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    value={taxRate}
                    onChange={(e) => setTaxRate(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>

              <Button onClick={calculateWACC} className="w-full">
                Calculate WACC
              </Button>

              {waccResult && (
                <div className="mt-4 space-y-2">
                  <p>WACC: {waccResult.wacc.toFixed(2)}%</p>
                  <p>Cost of Equity: {waccResult.costOfEquity.toFixed(2)}%</p>
                  <p>After-Tax Cost of Debt: {waccResult.afterTaxCostOfDebt.toFixed(2)}%</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateFinanceTools;