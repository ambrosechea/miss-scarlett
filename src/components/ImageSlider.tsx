import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'

interface Slide {
  src: string
  srcSet?: string
  sizes?: string
  alt?: string
  width?: number
  height?: number
}

interface ImageSliderProps {
  slides: Slide[]
  /** How many full slides visible at once. Default 3 (portrait gallery). */
  slidesPerView?: number
  spaceBetween?: number
  imgClassName?: string
  className?: string
}

function SliderArrowButton({ direction }: { direction: 'left' | 'right' }) {
  const points = direction === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'
  return (
    <button
      className={`slider-${direction}-arrow w-slider-arrow-${direction} btn-reset`}
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
    >
      <div className={`slider-icon w-icon-slider-${direction}`}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'block'
          }}
        >
          <polyline points={points} />
        </svg>
      </div>
    </button>
  )
}

export default function ImageSlider({
  slides,
  slidesPerView = 3,
  spaceBetween = 16,
  imgClassName = 'image-24',
  className = '',
}: ImageSliderProps) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={{
          prevEl: '.slider-left-arrow',
          nextEl: '.slider-right-arrow',
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        loop
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className={className}
        breakpoints={{
          0:   { slidesPerView: 1, spaceBetween: 10 },
          640: { slidesPerView: 2, spaceBetween: 12 },
          900: { slidesPerView: slidesPerView, spaceBetween },
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <img
              src={slide.src}
              srcSet={slide.srcSet}
              sizes={slide.sizes ?? '(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw'}
              width={slide.width}
              height={slide.height}
              alt={slide.alt ?? ''}
              loading="lazy"
              className={imgClassName}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <SliderArrowButton direction="left" />
      <SliderArrowButton direction="right" />
    </div>
  )
}
