import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildGitHubStats, resolveGitHubConfig } from '../../lib/github-stats.js'
import { corsHeaders, isOriginAllowed } from '../../utils/cors.js'

/**
 * GET /api/github/stats
 * Aggregates public GitHub profile stats. Token stays server-side.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined

  if (req.method === 'OPTIONS') {
    if (!isOriginAllowed(origin)) {
      return res.status(403).json({ error: 'Origin not allowed.' })
    }
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      res.setHeader(key, value)
    }
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      res.setHeader(key, value)
    }
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  if (!isOriginAllowed(origin)) {
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      res.setHeader(key, value)
    }
    return res.status(403).json({ error: 'Origin not allowed.' })
  }

  try {
    const { username, token } = resolveGitHubConfig()
    const stats = await buildGitHubStats(username, token)
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      res.setHeader(key, value)
    }
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(stats)
  } catch (err) {
    console.error('[api/github/stats]', err)
    for (const [key, value] of Object.entries(corsHeaders(origin))) {
      res.setHeader(key, value)
    }
    return res.status(502).json({
      error: err instanceof Error ? err.message : 'GitHub fetch failed',
    })
  }
}
