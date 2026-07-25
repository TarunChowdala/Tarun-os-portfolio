import { motion } from 'framer-motion'
import type { RefObject } from 'react'
import {
  Activity,
  Boxes,
  GitBranch,
  GitCommitHorizontal,
  Plug,
  Rocket,
  Star,
} from 'lucide-react'
import { SITE } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { fadeUp, stagger, useReveal } from '@/hooks/useReveal'
import { useProximityGlow } from '@/hooks/useProximityGlow'
import { useGitHubStats, type GitHubLiveStats } from '@/hooks/useGitHubStats'
import { cn } from '@/lib/utils'

const USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME || SITE.githubUsername || 'TarunChowdala'

const WIDGET_META: Record<string, { title: string; icon: typeof GitBranch }> = {
  commits: { title: 'Commits', icon: GitCommitHorizontal },
  stars: { title: 'Stars', icon: Star },
  repos: { title: 'Repositories', icon: Boxes },
  langs: { title: 'Languages', icon: Activity },
  streak: { title: 'Activity', icon: Activity },
  prs: { title: 'Merged PRs', icon: Rocket },
}

function heatColor(count: number, max: number) {
  if (count <= 0) return 'rgba(91,159,212,0.06)'
  const t = Math.min(1, count / Math.max(max, 1))
  return `rgba(91,159,212,${0.12 + t * 0.7})`
}

