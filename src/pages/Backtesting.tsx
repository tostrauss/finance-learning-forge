import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import BacktestStrategyForm from '@/components/backtesting/BacktestStrategyForm';
import BacktestResults from '@/components/backtesting/BacktestResultsView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BacktestingProvider } from '@/contexts/BacktestingContext';
import StrategyLibrary from '@/components/backtesting/StrategyLibrary';

const Backtesting = () => {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <Layout>
      <BacktestingProvider>
        <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">Strategy Backtesting</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="create">Create Strategy</TabsTrigger>
            <TabsTrigger value="results">Results History</TabsTrigger>
            <TabsTrigger value="library">Strategy Library</TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <Card>
              <CardContent className="p-6">
                <BacktestStrategyForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardContent className="p-6">
                <BacktestResults />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="library">
            <Card>
              <CardContent className="p-6">
                <StrategyLibrary />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </BacktestingProvider>
    </Layout>
  );
};

export default Backtesting;
