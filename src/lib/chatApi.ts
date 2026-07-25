import type { ChatMessage } from '@/types'

const STORAGE_KEY = 'tarun-ai-chat-v1'
const MAX_STORED = 40
const MAX_SEND = 15

export type ApiChatRole = 'user' | 'assistant' | 'system'

export interface ApiChatMessage {
  role: ApiChatRole
  content: string
}

function chatApiBase(): string {
  return (import.meta.env.VITE_CHAT_API_URL as string | undefined)?.replace(/\/$/, '') ?? ''
}

export function isChatApiConfigured(): boolean {
  return Boolean(chatApiBase())
}

export function loadChatHistory(): ChatMessage[] | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed) || parsed.length === 0) return null
    return parsed.filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === 'object' &&
        typeof (m as ChatMessage).id === 'string' &&
        typeof (m as ChatMessage).content === 'string' &&
        ((m as ChatMessage).role === 'user' ||
          (m as ChatMessage).role === 'assistant' ||
          (m as ChatMessage).role === 'system'),
    )
  } catch {
    return null
  }
}

export function saveChatHistory(messages: ChatMessage[]) {
  try {
    const slim = messages.slice(-MAX_STORED)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slim))
  } catch {
    /* quota / private mode */
  }
}

export function clearChatHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    /* ignore */
  }
}

/** Last N turns for the serverless API (stateless). */
export function toApiPayload(messages: ChatMessage[]): ApiChatMessage[] {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .slice(-MAX_SEND)
    .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
}

export async function fetchChatReply(messages: ChatMessage[]): Promise<string> {
  const base = chatApiBase()
  if (!base) {
    throw new Error('VITE_CHAT_API_URL is not set.')
  }

  const res = await fetch(`${base}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: toApiPayload(messages) }),
  })

  let data: { reply?: string; error?: string } = {}
  try {
    data = (await res.json()) as { reply?: string; error?: string }
  } catch {
    /* non-JSON */
  }

  if (!res.ok) {
    throw new Error(data.error || `Chat API error (${res.status})`)
  }

  if (!data.reply?.trim()) {
    throw new Error('Empty reply from chat API.')
  }

  return data.reply.trim()
}
