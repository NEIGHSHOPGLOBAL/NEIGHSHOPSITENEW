import FadeUp from './FadeUp'

export default function ProcessSteps({ steps }) {
  const items = steps.map((s) => (typeof s === 'string' ? { title: s } : s))
  const cols = items.length >= 6 ? 'md:grid-cols-3 lg:grid-cols-6' : 'md:grid-cols-4'

  return (
    <div className={`relative grid grid-cols-2 ${cols} gap-x-6 gap-y-12`}>
      <div className="hidden md:block absolute top-6 left-6 right-6 h-px bg-line-strong" />

      {items.map((s, i) => (
        <FadeUp key={i} delay={i * 90} className="relative group">
          <span
            className={`relative z-10 inline-flex w-12 h-12 rounded-full items-center justify-center text-sm font-semibold mb-5 text-white transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-accent group-hover:shadow-md ${
              i === 0 ? 'bg-accent' : 'bg-ink'
            }`}
          >
            {String(i + 1).padStart(2, '0')}
          </span>
          <h3 className="text-base font-medium text-ink mb-2 transition-colors group-hover:text-accent">{s.title}</h3>
          {s.description && (
            <p className="text-[13px] text-muted leading-relaxed max-w-[200px]">{s.description}</p>
          )}
        </FadeUp>
      ))}
    </div>
  )
}
