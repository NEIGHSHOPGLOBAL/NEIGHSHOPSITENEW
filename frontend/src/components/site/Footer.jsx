import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSiteData } from '../../context/SiteDataContext'
import api from '../../lib/api'

export default function Footer() {
  const data = useSiteData()
  const company = data.company || {}
  const [locations, setLocations] = useState([])

  useEffect(() => {
    api.get('/public/locations').then((res) => setLocations(res.data)).catch(() => {})
  }, [])

  return (
    <footer className="bg-surface border-t border-line">
      <div className="container-page py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <div className="font-bold text-lg mb-4">Neighshop Global</div>
            <p className="text-[13px] text-muted leading-relaxed max-w-xs mb-4">
              Neighshop Global is a Delhi-based software development and digital marketing company. We build websites, mobile apps, CRM and custom software, e-commerce stores and growth campaigns for startups and businesses in India and abroad. 100+ projects delivered, with 3–6 months of post-launch support.
            </p>
            <p className="text-[13px] text-ink-2">{company.headOffice}</p>
            <p className="text-[13px] text-ink-2">{company.phone}</p>
            <p className="text-[13px] text-ink-2">{company.email}</p>
          </div>

          <FooterCol
            title="Services"
            links={[
              ['Website Development', '/services/custom-website-development'],
              ['Mobile App Development', '/services/mobile-app-development'],
              ['CRM & Custom Software', '/services/crm-custom-software'],
              ['E-Commerce Development', '/services/ecommerce-development'],
              ['SEO Services', '/services/seo-services'],
              ['Social Media Marketing', '/services/social-media-marketing'],
              ['Graphic Design & Branding', '/services/graphic-design-branding'],
              ['Video Editing & UGC', '/services/video-editing-ugc'],
              ['Landing Page Design', '/services/landing-page-design'],
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              ['Rapido Clone', '/products/rapido-clone'],
              ['Urban Company Clone', '/products/urban-company-clone'],
              ['CRM Software', '/products/crm-software'],
              ['Portfolio', '/portfolio'],
              ['Blog', '/blog'],
              ['Training', '/training'],
              ['FAQ', '/faq'],
              ['Contact', '/contact'],
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              ['Privacy Policy', '/privacy-policy'],
              ['Terms of Service', '/terms'],
              ['Refund Policy', '/refund-policy'],
            ]}
          />
        </div>

        <div className="flex flex-wrap gap-6 mt-12 pt-6 border-t border-line text-[13px] text-muted">
          {['Delhi', 'Jaipur', 'Bangalore'].map((city) => {
            const loc = locations?.find?.((l) => l.city === city)
            const status = loc?.status || (city === 'Delhi' ? 'Active' : 'Coming Soon')
            const dot = status === 'Active' ? 'bg-success' : status === 'Maintenance' ? 'bg-warning' : 'bg-muted-2'
            return (
              <span key={city} className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${dot}`} />
                {city} · {status}
              </span>
            )
          })}
        </div>
      </div>

      <div className="border-t border-line overflow-hidden">
        <div
          className="text-center font-bold select-none"
          style={{
            fontSize: 'clamp(4rem, 14vw, 11rem)',
            color: 'var(--surface-2)',
            lineHeight: 1,
            margin: '0 -20px',
            letterSpacing: '-0.03em',
          }}
        >
          NEIGHSHOP
        </div>
      </div>

      <div className="container-page py-4 text-[12px] text-muted-2 flex justify-between">
        <span>© {new Date().getFullYear()} Neighshop Global. All rights reserved. · Made in Delhi, India.</span>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }) {
  return (
    <div>
      <div className="text-[13px] font-medium text-ink mb-4">{title}</div>
      <ul className="flex flex-col gap-3">
        {links.map(([label, href]) => (
          <li key={label}>
            <Link to={href} className="text-[13px] text-muted hover:text-ink transition-colors">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
