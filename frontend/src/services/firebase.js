import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAO8wuBMGE5ojGis2_9UMcxLkgdcDqChxo',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'inkline-d699b.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'inkline-d699b',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'inkline-d699b.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '2300925871',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:2300925871:web:2c2440d4b7c25e6faac15a',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-6KZYESRENS',
}

const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'
const missingConfig = Object.values(firebaseConfig).some((value) => !value)

if (missingConfig && !useMocks) {
  throw new Error('Firebase configuration is missing. Check frontend/.env or Netlify environment variables.')
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
