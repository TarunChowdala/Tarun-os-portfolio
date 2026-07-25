import type { PointerEvent } from 'react'
import { useCallback, useRef } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/**
 * Cards react lightly to cursor proximity via CSS vars --px/--py/--glow.
 * GPU-friendly: sets custom properties only.
 */
export function useProximityGlow(maxDistance = 280) {
  const ref = useRef<HTMLElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (reduced || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const cx = rect.width / 2
      const cy = rect.height / 2
      const dist = Math.hypot(x - cx, y - cy)
      const glow = Math.max(0, 1 - dist / maxDistance)
      ref.current.style.setProperty('--px', `${(x / rect.width) * 100}%`)
      ref.current.style.setProperty('--py', `${(y / rect.height) * 100}%`)
      ref.current.style.setProperty('--glow', String(glow.toFixed(3)))
      const rx = ((y - cy) / cy) * -2.5
      const ry = ((x - cx) / cx) * 2.5
      ref.current.style.setProperty('--rx', `${rx.toFixed(2)}deg`)
      ref.current.style.setProperty('--ry', `${ry.toFixed(2)}deg`)
    },
    [maxDistance, reduced],
  )

  const onPointerLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.setProperty('--glow', '0')
    ref.current.style.setProperty('--rx', '0deg')
    ref.current.style.setProperty('--ry', '0deg')
  }, [])

  return { ref, onPointerMove, onPointerLeave }
}
