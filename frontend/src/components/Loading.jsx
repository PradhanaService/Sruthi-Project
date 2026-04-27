export default function Loading({ label = 'Loading content...' }) {
  return (
    <div className="flex min-h-[18rem] items-center justify-center">
      <div className="luxury-surface flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-[#5d4a35]">
        <span className="h-3 w-3 animate-ping rounded-full bg-[#b8893e]" />
        {label}
      </div>
    </div>
  )
}
