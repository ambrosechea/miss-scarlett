/**
 * Shared JSON-LD structured data for Miss Scarlett.
 *
 * E-E-A-T signals baked in:
 *  - Experience: founding context, brand story
 *  - Expertise: ClothingStore + FashionDesigner types, knowsAbout
 *  - Authoritativeness: sameAs (Instagram, live domain)
 *  - Trustworthiness: contactPoint, address, URL consistency
 *
 * AEO (Answer Engine Optimisation):
 *  - FAQPage schema on homepage answers "what is / where to find" queries
 *  - speakable on key descriptions
 */

const SITE = 'https://www.missscarlett.com.au'
const ORG_ID = `${SITE}/#organization`
const WEB_ID = `${SITE}/#website`

// ── Core Organization (E-E-A-T) ──────────────────────────────────────────────
export const orgSchema = {
  '@type': ['Organization', 'ClothingStore', 'FashionDesigner'],
  '@id': ORG_ID,
  name: 'Miss Scarlett',
  alternateName: 'Miss Scarlett Bridal',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/logo-black.webp`,
    width: 300,
    height: 80,
  },
  image: `${SITE}/og-image.jpg`,
  description:
    'Miss Scarlett reimagines modern bridal with refined design, graceful femininity, and exceptional craftsmanship. Luxury bridal gowns available through select boutiques across Australia, New Zealand, the Americas, and beyond.',
  slogan: 'Reimagining modern bridal',
  foundingDate: '2019',
  knowsAbout: [
    'Bridal fashion',
    'Wedding gowns',
    'Luxury bridal design',
    'Chantilly lace gowns',
    'Fit-and-flare bridal silhouettes',
    'Bespoke bridal couture',
  ],
  sameAs: [
    'https://www.instagram.com/missscarlett.thelabel',
    SITE,
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'AU',
    addressRegion: 'NSW',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: `${SITE}/contact-us`,
    areaServed: ['AU', 'NZ', 'US', 'CA', 'GB', 'SG', 'MY'],
    availableLanguage: 'English',
  },
}

// ── Website ───────────────────────────────────────────────────────────────────
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEB_ID,
  url: SITE,
  name: 'Miss Scarlett',
  description: 'Luxury bridal gowns by Miss Scarlett — modern, refined, beautifully crafted.',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE}/search?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
}

// ── Homepage graph ────────────────────────────────────────────────────────────
export const homeSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    orgSchema,
    websiteSchema,
    {
      '@type': 'WebPage',
      '@id': `${SITE}/#webpage`,
      url: SITE,
      name: 'Miss Scarlett Bridal | Luxury Wedding Gowns',
      description:
        'Discover the Miss Scarlett bridal collection — luxury wedding gowns crafted with exceptional detail and modern elegance. Available through boutiques worldwide.',
      isPartOf: { '@id': WEB_ID },
      about: { '@id': ORG_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.heading-5', '.paragraph'],
      },
    },
    // AEO — FAQ answers common "what is / where" search queries
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is Miss Scarlett bridal?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Miss Scarlett is a luxury Australian bridal label that reimagines modern bridal fashion with refined design, graceful femininity, and exceptional craftsmanship. The collections include Palais, Lumière, Siren, Modern Muse, Anniversary, and Iconic.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can I try on Miss Scarlett wedding gowns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Miss Scarlett gowns are available through a curated network of bridal boutiques across Australia, New Zealand, the Americas, the UK, Singapore, Malaysia, and Canada. Find your nearest stockist at missscarlett.com.au/find-a-stockist.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much do Miss Scarlett wedding dresses cost?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Miss Scarlett bridal gowns are luxury pieces. For pricing, contact your nearest Miss Scarlett stockist or enquire directly through the website.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are Miss Scarlett trunk shows?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Miss Scarlett trunk shows are exclusive limited-time events held at selected boutiques worldwide, where brides can experience the full collection in an intimate setting. Appointments are essential.',
          },
        },
      ],
    },
  ],
}

// ── About page ────────────────────────────────────────────────────────────────
export const aboutSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    orgSchema,
    {
      '@type': 'AboutPage',
      '@id': `${SITE}/about#webpage`,
      url: `${SITE}/about`,
      name: 'About Miss Scarlett | Luxury Bridal Fashion',
      description:
        'Discover the story behind Miss Scarlett bridal — a luxury Australian label creating modern, graceful wedding gowns with exceptional craftsmanship.',
      isPartOf: { '@id': WEB_ID },
      about: { '@id': ORG_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.heading-5', '.paragraph'],
      },
    },
  ],
}

