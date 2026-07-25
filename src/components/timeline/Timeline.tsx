import { useState } from 'react'
import { motion } from 'framer-motion'
import { TIMELINE } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { cn } from '@/lib/utils'

export function Timeline() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <SectionReveal id="timeline" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Timeline"
          title="Vertical career continuum."
          description="Scroll-triggered milestones — the same journey, denser narrative."
        />

        <div className="relative">
          {/* Animated connecting line */}
          <motion.div
            aria-hidden
            className="absolute left-[0.65rem] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-[var(--color-accent)] via-white/20 to-transparent sm:left-1/2 sm:-translate-x-px"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <ol className="space-y-10">
            {TIMELINE.map((event, i) => {
              const left = i % 2 === 0
              const open = hovered === event.id
              return (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, y: 28, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid gap-4 sm:grid-cols-2"
                  onMouseEnter={() => setHovered(event.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.div
                    layout
                    className={cn(
                      'pl-10 sm:pl-0',
                      left ? 'sm:pr-10 sm:text-right' : 'sm:col-start-2 sm:pl-10',
                      'rounded-[var(--radius-lg)] transition-shadow duration-300',
                      open && 'glass px-4 py-3 shadow-[0_0_32px_-12px_var(--color-accent-glow)]',
                    )}
                  >
                    <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-accent)]">
                      {event.year}
                    </span>
                    <h3 className="mt-1 font-[family-name:var(--font-display)] text-xl font-semibold">
                      {event.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--color-subtle)]">{event.org}</p>
                    <motion.p
                      className="mt-3 text-sm text-[var(--color-muted)]"
                      animate={{ opacity: open ? 1 : 0.85 }}
                    >
                      {event.description}
                    </motion.p>
                    {event.tags && open ? (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className={cn(
                          'mt-3 flex flex-wrap gap-1.5 overflow-hidden',
                          left && 'sm:justify-end',
                        )}
                      >
                        {event.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-fg-secondary)]"
                          >
                            {tag}
                          </li>
                        ))}
                      </motion.ul>
                    ) : null}
                  </motion.div>
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-[0.4rem] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)] transition-shadow duration-300 sm:left-1/2 sm:-translate-x-1/2',
                      open && 'shadow-[0_0_16px_4px_var(--color-accent-glow)]',
                    )}
                  />
                </motion.li>
              )
            })}
          </ol>
        </div>
      </div>
    </SectionReveal>
  )
}
