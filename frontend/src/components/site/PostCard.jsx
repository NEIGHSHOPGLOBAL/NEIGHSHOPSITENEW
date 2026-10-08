import { Link } from 'react-router-dom'
import { gradientFor } from '../../lib/placeholder'
import Badge from './Badge'

export default function PostCard({ post, large = false }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div
        className={`relative rounded-lg overflow-hidden mb-4 ${large ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}
        style={{ background: post.coverImage ? undefined : gradientFor(post.title) }}
      >
        {post.coverImage ? (
          <img
            src={post.coverImage}
            alt={post.coverImageAlt || post.title}
            className="w-full h-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <span className={`text-white/90 font-medium tracking-tightest text-center ${large ? 'text-3xl' : 'text-xl'}`}>
              {post.title}
            </span>
          </div>
        )}
      </div>
      <Badge>{post.category}</Badge>
      <h3 className={`mt-3 font-medium text-ink group-hover:text-accent transition-colors ${large ? 'text-2xl' : 'text-[20px]'}`}>
        {post.title}
      </h3>
      <p className="text-[13px] text-muted mt-2">
        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
        {' · '}{post.readingTimeMin} min read
      </p>
    </Link>
  )
}
