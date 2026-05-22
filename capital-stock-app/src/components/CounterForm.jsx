import { useState, useContext } from "react"
import { AppContext } from "../context/AppContext"
import api from "../services/api"

function CounterForm() {

  const { counters, setCounters } =
    useContext(AppContext)

  const [formData, setFormData] = useState({
    companyName: "",
    symbol: "",
    sector: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await api.post('/counters', formData)
      setCounters([
        ...counters,
        response.data,
      ])

      setFormData({
        companyName: "",
        symbol: "",
        sector: "",
      })

      alert("Counter Saved")
    } catch (error) {
      console.error('Failed to save counter', error)
      alert('Unable to save counter. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="text-xl font-bold mb-4 text-white"
    >
      <h2 className="text-2xl font-bold mb-6">
        Register Stock Counter
      </h2>

      <div className="mb-4">
        <label className="block mb-2">
          Company Name
        </label>

        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg" required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">
          Stock Symbol
        </label>

        <input
          type="text"
          name="symbol"
          value={formData.symbol}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg" required
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2">
          Market Sector
        </label>

        <input
          type="text"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />
      </div>

      <button className="bg-black text-white px-6 py-3 rounded-lg">
        Register Stock
      </button>
    </form>
  )
}

export default CounterForm