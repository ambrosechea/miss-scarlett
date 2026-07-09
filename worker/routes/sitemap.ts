import type { Env } from '../types'

const SITE_URL = 'https://www.missscarlett.com.au'

const STATIC_ROUTES = [
  '/',
  '/about',
  '/contact-us',
  '/find-a-stockist',
  '/become-a-stockist',
  '/trunk-shows',
  '/book-appointment',
  '/journal',
]

const COLLECTION_SLUGS = [
  'palais',
  'lumiere',
  'anniversary',
  'siren',
  'modern-muse',
  'iconic',
  'all-collections',
]

export async function handleSitemap(env: Env): Promise<Response> {
  const { results: products } = await env.DB.prepare(
    `SELECT handle FROM products WHERE active = 1 ORDER BY rowid ASC`
  ).all<{ handle: string }>()

  const { results: stockists } = await env.DB.prepare(
    `SELECT slug FROM stockists WHERE active = 1 ORDER BY rowid ASC`
  ).all<{ slug: string }>()

  const urls: string[] = []

  for (const path of STATIC_ROUTES) {
    urls.push(entry(SITE_URL + path, 'monthly', path === '/' ? '1.0' : '0.7'))
  }

  for (const slug of COLLECTION_SLUGS) {
    urls.push(entry(`${SITE_URL}/category/${slug}`, 'weekly', '0.8'))
  }

  for (const { handle } of products) {
    urls.push(entry(`${SITE_URL}/product/${handle}`, 'weekly', '0.6'))
  }

  for (const { slug } of stockists) {
    urls.push(entry(`${SITE_URL}/stockists/${slug}`, 'monthly', '0.6'))
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function entry(loc: string, changefreq: string, priority: string): string {
  return `  <url>
    <loc>${loc}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}
