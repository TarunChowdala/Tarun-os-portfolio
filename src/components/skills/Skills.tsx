import { useMemo, useState, type ComponentType, type CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Atom,
  Bot,
  Box,
  Braces,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Layers,
  Network,
  Server,
  Sparkles,
  Zap,
} from 'lucide-react'
import { SKILLS } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { cn } from '@/lib/utils'
import type { SkillNode } from '@/types'

const LAYERS = [
  { id: 'frontend', label: 'Frontend', x: 8 },
  { id: 'python', label: 'Python', x: 28 },
  { id: 'node', label: 'Node', x: 46 },
  { id: 'data', label: 'Data', x: 64 },
  { id: 'ai', label: 'AI', x: 80 },
  { id: 'cloud', label: 'Cloud', x: 94 },
] as const

const CATEGORY_COLOR: Record<SkillNode['category'], string> = {
  language: '#5b9fd4',
  framework: '#7eb8a8',
  ai: '#c4a35a',
  infra: '#9aa0b4',
  tool: '#a8a29e',
}

const SKILL_ICON: Record<string, ComponentType<{ className?: string; style?: CSSProperties }>> = {
  js: FileCode2,
  ts: Braces,
  python: Code2,
  react: Atom,
  fastapi: Zap,
  node: Server,
  langchain: Bot,
  postgres: Database,
  redis: Layers,
  vector: Network,
  gcp: Cloud,
  docker: Box,
  zustand: Sparkles,
  mongo: Database,
}

/** Compact skill map — shorter graph + slim detail strip. */
export function Skills() {
  const [active, setActive] = useState<string | null>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  const edges = useMemo(() => {
    const pairs: { key: string; x1: number; y1: number; x2: number; y2: number; lit: boolean }[] =
      []
    const byId = Object.fromEntries(SKILLS.map((s) => [s.id, s]))
    const seen = new Set<string>()

    for (const node of SKILLS) {
      for (const rel of node.related) {
        const other = byId[rel]
        if (!other) continue
        const key = [node.id, rel].sort().join('-')
        if (seen.has(key)) continue
        seen.add(key)
        const lit =
          active === node.id ||
          active === rel ||
          expanded === node.id ||
          expanded === rel
        pairs.push({
          key,
          x1: node.x,
          y1: node.y,
          x2: other.x,
          y2: other.y,
          lit,
        })
      }
    }
    return pairs
  }, [active, expanded])

  const selected = SKILLS.find((s) => s.id === (expanded ?? active))
  const SelectedIcon = selected ? SKILL_ICON[selected.id] ?? Code2 : null

  return (
    <SectionReveal id="skills" className="section-pad !py-[clamp(3.5rem,8vw,6rem)]">
      <div className="w-full">
        <SectionHeading
          eyebrow="Skills"
          title="Full-stack combination."
          description="Frontend → Python API → Node API → Data → AI → Cloud. Hover a node for links; click for details."
          className="mb-8 max-w-2xl"
        />

        <div
          className="relative h-[280px] overflow-hidden border border-white/[0.08] border-b-0 sm:h-[300px] lg:h-[320px]"
          onMouseLeave={() => setActive(null)}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.25]"
            style={{
              backgroundImage:
                'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
              backgroundSize: '24px 24px',
              maskImage:
                'radial-gradient(ellipse 70% 65% at 50% 45%, black 25%, transparent 80%)',
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-2 z-[1] hidden sm:block"
          >
            {LAYERS.map((layer) => (
              <span
                key={layer.id}
                className="absolute -translate-x-1/2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.16em] text-[var(--color-subtle)]"
                style={{ left: `${layer.x}%` }}
              >
                {layer.label}
              </span>
            ))}
          </div>

          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            aria-hidden
          >
            {edges.map((e) => (
              <line
                key={e.key}
                x1={e.x1}
                y1={e.y1}
                x2={e.x2}
                y2={e.y2}
                stroke={e.lit ? 'rgba(91,159,212,0.5)' : 'rgba(255,255,255,0.07)'}
                strokeWidth={e.lit ? 0.28 : 0.14}
                strokeLinecap="round"
                className="transition-[stroke,stroke-width] duration-300"
              />
            ))}
          </svg>

          {SKILLS.map((node) => {
            const Icon = SKILL_ICON[node.id] ?? Code2
            const color = CATEGORY_COLOR[node.category]
            const isHot = active === node.id || expanded === node.id
            const relatedHot =
              active !== null &&
              (SKILLS.find((s) => s.id === active)?.related.includes(node.id) ?? false)
            const dimmed = active !== null && !isHot && !relatedHot

            return (
              <button
                key={node.id}
                type="button"
                className={cn(
                  'group absolute z-[1] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1 outline-none transition-all duration-300',
                  dimmed && 'opacity-35',
                  isHot && 'z-[2] scale-105',
                )}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onMouseEnter={() => setActive(node.id)}
                onFocus={() => setActive(node.id)}
                onClick={() => setExpanded((prev) => (prev === node.id ? null : node.id))}
                aria-pressed={expanded === node.id}
                aria-label={`${node.label}, ${node.category}`}
              >
                <span
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-lg border bg-[rgba(11,11,14,0.92)] transition-all duration-300 sm:h-9 sm:w-9',
                    isHot ? 'border-white/25' : 'border-white/10 group-hover:border-white/20',
                  )}
                  style={
                    {
                      boxShadow: isHot
                        ? `0 0 18px -6px ${color}99, inset 0 1px 0 rgba(255,255,255,0.08)`
                        : undefined,
                    } as CSSProperties
                  }
                >
                  <Icon className="relative h-3.5 w-3.5" style={{ color }} />
                </span>
                <span
                  className={cn(
                    'max-w-[4.5rem] truncate text-center font-[family-name:var(--font-mono)] text-[9px] leading-none tracking-wide',
                    isHot ? 'text-[var(--color-fg)]' : 'text-[var(--color-muted)]',
                  )}
                >
                  {node.label}
                </span>
              </button>
            )
          })}
        </div>

        {/* Slim detail strip under the map */}
        <div className="flex min-h-[72px] flex-col justify-center gap-3 border border-white/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex min-w-0 flex-1 items-start gap-3 sm:items-center"
              >
                {SelectedIcon ? (
                  <span
                    className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] sm:mt-0"
                    style={{ color: CATEGORY_COLOR[selected.category] }}
                  >
                    <SelectedIcon className="h-3.5 w-3.5" />
                  </span>
                ) : null}
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                    <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight sm:text-base">
                      {selected.label}
                    </h3>
                    <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                      {selected.category} · {selected.level}%
                    </span>
                  </div>
                  <p className="mt-0.5 line-clamp-2 text-xs text-[var(--color-muted)] sm:line-clamp-1 sm:text-sm">
                    {selected.description}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[var(--color-muted)]"
              >
                Hover a node to see connections — click for proficiency.
              </motion.p>
            )}
          </AnimatePresence>

          <ul className="flex flex-wrap gap-2 sm:justify-end">
            {(Object.keys(CATEGORY_COLOR) as SkillNode['category'][]).map((cat) => (
              <li
                key={cat}
                className="flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.12em] text-[var(--color-subtle)]"
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: CATEGORY_COLOR[cat] }}
                />
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  )
}
