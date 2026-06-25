const SITE_KEY = '0x4AAAAAADqlkxgK5SCiteR5'

export default function Turnstile() {
  return (
    <div
      className="cf-turnstile"
      data-sitekey={SITE_KEY}
      data-theme="light"
      style={{ marginBottom: '16px' }}
    />
  )
}
