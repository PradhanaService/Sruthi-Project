import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate.js'

export default function BlogCard({ post }) {
  return (
    <article className="luxury-surface reveal-luxury group overflow-hidden rounded-lg transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <Link to={`/blogs/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#1b7a6b]">
          <span className="rounded-full border border-[#1b7a6b]/30 bg-[#e3f0ed] px-3 py-1">{post.category}</span>
          <span className="text-[#6b7b7f]">{formatDate(post.createdAt)}</span>
        </div>
        <div>
          <Link to={`/blogs/${post.slug}`}>
            <h2 className="text-xl font-black leading-tight text-[#101820] transition group-hover:text-[#1b7a6b]">
              {post.title}
            </h2>
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#536872]">{post.shortDescription}</p>
        </div>
        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#1b7a6b] transition hover:gap-3 hover:text-[#0c2230]"
        >
          Read article <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
