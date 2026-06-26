declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

function ga(...args: unknown[]) {
  if (typeof window.gtag === 'function') window.gtag(...args)
}

function fb(...args: unknown[]) {
  if (typeof window.fbq === 'function') window.fbq(...args)
}

export function trackPageView(path: string, title: string) {
  ga('event', 'page_view', { page_path: path, page_title: title })
  fb('track', 'PageView')
}

export function trackProductView(product: {
  handle: string
  name: string
  price: string
  categories: string[]
}) {
  const category = product.categories.find(c => c !== 'ALL COLLECTIONS') ?? ''
  const price = parseFloat(product.price) || 0

  ga('event', 'view_item', {
    currency: 'AUD',
    value: price,
    items: [{
      item_id: product.handle,
      item_name: product.name,
      item_category: category,
      item_brand: 'Miss Scarlett',
      price,
    }],
  })

  fb('track', 'ViewContent', {
    content_ids: [product.handle],
    content_name: product.name,
    content_type: 'product',
    content_category: category,
    currency: 'AUD',
    value: price,
  })
}

export function trackCollectionView(
  slug: string,
  heading: string,
  products: Array<{ handle: string; name: string; price: string }>,
) {
  ga('event', 'view_item_list', {
    item_list_id: slug,
    item_list_name: heading,
    items: products.map((p, i) => ({
      item_id: p.handle,
      item_name: p.name,
      item_brand: 'Miss Scarlett',
      price: parseFloat(p.price) || 0,
      index: i,
    })),
  })

  fb('track', 'ViewContent', {
    content_ids: products.map(p => p.handle),
    content_type: 'product_group',
    content_category: heading,
  })
}

export function trackFormSubmission(formName: string) {
  ga('event', 'generate_lead', {
    event_category: 'form',
    event_label: formName,
  })

  fb('track', formName === 'become-stockist' ? 'SubmitApplication' : 'Lead', {
    content_name: formName,
  })
}

export function trackEnquireClick(product: { handle: string; name: string }) {
  ga('event', 'select_content', {
    content_type: 'product_enquiry',
    content_id: product.handle,
    items: [{
      item_id: product.handle,
      item_name: product.name,
      item_brand: 'Miss Scarlett',
    }],
  })

  fb('track', 'Contact', {
    content_ids: [product.handle],
    content_name: product.name,
    content_type: 'product',
  })
}

export function trackFindStockistClick(product: { handle: string; name: string }) {
  ga('event', 'select_content', {
    content_type: 'find_stockist',
    content_id: product.handle,
    items: [{
      item_id: product.handle,
      item_name: product.name,
      item_brand: 'Miss Scarlett',
    }],
  })

  fb('track', 'FindLocation', {
    content_ids: [product.handle],
    content_name: product.name,
  })
}

export {}
