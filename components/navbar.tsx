"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useLang, type Lang } from "@/context/language-context"

const navLinks = {
  pl: [
    { label: "O nas", href: "#about" },
    { label: "Korzyści", href: "#benefits" },
    { label: "Nauka", href: "#science" },
    { label: "Lokalizacja", href: "#locations" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Benefits", href: "#benefits" },
    { label: "Science", href: "#science" },
    { label: "Location", href: "#locations" },
  ],
  uk: [
    { label: "Про нас", href: "#about" },
    { label: "Переваги", href: "#benefits" },
    { label: "Наука", href: "#science" },
    { label: "Локація", href: "#locations" },
  ],
}

const cta = {
  pl: "Zarezerwuj sesję",
  en: "Book a Session",
  uk: "Забронювати сеанс",
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = navLinks[lang]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-nb-white/95 backdrop-blur-sm border-b border-nb-black/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-6">
        {/* Brand */}
        <a
          href="#"
          className="font-stencil text-nb-black text-xl tracking-widest uppercase hover:text-nb-highlight transition-colors duration-300 shrink-0"
        >
          Normovita
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-satoshi text-nb-black/60 text-sm tracking-wider uppercase hover:text-nb-black transition-colors duration-300 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-nb-highlight group-hover:w-full transition-all duration-300" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: CTA + Language Toggle */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Language selector */}
          <div className="flex items-center gap-0.5">
            {["pl", "en", "uk"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as Lang)}
                className={`font-satoshi text-xs tracking-widest uppercase px-1.5 py-1 transition-colors duration-300 ${
                  lang === l
                    ? "text-nb-black"
                    : "text-nb-black/60 hover:text-nb-black"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <a
            href="#locations"
            className="font-satoshi text-xs tracking-widest uppercase bg-nb-highlight text-white px-5 py-2 hover:bg-nb-black transition-all duration-300 whitespace-nowrap"
          >
            {cta[lang]}
          </a>
        </div>

        {/* Mobile: Language selector + Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          {/* Language selector */}
          <div className="flex items-center gap-0.5">
            {["pl", "en", "uk"].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l as Lang)}
                className={`font-satoshi text-xs tracking-widest uppercase px-1 py-1 transition-colors duration-300 ${
                  lang === l
                    ? "text-nb-black"
                    : "text-nb-black/60 hover:text-nb-black"
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            className="text-nb-black"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-nb-white border-t border-nb-black/10 px-6 py-8 flex flex-col gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-satoshi text-nb-black text-lg tracking-wider uppercase hover:text-nb-highlight transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#locations"
            onClick={() => setMenuOpen(false)}
            className="font-satoshi text-xs tracking-widest uppercase bg-nb-highlight text-white px-5 py-3 text-center hover:bg-nb-black transition-all duration-300 mt-2"
          >
            {cta[lang]}
          </a>
        </div>
      )}
    </header>
  )
}
