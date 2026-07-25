# Portfolio AI API

Stateless **Vercel Serverless** backend for the portfolio **"Talk to AI"** chatbot.  
Gemini key stays on the server — never in the React/Vite frontend.

```
React + Vite Portfolio
        │
        ▼
Talk to AI
        │
        ▼
POST /api/chat
        │
        ▼
Vercel Function (this repo)
        │
        ▼
Gemini API
```

## Stack

- Vercel Serverless Functions (`api/chat.ts`)
- TypeScript
- Official SDK: [`@google/genai`](https://www.npmjs.com/package/@google/genai)

No FastAPI / Express / LangChain / Redis / DB. **No server-side chat history.**

## Project layout

```
portfolio-ai-api/
├── api/
│   └── chat.ts              # POST /api/chat
├── lib/
│   ├── gemini.ts            # Gemini client + generateContent
│   └── portfolio-context.ts # System prompt + Tarun's portfolio KB
├── utils/
│   ├── cors.ts
│   └── validation.ts
├── package.json
├── tsconfig.json
├── vercel.json
└── .env.example
```

## Setup

```bash
cd portfolio-ai-api
npm install
cp .env.example .env
# put GEMINI_API_KEY=... in .env
```

### Local

```bash
npx vercel dev
# → http://localhost:3000/api/chat
```

Do **not** put `vercel dev` in the `package.json` `dev` script — Vercel will recurse and crash.

### Deploy

```bash
npx vercel          # preview
npx vercel --prod   # production
```

In the Vercel project settings, add:

| Name | Value |
|------|--------|
| `GEMINI_API_KEY` | your Gemini key |
| `ALLOWED_ORIGINS` | `https://your-portfolio.vercel.app,http://localhost:5173` |
| `GEMINI_MODEL` | optional, default `gemini-2.5-flash` |

## API

### `POST /api/chat`

**Request**

```json
{
  "messages": [
    { "role": "user", "content": "Tell me about Tarun." },
    { "role": "assistant", "content": "…" },
    { "role": "user", "content": "What projects has he built?" }
  ]
}
```

- Max **15** messages per request (trim on the client).
- Last message **must** be `role: "user"`.
- Frontend owns full history (e.g. `localStorage`) and sends only the recent window.

**Success `200`**

```json
{
  "reply": "Tarun has built ContactSwing, Scoutn, SmartChat AI, and Madvira…",
  "model": "gemini-2.5-flash"
}
```

**Errors**

| Status | When |
|--------|------|
| `400` | Invalid body / roles / empty content / too many messages |
| `403` | Origin not in `ALLOWED_ORIGINS` |
| `405` | Not `POST` |
| `500` | Missing `GEMINI_API_KEY` |
| `502` | Gemini failure / empty model output |

`OPTIONS` is supported for CORS preflight.

## Frontend call sketch

```ts
const recent = messages.slice(-15).map(({ role, content }) => ({ role, content }))

const res = await fetch(`${import.meta.env.VITE_CHAT_API_URL}/api/chat`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: recent }),
})

const data = await res.json()
if (!res.ok) throw new Error(data.error ?? 'Chat failed')
// data.reply
```

Set `VITE_CHAT_API_URL` on the portfolio (e.g. `https://portfolio-ai-api.vercel.app`) — **never** put `GEMINI_API_KEY` in Vite env.

## Updating knowledge

Edit `lib/portfolio-context.ts` when experience / projects / links change, then redeploy.
