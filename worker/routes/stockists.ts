import type { Env } from '../types'
import { json } from '../index'

export interface StockistRow {
  id: number
  name: string
  slug: string
  address: string | null
  city: string
  state: string | null
  country: string
  region: string
  phone: string | null
  email: string | null
  website: string | null
}

export async function handleStockists(_request: Request, env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT id, name, slug, address, city, state, country, region, phone, email, website
       FROM stockists
      WHERE active = 1
      ORDER BY region, country, name`
  ).all<StockistRow>()

  return json(results)
}

export async function getStockistBySlug(slug: string, env: Env): Promise<StockistRow | null> {
  return env.DB.prepare(
    `SELECT id, name, slug, address, city, state, country, region, phone, email, website
       FROM stockists
      WHERE slug = ? AND active = 1`
  ).bind(slug).first<StockistRow>()
}

export async function handleStockistDetail(slug: string, env: Env): Promise<Response> {
  const stockist = await getStockistBySlug(slug, env)
  if (!stockist) return json({ error: 'Stockist not found' }, 404)

  return json(stockist)
}
