export default function RightPanelInput({ label, icon: Icon, value, onChange, type = "text", title, step="1" }) {
  return (
    <div className="flex items-center bg-zinc-800 border border-slate-600 rounded-md overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all group">
      {Icon ? (
        <span className="pl-2.5 text-slate-400 group-focus-within:text-blue-500"><Icon size={14} /></span>
      ) : (
        <span className="px-2.5 text-slate-100 text-[10px] font-bold select-none group-focus-within:text-blue-500">{label}</span>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      step={step}
      className="w-full py-1.5 px-2 text-xs bg-transparent outline-none font-medium text-slate-300"
      title={title}
    />
  </div>
)};