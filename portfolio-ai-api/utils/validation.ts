export type ChatRole = 'user' | 'assistant' | 'system'

export interface ChatMessageInput {
  role: ChatRole
  content: string
}

export interface ChatRequestBody {
  messages: ChatMessageInput[]
}

export class ValidationError extends Error {
  status: number

  constructor(message: string, status = 400) {
    super(message)
    this.name = 'ValidationError'
    this.status = status
  }
}

const MAX_MESSAGES = 15
const MAX_CONTENT_LENGTH = 4_000
const ALLOWED_ROLES: ChatRole[] = ['user', 'assistant', 'system']

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Validate + normalize POST /api/chat body.
 * Keeps only the last 15 messages (frontend should already trim).
 */
export function validateChatRequest(body: unknown): ChatRequestBody {
  if (!isRecord(body)) {
    throw new ValidationError('Request body must be a JSON object.')
  }

  if (!Array.isArray(body.messages)) {
    throw new ValidationError('`messages` must be an array.')
  }

  if (body.messages.length === 0) {
    throw new ValidationError('`messages` must contain at least one message.')
  }

  if (body.messages.length > MAX_MESSAGES) {
    throw new ValidationError(
      `\`messages\` may contain at most ${MAX_MESSAGES} items. Trim history on the client.`,
    )
  }

  const messages: ChatMessageInput[] = []

  for (let i = 0; i < body.messages.length; i++) {
    const item = body.messages[i]
    if (!isRecord(item)) {
      throw new ValidationError(`messages[${i}] must be an object.`)
    }

    const role = item.role
    const content = item.content

    if (typeof role !== 'string' || !ALLOWED_ROLES.includes(role as ChatRole)) {
      throw new ValidationError(
        `messages[${i}].role must be one of: ${ALLOWED_ROLES.join(', ')}.`,
      )
    }

    if (typeof content !== 'string') {
      throw new ValidationError(`messages[${i}].content must be a string.`)
    }

    const trimmed = content.trim()
    if (!trimmed) {
      throw new ValidationError(`messages[${i}].content cannot be empty.`)
    }

    if (trimmed.length > MAX_CONTENT_LENGTH) {
      throw new ValidationError(
        `messages[${i}].content exceeds ${MAX_CONTENT_LENGTH} characters.`,
      )
    }

    messages.push({ role: role as ChatRole, content: trimmed })
  }

  const last = messages[messages.length - 1]
  if (last.role !== 'user') {
    throw new ValidationError('The last message must have role "user".')
  }

  return { messages: messages.slice(-MAX_MESSAGES) }
}
