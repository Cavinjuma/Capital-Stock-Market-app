import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function SalesTable() {
  const { sales } = useContext(AppContext)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Recorded Sales
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              Stock
            </th>
            <th className="p-3 text-left">
              Quantity
            </th>
            <th className="p-3 text-left">
              Purchase Price
            </th>
            <th className="p-3 text-left">
              Selling Price
            </th>
            <th className="p-3 text-left">
              Profit/Loss
            </th>
            <th className="p-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {sales.map((sale, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">
                {sale.stock}
              </td>
              <td className="p-3">
                {sale.quantity}
              </td>
              <td className="p-3">
                {sale.purchasePrice}
              </td>
              <td className="p-3">
                {sale.sellingPrice}
              </td>
              <td className={`p-3 ${sale.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {sale.profit}
              </td>
              <td className="p-3">
                {new Date(sale.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SalesTable