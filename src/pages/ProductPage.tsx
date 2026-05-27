import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { ProductDetail } from '@/lib/types'
import SEO from '@/components/SEO'

function formatPrice(price: string): string {
  if (!price || price === '0.00' || price === '0') return 'Price on request'
  const num = parseFloat(price)
  if (isNaN(num)) return 'Price on request'
  return `$${num.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

/** Maps DB category name → collection slug */
function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-').replace('è', 'e')
}

export default function ProductPage() {
  const { handle = '' } = useParams<{ handle: string }>()
  const [product, setProduct]     = useState<ProductDetail | null>(null)
  const [loading, setLoading]     = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [activeImg, setActiveImg] = useState(0)

  useEffect(() => {
    setLoading(true)
    setFetchError(null)
    setProduct(null)
    setActiveImg(0)

    apiGet<ProductDetail>(`/api/products/${handle}`).then(({ data, error }) => {
      if (error) setFetchError(error)
      else setProduct(data)
      setLoading(false)
    })
  }, [handle])

  if (loading) {
    return (
      <section className="section-20">
        <div className="w-layout-blockcontainer container-13 w-container">
          <p className="paragraph">Loading…</p>
        </div>
      </section>
    )
  }

  if (fetchError || !product) {
    return (
      <section className="section-20">
        <div className="w-layout-blockcontainer container-13 w-container">
          <p className="paragraph">{fetchError ?? 'Gown not found.'}</p>
          <Link to="/category/all-collections" className="button-3 lovce-btn w-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
            View All Gowns
          </Link>
        </div>
      </section>
    )
  }

  const images  = product.images.length > 0 ? product.images : [product.main_image]
  const primary = product.categories.find(c => c !== 'ALL COLLECTIONS') ?? 'ALL COLLECTIONS'
  const collectionSlug = categoryToSlug(primary)

  return (
    <>
      <SEO
        title={`${product.name} | Miss Scarlett Bridal`}
        description={product.description.slice(0, 155).replace(/\n/g, ' ')}
        image={product.main_image}
      />

      {/* Breadcrumb */}
      <div className="w-layout-blockcontainer container-6 w-container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav aria-label="Breadcrumb" className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <Link to={`/category/${collectionSlug}`}>{primary}</Link>
          <span aria-hidden="true"> / </span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* Product detail */}
      <section className="section-20 product-detail-section">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="product-detail-grid">

            {/* ── Left: Image gallery ── */}
            <div className="product-gallery">
              <div className="product-main-image-wrap">
                <img
                  src={images[activeImg]}
                  alt={`${product.name} — Miss Scarlett bridal gown, image ${activeImg + 1}`}
                  className="product-main-image"
                />
              </div>
              {images.length > 1 && (
                <div className="product-thumbs" role="list">
                  {images.map((url, i) => (
                    <button
                      key={i}
                      role="listitem"
                      className={`product-thumb-btn${i === activeImg ? ' active' : ''}`}
                      onClick={() => setActiveImg(i)}
                      aria-label={`View image ${i + 1} of ${product.name}`}
                    >
                      <img
                        src={url}
                        alt={`${product.name} thumbnail ${i + 1}`}
                        className="product-thumb-img"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Right: Details ── */}
            <div className="product-info">
              <Link to={`/category/${collectionSlug}`} className="product-collection-label">
                {primary}
              </Link>
              <h1 className="heading-5 product-name">{product.name}</h1>
              <p className="product-price">{formatPrice(product.price)}</p>

              <div className="product-description">
                {product.description.split('\n').map((para, i) => (
                  para.trim() ? <p key={i} className="paragraph">{para}</p> : null
                ))}
              </div>

              <div className="product-actions">
                <Link to="/book-appointment" className="button-3 lovce-btn w-button">
                  Book Appointment
                </Link>
                <Link to="/find-a-stockist" className="product-stockist-link">
                  Find a stockist near you →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to collection */}
      <div className="w-layout-blockcontainer container-6 w-container" style={{ paddingBottom: '3rem' }}>
        <Link to={`/category/${collectionSlug}`} className="button-3 lovce-btn w-button" style={{ background: 'transparent', color: 'inherit', border: '1px solid currentColor' }}>
          ← Back to {primary}
        </Link>
      </div>
    </>
  )
}
