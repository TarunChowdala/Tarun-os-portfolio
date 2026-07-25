import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export interface CursorPoint {
  x: number
  y: number
}

/** Tracks pointer for glow / proximity — rAF batched, disabled on reduced motion & touch. */
export function useCursorGlow(enabled = true) {
  const reduced = usePrefersReducedMotion()
  const [point, setPoint] = useState<CursorPoint>({ x: -9999, y: -9999 })
  const [visible, setVisible] = useState(false)
  const target = useRef(point)
  const raf = useRef(0)

  useEffect(() => {
    if (!enabled || reduced) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const onMove = (e: PointerEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
      if (raf.current) return
      raf.current = requestAnimationFrame(() => {
        setPoint({ ...target.current })
        raf.current = 0
      })
    }
    const onLeave = () => setVisible(false)

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [enabled, reduced])

  return { point, visible: visible && !reduced }
}
