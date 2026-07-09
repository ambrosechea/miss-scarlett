---
name: Miss Scarlett
description: Luxury bridal label — refined design, graceful femininity, exceptional craftsmanship
colors:
  ink: "#1a1a1a"
  light: "#f4f2ef"
  coconut: "#d6d1c5"
  muted: "#989389"
  white: "#ffffff"
  warm-white: "#fcfaf8"
  border: "#e8e4de"
typography:
  display:
    fontFamily: "Ivy Mode, Arial, sans-serif"
    fontSize: "clamp(3rem, 8vw, 5.5rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "3px"
  headline:
    fontFamily: "Ivy Mode, Arial, sans-serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "normal"
  title:
    fontFamily: "Ivy Mode, Arial, sans-serif"
    fontSize: "clamp(1.25rem, 2.5vw, 2.5rem)"
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: "1px"
  body:
    fontFamily: "Lato, sans-serif"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: 1.83
    letterSpacing: "normal"
  label:
    fontFamily: "Lato, sans-serif"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "1.5px"
rounded:
  none: "0px"
  tight: "2px"
  input: "8px"
  pill: "50px"
spacing:
  section: "60px"
  section-sm: "40px"
  container: "1250px"
  gap: "20px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-outline-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-filled:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-filled-hover:
    backgroundColor: "{colors.coconut}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "15px 25px"
  button-header:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-header-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  input-field:
    backgroundColor: "{colors.light}"
    textColor: "{colors.ink}"
    rounded: "{rounded.input}"
    height: "51px"
    padding: "12px 16px"
---

# Design System: Miss Scarlett

## 1. Overview

**Creative North Star: "The Atelier Window"**

Looking into the design studio itself — precision, intentionality, the hand behind the garment. Every element exists because someone decided it should. The system carries the discipline of the atelier into the browser: sharp lines, deliberate negative space, and a refusal to decorate where structure alone is enough. The gowns are the subject; the interface is the frame.

This system explicitly rejects over-the-top glam (heavy ornamentation, glitzy gold, maximalist embellishment), generic template bridal (stock-photo-heavy, interchangeable layouts), and fast-fashion aesthetics (cluttered layouts, sale banners, urgency tactics). Miss Scarlett's luxury is sculptural, not decorative. The site should feel authored, not assembled.

The palette is restrained: warm neutrals with near-black ink carrying all authority. Typography does the heavy lifting through a serif/sans pairing — Ivy Mode for display and Lato for body — with thin weights and generous scale. Sections breathe. Imagery lands.

**Key Characteristics:**
- Warm neutral palette with near-black as the sole action color
- Thin font weights throughout (300 for display and body, 400 for labels)
- Pill-shaped buttons with outline-to-fill hover transitions
- Flat elevation — depth through background color alternation, never shadows
- Full-bleed hero imagery with overlaid typography
- Full-screen navigation overlay on all viewports
- Generous section padding (60px standard) with visual rhythm through alternating backgrounds

## 2. Colors: The Atelier Palette

A restrained palette where near-black ink does all the work. Color is carried by photography, not by the interface. The neutrals are warm but not precious — linen-toned, not cream-toned.

