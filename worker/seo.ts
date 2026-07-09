import type { Env } from './types'
import { getProductHandles, getProductDetail } from './routes/products'
import {
  homeSchema, aboutSchema, contactSchema, stockistPageSchema,
  bookAppointmentSchema, trunkShowsSchema, becomeStockistSchema, journalSchema,
  buildProductSchema, buildCollectionSchema,
} from '../src/lib/schema'

export interface PageMeta {
  title: string
  description: string
  image?: string
  schema?: object
}

const STATIC_META: Record<string, PageMeta> = {
  '/': {
    title: 'Miss Scarlett | Luxury Bridal Gowns & Wedding Dresses',
    description: 'Discover Miss Scarlett — modern luxury bridal gowns crafted with refined design, graceful femininity, and exceptional craftsmanship. Find a stockist near you.',
    schema: homeSchema,
  },
  '/about': {
    title: 'About Miss Scarlett | Modern Luxury Bridal Designer',
    description: 'Discover the world of Miss Scarlett — a luxury bridal label crafting modern gowns with refined design, graceful femininity, and exceptional craftsmanship.',
    schema: aboutSchema,
  },
  '/contact-us': {
    title: 'Contact Miss Scarlett Bridal | Enquiries & Support',
    description: "Send an enquiry to the Miss Scarlett team — we'll be in touch shortly. Looking to book an appointment? We'll connect you with your nearest boutique stockist.",
    schema: contactSchema,
  },
  '/find-a-stockist': {
    title: 'Find a Miss Scarlett Stockist | Bridal Boutiques Worldwide',
    description: 'Discover Miss Scarlett bridal boutiques across Australia, New Zealand, the Americas, and worldwide. Find a stockist near you and try on your dream gown.',
    schema: stockistPageSchema,
  },
  '/become-a-stockist': {
    title: 'Become a Miss Scarlett Stockist | Partner With Us',
    description: 'Apply to stock Miss Scarlett luxury bridal gowns in your boutique. We partner with a curated network of bridal boutiques worldwide — apply to join us today.',
    schema: becomeStockistSchema,
  },
  '/trunk-shows': {
    title: 'Miss Scarlett Trunk Shows | Exclusive Bridal Events',
    description: 'Experience the Miss Scarlett collection at an exclusive trunk show near you. Limited-time events held at selected boutiques worldwide — appointments essential.',
    schema: trunkShowsSchema,
  },
  '/book-appointment': {
    title: 'Book a Bridal Fitting Appointment | Miss Scarlett Bridal',
    description: "Book an appointment to try on Miss Scarlett bridal gowns at a boutique near you. Submit your details and we'll connect you with the nearest stockist.",
    schema: bookAppointmentSchema,
  },
  '/journal': {
    title: 'Miss Scarlett Journal | Bridal Inspiration & Style News',
    description: 'Read the Miss Scarlett journal for bridal inspiration, styling tips, real bride stories, and the latest news and updates from the Miss Scarlett label.',
    schema: journalSchema,
  },
  '/search': {
    title: 'Search the Miss Scarlett Luxury Bridal Gown Collection',
    description: 'Search the Miss Scarlett bridal collection — find your dream luxury wedding gown by name, style, silhouette, or collection in seconds, right from this page.',
  },
  '/privacy': {
    title: 'Privacy Statement | Miss Scarlett Bridal Label Website',
    description: 'How Miss Scarlett collects, uses, and protects the personal information you submit through enquiry, appointment, and stockist application forms on this website.',
  },
  '/terms': {
    title: 'Terms of Use | Miss Scarlett Luxury Bridal Website',
    description: 'The terms and conditions governing your use of the Miss Scarlett website, including content ownership, gown availability, pricing, and boutique visit liability.',
  },
}

