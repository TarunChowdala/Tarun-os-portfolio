/**
 * CORS helpers for Vercel serverless handlers.
 * Origins come from ALLOWED_ORIGINS (comma-separated). Defaults allow local Vite.
 */

const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://my-portfolio-tarun.vercel.app',
]

export function getAllowedOrigins(): string[] {
  const raw = process.env.ALLOWED_ORIGINS?.trim()
  if (!raw) return DEFAULT_ORIGINS
  return raw
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
}

export function resolveCorsOrigin(requestOrigin: string | undefined): string | null {
  if (!requestOrigin) return null
  const allowed = getAllowedOrigins()
  if (allowed.includes('*')) return '*'
  return allowed.includes(requestOrigin) ? requestOrigin : null
}

export function corsHeaders(requestOrigin: string | undefined): Record<string, string> {
  const origin = resolveCorsOrigin(requestOrigin)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin
  }
  return headers
}

export function isOriginAllowed(requestOrigin: string | undefined): boolean {
  // No Origin header (server-to-server / curl) — allow
  if (!requestOrigin) return true
  return resolveCorsOrigin(requestOrigin) !== null
}
