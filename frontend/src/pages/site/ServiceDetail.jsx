import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import Button from '../../components/site/Button'
import Badge from '../../components/site/Badge'
import ContactForm from '../../components/site/ContactForm'
import FaqAccordion from '../../components/site/FaqAccordion'
import PortfolioCard from '../../components/site/PortfolioCard'
import { gradientFor } from '../../lib/placeholder'

export default function ServiceDetail() {
  const { slug } = useParams()
  const [service, setService] = useState(null)
  const [portfolio, setPortfolio] = useState([])
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setService(null)
    setNotFound(false)
    api.get(`/public/services/${slug}`)
      .then((r) => setService(r.data))
      .catch(() => setNotFound(true))
    api.get('/public/portfolio').then((r) => setPortfolio(r.data.slice(0, 3)))
  }, [slug])

  const faqs = service?.faqs || []

  if (notFound) return <div className="container-page section-y">Service not found.</div>
  if (!service) return <div className="container-page section-y text-muted">Loading...</div>

  return (
    <div>
      <section className="section-y pb-0">
        <div className="container-page">
          <Eyebrow>Services</Eyebrow>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            <h1 className="fs-h1 md:col-span-8">{service.name}</h1>
            <div className="md:col-span-4 flex flex-col gap-5">
              <p className="text-muted">{service.shortDesc}</p>
              <Button to="/contact" size="lg" className="!h-[52px] !px-7 self-start">Get a quote</Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-10">
            {(service.features || []).map((f) => <Badge key={f}>{f}</Badge>)}
          </div>
          <div className="rounded-xl aspect-[16/6] mb-16 overflow-hidden" style={{ background: service.heroImage ? undefined : gradientFor(service.slug) }}>
            {service.heroImage && <img src={service.heroImage} alt={service.heroImageAlt || service.name} className="w-full h-full object-cover" />}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-12">
          <div
            className="md:col-span-8 prose-content text-[15px] leading-relaxed text-ink-2"
            dangerouslySetInnerHTML={{ __html: service.longContentHtml }}
          />
          <div className="md:col-span-4">
            <div className="card p-6 sticky top-24">
              <h3 className="fs-h3 mb-4">Get a quote</h3>
              <ContactForm compact defaultService={service.name} sourcePage={`/services/${service.slug}`} />
            </div>
          </div>
        </div>
      </section>

      {portfolio.length > 0 && (
        <section className="section-y pt-0">
          <div className="container-page">
            <Eyebrow>Related work</Eyebrow>
            <h2 className="fs-h2 mb-10">Projects in this space</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {portfolio.map((p) => <PortfolioCard key={p.id} item={p} />)}
            </div>
          </div>
        </section>
      )}

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
