import type { Env } from '../types'
import { json } from '../index'

interface StockistRow {
  id: number
  name: string
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
    `SELECT id, name, address, city, state, country, region, phone, email, website
       FROM stockists
      WHERE active = 1
      ORDER BY region, country, name`
  ).all<StockistRow>()

  return json(results)
}
