import { useEffect, useRef } from 'react'

const SITE_KEY = '0x4AAAAAADqlkxgK5SCiteR5'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      remove: (id: string) => void
    }
  }
}

export default function Turnstile() {
  const ref = useRef<HTMLDivElement>(null)
  const widgetId = useRef<string>()

  useEffect(() => {
    const el = ref.current
    if (!el) return

    function mount() {
      if (!el || widgetId.current || !window.turnstile) return
      widgetId.current = window.turnstile.render(el, {
        sitekey: SITE_KEY,
        theme: 'light',
      })
    }

    if (window.turnstile) {
      mount()
    } else {
      const id = setInterval(() => {
        if (window.turnstile) {
          clearInterval(id)
          mount()
        }
      }, 200)
      return () => clearInterval(id)
    }

    return () => {
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = undefined
      }
    }
  }, [])

  return <div ref={ref} style={{ marginBottom: '16px' }} />
}
