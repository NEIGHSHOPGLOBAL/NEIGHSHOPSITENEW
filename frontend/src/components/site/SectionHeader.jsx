import Eyebrow from './Eyebrow'
import Button from './Button'
import ArrowCircle from './ArrowCircle'

export default function SectionHeader({ eyebrow, title, description, action, align = 'top' }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${align === 'top' ? 'items-start' : 'items-end'} mb-12`}>
      <div className="md:col-span-7">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="fs-h2">{title}</h2>
      </div>
      <div className="md:col-span-5 flex flex-col md:items-end gap-5 md:text-right">
        {description && <p className="text-muted text-[0.95rem] leading-relaxed max-w-md">{description}</p>}
        {action && (
          <Button to={action.href} variant="ghost" className="group inline-flex items-center gap-3 !p-0 !h-auto bg-transparent">
            <span className="text-sm font-medium text-ink">{action.label}</span>
            <ArrowCircle size={30} />
          </Button>
        )}
      </div>
    </div>
  )
}
