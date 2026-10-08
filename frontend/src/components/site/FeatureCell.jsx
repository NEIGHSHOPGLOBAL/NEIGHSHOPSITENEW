import ArrowCircle from './ArrowCircle'
import { Link } from 'react-router-dom'

export default function FeatureCell({ title, description, href }) {
  return (
    <div className="pt-7 border-t border-line-strong">
      <h3 className="fs-h3 mb-3">{title}</h3>
      <p className="text-[13px] text-muted leading-relaxed mb-6 max-w-xs">{description}</p>
      {href && (
        <Link to={href} className="group inline-flex items-center gap-3">
          <span className="text-sm font-medium text-ink">Learn More</span>
          <ArrowCircle size={30} />
        </Link>
      )}
    </div>
  )
}
