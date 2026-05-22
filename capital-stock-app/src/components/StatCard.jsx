function StatCard({ title, value, icon, valueColor = "text-white" }) {
  return (
    <div className="bg-[#131722] p-6 rounded-xl border border-[#1f2937] shadow-sm flex flex-col justify-between h-[130px]">
      <div className="flex justify-between items-start">
        <h3 className="text-gray-400 text-sm font-medium">
          {title}
        </h3>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>

      <p className={`text-3xl font-bold ${valueColor} font-mono mt-auto tracking-tight`}>
        {value}
      </p>
    </div>
  )
}

export default StatCard