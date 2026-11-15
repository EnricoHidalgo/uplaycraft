import { useLang } from '../i18n'
import './Modes.css'

const MODES = [
  { id: 'skywars', name: 'SkyWars' },
  { id: 'bedwars', name: 'BedWars' },
] as const

export function Modes() {
  const { t } = useLang()

  return (
    <section id="modos" className="modes wrap" aria-labelledby="modes-title">
      <h2 id="modes-title" className="section-title">{t.modes.title}</h2>
      <p className="section-lead">{t.modes.lead}</p>

      <div className="modes-grid">
        {MODES.map((mode) => {
          const copy = t.modes.list[mode.id]
          return (
            <article key={mode.id} className={`mode mode-${mode.id}`}>
              <h3 className="mode-name">{mode.name}</h3>
              <p className="mode-summary">{copy.summary}</p>

              <dl className="mode-facts">
                {copy.facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>

              <details className="mode-rules">
                <summary>{t.modes.rules}</summary>
                <ul>
                  {copy.rules.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </details>
            </article>
          )
        })}
      </div>
    </section>
  )
}
