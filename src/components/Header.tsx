import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { headUrl } from '../data/content'
import { SERVER } from '../data/server'
import { useCopy } from '../hooks/useCopy'
import { LANGS, useLang } from '../i18n'
import './Header.css'

export function Header() {
  const { t } = useLang()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const { copied, copy } = useCopy(SERVER.ip)
  const close = () => setOpen(false)

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="header-logo" aria-label={t.nav.homeLabel} onClick={close}>
          <img src="/logo-uplaycraft.png" alt="" width={305} height={305} />
        </Link>

        <nav className={`header-nav${open ? ' is-open' : ''}`} aria-label="Principal">
          <Link to="/#" onClick={close}>{t.nav.home}</Link>
          <Link to="/#modos" onClick={close}>{t.nav.modes}</Link>
          <NavLink to="/loja" onClick={close}>{t.nav.shop}</NavLink>
          <a href={SERVER.discord} target="_blank" rel="noreferrer">{t.nav.discord}</a>
          {user && (
            <button type="button" className="header-nav-logout" onClick={() => { logout(); close() }}>
              {t.nav.logout}
            </button>
          )}
          <LangSwitch className="header-lang-mobile" />
        </nav>

        <div className="header-actions">
          <button type="button" className="header-ip" onClick={copy}>
            <span className="header-ip-dot" aria-hidden="true" />
            <span>{copied ? t.nav.ipCopied : SERVER.ip}</span>
          </button>

          {user ? (
            <Link to="/conta" className="header-user" onClick={close} aria-label={t.nav.account}>
              <img src={headUrl(user.nick, 32)} alt="" width={32} height={32} />
              <span className="header-user-text">
                <span className="header-user-nick">{user.nick}</span>
                <span className="header-user-coins">
                  {user.coins.toLocaleString(t.locale)} {t.common.coins}
                </span>
              </span>
            </Link>
          ) : (
            <Link to="/entrar" className="btn btn-gold" onClick={close}>
              {t.nav.login}
            </Link>
          )}

          <LangSwitch className="header-lang-desktop" />

          <button type="button" className="header-menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>
    </header>
  )
}

function LangSwitch({ className }: { className: string }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className={`header-lang ${className}`} role="group" aria-label={t.nav.language}>
      {LANGS.map((l) => (
        <button key={l} type="button" aria-pressed={lang === l} onClick={() => setLang(l)}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
