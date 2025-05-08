import React from 'react';
import { useStockSearch } from '../hooks/useStockSearch';

const StockSearch: React.FC = () => {
  const {
    query,
    setQuery,
    results,
    loading,
    search,
  } = useStockSearch();

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <input
        type="text"
        placeholder="Search stock (e.g., Tesla)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button
        onClick={search}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>

      {loading && <p className="mt-2">Loading...</p>}

      <ul className="mt-4">
        {results.map((item, index) => (
          <li key={index}>
            <strong>{item.symbol}</strong> — {item.shortname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockSearch;
