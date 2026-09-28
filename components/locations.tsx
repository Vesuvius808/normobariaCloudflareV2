"use client"

import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { useLang } from "@/context/language-context"
import type { SiteContent } from "@/lib/content"

interface LocationsProps {
  content: SiteContent["locations"]
}

export default function Locations({ content }: LocationsProps) {
  const { lang } = useLang()
  const t = content.copy[lang]
  const loc = content.copy[lang]

  return (
    <section id="locations" className="bg-nb-white py-28 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
            {t.eyebrow}
          </p>
          <h2 className="font-stencil text-nb-black uppercase leading-tight text-5xl md:text-6xl">
            {t.heading[0]}
            <br />
            {t.heading[1] ?? ""}
          </h2>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-4 max-w-lg">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="font-stencil text-2xl uppercase text-nb-black">
              {loc.name}
            </h3>
            <span className="font-satoshi text-xs tracking-widest uppercase px-2 py-0.5 border border-nb-black/20 text-nb-black/50">
              {loc.tag}
            </span>
          </div>
          <p className="font-satoshi text-nb-black/60 text-base leading-relaxed">
            {loc.description}
          </p>
        </div>

        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-nb-black/10 border border-nb-black/10">
          {/* Address */}
          <a
            href={content.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nb-white p-8 flex flex-col gap-3 group hover:bg-nb-highlight/50 transition-colors duration-300"
          >
            <span className="font-satoshi text-nb-black/40 group-hover:text-nb-black text-xs tracking-widest uppercase transition-colors duration-300">
              {t.addressLabel}
            </span>
            <div className="w-8 h-8 flex items-center justify-center bg-nb-highlight/70">
              <MapPin size={16} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="font-satoshi text-nb-black group-hover:text-nb-black text-sm leading-relaxed transition-colors duration-300">
              {loc.address}
            </span>
          </a>

          {/* Phone */}
          <a
            href={`tel:${loc.phone.replace(/\s/g, "")}`}
            className="bg-nb-white p-8 flex flex-col gap-3 group hover:bg-nb-highlight/50 transition-colors duration-300"
          >
            <span className="font-satoshi text-nb-black/40 group-hover:text-nb-black text-xs tracking-widest uppercase transition-colors duration-300">
              {t.phoneLabel}
            </span>
            <div className="w-8 h-8 flex items-center justify-center bg-nb-highlight/70">
              <Phone size={16} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="font-satoshi text-nb-black group-hover:text-nb-black text-sm transition-colors duration-300">
              {loc.phone}
            </span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${loc.email}`}
            className="bg-nb-white p-8 flex flex-col gap-3 group hover:bg-nb-highlight/50 transition-colors duration-300"
          >
            <span className="font-satoshi text-nb-black/40 group-hover:text-nb-black text-xs tracking-widest uppercase transition-colors duration-300">
              {t.emailLabel}
            </span>
            <div className="w-8 h-8 flex items-center justify-center bg-nb-highlight/70">
              <Mail size={16} strokeWidth={1.5} className="text-white" />
            </div>
            <span className="font-satoshi text-nb-black group-hover:text-nb-black text-sm break-all transition-colors duration-300">
              {loc.email}
            </span>
          </a>
        </div>

        {/* Sessions Section */}
        <div className="flex flex-col gap-4">
          <h3 className="font-stencil text-nb-black text-3xl md:text-4xl uppercase">
            {t.sessionsHeading}
          </h3>
          <p className="font-satoshi text-nb-black/60 text-base leading-relaxed max-w-2xl">
            {t.sessionsDescription}
          </p>
        </div>

        {/* Session Hours - Separate Element */}
        <div className="border border-nb-black/10 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center bg-nb-highlight/70">
              <Clock size={20} strokeWidth={1.5} className="text-white" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-stencil text-nb-black text-xl uppercase">
                {t.hoursLabel}
              </span>
              <span className="font-satoshi text-nb-black/50 text-sm">
                {t.hoursNote}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="font-satoshi text-nb-black/40 text-xs tracking-widest uppercase">
                {t.sessionsLabel}
              </span>
              <div className="flex flex-wrap gap-2">
                {content.hours.sessions
                  .filter((session) => typeof session === "string" && session.trim() !== "")
                  .map((session, index) => (
                    <span
                      key={`${session}-${index}`}
                      className="font-satoshi text-nb-black text-sm px-4 py-2 bg-nb-black/5 border border-nb-black/10"
                    >
                      {session}
                    </span>
                  ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-satoshi text-nb-black/40 text-xs tracking-widest uppercase">
                {t.nightLabel}
              </span>
              <div className="flex items-center gap-3">
                <span className="font-satoshi text-nb-highlight text-sm px-4 py-2 bg-nb-highlight/20 border border-nb-highlight/40 font-medium">
                  {content.hours.nightSession}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
