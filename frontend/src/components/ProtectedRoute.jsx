import { Navigate, useLocation } from 'react-router-dom'
import Loading from './Loading.jsx'
import { useAuth } from '../hooks/useAuth.js'

export default function ProtectedRoute({ children }) {
  const { loading, user } = useAuth()
  const location = useLocation()

  if (loading) return <Loading label="Checking your profile..." />

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return children
}
