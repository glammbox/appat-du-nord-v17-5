import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { WavyBackground } from './ui/wavy-background'

interface SiteFooterProps {
  onSectionSelect?: (section: string) => void
  locale: 'fr' | 'en'
}

const SPONSORS = [
  { name: 'Mercury',     url: 'https://www.mercurymarine.com' },
  { name: 'Yamaha',      url: 'https://www.yamahaoutboards.com' },
  { name: 'Shimano',     url: 'https://www.shimano.com' },
  { name: 'Rapala',      url: 'https://www.rapala.com' },
  { name: 'Berkley',     url: 'https://www.berkley-fishing.com' },
  { name: 'Humminbird',  url: 'https://www.humminbird.com' },
  { name: 'Abu Garcia',  url: 'https://www.abugarcia.com' },
]

const NAV_SECTIONS = [
  { key: 'especes',    fr: 'Espèces',    en: 'Species' },
  { key: 'eaux',       fr: 'Eaux',       en: 'Waters' },
  { key: 'calendrier', fr: 'Prévisions', en: 'Forecast' },
  { key: 'guides',     fr: 'Guides',     en: 'Guides' },
  { key: 'tournois',   fr: 'Tournois',   en: 'Tournaments' },
  { key: 'arsenal',    fr: 'Arsenal',    en: 'Arsenal' },
]

