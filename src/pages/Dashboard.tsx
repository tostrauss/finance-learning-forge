// src/pages/Dashboard.tsx
import React, { useState } from 'react';
import Layout from '../components/Layout';
import GridLayout from 'react-grid-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grip } from 'lucide-react';
import SearchSecurities from '@/components/trading/SearchSecuritites';
import MarketWidget from '../components/trading/MarketWidget';
import WatchlistWidget from '../components/trading/WatchlistWidget';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Wrap the grid so it auto‐calculates width
const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout);

// Define your initial layout
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

  const handleLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const toggleSelectWidget = (widgetId: string) => {
    if (!isGroupingMode) return;
    
    if (selectedWidgets.includes(widgetId)) {
      setSelectedWidgets(selectedWidgets.filter(id => id !== widgetId));
    } else {
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };

  const createGroup = () => {
    if (selectedWidgets.length < 2) return;
    
    const groupId = `group-${Date.now()}`;
    setGroups({
      ...groups,
      [groupId]: [...selectedWidgets]
    });
    
    setSelectedWidgets([]);
  };

  const clearAllGroups = () => {
    setGroups({});
    setSelectedWidgets([]);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-app-purple">
            Market Dashboard
          </h1>
          
          <div className="flex space-x-2">
            <Button 
              variant={isGroupingMode ? "default" : "outline"}
              className={isGroupingMode ? "bg-app-purple" : ""}
              onClick={() => setIsGroupingMode(!isGroupingMode)}
            >
              {isGroupingMode ? "Exit Grouping Mode" : "Group Widgets"}
            </Button>
            
            {isGroupingMode && selectedWidgets.length >= 2 && (
              <Button 
                onClick={createGroup}
                className="bg-app-purple"
              >
                Group Selected ({selectedWidgets.length})
              </Button>
            )}
            
            {Object.keys(groups).length > 0 && (
              <Button 
                variant="outline"
                onClick={clearAllGroups}
              >
                Ungroup All
              </Button>
            )}
          </div>
        </div>

        <ResponsiveGridLayout
          className="layout"
          layout={layout}
          cols={3}
          rowHeight={150}
          onLayoutChange={handleLayoutChange}
          isDraggable={!isGroupingMode}
          draggableHandle=".card-handle"
          margin={[16, 16]}
        >
          <div key="search">
            <div 
              className={`h-full ${isGroupingMode ? 'cursor-pointer border-2 ' + (selectedWidgets.includes('search') ? 'border-app-purple' : 'border-dashed border-gray-300') : ''}`}
              onClick={() => toggleSelectWidget('search')}
            >
              <Card className="h-full">
                <CardHeader className="card-handle cursor-move flex flex-row justify-between items-center p-3">
                  <CardTitle className="text-base">Search Securities</CardTitle>
                  <Grip className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                  <SearchSecurities />
                </CardContent>
              </Card>
            </div>
          </div>

          <div key="market">
            <div 
              className={`h-full ${isGroupingMode ? 'cursor-pointer border-2 ' + (selectedWidgets.includes('market') ? 'border-app-purple' : 'border-dashed border-gray-300') : ''}`}
              onClick={() => toggleSelectWidget('market')}
            >
              <Card className="h-full">
                <CardHeader className="card-handle cursor-move flex flex-row justify-between items-center p-3">
                  <CardTitle className="text-base">Market Overview</CardTitle>
                  <Grip className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                  <MarketWidget />
                </CardContent>
              </Card>
            </div>
          </div>

          <div key="top">
            <div 
              className={`h-full ${isGroupingMode ? 'cursor-pointer border-2 ' + (selectedWidgets.includes('top') ? 'border-app-purple' : 'border-dashed border-gray-300') : ''}`}
              onClick={() => toggleSelectWidget('top')}
            >
              <Card className="h-full">
                <CardHeader className="card-handle cursor-move flex flex-row justify-between items-center p-3">
                  <CardTitle className="text-base">Top Movers</CardTitle>
                  <Grip className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                  <div className="h-full p-4">
                    <div className="space-y-2">
                      {[
                        { symbol: 'NVDA', name: 'NVIDIA Corp', change: 3.09 },
                        { symbol: 'AAPL', name: 'Apple Inc', change: 1.56 },
                        { symbol: 'TSLA', name: 'Tesla Inc', change: 1.14 }
                      ].map(stock => (
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
          </div>

          <div key="watch">
            <div 
              className={`h-full ${isGroupingMode ? 'cursor-pointer border-2 ' + (selectedWidgets.includes('watch') ? 'border-app-purple' : 'border-dashed border-gray-300') : ''}`}
              onClick={() => toggleSelectWidget('watch')}
            >
              <Card className="h-full">
                <CardHeader className="card-handle cursor-move flex flex-row justify-between items-center p-3">
                  <CardTitle className="text-base">Your Portfolio</CardTitle>
                  <Grip className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                  <WatchlistWidget />
                </CardContent>
              </Card>
            </div>
          </div>

          <div key="news">
            <div 
              className={`h-full ${isGroupingMode ? 'cursor-pointer border-2 ' + (selectedWidgets.includes('news') ? 'border-app-purple' : 'border-dashed border-gray-300') : ''}`}
              onClick={() => toggleSelectWidget('news')}
            >
              <Card className="h-full">
                <CardHeader className="card-handle cursor-move flex flex-row justify-between items-center p-3">
                  <CardTitle className="text-base">Market News</CardTitle>
                  <Grip className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="p-0 h-[calc(100%-48px)] overflow-hidden">
                  <div className="h-full p-4">
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">Fed Signals Potential Rate Cut</h4>
                        <p className="text-sm text-gray-500">Federal Reserve Chair hints at possible easing later this year</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Tech Stocks Rally on AI Optimism</h4>
                        <p className="text-sm text-gray-500">Major tech companies gain as investors bet on AI growth</p>
                      </div>
                      <div>
                        <h4 className="font-medium">Earnings Season Begins Strong</h4>
                        <p className="text-sm text-gray-500">Early reports show better than expected Q2 results</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;