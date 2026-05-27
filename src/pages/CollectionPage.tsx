import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { Product } from '@/lib/types'
import SEO from '@/components/SEO'

const COLLECTION_META: Record<string, { title: string; heading: string; description: string }> = {
  'palais': {
    title:       'Palais Collection | Miss Scarlett Bridal',
    heading:     'PALAIS',
    description: 'Discover the Palais collection — couture-inspired bridal gowns for the bride who desires architectural elegance and modern romance.',
  },
  'lumiere': {
    title:       'Lumière Collection | Miss Scarlett Bridal',
    heading:     'LUMIÈRE',
    description: 'The Lumière collection — flowing, radiant bridal gowns that celebrate light, softness, and timeless feminine beauty.',
  },
  'anniversary': {
    title:       'Anniversary Collection | Miss Scarlett Bridal',
    heading:     'ANNIVERSARY',
    description: 'The Anniversary collection — Miss Scarlett\'s most beloved designs, timeless gowns that have captured brides\' hearts since our beginning.',
  },
  'siren': {
    title:       'Siren Collection | Miss Scarlett Bridal',
    heading:     'SIREN',
    description: 'The Siren collection — sultry, figure-hugging bridal gowns designed for the bold, confident bride.',
  },
  'modern-muse': {
    title:       'Modern Muse Collection | Miss Scarlett Bridal',
    heading:     'MODERN MUSE',
    description: 'The Modern Muse collection — contemporary bridal gowns with clean lines, minimalist beauty, and effortless sophistication.',
  },
  'iconic': {
    title:       'Iconic Collection | Miss Scarlett Bridal',
    heading:     'ICONIC',
    description: 'The Iconic collection — signature Miss Scarlett designs that have defined our legacy of exquisite bridal fashion.',
  },
  'all-collections': {
    title:       'All Wedding Dresses | Miss Scarlett Bridal',
    heading:     'ALL WEDDING DRESSES',
    description: 'Explore the complete Miss Scarlett bridal collection — discover your dream gown across every style, from romantic lace to sleek modern silhouettes.',
  },
}

function formatPrice(price: string): string {
  if (!price || price === '0.00' || price === '0') return 'Price on request'
  const num = parseFloat(price)
  if (isNaN(num)) return 'Price on request'
  return `$${num.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export default function CollectionPage() {
  const { slug = 'all-collections' } = useParams<{ slug: string }>()
  const [products, setProducts]   = useState<Product[]>([])
  const [loading, setLoading]     = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)

  const meta = COLLECTION_META[slug] ?? {
    title:       'Collection | Miss Scarlett Bridal',
    heading:     slug.toUpperCase().replace(/-/g, ' '),
    description: 'Explore the Miss Scarlett bridal collection.',
  }

  useEffect(() => {
    setLoading(true)
    setFetchError(null)
    setProducts([])

    const qs = slug === 'all-collections' ? '' : `?collection=${slug}`
    apiGet<Product[]>(`/api/products${qs}`).then(({ data, error }) => {
      if (error) setFetchError(error)
      else setProducts(data ?? [])
      setLoading(false)
    })
  }, [slug])

  return (
    <>
      <SEO title={meta.title} description={meta.description} />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="collection-hero">
            <h6 className="heading latest-collections">THE COLLECTION</h6>
            <h1 className="heading-5">{meta.heading}</h1>
            <p className="paragraph">{meta.description}</p>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="section-20">
        <div className="w-layout-blockcontainer container-13 w-container">
          {/* Collection tabs */}
          <nav className="collection-tabs" aria-label="Collections">
            {[
              { slug: 'palais',          label: 'PALAIS' },
              { slug: 'lumiere',         label: 'LUMIÈRE' },
              { slug: 'anniversary',     label: 'ANNIVERSARY' },
              { slug: 'siren',           label: 'SIREN' },
              { slug: 'modern-muse',     label: 'MODERN MUSE' },
              { slug: 'iconic',          label: 'ICONIC' },
              { slug: 'all-collections', label: 'ALL' },
            ].map(tab => (
              <Link
                key={tab.slug}
                to={`/category/${tab.slug}`}
                className={`collection-tab${slug === tab.slug ? ' active' : ''}`}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="w-layout-blockcontainer container-27 w-container">
          {loading && <p className="paragraph">Loading…</p>}
          {fetchError && <p className="paragraph">{fetchError}</p>}

          {!loading && !fetchError && (
            <div className="w-dyn-list">
              {products.length === 0 ? (
                <div className="w-dyn-empty"><div>No gowns in this collection yet.</div></div>
              ) : (
                <div role="list" className="product-grid w-dyn-items">
                  {products.map(product => (
                    <div key={product.id} role="listitem" className="product-card w-dyn-item">
                      <Link to={`/product/${product.handle}`} className="product-card-link">
                        <div className="product-card-image-wrap">
                          <img
                            src={product.main_image}
                            alt={`${product.name} — Miss Scarlett bridal gown`}
                            className="product-card-image"
                            loading="lazy"
                          />
                        </div>
                        <div className="product-card-info">
                          <h3 className="product-card-name">{product.name}</h3>
                          <p className="product-card-price">{formatPrice(product.price)}</p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
