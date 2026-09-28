"use client"

import { useLang } from "@/context/language-context"
import type { BlogPost, SiteContent } from "@/lib/content"
import { BlogCard } from "./blog-card"

interface BlogListProps {
  posts: BlogPost[]
  copy: SiteContent["blog"]["copy"]
}

export function BlogList({ posts, copy }: BlogListProps) {
  const { lang } = useLang()

  return (
    <section className="bg-nb-white pt-32 md:pt-40 pb-28 px-6 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col gap-4 max-w-xl">
          <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
            {copy[lang].eyebrow}
          </p>
          <h1 className="font-stencil text-nb-black uppercase leading-tight text-5xl md:text-6xl">
            {copy[lang].heading}
          </h1>
        </div>

        {posts.length === 0 ? (
          <p className="font-satoshi text-nb-black/50 text-lg">{copy[lang].noPosts}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} copy={copy} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
