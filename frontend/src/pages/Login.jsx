import { LockKeyhole, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import { useAuth } from '../hooks/useAuth.js'

const fieldClass = 'w-full rounded-md border border-[#1b7a6b]/30 bg-[#fbfdfb] px-3 py-3 text-sm text-[#101820] outline-none transition focus:border-[#1b7a6b] focus:ring-4 focus:ring-[#1b7a6b]/20'

function getFriendlyError(error) {
  if (error.code === 'auth/email-already-in-use') return 'An account already exists for this email.'
  if (error.code === 'auth/invalid-credential') return 'Email or password is incorrect.'
  if (error.code === 'auth/weak-password') return 'Use a password with at least 6 characters.'
  return error.message || 'Unable to complete login.'
}

export default function Login() {
  const [mode, setMode] = useState('login')
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const { login, register, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  if (user) return <Navigate to="/profile" replace />

  const submitLabel = mode === 'login' ? 'Login' : 'Create account'
  const destination = location.state?.from || '/profile'

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSaving(true)
      setError('')
      if (mode === 'login') {
        await login(email, password)
      } else {
        await register(email, password, displayName)
      }
      navigate(destination, { replace: true })
    } catch (err) {
      setError(getFriendlyError(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-4 py-12 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="reveal-luxury self-center">
        <p className="text-sm font-black uppercase tracking-wide text-[#1b7a6b]">Profile access</p>
        <h1 className="mt-2 text-4xl font-black leading-tight text-[#101820] md:text-5xl">Login to manage your writing</h1>
        <p className="mt-4 max-w-xl leading-7 text-[#536872]">
          Your profile keeps your posts together so you can edit drafts, publish updates, or remove posts when needed.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="luxury-surface reveal-luxury space-y-5 rounded-lg p-6">
        <div className="inline-flex rounded-md border border-[#1b7a6b]/25 bg-[#e3f0ed] p-1">
          <button
            type="button"
            onClick={() => setMode('login')}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-black transition ${mode === 'login' ? 'gold-gradient text-white' : 'text-[#314553]'}`}
          >
            <LockKeyhole size={16} /> Login
          </button>
          <button
            type="button"
            onClick={() => setMode('register')}
            className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-black transition ${mode === 'register' ? 'gold-gradient text-white' : 'text-[#314553]'}`}
          >
            <UserPlus size={16} /> Sign up
          </button>
        </div>

        <ErrorMessage message={error} />

        {mode === 'register' && (
          <label className="block space-y-2 text-sm font-bold text-[#314553]">
            Display Name
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} className={fieldClass} />
          </label>
        )}

        <label className="block space-y-2 text-sm font-bold text-[#314553]">
          Email
          <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className={fieldClass} />
        </label>

        <label className="block space-y-2 text-sm font-bold text-[#314553]">
          Password
          <input required minLength="6" type="password" value={password} onChange={(event) => setPassword(event.target.value)} className={fieldClass} />
        </label>

        <button
          type="submit"
          disabled={saving}
          className="gold-gradient shine-luxury w-full rounded-md px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1b7a6b]/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Please wait...' : submitLabel}
        </button>

        <p className="text-center text-sm font-semibold text-[#536872]">
          Want to read first? <Link to="/blogs" className="font-black text-[#1b7a6b]">Explore blogs</Link>
        </p>
      </form>
    </section>
  )
}
