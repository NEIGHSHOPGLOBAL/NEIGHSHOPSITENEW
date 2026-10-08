import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../lib/api'
import { useSiteData } from '../../context/SiteDataContext'
import Button from '../../components/site/Button'
import SectionHeader from '../../components/site/SectionHeader'
import MediaCard from '../../components/site/MediaCard'
import FeatureCell from '../../components/site/FeatureCell'
import StatBlock from '../../components/site/StatBlock'
import ProcessSteps from '../../components/site/ProcessSteps'
import IndustryCarousel from '../../components/site/IndustryCarousel'
import PortfolioCard from '../../components/site/PortfolioCard'
import PostCard from '../../components/site/PostCard'
import CtaPanel from '../../components/site/CtaPanel'
import FadeUp from '../../components/site/FadeUp'
import FaqAccordion from '../../components/site/FaqAccordion'
import { getServiceIcon } from '../../lib/icons'
import { gradientFor } from '../../lib/placeholder'
import { Layout, Server, Smartphone, Database, Cloud, Sparkles, Plug } from 'lucide-react'

export default function Home() {
  const data = useSiteData()
  const [services, setServices] = useState([])
  const [products, setProducts] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [posts, setPosts] = useState([])
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    api.get('/public/services').then((r) => setServices(r.data))
    api.get('/public/products').then((r) => setProducts(r.data))
    api.get('/public/portfolio').then((r) => setPortfolio(r.data.slice(0, 6)))
    api.get('/public/posts').then((r) => setPosts(r.data.slice(0, 3)))
    api.get('/public/faqs').then((r) => setFaqs(r.data.filter((f) => f.category === 'general')))
  }, [])

  const company = data.company || {}
  const stats = data.stats || {}
  const technology = data.technology || {}
  const industries = data.industries || []

  const statList = [
    { value: stats.clientsServed || '100+', label: 'Clients' },
    { value: stats.projectsDelivered || '100+', label: 'Projects' },
    { value: stats.teamMembers || '25+', label: 'Team' },
    { value: stats.yearsExperience || '7+', label: 'Years' },
    { value: stats.postLaunchSupport || '3-6 mo', label: 'Post-launch support' },
  ]

  const featuredServices = services.slice(0, 5)
  const techGroups = [
    { label: 'Frontend', icon: Layout, items: technology.frontend || [] },
    { label: 'Backend', icon: Server, items: technology.backend || [] },
    { label: 'Mobile', icon: Smartphone, items: technology.mobile || [] },
    { label: 'Databases', icon: Database, items: technology.databases || [] },
    { label: 'Cloud & DevOps', icon: Cloud, items: technology.cloudDevops || [] },
    { label: 'AI', icon: Sparkles, items: technology.ai || [] },
    { label: 'API', icon: Plug, items: technology.api || [] },
  ].filter((g) => g.items.length > 0)

  const commercialFlowDescriptions = {
    'Discovery Call': 'A focused call to understand your goals, users and constraints.',
    'Scope & Quote': 'A clear scope, timeline and fixed price before anything starts.',
    'Design & Build': 'Design sign-off, then sprints with visible weekly progress.',
    'Launch & Support': 'Go live, plus 3–6 months of post-launch support included.',
  }
  const commercialFlowSteps = (data.commercialFlow?.length
    ? data.commercialFlow
    : ['Discovery Call', 'Scope & Quote', 'Design & Build', 'Launch & Support']
  ).map((title) => ({ title, description: commercialFlowDescriptions[title] }))

  return (
    <div>
      {/* Hero */}
      <section className="section-y">
        <div className="container-page">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-10">
            <FadeUp className="md:col-span-8">
              <h1 className="fs-display">Software, App &amp; Website Development Company in Delhi, Built for Growth</h1>
            </FadeUp>
            <FadeUp delay={120} className="md:col-span-4 flex flex-col gap-6 md:pt-4">
              <p className="text-muted text-[0.95rem] leading-relaxed">
                From your first MVP to a platform that scales, Neighshop Global designs, builds, launches and markets digital products for startups and businesses across India and the world.
              </p>
              <div className="flex gap-3">
                <Button to="/contact" size="lg" className="!h-[52px] !px-7">Get a Free Quote</Button>
                <Button to="/portfolio" variant="secondary" size="lg" className="!h-[52px] !px-7">View Our Work</Button>
              </div>
            </FadeUp>
          </div>

          <FadeUp delay={200}>
            <div className="rounded-xl overflow-hidden" style={{ aspectRatio: '16/7', background: 'var(--accent-2)' }}>
              <img src="/images/hero.png" alt="Neighshop Global team collaborating" className="w-full h-full object-cover" />
            </div>
            <p className="text-[13px] text-muted mt-4">
              {stats.clientsServed || '100+'} clients served · {stats.projectsDelivered || '100+'} projects delivered · {stats.teamMembers || '25+'} experts · {stats.yearsExperience || '7+'} years · {stats.postLaunchSupport || '3–6 months'} post-launch support
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services bento */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader
            eyebrow="What We Do"
            title="End-to-End Software Engineering and Digital Growth, Under One Roof"
            description="Most businesses juggle a web agency, an app developer, an SEO freelancer and a design studio. Neighshop Global puts all of it in one team, with one point of contact and full source code ownership on eligible projects."
            action={{ label: 'See all', href: '/services' }}
          />
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
            {featuredServices.map((s, i) => (
              <div key={s.id} className={i < 2 ? 'md:col-span-6' : 'md:col-span-4'}>
                <MediaCard
                  to={`/services/${s.slug}`}
                  title={s.name}
                  description={s.shortDesc}
                  image={s.heroImage}
                  imageAlt={s.heroImageAlt}
                  seed={s.slug}
                  height={320}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader
            eyebrow="Products"
            title="Launch Faster with Ready-Made App Solutions"
            description="Skip months of development. Our pre-built platforms come with customer apps, partner apps, an admin panel and deployment support, customised to your brand and business model."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link key={p.id} to={`/products/${p.slug}`} className="card p-6 block hover:shadow-md transition-shadow">
                <div className="rounded-md aspect-[4/3] mb-5 overflow-hidden" style={{ background: p.coverImage ? undefined : gradientFor(p.slug) }}>
                  {p.coverImage && <img src={p.coverImage} alt={p.coverImageAlt || p.name} className="w-full h-full object-cover" />}
                </div>
                <h3 className="fs-h3 mb-2">{p.name}</h3>
                <p className="text-[13px] text-muted mb-4 line-clamp-2">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {(p.features || []).slice(0, 3).map((f) => (
                    <span key={f} className="text-[12px] bg-surface-2 rounded-pill px-3 py-1">{f}</span>
                  ))}
                </div>
                <span className="text-sm font-medium text-ink">Request demo →</span>
              </Link>
            ))}
          </div>
          <p className="text-[12px] text-muted-2 mt-6">
            Product names refer to the business model; Neighshop Global is not affiliated with Rapido or Urban Company.
          </p>
        </div>
      </section>

      {/* Industries */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader
            eyebrow="Industries we serve"
            title="Tailored software for every industry"
            description="Deep domain context across the sectors we build for most."
          />
          <IndustryCarousel industries={industries} />
        </div>
      </section>

      {/* Why Neighshop Global */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader
            eyebrow="Why Us"
            title="Why Startups and Businesses Choose Neighshop Global"
            description="One partner, full stack — strategy, design, development and marketing in one team, with no vendor hopping."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="rounded-xl overflow-hidden aspect-[4/5]" style={{ background: 'var(--accent-2)' }}>
              <img src="/images/technology.png" alt="Engineer working on code" className="w-full h-full object-cover" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 content-start">
              <FeatureCell title="Source Code Ownership" description="Full code ownership is available on eligible projects and products. No lock-in." href="/faq" />
              <FeatureCell title="Cost-Smart Engineering" description="Our mission is high-quality technology without excessive development costs." href="/about" />
              <FeatureCell title="Real Support After Launch" description={`${stats.postLaunchSupport || '3–6 months'} of post-launch support, depending on your agreement.`} href="/faq" />
              <FeatureCell title="AI-Ready" description="We add chatbots, AI agents and automation where they save time or money." href="/services/crm-custom-software" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader
            eyebrow="Technology"
            title="A Modern, Proven Technology Stack"
            description="We build on technology that's fast, scalable and easy for any good developer to maintain."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {techGroups.map((g) => (
              <div
                key={g.label}
                className="card p-5 flex flex-col gap-4 transition-shadow hover:shadow-md"
              >
                <span className="w-10 h-10 rounded-full bg-ink text-white flex items-center justify-center shrink-0">
                  <g.icon size={18} strokeWidth={1.75} />
                </span>
                <div>
                  <div className="text-[11px] uppercase tracking-wide text-muted-2 mb-2">{g.label}</div>
                  <div className="flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <span key={t} className="text-[12px] bg-surface-2 text-ink-2 rounded-pill px-2.5 py-1">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader eyebrow="Process" title="From first call to launch" description="One team, four steps, no surprises in between." />
          <ProcessSteps steps={commercialFlowSteps} />
        </div>
      </section>

      {/* Portfolio preview */}
      <section className="section-y pt-0">
        <div className="container-page">
          <SectionHeader eyebrow="Work" title="Selected projects & builds" action={{ label: 'View all work', href: '/portfolio' }} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {portfolio.map((item) => <PortfolioCard key={item.id} item={item} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-y pt-0">
        <div className="container-page">
          <StatBlock stats={statList} />
        </div>
      </section>

      {/* Blog preview */}
      {posts.length > 0 && (
        <section className="section-y pt-0">
          <div className="container-page">
            <SectionHeader eyebrow="Journal" title="From the blog" action={{ label: 'Read more', href: '/blog' }} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Home FAQs */}
      {faqs.length > 0 && (
        <section className="section-y pt-0">
          <div className="container-page max-w-2xl">
            <SectionHeader eyebrow="FAQ" title="Common Questions" />
            <FaqAccordion items={faqs} />
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="section-y pt-0">
        <div className="container-page">
          <CtaPanel
            title="Have an Idea? Let's Build It."
            phone={company.phone || '+91 8307802643'}
            email={company.email || 'info@neighshopglobal.com'}
            buttonLabel="Get a Free Quote"
            showWhatsApp
          />
        </div>
      </section>
    </div>
  )
}
