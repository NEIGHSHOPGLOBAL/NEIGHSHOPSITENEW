import { useEffect, useState } from 'react'
import { Plus, Pencil, Trash2, X } from 'lucide-react'
import api from '../lib/api'
import FormField from './FormField'
import StatusChip from './StatusChip'

export default function ResourceAdminPage({ title, endpoint, columns, fields, defaultValues, emptyLabel }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null)
  const [saving, setSaving] = useState(false)

  function load() {
    setLoading(true)
    api.get(`/admin/${endpoint}`).then((r) => setItems(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [endpoint])

  function startCreate() {
    setEditing({ ...defaultValues })
  }

  function startEdit(item) {
    setEditing({ ...item })
  }

  async function save() {
    setSaving(true)
    try {
      if (editing.id) {
        await api.patch(`/admin/${endpoint}/${editing.id}`, editing)
      } else {
        await api.post(`/admin/${endpoint}`, editing)
      }
      setEditing(null)
      load()
    } finally {
      setSaving(false)
    }
  }

  async function remove(item) {
    if (!window.confirm(`Delete "${item.name || item.title || item.question || item.city}"?`)) return
    await api.delete(`/admin/${endpoint}/${item.id}`)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="fs-h3">{title}</h1>
        <button onClick={startCreate} className="btn btn-primary btn-sm">
          <Plus size={15} /> New
        </button>
      </div>

      {editing && (
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-medium text-ink">{editing.id ? 'Edit' : 'Create new'}</h3>
            <button onClick={() => setEditing(null)} aria-label="Close"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {fields.map((f) => (
              f.type === 'section' ? (
                <div key={f.label} className="md:col-span-2 pt-2">
                  <h4 className="text-[12px] uppercase tracking-wide text-muted border-b border-line pb-2">{f.label}</h4>
                  {f.hint && <p className="text-[12.5px] text-muted mt-2">{f.hint}</p>}
                </div>
              ) : (
                <div key={f.key} className={f.full ? 'md:col-span-2' : ''}>
                  <FormField
                    field={f}
                    value={editing[f.key]}
                    values={editing}
                    onChange={(k, v) => setEditing((e) => ({ ...e, [k]: v }))}
                  />
                </div>
              )
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={save} disabled={saving} className="btn btn-primary">
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button onClick={() => setEditing(null)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-[13.5px]">
          <thead>
            <tr className="border-b border-line bg-surface-2">
              {columns.map((c) => (
                <th key={c.key} className="text-left px-5 h-11 font-medium text-muted">{c.label}</th>
              ))}
              <th className="w-24"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-line last:border-0 hover:bg-surface-2/40">
                {columns.map((c) => (
                  <td key={c.key} className="px-5 h-11 text-ink-2">
                    {c.render ? c.render(item) : (c.chip ? <StatusChip value={item[c.key]} /> : String(item[c.key] ?? ''))}
                  </td>
                ))}
                <td className="px-5 text-right whitespace-nowrap">
                  <button onClick={() => startEdit(item)} className="text-muted hover:text-ink mr-3" aria-label="Edit">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => remove(item)} className="text-muted hover:text-danger" aria-label="Delete">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && items.length === 0 && (
              <tr><td colSpan={columns.length + 1} className="px-5 py-10 text-center text-muted">{emptyLabel || 'No items yet.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
