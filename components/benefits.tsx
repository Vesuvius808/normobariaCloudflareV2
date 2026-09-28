"use client"

import {
  Zap,
  Brain,
  Shield,
  Activity,
  Flame,
  Clock,
  HeartPulse,
  Wind,
  Moon,
  Leaf,
  Sparkles,
  Droplets,
  type LucideIcon,
} from "lucide-react"
import { useLang } from "@/context/language-context"
import type { SiteContent } from "@/lib/content"

const ICONS: Record<string, LucideIcon> = {
  zap: Zap,
  brain: Brain,
  shield: Shield,
  activity: Activity,
  flame: Flame,
  clock: Clock,
  "heart-pulse": HeartPulse,
  wind: Wind,
  moon: Moon,
  leaf: Leaf,
  sparkles: Sparkles,
  droplets: Droplets,
}

interface BenefitsProps {
  content: SiteContent["benefits"]
}

export default function Benefits({ content }: BenefitsProps) {
  const { lang } = useLang()
  const t = content.copy[lang]

  return (
    <>
      {/* Benefits Grid */}
      <section id="benefits" className="bg-nb-white py-28 px-6">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
              {t.benefitsEyebrow}
            </p>
            <h2 className="font-stencil text-nb-black uppercase leading-tight text-5xl md:text-6xl">
              {t.benefitsHeading}
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-nb-black/10">
            {t.benefits.map((b) => {
              const Icon = ICONS[b.icon] ?? Sparkles
              return (
                <div
                  key={b.title}
                  className="bg-nb-white p-10 flex flex-col gap-5 group hover:bg-nb-highlight/40 transition-colors duration-300 border border-nb-black/10"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-nb-highlight/70 transition-colors duration-300">
                    <Icon
                      size={18}
                      className="text-white transition-colors duration-300"
                      strokeWidth={1.5}
                    />
                  </div>
                  <h3 className="font-stencil text-nb-black text-xl uppercase">
                    {b.title}
                  </h3>
                  <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Science / Who It's For */}
      <section id="science" className="bg-nb-white border-t border-nb-black/10 py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          {/* Who */}
          <div className="flex flex-col gap-8">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
              {t.whoEyebrow}
            </p>
            <h2 className="font-stencil text-nb-black uppercase leading-tight text-4xl md:text-5xl">
              {t.whoHeading}
            </h2>
            <ul className="flex flex-col gap-4">
              {t.audiences.map((a) => (
                <li key={a} className="flex items-center gap-4 font-satoshi text-nb-black/60 text-base">
                  <span className="w-2 h-2 rounded-full bg-nb-highlight shrink-0" />
                  {a}
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex flex-col gap-6 bg-nb-highlight/30 border-l-4 border-nb-highlight p-10">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.2em] uppercase">
              {t.noteEyebrow}
            </p>
            <p className="font-satoshi text-nb-black text-lg leading-relaxed">
              {t.noteMain}{" "}
              <span className="text-nb-highlight font-medium">{t.noteHighlight}</span>
              {t.noteTail}
            </p>
            <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
              {t.noteSub}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
