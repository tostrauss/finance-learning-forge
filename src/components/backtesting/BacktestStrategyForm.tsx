import React from 'react';
import { Button } from '@/components/ui/button';
import { useBacktesting } from '@/contexts/BacktestingContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Strategy name must be at least 3 characters' }),
  description: z.string().optional(),
  timeframe: z.enum(['1m', '5m', '15m', '1h', '4h', '1d']),
  entryConditions: z.string().min(10, { message: 'Entry conditions required' }),
  exitConditions: z.string().min(10, { message: 'Exit conditions required' }),
  riskPerTrade: z.number().min(0.1).max(10),
  startDate: z.string(),
  endDate: z.string(),
});

const BacktestStrategyForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timeframe: '1h',
      riskPerTrade: 1,
    },
  });
  const { runBacktest } = useBacktesting();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await runBacktest(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Create New Strategy</h2>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Strategy Name</FormLabel>
              <FormControl>
                <Input placeholder="My Trading Strategy" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe your strategy..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="timeframe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Timeframe</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1m">1 Minute</SelectItem>
                    <SelectItem value="5m">5 Minutes</SelectItem>
                    <SelectItem value="15m">15 Minutes</SelectItem>
                    <SelectItem value="1h">1 Hour</SelectItem>
                    <SelectItem value="4h">4 Hours</SelectItem>
                    <SelectItem value="1d">1 Day</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="riskPerTrade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Risk per Trade (%)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="entryConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Conditions</FormLabel>
              <FormControl>
                <Textarea placeholder="Define when to enter a trade..." {...field} />
              </FormControl>
              <FormDescription>
                Describe the conditions that must be met to enter a trade
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="exitConditions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exit Conditions</FormLabel>
              <FormControl>
                <Textarea placeholder="Define when to exit a trade..." {...field} />
              </FormControl>
              <FormDescription>
                Describe the conditions that must be met to exit a trade
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">Run Backtest</Button>
      </form>
    </Form>
  );
};

export default BacktestStrategyForm;
