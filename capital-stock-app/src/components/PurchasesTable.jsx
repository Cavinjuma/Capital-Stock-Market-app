import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function PurchasesTable() {
  const { purchases } = useContext(AppContext)

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">
        Recorded Purchases
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-gray-400 border-b border-[#1f2937]">
            <tr>
              <th className="p-3 font-medium">Stock</th>
              <th className="p-3 font-medium">Quantity</th>
              <th className="p-3 font-medium">Purchase Price</th>
              <th className="p-3 font-medium">Total Cost</th>
              <th className="p-3 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index} className="border-b border-[#1f2937] hover:bg-[#1a1f2e] transition-colors">
                <td className="p-3 font-bold text-white">{purchase.stock}</td>
                <td className="p-3">{purchase.quantity}</td>
                <td className="p-3">Ksh {purchase.purchasePrice}</td>
                <td className="p-3">Ksh {(purchase.quantity * purchase.purchasePrice).toFixed(2)}</td>
                <td className="p-3">{new Date(purchase.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {purchases.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">No purchases found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PurchasesTable