import { useContext } from "react"
import { AppContext } from "../context/AppContext"

function CountersTable() {

  const { counters } =
    useContext(AppContext)

  return (

      <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-white">
        Registered Counters
      </h2>

       <div className="overflow-x-auto">
        <table className="w-full">

        <thead>
          <tr className="border-b">

            <th className="p-3 text-left">
              Company
            </th>

            <th className="p-3 text-left">
              Symbol
            </th>

            <th className="p-3 text-left">
              Sector
            </th>

          </tr>
        </thead>

        <tbody>

          {counters.map((counter, index) => (

            <tr key={index} className="border-b">

              <td className="p-3">
                {counter.companyName}
              </td>

              <td className="p-3">
                {counter.symbol}
              </td>

              <td className="p-3">
                {counter.sector}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
    </div>
  )
}

export default CountersTable