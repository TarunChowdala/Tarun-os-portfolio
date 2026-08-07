import { useState } from 'react'
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
import { SectionReveal } from '@/components/ui/section-reveal'
import { ArchGraphView } from '@/components/architecture/ArchGraphView'
import { cn } from '@/lib/utils'

function ProjectThumb({ project }: { project: Project }) {
  return (
    <div
      className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md border border-white/[0.08] sm:h-16 sm:w-28"
      style={{ background: project.coverGradient }}
    >
      {project.coverImage ? (
        <img
          src={project.coverImage}
          alt=""
          className="h-full w-full object-cover object-[center_20%]"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(91,159,212,0.35),transparent_60%)]" />
      )}
    </div>
  )
}

function ProjectRow({
  project,
  onOpen,
  onArchitecture,
}: {
  project: Project
  onOpen: (p: Project) => void
  onArchitecture: (p: Project) => void
}) {
  const hasArch = PROJECT_ARCHITECTURES.some((a) => a.id === project.id)

  return (
    <motion.li
      variants={fadeUp}
      className="group border-b border-white/[0.08] transition-colors hover:bg-white/[0.02]"
    >
      <div className="flex flex-col gap-3 px-0 py-4 sm:flex-row sm:items-center sm:gap-5 sm:py-3.5">
        <button
          type="button"
          onClick={() => onOpen(project)}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left sm:gap-4"
        >
          <ProjectThumb project={project} />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <h3 className="font-[family-name:var(--font-display)] text-base font-semibold tracking-tight text-[var(--color-fg)] sm:text-lg">
                {project.title}
              </h3>
              {project.featured ? (
                <span className="font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-[0.14em] text-[var(--color-accent)]">
                  Featured
                </span>
              ) : null}
            </div>
            <p className="mt-0.5 line-clamp-1 text-sm text-[var(--color-muted)]">
              {project.tagline}
            </p>
            <ul className="mt-2 hidden flex-wrap gap-x-2.5 gap-y-0.5 sm:flex">
              {project.techStack.slice(0, 5).map((t) => (
                <li
                  key={t}
                  className="font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.1em] text-[var(--color-subtle)]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <ArrowUpRight className="hidden h-4 w-4 shrink-0 text-[var(--color-subtle)] transition group-hover:text-[var(--color-accent)] sm:block" />
        </button>

        <div className="flex shrink-0 items-center gap-2 pl-[calc(5rem+0.75rem)] sm:pl-0">
          {hasArch ? (
            <button
              type="button"
              onClick={() => onArchitecture(project)}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/35 hover:text-[var(--color-accent)]"
            >
              <Boxes className="h-3 w-3" />
              Arch
            </button>
          ) : null}
          {project.demoUrl ? (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.08] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)]/35 hover:text-[var(--color-accent)]"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
          ) : null}
        </div>
      </div>
    </motion.li>
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
            className="h-28 w-full rounded-md object-cover object-[center_15%] sm:h-32"
          />
        ) : (
          <div className="relative flex h-24 items-end overflow-hidden rounded-md px-4 pb-4 sm:h-28">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(91,159,212,0.25),transparent_55%)]" />
            <div className="relative">
              <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-white/90">
                {project.title}
              </p>
              <p className="mt-1 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.14em] text-white/50">
                Company project · UI withheld
              </p>
            </div>
          </div>
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
              <li key={c} className="flex gap-2 text-sm text-[var(--color-fg-secondary)]">
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

/** Compact full-width project list — details open in dialog. */
export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null)
  const [tab, setTab] = useState('overview')
  const { ref, controls } = useReveal<HTMLUListElement>(0.12)

  const open = (p: Project, t = 'overview') => {
    setTab(t)
    setSelected(p)
  }

  return (
    <SectionReveal id="projects" className="section-pad !py-[clamp(3.5rem,8vw,6rem)]">
      <div className="w-full">
        <SectionHeading
          eyebrow="Projects"
          title="Selected systems."
          description="Dense list — open a row for architecture, stack, and challenges."
          className="mb-8 max-w-2xl"
        />

        <div className="border-t border-white/[0.08]">
          <div className="hidden items-center gap-5 border-b border-white/[0.06] py-2 font-[family-name:var(--font-mono)] text-[10px] uppercase tracking-[0.16em] text-[var(--color-subtle)] sm:flex">
            <span className="w-28 shrink-0">Preview</span>
            <span className="flex-1">Project</span>
            <span className="w-28 shrink-0 text-right">Actions</span>
          </div>

          <motion.ul
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={stagger}
            className={cn('list-none')}
          >
            {PROJECTS.map((p) => (
              <ProjectRow
                key={p.id}
                project={p}
                onOpen={(proj) => open(proj, 'overview')}
                onArchitecture={(proj) => open(proj, 'architecture')}
              />
            ))}
          </motion.ul>
        </div>
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
