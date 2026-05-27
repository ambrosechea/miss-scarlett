import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { JournalPost } from '@/lib/types'
import ImageSlider from '@/components/ImageSlider'
import MarqueeText from '@/components/MarqueeText'
import SEO from '@/components/SEO'
import { orgSchema } from '@/lib/schema'

import group254     from '@/assets/images/group_254.webp'
import group254_500 from '@/assets/images/group_254-p-500.webp'
import group254_800 from '@/assets/images/group_254-p-800.webp'
import group254_1080 from '@/assets/images/group_254-p-1080.webp'
import maskGroup     from '@/assets/images/mask_group.webp'
import maskGroup500  from '@/assets/images/mask_group-p-500.webp'
import maskGroup800  from '@/assets/images/mask_group-p-800.webp'
import maskGroup1080 from '@/assets/images/mask_group-p-1080.webp'

// Portrait collection images for the "Finding THE ONE" slider
import img12342345  from '@/assets/images/12342345.webp'
import img12342345_500 from '@/assets/images/12342345-p-500.webp'
import img12342345_800 from '@/assets/images/12342345-p-800.webp'
import img213413254 from '@/assets/images/213413254.webp'
import img213413254_500 from '@/assets/images/213413254-p-500.webp'
import img213413254_800 from '@/assets/images/213413254-p-800.webp'
import img125325     from '@/assets/images/125325.webp'
import img125325_500 from '@/assets/images/125325-p-500.webp'
import img125325_800 from '@/assets/images/125325-p-800.webp'
import img125435     from '@/assets/images/125435.webp'
import img125435_500 from '@/assets/images/125435-p-500.webp'
import img125435_800 from '@/assets/images/125435-p-800.webp'
import img124234     from '@/assets/images/124234.webp'
import img124234_500 from '@/assets/images/124234-p-500.webp'
import img124234_800 from '@/assets/images/124234-p-800.webp'
import img12423443   from '@/assets/images/12423443.webp'
import img12423443_500 from '@/assets/images/12423443-p-500.webp'
import img12423443_800 from '@/assets/images/12423443-p-800.webp'
import img3453245    from '@/assets/images/3453245.webp'
import img3453245_500 from '@/assets/images/3453245-p-500.webp'
import img3453245_800 from '@/assets/images/3453245-p-800.webp'
import imgUUID       from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC.webp'
import imgUUID500    from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC-p-500.webp'
import imgUUID800    from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC-p-800.webp'

const collectionSlides = [
  {
    src: img12342345,
    srcSet: `${img12342345_500} 500w, ${img12342345_800} 800w, ${img12342345} 1200w`,
    alt: 'Miss Scarlett bridal gown collection',
  },
  {
    src: img213413254,
    srcSet: `${img213413254_500} 500w, ${img213413254_800} 800w, ${img213413254} 1200w`,
    alt: 'Miss Scarlett wedding dress',
  },
  {
    src: img125325,
    srcSet: `${img125325_500} 500w, ${img125325_800} 800w, ${img125325} 1200w`,
    alt: 'Miss Scarlett bridal gown',
  },
  {
    src: img125435,
    srcSet: `${img125435_500} 500w, ${img125435_800} 800w, ${img125435} 1200w`,
    alt: 'Miss Scarlett wedding gown',
  },
  {
    src: img124234,
    srcSet: `${img124234_500} 500w, ${img124234_800} 800w, ${img124234} 1200w`,
    alt: 'Miss Scarlett bridal collection',
  },
  {
    src: img12423443,
    srcSet: `${img12423443_500} 500w, ${img12423443_800} 800w, ${img12423443} 1200w`,
    alt: 'Miss Scarlett wedding dress design',
  },
  {
    src: img3453245,
    srcSet: `${img3453245_500} 500w, ${img3453245_800} 800w, ${img3453245} 1200w`,
    alt: 'Miss Scarlett bridal gown',
  },
  {
    src: imgUUID,
    srcSet: `${imgUUID500} 500w, ${imgUUID800} 800w, ${imgUUID} 1200w`,
    alt: 'Miss Scarlett luxury bridal design',
  },
]

