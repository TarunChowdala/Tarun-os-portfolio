import type {
  GitHubStat,
  NavItem,
  Project,
  ProjectArchitecture,
  SkillNode,
  SocialLink,
  TimelineEvent,
} from '@/types'

export const SITE = {
  name: 'Tarun Chowdala',
  /** Short mark in chrome / nav — no “OS” wording; UI implies it. */
  product: 'Tarun',
  role: 'Full Stack Developer',
  availability: 'Open to opportunities',
  freelancing: 'Available for freelance',
  email: 'tarunchowdala300@gmail.com',
  phone: '+91 7989685788',
  location: 'Srikakulam, A.P',
  resumeUrl: '/resume.pdf',
  avatarUrl: '/me.png',
  githubUsername: 'TarunChowdala',
  tagline:
    'Full stack engineer shipping production React + FastAPI systems — with hands-on GenAI, RAG, and agent workflows.',
  stackHighlight: ['React', 'TypeScript', 'FastAPI', 'Node.js', 'GenAI', 'RAG'] as const,
  focusLine: 'Full stack · GenAI · Freelance',
} as const

export const STATUS_LINES = [
  'Open to opportunities',
  'Available for freelance',
] as const

/** Primary nav — keep short; deep sections reachable via scroll / CTAs. */
export const NAV_ITEMS: NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
]

/** Full page sections for scroll-spy (includes items not in the nav). */
export const SECTION_IDS = [
  'hero',
  'about',
  'skills',
  'projects',
  'architecture',
  'timeline',
  'github',
  'contact',
] as const

export const ROLES = [
  'Full Stack Developer',
  'React.js Engineer',
  'FastAPI + Node.js',
  'GenAI / RAG Builder',
] as const

export const BOOT_MESSAGES = [
  { id: '1', text: 'Loading profile', delay: 400 },
  { id: '2', text: 'Loading experience', delay: 900 },
  { id: '3', text: 'Loading projects', delay: 1400 },
  { id: '4', text: 'Warming assistant', delay: 1900 },
  { id: '5', text: 'Ready', delay: 2500 },
] as const

export const TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    year: '2023',
    title: 'B.Sc. Computer Science',
    org: 'HPN Degree College, Srikakulam',
    description:
      'Completed Bachelor of Science in Computer Science. Built foundations in programming, systems, and problem-solving.',
    tags: ['Education', 'CS'],
  },
  {
    id: 't2',
    year: '2024',
    title: 'Frontend Developer Intern',
    org: 'Instedia · May–Jun 2024',
    description:
      'Shipped reusable responsive React components, integrated REST APIs, fixed cross-browser UI bugs, and collaborated via Git in an Agile team.',
    tags: ['React', 'HTML/CSS', 'Bootstrap'],
  },
  {
    id: 't3',
    year: '2024',
    title: 'Full Stack Developer',
    org: 'Swara Tech · Sep 2024 – 2025',
    description:
      'Primary full-stack owner on ContactSwing (AI SaaS: calls, chat, email & automation). 15+ production screens, 50+ reusable React components, FastAPI/Node APIs, Postgres, Redis, WebSockets, GCP.',
    tags: ['React', 'FastAPI', 'GCP', 'Redis'],
  },
  {
    id: 't4',
    year: '2025+',
    title: 'Deepening GenAI systems',
    org: 'LangChain · RAG · Agents',
    description:
      'Building agentic search, RAG document Q&A, and AI resume tooling while maintaining production SaaS infrastructure.',
    tags: ['LangChain', 'LangGraph', 'FAISS'],
  },
]

