import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { useEffect, useMemo, useState } from 'react'
import { auth } from '../services/firebase.js'
import { AuthContext } from './authContextValue.js'
const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
const mockUserKey = 'inkline_mock_user'

function readMockUser() {
  const saved = window.localStorage.getItem(mockUserKey)
  return saved ? JSON.parse(saved) : null
}

function createMockUser(email, displayName = '') {
  return {
    uid: `mock-${email.toLowerCase()}`,
    email,
    displayName: displayName || email.split('@')[0],
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => (useMocks ? readMockUser() : null))
  const [loading, setLoading] = useState(!useMocks)

  useEffect(() => {
    if (useMocks) {
      return undefined
    }

    return onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
  }, [])

  const value = useMemo(() => ({
    user,
    loading,
    async login(email, password) {
      if (useMocks) {
        const mockUser = createMockUser(email)
        window.localStorage.setItem(mockUserKey, JSON.stringify(mockUser))
        setUser(mockUser)
        return mockUser
      }

      const credential = await signInWithEmailAndPassword(auth, email, password)
      return credential.user
    },
    async register(email, password, displayName) {
      if (useMocks) {
        const mockUser = createMockUser(email, displayName)
        window.localStorage.setItem(mockUserKey, JSON.stringify(mockUser))
        setUser(mockUser)
        return mockUser
      }

      const credential = await createUserWithEmailAndPassword(auth, email, password)
      if (displayName) {
        await updateProfile(credential.user, { displayName })
      }
      setUser(credential.user)
      return credential.user
    },
    async logout() {
      if (useMocks) {
        window.localStorage.removeItem(mockUserKey)
        setUser(null)
        return
      }

      await signOut(auth)
    },
  }), [loading, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