function MonitorWidget({
  id,
  value,
  hint,
  loading,
  live,
  spark,
}: {
  id: string
  value: string
  hint: string
  loading: boolean
  live: boolean
  spark?: number[]
}) {
  const meta = WIDGET_META[id] ?? { title: id, icon: GitBranch }
  const Icon = meta.icon
  const { ref, onPointerMove, onPointerLeave } = useProximityGlow()
  const bars = spark?.length
    ? spark.slice(-14)
    : Array.from({ length: 14 }, (_, i) => 4 + ((i * 7) % 18))

  return (
    <motion.div
      variants={fadeUp}
      ref={ref as RefObject<HTMLDivElement>}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(
        'proximity-card border-glow glass relative overflow-hidden rounded-[var(--radius-xl)] p-5',
        'hover:border-white/15 hover:shadow-[0_16px_40px_-24px_rgba(91,159,212,0.4)]',
      )}
    >
      <div className="relative z-[1]">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.04] text-[var(--color-accent)]">
              <Icon className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)]">
                Monitor
              </p>
              <p className="text-sm font-medium">{meta.title}</p>
            </div>
          </div>
          <span
            className={cn(
              'flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px]',
              live
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                : 'bg-white/5 text-[var(--color-warning)]',
            )}
          >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full',
                live ? 'bg-[var(--color-success)]' : 'bg-[var(--color-warning)]',
              )}
            />
            {live ? 'live' : 'offline'}
          </span>
        </div>

        {loading ? (
          <div className="space-y-2">
            <div className="skeleton-pulse h-8 w-20 rounded-md" />
            <div className="skeleton-pulse h-3 w-32 rounded" />
            <div className="mt-4 flex gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="skeleton-pulse h-8 w-1.5 rounded-sm" />
              ))}
            </div>
          </div>
        ) : (
          <>
            <p className="font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight">
              {value}
            </p>
            <p className="mt-1 text-xs text-[var(--color-subtle)]">{hint}</p>
            <div className="mt-4 flex items-end gap-1 opacity-70">
              {bars.map((n, i) => (
                <div
                  key={i}
                  className="w-1.5 rounded-sm bg-[var(--color-accent)]"
                  style={{
                    height: `${10 + (typeof n === 'number' ? Math.min(n, 20) : 8)}px`,
                    opacity: 0.25 + (i % 5) * 0.12,
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

function widgetsFromStats(stats: GitHubLiveStats | null) {
  if (!stats) {
    return [
      { id: 'commits', value: '—', hint: 'Waiting for API' },
      { id: 'stars', value: '—', hint: 'Waiting for API' },
      { id: 'repos', value: '—', hint: 'Waiting for API' },
      { id: 'langs', value: '—', hint: 'Waiting for API' },
      { id: 'streak', value: '—', hint: 'Waiting for API' },
      { id: 'prs', value: '—', hint: 'Add GITHUB_TOKEN for PRs' },
    ]
  }

  return [
    {
      id: 'commits',
      value: String(stats.commits90d),
      hint: stats.authenticated ? 'Contributions · last 90 days' : 'Public PushEvents (approx)',
      spark: stats.heatmap,
    },
    {
      id: 'stars',
      value: String(stats.stars),
      hint: 'Across non-fork repos',
    },
    {
      id: 'repos',
      value: String(stats.repos),
      hint: `${stats.followers} followers`,
    },
    {
      id: 'langs',
      value: stats.topLanguage,
      hint: Object.keys(stats.languages).slice(0, 3).join(' · ') || 'Top by repo count',
    },
    {
      id: 'streak',
      value: stats.totalContributions > 0 ? String(stats.totalContributions) : '—',
      hint: stats.authenticated ? 'Total contributions (year)' : 'Needs token for calendar',
      spark: stats.heatmap,
    },
    {
      id: 'prs',
      value: stats.authenticated ? String(stats.prs) : '—',
      hint: stats.authenticated ? 'Merged pull requests' : 'Needs GITHUB_TOKEN',
    },
  ]
}

export function GitHubDashboard() {
  const { ref, controls } = useReveal(0.2)
  const { stats, loading, error } = useGitHubStats()
  const widgets = widgetsFromStats(stats)
  const live = Boolean(stats) && !error
  const heat = stats?.heatmap?.length
    ? stats.heatmap
    : Array.from({ length: 371 }, () => 0)
  const heatMax = Math.max(1, ...heat)

  return (
    <SectionReveal id="github" className="section-pad">
      <div className="container-wide">
        <SectionHeading
          eyebrow="GitHub"
          title="Live system monitoring."
          description={`Realtime metrics for @${USERNAME} via GitHub API${stats?.authenticated ? ' (authenticated)' : ''}.`}
        />

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <div
            className={cn(
              'flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/[0.02] px-4 py-2',
            )}
          >
            <Plug
              className={cn(
                'h-3.5 w-3.5',
                live ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]',
              )}
            />
            <span className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-muted)]">
              {loading
                ? 'Connecting to GitHub…'
                : live
                  ? `Linked · @${stats?.username} · ${stats?.authenticated ? 'token' : 'public'}`
                  : `Offline · ${error ?? 'no data'}`}
            </span>
          </div>
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[var(--color-accent)] transition hover:text-[var(--color-fg)]"
          >
            github.com/{USERNAME}
          </a>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {widgets.map((stat) => (
            <MonitorWidget
              key={stat.id}
              id={stat.id}
              value={stat.value}
              hint={stat.hint}
              loading={loading}
              live={live}
              spark={'spark' in stat ? stat.spark : undefined}
            />
          ))}
        </motion.div>

        <div className="glass glass-reflect mt-6 rounded-[var(--radius-xl)] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <p className="text-xs text-[var(--color-muted)]">
              Contribution heatmap · last {heat.length || 0} days
              {stats?.authenticated ? ' (live)' : ' (add token for calendar)'}
            </p>
            <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-subtle)]">
              {live ? 'SYS · ONLINE' : 'SYS · IDLE'}
            </span>
          </div>
          {/* GitHub-style: 7 rows (Sun→Sat), columns = weeks */}
          <div
            className="overflow-x-auto pb-1"
            role="img"
            aria-label="GitHub contribution calendar"
          >
            <div
              className="grid w-max gap-[3px]"
              style={{
                gridTemplateRows: 'repeat(7, 10px)',
                gridAutoFlow: 'column',
                gridAutoColumns: '10px',
              }}
            >
              {heat.map((count, i) => (
                <div
                  key={i}
                  title={`${count} contribution${count === 1 ? '' : 's'}`}
                  className="rounded-[2px] transition-transform hover:scale-125"
                  style={{
                    width: 10,
                    height: 10,
                    background: heatColor(count, heatMax),
                  }}
                />
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-[var(--color-subtle)]">
            <span>Less</span>
            {[0, 0.25, 0.5, 0.75, 1].map((t) => (
              <span
                key={t}
                className="inline-block h-2.5 w-2.5 rounded-[2px]"
                style={{
                  background: `rgba(91,159,212,${t === 0 ? 0.06 : 0.12 + t * 0.7})`,
                }}
              />
            ))}
            <span>More</span>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
