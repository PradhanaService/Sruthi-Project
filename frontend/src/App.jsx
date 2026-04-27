import { Route, Routes } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import Blogs from './pages/Blogs.jsx'
import CreatePost from './pages/CreatePost.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

function AppRoutes() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<BlogDetails />} />
          <Route path="/write" element={<CreatePost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return <AppRoutes />
}
