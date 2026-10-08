export default function Badge({ children, variant = 'default' }) {
  const styles = {
    default: 'bg-surface-2 text-ink-2',
    accent: 'bg-accent-soft text-accent',
    outline: 'bg-transparent border border-line-strong text-muted',
  }
  return (
    <span className={`inline-flex items-center h-7 px-3 rounded-pill text-[12.5px] font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

export function PortfolioBadge({ type }) {
  if (type === 'CLIENT_PROJECT') return <Badge variant="accent">Client project</Badge>
  if (type === 'INTERNAL_DEMO') return <Badge variant="default">Neighshop demo</Badge>
  return <Badge variant="outline">Concept build</Badge>
}
