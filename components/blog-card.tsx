"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLang } from "@/context/language-context"
import type { BlogPost, SiteContent } from "@/lib/content"
import { formatDate, pick } from "@/lib/format"

interface BlogCardProps {
  post: BlogPost
  copy: SiteContent["blog"]["copy"]
}

export function BlogCard({ post, copy }: BlogCardProps) {
  const { lang } = useLang()
  const title = pick(post.title, lang)
  const excerpt = pick(post.excerpt, lang)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-nb-black/10 bg-nb-white hover:border-nb-highlight/60 transition-colors duration-300"
    >
      {/* Cover */}
      <div className="aspect-[16/9] bg-nb-highlight/10 overflow-hidden relative">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-nb-black/5">
            <span className="font-stencil text-nb-black/20 text-4xl uppercase">
              Normovita
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-8 flex flex-col gap-3 grow">
        <span className="font-satoshi text-nb-black/40 text-xs tracking-widest uppercase">
          {formatDate(post.date, lang)}
        </span>
        <h3 className="font-stencil text-nb-black text-xl uppercase leading-snug group-hover:text-nb-highlight transition-colors duration-300">
          {title}
        </h3>
        <p className="font-satoshi text-nb-black/60 text-sm leading-relaxed">
          {excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-2 font-satoshi text-nb-highlight text-xs tracking-widest uppercase pt-2">
          {copy[lang].readMore}
          <ArrowRight
            size={14}
            className="group-hover:translate-x-1 transition-transform duration-300"
          />
        </span>
      </div>
    </Link>
  )
}
