import { Edit3, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Loading from '../components/Loading.jsx'
import PostForm from '../components/PostForm.jsx'
import { useAuth } from '../hooks/useAuth.js'
import { deleteBlog, getMyBlogs, updateBlog } from '../services/blogService.js'

export default function Profile() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [editingPost, setEditingPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true)
        setPosts(await getMyBlogs(user.uid))
        setError('')
      } catch (err) {
        setError(err.message || 'Unable to load your posts.')
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [user.uid])

  const handleEditChange = (field) => (event) => {
    setEditingPost((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    try {
      setSaving(true)
      const updated = await updateBlog(editingPost.id || editingPost._id, editingPost)
      setPosts((current) => current.map((post) => (post._id === editingPost._id ? { ...post, ...updated } : post)))
      setEditingPost(null)
      setError('')
    } catch (err) {
      setError(err.message || 'Unable to update this post.')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (post) => {
    const confirmed = window.confirm(`Delete "${post.title}"? This cannot be undone.`)
    if (!confirmed) return

    try {
      await deleteBlog(post.id || post._id)
      setPosts((current) => current.filter((item) => item._id !== post._id))
      if (editingPost?._id === post._id) setEditingPost(null)
      setError('')
    } catch (err) {
      setError(err.message || 'Unable to delete this post.')
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="reveal-luxury mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-[#1b7a6b]">Your profile</p>
          <h1 className="mt-2 text-4xl font-black text-[#101820]">Manage your posts</h1>
          <p className="mt-3 max-w-2xl leading-7 text-[#536872]">
            Signed in as {user.displayName || user.email}. Edit, publish, unpublish, or delete posts you created.
          </p>
        </div>
        <Link
          to="/write"
          className="gold-gradient shine-luxury inline-flex w-fit rounded-md px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1b7a6b]/25 transition hover:-translate-y-0.5"
        >
          Write new post
        </Link>
      </div>

      <ErrorMessage message={error} />

      {editingPost && (
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-2xl font-black text-[#101820]">Editing post</h2>
            <button
              type="button"
              onClick={() => setEditingPost(null)}
              className="rounded-md border border-[#1b7a6b]/30 px-4 py-2 text-sm font-black text-[#314553] transition hover:bg-[#dce8e4]"
            >
              Cancel
            </button>
          </div>
          <PostForm
            error=""
            isSaving={saving}
            onChange={handleEditChange}
            onSubmit={handleUpdate}
            post={editingPost}
            submitLabel="Save changes"
          />
        </div>
      )}

      {loading ? (
        <Loading label="Loading your posts..." />
      ) : posts.length === 0 ? (
        <div className="luxury-surface rounded-lg p-8 text-center">
          <h2 className="text-2xl font-black text-[#101820]">No posts yet</h2>
          <p className="mt-3 text-[#536872]">Create your first blog post and it will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {posts.map((post) => (
            <article key={post._id} className="luxury-surface grid gap-4 rounded-lg p-5 md:grid-cols-[9rem_1fr_auto] md:items-center">
              <img src={post.coverImageUrl} alt={post.title} className="h-32 w-full rounded-md object-cover md:h-24" />
              <div>
                <div className="mb-2 flex flex-wrap gap-2 text-xs font-black uppercase tracking-wide">
                  <span className="rounded-full border border-[#1b7a6b]/30 bg-[#e3f0ed] px-3 py-1 text-[#1b7a6b]">{post.category}</span>
                  <span className="rounded-full border border-[#7b6a55]/25 bg-[#f2ede6] px-3 py-1 text-[#7b6a55]">{post.published ? 'Published' : 'Draft'}</span>
                </div>
                <h2 className="text-xl font-black text-[#101820]">{post.title}</h2>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#536872]">{post.shortDescription}</p>
              </div>
              <div className="flex gap-2 md:justify-end">
                <button
                  type="button"
                  onClick={() => setEditingPost(post)}
                  className="inline-flex items-center gap-2 rounded-md border border-[#1b7a6b]/30 px-4 py-2 text-sm font-black text-[#1b7a6b] transition hover:bg-[#dce8e4]"
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(post)}
                  className="inline-flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-black text-red-700 transition hover:bg-red-50"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
