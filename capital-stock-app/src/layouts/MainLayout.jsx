import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

export default MainLayout