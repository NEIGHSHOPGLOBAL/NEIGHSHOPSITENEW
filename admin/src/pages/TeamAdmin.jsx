import ResourceAdminPage from '../components/ResourceAdminPage'

const fields = [
  { type: 'section', label: 'Profile' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea', full: true },
  { key: 'expertise', label: 'Expertise', type: 'tags', full: true },
  { key: 'linkedin', label: 'LinkedIn URL', type: 'text' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
  { key: 'isVisible', label: 'Visible on site', type: 'checkbox' },
  { type: 'section', label: 'Photo' },
  { key: 'photo', label: 'Image', type: 'image', folder: 'team', full: true },
]

const columns = [
  {
    key: 'photo',
    label: 'Photo',
    render: (item) => item.photo
      ? <img src={item.photo} alt="" className="w-10 h-10 object-cover rounded-full bg-surface-2" />
      : <span className="text-muted">—</span>,
  },
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'displayOrder', label: 'Order' },
]

export default function TeamAdmin() {
  return (
    <ResourceAdminPage
      title="Team"
      endpoint="team"
      columns={columns}
      fields={fields}
      defaultValues={{ name: '', role: '', expertise: [], isVisible: true, displayOrder: 0, photo: '' }}
      emptyLabel="No team members yet."
    />
  )
}
