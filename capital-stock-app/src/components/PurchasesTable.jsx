import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function PurchasesTable() {
  const { purchases } = useContext(AppContext)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Recorded Purchases
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
              Total Cost
            </th>
            <th className="p-3 text-left">
              Date
            </th>
          </tr>
        </thead>

        <tbody>
          {purchases.map((purchase, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">
                {purchase.stock}
              </td>
              <td className="p-3">
                {purchase.quantity}
              </td>
              <td className="p-3">
                {purchase.purchasePrice}
              </td>
              <td className="p-3">
                {purchase.quantity * purchase.purchasePrice}
              </td>
              <td className="p-3">
                {new Date(purchase.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PurchasesTable