"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/context/language-context"
import type { BlogPost, SiteContent } from "@/lib/content"
import { BlogCard } from "./blog-card"

interface BlogSectionProps {
  posts: BlogPost[] // already filtered to published + sorted
  copy: SiteContent["blog"]["copy"]
}

/**
 * Homepage blog teaser. Renders nothing at all when there are no published posts.
 */
export function BlogSection({ posts, copy }: BlogSectionProps) {
  const { lang } = useLang()

  if (posts.length === 0) return null

  const latest = posts.slice(0, 3)

  return (
    <section id="blog" className="bg-nb-white border-t border-nb-black/10 py-28 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-xl">
            <p className="font-satoshi text-nb-black/40 text-xs tracking-[0.3em] uppercase">
              {copy[lang].eyebrow}
            </p>
            <h2 className="font-stencil text-nb-black uppercase leading-tight text-5xl md:text-6xl">
              {copy[lang].heading}
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 self-start md:self-auto font-satoshi text-xs tracking-widest uppercase border border-nb-black text-nb-black px-6 py-3 hover:bg-nb-black hover:text-nb-white transition-all duration-300"
          >
            {copy[lang].viewAll}
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((post) => (
            <BlogCard key={post.id} post={post} copy={copy} />
          ))}
        </div>
      </div>
    </section>
  )
}
