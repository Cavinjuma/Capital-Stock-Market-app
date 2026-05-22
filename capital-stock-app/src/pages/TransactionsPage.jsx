import { useState } from "react"
import MainLayout from "../layouts/MainLayout"
import PurchaseForm from "../components/PurchaseForm"
import SalesForm from "../components/SalesForm"

function TransactionsPage() {
  const [activeForm, setActiveForm] = useState("purchase")

  return (
    <MainLayout>
      <div className="mb-6 flex justify-between items-center border-b border-[#1f2937] pb-4">
        <h2 className="text-2xl font-bold text-white">Record Transaction</h2>
        <div className="flex space-x-2 bg-[#131722] p-1 rounded-lg border border-[#1f2937]">
          <button
            onClick={() => setActiveForm("purchase")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeForm === "purchase"
                ? "bg-[#3cd53c] text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Buy
          </button>
          <button
            onClick={() => setActiveForm("sale")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeForm === "sale"
                ? "bg-[#db3636] text-white border border-[#374151]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      <div className="mt-6">
        {activeForm === "purchase" ? <PurchaseForm /> : <SalesForm />}
      </div>
    </MainLayout>
  )
}

export default TransactionsPage
