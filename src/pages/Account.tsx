import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { brl } from '../data/content'
import { useLang } from '../i18n'
import type { Dict } from '../i18n/pt'
import './pages.css'

function itemLabel(key: string, t: Dict) {
  const [kind, id] = key.split(':')
  if (kind === 'vip') return `VIP ${id}`
  return t.shop.packs[id as keyof Dict['shop']['packs']] ?? key
}

export function Account() {
  const { t } = useLang()
  const { user, logout, setPassword } = useAuth()
  const [pw, setPw] = useState('')
  const [pwState, setPwState] = useState<'idle' | 'short' | 'saved'>('idle')

  if (!user) return <Navigate to="/entrar" replace state={{ from: '/conta' }} />

  const { kills, wins, deaths } = user.stats
  const kd = deaths === 0 ? kills : kills / deaths
  const date = new Intl.DateTimeFormat(t.locale, { dateStyle: 'short', timeStyle: 'short' })

  function savePassword(e: FormEvent) {
    e.preventDefault()
    if (pw.length < 8) return setPwState('short')
    setPassword()
    setPw('')
    setPwState('saved')
  }

  return (
    <main className="page wrap account">
      {/* Perfil: a skin inteira do jogador ao lado dos dados */}
      <section className="profile">
        <img
          className="profile-skin"
          src={`https://mc-heads.net/body/${encodeURIComponent(user.nick)}/180`}
          alt=""
          width={90}
          height={180}
        />
        <div className="profile-main">
          <h1 className="profile-nick">{user.nick}</h1>
          <span className={`profile-rank${user.vip ? ' is-vip' : ''}`}>{user.rank}</span>
        </div>
        <dl className="profile-facts">
          <div>
            <dt>{t.account.coins}</dt>
            <dd>{user.coins.toLocaleString(t.locale)}</dd>
            <Link to="/loja#coins" className="profile-link">{t.account.buyCoins}</Link>
          </div>
          <div>
            <dt>{t.account.vip}</dt>
            <dd>{user.vip ?? t.account.noVip}</dd>
            {!user.vip && <Link to="/loja#vip" className="profile-link">{t.account.getVip}</Link>}
          </div>
        </dl>
      </section>

      <section className="panel" aria-labelledby="stats-title">
        <h2 id="stats-title" className="panel-title">{t.account.stats}</h2>
        <dl className="stats">
          <div><dt>{t.account.kills}</dt><dd>{kills}</dd></div>
          <div><dt>{t.account.wins}</dt><dd>{wins}</dd></div>
          <div><dt>{t.account.deaths}</dt><dd>{deaths}</dd></div>
          <div><dt>{t.account.kd}</dt><dd>{kd.toLocaleString(t.locale, { maximumFractionDigits: 2 })}</dd></div>
        </dl>
      </section>

      <section className="panel" aria-labelledby="pw-title">
        <h2 id="pw-title" className="panel-title">{t.account.password}</h2>
        <p className="panel-text">{t.account.passwordHelp}</p>
        <form className="form form-inline" onSubmit={savePassword} noValidate>
          <div className="field">
            <label htmlFor="new-pw">{t.account.passwordLabel}</label>
            <input
              id="new-pw"
              type="password"
              autoComplete="new-password"
              value={pw}
              onChange={(e) => {
                setPw(e.target.value)
                setPwState('idle')
              }}
              aria-invalid={pwState === 'short'}
              aria-describedby="pw-msg"
            />
            <p id="pw-msg" className={pwState === 'short' ? 'field-error' : pwState === 'saved' ? 'field-ok' : 'field-hint'} aria-live="polite">
              {pwState === 'short' ? t.account.passwordShort : pwState === 'saved' ? t.account.passwordSaved : t.account.passwordHint}
            </p>
          </div>
          <button type="submit" className="btn btn-dark">{t.account.passwordSave}</button>
        </form>
      </section>

      <section className="panel" aria-labelledby="hist-title">
        <h2 id="hist-title" className="panel-title">{t.account.history}</h2>
        {user.purchases.length === 0 ? (
          <div className="empty">
            <p>{t.account.historyEmpty}</p>
            <Link to="/loja" className="btn btn-gold">{t.account.historyEmptyCta}</Link>
          </div>
        ) : (
          <table className="history">
            <thead>
              <tr>
                <th>{t.account.date}</th>
                <th>{t.account.item}</th>
                <th className="num">{t.account.price}</th>
              </tr>
            </thead>
            <tbody>
              {user.purchases.map((p) => (
                <tr key={p.id}>
                  <td>{date.format(new Date(p.date))}</td>
                  <td>{itemLabel(p.item, t)}</td>
                  <td className="num">{brl.format(p.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      <button type="button" className="account-logout" onClick={logout}>
        {t.nav.logout}
      </button>
    </main>
  )
}
