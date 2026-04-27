export default function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="rounded-lg border border-[#b65c45]/30 bg-[#fff1ea] px-4 py-3 text-sm font-medium text-[#8b2f20]">
      {message}
    </div>
  )
}
