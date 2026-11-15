import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import './pages.css'

export function NotFound() {
  const { t } = useLang()
  return (
    <main className="page wrap notfound">
      <h1 className="page-title">{t.notFound.title}</h1>
      <p className="page-lead">{t.notFound.text}</p>
      <Link to="/" className="btn btn-gold">{t.notFound.cta}</Link>
    </main>
  )
}
