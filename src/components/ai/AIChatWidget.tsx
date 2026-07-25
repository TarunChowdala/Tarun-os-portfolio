import { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ChatPanel } from '@/components/ai/ChatPanel'
import { useAIChatLauncher } from '@/components/ai/AIChatContext'

/** Modal chat — launched from taskbar (no floating FAB). */
export function AIChatWidget() {
  const { open, setOpen } = useAIChatLauncher()

  useEffect(() => {
    if (!open) return
    const html = document.documentElement
    const body = document.body
    const prevHtml = html.style.overflow
    const prevBody = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    html.classList.add('chat-open')
    return () => {
      html.style.overflow = prevHtml
      body.style.overflow = prevBody
      html.classList.remove('chat-open')
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen} modal>
      <DialogContent
        data-lenis-prevent
        className="flex w-[min(94vw,34rem)] max-h-[min(88dvh,640px)] flex-col gap-0 overflow-hidden rounded-xl border border-white/10 bg-[#0a0c10] p-0 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85)] sm:w-[min(92vw,36rem)]"
        onWheel={(e) => e.stopPropagation()}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Talk with AI</DialogTitle>
          <DialogDescription>
            Portfolio assistant chat. Responses are mocked until the backend is connected.
          </DialogDescription>
        </DialogHeader>
        <ChatPanel compact />
      </DialogContent>
    </Dialog>
  )
}
