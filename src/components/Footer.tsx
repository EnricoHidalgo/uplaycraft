import { Link } from 'react-router-dom'
import { asset, SERVER } from '../data/server'
import { useLang } from '../i18n'
import './Footer.css'

export function Footer() {
  const { t } = useLang()

  return (
    <>
      <section className="discord" aria-labelledby="discord-title">
        <div className="wrap discord-inner">
          <div>
            <h2 id="discord-title" className="discord-title">{t.discord.title}</h2>
            <p>{t.discord.text}</p>
          </div>
          <a className="btn btn-dark discord-btn" href={SERVER.discord} target="_blank" rel="noreferrer">
            {t.discord.cta}
          </a>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer-inner">
          <img src={asset('logo-uplaycraft.png')} alt="UPlayCraft" width={72} height={72} />
          <nav aria-label="Footer" className="footer-nav">
            <Link to="/loja">{t.nav.shop}</Link>
            <Link to="/entrar">{t.nav.login}</Link>
            <a href={SERVER.discord} target="_blank" rel="noreferrer">Discord</a>
            <Link to="/termos">{t.footer.terms}</Link>
            <Link to="/privacidade">{t.footer.privacy}</Link>
          </nav>
          <p className="footer-legal">
            {t.footer.legal}
            <br />© {new Date().getFullYear()} UPlayCraft.
          </p>
        </div>
      </footer>
    </>
  )
}
