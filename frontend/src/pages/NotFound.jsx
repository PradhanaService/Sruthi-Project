import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-[#1b7a6b]">404</p>
      <h1 className="mt-3 text-5xl font-black text-[#101820]">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-[#536872]">
        The page you are looking for does not exist or has moved.
      </p>
      <Link to="/" className="gold-gradient shine-luxury mt-8 inline-flex rounded-md px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1b7a6b]/25 transition hover:-translate-y-0.5">
        Go home
      </Link>
    </section>
  )
}
