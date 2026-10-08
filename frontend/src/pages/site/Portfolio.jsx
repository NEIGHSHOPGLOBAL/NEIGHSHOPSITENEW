import { useEffect, useState } from 'react'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import PortfolioCard from '../../components/site/PortfolioCard'

export default function Portfolio() {
  const [items, setItems] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    api.get('/public/portfolio').then((r) => setItems(r.data))
  }, [])

  const categories = ['All', ...new Set(items.map((i) => i.category))]
  const filtered = category === 'All' ? items : items.filter((i) => i.category === category)

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>Portfolio</Eyebrow>
        <h1 className="fs-h1 mb-6 max-w-3xl">Projects, demos and reference builds.</h1>
        <p className="text-muted max-w-xl mb-10">
          A mix of client work, internal demos and concept builds — each clearly labeled.
        </p>

        <div className="flex flex-wrap gap-2 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filtered.map((item) => <PortfolioCard key={item.id} item={item} />)}
        </div>
      </div>
    </div>
  )
}
