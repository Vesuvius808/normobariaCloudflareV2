"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ExternalLink, Loader2, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logoutAction, savePostsAction, saveSiteAction } from "@/app/admin/actions"
import { CONTENT_SECTIONS } from "@/lib/admin-schema"
import type { BlogPost, SiteContent } from "@/lib/content"
import { ContentEditor } from "./content-editor"
import { PostManager } from "./post-manager"

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = Record<string, any>

interface AdminDashboardProps {
  site: SiteContent
  posts: BlogPost[]
  defaultPassword: boolean
}

export function AdminDashboard({ site, posts, defaultPassword }: AdminDashboardProps) {
  const router = useRouter()
  const [tab, setTab] = useState<"content" | "blog">("content")
  const [activeSection, setActiveSection] = useState(CONTENT_SECTIONS[0].key)
  const [siteDraft, setSiteDraft] = useState<Any>(site)
  const [postsDraft, setPostsDraft] = useState<BlogPost[]>(posts)
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null)
  const [saving, setSaving] = useState(false)

  function flashStatus(ok: boolean, text: string) {
    setStatus({ ok, text })
    setTimeout(() => setStatus(null), 4000)
  }

  async function handleSaveSite() {
    setSaving(true)
    const result = await saveSiteAction(siteDraft)
    flashStatus(result.ok, result.ok ? "Changes saved ✓" : result.error ?? "Failed to save.")
    setSaving(false)
  }

  async function handlePersistPosts(next: BlogPost[]): Promise<string | null> {
    setPostsDraft(next)
    setSaving(true)
    const result = await savePostsAction(next)
    flashStatus(result.ok, result.ok ? "Blog saved ✓" : result.error ?? "Failed to save.")
    setSaving(false)
    return result.ok ? null : (result.error ?? "Failed to save.")
  }

  async function handleLogout() {
    await logoutAction()
    router.refresh()
  }

  const section = CONTENT_SECTIONS.find((s) => s.key === activeSection) ?? CONTENT_SECTIONS[0]

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold tracking-wide">NORMOVITA</span>
            <span className="text-xs text-neutral-400 uppercase tracking-widest">Admin</span>
          </div>
          <div className="flex items-center gap-2">
            {status && (
              <span className={`text-xs ${status.ok ? "text-emerald-600" : "text-red-600"}`}>
                {status.text}
              </span>
            )}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-neutral-500 hover:text-neutral-900 inline-flex items-center gap-1 px-2 py-1"
            >
              View site <ExternalLink size={12} />
            </a>
            <Button type="button" variant="ghost" size="sm" onClick={() => void handleLogout()}>
              <LogOut size={14} className="mr-1" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      {defaultPassword && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-700 text-xs px-4 py-2 max-w-6xl mx-auto">
          Security notice: the admin panel is using the default password{" "}
          <code className="font-mono">admin123</code>. Set{" "}
          <code className="font-mono">ADMIN_PASSWORD</code> in{" "}
          <code className="font-mono">.env.local</code> and restart the dev server to change it.
        </div>
      )}

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex gap-1 bg-neutral-100 rounded-lg p-1 w-fit">
          {(
            [
              { key: "content", label: "Site content" },
              { key: "blog", label: "Blog" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                tab === t.key
                  ? "bg-white text-neutral-900 font-medium shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {tab === "content" ? (
          <div className="grid lg:grid-cols-[220px_1fr] gap-8 items-start">
            {/* Section nav */}
            <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:sticky lg:top-20">
              {CONTENT_SECTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setActiveSection(s.key)}
                  className={`text-left text-sm px-3 py-2 rounded-md whitespace-nowrap transition-colors ${
                    activeSection === s.key
                      ? "bg-neutral-900 text-white"
                      : "text-neutral-600 hover:bg-neutral-200/70"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </nav>

            {/* Editor */}
            <div className="flex flex-col gap-6 min-w-0">
              <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-4">
                <div>
                  <h1 className="text-lg font-semibold">{section.label}</h1>
                  <p className="text-sm text-neutral-500">{section.description}</p>
                </div>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => void handleSaveSite()}
                  disabled={saving}
                  className="shrink-0"
                >
                  {saving && tab === "content" ? (
                    <Loader2 size={14} className="mr-1 animate-spin" />
                  ) : null}
                  Save changes
                </Button>
              </div>
              <ContentEditor
                key={activeSection}
                fields={section.fields}
                value={(siteDraft as Any)[section.key] ?? {}}
                onChange={(next) =>
                  setSiteDraft((prev) => ({ ...prev, [section.key]: next }))
                }
              />
              <div className="border-t border-neutral-200 pt-4">
                <Button type="button" onClick={() => void handleSaveSite()} disabled={saving}>
                  {saving ? "Saving…" : "Save changes"}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <PostManager posts={postsDraft} onPersist={handlePersistPosts} />
        )}
      </main>
    </div>
  )
}
