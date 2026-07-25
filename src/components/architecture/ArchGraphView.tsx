import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ProjectArchitecture } from '@/types'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'

interface ArchGraphViewProps {
  arch: ProjectArchitecture
  /** Tighter embed for project modal cover */
  compact?: boolean
  className?: string
  showTip?: boolean
}

/** Interactive node graph — shared by Architecture section + project modal. */
export function ArchGraphView({
  arch,
  compact = false,
  className,
  showTip = true,
}: ArchGraphViewProps) {
  const [hovered, setHovered] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()
  const byId = useMemo(
    () => Object.fromEntries(arch.nodes.map((n) => [n.id, n])),
    [arch.nodes],
  )
  const tip = hovered ? byId[hovered] : null

  return (
    <div className={cn('relative', className)}>
      <svg
        viewBox="0 0 100 96"
        className={cn(
          'mx-auto block h-auto w-full',
          compact ? 'max-h-[200px] sm:max-h-[220px]' : 'max-h-[280px] sm:max-h-[320px]',
        )}
        role="img"
        aria-label={`${arch.label} architecture`}
      >
        {arch.edges.map((edge) => {
          const a = byId[edge.from]
          const b = byId[edge.to]
          if (!a || !b) return null
          const lit =
            hovered === edge.from ||
            hovered === edge.to ||
            (hovered != null &&
              arch.edges.some(
                (e) =>
                  (e.from === hovered && (e.to === edge.from || e.to === edge.to)) ||
                  (e.to === hovered && (e.from === edge.from || e.from === edge.to)),
              ))
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lit ? 'rgba(91,159,212,0.55)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={lit ? 0.45 : 0.25}
                className="transition-[stroke,stroke-width] duration-300"
              />
              {!reduced ? (
                <circle r="0.55" fill="#5b9fd4" opacity="0.8">
                  <animateMotion
                    dur="3.4s"
                    repeatCount="indefinite"
                    path={`M${a.x},${a.y} L${b.x},${b.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.85;0.85;0"
                    keyTimes="0;0.12;0.85;1"
                    dur="3.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              ) : null}
            </g>
          )
        })}

        {arch.nodes.map((node) => {
          const hot = hovered === node.id
          const related =
            hovered != null &&
            arch.edges.some(
              (e) =>
                (e.from === hovered && e.to === node.id) ||
                (e.to === hovered && e.from === node.id),
            )
          const dim = hovered != null && !hot && !related
          return (
            <g
              key={node.id}
              transform={`translate(${node.x} ${node.y})`}
              className="cursor-pointer"
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(node.id)}
              onBlur={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.description}`}
            >
              <rect
                x={-9}
                y={-5.5}
                width={18}
                height={11}
                rx={2.2}
                fill="rgba(11,11,14,0.92)"
                stroke={
                  hot
                    ? 'rgba(91,159,212,0.75)'
                    : related
                      ? 'rgba(91,159,212,0.4)'
                      : 'rgba(255,255,255,0.16)'
                }
                strokeWidth={0.3}
                opacity={dim ? 0.35 : 1}
                style={{
                  filter: hot ? 'drop-shadow(0 0 3px rgba(91,159,212,0.5))' : undefined,
                }}
              />
              <text
                textAnchor="middle"
                y={1.1}
                className="fill-[var(--color-fg)] text-[2.4px] font-medium"
                style={{ fontFamily: 'Outfit, sans-serif' }}
                opacity={dim ? 0.35 : 1}
              >
                {node.label}
              </text>
            </g>
          )
        })}
      </svg>

      {showTip ? (
        <AnimatePresence mode="wait">
          {tip ? (
            <motion.p
              key={tip.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-accent)] sm:text-[11px]',
                compact ? 'mt-2 px-1' : 'mt-3',
              )}
            >
              <span className="text-[var(--color-fg)]">{tip.label}</span>
              {' — '}
              {tip.description}
            </motion.p>
          ) : (
            <p
              className={cn(
                'font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-subtle)] sm:text-[11px]',
                compact ? 'mt-2 px-1' : 'mt-3',
              )}
            >
              Hover a node · connected flow
            </p>
          )}
        </AnimatePresence>
      ) : null}
    </div>
  )
}
