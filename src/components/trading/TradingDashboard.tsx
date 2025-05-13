// src/components/trading/TradingDashboard.tsx
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart2, BookOpen, LineChart, PieChart } from 'lucide-react';
import MarketWidget from './MarketWidget';
import PortfolioWidget from './PortfolioWidget';

// This will be a placeholder until we implement the full component
const FinancialCalculators = () => (
  <div className="h-full flex items-center justify-center flex-col gap-4 p-6 bg-gray-50">
    <BarChart2 className="h-12 w-12 text-app-purple opacity-50" />
    <h3 className="text-lg font-medium">Financial Calculators</h3>
    <p className="text-sm text-gray-500 text-center max-w-md">
      Access tools for capital budgeting, WACC calculation, stock valuation, and more.
    </p>
    <Button className="bg-app-purple hover:bg-app-dark-purple mt-2">
      Explore Tools
    </Button>
  </div>
);

// This will be a placeholder until we implement the full component
const TradingJournal = () => (
  <div className="h-full flex items-center justify-center flex-col gap-4 p-6 bg-gray-50">
    <BookOpen className="h-12 w-12 text-app-purple opacity-50" />
    <h3 className="text-lg font-medium">Trading Journal</h3>
    <p className="text-sm text-gray-500 text-center max-w-md">
      Record your trading decisions, strategies, and reflections to improve your skills.
    </p>
    <Button className="bg-app-purple hover:bg-app-dark-purple mt-2">
      Start Journaling
    </Button>
  </div>
);

const TradingDashboard = () => {
  const [activeTab, setActiveTab] = useState('market');

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Mobile view - tabs for different sections */}
      <div className="md:hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="journal">Journal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="market" className="h-[calc(100vh-8rem)]">
            <MarketWidget />
          </TabsContent>
          
          <TabsContent value="portfolio" className="h-[calc(100vh-8rem)]">
            <PortfolioWidget />
          </TabsContent>
          
          <TabsContent value="tools" className="h-[calc(100vh-8rem)]">
            <FinancialCalculators />
          </TabsContent>
          
          <TabsContent value="journal" className="h-[calc(100vh-8rem)]">
            <TradingJournal />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Desktop view - resizable panels */}
      <div className="hidden md:block h-full">
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full"
        >
          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <MarketWidget />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40} minSize={20}>
                <PortfolioWidget />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={40} minSize={30}>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel defaultSize={60} minSize={30}>
                <FinancialCalculators />
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel defaultSize={40} minSize={20}>
                <TradingJournal />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default TradingDashboard;