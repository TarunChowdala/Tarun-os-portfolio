import { useEffect, useRef } from 'react'
import { useInView, useAnimation } from 'framer-motion'

export function useReveal<T extends HTMLElement = HTMLDivElement>(amount = 0.25) {
  const ref = useRef<T | null>(null)
  const controls = useAnimation()
  const inView = useInView(ref, { once: true, amount })

  useEffect(() => {
    if (inView) void controls.start('visible')
  }, [controls, inView])

  return { ref, controls, inView }
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
}

export const stagger = {
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}
