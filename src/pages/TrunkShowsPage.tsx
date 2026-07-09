import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { TrunkShow } from '@/lib/types'
import SEO from '@/components/SEO'
import { trunkShowsSchema } from '@/lib/schema'
import group265      from '@/assets/images/group_265.webp'
import group265_500  from '@/assets/images/group_265-p-500.webp'
import group265_800  from '@/assets/images/group_265-p-800.webp'
import group265_1080 from '@/assets/images/group_265-p-1080.webp'

const COUNTRY_FILTERS = ['View All', 'AUSTRALIA', 'NZ', 'SINGAPORE', 'UK', 'USA', 'CANADA', 'MALAYSIA']

export default function TrunkShowsPage() {
  const [shows, setShows]         = useState<TrunkShow[]>([])
  const [loading, setLoading]     = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('View All')

  useEffect(() => {
    apiGet<TrunkShow[]>('/api/trunk-shows').then(({ data, error }) => {
      if (error) setFetchError(error)
      else setShows(data ?? [])
      setLoading(false)
    })
  }, [])

  const filtered = activeFilter === 'View All'
    ? shows
    : shows.filter(s => s.country_filter === activeFilter)

  return (
    <>
      <SEO
        title="Miss Scarlett Trunk Shows | Exclusive Bridal Events"
        description="Experience the Miss Scarlett collection at an exclusive trunk show near you. Limited-time events held at selected boutiques worldwide — appointments essential."
        schema={trunkShowsSchema}
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <p className="heading latest-collections">EXPERIENCE MISS SCARLETT</p>
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
                width={1315}
                height={1402}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                srcSet={`${group265_500} 500w, ${group265_800} 800w, ${group265_1080} 1080w, ${group265} 1315w`}
                alt="Miss Scarlett trunk show — experience the bridal collection in person"
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

          {/* Country filter tabs */}
          <div className="div-block-19">
            <div className="w-dyn-list">
              <div role="list" className="collection-list-4 w-dyn-items">
                {COUNTRY_FILTERS.map(f => (
                  <div key={f} role="listitem" className="w-dyn-item">
                    <label
                      className={`radio-button-field-2 w-radio${activeFilter === f ? ' w--redirected-checked' : ''}`}
                      style={{ cursor: 'pointer' }}
                    >
                      <input
                        type="radio"
                        name="trunk-filter"
                        className="w-form-formradioinput radio-button-2 w-radio-input"
                        checked={activeFilter === f}
                        onChange={() => setActiveFilter(f)}
                      />
                      <span className="w-form-label">{f}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {loading && <p className="paragraph">Loading…</p>}
          {fetchError && <p className="paragraph">{fetchError}</p>}

          {!loading && !fetchError && (
            <div className="w-dyn-list">
              {filtered.length === 0 ? (
                <div className="w-dyn-empty"><div>No trunk shows for this region yet.</div></div>
              ) : (
                <div role="list" className="w-dyn-items">
                  {filtered.map(show => (
                    <div key={show.id} role="listitem" className="w-dyn-item">
                      <div className="div-block-20">
                        <div className="w-layout-layout quick-stack-13 wf-layout-layout">
                          {/* Name + subtitle */}
                          <div className="w-layout-cell cell-41">
                            <h5 className="heading-20">{show.name}</h5>
                            {show.subtitle && (
                              <p className="paragraph-11">{show.subtitle}</p>
                            )}
                          </div>
                          {/* Date (empty — ongoing shows) */}
                          <div className="w-layout-cell cell-28">
                            <p className="paragraph-12" />
                          </div>
                          {/* CTA */}
                          <div className="w-layout-cell cell-29">
                            <Link to="/book-appointment" className="button-3 lovce-btn w-button">
                              Book Appointment
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related News */}
        <div className="w-layout-blockcontainer container-15 w-container" style={{ marginTop: '4rem' }}>
          <div className="w-layout-layout quick-stack-5 wf-layout-layout">
            <div className="w-layout-cell">
              <p className="heading latest-collections">Our Journal</p>
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
