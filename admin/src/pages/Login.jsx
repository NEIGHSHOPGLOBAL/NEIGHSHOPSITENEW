import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/')
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <span className="font-bold text-[18px] tracking-wide text-ink block mb-10 text-center">Neighshop Global</span>
        <form onSubmit={handleSubmit} className="card p-8 space-y-5">
          <h1 className="fs-h3 mb-2">Admin sign in</h1>
          <label className="block">
            <span className="block text-[13px] font-medium text-ink-2 mb-2">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@neighshopglobal.com" />
          </label>
          <label className="block">
            <span className="block text-[13px] font-medium text-ink-2 mb-2">Password</span>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>
          {error && <p className="text-danger text-[12.5px]">{error}</p>}
          <button type="submit" disabled={loading} className="btn btn-primary w-full !h-12">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
