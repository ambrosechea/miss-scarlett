import { Link } from 'react-router-dom'
import { useSeededFetch } from '@/lib/pageData'
import type { JournalPost } from '@/lib/types'
import MarqueeText from '@/components/MarqueeText'
import ImageSlider from '@/components/ImageSlider'
import SEO from '@/components/SEO'
import { homeSchema } from '@/lib/schema'

import heroFull     from '@/assets/images/SAGE-MS89-1Z-12-2-1.webp'
import hero500      from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-500.webp'
import hero800      from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-800.webp'
import hero1080     from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-1080.webp'
import hero1600     from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-1600.webp'
import hero2000     from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-2000.webp'
import hero2600     from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-2600.webp'
import hero3200     from '@/assets/images/SAGE-MS89-1Z-12-2-1-p-3200.webp'

import group254     from '@/assets/images/group_254.webp'
import group254_500 from '@/assets/images/group_254-p-500.webp'
import group254_800 from '@/assets/images/group_254-p-800.webp'
import group254_1080 from '@/assets/images/group_254-p-1080.webp'
import maskGroup     from '@/assets/images/mask_group.webp'
import maskGroup500  from '@/assets/images/mask_group-p-500.webp'
import maskGroup800  from '@/assets/images/mask_group-p-800.webp'
import maskGroup1080 from '@/assets/images/mask_group-p-1080.webp'

// "Finding THE ONE Begins Here" slider — images sourced from the live site
import sliderSoleil     from '@/assets/images/soleil.webp'
import sliderSoleil500  from '@/assets/images/soleil-p-500.webp'
import sliderSoleil800  from '@/assets/images/soleil-p-800.webp'
import sliderAnna       from '@/assets/images/anna.webp'
import sliderAnna500    from '@/assets/images/anna-p-500.webp'
import sliderAnna800    from '@/assets/images/anna-p-800.webp'
import sliderLatest     from '@/assets/images/latestcollection.webp'
import sliderLatest500  from '@/assets/images/latestcollection-p-500.webp'
import sliderLatest800  from '@/assets/images/latestcollection-p-800.webp'
import sliderJournal    from '@/assets/images/ourjournal.webp'
import sliderJournal500 from '@/assets/images/ourjournal-p-500.webp'
import sliderJournal800 from '@/assets/images/ourjournal-p-800.webp'
import sliderJournal1080 from '@/assets/images/ourjournal-p-1080.webp'
import sliderJournal1   from '@/assets/images/ourjournal1.webp'
import sliderJournal1500 from '@/assets/images/ourjournal1-p-500.webp'
import sliderJournal1800 from '@/assets/images/ourjournal1-p-800.webp'

const collectionSlides = [
  {
    src: sliderSoleil,
    srcSet: `${sliderSoleil500} 500w, ${sliderSoleil800} 800w, ${sliderSoleil} 1017w`,
    alt: 'Miss Scarlett Soleil bridal gown — modern fitted silhouette',
    width: 1017, height: 1386,
  },
  {
    src: sliderAnna,
    srcSet: `${sliderAnna500} 500w, ${sliderAnna800} 800w, ${sliderAnna} 1017w`,
    alt: 'Miss Scarlett bride in a luxury bridal gown',
    width: 1017, height: 1386,
  },
  {
    src: sliderLatest,
    srcSet: `${sliderLatest500} 500w, ${sliderLatest800} 800w, ${sliderLatest} 1017w`,
    alt: 'Miss Scarlett latest bridal collection',
    width: 1017, height: 1386,
  },
  {
    src: sliderJournal,
    srcSet: `${sliderJournal500} 500w, ${sliderJournal800} 800w, ${sliderJournal1080} 1080w, ${sliderJournal} 1178w`,
    alt: 'Miss Scarlett bridal gown — graceful femininity',
    width: 1178, height: 1564,
  },
  {
    src: sliderJournal1,
    srcSet: `${sliderJournal1500} 500w, ${sliderJournal1800} 800w, ${sliderJournal1} 950w`,
    alt: 'Miss Scarlett wedding dress design',
    width: 950, height: 1564,
  },
]

export default function HomePage() {
  const { items: latestPosts } = useSeededFetch<JournalPost>('/', '/api/journal?limit=3', 'latestPosts')

  return (
    <>
      <SEO
        title="Miss Scarlett | Luxury Bridal Gowns & Wedding Dresses"
        description="Discover Miss Scarlett — modern luxury bridal gowns crafted with refined design, graceful femininity, and exceptional craftsmanship. Find a stockist near you."
        schema={homeSchema}
      />

      {/* Hero */}
      <section className="section" aria-label="PALAIS collection hero">
        <img
          src={heroFull}
          srcSet={`${hero500} 500w, ${hero800} 800w, ${hero1080} 1080w, ${hero1600} 1600w, ${hero2000} 2000w, ${hero2600} 2600w, ${hero3200} 3200w, ${heroFull} 4480w`}
          sizes="100vw"
          width={4461}
          height={3345}
          alt="Miss Scarlett PALAIS collection — modern luxury bridal gown"
          className="hero-bg"
          loading="eager"
          fetchPriority="high"
        />
        <div className="w-layout-blockcontainer container-3 w-container">
          <p className="heading latest-collections">PALAIS COLLECTION</p>
          <h1 className="heading-3">Miss Scarlett Luxury Bridal Gowns</h1>
          <p className="heading">A NEW CHAPTER OF MODERN BRIDAL ELEGANCE</p>
          <Link to="/category/palais" className="button-3 w-button">
            EXPLORE THE COLLECTION
          </Link>
        </div>
      </section>

      {/* Discover Miss Scarlett */}
      <section className="section-2">
        <div className="w-layout-blockcontainer container-6 w-container">
          <p className="heading latest-collections">DISCOVER MISS SCARLETT</p>
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
                width={1315}
                height={1402}
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
        <p className="heading-28">
          FINDING <em>THE ONE</em> BEGINS HERE
        </p>
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
          <Link to="/category/all-collections" className="button-3 lovce-btn explore w-button">
            EXPLORE
          </Link>
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
              <p className="heading latest-collections">VISIT A BOUTIQUE</p>
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
                width={1320}
                height={1508}
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
              <p className="heading latest-collections">Our Journal</p>
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
                      <Link to={`/journal/${post.slug}`}>
                        {post.image_url && (
                          <img src={post.image_url} alt={post.title} loading="lazy" style={{ width: '100%', marginBottom: '0.5rem' }} />
                        )}
                        <h3 className="heading-5">{post.title}</h3>
                      </Link>
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
