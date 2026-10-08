import ResourceAdminPage from '../components/ResourceAdminPage'

const fields = [
  { key: 'question', label: 'Question', type: 'text', full: true },
  { key: 'answer', label: 'Answer', type: 'textarea', full: true },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'displayOrder', label: 'Display order', type: 'number' },
  { key: 'isGlobal', label: 'Show on /faq', type: 'checkbox' },
]

const columns = [
  { key: 'question', label: 'Question' },
  { key: 'category', label: 'Category' },
  { key: 'displayOrder', label: 'Order' },
]

export default function FaqsAdmin() {
  return (
    <ResourceAdminPage
      title="FAQs"
      endpoint="faqs"
      columns={columns}
      fields={fields}
      defaultValues={{ question: '', answer: '', category: 'general', isGlobal: true, displayOrder: 0 }}
      emptyLabel="No FAQs yet."
    />
  )
}
