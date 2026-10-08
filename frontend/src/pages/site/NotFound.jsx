import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import Button from '../../components/site/Button'

const LINKS = [
  ['Home', '/'],
  ['Services', '/services'],
  ['Portfolio', '/portfolio'],
  ['Blog', '/blog'],
  ['Contact', '/contact'],
]

export default function NotFound() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(e) {
    e.preventDefault()
    if (query.trim()) navigate(`/blog?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <div className="container-page section-y text-center">
      <h1 className="fs-h1 mb-6">Page Not Found</h1>
      <p className="text-muted mb-10">This page may have moved, or the link may be broken. Let's get you back on track.</p>

      <form onSubmit={handleSearch} className="max-w-sm mx-auto mb-10 relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search our site…"
          className="pl-11"
        />
      </form>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        {LINKS.map(([label, href]) => (
          <Button key={href} to={href} variant="secondary" size="sm">{label}</Button>
        ))}
      </div>

      <Button to="/">Back to Home</Button>
    </div>
  )
}
