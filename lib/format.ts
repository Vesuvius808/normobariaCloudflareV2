export type Lang = "pl" | "en" | "uk"
export type Localized = Record<Lang, string>

export const LANG_ORDER: Lang[] = ["pl", "en", "uk"]

/** Picks the first non-empty localized value (fallback chain: requested lang → pl → en → uk). */
export function pick(value: Localized | undefined, lang: Lang): string {
  if (!value) return ""
  return value[lang] || value.pl || value.en || value.uk || ""
}

export function slugify(text: string): string {
  const map: Record<string, string> = {
    ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z",
    ґ: "g", і: "i", ї: "i", є: "ie", ь: "", й: "i",
  }
  return text
    .toLowerCase()
    .replace(/[ąćęłńóśźżґіїєьй]/g, (c) => map[c] ?? c)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
}

export function formatDate(dateStr: string, lang: Lang): string {
  try {
    return new Date(`${dateStr}T12:00:00`).toLocaleDateString(
      lang === "en" ? "en-GB" : lang === "uk" ? "uk-UA" : "pl-PL",
      { day: "numeric", month: "long", year: "numeric" }
    )
  } catch {
    return dateStr
  }
}
