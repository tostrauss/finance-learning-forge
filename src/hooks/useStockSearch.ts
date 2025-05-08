// src/hooks/useStockSearch.ts
import { useState } from 'react';
import { fetchYahooAutocomplete } from '@/services/yahooFinanceService';

export const useStockSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchYahooAutocomplete(query);
      setResults(data.quotes || []);
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    query,
    setQuery,
    results,
    loading,
    search
  };
};
