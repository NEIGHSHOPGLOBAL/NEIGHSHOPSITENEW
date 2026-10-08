import { useEffect, useState } from 'react'
import api from '../../lib/api'
import Eyebrow from '../../components/site/Eyebrow'
import FaqAccordion from '../../components/site/FaqAccordion'

const CATEGORY_LABELS = {
  general: 'General',
  'working-with-us': 'Working With Us',
  products: 'Products',
  training: 'Training',
}
const CATEGORY_ORDER = ['general', 'working-with-us', 'products', 'training']

export default function Faq() {
  const [faqs, setFaqs] = useState([])

  useEffect(() => {
    api.get('/public/faqs').then((r) => setFaqs(r.data))
  }, [])

  const groups = CATEGORY_ORDER
    .map((cat) => ({ cat, items: faqs.filter((f) => f.category === cat) }))
    .filter((g) => g.items.length > 0)

  return (
    <div className="section-y">
      <div className="container-page max-w-2xl">
        <Eyebrow>FAQ</Eyebrow>
        <h1 className="fs-h1 mb-12">Frequently asked questions.</h1>

        <div className="flex flex-col gap-12">
          {groups.map(({ cat, items }) => (
            <div key={cat}>
              <h2 className="fs-h3 mb-4">{CATEGORY_LABELS[cat] || cat}</h2>
              <FaqAccordion items={items} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
