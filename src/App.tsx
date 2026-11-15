import { useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider } from './auth/AuthContext'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LangProvider } from './i18n'
import { Account } from './pages/Account'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { NotFound } from './pages/NotFound'
import { Store } from './pages/Store'

/** Troca de página vai pro topo na hora; link com #âncora desliza até a seção. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation()
  const lastPath = useRef(pathname)

  // `key` muda a cada clique, então clicar de novo no mesmo link também rola
  useEffect(() => {
    const samePage = lastPath.current === pathname
    lastPath.current = pathname
    const id = hash.slice(1)
    if (!id) {
      window.scrollTo({ top: 0, behavior: samePage ? 'smooth' : 'instant' })
      return
    }
    // espera a página nova renderizar
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView())
  }, [pathname, hash, key])

  return null
}

export default function App() {
  return (
    <LangProvider>
      <AuthProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <ScrollManager />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Store />} />
            <Route path="/entrar" element={<Login />} />
            <Route path="/conta" element={<Account />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </LangProvider>
  )
}
