import { useEffect } from 'react'

interface SEOProps {
  title: string
  description: string
  /** Absolute URL for og:image. Falls back to Miss Scarlett default OG image. */
  image?: string
  /** JSON-LD structured data object (or @graph array wrapper). */
  schema?: object
}

const DEFAULT_IMAGE = 'https://www.missscarlett.com.au/og-image.jpg'
const SITE_URL      = 'https://www.missscarlett.com.au'

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name'
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function injectSchema(schema: object) {
  const id = 'ld-json-schema'
  let el = document.getElementById(id) as HTMLScriptElement | null
  if (!el) {
    el = document.createElement('script')
    el.id   = id
    el.type = 'application/ld+json'
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(schema)
}

export default function SEO({ title, description, image, schema }: SEOProps) {
  useEffect(() => {
    // ── Basic ─────────────────────────────────────────────────────
    document.title = title
    setMeta('description', description)

    // ── Open Graph ───────────────────────────────────────────────
    const ogImage = image ?? DEFAULT_IMAGE
    setMeta('og:type',        'website',     true)
    setMeta('og:title',       title,         true)
    setMeta('og:description', description,   true)
    setMeta('og:image',       ogImage,       true)
    setMeta('og:site_name',   'Miss Scarlett', true)

    // ── Twitter Card ─────────────────────────────────────────────
    setMeta('twitter:card',        'summary_large_image')
    setMeta('twitter:title',       title)
    setMeta('twitter:description', description)
    setMeta('twitter:image',       ogImage)

    // ── Canonical ────────────────────────────────────────────────
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = SITE_URL + window.location.pathname

    // ── JSON-LD ──────────────────────────────────────────────────
    if (schema) injectSchema(schema)
  }, [title, description, image, schema])

  return null
}
