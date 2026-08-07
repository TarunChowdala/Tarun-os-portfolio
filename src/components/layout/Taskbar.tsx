import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase,
  FolderGit2,
  Home,
  LayoutGrid,
  MessageSquare,
  Terminal,
  User,
  Mail,
  type LucideIcon,
} from 'lucide-react'
import { cn, scrollToId } from '@/lib/utils'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

interface TaskbarProps {
  activeId: string
  visible: boolean
}

const APPS: {
  id: string
  label: string
  icon: LucideIcon
}[] = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'skills', label: 'Skills', icon: Terminal },
  { id: 'projects', label: 'Projects', icon: LayoutGrid },
  { id: 'freelance', label: 'Freelance', icon: Briefcase },
  { id: 'github', label: 'GitHub', icon: FolderGit2 },
  { id: 'contact', label: 'Contact', icon: Mail },
]

export function Taskbar({ activeId, visible }: TaskbarProps) {
  const progress = useScrollProgress(visible)
  const { open, openChat, setOpen } = useAIChatLauncher()

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 28, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] sm:px-3 sm:pb-[max(1rem,env(safe-area-inset-bottom))]"
        >
          <nav
            aria-label="Primary"
            className="pointer-events-auto relative flex max-w-[calc(100vw-1rem)] items-end gap-0.5 overflow-x-auto rounded-2xl border border-white/[0.1] bg-[rgba(10,12,16,0.78)] px-1.5 py-1.5 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.85)] backdrop-blur-xl [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-1.5 sm:px-3 sm:py-2.5 [&::-webkit-scrollbar]:hidden"
          >
            <div
              className="pointer-events-none absolute inset-x-3 top-0 h-px overflow-hidden rounded-full"
              aria-hidden
            >
              <motion.div
                className="h-full origin-left bg-[var(--color-accent)]"
                style={{ scaleX: progress }}
              />
            </div>

            <ul className="flex shrink-0 items-end gap-0 sm:gap-1">
              {APPS.map((app) => {
                const Icon = app.icon
                const active =
                  app.id === 'hero' ? activeId === 'hero' : activeId === app.id
                return (
                  <li key={app.id} className="shrink-0">
                    <button
                      type="button"
                      title={app.label}
                      onClick={() => scrollToId(app.id)}
                      className={cn(
                        'group relative flex h-10 w-10 flex-col items-center justify-center rounded-xl transition-all duration-200 sm:h-12 sm:w-12',
                        active
                          ? 'bg-white/[0.1] text-[var(--color-fg)]'
                          : 'text-[var(--color-muted)] hover:bg-white/[0.06] hover:text-[var(--color-fg)]',
                      )}
                    >
                      <Icon
                        className={cn(
                          'h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]',
                          active && 'text-[var(--color-accent)]',
                        )}
                      />
                      <span className="sr-only">{app.label}</span>
                      {active ? (
                        <motion.span
                          layoutId="taskbar-dot"
                          className="absolute bottom-0.5 h-1 w-1 rounded-full bg-[var(--color-accent)] sm:bottom-1"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      ) : null}
                    </button>
                  </li>
                )
              })}
            </ul>

            <span className="mx-0.5 h-7 w-px shrink-0 bg-white/[0.08] sm:h-8" aria-hidden />

            <button
              type="button"
              title="Talk with AI"
              onClick={() => (open ? setOpen(false) : openChat())}
              className={cn(
                'group relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 sm:h-12 sm:w-12',
                open
                  ? 'bg-[var(--color-accent)] text-[var(--color-bg)]'
                  : 'bg-[var(--color-accent-soft)] text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]',
              )}
            >
              <MessageSquare className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 sm:h-[18px] sm:w-[18px]" />
              <span className="sr-only">Talk with AI</span>
            </button>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
