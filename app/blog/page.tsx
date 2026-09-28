import type { Metadata } from "next"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import { BlogList } from "@/components/blog-list"
import { LanguageProvider } from "@/context/language-context"
import { getPublishedPosts, getSiteContent } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Blog — Normovita",
}

export default function BlogPage() {
  const site = getSiteContent()
  const posts = getPublishedPosts()

  return (
    <LanguageProvider>
      <main>
        <Navbar content={site.navbar} showBlog={posts.length > 0} />
        <BlogList posts={posts} copy={site.blog.copy} />
        <Footer
          content={site.footer}
          locations={site.locations}
          showBlog={posts.length > 0}
        />
      </main>
      <CookieBanner />
    </LanguageProvider>
  )
}
