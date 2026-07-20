import type { Env } from '../types'
import { json } from '../index'
import { COLLECTIONS } from '../../src/lib/collections'

interface ProductRow {
  id: number
  handle: string
  name: string
  description: string
  price: string
  main_image: string
}

/** Map URL slug → DB category name */
const SLUG_TO_CATEGORY: Record<string, string> = {
  'palais':           'PALAIS',
  'lumiere':          'LUMIÈRE',
  'anniversary':      'ANNIVERSARY',
  'siren':            'SIREN',
  'modern-muse':      'MODERN MUSE',
  'iconic':           'ICONIC',
  'all-collections':  'ALL COLLECTIONS',
}

export async function getProductHandles(slug: string, env: Env): Promise<string[]> {
  const category = SLUG_TO_CATEGORY[slug]
  if (!category) return []

  const { results } = await env.DB.prepare(
    `SELECT p.handle
       FROM products p
       JOIN product_categories pc ON pc.product_id = p.id
      WHERE pc.category = ? AND p.active = 1
      ORDER BY p.rowid ASC`
  ).bind(category).all<{ handle: string }>()
  return results.map(r => r.handle)
}

export async function getProductDetail(handle: string, env: Env) {
  const product = await env.DB.prepare(
    `SELECT id, handle, name, description, price, main_image
       FROM products WHERE handle = ? AND active = 1`
  ).bind(handle).first<ProductRow>()

  if (!product) return null

  const { results: imageRows } = await env.DB.prepare(
    `SELECT url FROM product_images WHERE product_id = ? ORDER BY sort_order ASC`
  ).bind(product.id).all<{ url: string }>()

  const { results: catRows } = await env.DB.prepare(
    `SELECT category FROM product_categories WHERE product_id = ?`
  ).bind(product.id).all<{ category: string }>()

  return {
    ...product,
    images:     imageRows.map(r => r.url),
    categories: catRows.map(r => r.category),
  }
}

export async function handleProductsList(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url)
  const slug = url.searchParams.get('collection')

  let results: ProductRow[]

  if (slug) {
    const category = SLUG_TO_CATEGORY[slug]
    if (!category) return json({ error: 'Unknown collection' }, 404)

    const res = await env.DB.prepare(
      `SELECT p.id, p.handle, p.name, p.description, p.price, p.main_image
         FROM products p
         JOIN product_categories pc ON pc.product_id = p.id
        WHERE pc.category = ? AND p.active = 1
        ORDER BY p.rowid ASC`
    ).bind(category).all<ProductRow>()
    results = res.results
  } else {
    const categoryOrder = COLLECTIONS
      .map(c => c.category)
      .filter(category => category !== 'ALL COLLECTIONS')

    const caseWhens = categoryOrder.map((_, i) => `WHEN ? THEN ${i}`).join(' ')
    const res = await env.DB.prepare(
      `SELECT p.id, p.handle, p.name, p.description, p.price, p.main_image
         FROM products p
         LEFT JOIN product_categories pc
           ON pc.product_id = p.id AND pc.category != 'ALL COLLECTIONS'
        WHERE p.active = 1
        GROUP BY p.id
        ORDER BY MIN(CASE pc.category ${caseWhens} ELSE ${categoryOrder.length} END) ASC, p.rowid ASC`
    ).bind(...categoryOrder).all<ProductRow>()
    results = res.results
  }

  return json(results)
}

export async function handleProductDetail(handle: string, env: Env): Promise<Response> {
  const product = await getProductDetail(handle, env)
  if (!product) return json({ error: 'Product not found' }, 404)
  return json(product)
}
