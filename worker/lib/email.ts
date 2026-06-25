import type { Env } from '../types'

const TO = ['support@missscarlett.com.au', 'ambrose@locally.net.au']
const FROM = { email: 'noreply@missscarlett.com.au', name: 'Miss Scarlett' }

export async function sendNotification(
  env: Env,
  subject: string,
  fields: Record<string, string | null | undefined>,
) {
  const lines = Object.entries(fields)
    .map(([label, value]) => `${label}: ${value ?? '—'}`)
    .join('\n')

  const text = `${subject}\n\n${lines}`
  const html = `<h2>${subject}</h2><table style="border-collapse:collapse">${Object.entries(fields)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;font-weight:bold;vertical-align:top">${label}</td><td style="padding:4px 0">${value ?? '—'}</td></tr>`,
    )
    .join('')}</table>`

  const sends = TO.map((to) =>
    env.EMAIL.send({ to, from: FROM, subject, html, text }).catch((err) =>
      console.error(`Email send failed for "${subject}" to ${to}:`, err),
    ),
  )
  await Promise.all(sends)
}
