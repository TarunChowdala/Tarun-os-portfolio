import { MessageSquare, Sparkles } from 'lucide-react'
import { SectionHeading } from '@/components/ui/section-heading'
import { SectionReveal } from '@/components/ui/section-reveal'
import { Button } from '@/components/ui/button'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

/** Slim AI section — opens the floating chat modal instead of inline chat. */
export function AIAssistant() {
  const { openChat } = useAIChatLauncher()

  return (
    <SectionReveal id="ai" className="section-pad">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="AI Assistant"
          title="Ask anything about the work."
          description="Open the agent from the floating button — or launch it here. Mocked replies for now; FastAPI + LangChain ready later."
        />

        <div className="glass glass-reflect relative overflow-hidden rounded-[var(--radius-xl)] px-6 py-10 text-center sm:px-10">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(91,159,212,0.14),transparent_55%)]"
          />
          <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-20" />
            <Sparkles className="relative h-6 w-6" />
          </div>
          <h3 className="relative font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
            Talk with AI
          </h3>
          <p className="relative mx-auto mt-2 max-w-md text-sm text-[var(--color-muted)]">
            Ask about ContactSwing, Scout, stack, or how to get in touch. The pulse button stays
            available anywhere on the page.
          </p>
          <div className="relative mt-7 flex justify-center">
            <Button size="lg" variant="accent" onClick={openChat}>
              <MessageSquare className="h-4 w-4" />
              Open chat
            </Button>
          </div>
        </div>
      </div>
    </SectionReveal>
  )
}
