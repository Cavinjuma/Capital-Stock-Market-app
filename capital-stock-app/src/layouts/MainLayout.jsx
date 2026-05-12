import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  return (
    <div className="relative">
      <div className="fixed left-0 top-0 h-full z-20">
        <Sidebar />
      </div>

      <div className="ml-64 relative min-h-screen p-6 overflow-hidden">
        <div
          className="fixed inset-0"
          style={{
            backgroundImage: "url('/capital%20market.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(6px) brightness(0.8)',
            transform: 'scale(1.05)',
            zIndex: -2,
            pointerEvents: 'none',
          }}
        />

        <div className="fixed inset-0 bg-white/20 backdrop-blur-sm" style={{ zIndex: -1, pointerEvents: 'none' }} />

        <div className="relative z-10">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  )
}

export default MainLayout