// Só dados (preços, números, ids). Os textos ficam em src/i18n.

export type Platform = 'java' | 'bedrock'

export const VIPS = [
  { id: 'mega', name: 'MEGA', price: 9.9, coins: 500 },
  { id: 'ultra', name: 'ULTRA', price: 24.9, coins: 1500 },
  { id: 'legend', name: 'LEGEND', price: 49.9, coins: 4000 },
] as const

export const COIN_PACKS = [
  { id: 'punhado', price: 4.9, coins: 1000 },
  { id: 'saco', price: 12.9, coins: 3000 },
  { id: 'bau', price: 29.9, coins: 8000 },
  { id: 'cofre', price: 64.9, coins: 20000 },
  { id: 'tesouro', price: 139.9, coins: 50000 },
] as const

/** Custo máximo (soma de todos os níveis) de cada kit do SkyWars. O nível 1 é grátis. */
export const KITS = [
  { id: 'guerreiro', max: 7500 },
  { id: 'arqueiro', max: 7500 },
  { id: 'tanque', max: 9000 },
  { id: 'scout', max: 10000 },
  { id: 'pyro', max: 10000 },
  { id: 'engenheiro', max: 9000 },
  { id: 'explorador', max: 7500 },
  { id: 'assassino', max: 12000 },
  { id: 'mineiro', max: 9000 },
  { id: 'alquimista', max: 12000 },
] as const

/** PROVISÓRIO: no site real isso vem da API do servidor. */
export const ONLINE = {
  skywars: 47,
  bedwars: 81,
  lobby: 23,
  players: ['Notch', 'jeb_', 'Dinnerbone', 'Grumm', 'Herobrine', 'Technoblade', 'Dream', 'GeorgeNotFound', 'Sapnap', 'CaptainSparklez', 'Skeppy', 'BadBoyHalo'],
}

export const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

export const headUrl = (nick: string, size = 64) => `https://mc-heads.net/avatar/${encodeURIComponent(nick)}/${size}`
