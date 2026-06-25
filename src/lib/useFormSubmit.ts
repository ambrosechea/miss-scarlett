import { useState, FormEvent } from 'react'
import { apiPost } from './api'

export function useFormSubmit(endpoint: string, fieldNames: string[]) {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const fd = new FormData(e.currentTarget)
    const body: Record<string, string> = {}
    for (const name of fieldNames) {
      body[name] = fd.get(name) as string
    }
    const turnstileToken = fd.get('cf-turnstile-response') as string
    if (turnstileToken) body['cf-turnstile-response'] = turnstileToken

    const result = await apiPost(endpoint, body)
    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(result.error)
    }
    setSubmitting(false)
  }

  return { submitting, submitted, error, handleSubmit }
}
