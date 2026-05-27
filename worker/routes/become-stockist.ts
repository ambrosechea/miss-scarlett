import type { Env } from '../types'
import { json } from '../index'

interface BecomeStockistBody {
  firstName: string
  lastName?: string
  email: string
  phone: string
  boutiqueName: string
  boutiqueAddress: string
  country: string
  website?: string
  message?: string
}

export async function handleBecomeStockist(request: Request, env: Env): Promise<Response> {
  let body: BecomeStockistBody
  try {
    body = await request.json<BecomeStockistBody>()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { firstName, lastName, email, phone, boutiqueName, boutiqueAddress, country, website, message } = body

  if (!firstName || !email || !phone || !boutiqueName || !boutiqueAddress || !country) {
    return json({ error: 'firstName, email, phone, boutiqueName, boutiqueAddress, and country are required' }, 400)
  }

  await env.DB.prepare(
    `INSERT INTO stockist_applications
       (first_name, last_name, email, phone, boutique_name, boutique_address, country, website, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(firstName, lastName ?? null, email, phone, boutiqueName, boutiqueAddress, country, website ?? null, message ?? null)
    .run()

  return json({ ok: true })
}
