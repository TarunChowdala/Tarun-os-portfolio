import { useEffect, useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { FileText, Mail, MessageSquare, type LucideIcon } from "lucide-react";
import { ROLES, SITE, SOCIALS, STATUS_LINES } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTypewriter, useTypewriterCycle } from "@/hooks/useTypewriter";
import { useAIChatLauncher } from "@/components/ai/AIChatContext";

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.295 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type SocialIcon = LucideIcon | ((props: { className?: string }) => ReactNode);

const SOCIAL_ICONS: Record<string, SocialIcon> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  email: Mail,
  resume: FileText,
};

/** Hero strip — LinkedIn / GitHub / Resume / Email */
const HERO_SOCIAL_IDS = ["linkedin", "github", "resume", "email"] as const;

function TypeCursor({ on = true }: { on?: boolean }) {
  if (!on) return null;
  return (
    <span
      aria-hidden
      className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse bg-[var(--color-accent)] align-baseline"
    />
  );
}

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums">
      {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
    </span>
  );
}

const BOT_LINE = 'Ask about projects, stack, experience, or how to get in touch…';

/**
 * Window-chrome hero. Status + stack + roles use typing; no employer claim.
 */
export function Hero() {
  const { openChat } = useAIChatLauncher();
  const reduced = usePrefersReducedMotion();

  const status = useTypewriterCycle(STATUS_LINES, {
    speed: 32,
    deleteSpeed: 20,
    pause: 2200,
    delay: 400,
  });

  const eyebrow = useTypewriter(`${SITE.location} · Freelance`, {
    speed: 26,
    delay: 200,
  });

  const role = useTypewriterCycle(ROLES, {
    speed: 34,
    deleteSpeed: 22,
    pause: 2000,
    delay: 600,
  });

  const tagline = useTypewriter(SITE.tagline, {
    speed: 14,
    delay: 900,
  });

  const stackJoined = useMemo(() => SITE.stackHighlight.join(" · "), []);
  const stack = useTypewriter(stackJoined, {
    speed: 22,
    delay: 1200,
  });

  const botPreview = useTypewriter(BOT_LINE, {
    speed: 24,
    delay: 1400,
  });

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col justify-center section-pad pt-16 pb-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(91,159,212,0.14),transparent_55%)]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 20%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-2xl border border-[var(--color-border-strong)] bg-[rgba(11,11,14,0.78)] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-2xl"
        >
          <div className="flex items-center gap-3 border-b border-[var(--color-border)] px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/60" />
            </div>
            <div className="ml-auto flex min-w-0 items-center gap-4 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-muted)]">
              <span className="inline-flex min-w-0 items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-40" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-success)]" />
                </span>
                <span className="truncate">
                  {status.text}
                  <TypeCursor />
                </span>
              </span>
              <Clock />
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.25fr_0.85fr]">
            <div className="relative border-b border-[var(--color-border)] p-7 sm:p-10 lg:border-b-0 lg:border-r">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(91,159,212,0.18),transparent_70%)] blur-2xl"
              />

              <p className="mb-4 min-h-[1.25rem] font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-subtle)]">
                {eyebrow.text}
                <TypeCursor on={!eyebrow.done} />
              </p>

              <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.25rem)] font-bold leading-[0.92] tracking-[-0.035em]">
                <span className="text-gradient">{SITE.name}</span>
              </h1>

              <p className="mt-5 min-h-[1.25rem] font-[family-name:var(--font-mono)] text-sm text-[var(--color-accent)]">
                {role.text}
                <TypeCursor />
              </p>

              <p className="mt-6 min-h-[4.5rem] max-w-xl text-base leading-relaxed text-[var(--color-muted)] sm:text-[1.05rem]">
                {tagline.text}
                <TypeCursor on={!tagline.done} />
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-2.5">
                {HERO_SOCIAL_IDS.map((id) => {
                  const link = SOCIALS.find((s) => s.id === id);
                  if (!link) return null;
                  const Icon = SOCIAL_ICONS[id];
                  const external = link.href.startsWith("http");
                  return (
                    <a
                      key={id}
                      href={link.href}
                      target={external || id === "resume" ? "_blank" : undefined}
                      rel={external || id === "resume" ? "noreferrer" : undefined}
                      title={link.label}
                      aria-label={link.label}
                      className="group flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.03] text-[var(--color-muted)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent-soft)] hover:text-[var(--color-accent)]"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col bg-black/20 p-5 sm:p-6">
              <button
                type="button"
                onClick={openChat}
                className="mb-5 w-full cursor-pointer rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent p-4 text-left transition-colors hover:border-[var(--color-accent)]/35 hover:bg-white/[0.04]"
              >
                <div className="relative mx-auto w-fit">
                  <img
                    src={SITE.avatarUrl}
                    alt={SITE.name}
                    width={112}
                    height={112}
                    className="mx-auto h-28 w-28 rounded-2xl object-cover object-top ring-1 ring-white/15 shadow-[0_12px_32px_-12px_rgba(91,159,212,0.45)]"
                  />
                  <span
                    className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0c10] bg-[var(--color-success)] ${reduced ? "" : "animate-pulse"}`}
                    aria-hidden
                  />
                </div>
                <p className="mt-4 text-center font-[family-name:var(--font-display)] text-sm font-semibold tracking-tight text-[var(--color-fg)]">
                  Chat with the agent
                </p>
                <p className="mt-1 text-center text-[13px] leading-snug text-[var(--color-fg-secondary)]">
                  to know more about me
                </p>
                <p className="mt-2.5 min-h-[2.25rem] text-center font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[var(--color-muted)]">
                  {botPreview.text}
                  <TypeCursor on={!botPreview.done} />
                </p>
                <span className="mx-auto mt-3 flex w-fit items-center justify-center gap-1.5 rounded-full bg-[var(--color-accent-soft)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  <MessageSquare className="h-3 w-3" />
                  Open chat
                </span>
              </button>

              <p className="mb-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
                Stack
              </p>
              <p className="mb-3 min-h-[2.5rem] font-[family-name:var(--font-mono)] text-[11px] leading-relaxed text-[var(--color-fg-secondary)]">
                {stack.text}
                <TypeCursor on={!stack.done} />
              </p>

              <div className="mt-auto space-y-2 border-t border-white/[0.06] pt-5">
                <div className="flex justify-between gap-3 font-[family-name:var(--font-mono)] text-[11px]">
                  <span className="shrink-0 text-[var(--color-subtle)]">
                    Status
                  </span>
                  <span className="truncate text-right text-[var(--color-fg-secondary)]">
                    {SITE.availability}
                  </span>
                </div>
                <div className="flex justify-between font-[family-name:var(--font-mono)] text-[11px]">
                  <span className="text-[var(--color-subtle)]">Based</span>
                  <span className="text-[var(--color-fg-secondary)]">
                    {SITE.location}
                  </span>
                </div>
                <div className="flex justify-between gap-3 font-[family-name:var(--font-mono)] text-[11px]">
                  <span className="shrink-0 text-[var(--color-subtle)]">
                    Focus
                  </span>
                  <span className="truncate text-right text-[var(--color-fg-secondary)]">
                    {SITE.focusLine}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
