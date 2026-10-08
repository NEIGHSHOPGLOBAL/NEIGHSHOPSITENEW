import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { SiteDataProvider } from './context/SiteDataContext'
import Header from './components/site/Header'
import Footer from './components/site/Footer'
import TrackingScripts from './components/site/TrackingScripts'

import Home from './pages/site/Home'
import Services from './pages/site/Services'
import ServiceDetail from './pages/site/ServiceDetail'
import Products from './pages/site/Products'
import ProductDetail from './pages/site/ProductDetail'
import Portfolio from './pages/site/Portfolio'
import PortfolioDetail from './pages/site/PortfolioDetail'
import Blog from './pages/site/Blog'
import BlogPost from './pages/site/BlogPost'
import Training from './pages/site/Training'
import About from './pages/site/About'
import Locations from './pages/site/Locations'
import LocationDetail from './pages/site/LocationDetail'
import Faq from './pages/site/Faq'
import Contact from './pages/site/Contact'
import StaticPage from './pages/site/StaticPage'
import NotFound from './pages/site/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteDataProvider>
        <ScrollToTop />
        <TrackingScripts />
        <Routes>
          <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
          <Route path="/services" element={<SiteLayout><Services /></SiteLayout>} />
          <Route path="/services/:slug" element={<SiteLayout><ServiceDetail /></SiteLayout>} />
          <Route path="/products" element={<SiteLayout><Products /></SiteLayout>} />
          <Route path="/products/:slug" element={<SiteLayout><ProductDetail /></SiteLayout>} />
          <Route path="/portfolio" element={<SiteLayout><Portfolio /></SiteLayout>} />
          <Route path="/portfolio/:slug" element={<SiteLayout><PortfolioDetail /></SiteLayout>} />
          <Route path="/blog" element={<SiteLayout><Blog /></SiteLayout>} />
          <Route path="/blog/:slug" element={<SiteLayout><BlogPost /></SiteLayout>} />
          <Route path="/training" element={<SiteLayout><Training /></SiteLayout>} />
          <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
          <Route path="/locations" element={<SiteLayout><Locations /></SiteLayout>} />
          <Route path="/locations/:slug" element={<SiteLayout><LocationDetail /></SiteLayout>} />
          <Route path="/faq" element={<SiteLayout><Faq /></SiteLayout>} />
          <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
          <Route path="/privacy-policy" element={<SiteLayout><StaticPage /></SiteLayout>} />
          <Route path="/terms" element={<SiteLayout><StaticPage /></SiteLayout>} />
          <Route path="/refund-policy" element={<SiteLayout><StaticPage /></SiteLayout>} />
          <Route path="*" element={<SiteLayout><NotFound /></SiteLayout>} />
        </Routes>
      </SiteDataProvider>
    </BrowserRouter>
  )
}
