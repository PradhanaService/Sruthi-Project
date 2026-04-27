import { useEffect, useMemo, useState } from 'react'
import BlogCard from '../components/BlogCard.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import SearchFilters from '../components/SearchFilters.jsx'
import { getBlogs } from '../services/blogService.js'

export default function Blogs() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timeout = setTimeout(async () => {
      try {
        setLoading(true)
        const filteredPosts = await getBlogs({ search, category })
        setPosts(filteredPosts)
        setError('')
      } catch (err) {
        setError(err.message || 'Unable to load posts.')
      } finally {
        setLoading(false)
      }
    }, 250)

    return () => clearTimeout(timeout)
  }, [category, search])

  const categories = useMemo(() => {
    const names = posts.map((post) => post.category)
    return [...new Set(names)].sort()
  }, [posts])

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="reveal-luxury mb-8 space-y-3">
        <p className="text-sm font-black uppercase tracking-wide text-[#1b7a6b]">Public library</p>
        <h1 className="text-4xl font-black text-[#101820]">Explore all blog posts</h1>
        <p className="max-w-2xl leading-7 text-[#536872]">
          Search by title or category, then narrow the list with the category filter.
        </p>
      </div>

      <SearchFilters
        categories={categories}
        category={category}
        onCategoryChange={setCategory}
        onSearchChange={setSearch}
        search={search}
      />

      <div className="mt-8">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : posts.length === 0 ? (
          <div className="luxury-surface rounded-lg p-8 text-center text-[#536872]">
            No posts found. Try a different search.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <BlogCard key={post._id} post={post} />)}
          </div>
        )}
      </div>
    </section>
  )
}
