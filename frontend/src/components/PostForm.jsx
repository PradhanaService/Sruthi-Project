import ErrorMessage from './ErrorMessage.jsx'

export default function PostForm({ error, isSaving, onChange, onSubmit, post, submitLabel }) {
  const fieldClass = 'w-full rounded-md border border-stone-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-teal-700 focus:ring-4 focus:ring-teal-100'

  return (
    <form onSubmit={onSubmit} className="space-y-5 rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <ErrorMessage message={error} />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Title
          <input required value={post.title} onChange={onChange('title')} className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Category
          <input required value={post.category} onChange={onChange('category')} className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Author Name
          <input required value={post.authorName} onChange={onChange('authorName')} className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-bold text-slate-700">
          Cover Image URL
          <input required type="url" value={post.coverImageUrl} onChange={onChange('coverImageUrl')} className={fieldClass} />
        </label>
      </div>

      <label className="space-y-2 text-sm font-bold text-slate-700">
        Short Description
        <textarea required rows="3" value={post.shortDescription} onChange={onChange('shortDescription')} className={fieldClass} />
      </label>

      <label className="space-y-2 text-sm font-bold text-slate-700">
        Full Content
        <textarea required rows="12" value={post.content} onChange={onChange('content')} className={fieldClass} />
      </label>

      <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
        <input
          type="checkbox"
          checked={post.published}
          onChange={(event) => onChange('published')({ target: { value: event.target.checked } })}
          className="h-5 w-5 rounded border-stone-300 text-teal-700 focus:ring-teal-600"
        />
        Published
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="rounded-md bg-teal-700 px-5 py-3 text-sm font-black text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSaving ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
