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
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#9a6f2b]">
          <span className="rounded-full border border-[#d4b978]/50 bg-[#fff4dc] px-3 py-1">{post.category}</span>
          <span className="text-[#8b7b65]">{formatDate(post.createdAt)}</span>
        </div>
        <div>
          <Link to={`/blogs/${post.slug}`}>
            <h2 className="text-xl font-black leading-tight text-[#21180f] transition group-hover:text-[#9a6f2b]">
              {post.title}
            </h2>
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6e604f]">{post.shortDescription}</p>
        </div>
        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#8b6121] transition hover:gap-3 hover:text-[#20170e]"
        >
          Read article <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
