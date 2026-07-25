import { useEffect, useRef } from 'react'
import Lenis from 'lenis'

/**
 * Smooth scrolling via Lenis.
 * `locked` stops Lenis (e.g. while a modal is open) without destroying it.
 */
export function useSmoothScroll(enabled: boolean, locked = false) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (!enabled) return

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      touchMultiplier: 1.2,
      // Nested scroll areas marked with data-lenis-prevent keep their own scroll
      prevent: (node) =>
        node.closest('[data-lenis-prevent]') != null ||
        node.closest('[role="dialog"]') != null ||
        document.documentElement.classList.contains('chat-open'),
    })
    lenisRef.current = lenis

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [enabled])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return
    if (locked) lenis.stop()
    else lenis.start()
  }, [locked, enabled])
}
