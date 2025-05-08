
import React from 'react';
import Layout from '../components/Layout';

const Dashboard = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-app-purple mb-6">Market Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Stock chart will appear here</p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Top Movers</h2>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">Top movers will appear here</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Your Watchlist</h2>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <div className="text-center">
                  <p className="text-gray-500 mb-2">Your watchlist is empty</p>
                  <p className="text-sm text-gray-400">Add stocks to track them here</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Market News</h2>
              <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500">News will appear here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
