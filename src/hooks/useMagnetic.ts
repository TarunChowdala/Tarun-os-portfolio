import type { PointerEvent } from 'react'
import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Gentle magnetic pull toward cursor — transform only. */
export function useMagnetic(strength = 0.28) {
  const ref = useRef<HTMLButtonElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLButtonElement>) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      ref.current.style.transform = `translate3d(${dx * strength}px, ${dy * strength}px, 0)`
    },
    [reduced, strength],
  )

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'translate3d(0,0,0)'
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
