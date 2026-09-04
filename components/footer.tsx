"use client"

import Link from "next/link"
import { useLang } from "@/context/language-context"

const navLinks = {
  pl: [
    { label: "O nas", href: "#about" },
    { label: "Korzyści", href: "#benefits" },
    { label: "Nauka", href: "#science" },
    { label: "Lokalizacje", href: "#locations" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Benefits", href: "#benefits" },
    { label: "Science", href: "#science" },
    { label: "Locations", href: "#locations" },
  ],
  uk: [
    { label: "Про нас", href: "#about" },
    { label: "Переваги", href: "#benefits" },
    { label: "Наука", href: "#science" },
    { label: "Локації", href: "#locations" },
  ],
}

const copy = {
  pl: {
    tagline: "Nauka optymalizacji atmosferycznej, zapoczątkowana przez ",
    taglineAuthor: "dr. Jana Pokrywkę",
    taglineEnd: ". Ruch ku lepszemu, dłuższemu i pełnemu energii życiu.",
    sourcesLabel: "Oficjalne źródła",
    contactLabel: "Kontakt",
    privacyLabel: "Polityka prywatności",
    copyright: (year: number) =>
      `© ${year} Normovita. Nie jest leczeniem medycznym. Wyłącznie profilaktyka i optymalizacja.`,
  },
  en: {
    tagline: "The science of atmospheric optimization, pioneered by ",
    taglineAuthor: "Dr. Jan Pokrywka",
    taglineEnd: ". A movement towards a better, longer, more energized life.",
    sourcesLabel: "Official Sources",
    contactLabel: "Contact",
    privacyLabel: "Privacy policy",
    copyright: (year: number) =>
      `© ${year} Normovita. Not a medical treatment. For prevention and optimization only.`,
  },
  uk: {
    tagline: "Наука атмосферної оптимізації, започаткована ",
    taglineAuthor: "др. Яном Покривкою",
    taglineEnd: ". Рух до кращого, довшого та бадьорого життя.",
    sourcesLabel: "Офіційні джерела",
    contactLabel: "Контакт",
    privacyLabel: "Політика конфіденційності",
    copyright: (year: number) =>
      `© ${year} Normovita. Не є медичним лікуванням. Лише профілактика та оптимізація.`,
  },
}

export default function Footer() {
  const { lang } = useLang()
  const t = copy[lang]
  const links = navLinks[lang]

  return (
    <footer className="bg-nb-white border-t border-nb-black/10 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <span className="font-stencil text-nb-black text-3xl tracking-widest uppercase">
              Normovita
            </span>
            <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
              {t.tagline}
              <span className="text-nb-black">{t.taglineAuthor}</span>
              {t.taglineEnd}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-satoshi text-nb-black/60 text-sm tracking-wider uppercase hover:text-nb-black transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-satoshi text-nb-black/60 text-xs tracking-widest uppercase">
              {t.contactLabel}
            </p>
            <a
              href="tel:+48730007011"
              className="font-satoshi text-nb-black/60 text-sm hover:text-nb-highlight transition-colors duration-300"
            >
              +48 730 007 011
            </a>
            <a
              href="mailto:biuro@normobariawarszawa24h.pl"
              className="font-satoshi text-nb-black/60 text-sm hover:text-nb-highlight transition-colors duration-300"
            >
              biuro@normobariawarszawa24h.pl
            </a>
            <p className="font-satoshi text-nb-black/60 text-sm">
              ul. Modlińska 184, 03-119 Warszawa
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-nb-black/10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-satoshi text-nb-black/60 text-xs">
            {t.copyright(new Date().getFullYear())}
          </p>
          <Link
            href="/polityka-prywatnosci"
            className="font-satoshi text-nb-black/60 text-xs tracking-wider uppercase hover:text-nb-black transition-colors duration-300"
          >
            {t.privacyLabel}
          </Link>
        </div>
      </div>
    </footer>
  )
}
