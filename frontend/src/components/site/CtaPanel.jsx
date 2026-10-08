import Button from './Button'

export default function CtaPanel({ title, phone, email, buttonLabel = 'Start a Project', showWhatsApp = false }) {
  const waNumber = (phone || '').replace(/[^\d]/g, '')

  return (
    <div className="rounded-xl bg-charcoal text-white px-8 md:px-16 py-16 md:py-24 text-center">
      <h2 className="fs-h2 text-white max-w-3xl mx-auto mb-8">{title}</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <Button to="/contact" variant="on-dark" size="lg" className="!h-[52px] !px-7 text-[15px]">
          {buttonLabel}
        </Button>
        {showWhatsApp && waNumber && (
          <a
            href={`https://wa.me/${waNumber}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-secondary !h-[52px] !px-7 text-[15px] !border-white/30 !text-white hover:!bg-white/10"
          >
            WhatsApp Us
          </a>
        )}
        <div className="flex items-center gap-4 text-white/80 text-sm">
          <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
          <span>·</span>
          <a href={`mailto:${email}`} className="hover:text-white">{email}</a>
        </div>
      </div>
    </div>
  )
}
