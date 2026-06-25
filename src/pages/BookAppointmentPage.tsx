import { useFormSubmit } from '@/lib/useFormSubmit'
import SEO from '@/components/SEO'
import Turnstile from '@/components/Turnstile'
import { bookAppointmentSchema } from '@/lib/schema'
import group258 from '@/assets/images/group_258.webp'
import group258_500 from '@/assets/images/group_258-p-500.webp'
import group258_800 from '@/assets/images/group_258-p-800.webp'
import group258_1080 from '@/assets/images/group_258-p-1080.webp'

export default function BookAppointmentPage() {
  const { submitting, submitted, error, handleSubmit } = useFormSubmit(
    '/api/book-appointment',
    ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'country', 'weddingDate', 'message'],
  )

  return (
    <>
      <SEO
        title="Book a Bridal Appointment | Miss Scarlett"
        description="Book an appointment to try on Miss Scarlett bridal gowns at a boutique near you. Submit your details and we'll connect you with the nearest stockist."
        schema={bookAppointmentSchema}
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <p className="heading latest-collections">BEGIN YOUR JOURNEY</p>
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
                width={1138}
                height={832}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px, 100vw"
                srcSet={`${group258_500} 500w, ${group258_800} 800w, ${group258_1080} 1080w, ${group258} 1138w`}
                alt="Miss Scarlett bride in a luxury bridal gown — book your appointment"
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
    </>
  )
}
