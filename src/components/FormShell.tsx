import type { FormEvent, ReactNode } from 'react'
import Turnstile from '@/components/Turnstile'

interface FormShellProps {
  submitted: boolean
  submitting: boolean
  error: string | null
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  children: ReactNode
}

export default function FormShell({ submitted, submitting, error, onSubmit, children }: FormShellProps) {
  return (
    <section className="section-6">
      <div className="w-layout-blockcontainer container-6 w-container">
        <div className="w-layout-layout quick-stack-11 wf-layout-layout">
          <div className="w-layout-cell cell-23">
            {submitted ? (
              <div className="success-message w-form-done">
                <div>Thank you! Your submission has been received!</div>
              </div>
            ) : (
              <div className="w-form">
                <form onSubmit={onSubmit}>
                  {children}
                  <Turnstile />
                  <div className="div-block-18">
                    <input type="submit" className="submit-button w-button" value={submitting ? 'Sending…' : 'Submit'} disabled={submitting} />
                  </div>
                  {error && (
                    <div className="error-message w-form-fail">
                      <div>{error}</div>
                    </div>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
