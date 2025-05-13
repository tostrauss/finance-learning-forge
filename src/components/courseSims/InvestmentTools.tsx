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
import { Slider } from "../ui/slider";

const InvestmentTools = () => {
  // Portfolio Management State
  const [portfolioInputs, setPortfolioInputs] = useState({
    riskFreeRate: "3",
    marketReturn: "8",
    stockBeta: "1.2",
    stockWeight: "60",
    bondWeight: "40",
  });
  const [portfolioMetrics, setPortfolioMetrics] = useState<{
    expectedReturn?: number;
    sharpeRatio?: number;
    treynorRatio?: number;
  }>({});

  // Equity Analysis State
  const [equityInputs, setEquityInputs] = useState({
    currentPrice: "",
    eps: "",
    growthRate: "",
    discountRate: "",
    terminalMultiple: "",
  });
  const [equityValue, setEquityValue] = useState<number | null>(null);

  // Fixed Income State
  const [bondInputs, setBondInputs] = useState({
    faceValue: "1000",
    couponRate: "5",
    yearsToMaturity: "10",
    marketRate: "6",
    frequency: "2",
  });
  const [bondMetrics, setBondMetrics] = useState<{
    price?: number;
    duration?: number;
    convexity?: number;
  }>({});

  // Derivatives State
  const [optionInputs, setOptionInputs] = useState({
    spotPrice: "100",
    strikePrice: "100",
    timeToExpiry: "1",
    volatility: "20",
    riskFreeRate: "3",
    optionType: "call",
  });
  const [optionPrice, setOptionPrice] = useState<number | null>(null);

  // Portfolio Management Calculations
  const calculatePortfolioMetrics = () => {
    const { riskFreeRate, marketReturn, stockBeta, stockWeight } = portfolioInputs;
    
    // Calculate CAPM expected return
    const stockReturn = parseFloat(riskFreeRate) + 
      parseFloat(stockBeta) * (parseFloat(marketReturn) - parseFloat(riskFreeRate));
    const bondReturn = parseFloat(riskFreeRate) * 1.2; // Simple assumption for bond return
    
    const expectedReturn = 
      (stockReturn * parseFloat(stockWeight) / 100) +
      (bondReturn * (100 - parseFloat(stockWeight)) / 100);
    
    // Simplified calculations for illustration
    const sharpeRatio = (expectedReturn - parseFloat(riskFreeRate)) / 15; // Assuming portfolio std dev of 15%
    const treynorRatio = (expectedReturn - parseFloat(riskFreeRate)) / parseFloat(stockBeta);
    
    setPortfolioMetrics({
      expectedReturn,
      sharpeRatio,
      treynorRatio,
    });
  };

  // Equity Analysis Calculations
  const calculateEquityValue = () => {
    const {
      currentPrice,
      eps,
      growthRate,
      discountRate,
      terminalMultiple,
    } = equityInputs;

    // Simple DCF calculation
    let value = 0;
    const periods = 5;
    let currentEPS = parseFloat(eps);
    const g = parseFloat(growthRate) / 100;
    const r = parseFloat(discountRate) / 100;

    // Calculate present value of future earnings
    for (let i = 1; i <= periods; i++) {
      currentEPS *= (1 + g);
      value += currentEPS / Math.pow(1 + r, i);
    }

    // Add terminal value
    const terminalValue = 
      (currentEPS * (1 + g) * parseFloat(terminalMultiple)) /
      Math.pow(1 + r, periods);
    
    value += terminalValue;
    setEquityValue(value);
  };

  // Fixed Income Calculations
  const calculateBondMetrics = () => {
    const {
      faceValue,
      couponRate,
      yearsToMaturity,
      marketRate,
      frequency,
    } = bondInputs;

    const face = parseFloat(faceValue);
    const c = (parseFloat(couponRate) / 100) * face / parseFloat(frequency);
    const n = parseFloat(yearsToMaturity) * parseFloat(frequency);
    const r = parseFloat(marketRate) / 100 / parseFloat(frequency);

    // Calculate bond price
    let price = 0;
    for (let i = 1; i <= n; i++) {
      price += c / Math.pow(1 + r, i);
    }
    price += face / Math.pow(1 + r, n);

    // Calculate duration (Macaulay Duration)
    let duration = 0;
    for (let i = 1; i <= n; i++) {
      duration += (i * c) / Math.pow(1 + r, i) / price;
    }
    duration += (n * face) / Math.pow(1 + r, n) / price;

    // Simplified convexity calculation
    const convexity = duration * duration / 2;

    setBondMetrics({
      price,
      duration,
      convexity,
    });
  };

  // Option Pricing using Black-Scholes (simplified)
  const calculateOptionPrice = () => {
    const {
      spotPrice,
      strikePrice,
      timeToExpiry,
      volatility,
      riskFreeRate,
      optionType,
    } = optionInputs;

    const S = parseFloat(spotPrice);
    const K = parseFloat(strikePrice);
    const T = parseFloat(timeToExpiry);
    const v = parseFloat(volatility) / 100;
    const r = parseFloat(riskFreeRate) / 100;

    // Simplified Black-Scholes calculation
    const d1 = 
      (Math.log(S / K) + (r + v * v / 2) * T) / 
      (v * Math.sqrt(T));
    const d2 = d1 - v * Math.sqrt(T);

    // Normal distribution approximation
    const N = (x: number) => {
      const a = Math.abs(x);
      const b = 1 / (1 + 0.2316419 * a);
      const c = 0.319381530 * b - 0.356563782 * b ** 2 +
                1.781477937 * b ** 3 - 1.821255978 * b ** 4 +
                1.330274429 * b ** 5;
      return x >= 0 ? 1 - c / Math.sqrt(2 * Math.PI) * Math.exp(-x * x / 2)
                   : c / Math.sqrt(2 * Math.PI) * Math.exp(-x * x / 2);
    };

    let price;
    if (optionType === "call") {
      price = S * N(d1) - K * Math.exp(-r * T) * N(d2);
    } else {
      price = K * Math.exp(-r * T) * N(-d2) - S * N(-d1);
    }

    setOptionPrice(price);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Investment Analysis Tools</h2>
      
      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList>
          <TabsTrigger value="portfolio">Portfolio Management</TabsTrigger>
          <TabsTrigger value="equity">Equity Analysis</TabsTrigger>
          <TabsTrigger value="fixedIncome">Fixed Income</TabsTrigger>
          <TabsTrigger value="derivatives">Derivatives</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Management</CardTitle>
              <CardDescription>
                Calculate portfolio metrics using CAPM and risk-adjusted returns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Risk-free Rate (%)</Label>
                    <Input
                      type="number"
                      value={portfolioInputs.riskFreeRate}
                      onChange={(e) =>
                        setPortfolioInputs({
                          ...portfolioInputs,
                          riskFreeRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Market Return (%)</Label>
                    <Input
                      type="number"
                      value={portfolioInputs.marketReturn}
                      onChange={(e) =>
                        setPortfolioInputs({
                          ...portfolioInputs,
                          marketReturn: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Stock Beta</Label>
                    <Input
                      type="number"
                      value={portfolioInputs.stockBeta}
                      onChange={(e) =>
                        setPortfolioInputs({
                          ...portfolioInputs,
                          stockBeta: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Stock Weight (%)</Label>
                    <Slider
                      value={[parseFloat(portfolioInputs.stockWeight)]}
                      onValueChange={(value) =>
                        setPortfolioInputs({
                          ...portfolioInputs,
                          stockWeight: value[0].toString(),
                        })
                      }
                      max={100}
                      step={1}
                    />
                    <p className="text-sm text-muted-foreground">
                      Stocks: {portfolioInputs.stockWeight}% | 
                      Bonds: {100 - parseFloat(portfolioInputs.stockWeight)}%
                    </p>
                  </div>
                </div>

                <Button onClick={calculatePortfolioMetrics}>
                  Calculate Portfolio Metrics
                </Button>

                {portfolioMetrics.expectedReturn && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">
                      Expected Return: {portfolioMetrics.expectedReturn.toFixed(2)}%
                    </p>
                    <p className="font-semibold">
                      Sharpe Ratio: {portfolioMetrics.sharpeRatio?.toFixed(3)}
                    </p>
                    <p className="font-semibold">
                      Treynor Ratio: {portfolioMetrics.treynorRatio?.toFixed(3)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equity">
          <Card>
            <CardHeader>
              <CardTitle>Equity Analysis</CardTitle>
              <CardDescription>
                Discounted Cash Flow and relative valuation tools
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Current Price</Label>
                    <Input
                      type="number"
                      value={equityInputs.currentPrice}
                      onChange={(e) =>
                        setEquityInputs({
                          ...equityInputs,
                          currentPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Earnings Per Share</Label>
                    <Input
                      type="number"
                      value={equityInputs.eps}
                      onChange={(e) =>
                        setEquityInputs({
                          ...equityInputs,
                          eps: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Growth Rate (%)</Label>
                    <Input
                      type="number"
                      value={equityInputs.growthRate}
                      onChange={(e) =>
                        setEquityInputs({
                          ...equityInputs,
                          growthRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Discount Rate (%)</Label>
                    <Input
                      type="number"
                      value={equityInputs.discountRate}
                      onChange={(e) =>
                        setEquityInputs({
                          ...equityInputs,
                          discountRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Terminal Multiple</Label>
                    <Input
                      type="number"
                      value={equityInputs.terminalMultiple}
                      onChange={(e) =>
                        setEquityInputs({
                          ...equityInputs,
                          terminalMultiple: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <Button onClick={calculateEquityValue}>
                  Calculate Equity Value
                </Button>

                {equityValue !== null && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">
                      Intrinsic Value: ${equityValue.toFixed(2)}
                    </p>
                    <p className="font-semibold">
                      {equityValue > parseFloat(equityInputs.currentPrice)
                        ? "Recommendation: Buy"
                        : "Recommendation: Sell"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fixedIncome">
          <Card>
            <CardHeader>
              <CardTitle>Fixed Income Analysis</CardTitle>
              <CardDescription>
                Bond pricing and risk metrics calculator
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Face Value</Label>
                    <Input
                      type="number"
                      value={bondInputs.faceValue}
                      onChange={(e) =>
                        setBondInputs({
                          ...bondInputs,
                          faceValue: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Coupon Rate (%)</Label>
                    <Input
                      type="number"
                      value={bondInputs.couponRate}
                      onChange={(e) =>
                        setBondInputs({
                          ...bondInputs,
                          couponRate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Years to Maturity</Label>
                    <Input
                      type="number"
                      value={bondInputs.yearsToMaturity}
                      onChange={(e) =>
                        setBondInputs({
                          ...bondInputs,
                          yearsToMaturity: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Market Rate (%)</Label>
                    <Input
                      type="number"
                      value={bondInputs.marketRate}
                      onChange={(e) =>
                        setBondInputs({
                          ...bondInputs,
                          marketRate: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Payments per Year</Label>
                    <Select
                      value={bondInputs.frequency}
                      onValueChange={(value) =>
                        setBondInputs({
                          ...bondInputs,
                          frequency: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Annual</SelectItem>
                        <SelectItem value="2">Semi-annual</SelectItem>
                        <SelectItem value="4">Quarterly</SelectItem>
                        <SelectItem value="12">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculateBondMetrics}>
                  Calculate Bond Metrics
                </Button>

                {bondMetrics.price && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg space-y-2">
                    <p className="font-semibold">
                      Bond Price: ${bondMetrics.price.toFixed(2)}
                    </p>
                    <p className="font-semibold">
                      Duration: {bondMetrics.duration?.toFixed(2)} years
                    </p>
                    <p className="font-semibold">
                      Convexity: {bondMetrics.convexity?.toFixed(4)}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="derivatives">
          <Card>
            <CardHeader>
              <CardTitle>Derivatives Pricing</CardTitle>
              <CardDescription>
                Option pricing calculator using Black-Scholes model
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Spot Price</Label>
                    <Input
                      type="number"
                      value={optionInputs.spotPrice}
                      onChange={(e) =>
                        setOptionInputs({
                          ...optionInputs,
                          spotPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Strike Price</Label>
                    <Input
                      type="number"
                      value={optionInputs.strikePrice}
                      onChange={(e) =>
                        setOptionInputs({
                          ...optionInputs,
                          strikePrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-2">
                    <Label>Time to Expiry (Years)</Label>
                    <Input
                      type="number"
                      value={optionInputs.timeToExpiry}
                      onChange={(e) =>
                        setOptionInputs({
                          ...optionInputs,
                          timeToExpiry: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Volatility (%)</Label>
                    <Input
                      type="number"
                      value={optionInputs.volatility}
                      onChange={(e) =>
                        setOptionInputs({
                          ...optionInputs,
                          volatility: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Risk-free Rate (%)</Label>
                    <Input
                      type="number"
                      value={optionInputs.riskFreeRate}
                      onChange={(e) =>
                        setOptionInputs({
                          ...optionInputs,
                          riskFreeRate: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  <Label>Option Type</Label>
                  <Select
                    value={optionInputs.optionType}
                    onValueChange={(value) =>
                      setOptionInputs({
                        ...optionInputs,
                        optionType: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="call">Call Option</SelectItem>
                      <SelectItem value="put">Put Option</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={calculateOptionPrice}>
                  Calculate Option Price
                </Button>

                {optionPrice !== null && (
                  <div className="mt-4 p-4 bg-secondary rounded-lg">
                    <p className="font-semibold">
                      Option Price: ${optionPrice.toFixed(2)}
                    </p>
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

export default InvestmentTools;