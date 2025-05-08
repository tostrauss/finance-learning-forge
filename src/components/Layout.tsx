
import React from 'react';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-app-light-gray">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="flex justify-end items-center p-4 bg-white border-b">
          <Button variant="default" className="bg-app-pink hover:bg-app-pink/90 text-white">
            Sign Up
          </Button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
