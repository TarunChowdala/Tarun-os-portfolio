import { useEffect, useRef, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/types'

const SUGGESTIONS = [
  { cmd: 'projects', label: 'What projects should I look at?' },
  { cmd: 'architecture', label: 'Describe your architecture' },
  { cmd: 'stack', label: 'What is your stack?' },
  { cmd: 'contact', label: 'How can I contact you?' },
] as const

function TypedText({ text, animate }: { text: string; animate: boolean }) {
  const reduced = usePrefersReducedMotion()
  const [shown, setShown] = useState(animate && !reduced ? '' : text)

  useEffect(() => {
    if (!animate || reduced) {
      setShown(text)
      return
    }
    setShown('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, 12)
    return () => clearInterval(id)
  }, [text, animate, reduced])

  return (
    <>
      {shown}
      {animate && shown.length < text.length ? (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-[2px] animate-pulse bg-[var(--color-accent)]" />
      ) : null}
    </>
  )
}

function TerminalLine({ msg, typewrite }: { msg: ChatMessage; typewrite: boolean }) {
  const isUser = msg.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="font-[family-name:var(--font-mono)] text-[12px] leading-relaxed sm:text-[13px]"
    >
      {isUser ? (
        <p className="text-[var(--color-fg)]">
          <span className="text-[var(--color-success)]">guest@tarun</span>
          <span className="text-[var(--color-subtle)]">:</span>
          <span className="text-[var(--color-accent)]">~</span>
          <span className="text-[var(--color-subtle)]">$ </span>
          {msg.content}
        </p>
      ) : (
        <div className="text-[var(--color-fg-secondary)]">
          <p className="mb-1 text-[10px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
            agent ▸
          </p>
          <p className="whitespace-pre-wrap">
            {typewrite ? <TypedText text={msg.content} animate /> : msg.content}
          </p>
        </div>
      )}
    </motion.div>
  )
}

/** Terminal-window chat surface. */
export function ChatPanel({ compact = false }: { compact?: boolean }) {
  const { messages, isTyping, send, live } = useAIChatLauncher()
  const [input, setInput] = useState('')
  const [typedIds, setTypedIds] = useState<Set<string>>(() => new Set(['welcome']))
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const prevCount = useRef(messages.length)
  const inputId = compact ? 'ai-modal-input' : 'ai-input'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }, [messages, isTyping])

  useEffect(() => {
    if (messages.length > prevCount.current) {
      const last = messages[messages.length - 1]
      if (last?.role === 'assistant') {
        setTypedIds((prev) => {
          const next = new Set(prev)
          messages.slice(0, -1).forEach((m) => {
            if (m.role === 'assistant') next.add(m.id)
          })
          return next
        })
      }
    }
    prevCount.current = messages.length
  }, [messages])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void send(input)
    setInput('')
  }

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-xl bg-[#0a0c10]">
      {/* Window title bar */}
      <div className="flex shrink-0 items-center gap-3 border-b border-white/[0.08] bg-[#0e1218] px-3 py-2.5 pr-12">
        <div className="flex gap-1.5" aria-hidden>
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/65" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/65" />
        </div>
        <p className="flex-1 text-center font-[family-name:var(--font-mono)] text-[11px] tracking-wide text-[var(--color-subtle)]">
          agent — zsh — 80×24
        </p>
        <span className="rounded border border-white/10 px-1.5 py-0.5 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-[var(--color-accent)]">
          {live ? 'live' : 'mock'}
        </span>
      </div>

      {/* Terminal output */}
      <div
        data-lenis-prevent
        className={cn(
          'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain bg-[#080a0e] px-4 py-4',
          compact ? 'max-h-[min(48dvh,400px)]' : 'max-h-[420px] min-h-[280px]',
        )}
        role="log"
        aria-live="polite"
        aria-relevant="additions"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onClick={() => inputRef.current?.focus()}
      >
        <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-subtle)]">
          Last login: {new Date().toLocaleString()} on ttys001
        </p>

        {messages.map((msg, idx) => {
          const isLastAssistant =
            msg.role === 'assistant' && idx === messages.length - 1 && !typedIds.has(msg.id)
          return <TerminalLine key={msg.id} msg={msg} typewrite={isLastAssistant} />
        })}

        <AnimatePresence>
          {isTyping ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-[family-name:var(--font-mono)] text-[12px] text-[var(--color-accent)]"
            >
              agent ▸ thinking
              <span className="ml-1 inline-block animate-pulse">▋</span>
            </motion.p>
          ) : null}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* Command suggestions */}
      <div className="shrink-0 border-t border-white/[0.06] bg-[#0a0c10] px-3 pt-2.5">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.cmd}
              type="button"
              onClick={() => void send(s.label)}
              className="cursor-pointer rounded border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)]"
            >
              ./{s.cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal input */}
      <form
        onSubmit={onSubmit}
        className="shrink-0 border-t border-white/[0.08] bg-[#05070a] px-3 py-3"
      >
        <label htmlFor={inputId} className="sr-only">
          Terminal command
        </label>
        <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[13px]">
          <span className="shrink-0 select-none">
            <span className="text-[var(--color-success)]">guest@tarun</span>
            <span className="text-[var(--color-subtle)]">:</span>
            <span className="text-[var(--color-accent)]">~</span>
            <span className="text-[var(--color-subtle)]">$</span>
          </span>
          <input
            ref={inputRef}
            id={inputId}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ask about projects, stack, contact…"
            className="min-w-0 flex-1 bg-transparent text-[var(--color-fg)] caret-[var(--color-accent)] outline-none placeholder:text-[var(--color-subtle)]/70"
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded px-2 py-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-wider text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-soft)]"
            aria-label="Run command"
          >
            enter ↵
          </button>
        </div>
      </form>
    </div>
  )
}
