import { useRef, useState } from 'react'
import { ImagePlus, Library, X } from 'lucide-react'
import api from '../lib/api'

export default function ImageField({ value, onChange, onAlt, folder = 'general' }) {
  const inputRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [library, setLibrary] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function upload(file) {
    if (!file) return
    setError('')
    setBusy(true)
    try {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', folder)
      const res = await api.post('/admin/media/upload', body)
      onChange(res.data.url)
      if (res.data.alt && onAlt) onAlt(res.data.alt)
    } catch (err) {
      setError(err.response?.data?.error || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  async function openLibrary() {
    setOpen(true)
    const res = await api.get('/admin/media')
    setLibrary(res.data)
  }

  function choose(asset) {
    onChange(asset.url)
    if (asset.alt && onAlt) onAlt(asset.alt)
    setOpen(false)
  }

  return (
    <div>
      <div className="flex gap-4 items-start">
        <div className="w-28 h-20 rounded-lg border border-line bg-surface-2 overflow-hidden shrink-0 flex items-center justify-center">
          {value ? (
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImagePlus size={18} className="text-muted" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <input
            value={value || ''}
            placeholder="/uploads/… or https://…"
            onChange={(e) => onChange(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            <button type="button" className="btn btn-secondary btn-sm" disabled={busy} onClick={() => inputRef.current?.click()}>
              {busy ? 'Uploading…' : 'Upload'}
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={openLibrary}>
              <Library size={14} /> Library
            </button>
            {value && (
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => onChange('')}>
                <X size={14} /> Remove
              </button>
            )}
          </div>
          {error && <p className="text-danger text-[12.5px] mt-2">{error}</p>}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
        className="hidden"
        onChange={(e) => {
          upload(e.target.files?.[0])
          e.target.value = ''
        }}
      />

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div className="bg-surface rounded-xl w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 h-14 border-b border-line">
              <h3 className="font-medium">Media library</h3>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button>
            </div>
            <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3">
              {library.length === 0 && <p className="text-muted text-[13px] col-span-full">No images yet. Upload one first.</p>}
              {library.map((asset) => (
                <button type="button" key={asset.id} onClick={() => choose(asset)} className="text-left">
                  <img src={asset.url} alt={asset.alt || asset.originalName} className="w-full aspect-square object-cover rounded-lg border border-line" />
                  <span className="block text-[11px] text-muted mt-1 truncate">{asset.originalName || asset.filename}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
