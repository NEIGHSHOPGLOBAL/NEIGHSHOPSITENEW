import { Check, MapPin, Sparkles, Users, GraduationCap, Wallet } from 'lucide-react'
import { useSiteData } from '../../context/SiteDataContext'
import Eyebrow from '../../components/site/Eyebrow'
import ContactForm from '../../components/site/ContactForm'
import FaqAccordion from '../../components/site/FaqAccordion'

const WHY_DIFFERENT = [
  { icon: Users, title: 'Small batches (max 10)', desc: 'Personal attention from mentors.' },
  { icon: GraduationCap, title: 'Taught inside a software company', desc: 'Learn the tools and workflows teams actually use.' },
  { icon: Sparkles, title: 'AI-first skills', desc: 'Learn to use AI assistants to code, debug and ship faster — employers now expect this.' },
  { icon: Wallet, title: 'Affordable', desc: '₹5,499 for 45 days of hands-on training.' },
]

const FAQS = [
  { question: 'Do I need coding experience?', answer: 'No. Basic computer knowledge is enough. We start from HTML and CSS.' },
  { question: 'Is the internship online?', answer: 'No. The program is offline at our Narela, Delhi centre.' },
  { question: 'How many students are in a batch?', answer: 'A maximum of 10, so everyone gets hands-on guidance.' },
  { question: 'What is the fee?', answer: '₹5,499 for the 45-day program.' },
]

export default function Training() {
  const data = useSiteData()
  const t = data.training || {}

  return (
    <div className="section-y">
      <div className="container-page">
        <Eyebrow>Training</Eyebrow>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-6">
          <div className="md:col-span-8">
            <h1 className="fs-h1 mb-6">Industry Internship Program: Learn Full-Stack Web Development &amp; AI in 45 Days</h1>
            <p className="text-muted max-w-xl">
              Degrees teach theory. Jobs need skills. The Neighshop Industry Internship Program is a 45-day, offline, hands-on training in Narela, Delhi, run by a working software company. You'll build real projects with the MERN stack, learn to use AI like a professional developer, and work on at least one real client project, so you leave with a portfolio, not just a certificate.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right">
            <div className="text-5xl font-medium text-ink mb-2">{t.price || '₹5,499'}</div>
            <p className="text-muted text-[13px]">{t.eligibility}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-[13px] mb-14">
          {[t.duration, t.mode, t.batchSize, t.location].filter(Boolean).map((x) => (
            <span key={x} className="bg-surface-2 rounded-pill px-3 py-1.5">{x}</span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 space-y-14">
            <div>
              <h2 className="fs-h3 mb-6">What You'll Learn</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(t.curriculum || []).map((c) => (
                  <div key={c} className="flex items-center gap-3 text-[14px] text-ink-2">
                    <Check size={16} className="text-accent shrink-0" />
                    {c}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="fs-h3 mb-6">Projects You'll Build</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(t.projects || []).map((p) => (
                  <div key={p} className="card p-5 text-[14px] text-ink-2">{p}</div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="fs-h3 mb-6">Why This Internship Is Different</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {WHY_DIFFERENT.map((w) => (
                  <div key={w.title} className="flex gap-4">
                    <span className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
                      <w.icon size={18} strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-ink mb-1">{w.title}</h3>
                      <p className="text-[13px] text-muted leading-relaxed">{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="fs-h3 mb-3">Who Should Join</h2>
              <p className="text-[14px] text-muted leading-relaxed">
                College students (BCA, B.Tech, B.Sc, BCom and others) looking for an internship, fresh graduates preparing for developer jobs, career switchers with basic computer knowledge, and aspiring freelancers who want to build websites for clients.
              </p>
            </div>

            <div>
              <h2 className="fs-h3 mb-4">Training Centre</h2>
              <div className="card p-6 flex items-start gap-3">
                <MapPin size={20} className="text-muted shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] text-ink-2 mb-2">{t.address}</p>
                  <p className="text-[13px] text-muted">Training: {t.trainingPhone} · Company: {data.company?.phone}</p>
                  {t.website && <a href={t.website} className="text-[13px] text-accent" target="_blank" rel="noreferrer">{t.website}</a>}
                </div>
              </div>
            </div>

            <div>
              <h2 className="fs-h3 mb-6">FAQs</h2>
              <FaqAccordion items={FAQS} />
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="card p-6 sticky top-24">
              <h3 className="fs-h3 mb-4">Enquire Now</h3>
              <ContactForm compact defaultService="Neighshop Training" sourcePage="/training" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
