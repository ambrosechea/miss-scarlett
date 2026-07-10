import type { ReactNode } from 'react'

interface PageHeroProps {
  eyebrow: string
  title: string
  image: string
  imageSrcSet?: string
  imageSizes?: string
  imageWidth: number
  imageHeight: number
  imageAlt: string
  /** Some pages use a different left-cell class from the Webflow export. */
  leftCellClassName?: string
  children: ReactNode
}

export default function PageHero({
  eyebrow,
  title,
  image,
  imageSrcSet,
  imageSizes,
  imageWidth,
  imageHeight,
  imageAlt,
  leftCellClassName = 'cell-8',
  children,
}: PageHeroProps) {
  return (
    <section className="section-2 discover-miss-scarlett">
      <div className="w-layout-blockcontainer container-6 w-container">
        <div className="w-layout-layout quick-stack-3 wf-layout-layout">
          <div className={`w-layout-cell ${leftCellClassName}`}>
            <p className="heading latest-collections">{eyebrow}</p>
            <h1 className="heading-5">{title}</h1>
            <p className="paragraph">{children}</p>
          </div>
          <div className="w-layout-cell cell-7">
            <img
              src={image}
              loading="lazy"
              width={imageWidth}
              height={imageHeight}
              sizes={imageSizes}
              srcSet={imageSrcSet}
              alt={imageAlt}
              className="image-3"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
