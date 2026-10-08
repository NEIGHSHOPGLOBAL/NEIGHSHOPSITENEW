import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RequireAuth from './components/RequireAuth'
import AdminLayout from './components/AdminLayout'

import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import PostsAdmin from './pages/PostsAdmin'
import ServicesAdmin from './pages/ServicesAdmin'
import ProductsAdmin from './pages/ProductsAdmin'
import PortfolioAdmin from './pages/PortfolioAdmin'
import FaqsAdmin from './pages/FaqsAdmin'
import TeamAdmin from './pages/TeamAdmin'
import LocationsAdmin from './pages/LocationsAdmin'
import LeadsAdmin from './pages/LeadsAdmin'
import MediaAdmin from './pages/MediaAdmin'
import TrackingAdmin from './pages/TrackingAdmin'
import SettingsAdmin from './pages/SettingsAdmin'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth><AdminLayout /></RequireAuth>}>
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<PostsAdmin />} />
            <Route path="services" element={<ServicesAdmin />} />
            <Route path="products" element={<ProductsAdmin />} />
            <Route path="portfolio" element={<PortfolioAdmin />} />
            <Route path="faqs" element={<FaqsAdmin />} />
            <Route path="team" element={<TeamAdmin />} />
            <Route path="locations" element={<LocationsAdmin />} />
            <Route path="leads" element={<LeadsAdmin />} />
            <Route path="media" element={<MediaAdmin />} />
            <Route path="tracking" element={<TrackingAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
