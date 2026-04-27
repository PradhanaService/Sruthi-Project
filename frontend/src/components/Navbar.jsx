import { Menu, PenLine, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition duration-300 hover:bg-[#f2dfb8] hover:text-[#2a2118] ${
    isActive ? 'gold-gradient text-[#1d1710] shadow-lg shadow-[#9b7130]/20' : 'text-[#5b4b38]'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#d8bf8b]/30 bg-[#fff8ec]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-[#241c14]">
          <span className="gold-gradient grid h-9 w-9 place-items-center rounded-lg text-[#20170e] shadow-lg shadow-[#a7792f]/25">
            <PenLine size={19} />
          </span>
          Inkline
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-md border border-[#d8bf8b]/50 p-2 text-[#4a3a2a] md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <div className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/blogs" className={linkClass}>Blogs</NavLink>
          <NavLink to="/write" className={linkClass}>Write</NavLink>
        </div>
      </nav>

      {open && (
        <div className="border-t border-[#d8bf8b]/30 bg-[#fff8ec] px-4 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>Home</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/blogs" className={linkClass}>Blogs</NavLink>
            <NavLink onClick={() => setOpen(false)} to="/write" className={linkClass}>Write</NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
