import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/admin/dashboard').then((r) => setStats(r.data))
  }, [])

  if (!stats) return <p className="text-muted">Loading...</p>

  const cards = [
    { label: 'Published posts', value: stats.publishedPosts, to: '/posts' },
    { label: 'Draft posts', value: stats.draftPosts, to: '/posts' },
    { label: 'Services', value: stats.services, to: '/services' },
    { label: 'Products', value: stats.products, to: '/products' },
    { label: 'Portfolio items', value: stats.portfolio, to: '/portfolio' },
    { label: 'New leads', value: stats.leadsNew, to: '/leads' },
    { label: 'Total leads', value: stats.leadsTotal, to: '/leads' },
    { label: 'Team members', value: stats.team, to: '/team' },
    { label: 'Media files', value: stats.media, to: '/media' },
  ]

  return (
    <div>
      <h1 className="fs-h3 mb-8">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {cards.map((c) => (
          <Link key={c.label} to={c.to} className="card p-6 hover:shadow-md transition-shadow block">
            <div className="text-3xl font-medium text-ink mb-1">{c.value}</div>
            <div className="text-[13px] text-muted">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
