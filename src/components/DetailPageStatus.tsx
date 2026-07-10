import { Link } from 'react-router-dom'

interface DetailPageStatusProps {
  containerClassName: string
  loading?: boolean
  error?: string | null
  notFoundMessage?: string
  backLinkTo?: string
  backLinkLabel?: string
}

/** Shared loading / not-found block for dynamic-route detail pages
 *  (ProductPage, StockistDetailPage). */
export default function DetailPageStatus({
  containerClassName,
  loading = false,
  error,
  notFoundMessage,
  backLinkTo,
  backLinkLabel,
}: DetailPageStatusProps) {
  return (
    <section className="section-20">
      <div className={containerClassName}>
        {loading ? (
          <p className="paragraph">Loading…</p>
        ) : (
          <>
            <p className="paragraph">{error ?? notFoundMessage}</p>
            {backLinkTo && (
              <Link to={backLinkTo} className="button-3 lovce-btn w-button" style={{ marginTop: '1rem', display: 'inline-block' }}>
                {backLinkLabel}
              </Link>
            )}
          </>
        )}
      </div>
    </section>
  )
}
