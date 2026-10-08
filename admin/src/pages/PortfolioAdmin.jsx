import ResourceAdminPage from '../components/ResourceAdminPage'
import { PortfolioBadge } from '../components/Badge'

function Thumb({ src }) {
  return src
    ? <img src={src} alt="" className="w-14 h-10 object-cover rounded-md bg-surface-2" />
    : <span className="text-muted">—</span>
}

const fields = [
  { type: 'section', label: 'Project' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea', full: true },
  { key: 'portfolioType', label: 'Portfolio type', type: 'select', options: ['REFERENCE_CONCEPT', 'INTERNAL_DEMO', 'CLIENT_PROJECT'] },
  { key: 'clientName', label: 'Client name', type: 'text' },
  { key: 'clientApproved', label: 'Client approved to display', type: 'checkbox' },
  { key: 'challenge', label: 'Challenge', type: 'textarea', full: true },
  { key: 'solution', label: 'Solution', type: 'textarea', full: true },
  { key: 'techUsed', label: 'Tech used', type: 'tags', full: true },
  { key: 'liveUrl', label: 'Live URL', type: 'text' },
  { key: 'isFeatured', label: 'Featured', type: 'checkbox' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
  { key: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'PUBLISHED'] },
  { type: 'section', label: 'Cover image' },
  { key: 'coverImage', label: 'Image', type: 'image', folder: 'portfolio', altKey: 'coverImageAlt', full: true },
  { key: 'coverImageAlt', label: 'Alt text', type: 'text', full: true },
  { type: 'section', label: 'SEO' },
  { key: 'metaTitle', label: 'Meta title', type: 'text', max: 60 },
  { key: 'metaDescription', label: 'Meta description', type: 'textarea', full: true, max: 160 },
]

const columns = [
  { key: 'coverImage', label: 'Image', render: (item) => <Thumb src={item.coverImage} /> },
  { key: 'name', label: 'Name' },
  { key: 'category', label: 'Category' },
  { key: 'portfolioType', label: 'Type', render: (item) => <PortfolioBadge type={item.portfolioType} /> },
  { key: 'status', label: 'Status', chip: true },
]

export default function PortfolioAdmin() {
  return (
    <div>
      <div className="card p-4 mb-6 text-[13px] text-muted bg-surface-2 border-0">
        Default new items to <strong>Reference / Concept</strong> until a human reviews them. Only mark{' '}
        <strong>Client project</strong> with approval if the client has explicitly agreed to be named.
      </div>
      <ResourceAdminPage
        title="Portfolio"
        endpoint="portfolio"
        columns={columns}
        fields={fields}
        defaultValues={{
          name: '', description: '', portfolioType: 'REFERENCE_CONCEPT', clientApproved: false,
          techUsed: [], isFeatured: false, status: 'DRAFT', displayOrder: 0,
          coverImage: '', coverImageAlt: '', metaTitle: '', metaDescription: '',
        }}
        emptyLabel="No portfolio items yet."
      />
    </div>
  )
}
