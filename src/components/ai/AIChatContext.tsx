import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ChatMessage } from '@/types'
import { AI_MOCK_REPLIES } from '@/data/site'
import {
  fetchChatReply,
  isChatApiConfigured,
  loadChatHistory,
  saveChatHistory,
} from '@/lib/chatApi'

interface AIChatContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  openChat: () => void
  messages: ChatMessage[]
  isTyping: boolean
  /** Chip presets skip the LLM and use static portfolio copy. */
  send: (content: string, opts?: { preset?: string }) => Promise<void>
  live: boolean
}

const AIChatContext = createContext<AIChatContextValue | null>(null)

function mockReply(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('project')) return AI_MOCK_REPLIES.projects
  if (q.includes('skill') || q.includes('stack') || q.includes('tech'))
    return AI_MOCK_REPLIES.stack
  if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('phone'))
    return AI_MOCK_REPLIES.contact
  if (q.includes('architect') || q.includes('system'))
    return AI_MOCK_REPLIES.architecture
  if (
    q.includes('experience') ||
    q.includes('work') ||
    q.includes('swara') ||
    q.includes('job') ||
    q.includes('career')
  )
    return AI_MOCK_REPLIES.experience
  return AI_MOCK_REPLIES.default
}

function presetReply(preset: string): string | null {
  const key = preset.trim().toLowerCase()
  if (key === 'skills') return AI_MOCK_REPLIES.stack
  return AI_MOCK_REPLIES[key] ?? null
}

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hello — I'm Tarun's portfolio assistant. Ask about projects, stack, experience, or how to get in touch.",
  timestamp: Date.now(),
}

export function AIChatProvider({ children }: { children: ReactNode }) {
  const live = isChatApiConfigured()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const stored = typeof window !== 'undefined' ? loadChatHistory() : null
    return stored && stored.length > 0 ? stored : [WELCOME]
  })
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    saveChatHistory(messages)
  }, [messages])

  const openChat = useCallback(() => setOpen(true), [])

  const send = useCallback(
    async (content: string, opts?: { preset?: string }) => {
      const trimmed = content.trim()
      if (!trimmed) return

      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      }

      let thread: ChatMessage[] = []
      setMessages((prev) => {
        thread = [...prev, userMsg]
        return thread
      })
      setIsTyping(true)

      try {
        let replyText: string
        const canned = opts?.preset ? presetReply(opts.preset) : null

        if (canned) {
          // Suggestion chips → static copy, zero LLM cost
          await new Promise((r) => setTimeout(r, 180 + Math.random() * 120))
          replyText = canned
        } else if (live) {
          replyText = await fetchChatReply(thread)
        } else {
          await new Promise((r) => setTimeout(r, 500 + Math.random() * 300))
          replyText = mockReply(trimmed)
        }

        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: 'assistant',
            content: replyText,
            timestamp: Date.now(),
          },
        ])
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : 'Something went wrong. Try again.'
        setMessages((prev) => [
          ...prev,
          {
            id: `a-err-${Date.now()}`,
            role: 'assistant',
            content: `Sorry — I couldn’t reach the assistant (${msg}).`,
            timestamp: Date.now(),
          },
        ])
      } finally {
        setIsTyping(false)
      }
    },
    [live],
  )

  const value = useMemo(
    () => ({ open, setOpen, openChat, messages, isTyping, send, live }),
    [open, openChat, messages, isTyping, send, live],
  )

  return <AIChatContext.Provider value={value}>{children}</AIChatContext.Provider>
}

export function useAIChatLauncher() {
  const ctx = useContext(AIChatContext)
  if (!ctx) {
    throw new Error('useAIChatLauncher must be used within AIChatProvider')
  }
  return ctx
}
