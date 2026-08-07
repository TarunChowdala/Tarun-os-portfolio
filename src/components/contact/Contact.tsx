import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE, SOCIALS } from '@/data/site'
import { SectionReveal } from '@/components/ui/section-reveal'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

/** Full-bleed contact band — no inset glass panel. */
export function Contact() {
  const { openChat } = useAIChatLauncher()

  return (
    <SectionReveal
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(91,159,212,0.14),transparent_55%)]"
      />

      <div className="section-bleed relative py-[clamp(5rem,12vw,9rem)]">
        <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
          Contact
        </p>

        <div className="mt-6 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end lg:gap-16">
          <div>
            <h2 className="max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.25rem,5vw,4rem)] font-semibold leading-[1.05] tracking-tight">
              Let&apos;s build the next intelligent surface.
            </h2>
            <p className="mt-5 max-w-lg text-base text-[var(--color-muted)] sm:text-lg">
              Based in {SITE.location}. Open to full-stack and GenAI roles — email, call, or talk
              to the assistant first.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--color-fg)] px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                {SITE.email}
              </a>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                className="inline-flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)]"
              >
                {SITE.phone}
              </a>
              <button
                type="button"
                onClick={openChat}
                className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-transparent px-4 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-fg)]"
              >
                Talk to AI
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="border-t border-white/[0.08] pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              Status
            </p>
            <ul className="mt-5 space-y-4">
              {['AI core running', 'Projects ready', SITE.availability].map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-3 font-[family-name:var(--font-mono)] text-sm text-[var(--color-fg-secondary)]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                  {label}
                </li>
              ))}
            </ul>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/[0.08] pt-8">
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
      </div>
    </SectionReveal>
  )
}
