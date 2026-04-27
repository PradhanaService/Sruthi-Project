import { Menu, PenLine, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }) =>
  `rounded-md px-3 py-2 text-sm font-semibold transition duration-300 hover:bg-[#dce8e4] hover:text-[#0c2230] ${
    isActive ? 'gold-gradient text-white shadow-lg shadow-[#1b7a6b]/20' : 'text-[#314553]'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#1b7a6b]/20 bg-[#f8fbfa]/90 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-lg font-black tracking-tight text-[#101820]">
          <span className="gold-gradient grid h-9 w-9 place-items-center rounded-lg text-white shadow-lg shadow-[#1b7a6b]/25">
            <PenLine size={19} />
          </span>
          Inkline
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation"
          className="rounded-md border border-[#1b7a6b]/30 p-2 text-[#314553] md:hidden"
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
        <div className="border-t border-[#1b7a6b]/20 bg-[#f8fbfa] px-4 py-3 md:hidden">
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
