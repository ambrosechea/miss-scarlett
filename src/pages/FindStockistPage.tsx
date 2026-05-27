import { useState, useEffect } from 'react'
import { apiGet } from '@/lib/api'
import type { Stockist } from '@/lib/types'
import SEO from '@/components/SEO'
import group257 from '@/assets/images/group_257.webp'
import group257_500 from '@/assets/images/group_257-p-500.webp'
import group257_800 from '@/assets/images/group_257-p-800.webp'
import group257_1080 from '@/assets/images/group_257-p-1080.webp'

const REGIONS = [
  'AUSTRALIA & NEW ZEALAND',
  'AMERICAS',
  'REST OF THE WORLD',
]

export default function FindStockistPage() {
  const [stockists, setStockists] = useState<Stockist[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  useEffect(() => {
    apiGet<Stockist[]>('/api/stockists').then(({ data, error }) => {
      if (error) setFetchError(error)
      else setStockists(data ?? [])
      setLoading(false)
    })
  }, [])

  return (
    <>
      <SEO
        title="Find a Miss Scarlett Stockist | Bridal Boutiques Worldwide"
        description="Discover Miss Scarlett bridal boutiques across Australia, New Zealand, the Americas, and worldwide. Find a stockist near you and try on your dream gown."
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <h6 className="heading latest-collections">Discover miss scarlett</h6>
              <h1 className="heading-5">Find a stockist</h1>
              <p className="paragraph">
                Miss Scarlett gowns are available through a curated network of bridal boutiques
                worldwide. Each boutique offers a personalised experience where you can explore the
                collection and discover the gown that feels beautifully yours.
                <br /><br />
                Discover a boutique near you and begin your bridal journey.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group257}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                srcSet={`${group257_500} 500w, ${group257_800} 800w, ${group257_1080} 1080w, ${group257} 1138w`}
                alt="Miss Scarlett bridal gown — find a stockist near you"
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stockist lists by region */}
      <section className="section-18">
        {loading && (
          <div className="w-layout-blockcontainer container-25 w-container">
            <p className="paragraph">Loading stockists…</p>
          </div>
        )}
        {fetchError && (
          <div className="w-layout-blockcontainer container-25 w-container">
            <p className="paragraph">{fetchError}</p>
          </div>
        )}
        {!loading && !fetchError && REGIONS.map((region) => {
          const regionStockists = stockists.filter((s) => s.region === region)
          return (
            <div key={region} className="w-layout-blockcontainer container-25 w-container">
              <h2 className="heading-26">{region}</h2>
              {regionStockists.length === 0 ? (
                <div className="w-dyn-empty"><div>No stockists listed in this region yet.</div></div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {regionStockists.map((s) => (
                    <li key={s.id} style={{ marginBottom: '1.5rem' }}>
                      <strong>{s.name}</strong>
                      {s.city && <> — {s.city}, {s.country}</>}
                      {s.address && <div style={{ fontSize: '0.9em', opacity: 0.7 }}>{s.address}</div>}
                      {s.website && (
                        <div>
                          <a href={s.website} target="_blank" rel="noopener noreferrer" className="link">
                            Visit website
                          </a>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </section>
    </>
  )
}
