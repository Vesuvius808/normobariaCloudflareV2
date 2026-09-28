"use client"

import { useLang } from "@/context/language-context"
import type { SiteContent } from "@/lib/content"

interface AboutProps {
  content: SiteContent["about"]
}

export default function About({ content }: AboutProps) {
  const { lang } = useLang()
  const t = content.copy[lang]

  return (
    <section id="about" className="bg-nb-white pt-12 pb-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* Text */}
        <div className="flex flex-col gap-8">
          <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-stencil text-nb-black text-balance uppercase leading-tight text-5xl md:text-6xl">
            {t.heading[0]}
            <br />
            {t.heading[1] ?? ""}
          </h2>
          <p className="font-satoshi text-nb-black/70 text-lg leading-relaxed">
            {t.p1}
          </p>
          <p className="font-satoshi text-nb-black/70 text-lg leading-relaxed">
            {t.p2Pre}
            <span className="text-nb-black font-semibold">{t.p2Bold}</span>
            {t.p2}
          </p>
          <a
            href="#locations"
            className="inline-flex self-start font-satoshi text-xs tracking-widest uppercase border border-nb-black text-nb-black px-6 py-3 hover:bg-nb-black hover:text-nb-white transition-all duration-300"
          >
            {t.cta}
          </a>
        </div>

        {/* Metrics card */}
        <div className="grid grid-cols-2 gap-px bg-nb-black/10 border border-nb-black/10">
          {t.metrics.map((item) => (
            <div
              key={item.label}
              className="bg-nb-white p-8 flex flex-col gap-3 group hover:bg-nb-highlight/50 transition-colors duration-300"
            >
              <span className="font-satoshi text-nb-black/40 group-hover:text-nb-black text-xs tracking-widest uppercase transition-colors duration-300">
                {item.label}
              </span>
              <span className="font-stencil text-nb-highlight text-3xl transition-colors duration-300">
                {item.value}
              </span>
              <span className="font-satoshi text-nb-black/60 group-hover:text-nb-black/80 text-sm leading-relaxed transition-colors duration-300">
                {item.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
