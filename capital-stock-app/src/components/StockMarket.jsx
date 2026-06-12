// capital-stock-app/src/components/StockMarket.jsx
import { useState, useEffect, useCallback } from 'react';


// Adjust this to your backend URL (e.g., http://localhost:5000/api/nse)
const API_URL = 'http://localhost:5000/api/nse';

const StockMarket = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
   const [isExpanded, setIsExpanded] = useState(false);

  const fetchStocks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setStocks(data.data);
        setLastUpdated(new Date(data.timestamp));
        setError(null);
      } else {
        throw new Error(data.error || 'Unknown error');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStocks();
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchStocks, 30000); // every 30 seconds
    }
    return () => clearInterval(interval);
  }, [fetchStocks, autoRefresh]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const formatVolume = (vol) => {
    if (vol >= 1_000_000) return (vol / 1_000_000).toFixed(2) + 'M';
    if (vol >= 1_000) return (vol / 1_000).toFixed(1) + 'K';
    return vol.toString();
  };

  if (loading && stocks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
        <span className="ml-3 text-gray-600">Loading market data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 p-4 sm:px-6 lg:px-8 py-6 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-white-900">
          📊 NSE Live Prices (afx.kwayisi.org)
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchStocks}
            disabled={loading}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              loading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh Now'}
          </button>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Auto-refresh (30s)
          </label>
        </div>
        {lastUpdated && (
          <div className="text-xs text-gray-500">
            Last update: {lastUpdated.toLocaleTimeString()}
          </div>
        )}
      </div>

      {/* Error banner */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
          ⚠️ {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Symbol
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Price (KES)
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Change
              </th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Volume
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stocks
            .slice(0, isExpanded ? stocks.length : 5)
            .map((stock) => (
              <tr key={stock.symbol} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-700">
                  {stock.symbol}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {stock.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatCurrency(stock.price)}
                </td>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm text-right font-medium ${
                    stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-600">
                  {formatVolume(stock.volume)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        {stocks.length > 5 && (
        <div className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-6 btn-container">
        <button
            className="toggle-btn"
            onClick={() => setIsExpanded(!isExpanded)}
        >
      {isExpanded ? 'See Less' : 'See More...'}
    </button>
  </div>
  )}
      {/* Optional: Show total count */}
      <div className="mt-4 text-xs text-gray-400 text-right">
        {stocks.length} stocks listed
      </div>
    </div>
  );
};

export default StockMarket;