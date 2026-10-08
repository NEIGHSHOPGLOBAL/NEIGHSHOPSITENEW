import { createContext, useContext, useEffect, useState } from 'react'
import api from '../lib/api'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    api.get('/public/settings').then((res) => setSettings(res.data)).catch(() => setSettings({}))
  }, [])

  return <SiteDataContext.Provider value={settings}>{children}</SiteDataContext.Provider>
}

export function useSiteData() {
  return useContext(SiteDataContext) || {}
}
