/**
 * Shared JSON-LD structured data for Miss Scarlett.
 * Import `orgSchema` and compose with page-specific schemas.
 */

export const orgSchema = {
  '@type': ['Organization', 'ClothingStore'],
  '@id': 'https://www.missscarlett.com.au/#organization',
  name: 'Miss Scarlett',
  url: 'https://www.missscarlett.com.au',
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.missscarlett.com.au/logo-black.webp',
    width: 300,
    height: 80,
  },
  description:
    'Miss Scarlett reimagines modern bridal with refined design, graceful femininity, and exceptional craftsmanship. Luxury bridal gowns available through select boutiques across Australia and beyond.',
  sameAs: [
    'https://www.instagram.com/missscarlett.thelabel',
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://www.missscarlett.com.au/contact-us',
  },
}

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://www.missscarlett.com.au/#website',
  url: 'https://www.missscarlett.com.au',
  name: 'Miss Scarlett',
  publisher: { '@id': 'https://www.missscarlett.com.au/#organization' },
}
