// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import StockSearch from '@/components/StockSearch';
import { useStockSearch } from '@/hooks/useStockSearch';
import { useStockTimeSeries } from '@/hooks/useStockTimeSeries';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import MarketWidget from '@/components/trading/MarketWidget';
import PortfolioWidget from '@/components/trading/PortfolioWidget';
import FinancialCalculators from '@/components/trading/FinancialCalculators';
import TradingJournal from '@/components/trading/TradingJournal';
import { useToast } from '@/hooks/use-toast';

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayout = [
  { i: 'market', x: 0, y: 0, w: 2, h: 2 },
  { i: 'portfolio', x: 2, y: 0, w: 1, h: 2 },
  { i: 'search', x: 0, y: 2, w: 1, h: 1 },
  { i: 'calc', x: 1, y: 2, w: 1, h: 1 },
  { i: 'journal', x: 2, y: 2, w: 1, h: 1 },
];

const Dashboard: React.FC = () => {
  const { toast } = useToast();
  
  // State for selected stock
  const [symbol, setSymbol] = useState<string>('AAPL');
  const [stockName, setStockName] = useState<string>('Apple Inc.');
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  
  // Stock search hook
  const { query, setQuery, results, loading } = useStockSearch();
  
  // Time series data hook for the chart
  const { series, loading: tsLoading, error: tsError } = useStockTimeSeries(symbol);
  
  // Format chart data
  const chartData = React.useMemo(() => {
    return series.map(item => ({
      date: item.date,
      open: item.open,
      high: item.high,
      low: item.low,
      close: item.close,
      volume: item.volume
    }));
  }, [series]);
  
  // Update current price when chart data changes
  useEffect(() => {
    if (chartData.length > 0) {
      setCurrentPrice(chartData[chartData.length - 1].close);
    }
  }, [chartData]);
  
  // Handle stock selection
  const handleSelectStock = (selectedSymbol: string) => {
    // Find the full stock info from results
    const stockInfo = results.find(item => item.symbol === selectedSymbol);
    setSymbol(selectedSymbol);
    
    // Update stock name if available
    if (stockInfo && stockInfo.shortname) {
      setStockName(stockInfo.shortname);
    } else if (stockInfo && stockInfo.longname) {
      setStockName(stockInfo.longname);
    } else {
      setStockName(selectedSymbol);
    }
    
    toast({
      title: "Stock Selected",
      description: `Now viewing ${selectedSymbol}`
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-app-purple mb-4">
          Market Dashboard
        </h1>

        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: initialLayout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
          rowHeight={160}
          margin={[16, 16]}
          containerPadding={[8, 8]}
          useCSSTransforms={true}
          draggableHandle=".card-handle"
        >
          {/* Market Widget */}
          <div key="market">
            <MarketWidget
              symbol={symbol}
              chartData={chartData}
              loading={tsLoading}
              error={tsError ? tsError.toString() : undefined}
              onSelectSymbol={handleSelectStock}
            />
          </div>

          {/* Portfolio Widget */}
          <div key="portfolio">
            <PortfolioWidget 
              symbol={symbol} 
              price={currentPrice}
              name={stockName}
            />
          </div>

          {/* Stock Search */}
          <div key="search">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move px-4 py-3">
                <CardTitle className="text-lg font-bold">Search Securities</CardTitle>
              </CardHeader>
              <CardContent className="p-4 h-[calc(100%-60px)] overflow-auto">
                <StockSearch
                  query={query}
                  setQuery={setQuery}
                  results={results}
                  loading={loading}
                  onSelect={handleSelectStock}
                />
                <div className="mt-4 text-sm text-gray-500">
                  {results.length > 0 ? 
                    `Found ${results.length} results` : 
                    query.length > 0 ? "No results found" : "Enter a symbol or company name"
                  }
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Calculator */}
          <div key="calc">
            <FinancialCalculators />
          </div>

          {/* Trading Journal */}
          <div key="journal">
            <TradingJournal />
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;