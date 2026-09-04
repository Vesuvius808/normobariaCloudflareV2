import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Benefits from "@/components/benefits"
import Locations from "@/components/locations"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import { LanguageProvider } from "@/context/language-context"

export default function Home() {
  return (
    <LanguageProvider>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Benefits />
        <Locations />
        <Footer />
      </main>
      <CookieBanner />
    </LanguageProvider>
  )
}
