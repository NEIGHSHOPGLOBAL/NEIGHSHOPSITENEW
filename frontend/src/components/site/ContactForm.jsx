import { useState } from 'react'
import { Check } from 'lucide-react'
import api from '../../lib/api'
import Button from './Button'

const SERVICES = [
  'Custom Website Development', 'Mobile App Development', 'CRM & Custom Software',
  'Search Engine Optimization', 'Social Media Marketing', 'E-Commerce Development',
  'Graphic Design & Branding', 'Video Editing & UGC', 'Landing Page Design', 'Other',
]

export default function ContactForm({ sourcePage = '', defaultService = '', compact = false }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: defaultService, budget: '', message: '',
  })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      await api.post('/public/leads', { ...form, sourcePage })
      if (window.gtag && window.__nsAds) {
        window.gtag('event', 'conversion', { send_to: `${window.__nsAds.id}/${window.__nsAds.label}` })
      }
      if (window.fbq) window.fbq('track', 'Lead')
      if (window.ttq?.track) window.ttq.track('SubmitForm')
      if (window.dataLayer) window.dataLayer.push({ event: 'generate_lead' })
      setStatus('success')
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className="card p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-accent-soft text-accent flex items-center justify-center mx-auto mb-5">
          <Check size={26} />
        </div>
        <h3 className="fs-h3 mb-2">Thanks, {form.name.split(' ')[0]}!</h3>
        <p className="text-muted text-sm">
          We've received your message and will get back to you within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`card ${compact ? 'p-6' : 'p-8'} space-y-5`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Full name">
          <input required value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="Jane Doe" />
        </Field>
        <Field label="Email">
          <input required type="email" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="jane@company.com" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Phone">
          <input value={form.phone} onChange={(e) => update('phone', e.target.value)} placeholder="+91 00000 00000" />
        </Field>
        <Field label="Company">
          <input value={form.company} onChange={(e) => update('company', e.target.value)} placeholder="Company name" />
        </Field>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Field label="Service">
          <select value={form.service} onChange={(e) => update('service', e.target.value)}>
            <option value="">Select a service</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Budget">
          <select value={form.budget} onChange={(e) => update('budget', e.target.value)}>
            <option value="">Select a range</option>
            <option>Under ₹50,000</option>
            <option>₹50,000 – ₹2,00,000</option>
            <option>₹2,00,000 – ₹5,00,000</option>
            <option>₹5,00,000+</option>
          </select>
        </Field>
      </div>
      <Field label="Message">
        <textarea required rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} placeholder="Tell us about your project..." />
      </Field>

      {error && <p className="text-danger text-[12.5px]">{error}</p>}

      <Button type="submit" variant="primary" className="w-full !h-12" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Submit'}
      </Button>
    </form>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-[13px] font-medium text-ink-2 mb-2">{label}</span>
      {children}
    </label>
  )
}