const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    orgSchema,
    {
      '@type': 'WebPage',
      '@id': 'https://www.missscarlett.com.au/',
      url: 'https://www.missscarlett.com.au/',
      name: 'Miss Scarlett | Luxury Bridal Designer',
      description: 'Miss Scarlett reimagines modern bridal with refined design, graceful femininity, and exceptional craftsmanship.',
      isPartOf: { '@id': 'https://www.missscarlett.com.au/#website' },
    },
  ],
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<JournalPost[]>([])

  useEffect(() => {
    apiGet<JournalPost[]>('/api/journal?limit=3').then(({ data }) => {
      if (data) setLatestPosts(data)
    })
  }, [])

  return (
    <>
      <SEO
        title="Miss Scarlett | Luxury Bridal Designer"
        description="Discover Miss Scarlett — modern luxury bridal gowns crafted with refined design, graceful femininity, and exceptional craftsmanship. Find a stockist near you."
        schema={homeSchema}
      />

      {/* Hero */}
      <section className="section" aria-label="PALAIS collection hero">
        <div className="w-layout-blockcontainer container-3 w-container">
          <h1 className="heading-3">PALAIS</h1>
          <h6 className="heading">A NEW CHAPTER OF MODERN BRIDAL ELEGANCE</h6>
          <a
            href="https://www.missscarlett.com.au/category/palais"
            className="button-3 w-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            EXPLORE THE COLLECTION
          </a>
        </div>
      </section>

      {/* Discover Miss Scarlett */}
      <section className="section-2">
        <div className="w-layout-blockcontainer container-6 w-container">
          <h6 className="heading latest-collections">DISCOVER MISS SCARLETT</h6>
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <h2 className="heading-5">Modern luxury for every bride</h2>
              <p className="paragraph">
                Miss Scarlett reimagines modern bridal with a focus on refined design, graceful
                femininity, and exceptional craftsmanship.
                <br /><br />
                Gowns crafted with intention — created for every bride.
              </p>
              <Link to="/about" className="button-3 lovce-btn w-button">
                DISCOVER MORE
              </Link>
              <div className="div-block-4" />
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group254}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                srcSet={`${group254_500} 500w, ${group254_800} 800w, ${group254_1080} 1080w, ${group254} 1315w`}
                alt="Miss Scarlett bride in a modern luxury bridal gown"
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections slider */}
      <section className="section-3" aria-label="Collection gallery">
        <h6 className="heading-28">
          FINDING <em>THE ONE</em> BEGINS HERE
        </h6>
        <div className="w-layout-blockcontainer container-8 w-container">
          <div className="slider-container">
            <div className="slider-wrapper">
              <ImageSlider slides={collectionSlides} slidesPerView={3} spaceBetween={16} />
            </div>
          </div>
        </div>
        <div className="w-layout-blockcontainer container-9 w-container">
          <h2 className="heading-6">THE COLLECTIONS</h2>
          <p className="paragraph inspired ee">
            Discover the world of Miss Scarlett.
            <br />
            Explore the collections and discover the gown that feels truly yours.
          </p>
          <a
            href="https://www.missscarlett.com.au/category/all-collections"
            className="button-3 lovce-btn explore w-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            EXPLORE
          </a>
        </div>
      </section>

      {/* Marquee */}
      <section className="section-4" aria-hidden="true">
        <div className="w-embed">
          <style>{`
            @keyframes scroll {
              from { transform: translateX(0); }
              to   { transform: translateX(calc(-100% - 1rem)); }
            }
            .scroll   { animation: scroll 10s linear infinite; }
            .reverse  { animation-direction: reverse; }
          `}</style>
        </div>
        <MarqueeText lines={['Refined• simplicity • modern  •', 'elegance • minimalist luxury •']} />
      </section>

      {/* Art of Modern Bridal */}
      <section className="section-5">
        <div className="w-layout-blockcontainer container-10 w-container">
          <h2 className="heading-8">The Art of Modern Bridal</h2>
          <div className="div-block-6" />
          <p className="paragraph-2">
            Sculpted silhouettes. Understated detail. A modern expression of bridal beauty.
          </p>
        </div>
      </section>

      {/* Try On the One */}
      <section className="section-6">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-11">
              <h3 className="heading latest-collections" />
              <h2 className="heading-5">
                Try On <em>the One</em>
              </h2>
              <p className="paragraph">
                Miss Scarlett gowns are available in select boutiques across Australia and beyond.
                <br /><br />
                Find a stockist near you and begin your bridal journey today.
              </p>
              <Link to="/find-a-stockist" className="button-3 lovce-btn w-button">
                FIND A STOCKIST
              </Link>
            </div>
            <div className="w-layout-cell cell-12">
              <img
                src={maskGroup}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px"
                srcSet={`${maskGroup500} 500w, ${maskGroup800} 800w, ${maskGroup1080} 1080w, ${maskGroup} 1320w`}
                alt="Bride trying on a Miss Scarlett gown at a boutique"
                className="image-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="latest-news-section">
        <div className="w-layout-blockcontainer container-15 w-container">
          <div className="w-layout-layout quick-stack-5 wf-layout-layout">
            <div className="w-layout-cell">
              <h3 className="heading latest-collections">Our Journal</h3>
              <h2 className="heading-5">Latest news</h2>
              <Link to="/journal" className="button-3 lovce-btn w-button">
                See All
              </Link>
            </div>
            <div className="w-layout-cell cell-13">
              {latestPosts.length === 0 ? (
                <div className="w-dyn-empty"><div>No items found.</div></div>
              ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {latestPosts.map((post) => (
                    <li key={post.id} style={{ marginBottom: '1.5rem' }}>
                      {post.image_url && (
                        <img src={post.image_url} alt={post.title} loading="lazy" style={{ width: '100%', marginBottom: '0.5rem' }} />
                      )}
                      <h4 className="heading-5">{post.title}</h4>
                      {post.excerpt && <p className="paragraph">{post.excerpt}</p>}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="section-9">
        <div className="w-layout-blockcontainer w-container">
          <h2 className="heading-5 instagram-h2">
            <sup>Follow us on Instagram</sup>
          </h2>
          <h3 className="heading-10">missscarlett.thelabel</h3>
        </div>
      </section>
    </>
  )
}
