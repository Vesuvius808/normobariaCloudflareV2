import type { Metadata } from "next"
import { LanguageProvider } from "@/context/language-context"
import PrivacyPolicy from "@/components/privacy-policy"

export const metadata: Metadata = {
  title: "Polityka Prywatności — Normovita",
  description:
    "Polityka prywatności Normovita. Nasza strona używa wyłącznie niezbędnych plików cookie i szanuje Twoją prywatność.",
}

export default function PrivacyPolicyPage() {
  return (
    <LanguageProvider>
      <PrivacyPolicy />
    </LanguageProvider>
  )
}
