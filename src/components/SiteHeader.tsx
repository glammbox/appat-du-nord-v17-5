import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
  onCartClick?: () => void
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

function ScrollProgressBar() {
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
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: 'rgba(255,255,255,0.06)', zIndex: 6000, pointerEvents: 'none' }}>
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
  onCartClick,
  onSectionSelect,
  activeSection,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // FIX 1: Show floating nav after a small scroll; hide on scroll down, show on scroll up
  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    const direction = current - (scrollYProgress.getPrevious() ?? 0)
    if (scrollYProgress.get() < 0.04) {
      setVisible(false)
    } else if (direction < 0) {
      // scrolling up — show
      setVisible(true)
    } else {
      // scrolling down — hide
      setVisible(false)
    }
  })

  const handleNavClick = (key: string) => {
    setMenuOpen(false)
    onSectionSelect?.(key)
  }

  return (
    <>
      <ScrollProgressBar />

      {/* FIX 1: ONE floating nav — no solid sticky header */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: '12px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5000,
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0 1rem',
              height: '60px',
              borderRadius: '9999px',
              background: 'rgba(6,7,10,0.90)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0,207,255,0.22)',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
              maxWidth: 'min(96vw, 920px)',
              width: 'auto',
            }}
          >
            {/* Logo in floating nav */}
            <button
              onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0 0.85rem 0 0.25rem',
                borderRight: '1px solid rgba(0,207,255,0.15)',
                marginRight: '0.35rem',
                flexShrink: 0,
              }}
            >
              <div style={{
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontWeight: 900,
                fontSize: '1.05rem',
                color: '#F5F7FA',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}>
                Appât du Nord
              </div>
            </button>

            {/* Desktop nav links */}
            <nav className="floating-nav-links" style={{ display: 'flex', gap: '0.05rem' }}>
              {NAV_LINKS.map(link => {
                const isActive = link.key === activeSection
                return (
                  <button
                    key={link.key}
                    onClick={() => handleNavClick(link.key)}
                    style={{
                      padding: '0.45rem 0.85rem',
                      borderRadius: '9999px',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      letterSpacing: '0.13em',
                      textTransform: 'uppercase',
                      color: isActive ? '#00CFFF' : '#C8D3E2',
                      background: isActive ? 'rgba(0,207,255,0.12)' : 'transparent',
                      border: '1px solid ' + (isActive ? 'rgba(0,207,255,0.35)' : 'transparent'),
                      cursor: 'pointer',
                      transition: 'all 0.18s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = '#F5F7FA'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLElement).style.color = '#C8D3E2'
                        ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                      }
                    }}
                  >
                    {locale === 'fr' ? link.fr : link.en}
                  </button>
                )
              })}
            </nav>

            {/* Right controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: '0.5rem', flexShrink: 0 }}>
              {/* Cart */}
              <button
                onClick={onCartClick}
                style={{
                  position: 'relative',
                  color: '#F5F7FA',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  padding: '0.3rem 0.5rem',
                  background: cartCount > 0 ? 'rgba(0,207,255,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${cartCount > 0 ? 'rgba(0,207,255,0.35)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  transition: 'all 0.18s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.18)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,207,255,0.5)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = cartCount > 0 ? 'rgba(0,207,255,0.12)' : 'rgba(255,255,255,0.04)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = cartCount > 0 ? 'rgba(0,207,255,0.35)' : 'rgba(255,255,255,0.1)'
                }}
              >
                🛒
                {cartCount > 0 && (
                  <span style={{
                    background: '#FF2B2B',
                    color: '#fff',
                    borderRadius: '10px',
                    padding: '0 5px',
                    fontSize: '9px',
                    fontWeight: 700,
                    lineHeight: '15px',
                    display: 'inline-block',
                    minWidth: '15px',
                    textAlign: 'center',
                  }}>
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Locale toggle */}
              <button
                onClick={onLocaleToggle}
                style={{
                  padding: '0.3rem 0.7rem',
                  background: 'rgba(0,207,255,0.12)',
                  border: '1px solid rgba(0,207,255,0.35)',
                  color: '#00CFFF',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '9999px',
                }}
              >
                {locale === 'fr' ? 'EN' : 'FR'}
              </button>

              {/* Mobile hamburger */}
              <button
                className="floating-nav-hamburger"
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  background: 'none',
                  border: '1px solid rgba(0,207,255,0.25)',
                  color: '#F5F7FA',
                  cursor: 'pointer',
                  padding: '0.3rem 0.55rem',
                  fontSize: '1rem',
                  lineHeight: 1,
                  borderRadius: '8px',
                  display: 'none',
                }}
                aria-label="Menu"
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              background: 'rgba(6,7,10,0.98)',
              backdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(0,207,255,0.12)',
              zIndex: 4999,
              padding: '5rem 1.5rem 2rem',
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
              fontSize: '4rem',
              color: 'rgba(0,207,255,0.04)',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              userSelect: 'none',
            }}>
              APPÂT DU NORD
            </div>
            {NAV_LINKS.map((link, i) => (
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
                {locale === 'fr' ? link.fr : link.en}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .floating-nav-links { display: none !important; }
          .floating-nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}
