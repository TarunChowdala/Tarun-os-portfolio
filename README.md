# Tarun AI OS

Premium AI-powered developer portfolio — React, Vite, TypeScript, Tailwind CSS, Framer Motion, React Three Fiber, GSAP, and shadcn-style Radix primitives.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — section reveals, role cycle, chat
- **React Three Fiber + Drei** — lazy-loaded hero orb
- **GSAP** — architecture diagram motion
- **Lenis** — smooth scrolling
- **Radix UI** — dialog, tabs, separator (shadcn pattern)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  components/   # feature folders + ui primitives
  data/         # placeholder content
  hooks/        # boot, chat, scroll, reveal, active section
  lib/          # cn helpers
  types/
```

## Extending

- **AI chat**: replace mock path in `hooks/useAIChat.ts` with FastAPI + LangChain
- **GitHub live stats**: set `GITHUB_TOKEN` in `.env` (see `.env.example`). Username is `TarunChowdala`. Token stays server-side via `/api/github/stats` Vite middleware — never use `VITE_` for the token.
- **Resume**: `public/resume.pdf`
