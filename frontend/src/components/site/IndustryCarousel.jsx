import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import IndustryCard from './IndustryCard'

const DESCRIPTIONS = {
  'Healthcare & MedTech': 'Patient platforms, diagnostics and care-delivery software built for compliance and scale.',
  'Fintech & Payments': 'Secure payment flows, lending and financial dashboards engineered for trust.',
  'EdTech & E-Learning': 'Learning platforms, cohort tools and content delivery for modern education.',
  'Logistics & Supply Chain': 'Fleet, freight and warehouse systems that keep operations moving.',
  'Real Estate & PropTech': 'Listing platforms, CRM and booking tools for property businesses.',
  'E-Commerce & Retail': 'Storefronts, marketplaces and inventory systems built to convert.',
}

export default function IndustryCarousel({ industries = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true })
  const [progress, setProgress] = useState(0)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onScroll = () => setProgress(Math.min(1, Math.max(0, emblaApi.scrollProgress())))
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)
    return () => emblaApi.off('scroll', onScroll)
  }, [emblaApi])

  return (
    <div>
      <div className="flex justify-end gap-3 mb-6">
        <button onClick={scrollPrev} className="w-9 h-9 rounded-full border border-line-strong flex items-center justify-center hover:border-ink" aria-label="Previous">
          <ArrowLeft size={16} />
        </button>
        <button onClick={scrollNext} className="w-9 h-9 rounded-full border border-line-strong flex items-center justify-center hover:border-ink" aria-label="Next">
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {industries.map((name, i) => (
            <div key={name} className="shrink-0">
              <IndustryCard name={name} description={DESCRIPTIONS[name] || ''} active={i === 0} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[2px] bg-line mt-6 rounded-full overflow-hidden">
        <div className="h-full bg-ink transition-all" style={{ width: `${Math.max(10, progress * 100)}%` }} />
      </div>
    </div>
  )
}
