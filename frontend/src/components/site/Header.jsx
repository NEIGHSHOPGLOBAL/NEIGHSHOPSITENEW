import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Button from './Button'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Training', href: '/training' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 bg-surface/95 border-b border-line transition-shadow ${
        scrolled ? 'backdrop-blur-md shadow-xs' : ''
      }`}
      style={{ height: 64 }}
    >
      <div className="container-page h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-[18px] tracking-wide text-ink">
          <img src="/logo.png" alt="Neighshop Global" className="h-7 w-auto" />
          Neighshop Global
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                `text-[13px] text-ink-2 hover:text-ink transition-colors relative py-1 ${
                  isActive ? 'underline underline-offset-[6px]' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button to="/contact" variant="primary" size="sm">Contact Us</Button>
          <Button href={ADMIN_URL} variant="secondary" size="sm">Admin</Button>
        </div>

        <button className="lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={24} />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 bg-surface z-50 flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <span className="font-bold text-[18px] tracking-wide">Neighshop Global</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu">
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-6">
            {NAV.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setOpen(false)}
                className="text-[28px] font-medium text-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3">
            <Button to="/contact" variant="primary" onClick={() => setOpen(false)}>Contact Us</Button>
            <Button href={ADMIN_URL} variant="secondary" onClick={() => setOpen(false)}>Admin / Sign In</Button>
          </div>
        </div>
      )}
    </header>
  )
}
