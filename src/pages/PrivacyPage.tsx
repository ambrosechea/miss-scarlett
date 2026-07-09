import SEO from '@/components/SEO'

export default function PrivacyPage() {
  return (
    <>
      <SEO
        title="Privacy Statement | Miss Scarlett Bridal Label Website"
        description="How Miss Scarlett collects, uses, and protects the personal information you submit through enquiry, appointment, and stockist application forms on this website."
      />

      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <p className="heading latest-collections">LEGAL</p>
          <h1 className="heading-5">PRIVACY STATEMENT</h1>
          <p className="paragraph">Last updated: July 2026</p>
        </div>
      </section>

      <section className="section-5">
        <div className="w-layout-blockcontainer container-10 w-container" style={{ maxWidth: 760 }}>
          <h2 className="heading-8">What we collect</h2>
          <p className="paragraph-2">
            When you submit an enquiry, appointment request, or stockist application through this
            site, we collect the details you provide — typically your name, email, phone number,
            location, and message. We do not sell dresses directly through this website, so we never
            collect payment card details here.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>How we use it</h2>
          <p className="paragraph-2">
            Submissions are used to respond to your enquiry, connect you with the nearest stockist,
            evaluate a stockist application, or organise a bridal appointment. We do not sell or
            rent your information to third parties.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Analytics and cookies</h2>
          <p className="paragraph-2">
            We use Google Analytics (GA4) and the Meta Pixel to understand how visitors use this
            site and to measure the performance of our marketing. These services may set cookies
            and collect standard technical information such as your browser, device, and general
            location. Form submissions are protected by Cloudflare Turnstile, a privacy-focused
            alternative to traditional CAPTCHAs.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Data storage</h2>
          <p className="paragraph-2">
            Website form submissions are stored securely on Cloudflare's infrastructure and are
            only accessible to the Miss Scarlett team.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Your rights</h2>
          <p className="paragraph-2">
            You can ask us to access, correct, or delete the personal information we hold about
            you at any time by emailing{' '}
            <a href="mailto:support@missscarlett.com.au" className="link-5">support@missscarlett.com.au</a>.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Contact</h2>
          <p className="paragraph-2">
            Questions about this statement can be sent to{' '}
            <a href="mailto:support@missscarlett.com.au" className="link-5">support@missscarlett.com.au</a>{' '}
            or to our registered address at 6/220 Star St, Welshpool, Perth, WA 6106, Australia.
          </p>
        </div>
      </section>
    </>
  )
}
