import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-black uppercase tracking-wide text-teal-700">404</p>
      <h1 className="mt-3 text-5xl font-black text-slate-950">Page not found</h1>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
        The page you are looking for does not exist or has moved.
      </p>
      <Link to="/" className="mt-8 inline-flex rounded-md bg-teal-700 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800">
        Go home
      </Link>
    </section>
  )
}
