import { useState, useEffect } from 'react'
import { apiGet } from '@/lib/api'
import type { JournalPost } from '@/lib/types'
import SEO from '@/components/SEO'
import { journalSchema } from '@/lib/schema'

export default function JournalPage() {
  const [posts, setPosts] = useState<JournalPost[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<JournalPost[]>('/api/journal').then(({ data, error }) => {
      if (error) setFetchError(error)
      else setPosts(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <>
      <SEO
        title="Miss Scarlett Journal | Bridal Inspiration & Style News"
        description="Read the Miss Scarlett journal for bridal inspiration, styling tips, real bride stories, and the latest news and updates from the Miss Scarlett label."
        schema={journalSchema}
      />

      <section className="section-21">
        <div className="w-layout-blockcontainer container-28 w-container">
          <h1 className="heading-5">Our Journal</h1>
        </div>
      </section>

      <section className="section-22">
        <div className="w-layout-blockcontainer container-29 w-container">
          {loading && <p className="paragraph">Loading…</p>}
          {fetchError && <p className="paragraph">{fetchError}</p>}
          {!loading && !fetchError && posts.length === 0 && (
            <div className="w-dyn-empty"><div>No journal posts yet. Check back soon.</div></div>
          )}
          {!loading && !fetchError && posts.length > 0 && (
            <div className="w-layout-layout quick-stack-14 wf-layout-layout">
              {posts.map((post) => (
                <article key={post.id} className="w-layout-cell cell-30" style={{ marginBottom: '2rem' }}>
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} loading="lazy" style={{ width: '100%', marginBottom: '1rem' }} />
                  )}
                  {post.category && (
                    <p className="heading latest-collections" style={{ marginBottom: '0.25rem' }}>{post.category}</p>
                  )}
                  <h2 className="heading-5">{post.title}</h2>
                  {post.excerpt && <p className="paragraph">{post.excerpt}</p>}
                  {post.published_at && (
                    <p style={{ fontSize: '0.85em', opacity: 0.6 }}>
                      {new Date(post.published_at).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
