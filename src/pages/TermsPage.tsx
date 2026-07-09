import SEO from '@/components/SEO'

export default function TermsPage() {
  return (
    <>
      <SEO
        title="Terms of Use | Miss Scarlett Luxury Bridal Website"
        description="The terms and conditions governing your use of the Miss Scarlett website, including content ownership, gown availability, pricing, and boutique visit liability."
      />

      <section className="section-2 discover-miss-scarlett">
        <div className="w-layout-blockcontainer container-6 w-container">
          <p className="heading latest-collections">LEGAL</p>
          <h1 className="heading-5">TERMS OF USE</h1>
          <p className="paragraph">Last updated: July 2026</p>
        </div>
      </section>

      <section className="section-5">
        <div className="w-layout-blockcontainer container-10 w-container" style={{ maxWidth: 760 }}>
          <h2 className="heading-8">About this site</h2>
          <p className="paragraph-2">
            This website is operated by Miss Scarlett. By using it, you agree to these terms. Miss
            Scarlett gowns are sold exclusively through our network of boutique stockists — this
            website does not process direct purchases or payments.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Content and intellectual property</h2>
          <p className="paragraph-2">
            All text, images, designs, and branding on this site are the property of Miss Scarlett
            unless otherwise credited, and may not be reproduced without permission.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Availability and pricing</h2>
          <p className="paragraph-2">
            Gown availability, styles, and pricing vary by boutique and are set by each individual
            stockist. Please contact your nearest stockist directly for current pricing, fitting,
            and alteration information.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Website use</h2>
          <p className="paragraph-2">
            You agree not to misuse this website — including attempting to disrupt its operation,
            submitting false information through our forms, or scraping content for commercial use
            without permission.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Liability</h2>
          <p className="paragraph-2">
            This website is provided as-is. While we take care to keep information accurate and
            up to date, Miss Scarlett is not liable for any loss arising from reliance on content
            published here.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Governing law</h2>
          <p className="paragraph-2">
            These terms are governed by the laws of Western Australia, Australia.
          </p>

          <h2 className="heading-8" style={{ marginTop: '2rem' }}>Contact</h2>
          <p className="paragraph-2">
            Questions about these terms can be sent to{' '}
            <a href="mailto:support@missscarlett.com.au" className="link-5">support@missscarlett.com.au</a>.
          </p>
        </div>
      </section>
    </>
  )
}
