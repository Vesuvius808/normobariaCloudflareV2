import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import CookieBanner from "@/components/cookie-banner"
import { BlogPostView } from "@/components/blog-post-view"
import { LanguageProvider } from "@/context/language-context"
import { getPublishedPosts, getSiteContent } from "@/lib/content"
import { pick } from "@/lib/format"

export const dynamic = "force-dynamic"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPublishedPosts().find((p) => p.slug === slug)
  if (!post) return { title: "Blog — Normovita" }
  return {
    title: `${pick(post.title, "pl")} — Normovita`,
    description: pick(post.excerpt, "pl"),
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const site = getSiteContent()
  const posts = getPublishedPosts()
  const post = posts.find((p) => p.slug === slug)

  if (!post) notFound()

  return (
    <LanguageProvider>
      <main>
        <Navbar content={site.navbar} showBlog={posts.length > 0} />
        <BlogPostView post={post} copy={site.blog.copy} />
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
