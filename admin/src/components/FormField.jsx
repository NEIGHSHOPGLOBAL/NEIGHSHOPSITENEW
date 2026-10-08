import ImageField from './ImageField'

export default function FormField({ field, value, values, onChange }) {
  const { key, label, type = 'text', options, placeholder, max } = field

  function set(v) {
    onChange(key, v)
  }

  const length = typeof value === 'string' ? value.length : 0

  return (
    <div className="block">
      <span className="flex items-center justify-between text-[13px] font-medium text-ink-2 mb-2">
        {label}
        {max ? <span className={length > max ? 'text-danger font-normal' : 'text-muted font-normal'}>{length}/{max}</span> : null}
      </span>

      {type === 'image' && (
        <ImageField
          value={value || ''}
          folder={field.folder}
          onChange={set}
          onAlt={field.altKey ? (alt) => {
            if (!values?.[field.altKey]) onChange(field.altKey, alt)
          } : undefined}
        />
      )}

      {type === 'textarea' && (
        <textarea rows={4} value={value || ''} placeholder={placeholder} onChange={(e) => set(e.target.value)} />
      )}

      {type === 'html' && (
        <textarea rows={8} value={value || ''} placeholder={placeholder || 'HTML content...'} onChange={(e) => set(e.target.value)} className="font-mono text-[13px]" />
      )}

      {type === 'tags' && (
        <input
          value={Array.isArray(value) ? value.join(', ') : (value || '')}
          placeholder="Comma, separated, values"
          onChange={(e) => set(e.target.value.split(',').map((v) => v.trim()).filter(Boolean))}
        />
      )}

      {type === 'number' && (
        <input type="number" value={value ?? 0} onChange={(e) => set(Number(e.target.value))} />
      )}

      {type === 'checkbox' && (
        <div className="h-12 flex items-center">
          <input type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} className="w-5 h-5" style={{ height: 'auto' }} />
        </div>
      )}

      {type === 'select' && (
        <select value={value || ''} onChange={(e) => set(e.target.value)}>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      )}

      {type === 'text' && (
        <input value={value || ''} placeholder={placeholder} onChange={(e) => set(e.target.value)} />
      )}
    </div>
  )
}