export const SKILLS: SkillNode[] = [
  // —— Frontend ——
  {
    id: 'js',
    label: 'JavaScript',
    category: 'language',
    level: 92,
    description: 'ES6+ for production React apps and Node services.',
    related: ['ts', 'react', 'node'],
    x: 8,
    y: 22,
  },
  {
    id: 'ts',
    label: 'TypeScript',
    category: 'language',
    level: 88,
    description: 'Typed React interfaces for API responses and safer UI code.',
    related: ['js', 'react'],
    x: 8,
    y: 42,
  },
  {
    id: 'react',
    label: 'React.js',
    category: 'framework',
    level: 95,
    description: '50+ reusable components, Context/Zustand, React Query performance.',
    related: ['js', 'ts', 'zustand', 'fastapi', 'node'],
    x: 8,
    y: 62,
  },
  {
    id: 'zustand',
    label: 'Zustand',
    category: 'framework',
    level: 85,
    description: 'Global state for complex multi-feature React interfaces.',
    related: ['react'],
    x: 8,
    y: 82,
  },
  // —— Python API ——
  {
    id: 'python',
    label: 'Python',
    category: 'language',
    level: 90,
    description: 'FastAPI services, LangChain agents, and RAG pipelines.',
    related: ['fastapi', 'langchain'],
    x: 28,
    y: 34,
  },
  {
    id: 'fastapi',
    label: 'FastAPI',
    category: 'framework',
    level: 90,
    description: 'Production REST APIs for voice, chat, email, and AI modules.',
    related: ['python', 'react', 'postgres', 'redis', 'langchain'],
    x: 28,
    y: 62,
  },
  // —— Node API ——
  {
    id: 'node',
    label: 'Node.js',
    category: 'infra',
    level: 86,
    description: 'Express services supporting multi-channel SaaS and e-commerce APIs.',
    related: ['js', 'react', 'mongo'],
    x: 46,
    y: 48,
  },
  // —— Data ——
  {
    id: 'postgres',
    label: 'PostgreSQL',
    category: 'infra',
    level: 86,
    description: 'Schemas and queries across ContactSwing production modules.',
    related: ['fastapi', 'redis'],
    x: 64,
    y: 28,
  },
  {
    id: 'redis',
    label: 'Redis',
    category: 'infra',
    level: 82,
    description: 'Queues, caching, and async campaign automation workflows.',
    related: ['fastapi', 'postgres', 'gcp'],
    x: 64,
    y: 52,
  },
  {
    id: 'mongo',
    label: 'MongoDB',
    category: 'infra',
    level: 78,
    description: 'Document store for e-commerce catalog and order data.',
    related: ['node'],
    x: 64,
    y: 76,
  },
  // —— AI ——
  {
    id: 'langchain',
    label: 'LangChain',
    category: 'ai',
    level: 84,
    description: 'Agents, tool-calling, LangGraph memory, and RAG chains.',
    related: ['python', 'vector', 'fastapi'],
    x: 80,
    y: 34,
  },
  {
    id: 'vector',
    label: 'FAISS / Vectors',
    category: 'ai',
    level: 80,
    description: 'Semantic document search with HuggingFace embeddings.',
    related: ['langchain', 'python'],
    x: 80,
    y: 62,
  },
  // —— Cloud ——
  {
    id: 'docker',
    label: 'Docker',
    category: 'tool',
    level: 80,
    description: 'Containerized deploys and production log debugging.',
    related: ['gcp', 'fastapi', 'node'],
    x: 94,
    y: 34,
  },
  {
    id: 'gcp',
    label: 'GCP',
    category: 'infra',
    level: 78,
    description: 'Cloud Tasks, Dockerized services, production hosting.',
    related: ['docker', 'redis', 'fastapi'],
    x: 94,
    y: 62,
  },
]

