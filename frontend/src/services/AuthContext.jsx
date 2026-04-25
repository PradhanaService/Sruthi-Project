import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import AuthContext from './authStore.js'
import { auth } from './firebase.js'
import mockApi from './mockApi.js'

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    if (!useMocks) return null
    const savedAdmin = localStorage.getItem('blogAdmin')
    return savedAdmin ? JSON.parse(savedAdmin) : null
  })
  const [loading, setLoading] = useState(!useMocks)

  useEffect(() => {
    if (useMocks) {
      return undefined
    }

    return onAuthStateChanged(auth, (user) => {
      setAdmin(user ? { id: user.uid, email: user.email, name: user.displayName || 'Admin User' } : null)
      setLoading(false)
    })
  }, [])

  const login = async (credentials) => {
    if (useMocks) {
      const { data } = await mockApi.post('/auth/login', credentials)
      localStorage.setItem('blogAdmin', JSON.stringify(data.admin))
      setAdmin(data.admin)
      return data
    }

    const result = await signInWithEmailAndPassword(auth, credentials.email, credentials.password)
    const loggedInAdmin = {
      id: result.user.uid,
      email: result.user.email,
      name: result.user.displayName || 'Admin User',
    }
    setAdmin(loggedInAdmin)
    return { admin: loggedInAdmin }
  }

  const logout = async () => {
    if (!useMocks) {
      await signOut(auth)
    }
    localStorage.removeItem('blogAdmin')
    setAdmin(null)
  }

  const value = useMemo(() => ({ admin, loading, login, logout, token: admin }), [admin, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
