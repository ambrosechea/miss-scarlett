import type { Env } from '../types'
import { json } from '../index'
import { sendNotification } from '../lib/email'
import { verifyTurnstile } from '../lib/turnstile'

interface BookAppointmentBody {
  firstName: string
  lastName?: string
  email: string
  phone?: string
  city?: string
  state?: string
  country?: string
  weddingDate?: string
  message?: string
  'cf-turnstile-response'?: string
}

export async function handleBookAppointment(request: Request, env: Env): Promise<Response> {
  let body: BookAppointmentBody
  try {
    body = await request.json<BookAppointmentBody>()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const ok = await verifyTurnstile(
    body['cf-turnstile-response'],
    env.TURNSTILE_SECRET_KEY,
    request.headers.get('CF-Connecting-IP'),
  )
  if (!ok) return json({ error: 'Spam check failed — please try again' }, 400)

  const { firstName, lastName, email, phone, city, state, country, weddingDate, message } = body

  if (!firstName || !email) {
    return json({ error: 'firstName and email are required' }, 400)
  }

  await env.DB.prepare(
    `INSERT INTO appointment_requests
       (first_name, last_name, email, phone, city, state, country, wedding_date, message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(firstName, lastName ?? null, email, phone ?? null, city ?? null, state ?? null, country ?? null, weddingDate ?? null, message ?? null)
    .run()

  await sendNotification(env, 'New Appointment Request', {
    'First Name': firstName,
    'Last Name': lastName,
    Email: email,
    Phone: phone,
    City: city,
    State: state,
    Country: country,
    'Wedding Date': weddingDate,
    Message: message,
  })

  return json({ ok: true })
}
