import type { Env } from '../types'
import { json } from '../index'
import { sendNotification } from '../lib/email'
import { parseAndVerifyTurnstile } from '../lib/formRequest'

interface ContactBody {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  message: string
  'cf-turnstile-response'?: string
}

export async function handleContact(request: Request, env: Env): Promise<Response> {
  const result = await parseAndVerifyTurnstile<ContactBody>(request, env)
  if ('error' in result) return result.error

  const { firstName, lastName, email, phone, message } = result.body

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
