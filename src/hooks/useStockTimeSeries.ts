// src/hooks/useStockTimeSeries.ts
import { useState, useEffect } from 'react';
import { getHistoricalPrices } from '@/services/yahooFinanceService';

type TimeSeriesPoint = { 
  date: string; 
  open?: number;
  high?: number;
  low?: number;
  close: number;
  volume?: number;
};

export function useStockTimeSeries(symbol: string) {
  const [series, setSeries] = useState<TimeSeriesPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;
    setLoading(true);
    setError(null);
    
    getHistoricalPrices(symbol)
      .then((data) => setSeries(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [symbol]);

  return { series, loading, error };
}