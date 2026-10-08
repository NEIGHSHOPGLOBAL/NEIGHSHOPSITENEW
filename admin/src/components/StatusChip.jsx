const STYLES = {
  DRAFT: 'bg-surface-2 text-muted',
  PUBLISHED: 'bg-accent-soft text-success',
  NEW: 'bg-surface-2 text-info',
  CONTACTED: 'bg-accent-soft text-accent',
  QUALIFIED: 'bg-accent-soft text-accent',
  WON: 'bg-accent-soft text-success',
  LOST: 'bg-surface-2 text-danger',
  SPAM: 'bg-surface-2 text-danger',
  Active: 'bg-accent-soft text-success',
  Maintenance: 'bg-surface-2 text-warning',
  'Coming Soon': 'bg-surface-2 text-muted',
}

export default function StatusChip({ value }) {
  return (
    <span className={`inline-flex items-center h-6 px-2.5 rounded-pill text-[11.5px] font-medium ${STYLES[value] || 'bg-surface-2 text-muted'}`}>
      {value}
    </span>
  )
}
