import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE, SOCIALS } from '@/data/site'
import { Button } from '@/components/ui/button'
import { SectionReveal } from '@/components/ui/section-reveal'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

const PANEL_STATUS = [
  { label: 'AI Core Running', ok: true },
  { label: 'Projects Ready', ok: true },
  { label: 'Open to Opportunities', ok: true },
] as const

export function Contact() {
  const { openChat } = useAIChatLauncher()
  const updated = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <SectionReveal id="contact" className="section-pad pb-28">
      <div className="container-narrow">
        <div
          className="glass-reflect relative overflow-hidden rounded-[1.75rem] border border-[var(--color-border-strong)] px-8 py-14 text-center sm:px-14 sm:py-16"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(91,159,212,0.16), transparent 55%), rgba(11,11,14,0.7)',
          }}
        >
          <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
            System Status
          </p>
          <h2 className="mx-auto mt-4 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
            Let&apos;s build the next intelligent surface.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[var(--color-muted)]">
            Based in {SITE.location}. Open to full-stack and GenAI roles — email, call, or talk to
            the assistant first.
          </p>

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2 text-left sm:mx-auto">
            {PANEL_STATUS.map((item, i) => (
              <motion.li
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="glass flex items-center gap-3 rounded-full px-4 py-2.5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-35" />
                  <span className="relative h-2 w-2 rounded-full bg-[var(--color-success)]" />
                </span>
                <span className="text-sm text-[var(--color-fg-secondary)]">{item.label}</span>
              </motion.li>
            ))}
            <li className="flex items-center justify-between px-4 pt-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)]">
              <span>Last Updated</span>
              <span>{updated}</span>
            </li>
          </ul>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              onClick={() => {
                window.location.href = `mailto:${SITE.email}`
              }}
            >
              <Mail className="h-4 w-4" />
              {SITE.email}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                window.location.href = `tel:${SITE.phone.replace(/\s/g, '')}`
              }}
            >
              {SITE.phone}
            </Button>
            <Button size="lg" variant="glass" onClick={openChat}>
              Talk to AI
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-6">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--color-muted)] transition hover:text-[var(--color-fg)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionReveal>
  )
}
