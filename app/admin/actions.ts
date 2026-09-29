"use server"

import fs from "node:fs"
import path from "node:path"
import { revalidatePath } from "next/cache"
import {
  clearSessionCookie,
  getAdminPassword,
  isAuthenticated,
  isAuthConfigured,
  setSessionCookie,
} from "@/lib/admin-auth"
import { deepMerge, savePosts, saveSiteContent, type BlogPost } from "@/lib/content"
import rawSite from "@/data/site.json"

export interface ActionResult {
  ok: boolean
  error?: string
}

export interface UploadResult extends ActionResult {
  path?: string
}

async function checkAuth(): Promise<string | null> {
  if (!isAuthConfigured()) {
    return "Admin actions are disabled on this deployment."
  }
  if (await isAuthenticated()) return null
  return "Your session has expired. Please log in again."
}

export async function loginAction(password: string): Promise<ActionResult> {
  if (!isAuthConfigured()) {
    return {
      ok: false,
      error: "Admin login is disabled on this deployment. Set the ADMIN_PASSWORD environment variable to enable it.",
    }
  }
  if (!password) return { ok: false, error: "Enter the password." }
  if (password !== getAdminPassword()) return { ok: false, error: "Incorrect password." }
  await setSessionCookie()
  revalidatePath("/admin")
  return { ok: true }
}

export async function logoutAction(): Promise<ActionResult> {
  await clearSessionCookie()
  revalidatePath("/admin")
  return { ok: true }
}

export async function saveSiteAction(content: unknown): Promise<ActionResult> {
  const authError = await checkAuth()
  if (authError) return { ok: false, error: authError }
  if (typeof content !== "object" || content === null || Array.isArray(content)) {
    return { ok: false, error: "Invalid content data." }
  }
  try {
    saveSiteContent(content)
    revalidatePath("/", "layout")
    return { ok: true }
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code
    return {
      ok: false,
      error: code && ["ENOENT", "EROFS", "EACCES"].includes(code)
        ? "Could not write to data/site.json — saving only works in local dev (deployed site is read-only)."
        : "Failed to save changes.",
    }
  }
}

export async function savePostsAction(posts: unknown): Promise<ActionResult> {
  const authError = await checkAuth()
  if (authError) return { ok: false, error: authError }
  if (!Array.isArray(posts)) return { ok: false, error: "Invalid posts data." }
  for (const post of posts) {
    if (typeof post?.id !== "string" || typeof post?.slug !== "string" || !post.slug.trim()) {
      return { ok: false, error: "Every post needs an id and a slug." }
    }
  }
  try {
    savePosts(posts as BlogPost[])
    revalidatePath("/", "layout")
    return { ok: true }
  } catch {
    return {
      ok: false,
      error:
        "Could not write to data/blog.json — saving only works in local dev (deployed site is read-only).",
    }
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads")
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024
const ALLOWED: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/svg+xml": "svg",
  "image/gif": "gif",
}

export async function uploadImageAction(formData: FormData): Promise<UploadResult> {
  const authError = await checkAuth()
  if (authError) return { ok: false, error: authError }

  const file = formData.get("file")
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false, error: "No file selected." }
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "File is larger than 5 MB." }
  }
  const ext = ALLOWED[file.type]
  if (!ext) {
    return { ok: false, error: "Unsupported file type. Use PNG, JPG, WebP, SVG or GIF." }
  }

  try {
    const base = file.name
      .replace(/\.[^.]+$/, "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40) || "image"
    const filename = `${Date.now()}-${base}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())
    fs.mkdirSync(UPLOAD_DIR, { recursive: true })
    fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer)
    return { ok: true, path: `/uploads/${filename}` }
  } catch {
    return {
      ok: false,
      error:
        "Upload failed — saving files only works in local dev (deployed site is read-only).",
    }
  }
}

/** Preview helper used by the editor to sanity-check the current draft. */
export async function getMergedPreview(content: unknown): Promise<unknown> {
  const authError = await checkAuth()
  if (authError) return rawSite
  return deepMerge(rawSite, content)
}
