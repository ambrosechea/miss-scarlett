const VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'

export async function verifyTurnstile(
  token: string | undefined,
  secretKey: string,
  ip: string | null,
): Promise<boolean> {
  if (!token) return false

  const res = await fetch(VERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: secretKey,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  })

  const data = await res.json<{ success: boolean }>()
  return data.success
}
