import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function PricesTable() {
  const { prices } = useContext(AppContext)

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Daily Prices
      </h2>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="p-3 text-left">
              Stock
            </th>
            <th className="p-3 text-left">
              Date
            </th>
            <th className="p-3 text-left">
              Opening
            </th>
            <th className="p-3 text-left">
              Closing
            </th>
            <th className="p-3 text-left">
              Volume
            </th>
          </tr>
        </thead>

        <tbody>
          {prices.map((price, index) => (
            <tr key={index} className="border-b">
              <td className="p-3">
                {price.stock}
              </td>
              <td className="p-3">
                {price.date?.split?.('T')[0] || price.date}
              </td>
              <td className="p-3">
                {price.openingPrice}
              </td>
              <td className="p-3">
                {price.closingPrice}
              </td>
              <td className="p-3">
                {price.volume}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PricesTable