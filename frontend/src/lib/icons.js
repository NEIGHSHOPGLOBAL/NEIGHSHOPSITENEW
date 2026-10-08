import {
  Globe, Smartphone, LayoutGrid, Search, Share2, ShoppingCart, Palette, Video,
  LayoutTemplate, HeartPulse, Landmark, GraduationCap, Truck, Building2, Store, Code2,
} from 'lucide-react'

export const ICONS = {
  globe: Globe,
  smartphone: Smartphone,
  'layout-grid': LayoutGrid,
  search: Search,
  'share-2': Share2,
  'shopping-cart': ShoppingCart,
  palette: Palette,
  video: Video,
  'layout-template': LayoutTemplate,
}

export const INDUSTRY_ICONS = {
  'Healthcare & MedTech': HeartPulse,
  'Fintech & Payments': Landmark,
  'EdTech & E-Learning': GraduationCap,
  'Logistics & Supply Chain': Truck,
  'Real Estate & PropTech': Building2,
  'E-Commerce & Retail': Store,
}

export function getServiceIcon(key) {
  return ICONS[key] || Code2
}

export function getIndustryIcon(name) {
  return INDUSTRY_ICONS[name] || Code2
}
