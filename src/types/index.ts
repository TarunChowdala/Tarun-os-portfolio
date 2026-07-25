export interface NavItem {
  id: string
  label: string
}

export interface TimelineEvent {
  id: string
  year: string
  title: string
  org: string
  description: string
  tags?: string[]
}

export interface SkillNode {
  id: string
  label: string
  category: 'language' | 'framework' | 'ai' | 'infra' | 'tool'
  level: number
  description: string
  related: string[]
  x: number
  y: number
}

export interface Project {
  id: string
  title: string
  tagline: string
  overview: string
  architecture: string
  techStack: string[]
  challenges: string[]
  demoUrl?: string
  githubUrl?: string
  coverGradient: string
  /** Optional screenshot / preview under public/ */
  coverImage?: string
  featured?: boolean
}

export interface ArchGraphNode {
  id: string
  label: string
  description: string
  x: number
  y: number
}

export interface ArchGraphEdge {
  from: string
  to: string
}

export interface ProjectArchitecture {
  id: string
  label: string
  summary: string
  demoUrl?: string
  githubUrl?: string
  nodes: ArchGraphNode[]
  edges: ArchGraphEdge[]
}

export interface GitHubStat {
  id: string
  label: string
  value: string
  hint: string
}

export interface SocialLink {
  id: string
  label: string
  href: string
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}