### Primary
- **Ink** (#1a1a1a): The sole authority color. Text, buttons, filled states, footer background, all interactive emphasis. It is the accent by being the densest thing on the page.

### Neutral
- **Light** (#f4f2ef): Primary background. Warm off-white with a linen quality — the surface everything sits on. Also used for form input backgrounds and the navigation overlay.
- **Coconut** (#d6d1c5): Decorative neutral. Marquee text, social link borders, slider navigation, section backgrounds when a warmer alternative to Light is needed. The "second voice" of the palette.
- **Muted** (#989389): De-emphasized text. Breadcrumbs, collection labels, radio labels in unselected state, placeholder-adjacent roles. Never body text — contrast is insufficient against Light.
- **White** (#ffffff): Hero text on dark/image backgrounds, dark-section body text, clean container backgrounds.
- **Warm White** (#fcfaf8): Testimonial section background. A half-step warmer than White for subtle tonal separation.
- **Border** (#e8e4de): Sidebar separators, section dividers, subtle structural lines. Visible but never dominant.

### Named Rules
**The Ink Authority Rule.** Ink (#1a1a1a) is the only color that commands attention. Every interactive element, every heading, every call-to-action uses Ink or White-on-Ink. No secondary accent color. No brand color applied to buttons. The photography provides the color; the interface provides the frame.

**The Muted Prohibition.** Muted (#989389) is forbidden as body text on the Light background — the contrast ratio (approximately 3.2:1) fails WCAG AA. Muted is reserved for labels, breadcrumbs, and metadata only, where the text is short and supplementary.

## 3. Typography

**Display Font:** Ivy Mode (self-hosted woff2, weights 300 and 400) with Arial, sans-serif fallback
**Body Font:** Lato (via @fontsource, weights 300, 400, 700) with sans-serif fallback

**Character:** A deliberate contrast pairing. Ivy Mode is a contemporary display serif — elongated, restrained, with an architectural quality that suits bridal without veering into romantic script territory. Lato provides warmth and readability at body sizes. The pairing reads as "fashion house that writes its own copy" rather than "template with a serif heading."

### Hierarchy
- **Display** (300, clamp(3rem, 8vw, 5.5rem), line-height 1): Hero headlines only. Uppercase. White on imagery or Ink on light backgrounds. The largest thing on any page.
- **Headline** (300, clamp(2rem, 5vw, 3.75rem), line-height 1.15): Section headings. Uppercase. Ivy Mode's thin weight at this scale reads as composed, not weak.
- **Title** (300–400, clamp(1.25rem, 2.5vw, 2.5rem), line-height 1.2): Card names, sub-section headings, product names. Uppercase with 1–1.5px letter-spacing.
- **Body** (300, 18px, line-height 1.83): All paragraph text. Lato at light weight. Max width should be capped at 65–75ch.
- **Label** (400, 11px, letter-spacing 1.5px, uppercase): Navigation metadata, breadcrumbs, filter labels, button text in the header CTA. Lato only. The smallest typographic voice — precise and functional.

### Named Rules
**The Light Weight Rule.** Body text is weight 300. Label text is weight 400. Weight 700 exists in the Lato import but is not used in the current design system. Bold is earned; reaching for it should feel unusual.

**The Uppercase Boundary.** All Ivy Mode text is uppercase. All Label-role Lato text is uppercase. Body-role Lato text is never uppercase. The boundary is typographic role, not visual size.

## 4. Elevation

This system is flat. There are no box-shadows anywhere in the codebase. Depth is communicated through tonal layering: sections alternate between Light (#f4f2ef), White (#ffffff), Warm White (#fcfaf8), Coconut (#d6d1c5), and Ink (#1a1a1a) backgrounds. The alternation creates rhythm and spatial hierarchy without any lifted surface.

Interactive states use border and background-color transitions, not shadow lifts. Thumbnails gain a 2px Ink border on hover/active. Buttons fill from transparent to Ink. The system treats flatness as a design position, not a missing feature.

### Named Rules
**The Flat-By-Conviction Rule.** Shadows are prohibited. If a new component needs depth, use a background color shift or a thin border — never a box-shadow. The atelier window is flat glass; looking through it should feel like looking, not reaching.

## 5. Components

### Buttons
Sharp and minimal. The pill shape is the signature — fully rounded (50px radius) on every button variant, creating a soft capsule that contrasts the angular typography.

- **Shape:** Full pill (50px radius), 1px solid border
- **Outline (primary CTA):** Transparent background, Ink border, Ink text, Ivy Mode 16px uppercase. Padding 15px 25px.
- **Hover / Focus:** Background fills to Ink, text inverts to White. Transition ~0.2s ease.
- **Filled:** Ink background, White/Light text. Used for "Explore" CTAs and search buttons.
- **Filled Hover:** Coconut background, Ink text — a warm inversion.
- **Header CTA:** Smaller scale — Lato 12px, letter-spacing 1.5px, padding 10px 20px. Same pill shape. Hidden on mobile (below 767px).

### Inputs / Fields
- **Style:** Light (#f4f2ef) background, no visible border, 8px radius, 51px height.
- **Focus:** No custom focus ring in current CSS — inherits browser default. (This is a gap worth addressing.)
- **Textarea:** Same Light background, no border, extended bottom padding for height.

### Navigation
Full-screen overlay on all viewports (no desktop inline nav). The hamburger is always visible.

- **Sticky bar:** Light background, centered logo (absolute-positioned), hamburger left, CTA right. Z-index 9999.
- **Overlay:** Fixed, full-viewport, Light background, z-index 9999. Items centered vertically, Ivy Mode 40px weight 300 uppercase. Coconut color at rest, Ink on hover.
- **Dropdowns:** Inline expand below parent item (not positioned overlays). Lato 20px weight 300, centered. Chevron rotates 180deg on open (0.22s ease).
- **Mobile:** Logo shrinks to 130px max-width. CTA hidden. Hamburger repositioned absolute-left.

### Product Cards
The primary browsable unit across collection pages.

- **Image:** 3:4 aspect ratio, cover fit, top-center position. No border, no radius. Hover: scale(1.04) over 0.4s ease.
- **Name:** Ivy Mode 24px weight 400, uppercase, 1.5px letter-spacing. Ink color.
- **No price, no badge, no secondary text.** The card is image + name. Nothing else.

### Testimonial Cards
- **Background:** Light (#f4f2ef), 1px Coconut border, 2px radius.
- **Text:** Lato 15px weight 300, line-height 1.65, Ink color.
- **Author:** Ivy Mode 18px weight 400. Tagline in Label style (Lato 13px, Muted, uppercase, 1px letter-spacing).
- **Layout:** Flex column, space-between, equal height in Swiper grid.

### Footer
- **Background:** Ink (#1a1a1a). All text and links White.
- **Logo:** White variant, centered, 200px width.
- **Social links:** 1px solid White border, pill radius (150px), 10px padding. Icon images 20px.
- **Copyright:** Lato 16px weight 300, uppercase.
- **Layout:** 3-column grid (privacy links | social icons | copyright).

## 6. Do's and Don'ts

### Do:
- **Do** use Ink (#1a1a1a) as the sole interactive/emphasis color. Photography provides vibrancy; the interface provides the frame.
- **Do** maintain the pill shape (50px radius) on every button. It is the component signature.
- **Do** alternate section backgrounds (Light / White / Coconut / Ink) for visual rhythm. Vary the sequence — don't default to strict alternation.
- **Do** set body text in Lato 300 at 18px with generous line-height (1.83). Cap paragraph width at 65–75ch.
- **Do** use full-bleed imagery for hero sections. The photograph is the design; the UI is the caption.
- **Do** keep product cards minimal: image + name, nothing else. The gown sells itself.
- **Do** test all Ivy Mode headings at every breakpoint. The thin weight + uppercase + large scale is prone to overflow on narrow viewports.

### Don't:
- **Don't** introduce a secondary accent color. No teal, no rose, no gold. The palette is Ink + warm neutrals. Adding color to the interface undermines "earned confidence, not decoration."
- **Don't** use Muted (#989389) as body text on Light backgrounds — it fails AA contrast. Reserve it for short labels and metadata only.
- **Don't** add box-shadows to any element. The system is flat by conviction. Use background-color shifts or thin borders for depth.
- **Don't** use heavy ornamentation, glitzy gold, or maximalist embellishment. Miss Scarlett's luxury is sculptural, not decorative.
- **Don't** use generic template bridal layouts — stock-photo grids, predictable pastels, interchangeable section ordering. The site must feel authored, not assembled.
- **Don't** use sale banners, urgency copy, countdown timers, or discount badges. Price is not the conversation.
- **Don't** use font weight 700 (bold) in the current system. Weight 300 and 400 carry all hierarchy through scale and case, not through weight.
- **Don't** use border-radius values between 8px and 50px. The system has two shapes: tight (0–8px for containers/inputs) and pill (50px for buttons/interactive). Nothing in between.
- **Don't** nest cards or place cards inside cards. If content needs grouping, use spacing and background alternation.
