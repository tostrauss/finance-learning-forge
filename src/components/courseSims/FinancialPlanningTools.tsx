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
import { Slider } from '../ui/slider';

// Types for calculations
interface RetirementResult {
  requiredSavings: number;
  monthlyContribution: number;
  projectedBalance: number;
  retirementIncome: number;
}

interface EducationResult {
  requiredSavings: number;
  monthlyContribution: number;
  projectedCosts: number;
  shortfall: number;
}

interface InsuranceResult {
  lifeInsurance: number;
  disabilityInsurance: number;
  emergencyFund: number;
}

interface EstateResult {
  grossEstate: number;
  estimatedTaxes: number;
  netEstate: number;
  liquidityNeeds: number;
}

const FinancialPlanningTools: React.FC = () => {
  // Retirement Planning State
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('100000');
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [savingsRate, setSavingsRate] = useState('15');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [retirementResult, setRetirementResult] = useState<RetirementResult | null>(null);

  // Education Planning State
  const [childAge, setChildAge] = useState('5');
  const [collegeType, setCollegeType] = useState('public');
  const [collegeYears, setCollegeYears] = useState('4');
  const [educationSavings, setEducationSavings] = useState('25000');
  const [educationReturn, setEducationReturn] = useState('6');
  const [educationResult, setEducationResult] = useState<EducationResult | null>(null);

  // Insurance Needs State
  const [dependents, setDependents] = useState('2');
  const [monthlyExpenses, setMonthlyExpenses] = useState('5000');
  const [outstandingDebt, setOutstandingDebt] = useState('200000');
  const [existingInsurance, setExistingInsurance] = useState('100000');
  const [insuranceResult, setInsuranceResult] = useState<InsuranceResult | null>(null);

  // Estate Planning State
  const [assets, setAssets] = useState('1000000');
  const [liabilities, setLiabilities] = useState('200000');
  const [lifeInsurance, setLifeInsurance] = useState('500000');
  const [estateResult, setEstateResult] = useState<EstateResult | null>(null);

  // Calculate Retirement Needs
  const calculateRetirement = () => {
    const age = parseInt(currentAge);
    const retireAge = parseInt(retirementAge);
    const savings = parseFloat(currentSavings);
    const income = parseFloat(annualIncome);
    const rate = parseFloat(savingsRate) / 100;
    const returns = parseFloat(expectedReturn) / 100;

    const yearsToRetirement = retireAge - age;
    const desiredIncome = income * 0.8; // 80% income replacement
    const withdrawalRate = 0.04; // 4% safe withdrawal rate
    const requiredSavings = desiredIncome / withdrawalRate;
    
    // Calculate monthly contribution needed
    const futureValue = requiredSavings;
    const presentValue = savings;
    const n = yearsToRetirement * 12;
    const r = returns / 12;
    
    const monthlyContribution = 
      (futureValue - presentValue * Math.pow(1 + r, n)) /
      ((Math.pow(1 + r, n) - 1) / r);

    // Calculate projected balance
    const projectedBalance = savings * Math.pow(1 + returns, yearsToRetirement) +
      (income * rate) * ((Math.pow(1 + returns, yearsToRetirement) - 1) / returns);

    const retirementIncome = projectedBalance * withdrawalRate;

    setRetirementResult({
      requiredSavings,
      monthlyContribution,
      projectedBalance,
      retirementIncome
    });
  };

  // Calculate Education Funding
  const calculateEducation = () => {
    const age = parseInt(childAge);
    const years = parseInt(collegeYears);
    const savings = parseFloat(educationSavings);
    const returns = parseFloat(educationReturn) / 100;

    // Current average annual costs (2025)
    const annualCost = collegeType === 'public' ? 25000 : 55000;
    const inflationRate = 0.05; // 5% education inflation
    
    const yearsUntilCollege = 18 - age;
    const projectedAnnualCost = annualCost * Math.pow(1 + inflationRate, yearsUntilCollege);
    const projectedCosts = projectedAnnualCost * years;
    
    // Calculate required monthly savings
    const futureValue = projectedCosts;
    const presentValue = savings;
    const n = yearsUntilCollege * 12;
    const r = returns / 12;
    
    const monthlyContribution =
      (futureValue - presentValue * Math.pow(1 + r, n)) /
      ((Math.pow(1 + r, n) - 1) / r);

    const requiredSavings = projectedCosts / Math.pow(1 + returns, yearsUntilCollege);
    const shortfall = projectedCosts - (savings * Math.pow(1 + returns, yearsUntilCollege));

    setEducationResult({
      requiredSavings,
      monthlyContribution,
      projectedCosts,
      shortfall
    });
  };

  // Calculate Insurance Needs
  const calculateInsurance = () => {
    const deps = parseInt(dependents);
    const expenses = parseFloat(monthlyExpenses);
    const debt = parseFloat(outstandingDebt);
    const existing = parseFloat(existingInsurance);

    // Life Insurance: Cover 10 years of expenses plus debt
    const lifeInsurance = Math.max(0, 
      (expenses * 12 * 10) + debt - existing
    );

    // Disability Insurance: Cover 60% of expenses for 5 years
    const disabilityInsurance = expenses * 12 * 0.6 * 5;

    // Emergency Fund: 6 months of expenses
    const emergencyFund = expenses * 6;

    setInsuranceResult({
      lifeInsurance,
      disabilityInsurance,
      emergencyFund
    });
  };

  // Calculate Estate Planning
  const calculateEstate = () => {
    const totalAssets = parseFloat(assets);
    const totalLiabilities = parseFloat(liabilities);
    const insurance = parseFloat(lifeInsurance);

    const grossEstate = totalAssets + insurance - totalLiabilities;
    
    // Simplified estate tax calculation (2025 rules)
    const exemption = 13000000; // Federal estate tax exemption
    const taxableEstate = Math.max(0, grossEstate - exemption);
    const estimatedTaxes = taxableEstate * 0.40; // 40% estate tax rate
    
    const netEstate = grossEstate - estimatedTaxes;
    const liquidityNeeds = estimatedTaxes + totalLiabilities;

    setEstateResult({
      grossEstate,
      estimatedTaxes,
      netEstate,
      liquidityNeeds
    });
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Financial Planning Tools</h1>

      <Tabs defaultValue="retirement" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="estate">Estate</TabsTrigger>
        </TabsList>

        {/* Retirement Planning Tool */}
        <TabsContent value="retirement">
          <Card>
            <CardHeader>
              <CardTitle>Retirement Planning Calculator</CardTitle>
              <CardDescription>
                Plan your retirement savings and income needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <Input
                    id="currentAge"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    type="number"
                    min="18"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    type="number"
                    min="45"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Income ($)</Label>
                  <Input
                    id="annualIncome"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Savings ($)</Label>
                  <Input
                    id="currentSavings"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="savingsRate">Savings Rate (%)</Label>
                  <Input
                    id="savingsRate"
                    value={savingsRate}
                    onChange={(e) => setSavingsRate(e.target.value)}
                    type="number"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>

              <Button onClick={calculateRetirement} className="w-full">
                Calculate Retirement Needs
              </Button>

              {retirementResult && (
                <div className="mt-4 space-y-2">
                  <p>Required Retirement Savings: ${retirementResult.requiredSavings.toFixed(2)}</p>
                  <p>Required Monthly Contribution: ${retirementResult.monthlyContribution.toFixed(2)}</p>
                  <p>Projected Balance at Retirement: ${retirementResult.projectedBalance.toFixed(2)}</p>
                  <p>Projected Annual Retirement Income: ${retirementResult.retirementIncome.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Planning Tool */}
        <TabsContent value="education">
          <Card>
            <CardHeader>
              <CardTitle>Education Planning Calculator</CardTitle>
              <CardDescription>
                Plan for future education expenses
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="childAge">Child's Current Age</Label>
                  <Input
                    id="childAge"
                    value={childAge}
                    onChange={(e) => setChildAge(e.target.value)}
                    type="number"
                    min="0"
                    max="17"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeType">College Type</Label>
                  <Select value={collegeType} onValueChange={setCollegeType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public University</SelectItem>
                      <SelectItem value="private">Private University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="collegeYears">Years of College</Label>
                  <Input
                    id="collegeYears"
                    value={collegeYears}
                    onChange={(e) => setCollegeYears(e.target.value)}
                    type="number"
                    min="1"
                    max="6"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="educationSavings">Current Savings ($)</Label>
                  <Input
                    id="educationSavings"
                    value={educationSavings}
                    onChange={(e) => setEducationSavings(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="educationReturn">Expected Return (%)</Label>
                  <Input
                    id="educationReturn"
                    value={educationReturn}
                    onChange={(e) => setEducationReturn(e.target.value)}
                    type="number"
                    step="0.1"
                  />
                </div>
              </div>

              <Button onClick={calculateEducation} className="w-full">
                Calculate Education Needs
              </Button>

              {educationResult && (
                <div className="mt-4 space-y-2">
                  <p>Total Projected College Costs: ${educationResult.projectedCosts.toFixed(2)}</p>
                  <p>Required Monthly Contribution: ${educationResult.monthlyContribution.toFixed(2)}</p>
                  <p>Current Shortfall: ${educationResult.shortfall.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Planning Tool */}
        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Needs Calculator</CardTitle>
              <CardDescription>
                Calculate life, disability, and emergency fund needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dependents">Number of Dependents</Label>
                  <Input
                    id="dependents"
                    value={dependents}
                    onChange={(e) => setDependents(e.target.value)}
                    type="number"
                    min="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses ($)</Label>
                  <Input
                    id="monthlyExpenses"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="outstandingDebt">Outstanding Debt ($)</Label>
                  <Input
                    id="outstandingDebt"
                    value={outstandingDebt}
                    onChange={(e) => setOutstandingDebt(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="existingInsurance">Existing Life Insurance ($)</Label>
                  <Input
                    id="existingInsurance"
                    value={existingInsurance}
                    onChange={(e) => setExistingInsurance(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button onClick={calculateInsurance} className="w-full">
                Calculate Insurance Needs
              </Button>

              {insuranceResult && (
                <div className="mt-4 space-y-2">
                  <p>Additional Life Insurance Needed: ${insuranceResult.lifeInsurance.toFixed(2)}</p>
                  <p>Recommended Disability Coverage: ${insuranceResult.disabilityInsurance.toFixed(2)}</p>
                  <p>Emergency Fund Target: ${insuranceResult.emergencyFund.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estate Planning Tool */}
        <TabsContent value="estate">
          <Card>
            <CardHeader>
              <CardTitle>Estate Planning Calculator</CardTitle>
              <CardDescription>
                Estimate estate value and potential tax liability
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="assets">Total Assets ($)</Label>
                  <Input
                    id="assets"
                    value={assets}
                    onChange={(e) => setAssets(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="liabilities">Total Liabilities ($)</Label>
                  <Input
                    id="liabilities"
                    value={liabilities}
                    onChange={(e) => setLiabilities(e.target.value)}
                    type="number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lifeInsurance">Life Insurance ($)</Label>
                  <Input
                    id="lifeInsurance"
                    value={lifeInsurance}
                    onChange={(e) => setLifeInsurance(e.target.value)}
                    type="number"
                  />
                </div>
              </div>

              <Button onClick={calculateEstate} className="w-full">
                Calculate Estate Values
              </Button>

              {estateResult && (
                <div className="mt-4 space-y-2">
                  <p>Gross Estate Value: ${estateResult.grossEstate.toFixed(2)}</p>
                  <p>Estimated Estate Taxes: ${estateResult.estimatedTaxes.toFixed(2)}</p>
                  <p>Net Estate Value: ${estateResult.netEstate.toFixed(2)}</p>
                  <p>Liquidity Needs: ${estateResult.liquidityNeeds.toFixed(2)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialPlanningTools;