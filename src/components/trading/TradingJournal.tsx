import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

// Sample trade strategies
const tradeStrategies = [
  'Momentum Trading',
  'Mean Reversion',
  'Breakout Trading',
  'Trend Following',
  'Swing Trading',
  'Value Investing',
  'Pairs Trading',
  'Options Strategy',
];

// Sample trade emotions
const emotions = [
  'Confident',
  'Nervous',
  'FOMO',
  'Fearful',
  'Disciplined',
  'Impulsive',
  'Patient',
  'Greedy',
];

interface JournalEntry {
  id: string;
  timestamp: string;
  symbol: string;
  strategy: string;
  setup: string;
  entryPrice: number;
  exitPrice: number;
  position: 'long' | 'short';
  size: number;
  outcome: number;
  stopLoss: number;
  takeProfit: number;
  emotions: string[];
  reflection: string;
  lessonsLearned: string;
  screenshots: string[];
}

interface JournalState {
  entries: JournalEntry[];
  selectedEntry: JournalEntry | null;
  filter: {
    strategy: string;
    outcome: 'win' | 'loss' | 'all';
    dateRange: {
      from: Date | undefined;
      to: Date | undefined;
    };
  };
}

const TradingJournal = () => {
  const [activeTab, setActiveTab] = useState('entries');
  const [newEntry, setNewEntry] = useState<Partial<JournalEntry>>({
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    symbol: '',
    strategy: '',
    setup: '',
    entryPrice: 0,
    exitPrice: 0,
    position: 'long',
    size: 0,
    outcome: 0,
    stopLoss: 0,
    takeProfit: 0,
    emotions: [],
    reflection: '',
    lessonsLearned: '',
    screenshots: [],
  });

  const [journalState, setJournalState] = useState<JournalState>({
    entries: [],
    selectedEntry: null,
    filter: {
      strategy: 'all',
      outcome: 'all',
      dateRange: {
        from: undefined,
        to: undefined,
      },
    },
  });

  // Calculate performance metrics
  const calculateMetrics = (entries: JournalEntry[]) => {
    const totalTrades = entries.length;
    const winningTrades = entries.filter(entry => entry.outcome > 0).length;
    const totalProfit = entries.reduce((sum, entry) => sum + entry.outcome, 0);
    const avgReturn = totalProfit / (totalTrades || 1); // Avoid division by zero
    const winRate = (winningTrades / (totalTrades || 1)) * 100;

    return {
      totalTrades,
      winningTrades,
      totalProfit,
      avgReturn,
      winRate,
    };
  };

  return (
    <div className="container mx-auto p-6">
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsContent value="entries">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Trading Journal Entries</h3>
                <Button onClick={() => setActiveTab('new')}>New Entry</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {journalState.entries.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-base font-medium">
                            {entry.symbol} - {entry.strategy}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant={entry.outcome > 0 ? "success" : "destructive"}>
                            {entry.outcome > 0 ? 'Win' : 'Loss'}: ${Math.abs(entry.outcome).toFixed(2)}
                          </Badge>
                        </div>
                      </div>
                      <p className="mt-2 text-sm">{entry.reflection}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">New Trade Entry</h3>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    placeholder="Symbol (e.g., AAPL)"
                    value={newEntry.symbol}
                    onChange={(e) => setNewEntry({ ...newEntry, symbol: e.target.value })}
                  />
                  <Select
                    value={newEntry.strategy}
                    onValueChange={(value) => setNewEntry({ ...newEntry, strategy: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      {tradeStrategies.map((strategy) => (
                        <SelectItem key={strategy} value={strategy}>
                          {strategy}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    type="number"
                    placeholder="Entry Price"
                    value={newEntry.entryPrice || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, entryPrice: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Exit Price"
                    value={newEntry.exitPrice || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, exitPrice: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Position Size"
                    value={newEntry.size || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, size: parseInt(e.target.value) })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Stop Loss"
                    value={newEntry.stopLoss || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, stopLoss: parseFloat(e.target.value) })}
                  />
                  <Input
                    type="number"
                    placeholder="Take Profit"
                    value={newEntry.takeProfit || ''}
                    onChange={(e) => setNewEntry({ ...newEntry, takeProfit: parseFloat(e.target.value) })}
                  />
                </div>

                <Textarea
                    placeholder="Trade Setup"
                    value={newEntry.setup}
                    onChange={(e) => setNewEntry({ ...newEntry, setup: e.target.value })}
                />

                <Input
                    placeholder="Emotions (comma-separated)"
                    value={newEntry.emotions?.join(',')}
                    onChange={(e) => setNewEntry({ ...newEntry, emotions: e.target.value.split(',') })}
                />

                <Textarea
                    placeholder="Trade Reflection"
                    value={newEntry.reflection}
                    onChange={(e) => setNewEntry({ ...newEntry, reflection: e.target.value })}
                />

                <Textarea
                    placeholder="Lessons Learned"
                    value={newEntry.lessonsLearned}
                    onChange={(e) => setNewEntry({ ...newEntry, lessonsLearned: e.target.value })}
                />

                <div className="flex justify-end space-x-4">
                  <Button variant="outline" onClick={() => setActiveTab('entries')}>
                    Cancel
                  </Button>
                  <Button onClick={() => {
                    setJournalState({
                      ...journalState,
                      entries: [...journalState.entries, newEntry as JournalEntry]
                    });
                    setActiveTab('entries');
                  }}>
                    Save Entry
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-medium">Trading Analytics</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {/* Analytics content */}
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Total Profit/Loss</h4>
                  <div className="mt-2">
                    <Badge variant={calculateMetrics(journalState.entries).totalProfit > 0 ? "success" : "destructive"}>
                      ${calculateMetrics(journalState.entries).totalProfit.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Win Rate</h4>
                  <p className="mt-2 text-2xl font-semibold">
                    {calculateMetrics(journalState.entries).winRate.toFixed(1)}%
                  </p>
                </div>

                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-500">Average Return</h4>
                  <p className="mt-2 text-2xl font-semibold">
                    ${calculateMetrics(journalState.entries).avgReturn.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TradingJournal;