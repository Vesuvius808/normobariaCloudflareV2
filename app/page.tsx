import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Benefits from "@/components/benefits"
import Locations from "@/components/locations"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import { BlogSection } from "@/components/blog-section"
import { LanguageProvider } from "@/context/language-context"
import { getPublishedPosts, getSiteContent } from "@/lib/content"

export const dynamic = "force-dynamic"

export default function Home() {
  const site = getSiteContent()
  const posts = getPublishedPosts()
  const showBlog = posts.length > 0

  return (
    <LanguageProvider>
      <main>
        <Navbar content={site.navbar} showBlog={showBlog} />
        <Hero content={site.hero} />
        <About content={site.about} />
        <Benefits content={site.benefits} />
        <Locations content={site.locations} />
        <BlogSection posts={posts} copy={site.blog.copy} />
        <Footer content={site.footer} locations={site.locations} showBlog={showBlog} />
      </main>
      <CookieBanner />
    </LanguageProvider>
  )
}
