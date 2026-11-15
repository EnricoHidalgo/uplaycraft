export const SERVER = {
  name: 'UPlayCraft',
  ip: 'mc.uplaycraft.com.br',
  versions: '1.8.9 – 1.21',
  discord: 'https://discord.gg/GDDDQuq5T',
}

export type SlideId = 'inicio' | 'skywars' | 'bedwars' | 'vip'

export type Slide = {
  id: SlideId
  /** Caminho em /public. Sem imagem, o slide usa o fundo provisório. */
  image?: string
  placeholder: string
  /** Sem href, o slide mostra o IP com botão de copiar */
  href?: string
}

// Textos dos slides ficam em src/i18n (hero.slides)
export const SLIDES: Slide[] = [
  {
    id: 'inicio',
    placeholder: 'linear-gradient(180deg, #8ec5f0 0%, #cfe8fb 55%, #6ba33f 55%, #4e7f2c 100%)',
  },
  {
    id: 'skywars',
    placeholder: 'linear-gradient(180deg, #5d9ad6 0%, #b9dcf7 70%, #e9f4fc 100%)',
    href: '/#modos',
  },
  {
    id: 'bedwars',
    placeholder: 'linear-gradient(180deg, #2c2f3a 0%, #4a3a52 60%, #a8322d 60%, #7d2420 100%)',
    href: '/#modos',
  },
  {
    id: 'vip',
    placeholder: 'linear-gradient(180deg, #3b2a08 0%, #7a5410 100%)',
    href: '/loja',
  },
]
