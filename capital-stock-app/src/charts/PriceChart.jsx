import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
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

function PriceChart({ selectedStock = "" }) {
  const { prices } = useContext(AppContext)

  const filteredPrices = useMemo(() => {
    if (!selectedStock) {
      return prices
    }
    return prices.filter(price => price.stock === selectedStock)
  }, [prices, selectedStock])

  const chartData = useMemo(() => {
    const grouped = filteredPrices.reduce((acc, price) => {
      const day = price.date?.split?.("T")[0] || price.date
      const existing = acc.find(item => item.day === day)
      if (existing) {
        existing.price = (existing.price + price.closingPrice) / 2
      } else {
        acc.push({ day, price: price.closingPrice })
      }
      return acc
    }, [])

    return grouped.sort((a, b) => new Date(a.day) - new Date(b.day))
  }, [filteredPrices])

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-xl font-bold mb-5">
        Stock Price Trend
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke={getStockColor(selectedStock)}
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PriceChart
