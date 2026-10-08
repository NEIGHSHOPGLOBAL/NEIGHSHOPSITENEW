import { useParams } from 'react-router-dom'
import Eyebrow from '../../components/site/Eyebrow'

const LAST_UPDATED = 'October 2026'

const CONTENT = {
  'privacy-policy': {
    title: 'Privacy Policy',
    body: `
<p><em>Last updated: ${LAST_UPDATED}</em></p>
<ol>
<li><strong>Who we are.</strong> Neighshop Global ("we", "us") is a software development and digital marketing company based in Delhi, India. Contact: info@neighshopglobal.com, +91 8307802643.</li>
<li><strong>Data we collect.</strong> Information you submit (name, email, phone, company, project details, budget), training enquiry details, and technical data (IP address, which we store in hashed form, browser and device type, pages visited, cookies and analytics identifiers).</li>
<li><strong>Why we use it.</strong> To respond to enquiries, prepare proposals, deliver services, send service-related communication, improve our website, and prevent spam and abuse.</li>
<li><strong>Consent.</strong> We process personal data based on your consent, given when you submit a form, and for legitimate uses permitted by law. You can withdraw consent at any time by emailing us.</li>
<li><strong>Cookies &amp; analytics.</strong> We use cookies and tools such as Google Analytics and, where enabled, advertising pixels. You can manage cookies through our consent banner and browser settings.</li>
<li><strong>Sharing.</strong> We don't sell personal data. We share it only with service providers who help us operate (hosting, email, analytics, CRM), under appropriate safeguards, or when required by law.</li>
<li><strong>Storage &amp; security.</strong> Data is stored on secure cloud infrastructure with encryption, access controls and backups.</li>
<li><strong>Retention.</strong> We keep enquiry data only as long as needed for the purpose it was collected, or as required by law.</li>
<li><strong>Your rights.</strong> Under India's Digital Personal Data Protection Act, 2023, you may request access to, correction of, or erasure of your personal data, and seek grievance redressal by emailing info@neighshopglobal.com.</li>
<li><strong>Children.</strong> Our services are not directed at children. Training enquiries from minors should be made by a parent or guardian.</li>
<li><strong>Changes.</strong> We may update this policy. The "Last updated" date above reflects the latest version.</li>
</ol>
`,
  },
  terms: {
    title: 'Terms of Service',
    body: `
<p><em>Last updated: ${LAST_UPDATED}</em></p>
<ol>
<li><strong>Acceptance.</strong> By using neighshopglobal.com you agree to these terms.</li>
<li><strong>Services.</strong> Project scope, deliverables, timelines, fees and support periods are defined in a separate proposal or agreement for each engagement. That agreement prevails over these terms.</li>
<li><strong>Quotes.</strong> Quotes are estimates based on the information provided and are valid for the period stated in them.</li>
<li><strong>Intellectual property.</strong> Source code ownership transfers as specified in the project agreement, generally on full payment, for eligible projects and products. Third-party libraries remain under their own licences.</li>
<li><strong>Client responsibilities.</strong> Clients provide accurate requirements, content, approvals and access in time. Delays in inputs may shift timelines.</li>
<li><strong>Third-party services.</strong> Hosting, payment gateways, app stores, APIs and advertising platforms are governed by their own terms and fees.</li>
<li><strong>Marketing services.</strong> SEO and advertising results depend on third-party platforms and cannot be guaranteed.</li>
<li><strong>Website content.</strong> Content on this site is for general information. Blog content is not legal, financial or regulatory advice.</li>
<li><strong>Limitation of liability.</strong> Our liability for any claim relating to our services is limited to the fees paid for the specific engagement giving rise to the claim, as set out in your project agreement.</li>
<li><strong>Governing law.</strong> These terms are governed by the laws of India, with jurisdiction in the courts of Delhi.</li>
<li><strong>Contact.</strong> info@neighshopglobal.com</li>
</ol>
`,
  },
  'refund-policy': {
    title: 'Refund & Cancellation Policy',
    body: `
<p><em>Last updated: ${LAST_UPDATED}</em></p>
<ul>
<li><strong>Projects.</strong> Payments are milestone-based. Work completed and approved up to a milestone is non-refundable. Cancellation terms are defined in each project agreement.</li>
<li><strong>Ready-made products.</strong> Refund eligibility for Rapido Clone, Urban Company Clone and CRM Software depends on whether source code or deployment has already been delivered.</li>
<li><strong>Training program.</strong> Refund and batch-transfer requests for the ₹5,499 Industry Internship Program are reviewed case by case — contact us before your batch start date.</li>
<li><strong>How to request.</strong> Email info@neighshopglobal.com with your invoice details and we'll respond within a few business days.</li>
</ul>
`,
  },
}

export default function StaticPage() {
  const { slug } = useParams()
  const page = CONTENT[slug] || { title: 'Page', body: '<p>Content coming soon.</p>' }

  return (
    <div className="section-y">
      <div className="container-page max-w-2xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="fs-h1 mb-8">{page.title}</h1>
        <div className="prose-content text-[15px] leading-relaxed text-ink-2" dangerouslySetInnerHTML={{ __html: page.body }} />
      </div>
    </div>
  )
}
