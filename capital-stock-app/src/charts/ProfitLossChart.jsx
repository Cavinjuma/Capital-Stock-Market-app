import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
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

function ProfitLossChart({ selectedStock = "" }) {
  const { sales } = useContext(AppContext)

  // Group profit/loss by date and stock
  const chartData = useMemo(() => {
    const filtered = selectedStock ? sales.filter(s => s.stock === selectedStock) : sales

    const grouped = filtered.reduce((acc, sale) => {
      const date = new Date(sale.createdAt).toLocaleDateString()
      const profit = parseFloat(sale.profit) || 0
      const existing = acc.find(item => item.date === date)
      if (existing) {
        existing[sale.stock] = (existing[sale.stock] || 0) + profit
        existing.profit += profit
      } else {
        acc.push({ date, profit: profit, [sale.stock]: profit })
      }
      return acc
    }, [])

    return grouped.sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [sales, selectedStock])

  // Get unique stocks in data
  const stocks = useMemo(() => {
    if (selectedStock) return [selectedStock]
    const uniqueStocks = new Set()
    chartData.forEach(entry => {
      Object.keys(entry).forEach(key => {
        if (key !== 'date' && key !== 'profit') uniqueStocks.add(key)
      })
    })
    return Array.from(uniqueStocks)
  }, [chartData, selectedStock])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-5">
        Profit/Loss Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={0} stroke="#000" />
            {selectedStock ? (
              <Line type="monotone" dataKey={selectedStock} stroke={getStockColor(selectedStock)} strokeWidth={2} />
            ) : (
              stocks.map((stock, index) => (
                <Line key={stock} type="monotone" dataKey={stock} stroke={getStockColor(stock, index)} strokeWidth={2} />
              ))
            )}
            {!selectedStock && stocks.length > 0 && <Legend />}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default ProfitLossChart