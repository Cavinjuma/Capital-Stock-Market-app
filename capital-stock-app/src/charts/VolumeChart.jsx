import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useContext, useMemo } from "react"
import { AppContext } from "../context/AppContext"

const STOCK_COLORS = {
  "KCB": "#1f2937",
  "EQTY": "#ef4444",
  "SAFARICOM": "#3b82f6",
  "NSE20": "#10b981",
  "CIC": "#f59e0b",
  "KQ": "#8b5cf6",
  "I&M": "#ec4899",
  "SCBK": "#06b6d4",
  "TIER1": "#6366f1",
}

const getStockColor = (stock, index = 0) => {
  return STOCK_COLORS[stock] || Object.values(STOCK_COLORS)[index % Object.values(STOCK_COLORS).length]
}

function VolumeChart({ selectedStock = "" }) {
  const { prices } = useContext(AppContext)

  // Group volumes by date and stock
  const chartData = useMemo(() => {
    const filtered = selectedStock ? prices.filter(p => p.stock === selectedStock) : prices
    
    const grouped = filtered.reduce((acc, price) => {
      const existing = acc.find(item => item.day === price.date)
      if (existing) {
        existing[price.stock] = (existing[price.stock] || 0) + price.volume
        existing.volume += price.volume
      } else {
        acc.push({ day: price.date, volume: price.volume, [price.stock]: price.volume })
      }
      return acc
    }, [])
    
    return grouped.sort((a, b) => new Date(a.day) - new Date(b.day))
  }, [prices, selectedStock])

  // Get unique stocks in data
  const stocks = useMemo(() => {
    if (selectedStock) return [selectedStock]
    const uniqueStocks = new Set()
    chartData.forEach(entry => {
      Object.keys(entry).forEach(key => {
        if (key !== 'day' && key !== 'volume') uniqueStocks.add(key)
      })
    })
    return Array.from(uniqueStocks)
  }, [chartData, selectedStock])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-5">
        Trading Volume Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            {selectedStock ? (
              <Bar dataKey={selectedStock} fill={getStockColor(selectedStock)} />
            ) : (
              stocks.map((stock, index) => (
                <Bar key={stock} dataKey={stock} fill={getStockColor(stock, index)} />
              ))
            )}
            {!selectedStock && stocks.length > 0 && <Legend />}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VolumeChart