export const PROJECTS: Project[] = [
  {
    id: 'contactswing',
    title: 'ContactSwing',
    tagline: 'AI-driven SaaS for calls, chat, email & automation — Swara Tech.',
    overview:
      'Production multi-channel platform where Tarun is the primary full-stack developer: 15+ screens, 50+ reusable React components, FastAPI + Node APIs, Postgres, Redis queues, WebSockets, and GCP-hosted services.',
    architecture:
      'React frontend (Context/Zustand + React Query) talking to FastAPI and Node REST services. Async work via cron, queue workers, Redis, and Google Cloud Tasks. Real-time chat over WebSockets. Multiple backend services behind Docker on GCP.',
    techStack: [
      'React.js',
      'TypeScript',
      'FastAPI',
      'Node.js',
      'PostgreSQL',
      'Redis',
      'WebSockets',
      'GCP',
      'Docker',
    ],
    challenges: [
      'Owning frontend architecture and component standards across modules',
      'Keeping multi-channel features consistent under shared state',
      'Debugging production issues across app logs, Docker, and API traces',
      'Background automation with queues and Cloud Tasks without UX lag',
    ],
    githubUrl: 'https://github.com',
    coverGradient: 'linear-gradient(145deg, #1a2332 0%, #0d1118 50%, #15202b 100%)',
    coverImage: '/projects/contactswing.svg',
    featured: true,
  },
  {
    id: 'scout',
    title: 'Scoutn — AI Web Search Agent',
    tagline: 'LangGraph agent that picks tools across search, news, wiki & YouTube.',
    overview:
      'Live Streamlit agent (search-agent-open.streamlit.app): paste a Groq key, pick a model, and chat. LangChain create_agent + LangGraph MemorySaver for multi-turn memory. Routes tools to Google Search/News/Images (Serper), Wikipedia, and YouTube — responses can include clickable video thumbnails.',
    architecture:
      'Streamlit settings sidebar (API key + model picker) over an agent orchestration layer: prompts, tools, and utilities separated. Groq-hosted LLMs for tool-calling (e.g. Llama 3.3 70B). Serper + Wikipedia + YouTube adapters; MemorySaver keeps session context.',
    techStack: [
      'Python',
      'Streamlit',
      'LangChain',
      'LangGraph',
      'Groq',
      'Serper API',
    ],
    challenges: [
      'Reliable tool selection across heterogeneous sources',
      'Multi-turn conversational memory with MemorySaver',
      'Comparing model quality/speed for tool-calling workloads',
      'Rendering rich tool results (e.g. YouTube thumbnails) in chat',
    ],
    demoUrl: 'https://search-agent-open.streamlit.app/',
    githubUrl: 'https://github.com/TarunChowdala/search-agent',
    coverGradient: 'linear-gradient(145deg, #13241c 0%, #0c1210 55%, #1a2e24 100%)',
    coverImage: '/projects/scout.png',
    featured: true,
  },
  {
    id: 'smartchat',
    title: 'SmartChat AI',
    tagline: 'AI chat, document RAG, and resume analyzer — Gemini + FastAPI.',
    overview:
      'Full-stack AI app (smartchataiapp.vercel.app): chat sessions, document Q&A with FAISS RAG, and resume-vs-JD analysis/PDF generation. FastAPI backend with Firebase Auth, Firestore, Google Gemini 2.5 Flash, usage limits, and admin tools.',
    architecture:
      'React client → FastAPI (Poetry) → Firebase Auth + Firestore. Chat/docs/resume services call Gemini; document RAG uses Gemini embeddings + FAISS. PDF resumes via Playwright + Jinja2 templates.',
    techStack: [
      'React.js',
      'FastAPI',
      'Firebase',
      'Firestore',
      'Gemini',
      'FAISS',
      'Playwright',
    ],
    challenges: [
      'Batch Gemini embeddings for large document chunk sets',
      'Free-tier usage limits (sessions, docs, resumes) with admin reset',
      'Resume scoring + PDF generation with Playwright/Jinja2',
    ],
    demoUrl: 'https://smartchataiapp.vercel.app/',
    githubUrl: 'https://github.com/TarunChowdala/smartchatAI-backend',
    coverGradient: 'linear-gradient(145deg, #141a24 0%, #0c1018 50%, #1a2230 100%)',
    coverImage: '/projects/smartchat.png',
    featured: true,
  },
  {
    id: 'madivra',
    title: 'Madvira',
    tagline: 'Premium fashion e-commerce — storefront, payments & shipping.',
    overview:
      'Live fashion store (madvira.com) with collection browsing, cart, OTP auth, Razorpay checkout, and Shiprocket fulfillment. React storefront + Node/Express APIs on MongoDB, Dockerized on VPS.',
    architecture:
      'React frontend + Node/Express REST on MongoDB. Razorpay + Shiprocket webhook sync for payments and delivery. OTP via SMTP + Fast2SMS. Docker deploy on Hostinger VPS.',
    techStack: [
      'React.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Docker',
      'Razorpay',
      'Shiprocket',
    ],
    challenges: [
      'Webhook-safe payment verification when users disconnect mid-checkout',
      'Real-time shipment status sync via Shiprocket webhooks',
      'Production Docker deploy on VPS with reliable OTP channels',
    ],
    demoUrl: 'https://madvira.com/',
    coverGradient: 'linear-gradient(145deg, #2a2218 0%, #14100c 50%, #3a3024 100%)',
    coverImage: '/projects/madvira.png',
    featured: true,
  },
]

