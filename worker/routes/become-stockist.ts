import type { Env } from '../types'
import { json } from '../index'
import { sendNotification } from '../lib/email'
import { parseAndVerifyTurnstile } from '../lib/formRequest'

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
  const result = await parseAndVerifyTurnstile<BecomeStockistBody>(request, env)
  if ('error' in result) return result.error

  const { name, lastname, email, phone, storename, address, country, website, message } = result.body

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
