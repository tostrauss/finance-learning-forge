// src/components/trading/WatchlistLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { WatchlistProvider } from '@/contexts/watchListContext';

const WatchlistLayout = () => {
  return (
    <WatchlistProvider>
      <Outlet />
    </WatchlistProvider>
  );
};

export default WatchlistLayout;