/** Public project architectures only — ContactSwing excluded (company IP). */
export const PROJECT_ARCHITECTURES: ProjectArchitecture[] = [
  {
    id: 'smartchat',
    label: 'SmartChat',
    summary:
      'React app → FastAPI: Firebase Auth, Firestore, Gemini chat/RAG/resume, FAISS vectors.',
    demoUrl: 'https://smartchataiapp.vercel.app/',
    githubUrl: 'https://github.com/TarunChowdala/smartchatAI-backend',
    nodes: [
      { id: 'sc-react', label: 'React', description: 'Chat, docs, resume UI (Vercel)', x: 12, y: 50 },
      { id: 'sc-api', label: 'FastAPI', description: 'Services + DI layer', x: 34, y: 50 },
      { id: 'sc-auth', label: 'Firebase', description: 'Auth + idToken verify', x: 34, y: 22 },
      { id: 'sc-fs', label: 'Firestore', description: 'Users, sessions, messages', x: 34, y: 78 },
      { id: 'sc-gemini', label: 'Gemini', description: 'Chat + embeddings + resume', x: 58, y: 32 },
      { id: 'sc-faiss', label: 'FAISS', description: 'Doc vectorstore / RAG', x: 58, y: 68 },
      { id: 'sc-pdf', label: 'Playwright', description: 'Resume PDF templates', x: 84, y: 50 },
    ],
    edges: [
      { from: 'sc-react', to: 'sc-api' },
      { from: 'sc-api', to: 'sc-auth' },
      { from: 'sc-api', to: 'sc-fs' },
      { from: 'sc-api', to: 'sc-gemini' },
      { from: 'sc-api', to: 'sc-faiss' },
      { from: 'sc-gemini', to: 'sc-faiss' },
      { from: 'sc-api', to: 'sc-pdf' },
    ],
  },
  {
    id: 'scout',
    label: 'Scoutn',
    summary:
      'Streamlit Web Search Agent — LangChain create_agent + Groq, tools for web/news/images/wiki/YouTube.',
    demoUrl: 'https://search-agent-open.streamlit.app/',
    githubUrl: 'https://github.com/TarunChowdala/search-agent',
    nodes: [
      {
        id: 'ui',
        label: 'Streamlit',
        description: 'app.py — chat UI, sidebar key/model, media render',
        x: 12,
        y: 50,
      },
      {
        id: 'agent',
        label: 'create_agent',
        description: 'LangChain agent + tool wiring (prompts.py)',
        x: 36,
        y: 50,
      },
      {
        id: 'memory',
        label: 'MemorySaver',
        description: 'LangGraph checkpointer — multi-turn memory',
        x: 36,
        y: 78,
      },
      {
        id: 'groq',
        label: 'Groq LLM',
        description: '120B / Qwen 27B / Llama 70B / 20B picker',
        x: 36,
        y: 22,
      },
      {
        id: 'wiki',
        label: 'Wikipedia',
        description: 'Definitions, history, bios',
        x: 64,
        y: 18,
      },
      {
        id: 'serper',
        label: 'Serper',
        description: 'Google web / news / images',
        x: 64,
        y: 42,
      },
      {
        id: 'youtube',
        label: 'YouTube',
        description: 'Video search → clickable thumbnails',
        x: 64,
        y: 66,
      },
      {
        id: 'utils',
        label: 'utils.py',
        description: 'show_images / show_videos in the UI',
        x: 88,
        y: 50,
      },
    ],
    edges: [
      { from: 'ui', to: 'agent' },
      { from: 'agent', to: 'groq' },
      { from: 'agent', to: 'memory' },
      { from: 'agent', to: 'wiki' },
      { from: 'agent', to: 'serper' },
      { from: 'agent', to: 'youtube' },
      { from: 'serper', to: 'utils' },
      { from: 'youtube', to: 'utils' },
      { from: 'utils', to: 'ui' },
    ],
  },
  {
    id: 'madivra',
    label: 'Madvira',
    summary:
      'Live fashion store — React storefront, Node APIs, Mongo, Razorpay & Shiprocket.',
    demoUrl: 'https://madvira.com/',
    nodes: [
      { id: 'md-react', label: 'React', description: 'Storefront + admin (madvira.com)', x: 12, y: 50 },
      { id: 'md-api', label: 'Node/Express', description: 'REST catalog & orders', x: 34, y: 50 },
      { id: 'md-mongo', label: 'MongoDB', description: 'Products, coupons, orders', x: 56, y: 50 },
      { id: 'md-pay', label: 'Razorpay', description: 'Payments + webhooks', x: 78, y: 28 },
      { id: 'md-ship', label: 'Shiprocket', description: 'Fulfillment + tracking', x: 78, y: 50 },
      { id: 'md-otp', label: 'OTP/SMTP', description: 'Fast2SMS + email auth', x: 78, y: 72 },
      { id: 'md-docker', label: 'Docker', description: 'VPS containers', x: 56, y: 78 },
    ],
    edges: [
      { from: 'md-react', to: 'md-api' },
      { from: 'md-api', to: 'md-mongo' },
      { from: 'md-api', to: 'md-pay' },
      { from: 'md-api', to: 'md-ship' },
      { from: 'md-api', to: 'md-otp' },
      { from: 'md-api', to: 'md-docker' },
    ],
  },
]

