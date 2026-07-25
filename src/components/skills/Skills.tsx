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
    <SectionReveal id="skills" className="section-pad">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Skills"
          title="Full-stack combination."
          description="Read left → right: Frontend → Python API → Node API → Data → AI → Cloud. Two backends on purpose — FastAPI (ContactSwing/AI) and Node (SaaS/e-com)."
        />

        <div className="grid gap-8 lg:grid-cols-[1.45fr_0.55fr]">
          <div
            className="glass glass-reflect relative min-h-[420px] overflow-hidden rounded-[var(--radius-xl)] sm:min-h-[480px] lg:aspect-[16/11] lg:min-h-0"
            onMouseLeave={() => setActive(null)}
          >
            {/* soft grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.28]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)',
                backgroundSize: '28px 28px',
                maskImage:
                  'radial-gradient(ellipse 70% 65% at 50% 45%, black 25%, transparent 80%)',
              }}
            />

            {/* Layer labels */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-3 z-[1] hidden sm:block"
            >
              {LAYERS.map((layer) => (
                <span
                  key={layer.id}
                  className="absolute -translate-x-1/2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.18em] text-[var(--color-subtle)]"
                  style={{ left: `${layer.x}%` }}
                >
                  {layer.label}
                </span>
              ))}
            </div>

            {/* Column guides */}
            <div aria-hidden className="pointer-events-none absolute inset-0">
              {LAYERS.map((layer, i) =>
                i < LAYERS.length - 1 ? (
                  <span
                    key={`guide-${layer.id}`}
                    className="absolute top-10 bottom-4 w-px bg-white/[0.04]"
                    style={{ left: `${(layer.x + LAYERS[i + 1].x) / 2}%` }}
                  />
                ) : null,
              )}
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
                    'group absolute z-[1] flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5 outline-none transition-all duration-300',
                    dimmed && 'opacity-35',
                    isHot && 'z-[2] scale-105',
                  )}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  onMouseEnter={() => setActive(node.id)}
                  onFocus={() => setActive(node.id)}
                  onClick={() =>
                    setExpanded((prev) => (prev === node.id ? null : node.id))
                  }
                  aria-pressed={expanded === node.id}
                  aria-label={`${node.label}, ${node.category}`}
                >
                  <span
                    className={cn(
                      'relative flex h-9 w-9 items-center justify-center rounded-xl border bg-[rgba(11,11,14,0.92)] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)] transition-all duration-300 sm:h-10 sm:w-10',
                      isHot
                        ? 'border-white/25 shadow-[0_0_24px_-6px_var(--glow)]'
                        : 'border-white/10 group-hover:border-white/20',
                    )}
                    style={
                      {
                        '--glow': color,
                        boxShadow: isHot
                          ? `0 0 22px -6px ${color}99, inset 0 1px 0 rgba(255,255,255,0.08)`
                          : undefined,
                      } as CSSProperties
                    }
                  >
                    <span
                      className="absolute inset-0 rounded-xl opacity-20"
                      style={{
                        background: `radial-gradient(circle at 30% 20%, ${color}, transparent 65%)`,
                      }}
                    />
                    <Icon
                      className="relative h-3.5 w-3.5 sm:h-4 sm:w-4"
                      style={{ color }}
                    />
                  </span>
                  <span
                    className={cn(
                      'max-w-[5.5rem] truncate rounded-md px-1.5 py-0.5 text-center font-[family-name:var(--font-mono)] text-[9px] leading-none tracking-wide transition-colors sm:text-[10px]',
                      isHot ? 'text-[var(--color-fg)]' : 'text-[var(--color-muted)]',
                    )}
                  >
                    {node.label}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="glass flex min-h-[220px] flex-col justify-between rounded-[var(--radius-xl)] p-6">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="mb-3 flex items-center gap-3">
                    {SelectedIcon ? (
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
                        style={{ color: CATEGORY_COLOR[selected.category] }}
                      >
                        <SelectedIcon className="h-4 w-4" />
                      </span>
                    ) : null}
                    <div>
                      <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-accent)]">
                        {selected.category}
                      </p>
                      <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
                        {selected.label}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-[var(--color-muted)]">{selected.description}</p>
                  <div className="mt-5">
                    <div className="mb-1.5 flex justify-between text-xs text-[var(--color-subtle)]">
                      <span>Proficiency</span>
                      <span>{selected.level}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: CATEGORY_COLOR[selected.category] }}
                        initial={{ width: 0 }}
                        animate={{ width: `${selected.level}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-[var(--color-subtle)]">
                    Related:{' '}
                    {selected.related
                      .map((id) => SKILLS.find((s) => s.id === id)?.label)
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                </motion.div>
              ) : (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-[var(--color-muted)]"
                >
                  Classic full-stack flow. Hover a layer node to see what it plugs into —
                  click for proficiency and details.
                </motion.p>
              )}
            </AnimatePresence>

            <ul className="mt-6 flex flex-wrap gap-2">
              {(Object.keys(CATEGORY_COLOR) as SkillNode['category'][]).map((cat) => (
                <li
                  key={cat}
                  className="flex items-center gap-1.5 rounded-full border border-[var(--color-border)] px-2.5 py-1 text-[10px] capitalize text-[var(--color-muted)]"
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
      </div>
    </SectionReveal>
  )
}
