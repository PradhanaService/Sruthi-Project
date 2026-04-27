import samplePosts from '../utils/samplePosts.js'

const now = new Date().toISOString()

function createSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

let posts = samplePosts.map((post, index) => ({
  ...post,
  _id: String(index + 1),
  id: String(index + 1),
  slug: createSlug(post.title),
  createdAt: now,
  updatedAt: now,
}))

function filterPosts(params = {}) {
  let filtered = posts.filter((post) => post.published)

  if (params.category) {
    filtered = filtered.filter((post) => post.category.toLowerCase() === params.category.toLowerCase())
  }

  if (params.search) {
    const term = params.search.toLowerCase()
    filtered = filtered.filter((post) => (
      post.title.toLowerCase().includes(term) || post.category.toLowerCase().includes(term)
    ))
  }

  if (params.limit) {
    filtered = filtered.slice(0, Number(params.limit))
  }

  return filtered
}

const mockApi = {
  async get(url, config = {}) {
    await new Promise((resolve) => setTimeout(resolve, 120))

    if (url === '/blogs') {
      const blogs = filterPosts(config.params)
      return { data: { count: blogs.length, blogs } }
    }

    if (url.startsWith('/blogs/')) {
      const slug = url.split('/').pop()
      const blog = posts.find((post) => post.slug === slug)
      if (!blog) throw { response: { data: { message: 'Blog post not found.' } } }
      return { data: { blog } }
    }

    return { data: {} }
  },
  async post(url, payload) {
    if (url === '/blogs') {
      const id = crypto.randomUUID()
      const blog = {
        ...payload,
        _id: id,
        id,
        slug: createSlug(payload.title),
        createdAt: now,
        updatedAt: now,
      }
      posts = [blog, ...posts]
      return { data: { blog } }
    }

    return { data: {} }
  },
  async put(url, payload) {
    const id = url.split('/').pop()
    posts = posts.map((post) => (
      post._id === id
        ? { ...post, ...payload, slug: createSlug(payload.title), updatedAt: new Date().toISOString() }
        : post
    ))
    return { data: { blog: posts.find((post) => post._id === id) } }
  },
  async delete(url) {
    const id = url.split('/').pop()
    posts = posts.filter((post) => post._id !== id)
    return { data: { message: 'Blog post deleted successfully.' } }
  },
}

export default mockApi
