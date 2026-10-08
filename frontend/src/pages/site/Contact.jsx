import { Phone, Mail, MapPin, MessageCircle, GraduationCap } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Eyebrow from '../../components/site/Eyebrow'
import ContactForm from '../../components/site/ContactForm'

const NEXT_STEPS = [
  { title: 'Discovery call', desc: 'We understand your goals.' },
  { title: 'Scope & quote', desc: 'A clear proposal with timeline and cost.' },
  { title: 'Design & build', desc: 'Regular updates and demos.' },
  { title: 'Launch & support', desc: '3–6 months of post-launch support.' },
]

export default function Contact() {
  const data = useSiteData()
  const company = data.company || {}
  const training = data.training || {}
  const waNumber = (company.phone || '').replace(/[^\d]/g, '')

  return (
    <div className="section-y">
      <div className="container-page grid grid-cols-1 md:grid-cols-12 gap-14 mb-20">
        <div className="md:col-span-6">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="fs-h1 mb-8">Let's Build Something Great Together</h1>
          <p className="text-muted max-w-md mb-10">
            Tell us about your idea, problem or project. Our team will review it and get back to you with next steps. Prefer to talk? Call or WhatsApp us directly.
          </p>
          <div className="flex flex-col gap-4">
            <ContactLine icon={Phone} value={company.phone || '+91 8307802643'} href={`tel:${company.phone}`} />
            {waNumber && <ContactLine icon={MessageCircle} value="Chat on WhatsApp" href={`https://wa.me/${waNumber}`} external />}
            <ContactLine icon={Mail} value={company.email || 'info@neighshopglobal.com'} href={`mailto:${company.email}`} />
            <ContactLine icon={MapPin} value={company.headOffice || 'Delhi, India'} />
            {training.address && (
              <ContactLine icon={GraduationCap} value={`Training centre: ${training.address}`} href={`tel:${training.trainingPhone}`} />
            )}
          </div>
          <div className="flex gap-3 mt-10">
            {['Delhi · Active', 'Jaipur · Maintenance', 'Bangalore · Coming Soon'].map((s) => (
              <span key={s} className="text-[12px] bg-surface-2 rounded-pill px-3 py-1.5">{s}</span>
            ))}
          </div>
        </div>
        <div className="md:col-span-6">
          <ContactForm sourcePage="/contact" />
        </div>
      </div>

      <div className="container-page">
        <h2 className="fs-h3 mb-8">What Happens Next?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {NEXT_STEPS.map((s, i) => (
            <div key={s.title} className="pt-6 border-t border-line-strong">
              <div className="text-[13px] font-mono text-muted-2 mb-2">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="text-[15px] font-medium text-ink mb-1">{s.title}</h3>
              <p className="text-[13px] text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ContactLine({ icon: Icon, value, href, external }) {
  const content = (
    <span className="flex items-center gap-3 text-[15px] text-ink-2">
      <span className="w-9 h-9 rounded-full bg-surface-2 flex items-center justify-center shrink-0">
        <Icon size={16} />
      </span>
      {value}
    </span>
  )
  if (!href) return content
  return (
    <a href={href} className="hover:text-ink" target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>
      {content}
    </a>
  )
}
