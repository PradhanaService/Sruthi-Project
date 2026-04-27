import ErrorMessage from './ErrorMessage.jsx'

export default function PostForm({ error, isSaving, onChange, onSubmit, post, submitLabel }) {
  const fieldClass = 'w-full rounded-md border border-[#1b7a6b]/30 bg-[#fbfdfb] px-3 py-3 text-sm text-[#101820] outline-none transition focus:border-[#1b7a6b] focus:ring-4 focus:ring-[#1b7a6b]/20'

  return (
    <form onSubmit={onSubmit} className="luxury-surface reveal-luxury space-y-5 rounded-lg p-5">
      <ErrorMessage message={error} />

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-[#314553]">
          Title
          <input required value={post.title} onChange={onChange('title')} className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-bold text-[#314553]">
          Category
          <input required value={post.category} onChange={onChange('category')} className={fieldClass} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-bold text-[#314553]">
          Author Name
          <input required value={post.authorName} onChange={onChange('authorName')} className={fieldClass} />
        </label>
        <label className="space-y-2 text-sm font-bold text-[#314553]">
          Cover Image URL
          <input required type="url" value={post.coverImageUrl} onChange={onChange('coverImageUrl')} className={fieldClass} />
        </label>
      </div>

      <label className="space-y-2 text-sm font-bold text-[#314553]">
        Short Description
        <textarea required rows="3" value={post.shortDescription} onChange={onChange('shortDescription')} className={fieldClass} />
      </label>

      <label className="space-y-2 text-sm font-bold text-[#314553]">
        Full Content
        <textarea required rows="12" value={post.content} onChange={onChange('content')} className={fieldClass} />
      </label>

      <label className="flex items-center gap-3 text-sm font-bold text-[#314553]">
        <input
          type="checkbox"
          checked={post.published}
          onChange={(event) => onChange('published')({ target: { value: event.target.checked } })}
          className="h-5 w-5 rounded border-[#1b7a6b]/40 text-[#1b7a6b] focus:ring-[#1b7a6b]/30"
        />
        Published
      </label>

      <button
        type="submit"
        disabled={isSaving}
        className="gold-gradient shine-luxury rounded-md px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#1b7a6b]/25 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}
