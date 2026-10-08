import ResourceAdminPage from '../components/ResourceAdminPage'
import StatusChip from '../components/StatusChip'

function Thumb({ src }) {
  return src
    ? <img src={src} alt="" className="w-14 h-10 object-cover rounded-md bg-surface-2" />
    : <span className="text-muted">—</span>
}

const fields = [
  { type: 'section', label: 'Article' },
  { key: 'title', label: 'Title', type: 'text', full: true },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea', full: true },
  { key: 'contentHtml', label: 'Content (HTML)', type: 'html', full: true },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'authorName', label: 'Author', type: 'text' },
  { key: 'tags', label: 'Tags', type: 'tags', full: true },
  { key: 'readingTimeMin', label: 'Reading time (min)', type: 'number' },
  { key: 'isFeatured', label: 'Featured', type: 'checkbox' },
  { key: 'status', label: 'Status', type: 'select', options: ['DRAFT', 'IN_REVIEW', 'PUBLISHED'] },
  { type: 'section', label: 'Cover image', hint: 'Shown on the blog card and at the top of the article.' },
  { key: 'coverImage', label: 'Image', type: 'image', folder: 'blog', altKey: 'coverImageAlt', full: true },
  { key: 'coverImageAlt', label: 'Alt text', type: 'text', full: true, placeholder: 'Describe the image for search and screen readers' },
  { type: 'section', label: 'SEO' },
  { key: 'metaTitle', label: 'Meta title', type: 'text', max: 60 },
  { key: 'metaDescription', label: 'Meta description', type: 'textarea', full: true, max: 160 },
]

const columns = [
  { key: 'coverImage', label: 'Image', render: (item) => <Thumb src={item.coverImage} /> },
  { key: 'title', label: 'Title' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', render: (item) => <StatusChip value={item.status} /> },
  { key: 'createdAt', label: 'Created', render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '' },
]

export default function PostsAdmin() {
  return (
    <ResourceAdminPage
      title="Blog Posts"
      endpoint="posts"
      columns={columns}
      fields={fields}
      defaultValues={{
        title: '', excerpt: '', contentHtml: '', coverImage: '', coverImageAlt: '',
        category: 'General', authorName: 'Neighshop Team',
        tags: [], readingTimeMin: 3, isFeatured: false, status: 'DRAFT',
        metaTitle: '', metaDescription: '',
      }}
      emptyLabel="No posts yet."
    />
  )
}
