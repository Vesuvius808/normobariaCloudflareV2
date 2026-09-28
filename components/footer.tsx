"use client"

import Link from "next/link"
import { useLang } from "@/context/language-context"
import type { SiteContent } from "@/lib/content"

interface FooterProps {
  content: SiteContent["footer"]
  locations: SiteContent["locations"]
  showBlog: boolean
}

export default function Footer({ content, locations, showBlog }: FooterProps) {
  const { lang } = useLang()
  const t = content.copy[lang]
  const loc = locations.copy[lang]
  const links = t.links

  return (
    <footer className="bg-nb-white border-t border-nb-black/10 py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          {/* Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <span className="font-stencil text-nb-black text-3xl tracking-widest uppercase">
              {content.brand}
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
              {showBlog && (
                <li>
                  <Link
                    href="/blog"
                    className="font-satoshi text-nb-black/60 text-sm tracking-wider uppercase hover:text-nb-black transition-colors duration-300"
                  >
                    Blog
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <p className="font-satoshi text-nb-black/60 text-xs tracking-widest uppercase">
              {t.contactLabel}
            </p>
            <a
              href={`tel:${loc.phone.replace(/\s/g, "")}`}
              className="font-satoshi text-nb-black/60 text-sm hover:text-nb-highlight transition-colors duration-300"
            >
              {loc.phone}
            </a>
            <a
              href={`mailto:${loc.email}`}
              className="font-satoshi text-nb-black/60 text-sm hover:text-nb-highlight transition-colors duration-300"
            >
              {loc.email}
            </a>
            <p className="font-satoshi text-nb-black/60 text-sm">
              {loc.address}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-nb-black/10" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="font-satoshi text-nb-black/60 text-xs">
            {t.copyright.replace("{year}", String(new Date().getFullYear()))}
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
