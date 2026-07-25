import { useEffect, useState } from 'react'

export interface GitHubLiveStats {
  username: string
  repos: number
  stars: number
  followers: number
  following: number
  commits90d: number
  totalContributions: number
  prs: number
  topLanguage: string
  languages: Record<string, number>
  heatmap: number[]
  authenticated: boolean
  fetchedAt: string
}

interface State {
  stats: GitHubLiveStats | null
  loading: boolean
  error: string | null
}

export function useGitHubStats() {
  const [state, setState] = useState<State>({
    stats: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch('/api/github/stats')
        if (!res.ok) {
          const body = (await res.json().catch(() => null)) as { error?: string } | null
          throw new Error(body?.error ?? `HTTP ${res.status}`)
        }
        const stats = (await res.json()) as GitHubLiveStats
        if (!cancelled) setState({ stats, loading: false, error: null })
      } catch (err) {
        if (!cancelled) {
          setState({
            stats: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load GitHub stats',
          })
        }
      }
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
