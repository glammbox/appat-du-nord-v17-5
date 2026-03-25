import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface SiteHeaderProps {
  locale: 'fr' | 'en'
  onLocaleToggle: () => void
  cartCount?: number
  onCartClick?: () => void
  onSectionSelect?: (s: string) => void
  activeSection?: string
  onBoutiqueClick?: () => void
  currentRoute?: 'home' | 'boutique'
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
  onBoutiqueClick,
  currentRoute = 'home',
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  // START VISIBLE — nav is always shown at page top, hides on scroll down, shows on scroll up
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const currentY = window.scrollY
        const delta = currentY - lastScrollY.current

        if (currentY < 60) {
          // Always show at the very top of the page
          setVisible(true)
        } else if (delta > 4) {
          // Scrolling down — hide nav
          setVisible(false)
          setMenuOpen(false)
        } else if (delta < -4) {
          // Scrolling up — show nav
          setVisible(true)
        }

        lastScrollY.current = currentY
        ticking.current = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (key: string) => {
    setMenuOpen(false)
    onSectionSelect?.(key)
  }

  return (
    <>
      <ScrollProgressBar />

      {/* Floating pill nav — visible from page load */}
      <AnimatePresence>
        {visible && (
          <motion.div
            key="floating-nav"
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
            {/* Logo */}
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

              {/* Boutique button */}
              {onBoutiqueClick && (
                <button
                  onClick={() => { setMenuOpen(false); onBoutiqueClick() }}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '9999px',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    letterSpacing: '0.13em',
                    textTransform: 'uppercase',
                    color: currentRoute === 'boutique' ? '#00CFFF' : '#C8D3E2',
                    background: currentRoute === 'boutique' ? 'rgba(0,207,255,0.12)' : 'rgba(255,43,43,0.10)',
                    border: '1px solid ' + (currentRoute === 'boutique' ? 'rgba(0,207,255,0.35)' : 'rgba(255,43,43,0.30)'),
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#F5F7FA'
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,43,43,0.20)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = currentRoute === 'boutique' ? '#00CFFF' : '#C8D3E2'
                    ;(e.currentTarget as HTMLElement).style.background = currentRoute === 'boutique' ? 'rgba(0,207,255,0.12)' : 'rgba(255,43,43,0.10)'
                  }}
                >
                  {locale === 'fr' ? 'Boutique' : 'Shop'}
                </button>
              )}
            </nav>

            {/* Right controls: cart + locale + hamburger */}
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

              {/* Mobile hamburger — shown via CSS on ≤768px */}
              <button
                className="floating-nav-hamburger"
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  background: menuOpen ? 'rgba(0,207,255,0.15)' : 'none',
                  border: '1px solid rgba(0,207,255,0.25)',
                  color: '#F5F7FA',
                  cursor: 'pointer',
                  padding: '0.3rem 0.55rem',
                  fontSize: '1rem',
                  lineHeight: 1,
                  borderRadius: '8px',
                  display: 'none', // overridden by CSS media query below
                }}
                aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
                aria-expanded={menuOpen}
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile slide-out drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.55)',
                zIndex: 4998,
              }}
            />

            {/* Drawer */}
            <motion.div
              key="menu-drawer"
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
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid rgba(0,207,255,0.12)',
                zIndex: 4999,
                padding: '5rem 1.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.25rem',
                overflowY: 'auto',
              }}
            >
              {/* Watermark */}
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

              {/* Nav links */}
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
                    color: activeSection === link.key ? '#00CFFF' : '#C8D3E2',
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

              {/* Boutique link in drawer */}
              {onBoutiqueClick && (
                <motion.button
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: NAV_LINKS.length * 0.05, duration: 0.3 }}
                  onClick={() => { setMenuOpen(false); onBoutiqueClick() }}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: currentRoute === 'boutique' ? '#00CFFF' : '#FF2B2B',
                    background: 'none',
                    border: 'none',
                    borderBottom: '1px solid rgba(255,43,43,0.15)',
                    cursor: 'pointer',
                    padding: '0.9rem 0',
                    textAlign: 'left',
                    transition: 'color 0.18s',
                    width: '100%',
                    position: 'relative',
                    zIndex: 1,
                  }}
                >
                  {locale === 'fr' ? '🛍 Boutique' : '🛍 Shop'}
                </motion.button>
              )}

              {/* Cart + locale in drawer for mobile convenience */}
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
                <button
                  onClick={() => { setMenuOpen(false); onCartClick?.() }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '8px',
                    color: '#F5F7FA',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                  }}
                >
                  🛒 {locale === 'fr' ? 'Panier' : 'Cart'}
                  {cartCount > 0 && (
                    <span style={{
                      background: '#FF2B2B', color: '#fff',
                      borderRadius: '10px', padding: '0 5px',
                      fontSize: '9px', fontWeight: 700, lineHeight: '15px',
                      display: 'inline-block', minWidth: '15px', textAlign: 'center',
                    }}>
                      {cartCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => { onLocaleToggle(); setMenuOpen(false) }}
                  style={{
                    padding: '0.5rem 1.2rem',
                    background: 'rgba(0,207,255,0.12)',
                    border: '1px solid rgba(0,207,255,0.35)',
                    color: '#00CFFF',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    borderRadius: '9999px',
                  }}
                >
                  {locale === 'fr' ? 'EN' : 'FR'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .floating-nav-links { display: none !important; }
          .floating-nav-hamburger { display: flex !important; }
        }
        @media (min-width: 769px) {
          .floating-nav-hamburger { display: none !important; }
        }
      `}</style>
    </>
  )
}
