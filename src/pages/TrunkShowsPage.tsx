import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { TrunkShow } from '@/lib/types'
import group265 from '@/assets/images/group_265.webp'
import group265_500 from '@/assets/images/group_265-p-500.webp'
import group265_800 from '@/assets/images/group_265-p-800.webp'
import group265_1080 from '@/assets/images/group_265-p-1080.webp'

function formatDateRange(start: string, end: string): string {
  const s = new Date(start)
  const e = new Date(end)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  if (s.getMonth() === e.getMonth() && s.getFullYear() === e.getFullYear()) {
    return `${s.getDate()}–${e.toLocaleDateString('en-AU', opts)}`
  }
  return `${s.toLocaleDateString('en-AU', opts)} – ${e.toLocaleDateString('en-AU', opts)}`
}

export default function TrunkShowsPage() {
  const [shows, setShows] = useState<TrunkShow[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<TrunkShow[]>('/api/trunk-shows').then(({ data, error }) => {
      if (error) setFetchError(error)
      else setShows(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <h6 className="heading latest-collections">EXPERIENCE MISS SCARLETT</h6>
              <h1 className="heading-5">TRUNK SHOWS</h1>
              <p className="paragraph">
                Discover our latest designs at an exclusive Miss Scarlett trunk show — where brides
                can experience the collection up close in an intimate boutique setting.
                <br /><br />
                Trunk shows run for a limited time at selected boutiques. Appointments are essential.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group265}
                loading="lazy"
                sizes="100vw"
                srcSet={`${group265_500} 500w, ${group265_800} 800w, ${group265_1080} 1080w, ${group265} 1315w`}
                alt=""
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events listing */}
      <section className="section-20">
        <div className="w-layout-blockcontainer container-13 w-container">
          <h2 className="heading-5 happy-brides-h2">TRUNK SHOW EVENTS</h2>
        </div>
        <div className="w-layout-blockcontainer container-27 w-container">
          {loading && <p className="paragraph">Loading…</p>}
          {fetchError && <p className="paragraph">{fetchError}</p>}
          {!loading && !fetchError && shows.length === 0 && (
            <div className="w-dyn-empty"><div>No upcoming trunk shows scheduled. Check back soon.</div></div>
          )}
          {!loading && !fetchError && shows.length > 0 && (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {shows.map((show) => (
                <li key={show.id} style={{ marginBottom: '2rem', borderBottom: '1px solid currentColor', paddingBottom: '1.5rem' }}>
                  <h3 className="heading-5" style={{ marginBottom: '0.25rem' }}>{show.title}</h3>
                  <p className="paragraph" style={{ margin: 0 }}>
                    <strong>{show.boutique_name}</strong> — {show.location}
                  </p>
                  <p className="paragraph" style={{ margin: '0.25rem 0' }}>
                    {formatDateRange(show.start_date, show.end_date)}
                  </p>
                  {show.description && <p className="paragraph">{show.description}</p>}
                  <Link to="/book-appointment" className="button-3 lovce-btn w-button" style={{ marginTop: '0.75rem' }}>
                    BOOK APPOINTMENT
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Related News */}
      <section className="latest-news-section">
        <div className="w-layout-blockcontainer container-15 w-container">
          <div className="w-layout-layout quick-stack-5 wf-layout-layout">
            <div className="w-layout-cell">
              <h6 className="heading latest-collections">Our Journal</h6>
              <h2 className="heading-5">Related News</h2>
              <Link to="/journal" className="button-3 lovce-btn w-button">
                See All
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
