import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const WINDOWS = [
  { top: '14%', left: '4%', w: 200, h: 128, rotate: -5, delay: 0 },
  { top: '18%', left: '78%', w: 180, h: 110, rotate: 4, delay: 1.2 },
  { top: '62%', left: '82%', w: 160, h: 100, rotate: -3, delay: 2.4 },
  { top: '68%', left: '5%', w: 170, h: 96, rotate: 3, delay: 0.6 },
] as const

function WallpaperMesh() {
  return (
    <>
      {/* Desktop wallpaper base */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 70% at 50% -10%, rgba(91,159,212,0.16), transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 75%, rgba(91,159,212,0.08), transparent 50%),
            radial-gradient(ellipse 45% 35% at 10% 80%, rgba(255,255,255,0.03), transparent 50%),
            linear-gradient(165deg, #06080c 0%, #050507 45%, #081018 100%)
          `,
        }}
      />
      {/* Soft aurora wash */}
      <div
        className="absolute inset-x-0 top-0 h-[55vh] opacity-60"
        style={{
          background:
            'linear-gradient(180deg, rgba(91,159,212,0.07) 0%, transparent 70%)',
        }}
      />
    </>
  )
}

function DesktopGrid() {
  return (
    <>
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage:
            'radial-gradient(ellipse 75% 65% at 50% 45%, black 20%, transparent 78%)',
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(91,159,212,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(91,159,212,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          maskImage:
            'radial-gradient(ellipse 60% 55% at 50% 40%, black 10%, transparent 70%)',
        }}
      />
    </>
  )
}

function MenuBarChrome() {
  return (
    <div className="absolute inset-x-0 top-0 flex h-9 items-center justify-between border-b border-white/[0.04] bg-[rgba(8,10,14,0.45)] px-4 backdrop-blur-md">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-accent)]/40" />
        <span className="h-1 w-14 rounded-full bg-white/10" />
        <span className="hidden h-1 w-10 rounded-full bg-white/[0.06] sm:block" />
        <span className="hidden h-1 w-10 rounded-full bg-white/[0.06] md:block" />
      </div>
      <div className="flex items-center gap-2">
        <span className="h-1 w-8 rounded-full bg-white/[0.07]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-success)]/50" />
      </div>
    </div>
  )
}

function GhostWindow({
  top,
  left,
  w,
  h,
  rotate,
  delay,
  reduced,
}: {
  top: string
  left: string
  w: number
  h: number
  rotate: number
  delay: number
  reduced: boolean
}) {
  return (
    <motion.div
      className="absolute overflow-hidden rounded-xl border border-white/[0.07] bg-[rgba(11,13,18,0.45)] shadow-[0_20px_50px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md"
      style={{
        top,
        left,
        width: w,
        height: h,
        rotate: `${rotate}deg`,
      }}
      animate={
        reduced
          ? { opacity: 0.18 }
          : { y: [0, rotate > 0 ? 10 : -10, 0], opacity: [0.14, 0.22, 0.14] }
      }
      transition={{ duration: 16 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-white/[0.06] px-2.5">
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f57]/50" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#febc2e]/45" />
        <span className="h-1.5 w-1.5 rounded-full bg-[#28c840]/45" />
        <span className="ml-2 h-1 flex-1 rounded-full bg-white/[0.06]" />
      </div>
      <div className="space-y-1.5 p-2.5">
        <div className="h-1.5 w-[70%] rounded bg-white/[0.07]" />
        <div className="h-1.5 w-[45%] rounded bg-[var(--color-accent)]/25" />
        <div className="h-1.5 w-[55%] rounded bg-white/[0.05]" />
        <div className="mt-2 grid grid-cols-3 gap-1">
          <div className="aspect-square rounded bg-white/[0.04]" />
          <div className="aspect-square rounded bg-white/[0.04]" />
          <div className="aspect-square rounded bg-[var(--color-accent)]/10" />
        </div>
      </div>
    </motion.div>
  )
}

function ParticleField({ count }: { count: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 1 + (i % 3) * 0.5,
        duration: 18 + (i % 7) * 3,
        delay: (i % 9) * 0.8,
        x: ((i % 5) - 2) * 12,
        y: ((i % 4) - 1.5) * 18,
      })),
    [count],
  )

  return (
    <>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[var(--color-accent)]"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: 0.14,
          }}
          animate={{
            x: [0, p.x, 0],
            y: [0, p.y, 0],
            opacity: [0.06, 0.16, 0.06],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </>
  )
}

/** Desktop-style ambient environment — wallpaper + chrome, never competing with content. */
export function AmbientBackground() {
  const reduced = usePrefersReducedMotion()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <WallpaperMesh />
      <DesktopGrid />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 30%, rgba(5,5,7,0.55) 100%)',
        }}
      />

      {/* Subtle scanlines */}
      <div
        className="os-scanlines absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.035) 3px)',
        }}
      />

      <MenuBarChrome />

      {WINDOWS.map((w, i) => (
        <GhostWindow key={i} {...w} reduced={reduced} />
      ))}

      {!reduced ? <ParticleField count={22} /> : null}

      {/* Moving ambient orbs */}
      <motion.div
        className="absolute -left-1/4 top-[20%] h-[40vh] w-[50vw] rounded-full bg-[radial-gradient(circle,rgba(91,159,212,0.09)_0%,transparent_70%)] blur-3xl"
        animate={reduced ? undefined : { x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-1/5 bottom-[10%] h-[36vh] w-[45vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.03)_0%,transparent_70%)] blur-3xl"
        animate={reduced ? undefined : { x: [0, -30, 0], y: [0, -24, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
