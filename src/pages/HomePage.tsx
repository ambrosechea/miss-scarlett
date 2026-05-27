import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '@/lib/api'
import type { JournalPost } from '@/lib/types'
import ImageSlider from '@/components/ImageSlider'
import MarqueeText from '@/components/MarqueeText'

import group254 from '@/assets/images/group_254.webp'
import group254_500 from '@/assets/images/group_254-p-500.webp'
import group254_800 from '@/assets/images/group_254-p-800.webp'
import group254_1080 from '@/assets/images/group_254-p-1080.webp'
import maskGroup from '@/assets/images/mask_group.webp'
import maskGroup500 from '@/assets/images/mask_group-p-500.webp'
import maskGroup800 from '@/assets/images/mask_group-p-800.webp'
import maskGroup1080 from '@/assets/images/mask_group-p-1080.webp'
import soleil from '@/assets/images/SOLEIL__MS92-1XZ___9___2___1_.webp'
import anna from '@/assets/images/anna_1.webp'
import latestCollection from '@/assets/images/latestcollection_1.webp'
import journalImg1 from '@/assets/images/our-journal-img_1.webp'
import journalImg2 from '@/assets/images/our-journal-img1_1.webp'

const heroSlides = [
  {
    src: soleil,
    srcSet: `${soleil} 1017w`,
    sizes: '(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px',
    alt: '',
  },
  { src: anna,             alt: '' },
  { src: latestCollection, alt: '' },
  { src: journalImg1,      alt: '' },
  { src: journalImg2,      alt: '' },
]

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<JournalPost[]>([])

  useEffect(() => {
    apiGet<JournalPost[]>('/api/journal?limit=3').then(({ data }) => {
      if (data) setLatestPosts(data)
    })
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="section">
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
                Gowns crafted with intention - created for every bride.
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
                alt=""
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Collections slider */}
      <section className="section-3">
        <h6 className="heading-28">
          FINDING <em>THE ONE</em> BEGINS HERE
        </h6>
        <div className="w-layout-blockcontainer container-8 w-container">
          <div className="slider-container">
            <div className="slider-wrapper">
              <ImageSlider slides={heroSlides} imgClassName="image-24" />
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
      <section className="section-4">
        <div className="w-embed">
          <style>{`
            @keyframes scroll {
              from { transform: translateX(0); }
              to { transform: translateX(calc(-100% - 1rem)); }
            }
            .scroll { animation: scroll 10s linear infinite; }
            .reverse { animation-direction: reverse; }
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
                alt=""
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
        <div className="w-layout-blockcontainer container-16 ree w-container">
          <div className="marquee insta-feed-galry">
            <div className="marquee-content scroll">
              <div className="w-dyn-empty">
                <div>Connect Instagram feed.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
