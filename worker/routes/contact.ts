import type { Env } from '../types'
import { json } from '../index'
import { sendNotification } from '../lib/email'
import { verifyTurnstile } from '../lib/turnstile'

interface ContactBody {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  message: string
  'cf-turnstile-response'?: string
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  let body: ContactBody
  try {
    body = await request.json<ContactBody>()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const ok = await verifyTurnstile(
    body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP'),
  )
  if (!ok) return json({ error: 'Spam check failed — please try again' }, 400)

  const { firstName, lastName, email, phone, message } = body

  if (!firstName || !email || !message) {
    return json({ error: 'firstName, email, and message are required' }, 400)
  }

  await env.DB.prepare(
    `INSERT INTO contact_submissions (first_name, last_name, email, phone, message)
     VALUES (?, ?, ?, ?, ?)`
  )
    .bind(firstName, lastName ?? null, email, phone ?? null, message)
    .run()

  await sendNotification(env, 'New Contact Enquiry', {
    'First Name': firstName,
    'Last Name': lastName,
    Email: email,
    Phone: phone,
    Message: message,
  })

  return json({ ok: true })
}
