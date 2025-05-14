// src/components/StockSearch.tsx
import React, { Dispatch, SetStateAction } from 'react';

export interface StockSearchProps {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  results: { symbol: string; name: string }[];
  loading: boolean;
  onSelect: (symbol: string) => void;
}

const StockSearch: React.FC<StockSearchProps> = ({ query, setQuery, results, loading, onSelect }) => {
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for stocks..."
        className="border p-2 rounded w-full mb-2"
      />
      {loading && <p>Loading...</p>}
      <ul className="max-h-48 overflow-y-auto">
        {results.map((result) => (
          <li
            key={result.symbol}
            className="p-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => onSelect(result.symbol)}
          >
            {result.symbol} - {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSearch;
