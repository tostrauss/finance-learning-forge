import React, { useState } from 'react';
import Layout from '../components/Layout';
import GridLayout from 'react-grid-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grip } from 'lucide-react';
import SearchSecurities from '../components/trading/SearchSecurities'; // ✅ fixed import
import MarketWidget from '../components/trading/MarketWidget';
import WatchlistWidget from '../components/trading/WatchlistWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout);

const initialLayout = [
  { i: 'search', x: 0, y: 0, w: 2, h: 2 },
  { i: 'market', x: 0, y: 2, w: 2, h: 2 },
  { i: 'top',    x: 2, y: 0, w: 1, h: 1 },
  { i: 'watch',  x: 2, y: 1, w: 1, h: 1 },
  { i: 'news',   x: 0, y: 4, w: 3, h: 1 }
];

const Dashboard = () => {
  const [layout, setLayout] = useState(initialLayout);
  const [isGroupingMode, setIsGroupingMode] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [groups, setGroups] = useState<Record<string, string[]>>({});
  const [selectedSymbol, setSelectedSymbol] = useState('AAPL'); // ✅ shared state

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-app-purple">Market Dashboard</h1>
        </div>

        <ResponsiveGridLayout
          className="layout"
          layout={layout}
          cols={3}
          rowHeight={150}
          onLayoutChange={setLayout}
          isDraggable={!isGroupingMode}
          draggableHandle=".card-handle"
          margin={[16, 16]}
        >
          <div key="search">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move flex justify-between items-center p-3">
                <CardTitle className="text-base">Search Securities</CardTitle>
                <Grip className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                <SearchSecurities onSelectSymbol={setSelectedSymbol} /> {/* ✅ pass down setter */}
              </CardContent>
            </Card>
          </div>

          <div key="market">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move flex justify-between items-center p-3">
                <CardTitle className="text-base">Market Overview</CardTitle>
                <Grip className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                <MarketWidget selectedSymbol={selectedSymbol} /> {/* ✅ pass down symbol */}
              </CardContent>
            </Card>
          </div>

          <div key="top">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move flex justify-between items-center p-3">
                <CardTitle className="text-base">Top Movers</CardTitle>
                <Grip className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                <div className="h-full p-4">
                  <div className="space-y-2">
                    {[{ symbol: 'NVDA', change: 3.09 }, { symbol: 'AAPL', change: 1.56 }, { symbol: 'TSLA', change: 1.14 }].map(stock => (
                      <div key={stock.symbol} className="flex justify-between">
                        <span>{stock.symbol}</span>
                        <span className="text-green-500">+{stock.change}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div key="watch">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move flex justify-between items-center p-3">
                <CardTitle className="text-base">Your Portfolio</CardTitle>
                <Grip className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                <WatchlistWidget />
              </CardContent>
            </Card>
          </div>

          <div key="news">
            <Card className="h-full">
              <CardHeader className="card-handle cursor-move flex justify-between items-center p-3">
                <CardTitle className="text-base">Market News</CardTitle>
                <Grip className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                <div className="h-full p-4 text-gray-500">
                  <p>• Fed hints at rate cuts later this year</p>
                  <p>• Tech stocks gain on AI growth</p>
                  <p>• Q2 earnings season starts strong</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;