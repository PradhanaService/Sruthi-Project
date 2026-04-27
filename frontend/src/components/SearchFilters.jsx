import { Search } from 'lucide-react'

export default function SearchFilters({ categories, category, onCategoryChange, onSearchChange, search }) {
  return (
    <div className="luxury-surface grid gap-3 rounded-lg p-4 md:grid-cols-[1fr_16rem]">
      <label className="relative block">
        <span className="sr-only">Search posts</span>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1b7a6b]" size={18} />
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by title or category"
          className="w-full rounded-md border border-[#1b7a6b]/30 bg-[#fbfdfb] py-3 pl-10 pr-3 text-sm text-[#101820] outline-none transition focus:border-[#1b7a6b] focus:ring-4 focus:ring-[#1b7a6b]/20"
        />
      </label>
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-md border border-[#1b7a6b]/30 bg-[#fbfdfb] px-3 py-3 text-sm font-semibold text-[#314553] outline-none transition focus:border-[#1b7a6b] focus:ring-4 focus:ring-[#1b7a6b]/20"
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
