import type { Env } from '../types'
import { json } from '../index'

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
}

export async function handleBookAppointment(request: Request, env: Env): Promise<Response> {
  let body: BookAppointmentBody
  try {
    body = await request.json<BookAppointmentBody>()
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

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

  return json({ ok: true })
}
