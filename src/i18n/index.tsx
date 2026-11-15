import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import en from './en'
import es from './es'
import pt, { type Dict } from './pt'

export type Lang = 'pt' | 'en' | 'es'
export const LANGS: Lang[] = ['pt', 'en', 'es']
const DICTS: Record<Lang, Dict> = { pt, en, es }
const KEY = 'uc-lang'

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict }
const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY) as Lang | null
    if (saved && LANGS.includes(saved)) return saved
  } catch {
    /* storage bloqueado */
  }
  const nav = navigator.language.slice(0, 2) as Lang
  return LANGS.includes(nav) ? nav : 'pt'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = DICTS[lang].locale
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* storage bloqueado */
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: DICTS[lang] }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang fora do LangProvider')
  return ctx
}
