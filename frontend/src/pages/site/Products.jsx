import { useEffect, useState } from 'react'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import Button from '../../components/site/Button'
import Badge from '../../components/site/Badge'
import { gradientFor } from '../../lib/placeholder'

export default function Products() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    api.get('/public/products').then((r) => setProducts(r.data))
  }, [])

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>Products</Eyebrow>
        <h1 className="fs-h1 mb-6 max-w-3xl">Ready-to-launch platforms, built on proven architecture.</h1>
        <p className="text-muted max-w-xl mb-14">
          Skip the build-from-scratch timeline. Brand it, customize it, and launch in weeks.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p) => (
            <div key={p.id} className="card p-7 flex flex-col">
              <div className="rounded-md aspect-[4/3] mb-6 overflow-hidden" style={{ background: p.coverImage ? undefined : gradientFor(p.slug) }}>
                {p.coverImage && <img src={p.coverImage} alt={p.coverImageAlt || p.name} className="w-full h-full object-cover" />}
              </div>
              <span className="text-[12px] uppercase tracking-wide text-muted mb-2">{p.category}</span>
              <h3 className="fs-h3 mb-3">{p.name}</h3>
              <p className="text-[14px] text-muted mb-5 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {(p.features || []).map((f) => <Badge key={f}>{f}</Badge>)}
              </div>
              <Button to={`/products/${p.slug}`} variant="primary">Request demo</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
