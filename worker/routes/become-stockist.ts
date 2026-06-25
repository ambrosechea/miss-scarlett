import type { Env } from '../types'
import { json } from '../index'
import { sendNotification } from '../lib/email'
import { verifyTurnstile } from '../lib/turnstile'

interface BecomeStockistBody {
  name: string
  lastname?: string
  email: string
  phone: string
  storename: string
  address: string
  country: string
  website?: string
  message?: string
  'cf-turnstile-response'?: string
}

export async function handleBecomeStockist(request: Request, env: Env): Promise<Response> {
  let body: BecomeStockistBody
  try {
    body = await request.json<BecomeStockistBody>()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const ok = await verifyTurnstile(
    body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP'),
  )
  if (!ok) return json({ error: 'Spam check failed — please try again' }, 400)

  const { name, lastname, email, phone, storename, address, country, website, message } = body

  if (!name || !email || !phone || !storename || !address || !country) {
    return json({ error: 'name, email, phone, storename, address, and country are required' }, 400)
  }

  await env.DB.prepare(
    `INSERT INTO stockist_applications
       (first_name, last_name, email, phone, boutique_name, boutique_address, country, website, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(name, lastname ?? null, email, phone, storename, address, country, website ?? null, message ?? null)
    .run()

  await sendNotification(env, 'New Stockist Application', {
    'First Name': name,
    'Last Name': lastname,
    Email: email,
    Phone: phone,
    'Boutique Name': storename,
    'Boutique Address': address,
    Country: country,
    Website: website,
    Message: message,
  })

  return json({ ok: true })
}
