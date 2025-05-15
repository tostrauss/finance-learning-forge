// Modified useStockSearch.ts
import { useState, useEffect } from 'react';
import { fetchYahooAutocomplete } from '@/services/yahooFinanceService';

export const useStockSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Add useEffect to trigger search when query changes
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query.trim().length > 1) {
        search();
      }
    }, 500); // Debounce search
    
    return () => clearTimeout(searchTimer);
  }, [query]);

  const search = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const data = await fetchYahooAutocomplete(query);
      setResults(data.quotes || []);
    } catch (error) {
      console.error('Autocomplete fetch error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { query, setQuery, results, loading, search };
};