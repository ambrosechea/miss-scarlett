import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import { usePageDataSeed } from '@/lib/pageData'
import type { JournalPost, JournalPostDetail } from '@/lib/types'
import SEO from '@/components/SEO'
import DetailPageStatus from '@/components/DetailPageStatus'
import { buildJournalPostSchema } from '@/lib/schema'
import { stripLigatures } from '@/lib/text'

export default function JournalPostPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const seed = usePageDataSeed<{ post: JournalPostDetail; relatedPosts: JournalPost[] }>(`/journal/${slug}`)
  const [post, setPost]                 = useState<JournalPostDetail | null>(() => seed?.post ?? null)
  const [loading, setLoading]           = useState(() => !seed)
  const [fetchError, setFetchError]     = useState<string | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<JournalPost[]>(() => seed?.relatedPosts ?? [])

  useEffect(() => {
    if (post) return // already server-rendered

    setLoading(true)
    setFetchError(null)
    setPost(null)

    apiGet<JournalPostDetail>(`/api/journal/${slug}`).then(({ data, error }) => {
      if (error) setFetchError(error)
      else setPost(data)
      setLoading(false)
    })
  }, [slug])

  // Fetch a few other posts to link to, mirroring ProductPage's "similar dresses" pattern
  useEffect(() => {
    if (!post || relatedPosts.length > 0) return
    apiGet<JournalPost[]>('/api/journal?limit=4').then(({ data }) => {
      if (data) setRelatedPosts(data.filter(p => p.slug !== slug).slice(0, 3))
    })
  }, [post, slug])

  if (loading) {
    return <DetailPageStatus loading containerClassName="product-wide-container" />
  }

  if (fetchError || !post) {
    return (
      <DetailPageStatus
        containerClassName="product-wide-container"
        error={fetchError}
        notFoundMessage="Journal post not found."
        backLinkTo="/journal"
        backLinkLabel="View All Journal Posts"
      />
    )
  }

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <>
      <SEO
        title={`${post.title} | Miss Scarlett Journal`}
        description={(post.excerpt ?? stripLigatures(post.content ?? '').replace(/\n/g, ' ')).slice(0, 155)}
        image={post.image_url ?? undefined}
        schema={buildJournalPostSchema(post)}
      />

      {/* Breadcrumb */}
      <div className="product-wide-container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav aria-label="Breadcrumb" className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> &gt; </span>
          <Link to="/journal">Journal</Link>
          <span aria-hidden="true"> &gt; </span>
          <span>{post.title}</span>
        </nav>
      </div>

      <section className="section-20">
        <div className="product-wide-container">
          {post.category && <p className="heading latest-collections">{post.category}</p>}
          <h1 className="heading-5">{post.title}</h1>
          {publishedDate && (
            <p style={{ fontSize: '0.85em', opacity: 0.6, marginBottom: '1.5rem' }}>{publishedDate}</p>
          )}

          {post.image_url && (
            <img
              src={post.image_url}
              alt={post.title}
              loading="eager"
              style={{ width: '100%', marginBottom: '2rem' }}
            />
          )}

          <div className="product-description">
            {stripLigatures(post.content ?? post.excerpt ?? '')
              .split('\n')
              .map((para, i) =>
                para.trim()
                  ? <p key={i} className="paragraph-7 product-discription">{para}</p>
                  : null
              )}
          </div>
        </div>
      </section>

      {/* Back to journal */}
      <div className="product-wide-container" style={{ paddingBottom: '2rem' }}>
        <Link to="/journal" className="product-back-link">
          ← Back to Journal
        </Link>
      </div>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="similar-dresses-section">
          <div className="product-wide-container">
            <div className="similar-dresses-header">
              <h2 className="similar-dresses-heading">More From the Journal</h2>
              <Link to="/journal" className="similar-dresses-view-all">
                View all →
              </Link>
            </div>
            <div className="similar-dresses-grid">
              {relatedPosts.map(p => (
                <Link key={p.slug} to={`/journal/${p.slug}`} className="product-card-link similar-dress-card">
                  {p.image_url && (
                    <div className="product-card-image-wrap">
                      <img src={p.image_url} alt={p.title} className="product-card-image" loading="lazy" />
                    </div>
                  )}
                  <div className="product-card-info">
                    <p className="product-card-name">{p.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
