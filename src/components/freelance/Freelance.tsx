import { ExternalLink, Briefcase } from 'lucide-react'
import { PROJECTS, SITE } from '@/data/site'
import { SectionReveal } from '@/components/ui/section-reveal'
import { SectionHeading } from '@/components/ui/section-heading'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

const SERVICES = [
  'Full-stack web apps (React + FastAPI / Node)',
  'E-commerce storefronts, payments & shipping',
  'GenAI features — chat, RAG, agent workflows',
  'API design, Docker deploys, production polish',
] as const

const madvira = PROJECTS.find((p) => p.id === 'madivra')

/** Full-bleed freelancing band — Madvira as shipped freelance work. */
export function Freelance() {
  const { openChat } = useAIChatLauncher()

  return (
    <SectionReveal id="freelance" className="section-pad border-t border-white/[0.05]">
      <div className="w-full">
        <SectionHeading
          eyebrow="Freelance"
          title="Available for freelance builds."
          description={`${SITE.freelancing}. End-to-end product work — from storefronts to AI features — with production ownership.`}
          className="max-w-3xl"
        />

        <div className="grid gap-0 border-t border-white/[0.08] lg:grid-cols-[1fr_1.15fr]">
          <div className="border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r">
            <p className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-accent)]">
              <Briefcase className="h-3.5 w-3.5" />
              What I take on
            </p>
            <ul className="mt-6 space-y-4">
              {SERVICES.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-[var(--color-fg-secondary)] sm:text-base"
                >
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${SITE.email}?subject=Freelance%20inquiry`}
                className="inline-flex items-center rounded-md bg-[var(--color-fg)] px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-bg)] transition-transform hover:-translate-y-0.5"
              >
                Start a project
              </a>
              <button
                type="button"
                onClick={openChat}
                className="inline-flex cursor-pointer items-center rounded-md border border-white/15 px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]/45 hover:text-[var(--color-accent)]"
              >
                Ask the AI first
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden p-6 sm:p-8">
            <p className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-subtle)]">
              Featured freelance
            </p>

            {madvira ? (
              <article className="mt-5">
                <div className="relative -mx-6 mb-6 aspect-[16/9] overflow-hidden sm:-mx-8 sm:aspect-[2/1]">
                  {madvira.coverImage ? (
                    <img
                      src={madvira.coverImage}
                      alt={madvira.title}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div
                      className="h-full w-full"
                      style={{ background: madvira.coverGradient }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/30 to-transparent" />
                  <span className="absolute left-6 top-4 rounded-md border border-white/15 bg-black/40 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-[var(--color-fg)] backdrop-blur-sm sm:left-8">
                    Freelance · Live
                  </span>
                </div>

                <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight sm:text-3xl">
                  {madvira.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-accent)] sm:text-base">
                  Freelance fashion e-commerce — storefront, payments & shipping.
                </p>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-muted)] sm:text-base">
                  Freelance full-stack build: fashion storefront, OTP auth, Razorpay checkout, and
                  Shiprocket fulfillment — shipped to production on{' '}
                  <a
                    href={madvira.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--color-fg-secondary)] underline decoration-white/20 underline-offset-2 hover:text-[var(--color-accent)]"
                  >
                    madvira.com
                  </a>
                  .
                </p>

                <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-1">
                  {madvira.techStack.slice(0, 6).map((t) => (
                    <li
                      key={t}
                      className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-fg-secondary)]"
                    >
                      {t}
                    </li>
                  ))}
                </ul>

                {madvira.demoUrl ? (
                  <a
                    href={madvira.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-sm font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-fg)]"
                  >
                    Visit live site
                    <ExternalLink className="h-4 w-4" />
                  </a>
                ) : null}
              </article>
            ) : null}
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
