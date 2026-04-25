import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../components/Loading.jsx'
import PostForm from '../components/PostForm.jsx'
import { getBlogById, updateBlog } from '../services/blogService.js'

export default function EditPost() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadPost() {
      try {
        const selectedPost = await getBlogById(id)
        setPost({
          title: selectedPost.title,
          shortDescription: selectedPost.shortDescription,
          content: selectedPost.content,
          category: selectedPost.category,
          authorName: selectedPost.authorName,
          coverImageUrl: selectedPost.coverImageUrl,
          published: selectedPost.published,
        })
      } catch (err) {
        setError(err.message || 'Unable to load post.')
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [id])

  const handleChange = (field) => (event) => {
    setPost((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSaving(true)
      await updateBlog(id, post)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Unable to update post.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Loading label="Loading editor..." />

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Admin</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Edit post</h1>
      </div>
      {post && (
        <PostForm
          error={error}
          isSaving={saving}
          onChange={handleChange}
          onSubmit={handleSubmit}
          post={post}
          submitLabel="Update post"
        />
      )}
    </section>
  )
}
