import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface Slide {
  src: string
  srcSet?: string
  sizes?: string
  alt?: string
}

interface ImageSliderProps {
  slides: Slide[]
  autoplay?: boolean
  showNav?: boolean
  showDots?: boolean
  className?: string
  imgClassName?: string
}

export default function ImageSlider({
  slides,
  autoplay = true,
  showNav = true,
  showDots = true,
  className = '',
  imgClassName = '',
}: ImageSliderProps) {
  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination]}
      autoplay={autoplay ? { delay: 4000, disableOnInteraction: false } : false}
      navigation={showNav}
      pagination={showDots ? { clickable: true } : false}
      loop
      className={`w-slider ${className}`}
    >
      {slides.map((slide, i) => (
        <SwiperSlide key={i} className="slide-2 w-slide">
          <div className="slide-content-wrapper-2">
            <img
              src={slide.src}
              srcSet={slide.srcSet}
              sizes={slide.sizes}
              alt={slide.alt ?? ''}
              loading="lazy"
              className={imgClassName || 'image-24'}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
