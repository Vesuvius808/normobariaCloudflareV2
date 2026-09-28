"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { LANGS, type Field, type ListField, type SimpleField } from "@/lib/admin-schema"
import { ImageField } from "./image-field"

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = Record<string, any>

function getIn(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    return acc && typeof acc === "object" ? (acc as Any)[key] : undefined
  }, obj)
}

function setIn(rootObj: unknown, path: string, value: unknown): Any {
  const keys = path.split(".")
  const clone = (o: unknown): unknown => (Array.isArray(o) ? [...o] : { ...(o as Any) })
  const root = clone(rootObj) as Any
  let cursor: Any = root
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    cursor[key] = clone(cursor[key])
    cursor = cursor[key] as Any
  }
  cursor[keys[keys.length - 1]] = value
  return root
}

interface FieldControlProps {
  field: SimpleField
  obj: Any
  path: string
  onSet: (path: string, value: unknown) => void
}

function FieldControl({ field, obj, path, onSet }: FieldControlProps) {
  const raw = getIn(obj, path)

  if (field.type === "image") {
    return (
      <ImageField
        label={field.label}
        value={typeof raw === "string" ? raw : ""}
        onChange={(v) => onSet(path, v)}
      />
    )
  }

  const value =
    field.type === "lines"
      ? Array.isArray(raw)
        ? raw.filter((x) => typeof x === "string").join("\n")
        : ""
      : typeof raw === "string"
        ? raw
        : ""

  const id = `field-${path.replace(/[^a-z0-9]+/gi, "-")}`

  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor={id} className="text-sm font-medium">
        {field.label}
      </Label>
      {field.type === "text" && (
        <Input id={id} value={value} onChange={(e) => onSet(path, e.target.value)} />
      )}
      {(field.type === "textarea" || field.type === "lines") && (
        <Textarea
          id={id}
          rows={field.rows ?? 3}
          value={value}
          onChange={(e) => onSet(path, field.type === "lines" ? e.target.value.split("\n") : e.target.value)}
        />
      )}
      {field.type === "select" && (
        <select
          id={id}
          value={value}
          onChange={(e) => onSet(path, e.target.value)}
          className="h-9 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm shadow-xs"
        >
          {(field.options ?? []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}
      {field.hint && <p className="text-xs text-neutral-400">{field.hint}</p>}
    </div>
  )
}

function ListControl({
  field,
  obj,
  path,
  onSet,
}: {
  field: ListField
  obj: Any
  path: string
  onSet: (path: string, value: unknown) => void
}) {
  const raw = getIn(obj, path)
  const items: Any[] = Array.isArray(raw) ? raw : []
  const stringMode = field.stringItems === true
  const subLangs = field.fields.filter((f) => f.langs)

  function updateItem(index: number, subKey: string, value: unknown) {
    const next = items.map((item, i) => {
      if (i !== index) return item
      return stringMode ? value : setIn(item, subKey, value)
    })
    onSet(path, next)
  }

  function addItem() {
    if (stringMode) {
      onSet(path, [...items, ""])
      return
    }
    const item: Any = {}
    for (const sub of field.fields) {
      item[sub.key] = sub.type === "select" ? (sub.options?.[0]?.value ?? "") : ""
    }
    onSet(path, [...items, item])
  }

  function removeItem(index: number) {
    onSet(
      path,
      items.filter((_, i) => i !== index)
    )
  }

  function moveItem(index: number, dir: -1 | 1) {
    const target = index + dir
    if (target < 0 || target >= items.length) return
    const next = [...items]
    ;[next[index], next[target]] = [next[target], next[index]]
    onSet(path, next)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{field.label}</span>
        <Button type="button" variant="outline" size="sm" onClick={addItem}>
          <Plus size={14} className="mr-1" />
          Add
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item, index) => (
          <div key={index} className="border border-neutral-200 rounded-md bg-white">
            <div className="flex items-center justify-between px-3 py-2 border-b border-neutral-100">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                {field.itemLabel} {index + 1}
              </span>
              <div className="flex items-center gap-1">
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                  <ArrowUp size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                  <ArrowDown size={14} />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7 text-red-600 hover:text-red-700" onClick={() => removeItem(index)}>
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
            <div className="p-3 flex flex-col gap-3">
              {stringMode ? (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium">
                    {field.fields[0]?.label ?? "Value"}
                  </Label>
                  <Input
                    value={typeof item === "string" ? item : ""}
                    onChange={(e) => updateItem(index, "", e.target.value)}
                    placeholder={field.fields[0]?.hint ?? ""}
                  />
                </div>
              ) : (
                <>
                  {field.fields
                    .filter((sub) => !sub.langs)
                    .map((sub) => (
                      <FieldControl
                        key={sub.key}
                        field={sub}
                        obj={item}
                        path={`${path}.${index}.${sub.key}`}
                        onSet={(_, value) => updateItem(index, sub.key, value)}
                      />
                    ))}
                  {subLangs.length > 0 && (
                    <details className="border border-neutral-100 rounded">
                      <summary className="px-3 py-2 text-xs text-neutral-500 cursor-pointer select-none">
                        Translations (PL / EN / UK)
                      </summary>
                      <div className="p-3 pt-0 flex flex-col gap-3">
                        {LANGS.map((lang) => (
                          <div key={lang.code} className="flex flex-col gap-2">
                            <span className="text-xs font-semibold text-neutral-400 uppercase">{lang.label}</span>
                            {subLangs.map((sub) => (
                              <FieldControl
                                key={sub.key}
                                field={sub}
                                obj={item}
                                path={`${path}.${index}.${sub.key}.${lang.code}`}
                                onSet={(_, value) => updateItem(index, `${sub.key}.${lang.code}`, value)}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </details>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-neutral-400 border border-dashed border-neutral-200 rounded-md p-3 text-center">
            No items — click “Add”.
          </p>
        )}
      </div>
    </div>
  )
}

interface ContentEditorProps {
  fields: Field[]
  value: Any
  onChange: (next: Any) => void
}

export function ContentEditor({ fields, value, onChange }: ContentEditorProps) {
  const [lang, setLang] = useState<"pl" | "en" | "uk">("pl")
  const shared = fields.filter((f) => !f.langs)
  const localized = fields.filter((f) => f.langs)

  const handleSet = (path: string, val: unknown) => onChange(setIn(value, path, val))

  return (
    <div className="flex flex-col gap-8">
      {shared.length > 0 && (
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
            General
          </span>
          {shared.map((f) =>
            f.type === "list" ? (
              <ListControl key={f.key} field={f} obj={value} path={f.key} onSet={handleSet} />
            ) : (
              <FieldControl key={f.key} field={f} obj={value} path={f.key} onSet={handleSet} />
            )
          )}
        </div>
      )}

      {localized.length > 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Languages
            </span>
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
          </div>
          {localized.map((f) =>
            f.type === "list" ? (
              <ListControl
                key={f.key}
                field={f}
                obj={value}
                path={`${f.key}.${lang}`}
                onSet={handleSet}
              />
            ) : (
              <FieldControl
                key={f.key}
                field={f}
                obj={value}
                path={`${f.key}.${lang}`}
                onSet={handleSet}
              />
            )
          )}
        </div>
      )}
    </div>
  )
}
