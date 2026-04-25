import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
const missingConfig = Object.values(firebaseConfig).some((value) => !value)

if (missingConfig && !useMocks) {
  throw new Error('Firebase environment variables are missing. Check frontend/.env.')
}

const app = initializeApp(useMocks && missingConfig ? {
  apiKey: 'demo-api-key',
  authDomain: 'demo.firebaseapp.com',
  projectId: 'demo-project',
  storageBucket: 'demo.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:demo',
  measurementId: 'G-DEMO',
} : firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
