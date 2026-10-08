import { Link } from 'react-router-dom'
import { gradientFor } from '../../lib/placeholder'

export default function MediaCard({ to, title, description, image, imageAlt, seed, height = 320, badge }) {
  return (
    <Link to={to} className="group block relative rounded-lg overflow-hidden" style={{ height }}>
      {image ? (
        <img
          src={image}
          alt={imageAlt || title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          style={{ background: gradientFor(seed || title) }}
        />
      )}
      {badge && <div className="absolute top-4 left-4 z-10">{badge}</div>}
      <div className="absolute inset-0" style={{ background: 'var(--scrim)' }} />
      <div
        className="absolute bottom-0 left-0 right-0 p-5 backdrop-blur-[14px]"
        style={{ background: 'var(--glass-bg)' }}
      >
        <h3 className="text-white text-base font-medium">{title}</h3>
        {description && (
          <p className="text-white/80 text-[12.5px] mt-1 line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}
