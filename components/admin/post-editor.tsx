"use client"

import { useState } from "react"
import { ArrowLeft, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { LANGS } from "@/lib/admin-schema"
import type { BlogPost } from "@/lib/content"
import { slugify } from "@/lib/format"
import { ImageField } from "./image-field"

function emptyPost(): BlogPost {
  return {
    id: `post-${Date.now()}`,
    slug: "",
    published: false,
    date: new Date().toISOString().slice(0, 10),
    coverImage: null,
    title: { pl: "", en: "", uk: "" },
    excerpt: { pl: "", en: "", uk: "" },
    content: { pl: "", en: "", uk: "" },
  }
}

interface PostEditorProps {
  post: BlogPost | "new"
  onSave: (post: BlogPost) => string | null // returns error message or null on success
  onCancel: () => void
}

export function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [draft, setDraft] = useState<BlogPost>(post === "new" ? emptyPost() : post)
  const [lang, setLang] = useState<"pl" | "en" | "uk">("pl")
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  function setLocalized<K extends "title" | "excerpt" | "content">(
    key: K,
    value: string
  ) {
    setDraft((d) => ({ ...d, [key]: { ...d[key], [lang]: value } }))
  }

  function handleSave() {
    if (!draft.title.pl.trim() && !draft.title.en.trim() && !draft.title.uk.trim()) {
      setError("The post needs a title in at least one language.")
      return
    }
    if (!draft.slug.trim()) {
      setError("The post needs a URL slug (use the “Generate” button).")
      return
    }
    setSaving(true)
    const result = onSave({ ...draft, slug: slugify(draft.slug) })
    setSaving(false)
    setError(result)
  }

  const localizedField = (
    key: "title" | "excerpt" | "content",
    label: string,
    rows: number
  ) => (
    <div className="flex flex-col gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {key === "title" ? (
        <Input
          value={draft[key][lang]}
          onChange={(e) => setLocalized(key, e.target.value)}
          placeholder={draft[key].pl || "…"}
        />
      ) : (
        <Textarea
          rows={rows}
          value={draft[key][lang]}
          onChange={(e) => setLocalized(key, e.target.value)}
          placeholder={draft[key].pl || "…"}
        />
      )}
      {key === "content" && (
        <p className="text-xs text-neutral-400">
          Separate paragraphs with a blank line.
        </p>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          <ArrowLeft size={16} className="mr-1" />
          All posts
        </Button>
        <h2 className="text-lg font-semibold">
          {post === "new" ? "New post" : "Edit post"}
        </h2>
      </div>

      {/* Language tabs */}
      <div className="flex gap-1 bg-neutral-100 rounded-lg p-1 w-fit">
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            onClick={() => setLang(l.code)}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              lang === l.code
                ? "bg-white text-neutral-900 font-medium shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 max-w-2xl">
        {localizedField("title", "Title", 1)}
        {localizedField("excerpt", "Excerpt (short summary shown on cards)", 3)}
        {localizedField("content", "Content", 12)}
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-3xl border-t border-neutral-200 pt-6">
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">URL slug</Label>
          <div className="flex gap-2">
            <Input
              value={draft.slug}
              onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))}
              placeholder="my-post-url"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="shrink-0"
              onClick={() =>
                setDraft((d) => ({
                  ...d,
                  slug: slugify(d.title.pl || d.title.en || d.title.uk),
                }))
              }
            >
              <Wand2 size={14} className="mr-1" />
              Generate
            </Button>
          </div>
          <p className="text-xs text-neutral-400">
            Post address: /blog/{draft.slug || "…"}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label className="text-sm font-medium">Date</Label>
          <Input
            type="date"
            value={draft.date}
            onChange={(e) => setDraft((d) => ({ ...d, date: e.target.value }))}
          />
        </div>

        <div className="flex items-center gap-3">
          <Switch
            id="post-published"
            checked={draft.published}
            onCheckedChange={(v) => setDraft((d) => ({ ...d, published: v }))}
          />
          <Label htmlFor="post-published" className="text-sm">
            Published {draft.published ? "— visible on the site" : "— hidden draft"}
          </Label>
        </div>
      </div>

      <div className="max-w-3xl border-t border-neutral-200 pt-6">
        <ImageField
          label="Cover image"
          value={draft.coverImage ?? ""}
          onChange={(v) => setDraft((d) => ({ ...d, coverImage: v || null }))}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 max-w-3xl">{error}</p>
      )}

      <div className="flex gap-2">
        <Button type="button" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save post"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  )
}
