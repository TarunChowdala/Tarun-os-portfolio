import { useEffect, useState } from 'react'
import { BOOT_MESSAGES } from '@/data/site'

interface UseBootSequenceOptions {
  onComplete: () => void
  /** Skip if user already booted this session */
  skip?: boolean
}

export function useBootSequence({ onComplete, skip = false }: UseBootSequenceOptions) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (skip) {
      onComplete()
      return
    }

    const timers: number[] = []

    BOOT_MESSAGES.forEach((msg, index) => {
      timers.push(
        window.setTimeout(() => {
          setVisibleCount(index + 1)
          setProgress(((index + 1) / BOOT_MESSAGES.length) * 100)
        }, msg.delay),
      )
    })

    const finish = window.setTimeout(() => {
      setDone(true)
      window.setTimeout(onComplete, 500)
    }, BOOT_MESSAGES[BOOT_MESSAGES.length - 1].delay + 700)

    timers.push(finish)
    return () => timers.forEach((t) => clearTimeout(t))
  }, [onComplete, skip])

  return {
    messages: BOOT_MESSAGES.slice(0, visibleCount),
    progress,
    done,
  }
}
