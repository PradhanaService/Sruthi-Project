import { Menu, PenLine, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition hover:bg-teal-50 hover:text-teal-800 ${
    isActive ? 'bg-teal-700 text-white hover:bg-teal-700 hover:text-white' : 'text-slate-700'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-slate-900">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-teal-700 text-white">
            <PenLine size={19} />
          </span>
          Inkline
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-md border border-stone-200 p-2 text-slate-700 md:hidden"
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
        <div className="border-t border-stone-200 bg-white px-4 py-3 md:hidden">
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
