import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  where,
} from 'firebase/firestore'
import samplePosts from '../src/utils/samplePosts.js'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
}

function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

if (Object.values(firebaseConfig).some((value) => !value)) {
  throw new Error('Firebase env values are missing. Create frontend/.env first.')
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

for (const post of samplePosts) {
  const slug = createSlug(post.title)
  const existing = await getDocs(query(collection(db, 'blogs'), where('slug', '==', slug)))

  if (!existing.empty) {
    console.log(`Skipped existing post: ${post.title}`)
    continue
  }

  await addDoc(collection(db, 'blogs'), {
    ...post,
    slug,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  console.log(`Seeded post: ${post.title}`)
}

console.log('Firestore seed complete.')
