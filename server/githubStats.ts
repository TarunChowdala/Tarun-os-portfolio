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

type GhHeaders = Record<string, string>

function ghHeaders(token?: string): GhHeaders {
  const headers: GhHeaders = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'tarun-ai-os',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

async function fetchJson<T>(url: string, headers: GhHeaders): Promise<T> {
  const res = await fetch(url, { headers })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GitHub ${res.status}: ${body.slice(0, 200)}`)
  }
  return res.json() as Promise<T>
}

export async function buildGitHubStats(
  username: string,
  token?: string,
): Promise<GitHubLiveStats> {
  const headers = ghHeaders(token)

  const user = await fetchJson<{
    public_repos: number
    followers: number
    following: number
  }>(`https://api.github.com/users/${username}`, headers)

  const repos: Array<{
    stargazers_count: number
    language: string | null
    fork: boolean
  }> = []
  for (let page = 1; page <= 3; page++) {
    const batch = await fetchJson<typeof repos>(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`,
      headers,
    )
    repos.push(...batch)
    if (batch.length < 100) break
  }

  const owned = repos.filter((r) => !r.fork)
  const stars = owned.reduce((sum, r) => sum + r.stargazers_count, 0)
  const languages: Record<string, number> = {}
  for (const r of owned) {
    if (!r.language) continue
    languages[r.language] = (languages[r.language] ?? 0) + 1
  }
  const topLanguage =
    Object.entries(languages).sort((a, b) => b[1] - a[1])[0]?.[0] ?? '—'

  let commits90d = 0
  let totalContributions = 0
  let heatmap: number[] = []
  let prs = 0

  if (token) {
    const gql = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query($login: String!) {
            user(login: $login) {
              contributionsCollection {
                totalCommitContributions
                restrictedContributionsCount
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays { contributionCount date }
                  }
                }
              }
              pullRequests(states: MERGED) { totalCount }
            }
          }
        `,
        variables: { login: username },
      }),
    })

    if (gql.ok) {
      const data = (await gql.json()) as {
        data?: {
          user?: {
            contributionsCollection?: {
              totalCommitContributions: number
              contributionCalendar: {
                totalContributions: number
                weeks: Array<{
                  contributionDays: Array<{ contributionCount: number; date: string }>
                }>
              }
            }
            pullRequests?: { totalCount: number }
          }
        }
      }

      const collection = data.data?.user?.contributionsCollection
      if (collection) {
        totalContributions = collection.contributionCalendar.totalContributions
        const days = collection.contributionCalendar.weeks.flatMap((w) => w.contributionDays)
        const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000
        commits90d = days
          .filter((d) => new Date(d.date).getTime() >= cutoff)
          .reduce((s, d) => s + d.contributionCount, 0)
        heatmap = days.map((d) => d.contributionCount)
      }
      prs = data.data?.user?.pullRequests?.totalCount ?? 0
    }
  } else {
    try {
      const events = await fetchJson<Array<{ type: string; created_at: string }>>(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        headers,
      )
      const cutoff = Date.now() - 90 * 24 * 60 * 60 * 1000
      commits90d = events.filter(
        (e) =>
          e.type === 'PushEvent' && new Date(e.created_at).getTime() >= cutoff,
      ).length
    } catch {
      /* ignore */
    }
  }

  return {
    username,
    repos: user.public_repos,
    stars,
    followers: user.followers,
    following: user.following,
    commits90d,
    totalContributions,
    prs,
    topLanguage,
    languages,
    heatmap,
    authenticated: Boolean(token),
    fetchedAt: new Date().toISOString(),
  }
}

export function resolveGitHubConfig(env: Record<string, string | undefined> = process.env) {
  const username =
    env.GITHUB_USERNAME?.trim() ||
    env.VITE_GITHUB_USERNAME?.trim() ||
    'TarunChowdala'
  const token = env.GITHUB_TOKEN?.trim() || undefined
  return { username, token }
}
