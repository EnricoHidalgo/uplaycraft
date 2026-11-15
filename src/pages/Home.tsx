import { HeroCarousel } from '../components/HeroCarousel'
import { HowToJoin } from '../components/HowToJoin'
import { Modes } from '../components/Modes'
import { Online } from '../components/Online'
import { Shop } from '../components/Shop'

export function Home() {
  return (
    <main className="stack">
      <HeroCarousel />
      <HowToJoin />
      <Modes />
      <Online />
      <Shop />
    </main>
  )
}
