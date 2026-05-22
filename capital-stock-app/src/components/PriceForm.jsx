import { useState, useContext } from "react"
import { AppContext } from "../context/AppContext"
import api from "../services/api"

function PriceForm() {
  const { counters, prices, setPrices } = useContext(AppContext)

  const [formData, setFormData] = useState({
    stock: "",
    openingPrice: "",
    closingPrice: "",
    volume: "",
    date: new Date().toISOString().split('T')[0], // Default to today
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if entry already exists for this counter and date
    const isDuplicate = prices.some(
      (price) =>
        price.stock === formData.stock &&
        price.date.split('T')[0] === formData.date
    )

    if (isDuplicate) {
      alert("Price for this counter already recorded for this date!" + "\n" + "Kindly record the next Stock Counter.")
      return
    }

    try {
      const response = await api.post('/prices', {
        stock: formData.stock,
        date: formData.date,
        openingPrice: Number(formData.openingPrice),
        closingPrice: Number(formData.closingPrice),
        volume: Number(formData.volume),
      })

      setPrices([
        ...prices,
        response.data,
      ])

      setFormData({
        stock: "",
        openingPrice: "",
        closingPrice: "",
        volume: "",
        date: new Date().toISOString().split('T')[0],
      })

      alert("Daily Price Recorded")
    } catch (error) {
      console.error('Failed to save price', error)
      alert('Unable to save daily price. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#131722] p-6 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">
        Record Daily Stock Price
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-2">
            Stock Counter
          </label>

          <select
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="bg-[#131722] border p-3 rounded-lg"
            required
          >
            <option value="">
              Select Stock
            </option>
            {counters.map((counter, index) => (
              <option key={index} value={counter.symbol}>
                {counter.companyName} ({counter.symbol})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-2">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Opening Price
          </label>

          <input
            type="number"
            name="openingPrice"
            value={formData.openingPrice}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block mb-2">
            Closing Price
          </label>

          <input
            type="number"
            name="closingPrice"
            value={formData.closingPrice}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            step="0.01"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-2">
            Trading Volume
          </label>

          <input
            type="number"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />
        </div>

      </div>

      <button className="bg-black text-white px-6 py-3 rounded-lg mt-6">
        Save Daily Price
      </button>
    </form>
  )
}

export default PriceForm