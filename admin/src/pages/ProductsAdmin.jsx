import ResourceAdminPage from '../components/ResourceAdminPage'

function Thumb({ src }) {
  return src
    ? <img src={src} alt="" className="w-14 h-10 object-cover rounded-md bg-surface-2" />
    : <span className="text-muted">—</span>
}

const fields = [
  { type: 'section', label: 'Product' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'longContentHtml', label: 'Long content (HTML)', type: 'html', full: true },
  { key: 'features', label: 'Features', type: 'tags', full: true },
  { key: 'priceLabel', label: 'Price label', type: 'text' },
  { key: 'demoUrl', label: 'Demo URL', type: 'text' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
  { type: 'section', label: 'Cover image' },
  { key: 'coverImage', label: 'Image', type: 'image', folder: 'products', altKey: 'coverImageAlt', full: true },
  { key: 'coverImageAlt', label: 'Alt text', type: 'text', full: true },
  { type: 'section', label: 'SEO' },
  { key: 'metaTitle', label: 'Meta title', type: 'text', max: 60 },
  { key: 'metaDescription', label: 'Meta description', type: 'textarea', full: true, max: 160 },
]

const columns = [
  { key: 'coverImage', label: 'Image', render: (item) => <Thumb src={item.coverImage} /> },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', chip: true },
]

export default function ProductsAdmin() {
  return (
    <ResourceAdminPage
      title="Products"
      endpoint="products"
      columns={columns}
      fields={fields}
      defaultValues={{
        name: '', description: '', longContentHtml: '', features: [], status: 'DRAFT', displayOrder: 0,
        coverImage: '', coverImageAlt: '', metaTitle: '', metaDescription: '',
      }}
      emptyLabel="No products yet."
    />
  )
}