// ── Product page (called dynamically with product data) ───────────────────────
export function buildProductSchema(product: {
  handle: string
  name: string
  description: string
  main_image: string
  categories: string[]
}) {
  const url = `${SITE}/product/${product.handle}`
  const primaryCategory = product.categories.find(c => c !== 'ALL COLLECTIONS') ?? 'Bridal'

  return {
    '@context': 'https://schema.org',
    '@graph': [
      // Product — Google Merchant / rich result eligible
      {
        '@type': 'Product',
        '@id': `${url}#product`,
        name: product.name,
        description: product.description
          .replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
          .replace(/\n/g, ' ').trim(),
        image: product.main_image,
        url,
        brand: { '@type': 'Brand', name: 'Miss Scarlett', '@id': ORG_ID },
        manufacturer: { '@id': ORG_ID },
        category: `Bridal > ${primaryCategory}`,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStoreOnly',
          itemCondition: 'https://schema.org/NewCondition',
          seller: { '@id': ORG_ID },
          priceCurrency: 'AUD',
          priceSpecification: {
            '@type': 'PriceSpecification',
            priceCurrency: 'AUD',
            description: 'Contact your nearest stockist for pricing',
          },
          url: `${SITE}/find-a-stockist`,
        },
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'All Collections', item: `${SITE}/category/all-collections` },
          { '@type': 'ListItem', position: 3, name: primaryCategory, item: `${SITE}/category/${primaryCategory.toLowerCase().replace(/\s+/g, '-').replace('è', 'e')}` },
          { '@type': 'ListItem', position: 4, name: product.name, item: url },
        ],
      },
      // WebPage
      {
        '@type': 'WebPage',
        url,
        name: `${product.name} | Miss Scarlett Bridal`,
        description: product.description.replace(/\n/g, ' ').slice(0, 155),
        isPartOf: { '@id': WEB_ID },
        breadcrumb: `${url}#breadcrumb`,
      },
    ],
  }
}

// ── Collection page ───────────────────────────────────────────────────────────
export function buildCollectionSchema(slug: string, heading: string, description: string, productHandles: string[]) {
  const url = `${SITE}/category/${slug}`
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${url}#webpage`,
        url,
        name: `${heading} Collection | Miss Scarlett Bridal`,
        description,
        isPartOf: { '@id': WEB_ID },
        about: { '@id': ORG_ID },
      },
      {
        '@type': 'ItemList',
        name: `${heading} Bridal Gowns`,
        description,
        numberOfItems: productHandles.length,
        itemListElement: productHandles.map((handle, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE}/product/${handle}`,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
          { '@type': 'ListItem', position: 2, name: 'All Collections', item: `${SITE}/category/all-collections` },
          { '@type': 'ListItem', position: 3, name: heading, item: url },
        ],
      },
    ],
  }
}

// ── Contact page ──────────────────────────────────────────────────────────────
export const contactSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    orgSchema,
    {
      '@type': 'ContactPage',
      url: `${SITE}/contact-us`,
      name: 'Contact Miss Scarlett Bridal',
      description: 'Get in touch with the Miss Scarlett team — for enquiries, stockist information, or to book a bridal appointment.',
      isPartOf: { '@id': WEB_ID },
    },
  ],
}

// ── Find a Stockist ───────────────────────────────────────────────────────────
export const stockistPageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      url: `${SITE}/find-a-stockist`,
      name: 'Find a Miss Scarlett Stockist | Bridal Boutiques Worldwide',
      description: 'Discover Miss Scarlett bridal boutiques across Australia, New Zealand, the Americas, and worldwide.',
      isPartOf: { '@id': WEB_ID },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['.heading-26'],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where can I find a Miss Scarlett stockist near me?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Miss Scarlett gowns are stocked at curated bridal boutiques across Australia, New Zealand, the Americas, the UK, Singapore, Malaysia, and Canada. Visit missscarlett.com.au/find-a-stockist for the full list.',
          },
        },
      ],
    },
  ],
}

// ── Book Appointment ──────────────────────────────────────────────────────────
export const bookAppointmentSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      url: `${SITE}/book-appointment`,
      name: 'Book a Bridal Appointment | Miss Scarlett',
      description: 'Book an appointment to try on Miss Scarlett bridal gowns at your nearest boutique.',
      isPartOf: { '@id': WEB_ID },
    },
    {
      '@type': 'Service',
      name: 'Bridal Appointment',
      provider: { '@id': ORG_ID },
      serviceType: 'Bridal Consultation',
      description: 'Book a private bridal appointment at a Miss Scarlett stockist boutique to try on gowns from the current collection.',
      url: `${SITE}/book-appointment`,
      areaServed: ['AU', 'NZ', 'US', 'CA', 'GB', 'SG', 'MY'],
    },
  ],
}

// ── Trunk Shows ───────────────────────────────────────────────────────────────
export const trunkShowsSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      url: `${SITE}/trunk-shows`,
      name: 'Miss Scarlett Trunk Shows | Exclusive Bridal Events',
      description: 'Experience the Miss Scarlett collection at an exclusive trunk show near you. Limited-time events at selected boutiques worldwide.',
      isPartOf: { '@id': WEB_ID },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Miss Scarlett trunk show?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Miss Scarlett trunk show is an exclusive, limited-time bridal event at a selected boutique where brides can experience the full collection in an intimate setting. Appointments are essential.',
          },
        },
      ],
    },
  ],
}

// ── Become a Stockist ─────────────────────────────────────────────────────────
export const becomeStockistSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      url: `${SITE}/become-a-stockist`,
      name: 'Become a Miss Scarlett Stockist | Wholesale Bridal',
      description: 'Partner with Miss Scarlett and offer the collection at your boutique. Apply to become an authorised stockist.',
      isPartOf: { '@id': WEB_ID },
    },
    {
      '@type': 'Service',
      name: 'Miss Scarlett Wholesale / Stockist Programme',
      provider: { '@id': ORG_ID },
      serviceType: 'Wholesale Bridal',
      description: 'Boutiques can apply to become an authorised Miss Scarlett stockist and offer the bridal collection to their clients.',
      url: `${SITE}/become-a-stockist`,
    },
  ],
}
