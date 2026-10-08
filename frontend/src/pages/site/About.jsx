import { useEffect, useState } from 'react'
import api from '../../lib/api'
import { useSiteData } from '../../context/SiteDataContext'
import Eyebrow from '../../components/site/Eyebrow'
import StatBlock from '../../components/site/StatBlock'
import ProcessSteps from '../../components/site/ProcessSteps'
import { gradientFor } from '../../lib/placeholder'

export default function About() {
  const data = useSiteData()
  const [team, setTeam] = useState([])
  const company = data.company || {}
  const stats = data.stats || {}
  const process = data.process || []

  useEffect(() => {
    api.get('/public/team').then((r) => setTeam(r.data))
  }, [])

  const statList = [
    { value: stats.clientsServed || '100+', label: 'Clients' },
    { value: stats.projectsDelivered || '100+', label: 'Projects' },
    { value: stats.teamMembers || '25+', label: 'Team' },
    { value: stats.yearsExperience || '7+', label: 'Years' },
    { value: stats.postLaunchSupport || '3-6 mo', label: 'Post-launch support' },
  ]

  const processDescriptions = {
    'Discovery & Consultation': 'We learn your goals, users and constraints before writing a line of code.',
    'Requirement Analysis': 'Ideas turn into a clear, buildable scope everyone agrees on.',
    'Design & Planning': 'Wireframes, architecture and a realistic timeline take shape.',
    'Development': 'Sprints with visible, demo-able progress every week.',
    'Testing & QA': 'Cross-device, cross-browser testing before anything ships.',
    'Deployment & Support': 'Launch, monitor, and 3–6 months of support included.',
  }
  const processSteps = (process.length
    ? process.map((p) => p.name)
    : Object.keys(processDescriptions)
  ).map((title) => ({ title, description: processDescriptions[title] }))

  return (
    <div>
      <section className="section-y pb-10">
        <div className="container-page">
          <Eyebrow>About</Eyebrow>
          <h1 className="fs-h1 max-w-3xl mb-8">{company.mission}</h1>
          <p className="text-muted max-w-xl">
            {company.companyName} is a {company.market} software studio headquartered in {company.headOffice}, specializing in {(company.specializations || []).slice(0, 3).join(', ').toLowerCase()}.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <div className="rounded-xl overflow-hidden aspect-[16/9]" style={{ background: 'var(--accent-2)' }}>
            <img src="/images/about.png" alt="Neighshop Global team" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-page">
          <StatBlock stats={statList} />
        </div>
      </section>

      <section className="section-y pt-0">
        <div className="container-page">
          <Eyebrow>Leadership</Eyebrow>
          <h2 className="fs-h2 mb-10">The people behind the work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t) => (
              <div key={t.id} className="card p-6">
                <div className="w-16 h-16 rounded-full mb-5 overflow-hidden" style={{ background: t.photo ? undefined : gradientFor(t.name) }}>
                  {t.photo && <img src={t.photo} alt={t.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="fs-h3 mb-1">{t.name}</h3>
                <p className="text-[13px] text-muted mb-4">{t.role}</p>
                <div className="flex flex-wrap gap-2">
                  {(t.expertise || []).map((e) => (
                    <span key={e} className="text-[12px] bg-surface-2 rounded-pill px-3 py-1">{e}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-y pt-0">
        <div className="container-page">
          <Eyebrow>Process</Eyebrow>
          <h2 className="fs-h2 mb-10">How we work, start to finish</h2>
          <ProcessSteps steps={processSteps} />
        </div>
      </section>
    </div>
  )
}
