import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../../lib/api'
import Badge from '../../components/site/Badge'
import CtaPanel from '../../components/site/CtaPanel'
import FaqAccordion from '../../components/site/FaqAccordion'
import { gradientFor } from '../../lib/placeholder'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setPost(null)
    setNotFound(false)
    api.get(`/public/posts/${slug}`).then((r) => setPost(r.data)).catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <div className="container-page section-y">Article not found.</div>
  if (!post) return <div className="container-page section-y text-muted">Loading...</div>

  return (
    <article className="section-y">
      <div className="container-page max-w-[720px] mx-auto">
        <Badge>{post.category}</Badge>
        <h1 className="fs-h1 mt-5 mb-6">{post.title}</h1>
        <div className="flex items-center gap-3 text-[13px] text-muted mb-10">
          <span>{post.authorName}</span>
          <span>·</span>
          <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</span>
          <span>·</span>
          <span>{post.readingTimeMin} min read</span>
        </div>

        <div className="rounded-xl aspect-[16/9] mb-12 overflow-hidden" style={{ background: post.coverImage ? undefined : gradientFor(post.title) }}>
          {post.coverImage && <img src={post.coverImage} alt={post.coverImageAlt || post.title} className="w-full h-full object-cover" />}
        </div>

        <div
          className="prose-content text-[18px] leading-[1.75] text-ink-2"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-line">
          {(post.tags || []).map((t) => <Badge key={t}>{t}</Badge>)}
        </div>
      </div>

      {post.faqs?.length > 0 && (
        <div className="container-page max-w-[720px] mx-auto mt-16">
          <h3 className="fs-h3 mb-6">Common questions</h3>
          <FaqAccordion items={post.faqs} />
        </div>
      )}

      {post.related?.length > 0 && (
        <div className="container-page max-w-[720px] mx-auto mt-16">
          <h3 className="fs-h3 mb-6">Related articles</h3>
          <div className="flex flex-col gap-4">
            {post.related.map((r) => (
              <Link key={r.id} to={`/blog/${r.slug}`} className="text-ink font-medium hover:text-accent">
                {r.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="container-page max-w-[720px] mx-auto mt-16">
        <CtaPanel title="Have a project in mind? Let's talk." phone="+91 8307802643" email="info@neighshopglobal.com" />
      </div>
    </article>
  )
}
