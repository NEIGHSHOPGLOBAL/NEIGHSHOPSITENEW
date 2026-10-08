import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function RequireAuth({ children }) {
  const { admin, loading } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted">Loading...</div>
  if (!admin) return <Navigate to="/login" replace />
  return children
}
