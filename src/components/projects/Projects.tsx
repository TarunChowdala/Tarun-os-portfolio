import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, GitBranch, ArrowUpRight, Boxes } from 'lucide-react'
import { PROJECT_ARCHITECTURES, PROJECTS } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import type { Project } from '@/types'
import { fadeUp, stagger, useReveal } from '@/hooks/useReveal'
import { useProximityGlow } from '@/hooks/useProximityGlow'
import { SectionReveal } from '@/components/ui/section-reveal'
import { ArchGraphView } from '@/components/architecture/ArchGraphView'
import { cn } from '@/lib/utils'

function ProjectCard({
  project,
  onOpen,
  onArchitecture,
}: {
  project: Project
  onOpen: (p: Project) => void
  onArchitecture: (p: Project) => void
}) {
  const { ref, onPointerMove, onPointerLeave } = useProximityGlow()
  const articleRef = useRef<HTMLElement | null>(null)

  return (
    <motion.article
      variants={fadeUp}
      ref={(node) => {
        articleRef.current = node
        ref.current = node
      }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className={cn(
        'group proximity-card border-glow glass relative flex flex-col overflow-hidden rounded-[var(--radius-xl)]',
        'hover:border-white/20 hover:shadow-[0_20px_50px_-24px_rgba(91,159,212,0.45)]',
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative z-[1] text-left focus-visible:outline-none"
      >
        <div
          className="relative aspect-[16/10] overflow-hidden sm:aspect-[16/9]"
          style={{ background: project.coverGradient }}
        >
          {project.coverImage ? (
            <img
              src={project.coverImage}
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_15%] opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.08),transparent_50%)] transition-transform duration-700 ease-out group-hover:scale-110" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--px)_var(--py),rgba(91,159,212,0.2),transparent_50%)]" />
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <span className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.18em] text-white/60">
              {project.featured ? 'Featured' : 'Project'}
            </span>
            <ArrowUpRight className="h-4 w-4 text-white/50 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
          </div>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="font-[family-name:var(--font-display)] text-base font-semibold leading-snug sm:text-lg">
            {project.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm text-[var(--color-muted)]">{project.tagline}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t, i) => (
              <motion.li
                key={t}
                initial={false}
                whileHover={{ y: -2 }}
                className="rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[10px] text-[var(--color-fg-secondary)] transition-colors duration-300 group-hover:border-[var(--color-accent)]/30 group-hover:text-[var(--color-fg)]"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </button>
      <div className="relative z-[1] mt-auto border-t border-[var(--color-border)] px-4 py-2.5">
        <Button
          size="sm"
          variant="ghost"
          magnetic={false}
          className="h-8 px-0 text-xs text-[var(--color-accent)] hover:bg-transparent hover:text-[var(--color-fg)]"
          onClick={() => onArchitecture(project)}
        >
          <Boxes className="h-3.5 w-3.5" />
          View Architecture
        </Button>
      </div>
    </motion.article>
  )
}

function ProjectDetail({
  project,
  defaultTab = 'overview',
}: {
  project: Project
  defaultTab?: string
}) {
  const arch = PROJECT_ARCHITECTURES.find((a) => a.id === project.id)

  return (
    <>
      <DialogHeader>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription>{project.tagline}</DialogDescription>
      </DialogHeader>

      <div
        className="overflow-hidden rounded-[var(--radius-lg)] border border-white/[0.06] p-2 sm:p-3"
        style={{ background: project.coverGradient }}
      >
        {arch ? (
          <ArchGraphView arch={arch} compact showTip />
        ) : project.coverImage ? (
          <img
            src={project.coverImage}
            alt=""
            className="h-32 w-full rounded-md object-cover object-[center_15%] sm:h-36"
          />
        ) : (
          <div className="h-28 sm:h-32" />
        )}
      </div>

      <Tabs defaultValue={defaultTab}>
        <TabsList className="flex w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="architecture">Architecture</TabsTrigger>
          <TabsTrigger value="stack">Tech Stack</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="links">Demo / GitHub</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
            {project.overview}
          </p>
        </TabsContent>
        <TabsContent value="architecture">
          <p className="text-sm leading-relaxed text-[var(--color-fg-secondary)]">
            {arch?.summary ?? project.architecture}
          </p>
          {!arch ? (
            <p className="mt-2 text-xs text-[var(--color-subtle)]">
              Node map available for public projects (SmartChat, Scoutn, Madvira).
            </p>
          ) : null}
        </TabsContent>
        <TabsContent value="stack">
          <ul className="flex flex-wrap gap-2">
            {project.techStack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[var(--color-border-strong)] bg-white/[0.03] px-3 py-1 text-xs"
              >
                {t}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="challenges">
          <ul className="space-y-2">
            {project.challenges.map((c) => (
              <li
                key={c}
                className="flex gap-2 text-sm text-[var(--color-fg-secondary)]"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--color-accent)]" />
                {c}
              </li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="links">
          <div className="flex flex-wrap gap-3">
            {project.demoUrl ? (
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => window.open(project.demoUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4" />
                Demo
              </Button>
            ) : null}
            {project.githubUrl ? (
              <Button
                variant="ghost"
                className="cursor-pointer"
                onClick={() => window.open(project.githubUrl, '_blank')}
              >
                <GitBranch className="h-4 w-4" />
                GitHub
              </Button>
            ) : null}
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [tab, setTab] = useState('overview')
  const { ref, controls } = useReveal(0.15)

  const open = (p: Project, t = 'overview') => {
    setTab(t)
    setSelected(p)
  }

  return (
    <SectionReveal id="projects" className="section-pad">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Projects"
          title="Selected systems & surfaces."
          description="Premium case cards — open any project for architecture, stack, and challenges."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={stagger}
          className="grid gap-5 sm:grid-cols-2"
        >
          {PROJECTS.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onOpen={(proj) => open(proj, 'overview')}
              onArchitecture={(proj) => open(proj, 'architecture')}
            />
          ))}
        </motion.div>
      </div>

      <Dialog
        open={Boolean(selected)}
        onOpenChange={(o) => {
          if (!o) setSelected(null)
        }}
      >
        <DialogContent>
          {selected ? (
            <ProjectDetail key={`${selected.id}-${tab}`} project={selected} defaultTab={tab} />
          ) : null}
        </DialogContent>
      </Dialog>
    </SectionReveal>
  )
}
