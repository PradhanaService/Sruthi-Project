import { ArrowRight, BookOpen, Database, Layers } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BlogCard from '../components/BlogCard.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import { getBlogs } from '../services/blogService.js'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        const latestPosts = await getBlogs({ limit: 3 })
        setPosts(latestPosts)
      } catch (err) {
        setError(err.message || 'Unable to load latest posts.')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <>
      <section className="border-b border-[#1b7a6b]/20 bg-[#f8fbfa]/60">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <div className="reveal-luxury space-y-7">
            <span className="inline-flex rounded-full border border-[#1b7a6b]/30 bg-[#e3f0ed] px-4 py-2 text-sm font-black text-[#1b7a6b] shadow-sm">
              Luxury editorial publishing
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-black leading-tight text-[#101820] sm:text-5xl lg:text-6xl">
                Read sharp ideas and share your own posts with the community.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[#536872]">
                Inkline is a Firebase blog platform with public reading pages, search, categories,
                and a simple writing form for uploading new posts.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/blogs" className="gold-gradient shine-luxury inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1b7a6b]/25 transition hover:-translate-y-0.5">
                Browse posts <ArrowRight size={18} />
              </Link>
              <Link to="/write" className="inline-flex items-center gap-2 rounded-md border border-[#1b7a6b]/40 bg-[#fbfdfb] px-5 py-3 text-sm font-black text-[#101820] shadow-sm transition hover:-translate-y-0.5 hover:border-[#1b7a6b] hover:text-[#1b7a6b]">
                Write a post
              </Link>
            </div>
          </div>

          <div className="luxury-panel float-luxury overflow-hidden rounded-lg border border-[#9ad0c5]/20">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80"
              alt="Desk with writing tools"
              className="h-72 w-full object-cover opacity-85 sepia-[0.16] sm:h-96"
            />
            <div className="grid grid-cols-3 divide-x divide-[#c9d8d4]/20 text-[#f7fffc]">
              <div className="p-4">
                <BookOpen className="text-[#9ad0c5]" size={20} />
                <p className="mt-2 text-sm font-bold">Readable posts</p>
              </div>
              <div className="p-4">
                <Layers className="text-[#9ad0c5]" size={20} />
                <p className="mt-2 text-sm font-bold">Categories</p>
              </div>
              <div className="p-4">
                <Database className="text-[#9ad0c5]" size={20} />
                <p className="mt-2 text-sm font-bold">Firestore data</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-[#1b7a6b]">Latest posts</p>
            <h2 className="mt-2 text-3xl font-black text-[#101820]">Fresh from the blog</h2>
          </div>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-black text-[#1b7a6b] transition hover:text-[#0c2230]">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => <BlogCard key={post._id} post={post} />)}
          </div>
        )}
      </section>
    </>
  )
}
