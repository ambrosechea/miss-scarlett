import { useState, FormEvent } from 'react'
import { apiPost } from '@/lib/api'
import group258 from '@/assets/images/group_258.webp'
import group258_500 from '@/assets/images/group_258-p-500.webp'
import group258_800 from '@/assets/images/group_258-p-800.webp'
import group258_1080 from '@/assets/images/group_258-p-1080.webp'

export default function BookAppointmentPage() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    const result = await apiPost('/api/book-appointment', {
      firstName:   data.get('firstName')   as string,
      lastName:    data.get('lastName')    as string,
      email:       data.get('email')       as string,
      phone:       data.get('phone')       as string,
      city:        data.get('city')        as string,
      state:       data.get('state')       as string,
      country:     data.get('country')     as string,
      weddingDate: data.get('weddingDate') as string,
      message:     data.get('message')     as string,
    })

    if (result.ok) {
      setSubmitted(true)
    } else {
      setError(result.error)
    }
    setSubmitting(false)
  }

  return (
    <>
      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <h6 className="heading latest-collections">BEGIN YOUR JOURNEY</h6>
              <h1 className="heading-5">BOOK APPOINTMENT</h1>
              <p className="paragraph">
                Submit your details below and we will connect you with the nearest Miss Scarlett
                stockist.
                <br /><br />
                Our team will guide you to a boutique where you can experience the collection in
                person.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group258}
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px, 100vw"
                srcSet={`${group258_500} 500w, ${group258_800} 800w, ${group258_1080} 1080w, ${group258} 1138w`}
                alt=""
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
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
                  <form onSubmit={handleSubmit}>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="first-name" className="field-label-2">First Name*</label>
                        <input className="text-field w-input" maxLength={256} name="firstName" type="text" id="first-name" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="last-name" className="field-label-2">Last Name*</label>
                        <input className="text-field w-input" maxLength={256} name="lastName" type="text" id="last-name" />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="email" className="field-label-2">Email*</label>
                        <input className="text-field w-input" maxLength={256} name="email" type="email" id="email" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="phone" className="field-label-2">Phone Number</label>
                        <input className="text-field w-input" maxLength={256} name="phone" type="tel" id="phone" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="city" className="field-label-2">City*</label>
                        <input className="text-field w-input" maxLength={256} name="city" type="text" id="city" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="state" className="field-label-2">State*</label>
                        <input className="text-field w-input" maxLength={256} name="state" type="text" id="state" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="country" className="field-label-2">Country*</label>
                        <input className="text-field w-input" maxLength={256} name="country" type="text" id="country" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="wedding-date" className="field-label-2">Wedding Date</label>
                        <input className="text-field w-input" maxLength={256} name="weddingDate" type="text" id="wedding-date" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="message" className="field-label-2">Message:</label>
                        <textarea required maxLength={5000} id="message" name="message" className="textarea w-input" />
                      </div>
                    </div>
                    <div className="text-block-6">
                      Your details may be shared with a Miss Scarlett stockist to assist with your enquiry.
                    </div>
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
    </>
  )
}
