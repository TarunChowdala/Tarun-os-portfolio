import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BootScreen } from '@/components/boot/BootScreen'
import { Taskbar } from '@/components/layout/Taskbar'
import { Footer } from '@/components/layout/Footer'
import { AmbientBackground } from '@/components/layout/AmbientBackground'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/about/About'
import { AIChatProvider, useAIChatLauncher } from '@/components/ai/AIChatContext'
import { AIChatWidget } from '@/components/ai/AIChatWidget'
import { Skills } from '@/components/skills/Skills'
import { Projects } from '@/components/projects/Projects'
import { Architecture } from '@/components/architecture/Architecture'
import { Timeline } from '@/components/timeline/Timeline'
import { GitHubDashboard } from '@/components/github/GitHubDashboard'
import { Contact } from '@/components/contact/Contact'
import { useActiveSection } from '@/hooks/useActiveSection'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { SECTION_IDS } from '@/data/site'

const BOOT_KEY = 'tarun-ai-os-booted'

function hasBootedThisSession() {
  try {
    return sessionStorage.getItem(BOOT_KEY) === '1'
  } catch {
    return false
  }
}

function AppShell() {
  const reducedMotion = usePrefersReducedMotion()
  const { open: chatOpen } = useAIChatLauncher()
  const [booting, setBooting] = useState(() => !hasBootedThisSession())
  const ready = !booting

  useSmoothScroll(ready && !reducedMotion, chatOpen)

  const sectionIds = useMemo(() => [...SECTION_IDS], [])
  const activeId = useActiveSection(sectionIds, ready)

  const finishBoot = useCallback(() => {
    try {
      sessionStorage.setItem(BOOT_KEY, '1')
    } catch {
      /* ignore */
    }
    setBooting(false)
  }, [])

  return (
    <>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <AnimatePresence>
        {booting ? <BootScreen onComplete={finishBoot} /> : null}
      </AnimatePresence>

      {ready ? (
        <>
          <AmbientBackground />
          <Taskbar activeId={activeId} visible />
          <main className="pb-24">
            <Hero />
            <About />
            {/* <AIAssistant /> */}
            <Skills />
            <Projects />
            <Architecture />
            <Timeline />
            <GitHubDashboard />
            <Contact />
          </main>
          <Footer />
          <AIChatWidget />
        </>
      ) : null}
    </>
  )
}

export default function App() {
  return (
    <AIChatProvider>
      <AppShell />
    </AIChatProvider>
  )
}
