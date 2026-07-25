import type { Plugin, PreviewServer, ViteDevServer } from 'vite'
import { loadEnv } from 'vite'
import { buildGitHubStats, resolveGitHubConfig } from './server/githubStats.ts'

function attachGitHubApi(server: ViteDevServer | PreviewServer, mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  const { username, token } = resolveGitHubConfig(env)

  server.middlewares.use(async (req, res, next) => {
    if (!req.url?.startsWith('/api/github/stats')) return next()

    try {
      const stats = await buildGitHubStats(username, token)
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Cache-Control', 'public, max-age=300')
      res.end(JSON.stringify(stats))
    } catch (err) {
      res.statusCode = 502
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({
          error: err instanceof Error ? err.message : 'GitHub fetch failed',
        }),
      )
    }
  })
}

/** Dev/preview only — production uses `api/github/stats.ts` on Vercel. */
export function githubApiPlugin(): Plugin {
  return {
    name: 'github-api',
    configureServer(server) {
      attachGitHubApi(server, server.config.mode)
    },
    configurePreviewServer(server) {
      attachGitHubApi(server, 'production')
    },
  }
}
