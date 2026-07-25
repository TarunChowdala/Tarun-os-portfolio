import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

interface UseTypewriterOptions {
  /** ms per character while typing */
  speed?: number
  /** ms before start */
  delay?: number
  /** ms per character while deleting (loop mode) */
  deleteSpeed?: number
  /** pause after fully typed before delete (loop) */
  pause?: number
  enabled?: boolean
  /** type → pause → delete → next (when texts is array via useTypewriterCycle) */
  loop?: boolean
}

/**
 * Types a single string once (or instantly if reduced motion).
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const {
    speed = 28,
    delay = 0,
    enabled = true,
  } = options
  const reduced = usePrefersReducedMotion()
  const [displayed, setDisplayed] = useState(reduced || !enabled ? text : '')
  const [done, setDone] = useState(reduced || !enabled)

  useEffect(() => {
    if (reduced || !enabled) {
      setDisplayed(text)
      setDone(true)
      return
    }

    setDisplayed('')
    setDone(false)
    let i = 0
    let interval = 0
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        i += 1
        setDisplayed(text.slice(0, i))
        if (i >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(start)
      clearInterval(interval)
    }
  }, [text, speed, delay, enabled, reduced])

  return { text: displayed, done }
}

/**
 * Cycles through phrases with type / delete.
 */
export function useTypewriterCycle(
  phrases: readonly string[],
  options: UseTypewriterOptions = {},
) {
  const {
    speed = 36,
    deleteSpeed = 22,
    pause = 1800,
    delay = 0,
    enabled = true,
  } = options
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [displayed, setDisplayed] = useState(
    reduced || !enabled ? phrases[0] ?? '' : '',
  )

  useEffect(() => {
    if (reduced || !enabled || phrases.length === 0) {
      setDisplayed(phrases[0] ?? '')
      return
    }

    let cancelled = false
    let timer = 0
    const phrase = phrases[index % phrases.length]

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms)
      })

    const run = async () => {
      if (index === 0) await wait(delay)
      // type
      for (let i = 1; i <= phrase.length; i++) {
        if (cancelled) return
        setDisplayed(phrase.slice(0, i))
        await wait(speed)
      }
      await wait(pause)
      // delete
      for (let i = phrase.length - 1; i >= 0; i--) {
        if (cancelled) return
        setDisplayed(phrase.slice(0, i))
        await wait(deleteSpeed)
      }
      await wait(280)
      if (!cancelled) setIndex((n) => (n + 1) % phrases.length)
    }

    void run()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [index, phrases, speed, deleteSpeed, pause, delay, enabled, reduced])

  return { text: displayed, index }
}
