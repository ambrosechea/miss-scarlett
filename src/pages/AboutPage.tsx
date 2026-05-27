import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import group255 from '@/assets/images/group_255.webp'
import group255_500 from '@/assets/images/group_255-p-500.webp'
import group255_800 from '@/assets/images/group_255-p-800.webp'
import group255_1080 from '@/assets/images/group_255-p-1080.webp'
import testimonialImg from '@/assets/images/Testimonial-image.webp'
import maskGroup2 from '@/assets/images/mask_group2.webp'
import maskGroup2_500 from '@/assets/images/mask_group2-p-500.webp'
import maskGroup2_800 from '@/assets/images/mask_group2-p-800.webp'
import maskGroup2_1080 from '@/assets/images/mask_group2-p-1080.webp'
import melwebp from '@/assets/images/melwebp.webp'
import melwebp500 from '@/assets/images/melwebp-p-500.webp'
import melwebp800 from '@/assets/images/melwebp-p-800.webp'
import melwebp1080 from '@/assets/images/melwebp-p-1080.webp'
import logo1 from '@/assets/images/logo1.webp'
import logo2 from '@/assets/images/logo2.webp'
import logo3 from '@/assets/images/logo3.webp'
import logo4 from '@/assets/images/logo4.webp'
import logo5 from '@/assets/images/logo5.webp'
import logo6 from '@/assets/images/logo6.webp'
import img125325 from '@/assets/images/125325.webp'
import img125325_500 from '@/assets/images/125325-p-500.webp'
import img125325_800 from '@/assets/images/125325-p-800.webp'
import img125435 from '@/assets/images/125435.webp'
import img125435_500 from '@/assets/images/125435-p-500.webp'
import img125435_800 from '@/assets/images/125435-p-800.webp'
import imgUUID from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC.webp'
import imgUUID500 from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC-p-500.webp'
import imgUUID800 from '@/assets/images/265F15EC-A208-4A9E-8970-D513DFDEE7CC-p-800.webp'
import img124234 from '@/assets/images/124234.webp'
import img12423443 from '@/assets/images/12423443.webp'
import img213413254 from '@/assets/images/213413254.webp'
import img124345 from '@/assets/images/124345.webp'
import img3453245 from '@/assets/images/3453245.webp'
import img12342345 from '@/assets/images/12342345.webp'

const testimonials = [
  {
    text: "Hey, I just wanted to say thank you for creating the most stunning wedding dress. I chose the Leona dress after trying it on during the trunk show in the UK and it was perfect. Definitely not what I expected to choose but it just felt right when I tried it on and nothing else matched up to it. I felt incredible on my wedding day",
    author: 'Katie H.',
    location: 'United Kingdom',
  },
  {
    text: "Hi! I wanted to reach out - I wore the Lexi gown for my wedding. It was absolutely perfect. I fell in love with the dress the first time I tried it on and got the same feeling when I put it on for the day\n\nThank you! Xx",
    author: 'Bianca N',
    location: 'United States',
  },
  {
    text: "I had a vision for how I wanted to look on my wedding day and actually found my veil first. When the salon put me in the Michaela dress, it fit terribly lol but I knew it was exactly what I wanted. I was so excited from the moment I placed my order and it only increased when I tried on MY dress for the first time, again at my first fitting, second fitting and the day of. Everyone who saw it could not pick their jaw off the floor! This dress was comfortable and made me feel confident, I didn't want to take it off",
    author: 'Emily N',
    location: 'Australia',
  },
  {
    text: "I was absolutely in love with every inch of my dress from the material, to the fit, and the style it was truly so perfect. I felt so classy and timeless and I knew it was THE ONE the second I put it on.",
    author: 'Bride Steph',
    location: 'Australia',
  },
  {
    text: "Amira was the first dress I pulled but I waited to try it on last because I had a feeling it was going to be the one... the second I put the gown back on with a veil I was teary-eyed and knew this was the one!!!",
    author: 'Bride Ali',
    location: 'Australia',
  },
  {
    text: "I really wanted a timeless, classy, simple but stunning gown... Michaela was my very first dress and I immediately fell in love! It was everything I wanted and more! Thank you for making the dress of my dreams!",
    author: 'Bride Erin',
    location: 'Australia',
  },
]

const brideLogos = [logo6, logo5, logo4, logo3, logo2, logo1, logo6, logo5]

