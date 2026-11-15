import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { asset, SERVER, SLIDES, type Slide } from '../data/server'
import { useCopy } from '../hooks/useCopy'
import { useLang } from '../i18n'
import './HeroCarousel.css'

const AUTOPLAY_MS = 7000
const SWIPE_PX = 50

export function HeroCarousel() {
  const { t } = useLang()
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const startX = useRef<number | null>(null)
  const total = SLIDES.length

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + total) % total), [total])

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduce) return
    const id = window.setTimeout(() => go(1), AUTOPLAY_MS)
    return () => window.clearTimeout(id)
  }, [index, paused, go])

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t.hero.label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') go(-1)
        if (e.key === 'ArrowRight') go(1)
      }}
      onPointerDown={(e) => (startX.current = e.clientX)}
      onPointerUp={(e) => {
        if (startX.current === null) return
        const dx = e.clientX - startX.current
        if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
        startX.current = null
      }}
    >
      <div className="hero-frame">
        {SLIDES.map((slide, i) => (
          <SlideView key={slide.id} slide={slide} active={i === index} label={t.hero.of(i + 1, total)} />
        ))}

        <button type="button" className="hero-arrow hero-arrow-prev" onClick={() => go(-1)} aria-label={t.hero.prev}>
          <Chevron />
        </button>
        <button type="button" className="hero-arrow hero-arrow-next" onClick={() => go(1)} aria-label={t.hero.next}>
          <Chevron />
        </button>

        <div className="hero-dots">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              className={`hero-dot${i === index ? ' is-active' : ''}`}
              aria-label={t.hero.goTo(t.hero.slides[slide.id].title)}
              aria-current={i === index}
              onClick={() => setIndex(i)}
            >
              {i === index && !paused && <span className="hero-dot-fill" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

function SlideView({ slide, active, label }: { slide: Slide; active: boolean; label: string }) {
  const { t } = useLang()
  const copy = t.hero.slides[slide.id]

  return (
    <div
      className={`hero-slide${active ? ' is-active' : ''}`}
      role="group"
      aria-roledescription="slide"
      aria-label={label}
      aria-hidden={!active}
      inert={!active}
    >
      {slide.image ? (
        <img className="hero-image" src={asset(slide.image)} alt="" />
      ) : (
        <div className="hero-image hero-placeholder" style={{ background: slide.placeholder }}>
          <span>{t.hero.placeholder}</span>
        </div>
      )}

      <div className="hero-card">
        <h2 className="hero-title">{copy.title}</h2>
        <p className="hero-text">{copy.text}</p>
        {slide.href ? (
          <Link className="btn btn-dark" to={slide.href}>
            {copy.action}
          </Link>
        ) : (
          <IpCopy />
        )}
      </div>
    </div>
  )
}

function IpCopy() {
  const { t } = useLang()
  const { copied, copy } = useCopy(SERVER.ip)
  return (
    <div className="hero-ip">
      <div className="hero-ip-row">
        <code className="hero-ip-value">{SERVER.ip}</code>
        <button type="button" className="btn btn-gold" onClick={copy}>
          {copied ? t.common.copied : t.common.copyIp}
        </button>
      </div>
      <p className="hero-ip-meta">{t.common.versions(SERVER.versions)}</p>
      <span className="visually-hidden" aria-live="polite">
        {copied ? t.nav.ipCopied : ''}
      </span>
    </div>
  )
}

function Chevron() {
  return (
    <svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true">
      <path d="M4 2H7V4H9V6H11V10H9V12H7V14H4V12H6V10H8V6H6V4H4Z" fill="currentColor" />
    </svg>
  )
}
