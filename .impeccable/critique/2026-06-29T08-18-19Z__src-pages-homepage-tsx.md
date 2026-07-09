---
target: homepage
total_score: 23
p0_count: 1
p1_count: 3
timestamp: 2026-06-29T08-18-19Z
slug: src-pages-homepage-tsx
---
## Miss Scarlett Homepage Critique

Method: dual-agent (A: design-review · B: detector-scan)

### Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | No loading states for async journal data; slider has no position indicators |
| 2 | Match System / Real World | 3 | Bridal language appropriate; "Trunk Shows" may confuse non-industry visitors |
| 3 | User Control and Freedom | 2 | Nav overlay has close button, but no skip-to-content, no back-to-top on a very long page |
| 4 | Consistency and Standards | 2 | Multiple button variant classes with slightly different styling; hamburger-only nav on desktop is non-standard |
| 5 | Error Prevention | 3 | No forms on homepage; hidden section still fires API request (wasted network) |
| 6 | Recognition Rather Than Recall | 3 | Navigation hidden behind hamburger on all viewports; overlay nav itself is well-organized |
| 7 | Flexibility and Efficiency | 2 | No keyboard shortcuts, no search on homepage, single navigation path |
| 8 | Aesthetic and Minimalist Design | 3 | Clean whitespace, strong hero; but too many sections, some thin on content |
| 9 | Error Recovery | 2 | Generic "No items found" for empty journal; no error boundary for lazy components |
| 10 | Help and Documentation | 1 | No help or FAQ; "Book Appointment" CTA disappears on mobile |
| **Total** | | **23/40** | **Acceptable** |

### Anti-Patterns Verdict

LLM assessment: Not blatantly AI-generated — reads as "Webflow template, exported faithfully." The repeated uppercase tracked kicker text (DISCOVER MISS SCARLETT, Our Journal, empty h3) above section headings borders on the eyebrow pattern. The warm off-white #f4f2ef body bg is the cream/sand AI default zone. The predictable section cadence (hero → text+image → slider → marquee → dark overlay → text+image → hidden section → bare CTA) reads as assembled template rather than authored experience.

Deterministic scan: 139 raw findings, approximately 41 genuinely actionable after filtering Webflow/normalize false positives. Key: 10 arbitrary z-index values, 1 eyebrow-kicker, 1 heading-overflow-risk at 170px, 65 undocumented colors (mostly Webflow legacy), 9 off-scale radii.

### Overall Impression

The hero is genuinely strong — full-bleed bridal imagery with responsive srcSet and confident Ivy Mode typography. But the page coasts downhill. Sections feel like independent blocks without narrative arc. Zero motion. Hidden navigation on desktop. The "Book Appointment" CTA disappears on mobile — the primary conversion action severed on the most common device. The page ends on its weakest section (Instagram CTA with no images).

### What's Working

1. Hero image execution: 8 responsive srcSet sizes, fetchPriority high, eager loading. Ivy Mode at display scale creates genuine brand authority.
2. Brand voice in copy: Restrained, intentional, reads like a real brand. "Refined design, graceful femininity, exceptional craftsmanship."
3. Color discipline: No secondary accent colors anywhere. Ink does all the work. Background alternation creates rhythm without shadows.

### Priority Issues

[P0] Book Appointment CTA hidden on mobile. layout-fixes.css line 333 hides it below 767px. Primary conversion action disappears on the device most brides use.

[P1] Typography scale broken — hero at 170px (77% above 96px ceiling). Section headings bounce 40-80px with no modular scale. Kicker text at 18px indistinguishable from body text.

[P1] Navigation hidden on all viewports. Hamburger-only on desktop forces recall. Become a Stockist buried in dropdown. No visible wayfinding.

[P1] Zero motion on a brand-register site. Only the marquee animates. No reveals, no scroll engagement. Static experience for a luxury brand.

[P2] Page ending violates peak-end rule. Instagram section (weakest on page) is the last impression. Latest News section is display:none.

[P2] Contrast failures: Muted #989389 on Light #f4f2ef (~3.2:1). White text on Coconut #d6d1c5 in Instagram section (~1.7:1 — catastrophic).

### Persona Red Flags

Jordan (First-Timer Bride): Hidden navigation, "Trunk Shows" jargon, must scroll past 1280px hero + text section before seeing any gowns.

Casey (Distracted Mobile User): Book Appointment CTA gone on mobile, fixed 1280px hero height, no state persistence, collection slider has no swipe indicators.

Boutique Stockist: No visible "Become a Stockist" link on homepage, zero B2B signaling, collection shown as 3-image slider (too slow for professional range evaluation).

### Minor Observations

- Marquee "Refined•" has inconsistent bullet (attached vs spaced)
- .latest-news-section is display:none but API still fires — wasted network request
- sup/sub tags misused for visual styling (semantically incorrect)
- Empty h3 at HomePage.tsx line 211 — vestigial Webflow artifact
- .div-block-4 empty div for spacing — should be margin/padding
- 27+ !important declarations in layout-fixes.css
- 10 arbitrary z-index values (999, 9999, 999999)
- Marquee uses 4 decorative h2 elements
