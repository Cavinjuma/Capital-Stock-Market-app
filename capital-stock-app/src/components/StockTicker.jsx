// StockTicker.jsx
import { useState, useEffect, useRef } from 'react';

const API_URL = 'http://localhost:5000/api/nse'; // adjust to your backend URL

const StockTicker = () => {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const tickerRef = useRef(null);

  // Fetch stock data
  const fetchStocks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (data.success) {
        setStocks(data.data);
      }
    } catch (err) {
      console.error('Ticker fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStocks();
    // Refresh every 30 seconds (or whatever you prefer)
    const interval = setInterval(fetchStocks, 30000);
    return () => clearInterval(interval);
  }, []);

  // Pause animation on hover
  const handleMouseEnter = () => {
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = 'paused';
    }
  };
  const handleMouseLeave = () => {
    if (tickerRef.current) {
      tickerRef.current.style.animationPlayState = 'running';
    }
  };

  if (isLoading && stocks.length === 0) {
    return (
      <div className="bg-gray-100 py-2 px-4 text-center text-sm text-gray-500">
        Loading ticker...
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden bg-gray-900 text-white py-2 border-b border-gray-700"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={tickerRef}
        className="whitespace-nowrap animate-marquee inline-block"
        style={{ animation: 'marquee 60s linear infinite' }}
      >
        {stocks.map((stock, idx) => (
          <span key={idx} className="mx-6 inline-flex items-center gap-1">
            <span className="font-bold text-yellow-400">{stock.symbol}</span>
            <span className="text-white">
              {new Intl.NumberFormat('en-KE', {
                style: 'currency',
                currency: 'KES',
                minimumFractionDigits: 2,
              }).format(stock.price)}
            </span>
            <span
              className={`text-sm ${
                stock.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.change >= 0 ? '▲' : '▼'} {Math.abs(stock.change).toFixed(2)}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default StockTicker;