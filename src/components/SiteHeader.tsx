import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
  onSectionSelect?: (s: string) => void
  activeSection?: string
}

const NAV_LINKS = [
  { key: 'especes',    fr: 'Espèces',    en: 'Species' },
  { key: 'eaux',       fr: 'Eaux',       en: 'Waters' },
  { key: 'calendrier', fr: 'Prévisions', en: 'Forecast' },
  { key: 'guides',     fr: 'Guides',     en: 'Guides' },
  { key: 'tournois',   fr: 'Tournois',   en: 'Tournaments' },
  { key: 'arsenal',    fr: 'Arsenal',    en: 'Arsenal' },
]

export function SiteHeader({
  locale,
  onLocaleToggle,
  cartCount = 0,
  onSectionSelect,
  activeSection,
}: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (key: string) => {
    setMenuOpen(false)
    onSectionSelect?.(key)
  }

  return (
    <>
      {/* Scroll progress bar */}
      <ScrollProgress />
      
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          transition: 'background 0.28s ease, border-bottom 0.28s ease',
          background: scrolled ? 'rgba(10,14,26,0.96)' : 'rgba(10,14,26,0.70)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
        >
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.45rem',
            color: 'var(--text-primary)',
            letterSpacing: '0.08em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Appât du Nord
          </div>
          <div style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '0.58rem',
            color: 'var(--accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '2px',
            fontWeight: 600,
          }}>
            {locale === 'fr' ? 'Atlas de pêche — Québec' : 'Quebec Fishing Atlas'}
          </div>
        </button>

        {/* Desktop Nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '0.1rem' }}
          className="hide-mobile"
        >
          {NAV_LINKS.map(link => {
            const isActive = link.key === activeSection
            const label = locale === 'fr' ? link.fr : link.en
            return (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '0.5rem 0.7rem',
                  paddingBottom: '0.35rem',
                  transition: 'color 0.18s, border-color 0.18s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart */}
          <div style={{ position: 'relative', color: 'var(--text-primary)', fontSize: '1.1rem', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px',
                background: '#E63946', color: '#fff',
                borderRadius: '50%', width: '16px', height: '16px',
                fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontFamily: 'var(--font-condensed)',
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* Locale Toggle */}
          <button
            onClick={onLocaleToggle}
            style={{
              padding: '0.38rem 0.9rem',
              background: 'rgba(0,180,216,0.12)',
              border: '1px solid rgba(0,180,216,0.35)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              borderRadius: '6px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
              ;(e.currentTarget as HTMLElement).style.color = '#0A0E1A'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'rgba(0,180,216,0.12)'
              ;(e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            }}
          >
            {locale === 'fr' ? 'EN' : 'FR'}
          </button>

          {/* Mobile menu button */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.4rem',
              fontSize: '1.4rem',
              lineHeight: 1,
            }}
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '72px',
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'rgba(10,14,26,0.98)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid var(--border)',
              zIndex: 99,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              overflowY: 'auto',
            }}
          >
            {/* APPÂT DU NORD watermark in drawer */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
              fontFamily: 'var(--font-display)',
              fontSize: '5rem',
              color: 'rgba(0,180,216,0.05)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              APPÂT DU NORD
            </div>
            {NAV_LINKS.map((link, i) => {
              const label = locale === 'fr' ? link.fr : link.en
              return (
                <motion.button
                  key={link.key}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  onClick={() => handleNavClick(link.key)}
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    cursor: 'pointer',
                    padding: '0.9rem 0',
                    textAlign: 'left',
                    transition: 'color 0.18s',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                >
                  {label}
                </motion.button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}

function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const update = () => {
      const doc = document.documentElement
      const scrollTop = doc.scrollTop || document.body.scrollTop
      const scrollHeight = doc.scrollHeight - doc.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'rgba(255,255,255,0.06)',
      zIndex: 200,
    }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, var(--accent) 0%, #E63946 100%)',
        transition: 'width 0.1s linear',
      }} />
    </div>
  )
}
