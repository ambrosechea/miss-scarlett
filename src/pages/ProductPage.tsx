import { useState, useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import { usePageDataSeed } from '@/lib/pageData'
import { trackProductView, trackEnquireClick, trackFindStockistClick } from '@/lib/analytics'
import type { Product, ProductDetail } from '@/lib/types'
import SEO from '@/components/SEO'
import { buildProductSchema } from '@/lib/schema'

/** Maps DB category name → collection slug */
function categoryToSlug(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-').replace('è', 'e')
}

export default function ProductPage() {
  const { handle = '' } = useParams<{ handle: string }>()
  const seed = usePageDataSeed<{ product: ProductDetail; similarProducts: Product[] }>(`/product/${handle}`)
  const [product, setProduct]         = useState<ProductDetail | null>(() => seed?.product ?? null)
  const [loading, setLoading]         = useState(() => !seed)
  const [fetchError, setFetchError]   = useState<string | null>(null)
  const [activeImg, setActiveImg]     = useState(0)
  const [similarProducts, setSimilarProducts] = useState<Product[]>(() => seed?.similarProducts ?? [])
  const seededHandle = useRef(seed ? handle : null)

  useEffect(() => {
    if (seededHandle.current === handle) {
      seededHandle.current = null // only skip the fetch once, right after the seeded mount
      return
    }

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

  // Fetch similar dresses from the same collection whenever the product changes
  useEffect(() => {
    if (!product || similarProducts.length > 0) return
    const primary = product.categories.find(c => c !== 'ALL COLLECTIONS') ?? ''
    if (!primary) return
    const slug = categoryToSlug(primary)
    apiGet<Product[]>(`/api/products?collection=${slug}`).then(({ data }) => {
      if (data) {
        const others = data.filter(p => p.handle !== handle)
        // Shuffle so different items appear on each visit, then take 4
        const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 4)
        setSimilarProducts(shuffled)
      }
    })
  }, [product, handle])

  useEffect(() => {
    if (!product) return
    trackProductView({
      handle: product.handle,
      name: product.name,
      price: product.price,
      categories: product.categories,
    })
  }, [product])

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

  const images         = product.images.length > 0 ? product.images : [product.main_image]
  const primary        = product.categories.find(c => c !== 'ALL COLLECTIONS') ?? 'ALL COLLECTIONS'
  const collectionSlug = categoryToSlug(primary)

  return (
    <>
      <SEO
        title={`${product.name} | Miss Scarlett Luxury Bridal Wedding Gown`}
        description={product.description.slice(0, 155).replace(/\n/g, ' ')}
        image={product.main_image}
        schema={buildProductSchema({
          handle:      product.handle,
          name:        product.name,
          description: product.description,
          main_image:  product.main_image,
          categories:  product.categories,
          price:       product.price,
        })}
      />

      {/* Breadcrumb */}
      <div className="product-wide-container" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <nav aria-label="Breadcrumb" className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span aria-hidden="true"> &gt; </span>
          <Link to="/category/all-collections">All Collections</Link>
          <span aria-hidden="true"> &gt; </span>
          <Link to={`/category/${collectionSlug}`}>{primary}</Link>
          <span aria-hidden="true"> &gt; </span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* Product detail: thumbnails | main image | info */}
      <section className="section-20 product-detail-section">
        <div className="product-wide-container">
          <div className="product-detail-grid">

            {/* ── Col 1: Thumbnail strip ── */}
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
                      alt={`${product.name} — view ${i + 1}`}
                      className="product-thumb-img"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* ── Col 2: Main image ── */}
            <div className="product-main-image-wrap">
              <img
                src={images[activeImg]}
                alt={`${product.name} — Miss Scarlett bridal gown`}
                className="product-main-image"
              />
            </div>

            {/* ── Col 3: Info panel ── */}
            <div className="product-info">
              <Link to={`/category/${collectionSlug}`} className="product-collection-label">
                {primary}
              </Link>
              <h1 className="heading-5 product-name">{product.name}</h1>

              <div className="product-description">
                {product.description
                  .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
                  .split('\n')
                  .map((para, i) =>
                    para.trim()
                      ? <p key={i} className="paragraph-7 product-discription">{para}</p>
                      : null
                  )}
              </div>

              <div className="product-actions">
                <Link
                  to="/book-appointment"
                  onClick={() => trackEnquireClick({ handle: product.handle, name: product.name })}
                  className="button-3 lovce-btn nearest-stockist enquire-now-btn w-button"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                  ENQUIRE NOW
                </Link>
                <Link
                  to="/find-a-stockist"
                  onClick={() => trackFindStockistClick({ handle: product.handle, name: product.name })}
                  className="button-3 lovce-btn nearest-stockist w-button"
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                  FIND THE NEAREST STOCKIST
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Back to collection */}
      <div className="product-wide-container" style={{ paddingBottom: '2rem' }}>
        <Link to={`/category/${collectionSlug}`} className="product-back-link">
          ← Back to {primary}
        </Link>
      </div>

      {/* Similar Dresses */}
      {similarProducts.length > 0 && (
        <section className="similar-dresses-section">
          <div className="product-wide-container">
            <div className="similar-dresses-header">
              <h2 className="similar-dresses-heading">You May Also Like</h2>
              <Link to={`/category/${collectionSlug}`} className="similar-dresses-view-all">
                View all {primary} →
              </Link>
            </div>
            <div className="similar-dresses-grid">
              {similarProducts.map(p => (
                <Link key={p.handle} to={`/product/${p.handle}`} className="product-card-link similar-dress-card">
                  <div className="product-card-image-wrap">
                    <img
                      src={p.main_image}
                      alt={`${p.name} — Miss Scarlett bridal gown`}
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
    </>
  )
}
