"use client"

import { useState } from "react"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import type { BlogPost } from "@/lib/content"
import { pick } from "@/lib/format"
import { PostEditor } from "./post-editor"

interface PostManagerProps {
  posts: BlogPost[]
  onPersist: (posts: BlogPost[]) => Promise<string | null> // returns error or null
}

export function PostManager({ posts, onPersist }: PostManagerProps) {
  const [editing, setEditing] = useState<BlogPost | "new" | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sorted = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))

  async function persist(next: BlogPost[]) {
    const err = await onPersist(next)
    setError(err)
    return err
  }

  async function handleSave(post: BlogPost): Promise<string | null> {
    const exists = posts.some((p) => p.id === post.id)
    const next = exists
      ? posts.map((p) => (p.id === post.id ? post : p))
      : [...posts, post]
    const err = await persist(next)
    if (!err) setEditing(null)
    return err
  }

  async function togglePublished(post: BlogPost, published: boolean) {
    await persist(posts.map((p) => (p.id === post.id ? { ...p, published } : p)))
  }

  async function handleDelete(post: BlogPost) {
    const title = pick(post.title, "pl") || post.slug
    if (!window.confirm(`Delete “${title}” permanently?`)) return
    await persist(posts.filter((p) => p.id !== post.id))
  }

  if (editing) {
    return (
      <PostEditor
        post={editing}
        onSave={(post) => {
          void handleSave(post)
          return null // PostEditor handles its own async state; errors surface via `error` below
        }}
        onCancel={() => setEditing(null)}
      />
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Posts <span className="text-neutral-400 font-normal">({posts.length})</span>
        </h2>
        <Button type="button" size="sm" onClick={() => setEditing("new")}>
          <Plus size={14} className="mr-1" />
          New post
        </Button>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {posts.length === 0 ? (
        <div className="border border-dashed border-neutral-200 rounded-lg p-8 text-center text-neutral-400 text-sm">
          No blog posts. When there are no published posts, the blog section is
          completely hidden on the website.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((post) => (
            <div
              key={post.id}
              className="flex items-center gap-4 border border-neutral-200 rounded-lg bg-white p-3"
            >
              <div className="w-20 h-12 shrink-0 rounded border border-neutral-100 bg-neutral-100 overflow-hidden flex items-center justify-center">
                {post.coverImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
              <div className="grow min-w-0">
                <p className="text-sm font-medium truncate">
                  {pick(post.title, "pl") || post.slug}
                </p>
                <p className="text-xs text-neutral-400 truncate">
                  {post.date} · /blog/{post.slug}
                </p>
              </div>
              <Switch
                checked={post.published}
                onCheckedChange={(v) => void togglePublished(post, v)}
                aria-label="Toggle published"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => setEditing(post)}>
                <Pencil size={14} className="mr-1" />
                Edit
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="text-red-600 hover:text-red-700"
                onClick={() => void handleDelete(post)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-neutral-400">
        Tip: a post with “Published” off stays as a hidden draft. Deleting a post
        cannot be undone.
      </p>
    </div>
  )
}
