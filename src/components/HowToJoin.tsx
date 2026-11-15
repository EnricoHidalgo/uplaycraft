import { useState } from 'react'
import type { Platform } from '../data/content'
import { SERVER } from '../data/server'
import { useCopy } from '../hooks/useCopy'
import { useLang } from '../i18n'
import './HowToJoin.css'

export function HowToJoin() {
  const { t } = useLang()
  const [platform, setPlatform] = useState<Platform>('java')
  const { copied, copy } = useCopy(SERVER.ip)

  return (
    <section className="join wrap" aria-labelledby="join-title">
      <div className="join-head">
        <h2 id="join-title" className="section-title">{t.join.title}</h2>
        <div className="join-toggle" role="radiogroup" aria-label={t.join.platform}>
          {(['java', 'bedrock'] as const).map((p) => (
            <button
              key={p}
              type="button"
              role="radio"
              aria-checked={platform === p}
              className={platform === p ? 'is-on' : ''}
              onClick={() => setPlatform(p)}
            >
              {t.join[p]}
            </button>
          ))}
        </div>
      </div>

      <ol className="join-steps">
        {t.join.steps[platform].map((step, i) => (
          <li key={i} className="join-step">
            <span className="join-num" aria-hidden="true">{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {i === 0 && (
              <button type="button" className="btn btn-gold join-copy" onClick={copy}>
                {copied ? t.common.copied : t.common.copyIp}
              </button>
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}
