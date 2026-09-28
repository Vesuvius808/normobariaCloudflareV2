import type { Metadata } from "next"
import { getPosts, getSiteContent } from "@/lib/content"
import { isAuthenticated, usingDefaultPassword } from "@/lib/admin-auth"
import { AdminLogin } from "@/components/admin/admin-login"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Admin — Normovita",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
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
