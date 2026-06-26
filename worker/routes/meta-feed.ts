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

interface ImageRow {
  product_id: number
  url: string
}

interface CategoryRow {
  product_id: number
  category: string
}

export async function handleMetaFeed(env: Env): Promise<Response> {
  const [productRes, imageRes, categoryRes] = await Promise.all([
    env.DB.prepare(
      `SELECT id, handle, name, description, price, main_image
         FROM products WHERE active = 1 ORDER BY rowid ASC`
    ).all<ProductRow>(),
    env.DB.prepare(
      `SELECT product_id, url FROM product_images ORDER BY product_id, sort_order ASC`
    ).all<ImageRow>(),
    env.DB.prepare(
      `SELECT product_id, category FROM product_categories WHERE category != 'ALL COLLECTIONS'`
    ).all<CategoryRow>(),
  ])

  const imagesByProduct = new Map<number, string[]>()
  for (const img of imageRes.results) {
    const list = imagesByProduct.get(img.product_id) || []
    list.push(img.url)
    imagesByProduct.set(img.product_id, list)
  }

  const collectionByProduct = new Map<number, string>()
  for (const cat of categoryRes.results) {
    if (!collectionByProduct.has(cat.product_id)) {
      collectionByProduct.set(cat.product_id, cat.category)
    }
  }

  const items = productRes.results
    .filter(p => parseFloat(p.price) > 0 && p.description)
    .map(p => buildItem(p, imagesByProduct.get(p.id) || [], collectionByProduct.get(p.id) || ''))
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

function buildItem(p: ProductRow, images: string[], collection: string): string {
  const price = parseFloat(p.price).toFixed(2)
  const desc = p.description
  const isAccessory = /\b(veil|scarf|headpiece|earring)\b/i.test(p.name)

  const material = extractMaterial(desc)
  const silhouette = extractSilhouette(desc)
  const color = extractColor(desc)
  const title = buildTitle(p.name, material, silhouette, isAccessory)

  const googleCategory = isAccessory ? '167' : '2271'
  const productType = isAccessory
    ? 'Apparel &amp; Accessories &gt; Clothing Accessories &gt; Bridal Accessories'
    : 'Apparel &amp; Accessories &gt; Clothing &gt; Dresses &gt; Wedding Dresses'

  const additionalImages = images
    .filter(url => url !== p.main_image)
    .slice(0, 9)
    .map(url => `      <g:additional_image_link>${esc(url)}</g:additional_image_link>`)
    .join('\n')

  const groupId = collection
    ? `\n      <g:item_group_id>${esc(collection)}</g:item_group_id>`
    : ''

  const collectionLabel = collection
    ? `\n      <g:custom_label_0>${esc(collection)}</g:custom_label_0>`
    : ''

  return `    <item>
      <g:id>${esc(p.handle)}</g:id>
      <g:title>${esc(title)}</g:title>
      <g:description>${esc(desc.slice(0, 5000))}</g:description>
      <g:rich_text_description><![CDATA[${desc.slice(0, 5000)}]]></g:rich_text_description>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${price} AUD</g:price>
      <g:link>${SITE_URL}/product/${encodeURIComponent(p.handle)}</g:link>
      <g:image_link>${esc(p.main_image)}</g:image_link>
${additionalImages}
      <g:brand>Miss Scarlett</g:brand>
      <g:google_product_category>${googleCategory}</g:google_product_category>
      <g:fb_product_category>${googleCategory}</g:fb_product_category>
      <g:product_type>${productType}</g:product_type>
      <g:gender>female</g:gender>
      <g:age_group>adult</g:age_group>
      <g:color>${esc(color)}</g:color>
      <g:size>One Size</g:size>
      <g:material>${esc(material)}</g:material>${groupId}${collectionLabel}
    </item>`
}

function buildTitle(name: string, material: string, silhouette: string, isAccessory: boolean): string {
  if (isAccessory) {
    return `Miss Scarlett ${name} - Bridal ${material}`
  }
  const parts = [`Miss Scarlett ${name}`]
  if (material) parts.push(material)
  if (silhouette) parts.push(silhouette)
  parts.push('Wedding Dress')
  return parts.join(' ')
}

const MATERIAL_PATTERNS: [RegExp, string][] = [
  [/\bchantilly lace\b/i, 'Chantilly Lace'],
  [/\bbeaded lace\b/i, 'Beaded Lace'],
  [/\bchiffon silk\b/i, 'Chiffon Silk'],
  [/\bmikado\b/i, 'Mikado'],
  [/\borganza\b/i, 'Organza'],
  [/\bbrocade\b/i, 'Brocade'],
  [/\btulle\b/i, 'Tulle'],
  [/\bsilky satin\b/i, 'Silky Satin'],
  [/\bsatin\b/i, 'Satin'],
  [/\bcrepe\b/i, 'Crepe'],
  [/\blace\b/i, 'Lace'],
  [/\bchiffon\b/i, 'Chiffon'],
]

function extractMaterial(desc: string): string {
  for (const [pattern, label] of MATERIAL_PATTERNS) {
    if (pattern.test(desc)) return label
  }
  return 'Fabric'
}

const SILHOUETTE_PATTERNS: [RegExp, string][] = [
  [/\bfit[- ]and[- ]flare\b/i, 'Fit & Flare'],
  [/\bball\s*gown\b/i, 'Ball Gown'],
  [/\bmermaid\b/i, 'Mermaid'],
  [/\bA[- ]line\b/i, 'A-Line'],
  [/\bmini\b/i, 'Mini'],
  [/\bsheath\b/i, 'Sheath'],
  [/\bstrapless\b/i, 'Strapless'],
]

function extractSilhouette(desc: string): string {
  for (const [pattern, label] of SILHOUETTE_PATTERNS) {
    if (pattern.test(desc)) return label
  }
  return ''
}

function extractColor(desc: string): string {
  if (/\bivory\b/i.test(desc)) return 'Ivory'
  if (/\bwhite\b/i.test(desc)) return 'White'
  return 'Ivory'
}

function esc(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}
