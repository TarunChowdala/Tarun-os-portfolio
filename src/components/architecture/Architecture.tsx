import { ExternalLink, GitBranch } from 'lucide-react'
import { PROJECT_ARCHITECTURES } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ArchGraphView } from '@/components/architecture/ArchGraphView'
import { cn } from '@/lib/utils'

/** Tabbed node graphs for public projects only. */
export function Architecture() {
  const defaultId = PROJECT_ARCHITECTURES[0]?.id ?? 'smartchat'

  return (
    <SectionReveal id="architecture" className="section-pad">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Architecture"
          title="How the public projects are wired."
          description="SmartChat, Scoutn, and Madvira as node maps. Company work stays out."
        />

        <div className="glass glass-reflect rounded-[var(--radius-xl)] p-4 sm:p-5">
          <Tabs defaultValue={defaultId}>
            <TabsList className="h-auto w-full flex-wrap justify-start sm:w-auto">
              {PROJECT_ARCHITECTURES.map((arch) => (
                <TabsTrigger
                  key={arch.id}
                  value={arch.id}
                  className={cn('cursor-pointer')}
                >
                  {arch.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {PROJECT_ARCHITECTURES.map((arch) => (
              <TabsContent key={arch.id} value={arch.id} className="mt-4">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <p className="max-w-xl text-sm text-[var(--color-muted)]">{arch.summary}</p>
                  <div className="flex flex-wrap gap-2">
                    {arch.demoUrl ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 cursor-pointer"
                        onClick={() => window.open(arch.demoUrl, '_blank')}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Live
                      </Button>
                    ) : null}
                    {arch.githubUrl ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 cursor-pointer"
                        onClick={() => window.open(arch.githubUrl, '_blank')}
                      >
                        <GitBranch className="h-3.5 w-3.5" />
                        Repo
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-white/[0.06] bg-black/20 p-2 sm:p-3">
                  <ArchGraphView arch={arch} />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </SectionReveal>
  )
}
