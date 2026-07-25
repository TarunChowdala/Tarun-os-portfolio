import type { VercelRequest, VercelResponse } from '@vercel/node'
import { generateChatReply } from '../lib/gemini.js'
import { corsHeaders, isOriginAllowed } from '../utils/cors.js'
import { validateChatRequest, ValidationError } from '../utils/validation.js'

function json(
  res: VercelResponse,
  status: number,
  body: Record<string, unknown>,
  origin: string | undefined,
) {
  const headers = corsHeaders(origin)
  for (const [key, value] of Object.entries(headers)) {
    res.setHeader(key, value)
  }
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  return res.status(status).json(body)
}

/**
 * POST /api/chat
 * Body: { messages: [{ role: 'user'|'assistant'|'system', content: string }, ...] }
 * Stateless — no server-side history. Client sends last ≤15 messages.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined

  if (req.method === 'OPTIONS') {
    if (!isOriginAllowed(origin)) {
      return json(res, 403, { error: 'Origin not allowed.' }, origin)
    }
    const headers = corsHeaders(origin)
    for (const [key, value] of Object.entries(headers)) {
      res.setHeader(key, value)
    }
    return res.status(204).end()
  }

  if (req.method !== 'POST') {
    return json(
      res,
      405,
      { error: 'Method not allowed. Use POST.' },
      origin,
    )
  }

  if (!isOriginAllowed(origin)) {
    return json(res, 403, { error: 'Origin not allowed.' }, origin)
  }

  try {
    const { messages } = validateChatRequest(req.body)
    const reply = await generateChatReply(messages)

    return json(
      res,
      200,
      {
        reply,
        model: process.env.GEMINI_MODEL?.trim() || 'gemini-flash-latest',
      },
      origin,
    )
  } catch (err) {
    if (err instanceof ValidationError) {
      return json(res, err.status, { error: err.message }, origin)
    }

    const message = err instanceof Error ? err.message : 'Unexpected server error.'

    if (message.includes('GEMINI_API_KEY')) {
      console.error('[api/chat] missing API key')
      return json(
        res,
        500,
        { error: 'Chat service is not configured. Please try again later.' },
        origin,
      )
    }

    console.error('[api/chat]', err)
    return json(
      res,
      502,
      { error: 'Failed to generate a reply. Please try again.' },
      origin,
    )
  }
}