export const GITHUB_STATS: GitHubStat[] = [
  { id: 'commits', label: 'Commits (90d)', value: '—', hint: 'Live via /api/github/stats' },
  { id: 'stars', label: 'Stars', value: '—', hint: 'Live via /api/github/stats' },
  { id: 'repos', label: 'Public repos', value: '—', hint: 'Live via /api/github/stats' },
  { id: 'langs', label: 'Top language', value: '—', hint: 'Live via /api/github/stats' },
  { id: 'streak', label: 'Contributions', value: '—', hint: 'Needs GITHUB_TOKEN' },
  { id: 'prs', label: 'Merged PRs', value: '—', hint: 'Needs GITHUB_TOKEN' },
]

export const SOCIALS: SocialLink[] = [
  { id: 'github', label: 'GitHub', href: 'https://github.com/TarunChowdala' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/tarun-chowdala-77214125b/',
  },
  { id: 'email', label: 'Email', href: 'mailto:tarunchowdala300@gmail.com' },
  { id: 'phone', label: 'Call', href: 'tel:+917989685788' },
  { id: 'resume', label: 'Resume', href: '/resume.pdf' },
]

/** Mock replies until FastAPI + LangChain are wired. */
export const AI_MOCK_REPLIES: Record<string, string> = {
  default:
    "I'm Tarun Chowdala's portfolio assistant (mock mode). Ask about ContactSwing, Scoutn, SmartChat, Madvira, or his React/FastAPI/GenAI stack.",
  projects:
    'Key work: ContactSwing (Swara Tech), Scoutn (live search agent), SmartChat AI (Gemini chat/RAG/resume — smartchataiapp.vercel.app), Madvira fashion store (madvira.com).',
  skills:
    'Stack: React.js, TypeScript, FastAPI, Node.js, PostgreSQL, Redis, LangChain/LangGraph, FAISS, Docker, GCP. Explore the Skills graph for relationships.',
  contact:
    'Email tarunchowdala300@gmail.com or call +91 7989685788 · based in Srikakulam, AP. Social links are in Contact.',
  architecture:
    'Architecture tabs: SmartChat (React→FastAPI→Firebase/Gemini/FAISS), Scoutn (Streamlit→LangGraph→Groq), Madvira (React→Node→Mongo + Razorpay/Shiprocket).',
  experience:
    '2+ years building production web apps. Previously Full Stack at Swara Tech on ContactSwing (Sep 2024–2025) and Frontend Intern at Instedia (May–Jun 2024). Now open to full-time roles and freelance.',
}
