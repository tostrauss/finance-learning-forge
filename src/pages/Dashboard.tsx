import React from 'react';
import Layout from '../components/Layout';
import GridLayout from 'react-grid-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

// Wrap the grid so it auto‐calculates width
const ResponsiveGridLayout = GridLayout.WidthProvider(GridLayout);

// Define your initial layout
// Each item has:  
//  i = unique key  
//  x, y = start column/row  
//  w, h = width & height in grid units
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
          layout={initialLayout}
          cols={3}              // total columns
          rowHeight={150}       // px per grid row
          width={1200}          // container width (or omit for full width)
          draggableHandle=".card-handle" // restrict drag to handle
        >
          <div key="market">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Market Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                Placeholder
              </CardContent>
            </Card>
          </div>

          <div key="top">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Top Movers</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                Placeholder
              </CardContent>
            </Card>
          </div>

          <div key="watch">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Your Watchlist</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                Placeholder
              </CardContent>
            </Card>
          </div>

          <div key="news">
            <Card>
              <CardHeader className="card-handle cursor-move">
                <CardTitle>Market News</CardTitle>
              </CardHeader>
              <CardContent className="h-full flex items-center justify-center bg-gray-50">
                Placeholder
              </CardContent>
            </Card>
          </div>
        </ResponsiveGridLayout>
      </div>
    </Layout>
  );
};

export default Dashboard;

