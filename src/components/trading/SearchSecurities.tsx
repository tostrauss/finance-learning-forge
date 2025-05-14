// src/components/trading/SearchSecurities.tsx
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { fetchYahooAutocomplete } from '@/services/yahooFinanceService';

type Props = {
  onSelectSymbol: (symbol: string) => void;
};

type SearchResult = {
  symbol: string;
  shortname?: string;
  exchDisp?: string;
};

const SearchSecurities: React.FC<Props> = ({ onSelectSymbol }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length < 1) {
        setResults([]);
        return;
      }

      fetchYahooAutocomplete(query)
        .then((data) => {
          setResults(data.quotes || []);
        })
        .catch((error) => {
          console.error('Autocomplete error:', error);
          setResults([]);
        });
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleSelect = (symbol: string) => {
    onSelectSymbol(symbol);
    setQuery('');
    setResults([]);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex space-x-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for stocks (e.g., TSLA)"
          className="pl-3 pr-10"
        />
        <Button
          onClick={() => {
            if (results.length > 0) {
              handleSelect(results[0].symbol);
            }
          }}
          className="bg-app-purple hover:bg-app-dark-purple"
        >
          <Search className="h-4 w-4 mr-1" />
          Search
        </Button>
      </div>

      {results.length > 0 && (
        <ul className="border rounded max-h-40 overflow-y-auto bg-white shadow text-sm">
          {results.map((result) => (
            <li
              key={result.symbol}
              onClick={() => handleSelect(result.symbol)}
              className="cursor-pointer hover:bg-gray-100 px-4 py-2"
            >
              <strong>{result.symbol}</strong> — {result.shortname || 'Unnamed'} ({result.exchDisp || 'Unknown'})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchSecurities;