// Floating nav bar — hides on scroll down, reveals on scroll up (Framer Motion)
function FloatingNavBar({ onSectionSelect, locale }: SiteFooterProps) {
  const [visible, setVisible] = useState(true)
  const lastY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      const isAtBottom = window.innerHeight + currentY >= document.body.scrollHeight - 100
      if (isAtBottom) {
        setVisible(true)
      } else if (currentY > lastY.current && currentY > 80) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'row',
            gap: '0.25rem',
            background: 'rgba(5,8,16,0.9)',
            border: '1px solid rgba(0,207,255,0.18)',
            borderRadius: '999px',
            padding: '0.45rem 0.75rem',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          }}
        >
          {NAV_SECTIONS.map(link => (
            <button
              key={link.key}
              onClick={() => onSectionSelect?.(link.key)}
              style={{
                background: 'none',
                border: 'none',
                color: '#94A3B8',
                cursor: 'pointer',
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding: '0.3rem 0.65rem',
                borderRadius: '999px',
                transition: 'color 0.15s, background 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.color = '#00CFFF'
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.1)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.color = '#94A3B8'
                ;(e.currentTarget as HTMLElement).style.background = 'none'
              }}
            >
              {locale === 'fr' ? link.fr : link.en}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function SiteFooter({ onSectionSelect, locale }: SiteFooterProps) {
  return (
    <>
      {/* Floating nav bar — hide on scroll down, reveal on scroll up */}
      <FloatingNavBar onSectionSelect={onSectionSelect} locale={locale} />

      <footer style={{ position: 'relative', overflow: 'hidden', background: '#050810' }}>

        {/* Sponsor strip */}
        <div style={{
          borderBottom: '1px solid rgba(0,207,255,0.1)',
          borderTop: '1px solid rgba(0,207,255,0.1)',
          padding: '1.5rem 2rem',
          background: 'rgba(0,207,255,0.03)',
          position: 'relative',
          zIndex: 2,
        }}>
          <p style={{
            textAlign: 'center',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 600,
            fontSize: '0.6rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#94A3B8',
            marginBottom: '1.25rem',
          }}>
            {locale === 'fr' ? 'Partenaires & Commanditaires' : 'Partners & Sponsors'}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem 2rem',
          }}>
            {SPONSORS.map(sponsor => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', opacity: 0.4, transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.4'}
              >
                <svg width="100" height="24" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" aria-label={sponsor.name}>
                  <text x="50" y="17" textAnchor="middle" fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.8" fill="#C8D3E2">
                    {sponsor.name.toUpperCase()}
                  </text>
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Main footer content */}
        <div style={{ position: 'relative', zIndex: 2, padding: '3rem 2rem' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>

              {/* Brand column */}
              <div>
                <div style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 900,
                  fontSize: '1.6rem',
                  color: '#F5F7FA',
                  letterSpacing: '0.08em',
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}>
                  Appât du Nord
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.88rem',
                  color: '#94A3B8',
                  lineHeight: 1.65,
                  marginBottom: '0.75rem',
                }}>
                  {locale === 'fr'
                    ? "Le portail de pêche #1 au Canada. Conçu par des pêcheurs passionnés du Québec."
                    : "Canada's #1 fishing portal. Built by passionate Quebec anglers."}
                </p>
                <p style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.7rem',
                  color: '#94A3B8',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? "45+ plans d'eau · 21 espèces · Saison 2026" : "45+ waters · 21 species · Season 2026"}
                </p>
              </div>

              {/* Navigation — HORIZONTAL layout (v17.2) */}
              <div>
                <h4 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  color: '#94A3B8',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}>
                  Navigation
                </h4>
                {/* Horizontal nav links — flex-row with gap */}
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '0.4rem 1.25rem' }}>
                  {NAV_SECTIONS.map(link => (
                    <button
                      key={link.key}
                      onClick={() => onSectionSelect?.(link.key)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        padding: '0',
                        transition: 'color 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00CFFF'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#94A3B8'}
                    >
                      {locale === 'fr' ? link.fr : link.en}
                    </button>
                  ))}
                </div>
              </div>

              {/* Regulations */}
              <div>
                <h4 style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  color: '#94A3B8',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}>
                  {locale === 'fr' ? 'Réglementation' : 'Regulations'}
                </h4>
                <p style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: '#94A3B8',
                  lineHeight: 1.6,
                  marginBottom: '1rem',
                }}>
                  {locale === 'fr'
                    ? 'Consultez toujours le règlement officiel avant de pêcher. Les règlements varient par zone et espèce.'
                    : 'Always check official regulations before fishing. Regulations vary by zone and species.'}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    { fr: 'Permis de pêche →', en: 'Fishing Licence →', url: 'https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/peche-sportive/permis', icon: '📋', primary: true },
                    { fr: 'Règlements par zone →', en: 'Zone Regulations →', url: 'https://peche.faune.gouv.qc.ca/', icon: '📊', primary: false },
                    { fr: 'Mon dossier chasse & pêche →', en: 'My Hunting & Fishing File →', url: 'https://mondossierchassepeche.gouv.qc.ca/', icon: '🎫', primary: false },
                  ].map(item => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        background: item.primary ? '#00CFFF' : 'transparent',
                        border: item.primary ? 'none' : '1px solid rgba(0,207,255,0.15)',
                        color: item.primary ? '#050810' : '#94A3B8',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        textDecoration: 'none',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: item.primary ? 700 : 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.icon} {locale === 'fr' ? item.fr : item.en}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* GLAMMBOX signature + copyright — VERIFIED PRESENT */}
            <div style={{
              borderTop: '1px solid rgba(0,207,255,0.1)',
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'center',
            }}>
              {/* GLAMMBOX signature — required by brief */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                }}>
                  {locale === 'fr' ? 'Propulsé par' : 'Powered by'}
                </span>
                <span style={{
                  fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                  fontWeight: 900,
                  fontSize: '0.95rem',
                  color: '#00CFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>
                  GLAMMBOX
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                }}>
                  —
                </span>
                <span style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  color: '#F5F7FA',
                }}>
                  Patrick Gervais
                </span>
              </div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.7rem',
                color: '#94A3B8',
              }}>
                © 2026 Appât du Nord · {locale === 'fr' ? 'Fait au Québec' : 'Made in Quebec'} · 🇨🇦
              </div>
            </div>
          </div>
        </div>

        {/* WavyBackground — ultra-subtle water current at very low opacity */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, opacity: 0.15 }}>
          <WavyBackground
            colors={['#00CFFF', '#1D6BFF', '#00CFFF']}
            waveWidth={60}
            backgroundFill="#050810"
            blur={8}
            speed="slow"
            waveOpacity={0.3}
            className="h-full w-full"
          />
        </div>
      </footer>
    </>
  )
}
