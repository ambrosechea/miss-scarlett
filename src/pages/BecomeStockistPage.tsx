import { useState, FormEvent } from 'react'
import { apiPost } from '@/lib/api'
import group264 from '@/assets/images/group_264.webp'
import group264_500 from '@/assets/images/group_264-p-500.webp'
import group264_800 from '@/assets/images/group_264-p-800.webp'
import group264_1080 from '@/assets/images/group_264-p-1080.webp'
import minOrderImg from '@/assets/images/Minimum-Orders-img_1.webp'
import flexibleImg from '@/assets/images/Flexible-size-img_1.webp'
import hiddenStockImg from '@/assets/images/Hiden-stock-img_1.webp'

const perks = [
  { img: minOrderImg,     label: 'EXCLUSIVE STOCKIST\nOPPORTUNITIES' },
  { img: flexibleImg,     label: 'DESIGNED IN AUSTRALIA' },
  { img: hiddenStockImg,  label: 'SEAMLESS PARTNERSHIP &\nSUPPORT' },
]

export default function BecomeStockistPage() {
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    const form = e.currentTarget
    const data = new FormData(form)

    const result = await apiPost('/api/become-stockist', {
      firstName:       data.get('name')        as string,
      lastName:        data.get('lastname')     as string,
      email:           data.get('email')        as string,
      phone:           data.get('phone')        as string,
      boutiqueName:    data.get('storename')    as string,
      boutiqueAddress: data.get('address')      as string,
      country:         data.get('country')      as string,
      website:         data.get('website')      as string,
      message:         data.get('message')      as string,
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
            <div className="w-layout-cell cell-26">
              <h6 className="heading latest-collections">PARTNER WITH MISS SCARLETT</h6>
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
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 940px"
                srcSet={`${group264_500} 500w, ${group264_800} 800w, ${group264_1080} 1080w, ${group264} 1138w`}
                alt=""
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
                <img src={perk.img} loading="lazy" alt="" className="image-15" />
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
