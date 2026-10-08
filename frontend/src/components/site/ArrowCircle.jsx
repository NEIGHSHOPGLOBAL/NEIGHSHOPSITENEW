import { ArrowRight, ArrowUpRight } from 'lucide-react'

export default function ArrowCircle({ size = 34, up = false, variant = 'dark' }) {
  const Icon = up ? ArrowUpRight : ArrowRight
  const bg = variant === 'dark' ? 'bg-ink text-white' : 'bg-white text-ink border border-line-strong'
  return (
    <span
      className={`arrow-circle ${bg}`}
      style={{ width: size, height: size }}
    >
      <Icon size={16} strokeWidth={1.75} />
    </span>
  )
}
