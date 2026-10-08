import { Link } from 'react-router-dom'

export default function Button({ to, href, onClick, variant = 'primary', size = 'md', children, className = '', type = 'button' }) {
  const base = `btn btn-${variant} ${size === 'sm' ? 'btn-sm' : ''} ${className}`

  if (to) return <Link to={to} className={base}>{children}</Link>
  if (href) return <a href={href} className={base}>{children}</a>
  return <button type={type} onClick={onClick} className={base}>{children}</button>
}
