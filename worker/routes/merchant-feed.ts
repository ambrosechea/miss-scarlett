import type { Env } from '../types'

const SITE_URL = 'https://www.missscarlett.com.au'

interface ProductRow {
  id: number
  handle: string
  name: string
  description: string
  price: string
  main_image: string
}

export async function handleMerchantFeed(env: Env): Promise<Response> {
  const { results: products } = await env.DB.prepare(
    `SELECT id, handle, name, description, price, main_image
       FROM products WHERE active = 1 ORDER BY rowid ASC`
  ).all<ProductRow>()

  const items = products
    .filter(p => parseFloat(p.price) > 0)
    .map(p => {
      const price = parseFloat(p.price).toFixed(2)
      const desc = p.description || p.name
      const cleanDesc = escapeXml(desc.slice(0, 5000))

      return `    <item>
      <g:id>${escapeXml(p.handle)}</g:id>
      <title>${escapeXml(p.name)}</title>
      <description>${cleanDesc}</description>
      <link>${SITE_URL}/product/${encodeURIComponent(p.handle)}</link>
      <g:image_link>${escapeXml(p.main_image)}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${price} AUD</g:price>
      <g:condition>new</g:condition>
      <g:brand>Miss Scarlett</g:brand>
      <g:google_product_category>2271</g:google_product_category>
      <g:product_type>Apparel &amp; Accessories &gt; Clothing &gt; Dresses &gt; Wedding Dresses</g:product_type>
      <g:gender>female</g:gender>
      <g:age_group>adult</g:age_group>
      <g:color>Ivory</g:color>
      <g:size>One Size</g:size>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Miss Scarlett</title>
    <link>${SITE_URL}</link>
    <description>Luxury bridal gowns by Miss Scarlett</description>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
