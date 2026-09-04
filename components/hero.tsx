"use client"

import { useEffect, useRef } from "react"
import { useLang } from "@/context/language-context"

const copy = {
  pl: {
    heading: ["Przyszłość", "Zdrowia"],
    sub: (
      <>
        Wejdź do komory, gdzie nauka atmosferyczna spotyka się z biologią człowieka.
        1500 hPa ciśnienia. 40% tlenu. Wodór molekularny.{" "}
        <span className="text-nb-highlight font-medium">Twoje komórki — ulepszone.</span>
      </>
    ),
    stats: [
      { value: "1500", unit: "hPa", label: "Ciśnienie" },
      { value: "40%", unit: "", label: "Tlen" },
      { value: "H₂", unit: "", label: "Wodór molekularny" },
    ],
    cta1: "Zarezerwuj sesję",
    cta2: "Odkryj naukę",
  },
  en: {
    heading: ["Future of", "Wellness"],
    sub: (
      <>
        Step inside a chamber where atmospheric science meets human biology.
        1500 hPa pressure. 40% oxygen. Molecular hydrogen.{" "}
        <span className="text-nb-highlight font-medium">Your cells, upgraded.</span>
      </>
    ),
    stats: [
      { value: "1500", unit: "hPa", label: "Pressure" },
      { value: "40%", unit: "", label: "Oxygen" },
      { value: "H₂", unit: "", label: "Molecular Hydrogen" },
    ],
    cta1: "Book a Session",
    cta2: "Discover the Science",
  },
  uk: {
    heading: ["Майбутнє", "Благополуччя"],
    sub: (
      <>
        Увійдіть до камери, де атмосферна наука зустрічається з біологією людини.
        1500 гПа тиску. 40% кисню. Молекулярний водень.{" "}
        <span className="text-nb-highlight font-medium">Ваші клітини — покращені.</span>
      </>
    ),
    stats: [
      { value: "1500", unit: "гПа", label: "Тиск" },
      { value: "40%", unit: "", label: "Кисень" },
      { value: "H₂", unit: "", label: "Молекулярний водень" },
    ],
    cta1: "Забронювати сеанс",
    cta2: "Дізнайтеся про науку",
  },
}

export default function Hero() {
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

  const t = copy[lang]

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-40 md:pt-28 pb-16 md:pb-20 bg-nb-white"
    >
      {/* Background chamber image */}
      <div
        className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/chamber.png')" }}
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
          {t.heading[1]}
        </h1>

        {/* Sub-line */}
        <p className="font-satoshi text-nb-black/70 text-lg md:text-xl leading-relaxed max-w-2xl text-pretty bg-nb-white/2 backdrop-blur-sm px-2 py-4 rounded-lg">
          {t.sub}
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
