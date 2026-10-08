import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { gradientFor } from '../../lib/placeholder'
import { PortfolioBadge } from './Badge'

export default function PortfolioCard({ item }) {
  return (
    <Link to={`/portfolio/${item.slug}`} className="group block">
      <div
        className="relative rounded-lg overflow-hidden aspect-[4/3] mb-4"
        style={{ background: item.coverImage ? undefined : gradientFor(item.name) }}
      >
        {item.coverImage ? (
          <img src={item.coverImage} alt={item.coverImageAlt || item.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/90 text-2xl font-medium tracking-tightest text-center px-6">
              {item.name}
            </span>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <PortfolioBadge type={item.portfolioType} />
        </div>
        <div className="absolute bottom-4 right-4 w-9 h-9 rounded-full bg-white text-ink flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight size={18} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-ink">{item.name}</h3>
        <span className="text-[13px] text-muted">{item.category}</span>
      </div>
    </Link>
  )
}
