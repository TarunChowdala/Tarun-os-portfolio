import { motion } from 'framer-motion'
import { useBootSequence } from '@/hooks/useBootSequence'
import { SITE } from '@/data/site'

interface BootScreenProps {
  onComplete: () => void
  skip?: boolean
}

export function BootScreen({ onComplete, skip }: BootScreenProps) {
  const { messages, progress, done } = useBootSequence({ onComplete, skip })

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-bg)]"
      animate={done ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="w-full max-w-md px-8">
        <p className="mb-8 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.18em] text-[var(--color-fg)]">
          {SITE.product.toUpperCase()}
        </p>

        <ul className="space-y-3 font-[family-name:var(--font-mono)] text-sm">
          {messages.map((msg) => (
            <motion.li
              key={msg.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-3 text-[var(--color-fg-secondary)]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {msg.text}
              {msg.text === 'Ready' ? (
                <span className="text-[var(--color-success)]">✓</span>
              ) : null}
            </motion.li>
          ))}
        </ul>

        <div className="mt-10 h-px w-full overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-[var(--color-accent)]"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="mt-3 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.2em] text-[var(--color-subtle)]">
          {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  )
}
