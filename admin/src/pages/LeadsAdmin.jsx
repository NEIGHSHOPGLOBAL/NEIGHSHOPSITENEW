import { useEffect, useState } from 'react'
import api from '../lib/api'
import StatusChip from '../components/StatusChip'

const STATUSES = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'WON', 'LOST', 'SPAM']

export default function LeadsAdmin() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  function load() {
    setLoading(true)
    api.get('/admin/leads').then((r) => setLeads(r.data)).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  async function updateStatus(lead, status) {
    await api.patch(`/admin/leads/${lead.id}`, { status })
    load()
  }

  async function saveNotes() {
    await api.patch(`/admin/leads/${selected.id}`, { notes: selected.notes })
    load()
  }

  async function remove(lead) {
    if (!window.confirm(`Delete lead from ${lead.name}?`)) return
    await api.delete(`/admin/leads/${lead.id}`)
    setSelected(null)
    load()
  }

  return (
    <div>
      <h1 className="fs-h3 mb-8">Leads</h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 card overflow-hidden">
          <table className="w-full text-[13.5px]">
            <thead>
              <tr className="border-b border-line bg-surface-2">
                <th className="text-left px-5 h-11 font-medium text-muted">Name</th>
                <th className="text-left px-5 h-11 font-medium text-muted">Service</th>
                <th className="text-left px-5 h-11 font-medium text-muted">Status</th>
                <th className="text-left px-5 h-11 font-medium text-muted">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => setSelected(lead)}
                  className={`border-b border-line last:border-0 cursor-pointer hover:bg-surface-2/40 ${selected?.id === lead.id ? 'bg-surface-2/60' : ''}`}
                >
                  <td className="px-5 h-12 text-ink-2 font-medium">{lead.name}</td>
                  <td className="px-5 h-12 text-muted">{lead.service || '—'}</td>
                  <td className="px-5 h-12"><StatusChip value={lead.status} /></td>
                  <td className="px-5 h-12 text-muted">{new Date(lead.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {!loading && leads.length === 0 && (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-muted">No leads yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="md:col-span-5">
          {selected ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="fs-h3">{selected.name}</h3>
                <button onClick={() => remove(selected)} className="text-[12px] text-danger">Delete</button>
              </div>
              <div className="space-y-2 text-[13.5px] text-ink-2 mb-5">
                <p><span className="text-muted">Email:</span> {selected.email}</p>
                <p><span className="text-muted">Phone:</span> {selected.phone || '—'}</p>
                <p><span className="text-muted">Company:</span> {selected.company || '—'}</p>
                <p><span className="text-muted">Service:</span> {selected.service || '—'}</p>
                <p><span className="text-muted">Budget:</span> {selected.budget || '—'}</p>
                <p><span className="text-muted">Source:</span> {selected.sourcePage || '—'}</p>
              </div>
              <p className="text-[13.5px] text-ink-2 bg-surface-2 rounded-md p-4 mb-5 whitespace-pre-wrap">{selected.message}</p>

              <label className="block mb-4">
                <span className="block text-[13px] font-medium text-ink-2 mb-2">Status</span>
                <select value={selected.status} onChange={(e) => { updateStatus(selected, e.target.value); setSelected({ ...selected, status: e.target.value }) }}>
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </label>

              <label className="block mb-4">
                <span className="block text-[13px] font-medium text-ink-2 mb-2">Notes</span>
                <textarea rows={3} value={selected.notes || ''} onChange={(e) => setSelected({ ...selected, notes: e.target.value })} />
              </label>
              <button onClick={saveNotes} className="btn btn-primary btn-sm">Save notes</button>
            </div>
          ) : (
            <div className="card p-10 text-center text-muted text-[13.5px]">Select a lead to view details.</div>
          )}
        </div>
      </div>
    </div>
  )
}
