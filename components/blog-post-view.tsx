"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLang } from "@/context/language-context"
import type { BlogPost, SiteContent } from "@/lib/content"
import { formatDate, pick } from "@/lib/format"

interface BlogPostViewProps {
  post: BlogPost
  copy: SiteContent["blog"]["copy"]
}

export function BlogPostView({ post, copy }: BlogPostViewProps) {
  const { lang } = useLang()
  const title = pick(post.title, lang)
  const paragraphs = pick(post.content, lang)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)

  return (
    <article className="bg-nb-white pt-32 md:pt-40 pb-28 px-6">
      <div className="max-w-3xl mx-auto flex flex-col gap-10">
        {/* Back */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 self-start font-satoshi text-nb-black/50 text-xs tracking-widest uppercase hover:text-nb-black transition-colors duration-300"
        >
          <ArrowLeft size={14} />
          {copy[lang].backToBlog}
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-6">
          <span className="font-satoshi text-nb-black/40 text-xs tracking-widest uppercase">
            {formatDate(post.date, lang)}
          </span>
          <h1 className="font-stencil text-nb-black uppercase leading-tight text-4xl md:text-5xl text-balance">
            {title}
          </h1>
        </header>

        {/* Cover */}
        {post.coverImage && (
          <div className="border border-nb-black/10 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col gap-6">
          {paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`font-satoshi leading-relaxed ${
                i === 0 ? "text-nb-black/80 text-lg" : "text-nb-black/70 text-base"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Divider + footer note */}
        <div className="h-px bg-nb-black/10" />
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 self-start font-satoshi text-nb-highlight text-xs tracking-widest uppercase border border-nb-highlight px-6 py-3 hover:bg-nb-highlight hover:text-white transition-all duration-300"
        >
          <ArrowLeft size={14} />
          {copy[lang].backToBlog}
        </Link>
      </div>
    </article>
  )
}
