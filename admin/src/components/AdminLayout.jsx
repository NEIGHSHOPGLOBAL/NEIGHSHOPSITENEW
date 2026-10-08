import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileText, Briefcase, Package, Images, HelpCircle, Users,
  MapPin, Inbox, Settings, LogOut, Image, Tags,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const PUBLIC_SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173'

const GROUPS = [
  {
    label: 'Content',
    items: [
      { label: 'Dashboard', to: '/', icon: LayoutDashboard, end: true },
      { label: 'Blog Posts', to: '/posts', icon: FileText },
      { label: 'Services', to: '/services', icon: Briefcase },
      { label: 'Products', to: '/products', icon: Package },
      { label: 'Portfolio', to: '/portfolio', icon: Images },
      { label: 'Media', to: '/media', icon: Image },
      { label: 'FAQs', to: '/faqs', icon: HelpCircle },
    ],
  },
  {
    label: 'Business',
    items: [
      { label: 'Leads', to: '/leads', icon: Inbox },
      { label: 'Team', to: '/team', icon: Users },
      { label: 'Locations', to: '/locations', icon: MapPin },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Pixels & tags', to: '/tracking', icon: Tags },
      { label: 'Settings', to: '/settings', icon: Settings },
    ],
  },
]

export default function AdminLayout() {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="w-[248px] bg-surface border-r border-line flex flex-col shrink-0">
        <div className="h-14 flex items-center px-5 border-b border-line">
          <Link to="/" className="font-bold text-[15px] tracking-wide text-ink">Neighshop Global</Link>
          <span className="ml-2 text-[11px] bg-surface-2 text-muted px-2 py-0.5 rounded-pill">Admin</span>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {GROUPS.map((group) => (
            <div key={group.label} className="mb-6">
              <div className="px-5 text-[11px] uppercase tracking-wide text-muted-2 mb-2">{group.label}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-5 h-10 text-[13.5px] ${
                      isActive ? 'bg-surface-2 text-ink font-medium border-l-2 border-ink -ml-[2px] pl-[22px]' : 'text-ink-2 hover:bg-surface-2/60'
                    }`
                  }
                >
                  <item.icon size={16} />
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-line">
          <div className="text-[13px] font-medium text-ink mb-0.5">{admin?.name}</div>
          <div className="text-[12px] text-muted mb-3">{admin?.email}</div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-[13px] text-muted hover:text-danger">
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-surface border-b border-line flex items-center px-6 shrink-0">
          <a href={PUBLIC_SITE_URL} className="text-[13px] text-muted hover:text-ink">← View public site</a>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
