import { motion } from 'framer-motion'
import { TIMELINE } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { fadeUp, stagger, useReveal } from '@/hooks/useReveal'

/** Full-width editorial timeline — no glass cards. */
export function About() {
  const { ref, controls } = useReveal<HTMLOListElement>(0.15)

  return (
    <SectionReveal id="about" className="section-pad border-t border-white/[0.05]">
      <div className="w-full">
        <SectionHeading
          eyebrow="About"
          title="Career as a timeline, not a wall of text."
          description="CS graduate → Instedia → ContactSwing at Swara Tech. Now open to full-time roles and freelance, with deep GenAI side systems."
          className="max-w-3xl"
        />

        <motion.ol
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger}
          className="relative grid gap-0 border-t border-white/[0.08] md:grid-cols-2 lg:grid-cols-4"
        >
          {TIMELINE.map((event, i) => (
            <motion.li
              key={event.id}
              variants={fadeUp}
              className="group relative border-b border-white/[0.08] p-6 transition-colors hover:bg-white/[0.02] md:border-r md:last:border-r-0 lg:min-h-[280px] lg:p-8"
            >
              <span className="font-[family-name:var(--font-mono)] text-xs tracking-wide text-[var(--color-accent)]">
                {String(i + 1).padStart(2, '0')} · {event.year}
              </span>
              <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold leading-snug tracking-tight">
                {event.title}
              </h3>
              <p className="mt-2 text-xs uppercase tracking-[0.14em] text-[var(--color-subtle)]">
                {event.org}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted)]">
                {event.description}
              </p>
              {event.tags ? (
                <ul className="mt-6 flex flex-wrap gap-x-3 gap-y-1">
                  {event.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-secondary)]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </SectionReveal>
  )
}
