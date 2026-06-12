import { useContext, useState, useMemo } from "react"
import MainLayout from "../layouts/MainLayout"
import StatCard from "../components/StatCard"
import PurchasesTable from "../components/PurchasesTable"
import SalesTable from "../components/SalesTable"
import PriceForm from "../components/PriceForm"
import PriceChart from "../charts/PriceChart"
import VolumeChart from "../charts/VolumeChart"
import ProfitLossChart from "../charts/ProfitLossChart"
import { AppContext } from "../context/AppContext"
import CountersTable from "../components/CountersTable"
import StockMarket from "../components/StockMarket"
import StockTicker from "../components/StockTicker"
import MobileAppPopup from "../components/MobileAppPopup"


function Dashboard() {
  
const [activeTab, setActiveTab] = useState("Holdings")   
const [selectedStock, setSelectedStock] = useState("")   
const appContext = useContext(AppContext)   
const { counters, purchases = [], sales = [], prices = [] } = appContext ?? {
    counters: [],
    purchases: [],
    sales: [],
    prices: [],
  }   
const stocksList = useMemo(() => {     
  const stocks = new Set(prices?.map(p => p.stock) || [])     
  return Array.from(stocks)   }, [prices])
   

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
        <StockTicker />
          <MobileAppPopup />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        
        <StatCard
          title="Registered Counters"
          value={counters.length}
        />

        <StatCard
          
          title="Stocks Purchased"
          value={`Ksh ${totalPurchases}`}
          valueColor=" text-[#00ff88]"
        />

        <StatCard
          title="Stocks Sold"
          value={`Ksh ${totalSales}`}
          valueColor='text-red-500' 
        />

        <StatCard
          title="Total Transactions"
          value={
            purchases.length +
            sales.length
          }
        />

      </div>
            <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
               <StockMarket />
            </div>
         
      <div className="border-b border-[#1f2937] mb-6">
        <nav className="flex space-x-10">
          {["Holdings", "Daily Prices", "Transactions", "Analytics"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-1 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab 
                  ? "border-indigo-500 text-white" 
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>



      {activeTab === "Holdings" && (
        <div className="space-y-8">
          <div className="flex justify-end">
            <select
              className="bg-[#131722] border border-[#1f2937] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              <option value="">All Stocks (Average)</option>
              {stocksList.map(stock => (
                <option key={stock} value={stock}>{stock}</option>
              ))}
            </select>
          </div>
          <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
            <PriceChart selectedStock={selectedStock} />
          </div>
            <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
               <CountersTable />
            </div>
        </div>
            
      )}

       {activeTab === "Daily Prices" && (
        <div className="space-y-8 bg-[#131722]">
          <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-2">
            <PriceForm />
          </div>
          
        </div>
      )}
      
      {activeTab === "Transactions" && (
        <div className="space-y-8">
          <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-2">
            <PurchasesTable />
          </div>
          <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-2">
            <SalesTable />
          </div>
        </div>
      )}
      
      {activeTab === "Analytics" && (
        <div className="space-y-6"> 
          <div className="flex justify-end">
            <select
              className="bg-[#131722] border border-[#1f2937] rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              <option value="">All Stocks (Average)</option>
              {stocksList.map(stock => (
                <option key={stock} value={stock}>{stock}</option>
              ))}
            </select>
          </div>
          <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
            <PriceChart selectedStock={selectedStock} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
              <VolumeChart selectedStock={selectedStock} />
            </div>
            <div className="bg-[#131722] rounded-xl border border-[#1f2937] overflow-hidden p-6">
              <ProfitLossChart selectedStock={selectedStock} />
            </div>
          </div>
        </div>
      )}
        
      

    </MainLayout>
  )
}

export default Dashboard