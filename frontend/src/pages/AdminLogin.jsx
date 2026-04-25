import { LockKeyhole } from 'lucide-react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useAuth } from '../services/useAuth.js'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setLoading(true)
      await login(credentials)
      navigate(location.state?.from?.pathname || '/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="space-y-5">
        <span className="inline-grid h-12 w-12 place-items-center rounded-lg bg-teal-700 text-white">
          <LockKeyhole size={23} />
        </span>
        <h1 className="text-4xl font-black text-slate-950">Admin login</h1>
        <p className="max-w-xl leading-7 text-slate-600">
          Sign in to create, edit, delete, publish, and unpublish blog posts.
        </p>
        <div className="rounded-lg border border-stone-200 bg-white p-4 text-sm text-slate-600">
          Use the admin account created in Firebase Authentication.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <ErrorMessage message={error} />
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Email
          <input
            type="email"
            required
            value={credentials.email}
            onChange={(event) => setCredentials((current) => ({ ...current, email: event.target.value }))}
            className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          />
        </label>
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Password
          <input
            type="password"
            required
            value={credentials.password}
            onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))}
            className="w-full rounded-md border border-stone-300 px-3 py-3 outline-none focus:border-teal-700 focus:ring-4 focus:ring-teal-100"
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-teal-700 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800 disabled:bg-slate-400"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </section>
  )
}
