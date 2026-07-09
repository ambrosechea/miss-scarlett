import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import { usePageDataSeed } from '@/lib/pageData'
import type { Stockist, Product } from '@/lib/types'
import SEO from '@/components/SEO'
import { buildStockistSchema } from '@/lib/schema'

function location(s: Stockist): string {
  return [s.city, s.state, s.country].filter(Boolean).join(', ')
}

/** Local-SEO copy: a short, natural paragraph naming the city/region for on-page relevance */
function localIntro(s: Stockist): string {
  const place = [s.city, s.state].filter(Boolean).join(', ')
  return `Based in ${place}, ${s.name} is an authorised Miss Scarlett stockist, offering brides in ${s.city} and the surrounding ${s.country} area the chance to try on the full gown collection in person. Book a fitting to discover the Miss Scarlett dress made for your day.`
}

export default function StockistDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const seed = usePageDataSeed<{ stockist: Stockist; dresses: Product[] }>(`/stockists/${slug}`)
  const [stockist, setStockist]     = useState<Stockist | null>(() => seed?.stockist ?? null)
  const [loading, setLoading]       = useState(() => !seed)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [dresses, setDresses]       = useState<Product[]>(() => seed?.dresses ?? [])

  useEffect(() => {
    if (stockist) return // already server-rendered

    setLoading(true)
    setFetchError(null)
    setStockist(null)

    apiGet<Stockist>(`/api/stockists/${slug}`).then(({ data, error }) => {
      if (error) setFetchError(error)
      else setStockist(data)
      setLoading(false)
    })
  }, [slug])

  // Showcase a handful of gowns brides can expect to find in-store
  useEffect(() => {
    if (!stockist || dresses.length > 0) return // already server-rendered
    apiGet<Product[]>('/api/products').then(({ data }) => {
      if (data) {
        const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, 8)
        setDresses(shuffled)
      }
    })
  }, [stockist])

  if (loading) {
    return (
      <section className="section-20">
        <div className="product-wide-container">
          <p className="paragraph">Loading…</p>
        </div>
      </section>
    )
  }

  if (fetchError || !stockist) {
    return (
      <section className="section-20">
        <div className="product-wide-container">
          <p className="paragraph">{fetchError ?? 'Stockist not found.'}</p>
          <Link to="/find-a-stockist" className="button-3 lovce-btn w-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
            View All Stockists
          </Link>
        </div>
      </section>
    )
  }

  const mapQuery = encodeURIComponent(`${stockist.name}, ${location(stockist)}`)
  const mapSrc   = `https://maps.google.com/maps?q=${mapQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`

  return (
    <>
      <SEO
        title={`${stockist.name} — Miss Scarlett Stockist in ${stockist.city} | Miss Scarlett Bridal`}
        description={`Visit ${stockist.name} in ${location(stockist)} to try on the Miss Scarlett bridal collection in person. Address, contact details, and directions.`}
        schema={buildStockistSchema(stockist)}
      />

      {/* Breadcrumb */}
      <div className="product-wide-container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav aria-label="Breadcrumb" className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> &gt; </span>
          <Link to="/find-a-stockist">Find a Stockist</Link>
          <span aria-hidden="true"> &gt; </span>
          <span>{stockist.name}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="section-20 stockist-detail-hero">
        <div className="product-wide-container">
          <p className="heading latest-collections">Miss Scarlett Stockist</p>
          <h1 className="heading-5 stockist-detail-name">{stockist.name}</h1>
          <p className="paragraph stockist-detail-location">{location(stockist)}</p>

          <div className="stockist-detail-grid">
            {/* Contact / info panel */}
            <div className="stockist-info-panel">
              <h2 className="stockist-info-heading">Visit {stockist.name}</h2>
              <p className="paragraph-7 stockist-info-copy">{localIntro(stockist)}</p>

              <ul className="stockist-contact-list">
                {stockist.address && (
                  <li><span className="stockist-contact-label">Address</span>{stockist.address}, {location(stockist)}</li>
                )}
                {!stockist.address && (
                  <li><span className="stockist-contact-label">Location</span>{location(stockist)}</li>
                )}
                {stockist.phone && (
                  <li><span className="stockist-contact-label">Phone</span><a href={`tel:${stockist.phone}`}>{stockist.phone}</a></li>
                )}
                {stockist.email && (
                  <li><span className="stockist-contact-label">Email</span><a href={`mailto:${stockist.email}`}>{stockist.email}</a></li>
                )}
              </ul>

              <div className="stockist-detail-actions">
                {stockist.website && (
                  <a
                    href={stockist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-3 lovce-btn w-button"
                    style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                  >
                    VISIT WEBSITE
                  </a>
                )}
                <Link
                  to="/book-appointment"
                  className="button-3 lovce-btn nearest-stockist w-button"
                  style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none' }}
                >
                  BOOK AN APPOINTMENT
                </Link>
              </div>
            </div>

            {/* Map */}
            <div className="stockist-map-wrap">
              <iframe
                title={`Map showing ${stockist.name} in ${location(stockist)}`}
                src={mapSrc}
                className="stockist-map-iframe"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dress showcase */}
      {dresses.length > 0 && (
        <section className="similar-dresses-section">
          <div className="product-wide-container">
            <div className="similar-dresses-header">
              <h2 className="similar-dresses-heading">Gowns to Discover In-Store</h2>
              <Link to="/category/all-collections" className="similar-dresses-view-all">
                View all collections →
              </Link>
            </div>
            <div className="similar-dresses-grid">
              {dresses.map(p => (
                <Link key={p.handle} to={`/product/${p.handle}`} className="product-card-link similar-dress-card">
                  <div className="product-card-image-wrap">
                    <img
                      src={p.main_image}
                      alt={`${p.name} — Miss Scarlett bridal gown, available at ${stockist.name}`}
                      className="product-card-image"
                      loading="lazy"
                    />
                  </div>
                  <div className="product-card-info">
                    <p className="product-card-name">{p.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back to all stockists */}
      <div className="product-wide-container" style={{ paddingBottom: '3rem' }}>
        <Link to="/find-a-stockist" className="product-back-link">
          ← Back to all stockists
        </Link>
      </div>
    </>
  )
}
