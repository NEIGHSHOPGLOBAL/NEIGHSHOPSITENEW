import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Phone, ArrowRight } from 'lucide-react'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'

const STATUS_COLOR = { Active: 'bg-success', Maintenance: 'bg-warning', 'Coming Soon': 'bg-muted-2' }

export default function Locations() {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    api.get('/public/locations').then((r) => setLocations(r.data))
  }, [])

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>Locations</Eyebrow>
        <h1 className="fs-h1 mb-14 max-w-3xl">Where we work from.</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {locations.map((l) => (
            <Link key={l.id} to={`/locations/${l.slug}`} className="card p-7 block hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-2 mb-4">
                <span className={`w-2 h-2 rounded-full ${STATUS_COLOR[l.status] || 'bg-muted-2'}`} />
                <span className="text-[13px] font-medium text-muted">{l.status}</span>
              </div>
              <h3 className="fs-h3 mb-4">{l.city}</h3>
              <div className="flex items-start gap-3 mb-3 text-[14px] text-ink-2">
                <MapPin size={16} className="text-muted shrink-0 mt-0.5" />
                {l.address}
              </div>
              <div className="flex items-center gap-3 text-[14px] text-ink-2 mb-5">
                <Phone size={16} className="text-muted shrink-0" />
                {l.phone}
              </div>
              <span className="inline-flex items-center gap-2 text-[13px] font-medium text-ink">
                Learn more <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
