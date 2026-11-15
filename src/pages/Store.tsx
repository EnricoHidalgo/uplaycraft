import { CoinPacks, VipPlans } from '../components/Shop'
import { KITS } from '../data/content'
import { useLang } from '../i18n'
import './pages.css'

const MAX_KIT = Math.max(...KITS.map((k) => k.max))

export function Store() {
  const { t } = useLang()

  return (
    <main className="page store">
      <header className="wrap page-head">
        <h1 className="page-title">{t.store.title}</h1>
        <p className="page-lead">{t.store.lead}</p>
      </header>

      <section className="wrap shop">
        <VipPlans />
        <CoinPacks />
      </section>

      <section className="wrap kits" id="kits" aria-labelledby="kits-title">
        <h2 id="kits-title" className="section-title">{t.store.kitsTitle}</h2>
        <p className="section-lead">{t.store.kitsLead}</p>

        <ul className="kits-list">
          {KITS.map((kit) => {
            const copy = t.store.kits[kit.id]
            return (
              <li key={kit.id} className="kit">
                <div>
                  <h3 className="kit-name">{copy.name}</h3>
                  <p className="kit-role">{copy.role}</p>
                </div>
                {/* Barra = quanto custa chegar ao nível máximo, comparado ao kit mais caro */}
                <div className="kit-cost">
                  <span className="kit-bar" aria-hidden="true">
                    <span style={{ width: `${(kit.max / MAX_KIT) * 100}%` }} />
                  </span>
                  <span className="kit-max">{t.store.upTo(kit.max.toLocaleString(t.locale))}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
