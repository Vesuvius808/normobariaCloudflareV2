"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginAction } from "@/app/admin/actions"

export function AdminLogin({ defaultPassword }: { defaultPassword: boolean }) {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const result = await loginAction(password)
    if (result.ok) {
      router.refresh()
    } else {
      setError(result.error ?? "Login failed.")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-8 flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center">
              <Lock size={16} />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Normovita — Admin</h1>
              <p className="text-sm text-neutral-500">Enter the admin password</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Checking…" : "Log in"}
            </Button>
          </form>

          {defaultPassword && (
            <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
              Using the default password <code className="font-mono">admin123</code> —
              set <code className="font-mono">ADMIN_PASSWORD</code> in{" "}
              <code className="font-mono">.env.local</code> to change it.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
