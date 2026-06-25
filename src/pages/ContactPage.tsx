import { Link } from 'react-router-dom'
import { useFormSubmit } from '@/lib/useFormSubmit'
import SEO from '@/components/SEO'
import { contactSchema } from '@/lib/schema'
import group256 from '@/assets/images/group_256.webp'

export default function ContactPage() {
  const { submitting, submitted, error, handleSubmit } = useFormSubmit(
    '/api/contact',
    ['firstName', 'lastName', 'email', 'phone', 'message'],
  )

  return (
    <>
      <SEO
        title="Contact Miss Scarlett | Get in Touch"
        description="Send an enquiry to Miss Scarlett — our team will be in touch shortly. For bridal appointments we can connect you with the nearest stockist."
        schema={contactSchema}
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-8">
              <p className="heading latest-collections">Discover miss scarlett</p>
              <h1 className="heading-5">GENERAL ENQUIRIES</h1>
              <p className="paragraph">
                Send us an enquiry below and our team will be in touch shortly.
                <br /><br />
                For brides looking to book an appointment, we can also connect you with the nearest
                Miss Scarlett stockist.
                <br /><br />
                For wholesale enquiries, bridal boutiques are invited to apply{' '}
                <Link to="/become-a-stockist">here</Link>.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img src={group256} loading="lazy" width={1315} height={1402} alt="Miss Scarlett bride — contact us for bridal enquiries" className="image-3" />
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
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="phone" className="field-label-2">Phone Number*</label>
                        <input className="text-field w-input" maxLength={256} name="phone" type="tel" id="phone" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="message" className="field-label-2">Message:</label>
                        <textarea required maxLength={5000} id="message" name="message" className="textarea w-input" />
                      </div>
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

      {/* Contact Info */}
      <section className="section-24">
        <div className="w-layout-blockcontainer container-33 w-container">
          <h2 className="heading-23">Contact Information</h2>
        </div>
        <div className="w-layout-blockcontainer container-32 w-container">
          <div className="w-layout-layout quick-stack-19 wf-layout-layout">
            <div className="w-layout-cell">
              <h3 className="heading-24">Customer Support</h3>
              <p className="paragraph">
                If you have any questions, concerns, or need assistance with your order, our customer
                support team is here to help.
                <br />
                You can reach us via email at{' '}
                <a href="mailto:support@missscarlett.com.au" className="link-5">
                  support@missscarlett.com.au
                </a>
                .
              </p>
            </div>
            <div className="w-layout-cell">
              <h3 className="heading-24">Visit Our Showroom</h3>
              <p className="paragraph">
                If you're in the area, we invite you to visit our showroom located at 6/220 Star St,
                Welshpool, Perth, WA 6106.
                <br /><br />
                Our knowledgeable staff will be delighted to assist you in person, showcase our
                collections, and provide personalised recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="section-9">
        <div className="w-layout-blockcontainer w-container">
          <h2 className="heading-5 instagram-h2">Instagram</h2>
          <h3 className="heading-10">@missscarlett.thelabel</h3>
        </div>
      </section>
    </>
  )
}
