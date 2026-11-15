import { headUrl, ONLINE } from '../data/content'
import { useLang } from '../i18n'
import './Online.css'

const MAX_HEADS = 12

export function Online() {
  const { t } = useLang()
  const total = ONLINE.skywars + ONLINE.bedwars + ONLINE.lobby

  return (
    <section className="online" aria-labelledby="online-title">
      <div className="wrap online-inner">
        <div>
          <h2 id="online-title" className="online-title">
            <span className="online-dot" aria-hidden="true" />
            {t.online.playing(total)}
          </h2>
          <ul className="online-split">
            <li><strong>{ONLINE.bedwars}</strong> {t.online.bedwars}</li>
            <li><strong>{ONLINE.skywars}</strong> {t.online.skywars}</li>
            <li><strong>{ONLINE.lobby}</strong> {t.online.lobby}</li>
          </ul>
        </div>

        <ul className="online-heads" aria-label={t.online.some}>
          {ONLINE.players.slice(0, MAX_HEADS).map((name) => (
            <li key={name} title={name}>
              <img src={headUrl(name, 48)} alt={name} width={48} height={48} loading="lazy" />
            </li>
          ))}
          {total > MAX_HEADS && <li className="online-more">+{total - MAX_HEADS}</li>}
        </ul>
      </div>
    </section>
  )
}
