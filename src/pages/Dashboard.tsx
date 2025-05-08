import React from 'react';
import Layout from '../components/Layout';
import StockSearch from '../components/StockSearch'; // ✅ FIXED: now using default import

import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialLayout = [
  { i: 'market', x: 0, y: 0, w: 2, h: 2 },
  { i: 'top',    x: 2, y: 0, w: 1, h: 1 },
  { i: 'watch',  x: 2, y: 1, w: 1, h: 1 },
  { i: 'news',   x: 0, y: 2, w: 3, h: 1 },
  { i: 'search', x: 0, y: 3, w: 3, h: 2 },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-6">
        <h1 className="text-3xl font-bold text-app-purple mb-4">
          Market Dashboard
        </h1>

        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: initialLayout }}
          breakpoints={{ lg: 1200 }}
          cols={{ lg: 3 }}
          rowHeight={160}
          margin={[16, 16]}
          containerPadding={[8, 8]}
          useCSSTransforms={true}
          draggableHandle=".card-handle"
          isResizable={false}
        >
          {/* Market Overview */}
          <div key="market">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Overview Widget</p>
              </CardContent>
            </Card>
          </div>

          {/* Top Movers */}
          <div key="top">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Top Movers</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Top Movers Widget</p>
              </CardContent>
            </Card>
          </div>

          {/* Your Watchlist */}
          <div key="watch">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Your Watchlist</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Watchlist Widget</p>
              </CardContent>
            </Card>
          </div>

          {/* Market News */}
          <div key="news">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Market News</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">News Widget</p>
              </CardContent>
            </Card>
          </div>

          {/* Stock Autocomplete Search */}
          <div key="search">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Search Securities</CardTitle>
              </CardHeader>
              <CardContent className="h-full bg-gray-50 overflow-y-auto">
                <StockSearch />
              </CardContent>
            </Card>
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;
