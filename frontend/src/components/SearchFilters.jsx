import { Search } from 'lucide-react'

export default function SearchFilters({ categories, category, onCategoryChange, onSearchChange, search }) {
  return (
    <div className="grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm md:grid-cols-[1fr_16rem]">
      <label className="relative block">
        <span className="sr-only">Search posts</span>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or category"
          className="w-full rounded-md border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
        />
      </label>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-md border border-stone-300 bg-white px-3 py-3 text-sm font-semibold text-slate-700 outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