const COLLECTION_META: Record<string, { title: string; heading: string; description: string }> = {
  'palais': {
    title: 'Palais Collection | Miss Scarlett Luxury Bridal Gowns',
    heading: 'PALAIS',
    description: 'Discover the Palais collection — couture-inspired bridal gowns for the bride who desires architectural elegance and modern romance, crafted with intention.',
  },
  'lumiere': {
    title: 'Lumière Collection | Miss Scarlett Luxury Bridal Gowns',
    heading: 'LUMIÈRE',
    description: 'The Lumière collection — flowing, radiant bridal gowns that celebrate light, softness, and timeless feminine beauty, designed for the modern, graceful bride.',
  },
  'anniversary': {
    title: 'Anniversary Collection | Miss Scarlett Bridal Gowns',
    heading: 'ANNIVERSARY',
    description: "The Anniversary collection — Miss Scarlett's most beloved designs, timeless bridal gowns that have captured brides' hearts since our beginning in 2019.",
  },
  'siren': {
    title: 'Siren Collection | Miss Scarlett Luxury Bridal Gowns',
    heading: 'SIREN',
    description: 'The Siren collection — sultry, figure-hugging bridal gowns designed for the bold, confident bride who wants to make a statement on her wedding day, every time.',
  },
  'modern-muse': {
    title: 'Modern Muse Collection | Miss Scarlett Bridal Gowns',
    heading: 'MODERN MUSE',
    description: 'The Modern Muse collection — contemporary bridal gowns with clean lines, minimalist beauty, and effortless sophistication, designed for the modern bride.',
  },
  'iconic': {
    title: 'Iconic Collection | Miss Scarlett Luxury Bridal Gowns',
    heading: 'ICONIC',
    description: 'The Iconic collection — signature Miss Scarlett designs that have defined our legacy of exquisite, modern bridal fashion since our founding in 2019 in Perth.',
  },
  'all-collections': {
    title: 'All Wedding Dresses | Miss Scarlett Luxury Bridal Label',
    heading: 'ALL WEDDING DRESSES',
    description: 'Explore the complete Miss Scarlett bridal collection — discover your dream gown across every style, from romantic lace to sleek, modern minimalist silhouettes.',
  },
}

const SITE = 'https://www.missscarlett.com.au'

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Injects title/meta description/OG/Twitter/canonical/JSON-LD into <head> so
 *  non-JS crawlers see the same content the client injects via SEO.tsx. */
export function injectPageMeta(response: Response, meta: PageMeta, canonicalUrl: string): Response {
  const image = meta.image ?? `${SITE}/og-image.jpg`

  const headExtra = `
<meta name="description" content="${escapeAttr(meta.description)}">
<meta property="og:type" content="website">
<meta property="og:title" content="${escapeAttr(meta.title)}">
<meta property="og:description" content="${escapeAttr(meta.description)}">
<meta property="og:image" content="${escapeAttr(image)}">
<meta property="og:site_name" content="Miss Scarlett">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(meta.title)}">
<meta name="twitter:description" content="${escapeAttr(meta.description)}">
<meta name="twitter:image" content="${escapeAttr(image)}">
<link rel="canonical" href="${escapeAttr(canonicalUrl)}">
${meta.schema ? `<script type="application/ld+json" id="ld-json-schema">${JSON.stringify(meta.schema).replace(/</g, '\\u003c')}</script>` : ''}`

  return new HTMLRewriter()
    .on('title', {
      element(el) {
        el.setInnerContent(meta.title)
      },
    })
    .on('head', {
      element(el) {
        el.append(headExtra, { html: true })
      },
    })
    .transform(response)
}

export async function getMetaForPath(pathname: string, env: Env): Promise<PageMeta | null> {
  if (STATIC_META[pathname]) return STATIC_META[pathname]

  const catMatch = pathname.match(/^\/category\/([^/]+)$/)
  if (catMatch) {
    const slug = catMatch[1]
    const meta = COLLECTION_META[slug]
    if (!meta) return null
    const handles = await getProductHandles(slug, env)
    return {
      title: meta.title,
      description: meta.description,
      schema: buildCollectionSchema(slug, meta.heading, meta.description, handles),
    }
  }

  const prodMatch = pathname.match(/^\/product\/([^/]+)$/)
  if (prodMatch) {
    const handle = prodMatch[1]
    const product = await getProductDetail(handle, env)
    if (!product) return null
    return {
      title: `${product.name} | Miss Scarlett Luxury Bridal Wedding Gown`,
      description: product.description.slice(0, 155).replace(/\n/g, ' '),
      image: product.main_image,
      schema: buildProductSchema(product),
    }
  }

  return null
}
