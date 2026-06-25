import { useFormSubmit } from '@/lib/useFormSubmit'
import SEO from '@/components/SEO'
import { becomeStockistSchema } from '@/lib/schema'
import group264 from '@/assets/images/group_264.webp'
import group264_500 from '@/assets/images/group_264-p-500.webp'
import group264_800 from '@/assets/images/group_264-p-800.webp'
import group264_1080 from '@/assets/images/group_264-p-1080.webp'
import minOrderImg from '@/assets/images/Minimum-Orders-img_1.webp'
import flexibleImg from '@/assets/images/Flexible-size-img_1.webp'
import needleThreadImg from '@/assets/images/needle-thread.svg'

const perks = [
  { img: minOrderImg,     label: 'EXCLUSIVE STOCKIST\nOPPORTUNITIES' },
  { img: flexibleImg,     label: 'DESIGNED IN AUSTRALIA' },
  { img: needleThreadImg, label: 'SEAMLESS PARTNERSHIP &\nSUPPORT' },
]

export default function BecomeStockistPage() {
  const { submitting, submitted, error, handleSubmit } = useFormSubmit(
    '/api/become-stockist',
    ['name', 'lastname', 'email', 'phone', 'storename', 'address', 'country', 'website', 'message'],
  )

  return (
    <>
      <SEO
        title="Become a Miss Scarlett Stockist | Partner With Us"
        description="Apply to stock Miss Scarlett luxury bridal gowns in your boutique. We partner with a curated network of bridal boutiques worldwide — apply today."
        schema={becomeStockistSchema}
      />

      {/* Hero */}
      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-3 wf-layout-layout">
            <div className="w-layout-cell cell-26">
              <p className="heading latest-collections">PARTNER WITH MISS SCARLETT</p>
              <h1 className="heading-5">Become a stockist</h1>
              <p className="paragraph">
                Miss Scarlett partners with a curated network of bridal boutiques around the world.
                <br /><br />
                If you're interested in offering Miss Scarlett gowns in your boutique, submit your
                details below and our team will be in touch.
              </p>
            </div>
            <div className="w-layout-cell cell-7">
              <img
                src={group264}
                loading="lazy"
                width={1138}
                height={832}
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 940px"
                srcSet={`${group264_500} 500w, ${group264_800} 800w, ${group264_1080} 1080w, ${group264} 1138w`}
                alt="Miss Scarlett luxury bridal gown — become a stockist"
                className="image-3"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="section-19">
        <div className="w-layout-blockcontainer container-26 w-container">
          <div className="w-layout-layout quick-stack-10 wf-layout-layout">
            {perks.map((perk, i) => (
              <div key={i} className={`w-layout-cell cell-${20 + i}`}>
                <img src={perk.img} loading="lazy" alt={perk.label.replace('\n', ' ')} className="image-15" />
                <h5 className="heading-19">
                  <sub style={{ whiteSpace: 'pre-line' }}>{perk.label}</sub>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="section-6">
        <div className="w-layout-blockcontainer container-6 w-container">
          <div className="w-layout-layout quick-stack-11 wf-layout-layout">
            <div className="w-layout-cell cell-23">
              {submitted ? (
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
              ) : (
                <div className="w-form">
                  <form onSubmit={handleSubmit}>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="name" className="field-label-2">First Name*</label>
                        <input className="text-field w-input" maxLength={256} name="name" type="text" id="name" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="lastname" className="field-label-2">Last Name*</label>
                        <input className="text-field w-input" maxLength={256} name="lastname" type="text" id="lastname" />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="email" className="field-label-2">Email*</label>
                        <input className="text-field w-input" maxLength={256} name="email" type="email" id="email" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="phone" className="field-label-2">Phone Number*</label>
                        <input className="text-field w-input" maxLength={256} name="phone" type="tel" id="phone" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="storename" className="field-label-2">Boutique Name*</label>
                        <input className="text-field w-input" maxLength={256} name="storename" type="text" id="storename" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="address" className="field-label-2">Boutique Address*</label>
                        <input className="text-field w-input" maxLength={256} name="address" type="text" id="address" required />
                      </div>
                    </div>
                    <div className="w-layout-layout quick-stack-12 wf-layout-layout">
                      <div className="w-layout-cell cell-24">
                        <label htmlFor="country" className="field-label-2">Country*</label>
                        <input className="text-field w-input" maxLength={256} name="country" type="text" id="country" required />
                      </div>
                      <div className="w-layout-cell cell-25">
                        <label htmlFor="website" className="field-label-2">Website*</label>
                        <input className="text-field w-input" maxLength={256} name="website" type="text" id="website" required />
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
                      <div className="w-form-fail">
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
