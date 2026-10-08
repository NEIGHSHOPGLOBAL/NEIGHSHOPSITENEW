import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import api from '../../lib/api'
import { useSiteData } from '../../context/SiteDataContext'
import Eyebrow from '../../components/site/Eyebrow'
import Button from '../../components/site/Button'

const STATUS_COLOR = { Active: 'bg-success', Maintenance: 'bg-warning', 'Coming Soon': 'bg-muted-2' }
const TITLES = {
  delhi: 'Software, App & Website Development Company in Delhi',
  jaipur: 'App & Website Development for Jaipur Businesses',
  bangalore: 'Neighshop Global in Bangalore: Coming Soon',
}
const CTAS = {
  delhi: 'Meet Our Delhi Team',
  jaipur: 'Talk to Our Team About Your Jaipur Project',
  bangalore: 'Join the Bangalore Waitlist',
}

export default function LocationDetail() {
  const { slug } = useParams()
  const data = useSiteData()
  const company = data.company || {}
  const [location, setLocation] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLocation(null)
    setNotFound(false)
    api.get(`/public/locations/${slug}`).then((r) => setLocation(r.data)).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <div className="container-page section-y">Location not found.</div>
  if (!location) return <div className="container-page section-y text-muted">Loading...</div>

  return (
    <div className="section-y">
      <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-14">
        <div className="md:col-span-8">
          <Eyebrow>Locations</Eyebrow>
          <div className="flex items-center gap-2 mb-6">
            <span className={`w-2 h-2 rounded-full ${STATUS_COLOR[location.status] || 'bg-muted-2'}`} />
            <span className="text-[13px] font-medium text-muted">{location.status}</span>
          </div>
          <h1 className="fs-h1 mb-10 max-w-2xl">{TITLES[slug] || location.city}</h1>
          <div
            className="prose-content text-[15px] leading-relaxed text-ink-2"
            dangerouslySetInnerHTML={{ __html: location.contentHtml }}
          />
        </div>

        <div className="md:col-span-4">
          <div className="card p-6 sticky top-24">
            <h3 className="fs-h3 mb-4">{location.city}</h3>
            <div className="flex flex-col gap-4 mb-6">
              <span className="flex items-start gap-3 text-[14px] text-ink-2">
                <MapPin size={16} className="text-muted shrink-0 mt-0.5" />
                {location.address}
              </span>
              <a href={`tel:${location.phone || company.phone}`} className="flex items-center gap-3 text-[14px] text-ink-2 hover:text-ink">
                <Phone size={16} className="text-muted shrink-0" />
                {location.phone || company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-3 text-[14px] text-ink-2 hover:text-ink">
                <Mail size={16} className="text-muted shrink-0" />
                {company.email}
              </a>
            </div>
            <Button to="/contact" className="w-full">{CTAS[slug] || 'Get in touch'}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
