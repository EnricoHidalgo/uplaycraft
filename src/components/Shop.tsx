import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { brl, COIN_PACKS, VIPS } from '../data/content'
import { useLang } from '../i18n'
import './Shop.css'

// Quanto cada pacote rende a mais por real, comparado ao menor
const baseRate = COIN_PACKS[0].coins / COIN_PACKS[0].price

/** Sem login, manda pro /entrar e volta pra cá depois. */
function useRequireLogin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  return (action: () => void) => {
    if (!user) navigate('/entrar', { state: { from: location.pathname + location.hash } })
    else action()
  }
}

export function VipPlans() {
  const { t } = useLang()
  const { user, buyVip } = useAuth()
  const requireLogin = useRequireLogin()

  return (
    <div className="shop-vip" id="vip">
      <div className="shop-vip-intro">
        <h2 className="section-title">{t.shop.vipTitle}</h2>
        <p className="section-lead">{t.shop.vipLead}</p>
        {!user && <p className="shop-note">{t.shop.vipNote}</p>}
      </div>

      {/* Os planos sobem como degraus: quanto mais alto, mais coins */}
      <ol className="vip-stairs">
        {VIPS.map((vip, i) => {
          const current = user?.vip === vip.name
          return (
            <li key={vip.id} className={`vip vip-${i + 1}`}>
              <h3 className="vip-name">{vip.name}</h3>
              <p className="vip-coins">
                <strong>{vip.coins.toLocaleString(t.locale)}</strong> {t.shop.coinsPerMonth}
              </p>
              <p className="vip-price">
                {brl.format(vip.price)}
                <span>{t.shop.perMonth}</span>
              </p>
              <button
                type="button"
                className={`btn ${i === 2 ? 'btn-gold' : 'btn-dark'}`}
                disabled={current}
                onClick={() => requireLogin(() => buyVip(vip.name, vip.price, vip.coins))}
              >
                {current ? t.shop.current : t.shop.subscribe(vip.name)}
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export function CoinPacks() {
  const { t } = useLang()
  const { buyCoins } = useAuth()
  const requireLogin = useRequireLogin()
  const [justBought, setJustBought] = useState<string | null>(null)

  return (
    <div className="shop-coins" id="coins">
      <h2 className="section-title">{t.shop.coinsTitle}</h2>
      <p className="section-lead">{t.shop.coinsLead}</p>

      <ul className="coins-list">
        {COIN_PACKS.map((pack) => {
          const bonus = Math.round((pack.coins / pack.price / baseRate - 1) * 100)
          const bought = justBought === pack.id
          return (
            <li key={pack.id} className="coin-row">
              <span className="coin-name">{t.shop.packs[pack.id]}</span>
              <span className="coin-amount">
                {pack.coins.toLocaleString(t.locale)} {t.common.coins}
              </span>
              <span className="coin-bonus">{bonus > 0 ? t.shop.bonus(bonus) : ''}</span>
              <span className="coin-price">{brl.format(pack.price)}</span>
              <button
                type="button"
                className="btn btn-gold coin-buy"
                onClick={() =>
                  requireLogin(() => {
                    buyCoins(pack.id, pack.price, pack.coins)
                    setJustBought(pack.id)
                    window.setTimeout(() => setJustBought((id) => (id === pack.id ? null : id)), 2000)
                  })
                }
              >
                {bought ? t.shop.bought : t.shop.buy}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Shop() {
  return (
    <section className="shop wrap">
      <VipPlans />
      <CoinPacks />
    </section>
  )
}
