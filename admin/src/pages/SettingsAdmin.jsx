import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

const HIDDEN = new Set(['tracking'])

export default function SettingsAdmin() {
  const [settings, setSettings] = useState({})
  const [drafts, setDrafts] = useState({})
  const [savingKey, setSavingKey] = useState(null)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    api.get('/admin/settings').then((r) => {
      setSettings(r.data)
      const d = {}
      Object.entries(r.data).forEach(([k, v]) => { d[k] = JSON.stringify(v, null, 2) })
      setDrafts(d)
    })
  }, [])

  async function save(key) {
    setErrors((e) => ({ ...e, [key]: null }))
    let parsed
    try {
      parsed = JSON.parse(drafts[key])
    } catch {
      setErrors((e) => ({ ...e, [key]: 'Invalid JSON' }))
      return
    }
    setSavingKey(key)
    try {
      await api.put(`/admin/settings/${key}`, parsed)
    } finally {
      setSavingKey(null)
    }
  }

  return (
    <div>
      <h1 className="fs-h3 mb-3">Settings</h1>
      <p className="text-[13.5px] text-muted mb-8">
        Edit each setting as JSON. This powers the company info, stats, technology, industries, process and training content shown across the public site.
        Pixels and Google Tag Manager live on the <Link to="/tracking" className="underline">Pixels & tags</Link> page.
      </p>

      <div className="space-y-6">
        {Object.keys(settings).filter((key) => !HIDDEN.has(key)).map((key) => (
          <div key={key} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-ink capitalize">{key}</h3>
              <button onClick={() => save(key)} disabled={savingKey === key} className="btn btn-primary btn-sm">
                {savingKey === key ? 'Saving...' : 'Save'}
              </button>
            </div>
            <textarea
              rows={10}
              className="font-mono text-[13px]"
              value={drafts[key] || ''}
              onChange={(e) => setDrafts((d) => ({ ...d, [key]: e.target.value }))}
            />
            {errors[key] && <p className="text-danger text-[12.5px] mt-2">{errors[key]}</p>}
          </div>
        ))}
      </div>
    </div>
  )
}
