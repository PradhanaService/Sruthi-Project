import { Edit, Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import { deleteBlog, getBlogs } from '../services/blogService.js'
import { formatDate } from '../utils/formatDate.js'

export default function AdminDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deletingId, setDeletingId] = useState('')

  useEffect(() => {
    let ignore = false

    async function loadDashboardPosts() {
      try {
        const blogs = await getBlogs({ includeUnpublished: true })
        if (!ignore) {
          setPosts(blogs)
          setError('')
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Unable to load admin posts.')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    loadDashboardPosts()
    return () => {
      ignore = true
    }
  }, [])

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this blog post?')
    if (!confirmed) return

    try {
      setDeletingId(id)
      await deleteBlog(id)
      setPosts((current) => current.filter((post) => post._id !== id))
    } catch (err) {
      setError(err.message || 'Unable to delete post.')
    } finally {
      setDeletingId('')
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-teal-700">Admin</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Dashboard</h1>
        </div>
        <Link to="/admin/posts/create" className="inline-flex items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-black text-white transition hover:bg-teal-800">
          <Plus size={18} /> Create post
        </Link>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <Loading label="Loading dashboard..." />
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
              <thead className="bg-stone-50 text-xs font-black uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-3">Post</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Updated</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {posts.map((post) => (
                  <tr key={post._id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-black text-slate-950">{post.title}</p>
                      <p className="mt-1 max-w-md text-slate-500">{post.shortDescription}</p>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-600">{post.category}</td>
                    <td className="px-4 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${post.published ? 'bg-teal-50 text-teal-800' : 'bg-amber-50 text-amber-800'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-slate-500">{formatDate(post.updatedAt)}</td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/posts/${post._id}/edit`}
                          className="inline-grid h-9 w-9 place-items-center rounded-md border border-stone-300 text-slate-700 transition hover:border-teal-700 hover:text-teal-800"
                          title="Edit post"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(post._id)}
                          disabled={deletingId === post._id}
                          className="inline-grid h-9 w-9 place-items-center rounded-md border border-stone-300 text-red-700 transition hover:border-red-600 disabled:opacity-50"
                          title="Delete post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {posts.length === 0 && (
              <div className="p-8 text-center text-slate-600">No posts yet. Create your first blog post.</div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
