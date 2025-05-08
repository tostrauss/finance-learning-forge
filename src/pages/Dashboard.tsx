import React from 'react';
import Layout from '../components/Layout';

// 1️⃣ Import Responsive grid and CSS
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';

// 2️⃣ Wrap Responsive so it auto-sizes to its container
const ResponsiveGridLayout = WidthProvider(Responsive);

// 3️⃣ Define your initial layout
const initialLayout = [
  { i: 'market', x: 0, y: 0, w: 2, h: 2 },
  { i: 'top',    x: 2, y: 0, w: 1, h: 1 },
  { i: 'watch',  x: 2, y: 1, w: 1, h: 1 },
  { i: 'news',   x: 0, y: 2, w: 3, h: 1 },
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
                {/* your chart/widget goes here */}
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
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;
