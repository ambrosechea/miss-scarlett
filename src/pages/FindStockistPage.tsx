import { Link } from 'react-router-dom'
import { useSeededFetch } from '@/lib/pageData'
import type { Stockist } from '@/lib/types'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import { stockistPageSchema } from '@/lib/schema'
import group257      from '@/assets/images/group_257.webp'
import group257_500  from '@/assets/images/group_257-p-500.webp'
import group257_800  from '@/assets/images/group_257-p-800.webp'
import group257_1080 from '@/assets/images/group_257-p-1080.webp'

const REGIONS = [
  'AUSTRALIA & NEW ZEALAND',
  'AMERICAS',
  'REST OF THE WORLD',
]

/** Format location string matching live site: "City, STATE, Country" */
function location(s: Stockist): string {
  const parts = [s.city, s.state, s.country].filter(Boolean)
  return parts.join(', ')
}

export default function FindStockistPage() {
  const { items: stockists, loading, error: fetchError } =
    useSeededFetch<Stockist>('/find-a-stockist', '/api/stockists', 'stockists')

  return (
    <>
      <SEO
        title="Find a Miss Scarlett Stockist | Bridal Boutiques Worldwide"
        description="Discover Miss Scarlett bridal boutiques across Australia, New Zealand, the Americas, and worldwide. Find a stockist near you and try on your dream gown."
        schema={stockistPageSchema}
      />

      <PageHero
        eyebrow="Discover miss scarlett"
        title="Find a stockist"
        image={group257}
        imageWidth={1138}
        imageHeight={832}
        imageSizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
        imageSrcSet={`${group257_500} 500w, ${group257_800} 800w, ${group257_1080} 1080w, ${group257} 1138w`}
        imageAlt="Miss Scarlett bridal gown — find a stockist near you"
      >
        Miss Scarlett gowns are available through a curated network of bridal boutiques
        worldwide. Each boutique offers a personalised experience where you can explore the
        collection and discover the gown that feels beautifully yours.
        <br /><br />
        Discover a boutique near you and begin your bridal journey.
      </PageHero>

      {/* Stockist lists */}
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
          const items = stockists.filter(s => s.region === region)
          return (
            <div key={region} className="w-layout-blockcontainer container-25 w-container">
              <h2 className="heading-26">{region}</h2>
              {items.length === 0 ? (
                <div className="w-dyn-list">
                  <div className="w-dyn-empty"><div>No stockists listed in this region yet.</div></div>
                </div>
              ) : (
                <div className="w-dyn-list">
                  <div role="list" className="w-dyn-items w-row">
                    {items.map(s => (
                      <div key={s.id} role="listitem" className="collection-item-3 w-dyn-item w-col w-col-4">
                        <div className="div-block-17">
                          <Link to={`/stockists/${s.slug}`} className="link-block-5 w-inline-block">
                            <h2 className="heading-18">{s.name}</h2>
                          </Link>
                          <p className="paragraph-8">{location(s)}</p>
                          {s.website && (
                            <a
                              href={s.website}
                              className="link-block-3 w-inline-block"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <p className="paragraph-9">VISIT WEBSITE</p>
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </section>
    </>
  )
}
