import { motion } from 'framer-motion'
import { TIMELINE } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { fadeUp, stagger, useReveal } from '@/hooks/useReveal'

export function About() {
  const { ref, controls } = useReveal<HTMLOListElement>(0.2)

  return (
    <SectionReveal id="about" className="section-pad">
      <div className="container-wide">
        <SectionHeading
          eyebrow="About"
          title="Career as a timeline, not a wall of text."
          description="CS graduate → Instedia → ContactSwing at Swara Tech. Now open to full-time roles and freelance, with deep GenAI side systems."
        />

        <motion.ol
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger}
          className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {TIMELINE.map((event, i) => (
            <motion.li
              key={event.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="glass glass-reflect relative rounded-[var(--radius-xl)] p-5 transition-shadow hover:shadow-[0_16px_40px_-24px_rgba(91,159,212,0.35)]"
            >
              <span className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-accent)]">
                {String(i + 1).padStart(2, '0')} · {event.year}
              </span>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-semibold leading-snug">
                {event.title}
              </h3>
              <p className="mt-1 text-xs text-[var(--color-subtle)]">{event.org}</p>
              <p className="mt-3 text-sm text-[var(--color-muted)]">{event.description}</p>
              {event.tags ? (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {event.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-[var(--color-border)] px-2.5 py-0.5 text-[10px] text-[var(--color-fg-secondary)]"
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
