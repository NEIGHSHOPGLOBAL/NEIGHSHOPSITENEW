import { useEffect, useRef, useState } from 'react'
import { Trash2, Upload } from 'lucide-react'
import api from '../lib/api'

const FOLDERS = ['all', 'general', 'blog', 'services', 'products', 'portfolio', 'team']

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export default function MediaAdmin() {
  const [items, setItems] = useState([])
  const [folder, setFolder] = useState('all')
  const [editing, setEditing] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  function load(nextFolder = folder) {
    const query = nextFolder === 'all' ? '' : `?folder=${nextFolder}`
    api.get(`/admin/media${query}`).then((r) => setItems(r.data))
  }

  useEffect(() => { load(folder) }, [folder])

  async function upload(files) {
    setError('')
    setBusy(true)
    try {
      for (const file of files) {
        const body = new FormData()
        body.append('file', file)
        body.append('folder', folder === 'all' ? 'general' : folder)
        await api.post('/admin/media/upload', body)
      }
      load()
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function saveAlt() {
    await api.patch(`/admin/media/${editing.id}`, { alt: editing.alt, folder: editing.folder })
    setEditing(null)
    load()
  }

  async function remove(item) {
    const used = item.usageCount ? ` It is used in ${item.usageCount} place${item.usageCount === 1 ? '' : 's'}.` : ''
    if (!window.confirm(`Delete this image?${used}`)) return
    await api.delete(`/admin/media/${item.id}`)
    if (editing?.id === item.id) setEditing(null)
    load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h1 className="fs-h3">Media library</h1>
        <button className="btn btn-primary btn-sm" disabled={busy} onClick={() => inputRef.current?.click()}>
          <Upload size={15} /> {busy ? 'Uploading…' : 'Upload images'}
        </button>
      </div>
      <p className="text-[13.5px] text-muted mb-6 max-w-2xl">
        Upload images once, then attach them to blog posts, services, products, portfolio and team profiles. Alt text is reused when you pick an image.
      </p>
      {error && <p className="text-danger text-[13px] mb-4">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-6">
        {FOLDERS.map((name) => (
          <button
            key={name}
            onClick={() => setFolder(name)}
            className={`btn btn-sm ${folder === name ? 'btn-primary' : 'btn-secondary'}`}
          >
            {name}
          </button>
        ))}
      </div>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          upload([...e.target.files])
          e.target.value = ''
        }}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="card overflow-hidden">
            <button type="button" className="block w-full" onClick={() => setEditing({ ...item })}>
              <img src={item.url} alt={item.alt || item.originalName} className="w-full aspect-[4/3] object-cover bg-surface-2" />
            </button>
            <div className="p-3">
              <p className="text-[12.5px] text-ink truncate">{item.originalName || item.filename}</p>
              <p className="text-[11px] text-muted mt-1">
                {item.folder} · {formatSize(item.sizeBytes)}
                {item.usageCount ? ` · used ${item.usageCount}` : ''}
              </p>
              <div className="flex justify-between mt-3">
                <button className="text-[12px] text-ink" onClick={() => setEditing({ ...item })}>Edit alt</button>
                <button className="text-muted hover:text-danger" onClick={() => remove(item)} aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p className="text-muted text-[13.5px] mt-6">No images in this folder yet.</p>}

      {editing && (
        <div className="card p-6 mt-8">
          <h3 className="font-medium mb-4">Image details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label className="block">
              <span className="block text-[13px] font-medium text-ink-2 mb-2">Alt text</span>
              <input value={editing.alt || ''} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} />
            </label>
            <label className="block">
              <span className="block text-[13px] font-medium text-ink-2 mb-2">Folder</span>
              <select value={editing.folder} onChange={(e) => setEditing({ ...editing, folder: e.target.value })}>
                {FOLDERS.filter((f) => f !== 'all').map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="block text-[13px] font-medium text-ink-2 mb-2">URL</span>
              <input readOnly value={editing.url} />
            </label>
          </div>
          <div className="flex gap-3 mt-5">
            <button className="btn btn-primary" onClick={saveAlt}>Save</button>
            <button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  )
}
