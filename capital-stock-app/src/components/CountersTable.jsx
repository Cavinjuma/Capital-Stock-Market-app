import { useContext } from "react"
import { useState }from "react"
import { AppContext } from "../context/AppContext"

function CountersTable() {

  const { counters } = useContext(AppContext)
  const [isExpanded, setIsExpanded] = useState(false);

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
          
          {counters
          .slice(0, isExpanded ? counters.length : 3)
          .map((counter, index) => (

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
            {counters.length === 0 && (
    <tr>
      <td colSpan="3" className="p-4 text-center text-gray-500">No counters found.</td>
    </tr>
  )}
        </tbody>

      </table>

      {counters.length > 3 && (
   <div className="bg-purple-500 text-white px-6 py-3 rounded-lg mt-6 btn-container">
    <button
      className="toggle-btn"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {isExpanded ? 'See Less' : 'See More...'}
    </button>
  </div>
  )}

    </div>
    </div>
  )
}

export default CountersTable