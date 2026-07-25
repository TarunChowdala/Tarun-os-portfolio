import { GoogleGenAI, type Content } from '@google/genai'
import { buildSystemInstruction } from './portfolio-context.js'
import type { ChatMessageInput } from '../utils/validation.js'

const DEFAULT_MODEL = 'gemini-2.5-flash'

function getApiKey(): string {
  const key = process.env.GEMINI_API_KEY?.trim()
  if (!key) {
    throw new Error('GEMINI_API_KEY is not configured on the server.')
  }
  return key
}

function getModel(): string {
  return process.env.GEMINI_MODEL?.trim() || DEFAULT_MODEL
}

/** Map portfolio chat roles → Gemini Content[] (skip system; system goes in config). */
export function toGeminiContents(messages: ChatMessageInput[]): Content[] {
  return messages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))
}

/**
 * Stateless Gemini call: system instruction + conversation turn contents.
 * Returns plain assistant text.
 */
export async function generateChatReply(messages: ChatMessageInput[]): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: getApiKey() })
  const contents = toGeminiContents(messages)

  if (contents.length === 0) {
    throw new Error('No user/assistant messages to send to Gemini.')
  }

  const response = await ai.models.generateContent({
    model: getModel(),
    contents,
    config: {
      systemInstruction: buildSystemInstruction(),
      temperature: 0.4,
      maxOutputTokens: 1024,
    },
  })

  const text = response.text?.trim()
  if (!text) {
    throw new Error('Gemini returned an empty response.')
  }

  return text
}
