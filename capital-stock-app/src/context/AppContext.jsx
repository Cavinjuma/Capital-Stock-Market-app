import { createContext, useState, useEffect } from "react"
import api from "../services/api"

const AppContext = createContext({
  counters: [],
  setCounters: () => {},
  prices: [],
  setPrices: () => {},
  purchases: [],
  setPurchases: () => {},
  sales: [],
  setSales: () => {},
})

function AppProvider({ children }) {

  const [counters, setCounters] = useState([])
  const [prices, setPrices] = useState([])
  const [purchases, setPurchases] = useState([])
  const [sales, setSales] = useState([])

  useEffect(() => {
    const fetchCounters = async () => {
      try {
        const response = await api.get('/counters')
        setCounters(response.data)
      } catch (error) {
        console.error('Failed to fetch counters', error)
      }
    }

    fetchCounters()
  }, [])

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await api.get('/prices')
        setPrices(response.data)
      } catch (error) {
        console.error('Failed to fetch prices', error)
      }
    }

    fetchPrices()
  }, [])

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get('/purchases')
        setPurchases(response.data)
      } catch (error) {
        console.error('Failed to fetch purchases', error)
      }
    }

    fetchPurchases()
  }, [])

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await api.get('/sales')
        setSales(response.data)
      } catch (error) {
        console.error('Failed to fetch sales', error)
      }
    }

    fetchSales()
  }, [])

  return (
    <AppContext.Provider
      value={{
        counters,
        setCounters,

        prices,
        setPrices,

        purchases,
        setPurchases,

        sales,
        setSales,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export { AppContext }