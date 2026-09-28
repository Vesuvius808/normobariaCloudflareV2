"use client"

import { useRef, useState } from "react"
import { ImageIcon, Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadImageAction } from "@/app/admin/actions"

interface ImageFieldProps {
  label: string
  value: string
  onChange: (path: string) => void
}

export function ImageField({ label, value, onChange }: ImageFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(file: File) {
    setUploading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append("file", file)
      const result = await uploadImageAction(formData)
      if (result.ok && result.path) {
        onChange(result.path)
      } else {
        setError(result.error ?? "Upload failed.")
      }
    } catch {
      setError("Upload failed.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium">{label}</span>
      <div className="flex items-start gap-4">
        <div className="w-40 h-24 shrink-0 rounded-md border border-neutral-200 bg-neutral-100 overflow-hidden flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon size={20} className="text-neutral-400" />
          )}
        </div>
        <div className="flex flex-col gap-2 grow">
          <code className="text-xs text-neutral-500 bg-neutral-100 rounded px-2 py-1 break-all">
            {value || "— no image —"}
          </code>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              <Upload size={14} className="mr-1" />
              {uploading ? "Uploading…" : "Upload image"}
            </Button>
            {value && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => onChange("")}
              >
                <Trash2 size={14} className="mr-1" />
                Remove
              </Button>
            )}
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) void handleFile(file)
              e.target.value = ""
            }}
          />
          <p className="text-xs text-neutral-400">PNG, JPG, WebP, SVG or GIF — max 5 MB.</p>
        </div>
      </div>
    </div>
  )
}
