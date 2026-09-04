"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { useLang } from "@/context/language-context"

const copy = {
  pl: {
    text: "Ta strona używa wyłącznie niezbędnych plików cookie, koniecznych do jej prawidłowego działania.",
    policy: "Polityka prywatności",
    dismiss: "Rozumiem",
    close: "Zamknij",
  },
  en: {
    text: "This site uses only essential cookies required for it to function properly.",
    policy: "Privacy policy",
    dismiss: "Got it",
    close: "Close",
  },
  uk: {
    text: "Цей сайт використовує лише необхідні файли cookie, потрібні для його правильної роботи.",
    policy: "Політика конфіденційності",
    dismiss: "Зрозуміло",
    close: "Закрити",
  },
}

const STORAGE_KEY = "normovita-cookie-notice"

export default function CookieBanner() {
  const { lang } = useLang()
  const [visible, setVisible] = useState(false)
  const t = copy[lang]

  useEffect(() => {
    const seen = localStorage.getItem(STORAGE_KEY)
    if (!seen) {
      setVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "seen")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-xl">
      <div className="flex items-center gap-4 bg-nb-white border border-nb-black/15 shadow-lg p-4">
        <p className="font-satoshi text-nb-black/70 text-sm leading-relaxed flex-1">
          {t.text}{" "}
          <Link
            href="/polityka-prywatnosci"
            className="text-nb-highlight underline underline-offset-2 hover:text-nb-black transition-colors duration-300"
          >
            {t.policy}
          </Link>
        </p>
        <button
          type="button"
          onClick={handleDismiss}
          className="font-satoshi text-xs tracking-widest uppercase bg-nb-highlight text-white px-4 py-2 hover:bg-nb-black transition-colors duration-300 shrink-0"
        >
          {t.dismiss}
        </button>
        <button
          type="button"
          onClick={handleDismiss}
          aria-label={t.close}
          className="text-nb-black/40 hover:text-nb-black transition-colors duration-300 shrink-0"
        >
          <X size={18} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  )
}
