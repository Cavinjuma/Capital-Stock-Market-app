import { useState, useMemo, useContext } from "react"
import MainLayout from "../layouts/MainLayout"
import PriceChart from "../charts/PriceChart"
import VolumeChart from "../charts/VolumeChart"
import ProfitLossChart from "../charts/ProfitLossChart"
import { AppContext } from "../context/AppContext"

function Reports() {
  const { counters } = useContext(AppContext)
  const [selectedStock, setSelectedStock] = useState("")

  const options = useMemo(() => {
    const uniqueStocks = Array.from(new Set(counters.map(counter => counter.symbol)))
    return ["", ...uniqueStocks]
  }, [counters])

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-bold">
            Reports & Analytics
          </h1>

          <div className="md:w-64">
            <label className="block text-sm font-medium mb-2" htmlFor="stock-select">
              Choose registered Stock
            </label>
            <select
              id="stock-select"
              className="w-full border p-3 rounded-lg"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              <option value="">All Stocks</option>
              {options.filter(stock => stock).map(stock => (
                <option key={stock} value={stock}>
                  {stock}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <PriceChart selectedStock={selectedStock} />
      <VolumeChart selectedStock={selectedStock} />
      <ProfitLossChart selectedStock={selectedStock} />
    </MainLayout>
  )
}

export default Reports