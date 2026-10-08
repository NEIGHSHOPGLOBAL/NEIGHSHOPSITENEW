import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import { PortfolioBadge } from '../../components/site/Badge'
import Badge from '../../components/site/Badge'
import { gradientFor } from '../../lib/placeholder'

export default function PortfolioDetail() {
  const { slug } = useParams()
  const [item, setItem] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setItem(null)
    setNotFound(false)
    api.get(`/public/portfolio/${slug}`).then((r) => setItem(r.data)).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <div className="container-page section-y">Project not found.</div>
  if (!item) return <div className="container-page section-y text-muted">Loading...</div>

  const clientLabel = item.portfolioType === 'CLIENT_PROJECT' && item.clientApproved && item.clientName
    ? item.clientName
    : item.portfolioType === 'INTERNAL_DEMO'
      ? 'Demo product built by Neighshop'
      : 'Inspired by / reference build'

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>{item.category}</Eyebrow>
        <div className="flex items-center gap-3 mb-6">
          <h1 className="fs-h1">{item.name}</h1>
          <PortfolioBadge type={item.portfolioType} />
        </div>
        <p className="text-muted max-w-xl mb-10">{item.description}</p>

        <div className="rounded-xl aspect-[16/8] mb-12 overflow-hidden" style={{ background: item.coverImage ? undefined : gradientFor(item.slug) }}>
          {item.coverImage && <img src={item.coverImage} alt={item.coverImageAlt || item.name} className="w-full h-full object-cover" />}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 border-t border-line pt-8">
          <Meta label="Type" value={clientLabel} />
          <Meta label="Industry" value={item.category} />
          <Meta label="Tech" value={(item.techUsed || []).join(', ') || '—'} />
          <Meta label="Live" value={item.liveUrl ? 'Available' : 'On request'} />
        </div>

        {(item.challenge || item.solution) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            {item.challenge && (
              <div>
                <h3 className="fs-h3 mb-3">Challenge</h3>
                <p className="text-[14px] text-muted leading-relaxed">{item.challenge}</p>
              </div>
            )}
            {item.solution && (
              <div>
                <h3 className="fs-h3 mb-3">Solution</h3>
                <p className="text-[14px] text-muted leading-relaxed">{item.solution}</p>
              </div>
            )}
          </div>
        )}

        {item.results?.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-14">
            {item.results.map((r, i) => (
              <div key={i}>
                <div className="text-3xl font-medium text-ink">{r.value}</div>
                <div className="text-[13px] text-muted mt-1">{r.label}</div>
              </div>
            ))}
          </div>
        )}

        <Link to="/portfolio" className="text-sm font-medium text-ink">← Back to all work</Link>
      </div>
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div>
      <div className="text-[12px] uppercase tracking-wide text-muted-2 mb-1">{label}</div>
      <div className="text-[14px] text-ink-2">{value}</div>
    </div>
  )
}
