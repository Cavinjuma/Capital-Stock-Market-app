import { useState, useContext } from "react"
import { AppContext } from "../context/AppContext"
import api from "../services/api"

function SalesForm() {
  const { counters, sales, setSales } = useContext(AppContext)
  const [formData, setFormData] = useState({
    stock: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    createdAt: new Date().toISOString().split("T")[0],
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
      const response = await api.post('/sales', {
        stock: formData.stock,
        quantity: Number(formData.quantity),
        purchasePrice: Number(formData.purchasePrice),
        sellingPrice: Number(formData.sellingPrice),
        createdAt: formData.createdAt,
      })

      setSales([
        ...sales,
        response.data,
      ])

      const profit =
        (response.data.sellingPrice - response.data.purchasePrice) *
        response.data.quantity

      setFormData({
        stock: "",
        quantity: "",
        purchasePrice: "",
        sellingPrice: "",
        createdAt: new Date().toISOString().split("T")[0],
      })

      alert(`Profit/Loss: KES ${profit}`)
    } catch (error) {
      console.error('Failed to save sale', error)
      alert('Unable to save sale. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">
        Record Stock Sale
      </h2>

      <div className="grid md:grid-cols-5 gap-4">

        <select
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-3 rounded-lg"
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

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="purchasePrice"
          placeholder="Purchase Price"
          value={formData.purchasePrice}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          step="0.01"
          required
        />

        <input
          type="number"
          name="sellingPrice"
          placeholder="Selling Price"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          step="0.01"
          required
        />

        <input
          type="date"
          name="createdAt"
          value={formData.createdAt}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

      </div>

      <button className="bg-black text-white px-6 py-3 rounded-lg mt-6">
        Save Sale
      </button>
    </form>
  )
}

export default SalesForm