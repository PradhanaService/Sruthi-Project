import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer.jsx'
import Navbar from './components/Navbar.jsx'
import { AuthProvider } from './services/AuthContext.jsx'
import { useAuth } from './services/useAuth.js'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import BlogDetails from './pages/BlogDetails.jsx'
import Blogs from './pages/Blogs.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx'

function ProtectedRoute({ children }) {
  const { loading, token } = useAuth()
  const location = useLocation()

  if (loading) {
    return null
  }

  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return children
}

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
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts/create"
            element={<CreatePost />}
          />
          <Route
            path="/admin/posts/:id/edit"
            element={
              <ProtectedRoute>
                <EditPost />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
