import { useEffect, useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Mail, MessageSquare, type LucideIcon } from 'lucide-react'
import { ROLES, SITE, SOCIALS, STATUS_LINES } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useTypewriterCycle } from '@/hooks/useTypewriter'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'
import { cn } from '@/lib/utils'

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

type SocialIcon = LucideIcon | ((props: { className?: string }) => ReactNode)

const SOCIAL_ICONS: Record<string, SocialIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  resume: FileText,
}

const HERO_SOCIAL_IDS = ['linkedin', 'github', 'resume', 'email'] as const

const ease = [0.22, 1, 0.36, 1] as const

/**
 * Full-bleed editorial hero — Linear/Vercel-inspired:
 * brand-first type, edge-to-edge portrait plane, no inset window chrome.
 */
export function Hero() {
  const { openChat } = useAIChatLauncher()
  const reduced = usePrefersReducedMotion()

  const status = useTypewriterCycle(STATUS_LINES, {
    speed: 32,
    deleteSpeed: 20,
    pause: 2400,
    delay: 500,
  })

  const role = useTypewriterCycle(ROLES, {
    speed: 34,
    deleteSpeed: 22,
    pause: 2000,
    delay: 700,
  })

  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-dvh flex-col overflow-hidden"
    >
      {/* Atmosphere — full viewport plane */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[var(--color-bg)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_10%,rgba(91,159,212,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(62,207,142,0.06),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage:
              'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
      </div>

      {/* Full-bleed portrait — dominant edge plane on lg+ */}
      <motion.div
        aria-hidden
        initial={reduced ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2, ease }}
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[46%] lg:block"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={SITE.avatarUrl}
            alt=""
            className="h-full w-full object-cover object-[center_18%] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)] via-[var(--color-bg)]/55 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-transparent to-[var(--color-bg)]/40" />
          <div className="absolute inset-0 bg-[var(--color-accent)]/5 mix-blend-overlay" />
        </div>
      </motion.div>

      <div className="section-bleed relative z-10 flex flex-1 flex-col justify-center py-24 sm:py-28 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.7fr)] lg:gap-8">
          <div className="max-w-3xl">
            <motion.div
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-[var(--color-subtle)]"
            >
              <span className="inline-flex items-center gap-2 text-[var(--color-success)]">
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className={cn(
                      'absolute inline-flex h-full w-full rounded-full bg-[var(--color-success)] opacity-40',
                      !reduced && 'animate-ping',
                    )}
                  />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                </span>
                {status.text}
                <span className="inline-block h-3 w-[2px] animate-pulse bg-[var(--color-accent)]" />
              </span>
              <span className="text-[var(--color-border-strong)]">/</span>
              <span>
                {SITE.location}
              </span>
              <span className="text-[var(--color-border-strong)]">/</span>
              <span className="tabular-nums text-[var(--color-muted)]">
                {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </motion.div>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.05, ease }}
              className="mb-4 font-[family-name:var(--font-mono)] text-sm tracking-wide text-[var(--color-accent)]"
            >
              {SITE.product}
            </motion.p>

            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease }}
              className="font-[family-name:var(--font-display)] text-[clamp(3rem,9vw,6.5rem)] font-bold leading-[0.88] tracking-[-0.045em]"
            >
              <span className="text-gradient">{SITE.name}</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16, ease }}
              className="mt-6 min-h-[1.5rem] font-[family-name:var(--font-mono)] text-base text-[var(--color-fg-secondary)] sm:text-lg"
            >
              {role.text}
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--color-accent)] align-baseline" />
            </motion.p>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-lg"
            >
              {SITE.tagline}
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <button
                type="button"
                onClick={openChat}
                className="group inline-flex cursor-pointer items-center gap-2.5 rounded-md bg-[var(--color-fg)] px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[var(--color-bg)] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <MessageSquare className="h-4 w-4" />
                Talk to AI
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-transparent px-5 py-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[var(--color-fg)] transition-colors hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]"
              >
                View work
              </a>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.42 }}
              className="mt-10 flex flex-wrap items-center gap-2"
            >
              {HERO_SOCIAL_IDS.map((id) => {
                const link = SOCIALS.find((s) => s.id === id)
                if (!link) return null
                const Icon = SOCIAL_ICONS[id]
                const external = link.href.startsWith('http')
                return (
                  <a
                    key={id}
                    href={link.href}
                    target={external || id === 'resume' ? '_blank' : undefined}
                    rel={external || id === 'resume' ? 'noreferrer' : undefined}
                    title={link.label}
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                  >
                    <Icon className="h-[18px] w-[18px]" />
                  </a>
                )
              })}
              <span className="ml-2 hidden font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-subtle)] sm:inline">
                {SITE.stackHighlight.slice(0, 4).join(' · ')}
              </span>
            </motion.div>
          </div>

          {/* Mobile / tablet portrait — full-bleed strip, not a card */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.18, ease }}
            className="relative -mx-[clamp(1.25rem,4vw,3rem)] lg:hidden"
          >
            <div className="relative aspect-[4/5] max-h-[58dvh] w-full overflow-hidden sm:aspect-[16/10] sm:max-h-[42dvh]">
              <img
                src={SITE.avatarUrl}
                alt={SITE.name}
                className="h-full w-full object-cover object-[center_20%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg)] via-[var(--color-bg)]/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Edge-to-edge bottom meta rail */}
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease }}
        className="relative z-10 border-t border-white/[0.06]"
      >
        <div className="section-bleed flex flex-wrap items-center justify-between gap-4 py-4 font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--color-subtle)]">
          <span>{SITE.availability}</span>
          <span className="hidden text-[var(--color-muted)] sm:inline">{SITE.focusLine}</span>
          <a
            href="#about"
            className="text-[var(--color-accent)] transition-colors hover:text-[var(--color-fg)]"
          >
            Scroll ↓
          </a>
        </div>
      </motion.div>
    </section>
  )
}
