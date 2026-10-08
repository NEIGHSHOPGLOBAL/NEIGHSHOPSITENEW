import { useEffect, useState } from 'react'
import Eyebrow from '../../components/site/Eyebrow'
import MediaCard from '../../components/site/MediaCard'
import Button from '../../components/site/Button'
import FadeUp from '../../components/site/FadeUp'
import api from '../../lib/api'

const GROUPS = [
  { label: 'Build', slugs: ['custom-website-development', 'mobile-app-development', 'crm-custom-software', 'ecommerce-development', 'landing-page-design'] },
  { label: 'Grow', slugs: ['seo-services', 'social-media-marketing'] },
  { label: 'Create', slugs: ['graphic-design-branding', 'video-editing-ugc'] },
]

export default function Services() {
  const [services, setServices] = useState([])

  useEffect(() => {
    api.get('/public/services').then((r) => setServices(r.data))
  }, [])

  const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]))

  return (
    <div className="section-y">
      <div className="container-page">
        <FadeUp>
          <Eyebrow>Services</Eyebrow>
          <h1 className="fs-h1 mb-6 max-w-3xl">Software Development &amp; Digital Marketing Services</h1>
          <p className="text-muted max-w-xl mb-14">
            Whether you need a new website, a mobile app, software that automates your operations, or marketing that brings in customers, Neighshop Global covers the full journey from idea to growth. Pick a service below, or talk to us and we'll recommend the right mix for your goals and budget.
          </p>
        </FadeUp>

        <div className="flex flex-col gap-16">
          {GROUPS.map((group) => {
            const items = group.slugs.map((slug) => bySlug[slug]).filter(Boolean)
            if (items.length === 0) return null
            return (
              <div key={group.label}>
                <h2 className="fs-h3 mb-6">{group.label}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.map((s) => (
                    <MediaCard key={s.id} to={`/services/${s.slug}`} title={s.name} description={s.shortDesc} image={s.heroImage} imageAlt={s.heroImageAlt} seed={s.slug} height={280} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-20 card p-10 text-center">
          <h2 className="fs-h3 mb-3">Not sure what you need?</h2>
          <p className="text-muted max-w-lg mx-auto mb-6">
            Most projects combine services. A new D2C brand, for example, usually needs branding, an e-commerce store, SEO and social ads. Book a free discovery call and we'll map out a plan.
          </p>
          <Button to="/contact">Book a Free Discovery Call</Button>
        </div>
      </div>
    </div>
  )
}
