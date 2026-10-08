import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

export default function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="divide-y divide-line">
      {items.map((item, i) => (
        <div key={item.id || i}>
          <button
            className="w-full flex items-center justify-between py-5 text-left"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
          >
            <span className="font-medium text-ink pr-6">{item.question}</span>
            <span className="shrink-0 text-muted">
              {open === i ? <Minus size={18} /> : <Plus size={18} />}
            </span>
          </button>
          {open === i && (
            <p className="text-[14px] text-muted leading-relaxed pb-5 pr-10">{item.answer}</p>
          )}
        </div>
      ))}
    </div>
  )
}
