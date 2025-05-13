import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const InternationalTools = () => {
  // Forex Calculator State
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [forexResult, setForexResult] = useState<number | null>(null);

  // Currency Risk Management State
  const [exposure, setExposure] = useState("");
  const [hedgingCost, setHedgingCost] = useState("");
  const [riskMetrics, setRiskMetrics] = useState<{
    var?: number;
    expectedLoss?: number;
  }>({});

  // Global Portfolio State
  const [portfolioData, setPortfolioData] = useState({
    domesticAllocation: "",
    internationalAllocation: "",
    emergingMarketsAllocation: "",
  });

  // Country Risk Analysis State
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [riskFactors, setRiskFactors] = useState({
    political: 0,
    economic: 0,
    financial: 0,
  });

  // Forex Calculator Handler
  const calculateForex = () => {
    // Mock exchange rates (in production, these would come from an API)
    const rates = {
      "USD-EUR": 0.92,
      "USD-GBP": 0.79,
      "EUR-USD": 1.09,
      "EUR-GBP": 0.86,
      "GBP-USD": 1.27,
      "GBP-EUR": 1.16,
    };
    
    const rate = rates[`${fromCurrency}-${toCurrency}`] || 1;
    setForexResult(parseFloat(amount) * rate);
  };

  // Currency Risk Management Handler
  const calculateRisk = () => {
    const exposureAmount = parseFloat(exposure);
    const costAmount = parseFloat(hedgingCost);
    
    setRiskMetrics({
      var: exposureAmount * 0.1, // Simplified VaR calculation
      expectedLoss: exposureAmount * 0.05 + costAmount,
    });
  };

  // Portfolio Optimization Handler
  const optimizePortfolio = () => {
    // In a real implementation, this would use modern portfolio theory
    // to calculate optimal allocations
    setPortfolioData({
      domesticAllocation: "40",
      internationalAllocation: "35",
      emergingMarketsAllocation: "25",
    });
  };

  // Country Risk Analysis Handler
  const analyzeCountryRisk = () => {
    // In production, this would fetch real risk metrics from an API
    setRiskFactors({
      political: Math.random() * 10,
      economic: Math.random() * 10,
      financial: Math.random() * 10,
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">International Finance Tools</h2>
      
      <Tabs defaultValue="forex" className="space-y-4">
        <TabsList>
          <TabsTrigger value="forex">Forex Calculator</TabsTrigger>
          <TabsTrigger value="risk">Currency Risk</TabsTrigger>
          <TabsTrigger value="portfolio">Global Portfolio</TabsTrigger>
          <TabsTrigger value="country">Country Risk</TabsTrigger>
        </TabsList>

        <TabsContent value="forex">
          <Card>
            <CardHeader>
              <CardTitle>Foreign Exchange Calculator</CardTitle>
              <CardDescription>
                Calculate currency conversions using real-time exchange rates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>From Currency</Label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="From" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>To Currency</Label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue placeholder="To" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculateForex}>Calculate</Button>

                {forexResult !== null && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">
                      Result: {forexResult.toFixed(2)} {toCurrency}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Currency Risk Management</CardTitle>
              <CardDescription>
                Analyze and manage currency exposure risk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="exposure">Currency Exposure</Label>
                  <Input
                    id="exposure"
                    type="number"
                    value={exposure}
                    onChange={(e) => setExposure(e.target.value)}
                    placeholder="Enter exposure amount"
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="hedgingCost">Hedging Cost</Label>
                  <Input
                    id="hedgingCost"
                    type="number"
                    value={hedgingCost}
                    onChange={(e) => setHedgingCost(e.target.value)}
                    placeholder="Enter hedging cost"
                  />
                </div>

                <Button onClick={calculateRisk}>Calculate Risk Metrics</Button>

                {riskMetrics.var && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">
                      Value at Risk: {riskMetrics.var.toFixed(2)}
                    </p>
                    <p className="font-semibold">
                      Expected Loss: {riskMetrics.expectedLoss?.toFixed(2)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Global Portfolio Optimization</CardTitle>
              <CardDescription>
                Optimize international investment portfolio allocation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Domestic (%)</Label>
                    <Input
                      type="number"
                      value={portfolioData.domesticAllocation}
                      onChange={(e) =>
                        setPortfolioData({
                          ...portfolioData,
                          domesticAllocation: e.target.value,
                        })
                      }
                      placeholder="Domestic %"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>International (%)</Label>
                    <Input
                      type="number"
                      value={portfolioData.internationalAllocation}
                      onChange={(e) =>
                        setPortfolioData({
                          ...portfolioData,
                          internationalAllocation: e.target.value,
                        })
                      }
                      placeholder="International %"
                    />
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Label>Emerging Markets (%)</Label>
                    <Input
                      type="number"
                      value={portfolioData.emergingMarketsAllocation}
                      onChange={(e) =>
                        setPortfolioData({
                          ...portfolioData,
                          emergingMarketsAllocation: e.target.value,
                        })
                      }
                      placeholder="Emerging %"
                    />
                  </div>
                </div>

                <Button onClick={optimizePortfolio}>Optimize Portfolio</Button>

                {portfolioData.domesticAllocation && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">Optimal Allocation:</p>
                    <p>Domestic: {portfolioData.domesticAllocation}%</p>
                    <p>International: {portfolioData.internationalAllocation}%</p>
                    <p>
                      Emerging Markets: {portfolioData.emergingMarketsAllocation}%
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="country">
          <Card>
            <CardHeader>
              <CardTitle>Country Risk Analysis</CardTitle>
              <CardDescription>
                Analyze political, economic, and financial risks by country
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex flex-col space-y-2">
                  <Label>Select Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USA">United States</SelectItem>
                      <SelectItem value="GBR">United Kingdom</SelectItem>
                      <SelectItem value="DEU">Germany</SelectItem>
                      <SelectItem value="JPN">Japan</SelectItem>
                      <SelectItem value="CHN">China</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={analyzeCountryRisk}>Analyze Risk</Button>

                {riskFactors.political > 0 && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">Risk Analysis for {selectedCountry}:</p>
                    <p>Political Risk: {riskFactors.political.toFixed(1)}/10</p>
                    <p>Economic Risk: {riskFactors.economic.toFixed(1)}/10</p>
                    <p>Financial Risk: {riskFactors.financial.toFixed(1)}/10</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InternationalTools;