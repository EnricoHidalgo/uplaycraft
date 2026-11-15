import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

/*
 * SIMULADO: não existe backend ainda. O login aceita qualquer nick válido,
 * e as compras só mexem no estado local pra demonstrar o fluxo.
 * Quando ligar na API real, só este arquivo muda.
 */

export type Purchase = { id: string; date: string; item: string; price: number }

export type User = {
  nick: string
  rank: string
  coins: number
  vip: string | null
  stats: { kills: number; wins: number; deaths: number }
  hasPassword: boolean
  purchases: Purchase[]
}

type Ctx = {
  user: User | null
  login: (nick: string) => void
  logout: () => void
  setPassword: () => void
  buyCoins: (packId: string, price: number, coins: number) => void
  buyVip: (vip: string, price: number, coins: number) => void
}

const KEY = 'uc-user'
const AuthContext = createContext<Ctx | null>(null)

export const NICK_RE = /^[A-Za-z0-9_]{3,16}$/

function load(): User | null {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(load)

  useEffect(() => {
    try {
      if (user) localStorage.setItem(KEY, JSON.stringify(user))
      else localStorage.removeItem(KEY)
    } catch {
      /* storage bloqueado */
    }
  }, [user])

  const login = useCallback((nick: string) => {
    setUser({
      nick,
      rank: 'DEFAULT',
      coins: 86,
      vip: null,
      stats: { kills: 0, wins: 0, deaths: 1 },
      hasPassword: true,
      purchases: [],
    })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const setPassword = useCallback(() => setUser((u) => (u ? { ...u, hasPassword: true } : u)), [])

  const record = (u: User, item: string, price: number): Purchase[] => [
    { id: crypto.randomUUID(), date: new Date().toISOString(), item, price },
    ...u.purchases,
  ]

  // `item` guarda uma chave ("pack:bau", "vip:MEGA") pra o histórico ser traduzido na hora de exibir
  const buyCoins = useCallback((packId: string, price: number, coins: number) => {
    setUser((u) => (u ? { ...u, coins: u.coins + coins, purchases: record(u, `pack:${packId}`, price) } : u))
  }, [])

  const buyVip = useCallback((vip: string, price: number, coins: number) => {
    setUser((u) => (u ? { ...u, vip, rank: vip, coins: u.coins + coins, purchases: record(u, `vip:${vip}`, price) } : u))
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, setPassword, buyCoins, buyVip }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth fora do AuthProvider')
  return ctx
}
