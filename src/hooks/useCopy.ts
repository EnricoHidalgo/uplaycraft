import { useCallback, useEffect, useRef, useState } from 'react'

/** Copia um texto e mantém `copied` verdadeiro por alguns segundos. */
export function useCopy(text: string, resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // Fallback para http/navegadores sem Clipboard API
      const area = document.createElement('textarea')
      area.value = text
      document.body.appendChild(area)
      area.select()
      document.execCommand('copy')
      area.remove()
    }
    setCopied(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(false), resetMs)
  }, [text, resetMs])

  return { copied, copy }
}
