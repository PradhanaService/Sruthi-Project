export default function Loading({ label = 'Loading content...' }) {
  return (
    <div className="flex min-h-[18rem] items-center justify-center">
      <div className="flex items-center gap-3 rounded-full border border-stone-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
        <span className="h-3 w-3 animate-ping rounded-full bg-teal-600" />
        {label}
      </div>
    </div>
  )
}
