const samplePosts = [
  {
    title: 'Designing a Better Writing Workflow',
    shortDescription: 'A practical guide to moving ideas from rough notes to polished blog posts.',
    content:
      'Strong writing starts before the first draft. Capture raw ideas quickly, group them by theme, and choose one clear promise for each post.\n\nOnce the promise is clear, outline the beginning, middle, and ending. The outline does not need to be rigid; it only needs to keep the reader oriented.\n\nBefore publishing, read the post aloud. Awkward sentences, missing transitions, and repeated ideas become much easier to catch when you hear them.',
    category: 'Writing',
    authorName: 'Maya Raman',
    coverImageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    title: 'How Small Teams Can Ship Consistently',
    shortDescription: 'Simple habits that help product teams reduce chaos and deliver useful work.',
    content:
      'Consistency comes from making work visible. Keep tasks small enough to review, test, and release without heroic effort.\n\nA weekly planning rhythm helps teams protect focus. Decide what matters, name the risks early, and leave space for the unexpected.\n\nShipping is easier when the definition of done is shared. Include implementation, review, testing, documentation, and release notes in the same mental checklist.',
    category: 'Product',
    authorName: 'Arjun Mehta',
    coverImageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
  {
    title: 'A Beginner Friendly Guide to Firebase Data',
    shortDescription: 'Learn how Firestore powers a simple public blog platform.',
    content:
      'Cloud Firestore stores blog posts as documents inside a blogs collection. Each document contains the title, slug, content, author, category, and published status.\n\nThe React app reads published posts from Firestore and shows them on public pages. Users can upload new posts through a simple writing form.\n\nConfiguration still matters. Keep Firebase settings in environment variables and use Firestore rules to control exactly which operations are allowed.',
    category: 'Firebase',
    authorName: 'Nisha Kapoor',
    coverImageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    published: true,
  },
]

export default samplePosts
