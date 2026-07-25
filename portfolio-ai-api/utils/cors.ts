/**
 * CORS helpers for Vercel serverless handlers.
 * Origins: ALLOWED_ORIGINS (comma-separated) merged with defaults.
 */

const DEFAULT_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://localhost:4173',
  'https://my-portfolio-tarun.vercel.app',
  'https://tarun-os-portfolio.vercel.app',
]

export function getAllowedOrigins(): string[] {
  const fromEnv = (process.env.ALLOWED_ORIGINS ?? '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean)
  return [...new Set([...DEFAULT_ORIGINS, ...fromEnv])]
}

export function resolveCorsOrigin(requestOrigin: string | undefined): string | null {
  if (!requestOrigin) return null
  const allowed = getAllowedOrigins()
  if (allowed.includes('*')) return requestOrigin
  return allowed.includes(requestOrigin) ? requestOrigin : null
}

export function corsHeaders(requestOrigin: string | undefined): Record<string, string> {
  const origin = resolveCorsOrigin(requestOrigin)
  const headers: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  }
  // Reflect allowed origin (never "*" — keeps things simple with fetch defaults)
  if (origin) {
    headers['Access-Control-Allow-Origin'] = origin
  }
  return headers
}

export function isOriginAllowed(requestOrigin: string | undefined): boolean {
  // No Origin header (curl / same-origin server calls) — allow
  if (!requestOrigin) return true
  return resolveCorsOrigin(requestOrigin) !== null
}
