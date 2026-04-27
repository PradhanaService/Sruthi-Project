import { Calendar, UserRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import { getBlogBySlug } from '../services/blogService.js'
import { formatDate } from '../utils/formatDate.js'

export default function BlogDetails() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPost() {
      try {
        const blog = await getBlogBySlug(slug)
        setPost(blog)
      } catch (err) {
        setError(err.message || 'Unable to load this blog post.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  if (loading) return <Loading label="Loading post..." />

  if (error) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-14">
        <ErrorMessage message={error} />
      </section>
    )
  }

  return (
    <article>
      <div className="bg-[#fff8ec]/70">
        <div className="reveal-luxury mx-auto max-w-4xl px-4 py-12">
          <Link to="/blogs" className="text-sm font-black text-[#8a5f22] transition hover:text-[#20170e]">Back to blogs</Link>
          <div className="mt-5 space-y-5">
            <span className="inline-flex rounded-full border border-[#d4b978]/50 bg-[#fff4dc] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#9a6f2b]">
              {post.category}
            </span>
            <h1 className="text-4xl font-black leading-tight text-[#20170e] md:text-5xl">{post.title}</h1>
            <p className="text-lg leading-8 text-[#675744]">{post.shortDescription}</p>
            <div className="flex flex-wrap gap-4 text-sm font-semibold text-[#7b6a55]">
              <span className="inline-flex items-center gap-2"><UserRound size={16} /> {post.authorName}</span>
              <span className="inline-flex items-center gap-2"><Calendar size={16} /> {formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <img src={post.coverImageUrl} alt={post.title} className="h-[22rem] w-full object-cover sepia-[0.12] md:h-[30rem]" />

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="article-content luxury-surface rounded-lg p-6 text-lg leading-8 text-[#4f4233]">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph.trim() ? <p key={index}>{paragraph}</p> : null
          ))}
        </div>
      </div>
    </article>
  )
}
