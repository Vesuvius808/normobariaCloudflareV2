import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getPosts, getSiteContent } from "@/lib/content"
import { isAuthenticated, isAuthConfigured, usingDefaultPassword } from "@/lib/admin-auth"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin — Normovita",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  // Production without ADMIN_PASSWORD: return a real 404 — no login form,
  // no hints, no default password for anyone to probe.
  if (!isAuthConfigured()) notFound()

  if (!(await isAuthenticated())) {
    return <AdminLogin defaultPassword={usingDefaultPassword()} />
  }

  return (
    <AdminDashboard
      site={getSiteContent()}
      posts={getPosts()}
      defaultPassword={usingDefaultPassword()}
    />
  )
}
