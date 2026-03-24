import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { FloatingNav } from './ui/floating-navbar'

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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.06)', zIndex: 200 }}>
      <div style={{
        height: '100%',
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #00CFFF 0%, #FF2B2B 100%)',
        transition: 'width 0.1s linear',
      }} />
    </div>
  )
}

export function SiteHeader({
  locale,
  onLocaleToggle,
  cartCount = 0,
  onSectionSelect,
  activeSection,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    setScrolled(current > 0.02)
  })

  const handleNavClick = (key: string) => {
    setMenuOpen(false)
    onSectionSelect?.(key)
  }

  // Floating nav items for Aceternity FloatingNav
  const floatingNavItems = NAV_LINKS.map(link => ({
    name: locale === 'fr' ? link.fr : link.en,
    link: `#section-${link.key}`,
    onClick: () => handleNavClick(link.key),
  }))

  return (
    <>
      <ScrollProgress />

      {/* Sticky top header — logo + controls */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.5rem',
          background: scrolled ? 'rgba(6,7,10,0.96)' : 'rgba(6,7,10,0.72)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(0,207,255,0.12)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
        >
          <div style={{
            fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
            fontWeight: 900,
            fontSize: '1.45rem',
            color: '#F5F7FA',
            letterSpacing: '0.08em',
            lineHeight: 1,
            textTransform: 'uppercase',
          }}>
            Appât du Nord
          </div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            fontSize: '0.58rem',
            color: '#00CFFF',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginTop: '2px',
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
              <motion.button
                key={link.key}
                onClick={() => handleNavClick(link.key)}
                whileHover={{ color: '#F5F7FA' }}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.76rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: isActive ? '#00CFFF' : '#C8D3E2',
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #00CFFF' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '0.5rem 0.7rem',
                  paddingBottom: '0.35rem',
                  transition: 'color 0.18s, border-color 0.18s',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </motion.button>
            )
          })}
        </nav>

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Cart */}
          <div style={{ position: 'relative', color: '#F5F7FA', fontSize: '1.1rem', cursor: 'pointer' }}>
            🛒
            {cartCount > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-8px',
                background: '#FF2B2B', color: '#fff',
                borderRadius: '50%', width: '16px', height: '16px',
                fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700,
              }}>
                {cartCount}
              </span>
            )}
          </div>

          {/* Locale Toggle */}
          <motion.button
            onClick={onLocaleToggle}
            whileHover={{ background: '#00CFFF', color: '#06070A' }}
            transition={{ duration: 0.18 }}
            style={{
              padding: '0.38rem 0.9rem',
              background: 'rgba(0,207,255,0.12)',
              border: '1px solid rgba(0,207,255,0.35)',
              color: '#00CFFF',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '4px',
            }}
          >
            {locale === 'fr' ? 'EN' : 'FR'}
          </motion.button>

          {/* Mobile menu button */}
          <button
            className="show-mobile"
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'none',
              border: 'none',
              color: '#F5F7FA',
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

      {/* Aceternity FloatingNav — appears after hero on scroll */}
      <FloatingNav
        navItems={floatingNavItems as any}
        className="hidden md:flex"
      />

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: '72px',
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'rgba(6,7,10,0.98)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(0,207,255,0.12)',
              zIndex: 99,
              padding: '2rem 1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              overflowY: 'auto',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: '5rem',
              color: 'rgba(0,207,255,0.04)',
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
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#C8D3E2',
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
