import type { Env } from './types'
import { getProductHandles, getProductDetail } from './routes/products'
import { getStockistBySlug } from './routes/stockists'
import { getJournalPostBySlug } from './routes/journal'
import {
  homeSchema, aboutSchema, contactSchema, stockistPageSchema,
  bookAppointmentSchema, trunkShowsSchema, becomeStockistSchema, journalSchema,
  buildProductSchema, buildCollectionSchema, buildStockistSchema, buildJournalPostSchema,
} from '../src/lib/schema'
import { COLLECTION_META } from '../src/lib/collectionMeta'
import { stripLigatures } from '../src/lib/text'

export interface PageMeta {
  title: string
  description: string
  image?: string
  schema?: object
  /** Pages that shouldn't be indexed (404s, internal search results, etc). */
  noindex?: boolean
}

export const NOT_FOUND_META: PageMeta = {
  title: 'Page Not Found | Miss Scarlett',
  description: "The page you're looking for doesn't exist. Explore Miss Scarlett's luxury bridal collections, find a stockist, or return to the homepage.",
  noindex: true,
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
    noindex: true,
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

const SITE = 'https://www.missscarlett.com.au'

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

/** Injects title/meta description/OG/Twitter/canonical/JSON-LD into <head> so
 *  non-JS crawlers see the same content the client injects via SEO.tsx. */
export function injectPageMeta(response: Response, meta: PageMeta, canonicalUrl: string): Response {
  const image = meta.image ?? `${SITE}/og-image.jpg`

  const headExtra = `
${meta.noindex ? '<meta name="robots" content="noindex,follow">\n' : ''}<meta name="description" content="${escapeAttr(meta.description)}">
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

const DYNAMIC_ROUTE_PATTERNS = [
  /^\/category\/[^/]+$/,
  /^\/product\/[^/]+$/,
  /^\/stockists\/[^/]+$/,
  /^\/journal\/[^/]+$/,
]

/** Whether pathname matches a route the React app actually renders (see src/App.tsx).
 *  Used to tell "known route, entity just not found" apart from "no such route at all". */
export function isKnownRoute(pathname: string): boolean {
  if (STATIC_META[pathname]) return true
  return DYNAMIC_ROUTE_PATTERNS.some(p => p.test(pathname))
}

export async function getMetaForPath(pathname: string, env: Env): Promise<PageMeta | null> {
  if (STATIC_META[pathname]) return STATIC_META[pathname]

  const stockistMatch = pathname.match(/^\/stockists\/([^/]+)$/)
  if (stockistMatch) {
    const stockist = await getStockistBySlug(stockistMatch[1], env)
    if (!stockist) return null
    const locationLabel = [stockist.city, stockist.state, stockist.country].filter(Boolean).join(', ')
    return {
      title: `${stockist.name} — Miss Scarlett Stockist in ${stockist.city} | Miss Scarlett Bridal`,
      description: `Visit ${stockist.name} in ${locationLabel} to try on the Miss Scarlett bridal collection in person. Address, contact details, and directions.`,
      schema: buildStockistSchema(stockist),
    }
  }

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

  const journalMatch = pathname.match(/^\/journal\/([^/]+)$/)
  if (journalMatch) {
    const post = await getJournalPostBySlug(journalMatch[1], env)
    if (!post) return null
    return {
      title: `${post.title} | Miss Scarlett Journal`,
      description: (post.excerpt ?? stripLigatures(post.content ?? '').replace(/\n/g, ' ')).slice(0, 155),
      image: post.image_url ?? undefined,
      schema: buildJournalPostSchema(post),
    }
  }

  const prodMatch = pathname.match(/^\/product\/([^/]+)$/)
  if (prodMatch) {
    const handle = prodMatch[1]
    const product = await getProductDetail(handle, env)
    if (!product) return null
    return {
      title: `${product.name} | Miss Scarlett Luxury Bridal Wedding Gown`,
      description: stripLigatures(product.description).slice(0, 155).replace(/\n/g, ' '),
      image: product.main_image,
      schema: buildProductSchema(product),
    }
  }

  return null
}
