import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function SalesTable() {
  const { sales } = useContext(AppContext)

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">
        Recorded Sales
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-300">
          <thead className="text-gray-400 border-b border-[#1f2937]">
            <tr>
              <th className="p-3 font-medium">Stock</th>
              <th className="p-3 font-medium">Quantity</th>
              <th className="p-3 font-medium">Purchase Price</th>
              <th className="p-3 font-medium">Selling Price</th>
              <th className="p-3 font-medium">Profit/Loss</th>
              <th className="p-3 font-medium">Date</th>
            </tr>
          </thead>

          <tbody>
            {sales.map((sale, index) => (
              <tr key={index} className="border-b border-[#1f2937] hover:bg-[#1a1f2e] transition-colors">
                <td className="p-3 font-bold text-white">{sale.stock}</td>
                <td className="p-3">{sale.quantity}</td>
                <td className="p-3">Ksh {sale.purchasePrice}</td>
                <td className="p-3">Ksh {sale.sellingPrice}</td>
                <td className={`p-3 font-medium ${sale.profit >= 0 ? 'text-[#00ff88]' : 'text-red-500'}`}>
                  Ksh {sale.profit}
                </td>
                <td className="p-3">{new Date(sale.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
            {sales.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No sales found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SalesTable