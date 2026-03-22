import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
  onScrollToGuides?: () => void
  onSectionSelect?: (s: 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils') => void
  activeSection?: string
}

const NAV_LINKS = [
  { key: 'especes',    fr: 'Espèces',           en: 'Species' },
  { key: 'arsenal',   fr: 'Arsenal',            en: 'Arsenal' },
  { key: 'eaux',      fr: 'Eaux',               en: 'Waters' },
  { key: 'calendrier',fr: 'Calendrier',         en: 'Calendar' },
  { key: '__guides__',fr: 'Guides des Espèces', en: 'Species Guides' },
  { key: 'conseils',  fr: 'Conseils',           en: 'Tips' },
  { key: '__identifier__', fr: 'Identifier',    en: 'Fish ID' },
]

export function SiteHeader({
  locale,
  onLocaleToggle,
  cartCount = 0,
  onScrollToGuides,
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
    if (key === '__guides__') {
      onScrollToGuides?.()
    } else if (key === '__identifier__') {
      document.getElementById('fish-identifier')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      onSectionSelect?.(key as 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils')
    }
  }

  return (
    <>
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
          padding: '0 2rem',
          transition: 'background 0.28s ease, border-bottom 0.28s ease',
          background: scrolled ? 'rgba(10,14,26,0.92)' : 'rgba(10,14,26,0.60)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.10)' : '1px solid transparent',
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.55rem',
              color: 'var(--text-primary)',
              letterSpacing: '0.08em',
              lineHeight: 1,
            }}>
              Appât du Nord
            </div>
            <div style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.62rem',
              color: 'var(--accent)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              marginTop: '3px',
              fontWeight: 600,
            }}>
              {locale === 'fr' ? 'Atlas de pêche — Québec' : 'Quebec Fishing Atlas'}
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center"
          style={{ gap: '0.25rem' }}
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
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  background: isActive ? 'rgba(0,180,216,0.10)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  transition: 'color 0.18s, background 0.18s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                    ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                  }
                }}
              >
                {label}
              </button>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {/* Cart */}
          {cartCount > 0 && (
            <div style={{ position: 'relative', color: 'var(--text-primary)', fontSize: '1.1rem' }}>
              🛒
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px',
                background: 'var(--accent)', color: '#0A0E1A',
                borderRadius: '50%', width: '15px', height: '15px',
                fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, fontFamily: 'var(--font-condensed)',
              }}>
                {cartCount}
              </span>
            </div>
          )}

          {/* Locale Toggle */}
          <button
            onClick={onLocaleToggle}
            style={{
              padding: '0.4rem 1rem',
              background: 'rgba(0,180,216,0.12)',
              border: '1px solid var(--border-active)',
              color: 'var(--accent)',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.75rem',
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
            className="md:hidden"
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
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: '72px',
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'rgba(10,14,26,0.97)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid var(--border)',
              zIndex: 99,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {NAV_LINKS.map(link => {
              const label = locale === 'fr' ? link.fr : link.en
              return (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.key)}
                  style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid var(--border)',
                    textAlign: 'left',
                    transition: 'color 0.18s',
                    width: '100%',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
                >
                  {label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
