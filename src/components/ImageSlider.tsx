import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

interface Slide {
  src: string
  srcSet?: string
  sizes?: string
  alt?: string
}

interface ImageSliderProps {
  slides: Slide[]
  /** How many full slides visible at once. Default 3 (portrait gallery). */
  slidesPerView?: number
  spaceBetween?: number
  imgClassName?: string
  className?: string
}

export default function ImageSlider({
  slides,
  slidesPerView = 3,
  spaceBetween = 16,
  imgClassName = 'image-24',
  className = '',
}: ImageSliderProps) {
  return (
    <Swiper
      modules={[Autoplay]}
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
            alt={slide.alt ?? ''}
            loading="lazy"
            className={imgClassName}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
