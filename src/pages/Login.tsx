import { useState, type FormEvent } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { NICK_RE, useAuth } from '../auth/AuthContext'
import { headUrl } from '../data/content'
import { useLang } from '../i18n'
import './pages.css'

export function Login() {
  const { t } = useLang()
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/conta'

  const [nick, setNick] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ nick?: string; password?: string }>({})

  if (user) return <Navigate to="/conta" replace />

  const validNick = NICK_RE.test(nick)

  function submit(e: FormEvent) {
    e.preventDefault()
    const next = {
      nick: validNick ? undefined : t.login.errNick,
      password: password ? undefined : t.login.errPassword,
    }
    setErrors(next)
    if (next.nick || next.password) return
    login(nick)
    navigate(from, { replace: true })
  }

  return (
    <main className="page page-login">
      <div className="login-card">
        {/* A cabeça da skin aparece assim que o nick é válido */}
        <div className={`login-head${validNick ? ' is-on' : ''}`} aria-hidden="true">
          {validNick ? <img src={headUrl(nick, 96)} alt="" width={96} height={96} /> : <span>?</span>}
        </div>

        <h1 className="page-title">{t.login.title}</h1>
        <p className="page-lead">{t.login.lead}</p>

        <form className="form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="nick">{t.login.nick}</label>
            <input
              id="nick"
              autoComplete="username"
              autoCapitalize="off"
              spellCheck={false}
              maxLength={16}
              value={nick}
              onChange={(e) => setNick(e.target.value.trim())}
              aria-invalid={!!errors.nick}
              aria-describedby={errors.nick ? 'nick-err' : undefined}
            />
            {errors.nick && <p className="field-error" id="nick-err">{errors.nick}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">{t.login.password}</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'pw-err' : undefined}
            />
            {errors.password && <p className="field-error" id="pw-err">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-gold form-submit">
            {t.login.submit}
          </button>
        </form>

        <div className="login-help">
          <strong>{t.login.noPassword}</strong>
          <p>{t.login.noPasswordHelp}</p>
        </div>
      </div>
    </main>
  )
}
