import { useContext, useState, useMemo } from "react"

import MainLayout from "../layouts/MainLayout"
import StatCard from "../components/StatCard"
import PriceChart from "../charts/PriceChart"

import { AppContext } from "../context/AppContext"

function Dashboard() {
  const [selectedStock, setSelectedStock] = useState("")

  const appContext = useContext(AppContext)
  const {
    counters,
    purchases,
    sales,
    prices,
  } = appContext ?? {
    counters: [],
    purchases: [],
    sales: [],
    prices: [],
  }

  const totalPurchases =
    purchases.reduce(
      (acc, item) =>
        acc +
        item.quantity *
        item.purchasePrice,
      0
    )

  const totalSales =
    sales.reduce(
      (acc, item) =>
        acc +
        item.quantity *
        item.sellingPrice,
      0
    )

  return (
    <MainLayout>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          title="Total Counters"
          value={counters.length}
        />

        <StatCard
          title="Stocks Purchased"
          value={`KES ${totalPurchases}`}
        />

        <StatCard
          title="Stocks Sold"
          value={`KES ${totalSales}`}
        />

        <StatCard
          title="Transactions"
          value={
            purchases.length +
            sales.length
          }
        />

      </div>

      <div className="mt-8 flex justify-end">
        <select
          className="border border-gray-300 rounded-md p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedStock}
          onChange={(e) => setSelectedStock(e.target.value)}
        >
          <option value="">All Stocks (Average)</option>
          {useMemo(() => {
            const stocks = new Set(prices?.map(p => p.stock) || [])
            return Array.from(stocks)
          }, [prices]).map(stock => (
            <option key={stock} value={stock}>{stock}</option>
          ))}
        </select>
      </div>

      <div className="-mt-8">
        <PriceChart selectedStock={selectedStock} />
      </div>

    </MainLayout>
  )
}

export default Dashboard