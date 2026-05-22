import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import TransactionsPage from "./pages/TransactionsPage"
import Counters from "./pages/Counters"
import Prices from "./pages/Prices"
import Purchases from "./pages/Purchases"
import Sales from "./pages/Sales"
import Reports from "./pages/Reports"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/counters" element={<Counters />} />
        <Route path="/prices" element={<Prices />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/purchases" element={<Purchases />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
