import crypto from "node:crypto"
import { cookies } from "next/headers"

const COOKIE_NAME = "nb_admin"
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7 // 7 days

export const DEFAULT_PASSWORD = "admin123"

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD?.trim() || DEFAULT_PASSWORD
}

export function usingDefaultPassword(): boolean {
  return !process.env.ADMIN_PASSWORD?.trim()
}

/**
 * Admin login is only allowed when a real password is configured.
 * In local dev the default password is tolerated for convenience;
 * in production the panel stays locked until ADMIN_PASSWORD is set.
 */
export function isAuthConfigured(): boolean {
  if (process.env.NODE_ENV !== "production") return true
  return !usingDefaultPassword()
}

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET?.trim() || `nb-admin-secret:${getAdminPassword()}`
}

function sign(payload: string): string {
  return crypto.createHmac("sha256", getSecret()).update(payload).digest("hex")
}

function createToken(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000
  return `${expires}.${sign(String(expires))}`
}

function verifyToken(token: string): boolean {
  const [expires, signature] = token.split(".")
  if (!expires || !signature) return false
  const expected = Buffer.from(sign(expires))
  const received = Buffer.from(signature)
  if (expected.length !== received.length) return false
  return crypto.timingSafeEqual(expected, received) && Number(expires) > Date.now()
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const token = store.get(COOKIE_NAME)?.value
  if (!token) return false
  return verifyToken(token)
}

export async function setSessionCookie(): Promise<void> {
  const store = await cookies()
  store.set(COOKIE_NAME, createToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
    secure: process.env.NODE_ENV === "production",
  })
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
