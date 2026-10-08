import { useEffect, useState } from 'react'
import api from '../lib/api'
import { EMPTY_TRACKING, TRACKING_GROUPS, trackingError } from '../lib/tracking'

export default function TrackingAdmin() {
  const [form, setForm] = useState(EMPTY_TRACKING)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/admin/settings').then((r) => {
      setForm({ ...EMPTY_TRACKING, ...(r.data.tracking || {}) })
    })
  }, [])

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    setMessage('')
    setError('')
  }

  async function save() {
    for (const group of TRACKING_GROUPS) {
      for (const field of group.fields) {
        if (trackingError(field.key, form[field.key], field.pattern)) {
          setError(`Check the format of ${field.label}.`)
          return
        }
      }
    }
    setSaving(true)
    setError('')
    try {
      const res = await api.put('/admin/settings/tracking', form)
      setForm({ ...EMPTY_TRACKING, ...res.data.tracking })
      setMessage('Saved. Reload the public site to load the new tags.')
    } catch (err) {
      setError(err.response?.data?.error || 'Could not save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl">
      <h1 className="fs-h3 mb-3">Pixels & tags</h1>
      <p className="text-[13.5px] text-muted mb-8">
        These IDs are injected on every public page. Google Tag Manager is the place to run extra tags. Direct pixels below are for accounts that are not already inside that container.
      </p>

      <label className="card p-5 mb-6 flex items-center justify-between gap-4">
        <span>
          <span className="block font-medium text-ink">Tracking enabled</span>
          <span className="block text-[13px] text-muted mt-1">Turn this off to stop every pixel and custom snippet at once.</span>
        </span>
        <input type="checkbox" className="w-5 h-5" style={{ height: 'auto', width: 20 }} checked={!!form.enabled} onChange={(e) => set('enabled', e.target.checked)} />
      </label>

      {TRACKING_GROUPS.map((group) => (
        <section key={group.title} className="card p-6 mb-6">
          <h2 className="font-medium text-ink mb-1">{group.title}</h2>
          {group.hint && <p className="text-[12.5px] text-muted mb-5">{group.hint}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {group.fields.map((field) => {
              const problem = trackingError(field.key, form[field.key], field.pattern)
              return (
                <label key={field.key} className="block">
                  <span className="block text-[13px] font-medium text-ink-2 mb-2">{field.label}</span>
                  <input
                    value={form[field.key] || ''}
                    placeholder={field.placeholder}
                    onChange={(e) => set(field.key, e.target.value.trim())}
                  />
                  {field.help && !problem && <span className="block text-[12px] text-muted mt-1">{field.help}</span>}
                  {problem && <span className="block text-[12px] text-danger mt-1">{problem}</span>}
                </label>
              )
            })}
          </div>
        </section>
      ))}

      <section className="card p-6 mb-6">
        <h2 className="font-medium text-ink mb-1">Custom snippets</h2>
        <p className="text-[12.5px] text-muted mb-5">
          For tools that do not have a field above. This HTML runs on the public site, so only paste code you trust.
        </p>
        <label className="block mb-5">
          <span className="block text-[13px] font-medium text-ink-2 mb-2">Head</span>
          <textarea rows={6} className="font-mono text-[13px]" value={form.customHeadHtml} onChange={(e) => set('customHeadHtml', e.target.value)} placeholder="<!-- optional extra head tags -->" />
        </label>
        <label className="block">
          <span className="block text-[13px] font-medium text-ink-2 mb-2">Body</span>
          <textarea rows={6} className="font-mono text-[13px]" value={form.customBodyHtml} onChange={(e) => set('customBodyHtml', e.target.value)} placeholder="<!-- optional extra body tags -->" />
        </label>
      </section>

      <div className="flex items-center gap-4">
        <button className="btn btn-primary" disabled={saving} onClick={save}>{saving ? 'Saving…' : 'Save tracking'}</button>
        {message && <span className="text-[13px] text-ink-2">{message}</span>}
        {error && <span className="text-[13px] text-danger">{error}</span>}
      </div>
    </div>
  )
}
