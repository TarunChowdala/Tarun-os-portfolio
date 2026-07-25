import type { VercelRequest, VercelResponse } from '@vercel/node'
import { buildGitHubStats, resolveGitHubConfig } from '../../server/githubStats.js'

/**
 * GET /api/github/stats
 * Server-side GitHub aggregation — GITHUB_TOKEN never reaches the browser.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    return res.status(204).end()
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed. Use GET.' })
  }

  try {
    const { username, token } = resolveGitHubConfig()
    const stats = await buildGitHubStats(username, token)
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600')
    return res.status(200).json(stats)
  } catch (err) {
    console.error('[api/github/stats]', err)
    return res.status(502).json({
      error: err instanceof Error ? err.message : 'GitHub fetch failed',
    })
  }
}
