import ResourceAdminPage from '../components/ResourceAdminPage'

const fields = [
  { key: 'city', label: 'City', type: 'text' },
  { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Maintenance', 'Coming Soon'] },
  { key: 'address', label: 'Address', type: 'text', full: true },
  { key: 'phone', label: 'Phone', type: 'text' },
  { key: 'contentHtml', label: 'Local SEO content (HTML)', type: 'html', full: true },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
]

const columns = [
  { key: 'city', label: 'City' },
  { key: 'status', label: 'Status', chip: true },
  { key: 'phone', label: 'Phone' },
]

export default function LocationsAdmin() {
  return (
    <ResourceAdminPage
      title="Locations"
      endpoint="locations"
      columns={columns}
      fields={fields}
      defaultValues={{ city: '', status: 'Coming Soon', address: '', phone: '', displayOrder: 0 }}
      emptyLabel="No locations yet."
    />
  )
}
