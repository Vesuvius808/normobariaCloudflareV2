import fs from "node:fs"
import path from "node:path"
import rawSite from "@/data/site.json"
import rawBlog from "@/data/blog.json"
import type { Localized } from "@/lib/format"

export interface BlogPost {
  id: string
  slug: string
  published: boolean
  date: string // YYYY-MM-DD
  coverImage: string | null
  title: Localized
  excerpt: Localized
  content: Localized
}

export type SiteContent = typeof rawSite

const SITE_PATH = path.join(process.cwd(), "data", "site.json")
const BLOG_PATH = path.join(process.cwd(), "data", "blog.json")

function readJson<T>(filePath: string, fallback: T): T {
  if (process.env.NODE_ENV !== "development") return fallback
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8")) as T
  } catch {
    return fallback
  }
}

function writeJson(filePath: string, data: unknown) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf8")
}

/**
 * Recursively merges `saved` over `defaults`.
 * Objects are merged key-by-key, everything else (arrays, strings) is replaced.
 * Guarantees the site still renders if an older/partial save is missing keys.
 */
export function deepMerge<T>(defaults: T, saved: unknown): T {
  if (
    typeof defaults === "object" &&
    defaults !== null &&
    !Array.isArray(defaults) &&
    typeof saved === "object" &&
    saved !== null &&
    !Array.isArray(saved)
  ) {
    const result: Record<string, unknown> = { ...(defaults as Record<string, unknown>) }
    for (const [key, value] of Object.entries(saved as Record<string, unknown>)) {
      const def = (defaults as Record<string, unknown>)[key]
      result[key] = key in (defaults as Record<string, unknown>) ? deepMerge(def, value) : value
    }
    return result as T
  }
  if (saved === undefined) return defaults
  return saved as T
}

/** Site content: fresh from disk in dev, bundled JSON in production builds. */
export function getSiteContent(): SiteContent {
  const saved = readJson<unknown>(SITE_PATH, rawSite)
  return deepMerge(rawSite, saved)
}

export function saveSiteContent(content: unknown) {
  const merged = deepMerge(rawSite, content)
  writeJson(SITE_PATH, merged)
}

export function getPosts(): BlogPost[] {
  const saved = readJson<unknown[]>(BLOG_PATH, rawBlog as unknown as unknown[])
  if (!Array.isArray(saved)) return rawBlog as unknown as BlogPost[]
  return saved as BlogPost[]
}

export function getPublishedPosts(): BlogPost[] {
  return getPosts()
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function savePosts(posts: BlogPost[]) {
  writeJson(BLOG_PATH, posts)
}
