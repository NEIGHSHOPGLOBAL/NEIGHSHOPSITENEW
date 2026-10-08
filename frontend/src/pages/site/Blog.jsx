import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import PostCard from '../../components/site/PostCard'

export default function Blog() {
  const [searchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState(searchParams.get('q') || '')

  useEffect(() => {
    api.get('/public/posts').then((r) => setPosts(r.data))
  }, [])

  const categories = ['All', ...new Set(posts.map((p) => p.category))]
  const filtered = posts
    .filter((p) => category === 'All' || p.category === category)
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))

  const [featured, ...rest] = filtered

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>Blog</Eyebrow>
        <h1 className="fs-h1 mb-4 max-w-3xl">Insights on Software, Apps &amp; Digital Growth</h1>
        <p className="text-muted max-w-xl mb-10">
          Practical guides from the team at Neighshop Global: what things cost, how to choose the right technology, and how to grow your business online in 2026.
        </p>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`h-9 px-4 rounded-pill text-[13px] font-medium border transition-colors ${
                  category === c ? 'bg-ink text-white border-ink' : 'border-line-strong text-ink-2 hover:border-ink'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="md:w-64"
          />
        </div>

        {featured && (
          <div className="mb-16">
            <PostCard post={featured} large />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rest.map((p) => <PostCard key={p.id} post={p} />)}
        </div>

        {filtered.length === 0 && <p className="text-muted">No articles found.</p>}
      </div>
    </div>
  )
}
