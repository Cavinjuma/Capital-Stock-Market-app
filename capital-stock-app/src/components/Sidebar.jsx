import { Link, useLocation } from "react-router-dom"

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Stock Counters", path: "/counters" },
    { name: "Daily Prices", path: "/prices" },
    { name: "Purchases", path: "/purchases" },
    { name: "Sales", path: "/sales" },
    { name: "Reports", path: "/reports" },
  ]

  return (
    <div className="w-64 min-h-screen bg-black text-white p-5">
      <h1 className="text-2xl font-bold mb-10">
        <i><u>Capital Stock App</u></i>
      </h1>

      <div className="flex flex-col gap-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`p-3 rounded-lg transition ${
              location.pathname === item.path
                ? "bg-white text-black"
                : "hover:bg-gray-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar