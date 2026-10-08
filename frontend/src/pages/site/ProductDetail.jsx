import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import Badge from '../../components/site/Badge'
import ContactForm from '../../components/site/ContactForm'
import FaqAccordion from '../../components/site/FaqAccordion'
import { gradientFor } from '../../lib/placeholder'

export default function ProductDetail() {
  const { slug } = useParams()
  const [product, setProduct] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setProduct(null)
    setNotFound(false)
    api.get(`/public/products/${slug}`).then((r) => setProduct(r.data)).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <div className="container-page section-y">Product not found.</div>
  if (!product) return <div className="container-page section-y text-muted">Loading...</div>

  const faqs = product.faqs || []

  return (
    <div>
      <section className="section-y pb-0">
        <div className="container-page">
          <Eyebrow>{product.category}</Eyebrow>
          <h1 className="fs-h1 mb-6 max-w-3xl">{product.name}</h1>
          <p className="text-muted max-w-xl mb-10">{product.description}</p>

          <div className="rounded-xl aspect-[16/7] mb-10 overflow-hidden" style={{ background: product.coverImage ? undefined : gradientFor(product.slug) }}>
            {product.coverImage && <img src={product.coverImage} alt={product.coverImageAlt || product.name} className="w-full h-full object-cover" />}
          </div>

          <div className="flex flex-wrap gap-2 mb-2">
            {(product.features || []).map((f) => <Badge key={f} variant="accent">{f}</Badge>)}
          </div>
          {product.priceLabel && (
            <p className="mt-6 text-ink font-medium">Pricing: {product.priceLabel}</p>
          )}
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-12">
          <div
            className="md:col-span-8 prose-content text-[15px] leading-relaxed text-ink-2"
            dangerouslySetInnerHTML={{ __html: product.longContentHtml }}
          />
          <div className="md:col-span-4">
            <div className="card p-6 sticky top-24">
              <h3 className="fs-h3 mb-4">Request a demo</h3>
              <ContactForm compact defaultService={product.name} sourcePage={`/products/${product.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {faqs.length > 0 && (
        <section className="section-y pt-0">
          <div className="container-page max-w-2xl">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="fs-h2 mb-6">Common questions</h2>
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}
    </div>
  )
}
