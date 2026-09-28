"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/context/language-context"
import type { SiteContent } from "@/lib/content"

interface HeroProps {
  content: SiteContent["hero"]
}

export default function Hero({ content }: HeroProps) {
  const { lang } = useLang()
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    const t = setTimeout(() => {
      el.style.transition = "opacity 1s ease, transform 1s ease"
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    }, 100)
    return () => clearTimeout(t)
  }, [])

  const t = content.copy[lang]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40 md:pt-28 pb-16 md:pb-20 bg-nb-white"
    >
      {/* Background chamber image */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: `url('${content.image}')` }}
        aria-hidden="true"
      />

      {/* Bottom gradient fade to mask image edge */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent 0%, #f5f5f0 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center gap-6 md:gap-8">
        {/* Main heading */}
        <h1
          ref={headingRef}
          className="font-stencil text-nb-black text-balance leading-none uppercase"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          {t.heading[0]}
          <br />
          {t.heading[1] ?? ""}
        </h1>

        {/* Sub-line */}
        <p className="font-satoshi text-nb-black/70 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty bg-nb-white/2 backdrop-blur-sm px-2 py-4 rounded-lg">
          {t.sub}{" "}
          <span className="text-nb-highlight font-medium">{t.subHighlight}</span>
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-8 mt-4">
          {t.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="font-stencil text-nb-black text-3xl md:text-4xl">
                {stat.value}
                <span className="text-nb-highlight text-xl">{stat.unit}</span>
              </span>
              <span className="font-satoshi text-nb-black/60 text-xs tracking-widest uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          <a
            href="#locations"
            className="font-satoshi text-xs tracking-widest uppercase bg-nb-highlight text-white px-8 py-3 hover:bg-nb-black transition-all duration-300"
          >
            {t.cta1}
          </a>
          <a
            href="#about"
            className="font-satoshi text-xs tracking-widest uppercase border-2 border-nb-highlight text-nb-highlight px-8 py-3 hover:bg-nb-highlight hover:text-white transition-all duration-300"
          >
            {t.cta2}
          </a>
        </div>
      </div>

    </section>
  )
}
