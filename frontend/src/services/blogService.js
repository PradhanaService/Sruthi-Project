import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit as limitQuery,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import { db } from './firebase.js'
import mockApi from './mockApi.js'

const blogsCollection = collection(db, 'blogs')
const useMocks = import.meta.env.VITE_USE_MOCKS === 'true'

function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function normalizeDate(value) {
  if (!value) return new Date().toISOString()
  if (typeof value === 'string') return value
  if (value.toDate) return value.toDate().toISOString()
  return new Date(value).toISOString()
}

function normalizePost(docSnapshot) {
  const data = docSnapshot.data()
  return {
    id: docSnapshot.id,
    _id: docSnapshot.id,
    ...data,
    createdAt: normalizeDate(data.createdAt),
    updatedAt: normalizeDate(data.updatedAt),
  }
}

function matchesSearch(post, search) {
  if (!search) return true
  const term = search.toLowerCase()
  return post.title.toLowerCase().includes(term) || post.category.toLowerCase().includes(term)
}

function getWritableBlogFields(payload) {
  return {
    title: payload.title,
    shortDescription: payload.shortDescription,
    content: payload.content,
    category: payload.category,
    authorName: payload.authorName,
    authorUid: payload.authorUid,
    coverImageUrl: payload.coverImageUrl,
    published: Boolean(payload.published),
  }
}

export async function getBlogs({ category = '', limit = null, search = '' } = {}) {
  if (useMocks) {
    const { data } = await mockApi.get('/blogs', {
      params: { category, limit, search },
    })
    return data.blogs
  }

  const constraints = [orderBy('createdAt', 'desc')]

  constraints.unshift(where('published', '==', true))

  if (limit && !search) {
    constraints.push(limitQuery(Number(limit)))
  }

  const snapshot = await getDocs(query(blogsCollection, ...constraints))
  let posts = snapshot.docs
    .map(normalizePost)
    .filter((post) => !category || post.category === category)
    .filter((post) => matchesSearch(post, search))

  if (limit) {
    posts = posts.slice(0, Number(limit))
  }

  return posts
}

export async function getBlogBySlug(slug) {
  if (useMocks) {
    const { data } = await mockApi.get(`/blogs/${slug}`)
    return data.blog
  }

  const snapshot = await getDocs(query(
    blogsCollection,
    where('slug', '==', slug),
    where('published', '==', true),
    limitQuery(1)
  ))
  if (snapshot.empty) {
    throw new Error('Blog post not found.')
  }

  const post = normalizePost(snapshot.docs[0])
  if (!post.published) {
    throw new Error('Blog post not found.')
  }

  return post
}

export async function createBlog(payload) {
  if (useMocks) {
    const { data } = await mockApi.post('/blogs', payload)
    return data.blog
  }

  const now = serverTimestamp()
  const blogFields = getWritableBlogFields(payload)
  const docRef = await addDoc(blogsCollection, {
    ...blogFields,
    slug: createSlug(payload.title),
    createdAt: now,
    updatedAt: now,
  })

  return { id: docRef.id, _id: docRef.id, ...payload }
}

export async function getMyBlogs(userId) {
  if (useMocks) {
    const { data } = await mockApi.get('/me/blogs', { params: { userId } })
    return data.blogs
  }

  const snapshot = await getDocs(query(blogsCollection, where('authorUid', '==', userId)))
  return snapshot.docs
    .map(normalizePost)
    .sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt))
}

export async function updateBlog(postId, payload) {
  if (useMocks) {
    const { data } = await mockApi.put(`/blogs/${postId}`, payload)
    return data.blog
  }

  const blogRef = doc(db, 'blogs', postId)
  const blogFields = getWritableBlogFields(payload)
  await updateDoc(blogRef, {
    ...blogFields,
    slug: createSlug(payload.title),
    updatedAt: serverTimestamp(),
  })

  return { id: postId, _id: postId, ...blogFields, slug: createSlug(payload.title) }
}

export async function deleteBlog(postId) {
  if (useMocks) {
    await mockApi.delete(`/blogs/${postId}`)
    return
  }

  await deleteDoc(doc(db, 'blogs', postId))
}
