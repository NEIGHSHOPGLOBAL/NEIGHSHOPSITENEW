import ResourceAdminPage from '../components/ResourceAdminPage'

function Thumb({ src }) {
  return src
    ? <img src={src} alt="" className="w-14 h-10 object-cover rounded-md bg-surface-2" />
    : <span className="text-muted">—</span>
}

const fields = [
  { type: 'section', label: 'Service' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'iconKey', label: 'Icon key', type: 'text', placeholder: 'globe, smartphone, search...' },
  { key: 'shortDesc', label: 'Short description', type: 'textarea', full: true },
  { key: 'longContentHtml', label: 'Long content (HTML)', type: 'html', full: true },
  { key: 'features', label: 'Features', type: 'tags', full: true },
  { key: 'techTags', label: 'Tech tags', type: 'tags', full: true },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
  { type: 'section', label: 'Hero image', hint: 'Shown on the services grid and the service page.' },
  { key: 'heroImage', label: 'Image', type: 'image', folder: 'services', altKey: 'heroImageAlt', full: true },
  { key: 'heroImageAlt', label: 'Alt text', type: 'text', full: true, placeholder: 'Describe the service image' },
  { type: 'section', label: 'SEO' },
  { key: 'metaTitle', label: 'Meta title', type: 'text', max: 60 },
  { key: 'metaDescription', label: 'Meta description', type: 'textarea', full: true, max: 160 },
]

const columns = [
  { key: 'heroImage', label: 'Image', render: (item) => <Thumb src={item.heroImage} /> },
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'displayOrder', label: 'Order' },
  { key: 'status', label: 'Status', chip: true },
]

export default function ServicesAdmin() {
  return (
    <ResourceAdminPage
      title="Services"
      endpoint="services"
      columns={columns}
      fields={fields}
      defaultValues={{
        name: '', shortDesc: '', features: [], techTags: [], status: 'DRAFT', displayOrder: 0,
        heroImage: '', heroImageAlt: '', metaTitle: '', metaDescription: '',
      }}
      emptyLabel="No services yet."
    />
  )
}
