import { useCallback, useState } from 'react'
import type { ChatMessage } from '@/types'
import { AI_MOCK_REPLIES } from '@/data/site'

function mockReply(input: string): string {
  const q = input.toLowerCase()
  if (q.includes('project')) return AI_MOCK_REPLIES.projects
  if (q.includes('skill') || q.includes('stack') || q.includes('tech'))
    return AI_MOCK_REPLIES.skills
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

/**
 * Chat state with a pluggable reply path.
 * Swap `getReply` for a FastAPI + LangChain fetch later.
 */
export function useAIChat(initial?: ChatMessage[]) {
  const [messages, setMessages] = useState<ChatMessage[]>(
    initial ?? [
      {
        id: 'welcome',
        role: 'assistant',
        content:
          "Hello — I'm the portfolio assistant. Ask about projects, skills, or architecture. Responses are mocked until the backend is connected.",
        timestamp: Date.now(),
      },
    ],
  )
  const [isTyping, setIsTyping] = useState(false)

  const send = useCallback(async (content: string) => {
    const trimmed = content.trim()
    if (!trimmed) return

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsTyping(true)

    // Simulate network latency for future API parity
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400))

    const assistantMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      role: 'assistant',
      content: mockReply(trimmed),
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, assistantMsg])
    setIsTyping(false)
  }, [])

  return { messages, isTyping, send }
}
