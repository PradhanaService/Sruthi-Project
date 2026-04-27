import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PostForm from '../components/PostForm.jsx'
import { createBlog } from '../services/blogService.js'
import initialPost from '../utils/initialPost.js'

export default function CreatePost() {
  const [post, setPost] = useState(initialPost)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  const handleChange = (field) => (event) => {
    setPost((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      setSaving(true)
      await createBlog(post)
      navigate('/blogs')
    } catch (err) {
      setError(err.message || 'Unable to create post.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-wide text-teal-700">Community writing</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Upload a blog post</h1>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Share a post with the blog audience. Submitted posts are published immediately.
        </p>
      </div>
      <PostForm
        error={error}
        isSaving={saving}
        onChange={handleChange}
        onSubmit={handleSubmit}
        post={post}
        submitLabel="Upload post"
      />
    </section>
  )
}
