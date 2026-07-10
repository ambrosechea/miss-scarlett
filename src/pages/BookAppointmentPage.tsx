import { useFormSubmit } from '@/lib/useFormSubmit'
import SEO from '@/components/SEO'
import PageHero from '@/components/PageHero'
import FormShell from '@/components/FormShell'
import { bookAppointmentSchema } from '@/lib/schema'
import group258 from '@/assets/images/group_258.webp'
import group258_500 from '@/assets/images/group_258-p-500.webp'
import group258_800 from '@/assets/images/group_258-p-800.webp'
import group258_1080 from '@/assets/images/group_258-p-1080.webp'

export default function BookAppointmentPage() {
  const { submitting, submitted, error, handleSubmit } = useFormSubmit(
    '/api/book-appointment',
    ['firstName', 'lastName', 'email', 'phone', 'city', 'state', 'country', 'weddingDate', 'message'],
    'book-appointment',
  )

  return (
    <>
      <SEO
        title="Book a Bridal Fitting Appointment | Miss Scarlett Bridal"
        description="Book an appointment to try on Miss Scarlett bridal gowns at a boutique near you. Submit your details and we'll connect you with the nearest stockist."
        schema={bookAppointmentSchema}
      />

      <PageHero
        eyebrow="BEGIN YOUR JOURNEY"
        title="BOOK APPOINTMENT"
        image={group258}
        imageWidth={1138}
        imageHeight={832}
        imageSizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px, 100vw"
        imageSrcSet={`${group258_500} 500w, ${group258_800} 800w, ${group258_1080} 1080w, ${group258} 1138w`}
        imageAlt="Miss Scarlett bride in a luxury bridal gown — book your appointment"
      >
        Submit your details below and we will connect you with the nearest Miss Scarlett
        stockist.
        <br /><br />
        Our team will guide you to a boutique where you can experience the collection in
        person.
      </PageHero>

      <FormShell submitted={submitted} submitting={submitting} error={error} onSubmit={handleSubmit}>
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
      </FormShell>
    </>
  )
}
