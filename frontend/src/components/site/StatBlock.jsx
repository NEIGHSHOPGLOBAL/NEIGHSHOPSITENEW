export default function StatBlock({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-line">
      {stats.map((s, i) => (
        <div key={i} className="px-4 md:px-6 py-2 text-center md:text-left">
          <div className="text-[clamp(2rem,4vw,3.25rem)] font-medium tracking-tightest text-ink">{s.value}</div>
          <div className="text-[13px] text-muted mt-1">{s.label}</div>
        </div>
      ))}
    </div>
  )
}
