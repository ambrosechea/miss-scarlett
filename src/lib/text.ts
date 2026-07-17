/** Fixes unrendered ligature glyphs (ﬁ/ﬂ/ﬀ) that leaked into product copy
 *  from a Word/PDF source — appears in raw text, meta descriptions, and JSON-LD alike. */
export function stripLigatures(text: string): string {
  return text.replace(/ﬁ/g, 'fi').replace(/ﬂ/g, 'fl').replace(/ﬀ/g, 'ff')
}
