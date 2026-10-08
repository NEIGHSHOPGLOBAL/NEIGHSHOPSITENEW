import { getIndustryIcon } from '../../lib/icons'

export default function IndustryCard({ name, description, active = false }) {
  const Icon = getIndustryIcon(name)
  return (
    <div
      className={`shrink-0 w-[270px] h-[320px] rounded-lg p-6 flex flex-col justify-between transition-colors duration-300 border ${
        active ? 'bg-charcoal border-charcoal text-white' : 'bg-surface border-line text-ink'
      }`}
    >
      <span
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          active ? 'bg-white text-charcoal' : 'bg-ink text-white'
        }`}
      >
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <div>
        <h3 className="text-lg font-medium mb-2">{name}</h3>
        <p className={`text-[13px] leading-relaxed ${active ? 'text-white/75' : 'text-muted'}`}>
          {description}
        </p>
      </div>
    </div>
  )
}
