import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatDate.js'

export default function BlogCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/blogs/${post.slug}`} className="block">
        <img
          src={post.coverImageUrl}
          alt={post.title}
          className="h-52 w-full object-cover"
          loading="lazy"
        />
      </Link>
      <div className="space-y-4 p-5">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wide text-teal-700">
          <span className="rounded-full bg-teal-50 px-3 py-1">{post.category}</span>
          <span className="text-slate-400">{formatDate(post.createdAt)}</span>
        </div>
        <div>
          <Link to={`/blogs/${post.slug}`}>
            <h2 className="text-xl font-black leading-tight text-slate-950 transition group-hover:text-teal-800">
              {post.title}
            </h2>
          </Link>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{post.shortDescription}</p>
        </div>
        <Link
          to={`/blogs/${post.slug}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-teal-800 transition hover:gap-3"
        >
          Read article <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
