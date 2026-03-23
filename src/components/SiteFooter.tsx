import { motion } from 'framer-motion'

interface SiteFooterProps {
  onSectionSelect?: (section: string) => void
  locale: 'fr' | 'en'
}

const SPONSORS = [
  { name: 'Mercury',    url: 'https://www.mercurymarine.com' },
  { name: 'Yamaha',    url: 'https://www.yamahaoutboards.com' },
  { name: 'Shimano',   url: 'https://www.shimano.com' },
  { name: 'Rapala',    url: 'https://www.rapala.com' },
  { name: 'Berkley',   url: 'https://www.berkley-fishing.com' },
  { name: 'Humminbird',url: 'https://www.humminbird.com' },
  { name: 'Abu Garcia',url: 'https://www.abugarcia.com' },
]

const NAV_SECTIONS = [
  { key: 'especes',    fr: 'Espèces',    en: 'Species' },
  { key: 'eaux',       fr: 'Eaux',       en: 'Waters' },
  { key: 'calendrier', fr: 'Prévisions', en: 'Forecast' },
  { key: 'guides',     fr: 'Guides',     en: 'Guides' },
  { key: 'tournois',   fr: 'Tournois',   en: 'Tournaments' },
  { key: 'arsenal',    fr: 'Arsenal',    en: 'Arsenal' },
]

export function SiteFooter({ onSectionSelect, locale }: SiteFooterProps) {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Giant APPÂT DU NORD brand stamp */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 14vw, 12rem)',
        color: 'rgba(255,255,255,0.025)',
        letterSpacing: '0.06em',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        textTransform: 'uppercase',
        lineHeight: 1,
      }}>
        APPÂT DU NORD
      </div>

      {/* Sponsor strip */}
      <div style={{
        borderBottom: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        background: 'rgba(255,255,255,0.02)',
        position: 'relative',
        zIndex: 1,
      }}>
        <p style={{
          textAlign: 'center',
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--text-muted)',
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
              style={{
                textDecoration: 'none',
                opacity: 0.4,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.9'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.4'}
            >
              <svg width="100" height="24" viewBox="0 0 100 24" xmlns="http://www.w3.org/2000/svg" aria-label={sponsor.name}>
                <text x="50" y="17" textAnchor="middle" fontFamily="var(--font-condensed), sans-serif" fontSize="11" fontWeight="700" letterSpacing="1.8" fill="var(--text-secondary)">
                  {sponsor.name.toUpperCase()}
                </text>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div style={{ padding: '3rem 2rem', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
            
            {/* Brand column */}
            <div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--text-primary)',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
                textTransform: 'uppercase',
              }}>
                Appât du Nord
              </div>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                marginBottom: '0.75rem',
              }}>
                {locale === 'fr'
                  ? "Le portail de pêche #1 au Canada. Conçu par des pêcheurs passionnés du Québec."
                  : "Canada's #1 fishing portal. Built by passionate Quebec anglers."}
              </p>
              <p style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}>
                {locale === 'fr' ? "45+ plans d'eau · 21 espèces · Saison 2026" : "45+ waters · 21 species · Season 2026"}
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                {locale === 'fr' ? 'Navigation' : 'Navigation'}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {NAV_SECTIONS.map(link => (
                  <button
                    key={link.key}
                    onClick={() => onSectionSelect?.(link.key)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.875rem',
                      textAlign: 'left',
                      padding: '0',
                      transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                  >
                    → {locale === 'fr' ? link.fr : link.en}
                  </button>
                ))}
              </div>
            </div>

            {/* Regulations */}
            <div>
              <h4 style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.68rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                {locale === 'fr' ? 'Réglementation' : 'Regulations'}
              </h4>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                marginBottom: '1rem',
              }}>
                {locale === 'fr'
                  ? 'Consultez toujours le règlement officiel avant de pêcher. Les règlements varient par zone et espèce.'
                  : 'Always check official regulations before fishing. Regulations vary by zone and species.'}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a
                  href="https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/peche-sportive/permis"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    background: 'var(--accent)',
                    color: '#0A0E1A',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-condensed)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  📋 {locale === 'fr' ? 'Permis de pêche →' : 'Fishing Licence →'}
                </a>
                <a
                  href="https://peche.faune.gouv.qc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-condensed)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  📊 {locale === 'fr' ? 'Règlements par zone →' : 'Zone Regulations →'}
                </a>
                <a
                  href="https://mondossierchassepeche.gouv.qc.ca/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '0.5rem 1rem',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    borderRadius: '4px',
                    fontSize: '0.72rem',
                    textDecoration: 'none',
                    fontFamily: 'var(--font-condensed)',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  🎫 {locale === 'fr' ? 'Mon dossier chasse & pêche →' : 'My Hunting & Fishing File →'}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div style={{
            borderTop: '1px solid var(--border)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
          }}>
            <div>© 2026 Appât du Nord · {locale === 'fr' ? 'Fait au Québec' : 'Made in Quebec'} · 🇨🇦</div>
            <div style={{ color: 'var(--text-secondary)' }}>Produit par GLAMMBOX · Patrick Gervais</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