const bridePhotos = [
  { src: img125325, srcSet: `${img125325_500} 500w, ${img125325_800} 800w, ${img125325} 1200w` },
  { src: img125435, srcSet: `${img125435_500} 500w, ${img125435_800} 800w, ${img125435} 1200w` },
  { src: imgUUID, srcSet: `${imgUUID500} 500w, ${imgUUID800} 800w, ${imgUUID} 1200w` },
  { src: img124234, alt: '' },
  { src: img12423443, alt: '' },
  { src: img213413254, alt: '' },
  { src: img124345, alt: '' },
  { src: img3453245, alt: '' },
  { src: img12342345, alt: '' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <h6 className="heading latest-collections">ABOUT US</h6>
              <h1 className="heading-5">THE WORLD OF MISS SCARLETT</h1>
              <p className="paragraph">
                Miss Scarlett celebrates a modern vision of bridal — where elegance, confidence, and
                individuality come together.
                <br />‍<br />
                Created for the bride who values simplicity, grace, and individuality.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group255}
                loading="lazy"
                sizes="100vw"
                srcSet={`${group255_500} 500w, ${group255_800} 800w, ${group255_1080} 1080w, ${group255} 1315w`}
                alt=""
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-5 modern-minimalism-understated">
        <div className="w-layout-blockcontainer container-10 w-container">
          <h2 className="heading-8">The Philosophy</h2>
          <div className="div-block-6" />
          <p className="paragraph-2">
            Miss Scarlett embraces a refined approach to bridal design — where modern lines, graceful
            movement, and delicate detail come together.
            <br />‍<br />
            Each gown is created to enhance the bride herself, allowing her confidence and
            individuality to take centre stage.
          </p>
          <a
            href="https://www.missscarlett.com.au/category/all-collections"
            className="button-3 w-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            EXPLORE THE COLLECTIONS
          </a>
        </div>
      </section>

      {/* Quote */}
      <section className="section-12">
        <div className="w-layout-blockcontainer container-17 w-container">
          <img src={testimonialImg} loading="lazy" alt="" />
          <h3 className="heading-11">
            <sup>Being able to wear such a beautiful dress was an honour and I am so grateful!</sup>
          </h3>
          <p className="paragraph-3">— Olivia</p>
        </div>
      </section>

      {/* The Beginning */}
      <section className="section-6">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-14">
              <h2 className="heading-5">the beginning</h2>
              <p className="paragraph">
                Miss Scarlett was founded by Melissa So in late 2019 with a vision to create bridal
                gowns that feel modern, beautifully crafted, and accessible to brides everywhere.
              </p>
            </div>
            <div className="w-layout-cell cell-12">
              <img
                src={maskGroup2}
                loading="lazy"
                sizes="100vw"
                srcSet={`${maskGroup2_500} 500w, ${maskGroup2_800} 800w, ${maskGroup2_1080} 1080w, ${maskGroup2} 1320w`}
                alt=""
                className="image-18"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Today */}
      <section className="section-6">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell">
              <img
                src={melwebp}
                loading="lazy"
                sizes="100vw"
                srcSet={`${melwebp500} 500w, ${melwebp800} 800w, ${melwebp1080} 1080w, ${melwebp} 1320w`}
                alt=""
                className="image-8"
              />
            </div>
            <div className="w-layout-cell">
              <h6 className="heading latest-collections" />
              <h2 className="heading-5">THE BRAND TODAY</h2>
              <p className="paragraph">
                What began as a passion for contemporary bridal design soon found its place in
                boutiques around the world.
                <br /><br />
                Today, Miss Scarlett is known for its signature balance of modern bridal design and
                graceful simplicity.
                <br />‍<br />
                Modern luxury, created for every bride.
              </p>
              <Link to="/find-a-stockist" className="button-3 lovce-btn w-button">
                FIND A STOCKIST
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bride logos slider */}
      <section className="section-7">
        <div className="w-layout-blockcontainer container-13 w-container">
          <h2 className="heading-5 happy-brides-h2">Miss Scarlett brides</h2>
          <p className="paragraph happy-brides-para">
            Real brides. Real moments.
            <br />A celebration of love, style, and individuality.
          </p>
        </div>
        <div className="container-12">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="team-slider-wrapper-2 w-slider"
          >
            {brideLogos.map((src, i) => (
              <SwiperSlide key={i} className="team-slide-wrapper-2 w-slide">
                <img src={src} loading="lazy" alt="" className="team-member-image-two-2" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Bride photos slider */}
        <section className="team-slider-4">
          <div className="container-18">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop
              className="team-slider-wrapper-4 w-slider"
            >
              {bridePhotos.map((photo, i) => (
                <SwiperSlide key={i} className="team-slide-wrapper-4 w-slide">
                  <div className="team-block-4">
                    <img
                      src={photo.src}
                      srcSet={photo.srcSet}
                      sizes="100vw"
                      loading="lazy"
                      alt=""
                      className="team-member-image-two-4"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </section>

      {/* Testimonials */}
      <section className="section-8">
        <div className="w-layout-blockcontainer container-11 w-container">
          <h2 className="heading-27">TESTIMONIALS</h2>
        </div>
        <div className="container-14">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
            loop
            className="team-slider-wrapper-3 w-slider"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i} className="team-slide-wrapper-3 w-slide">
                <div className="testimonial-card">
                  <p>{t.text}</p>
                  <div className="testimonial-info">
                    <div>
                      <h3 className="testimonial-author">{t.author}</h3>
                      <div className="tagline">{t.location}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  )
}
