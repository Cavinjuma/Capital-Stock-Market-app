import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-[#1f2937] bg-[#0b0f19] shadow-sm">  
      <Link to="/" className="flex items-center space-x-3">
        <div className="bg-[#6366f1] p-2 rounded-lg flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
        </div>
        <h1 className="text-xl font-bold text-white tracking-wide">Capital Stock Market</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <Link to="/counters" className="flex items-center bg-[#6366f1] hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          Register Stock
        </Link>
        <Link to="/transactions" className="flex items-center bg-[#1f2937] hover:bg-gray-700 text-white px-4 py-2 rounded-md font-medium transition-colors text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
          </svg>
          Transaction
        </Link>
      </div>
    </nav>
  )
}

export default Navbar