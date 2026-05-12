import { useState, useContext } from "react"
import { AppContext } from "../context/AppContext"
import api from "../services/api"

function PurchaseForm() {
  const { counters, purchases, setPurchases } = useContext(AppContext)
  const [formData, setFormData] = useState({
    stock: "",
    quantity: "",
    purchasePrice: "",
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
      const response = await api.post('/purchases', {
        stock: formData.stock,
        quantity: Number(formData.quantity),
        purchasePrice: Number(formData.purchasePrice),
        createdAt: formData.createdAt,
      })

      setPurchases([
        ...purchases,
        response.data,
      ])

      const total = response.data.quantity * response.data.purchasePrice

      setFormData({
        stock: "",
        quantity: "",
        purchasePrice: "",
        createdAt: new Date().toISOString().split("T")[0],
      })

      alert(`Purchase Recorded: KES ${total}`)
    } catch (error) {
      console.error('Failed to save purchase', error)
      alert('Unable to save purchase. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-sm"
    >
      <h2 className="text-2xl font-bold mb-6">
        Record Stock Purchase
      </h2>

      <div className="grid md:grid-cols-4 gap-4">

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
          type="date"
          name="createdAt"
          value={formData.createdAt}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

      </div>

      <button className="bg-black text-white px-6 py-3 rounded-lg mt-6">
        Save Purchase
      </button>
    </form>
  )
}

export default PurchaseForm