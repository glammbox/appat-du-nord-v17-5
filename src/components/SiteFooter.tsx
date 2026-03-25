import { WavyBackground } from './ui/wavy-background'

interface SiteFooterProps {
  onSectionSelect?: (section: string) => void
  locale: 'fr' | 'en'
}

// Fix 17 — Sponsor logos: full color SVG marks
const SPONSORS = [
  {
    name: 'Mercury',
    url: 'https://www.mercurymarine.com',
    color: '#CC0000',
    svg: (
      <svg width="110" height="32" viewBox="0 0 110 32" xmlns="http://www.w3.org/2000/svg" aria-label="Mercury Marine">
        <circle cx="16" cy="16" r="14" fill="#CC0000"/>
        <text x="16" y="20" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="800" fill="white" letterSpacing="0.5">M</text>
        <text x="35" y="21" textAnchor="start" fontFamily="Arial Narrow, sans-serif" fontSize="12" fontWeight="700" letterSpacing="1.5" fill="#CC0000">MERCURY</text>
        <text x="35" y="31" textAnchor="start" fontFamily="Arial, sans-serif" fontSize="8" fontWeight="400" letterSpacing="1" fill="#999">MARINE</text>
      </svg>
    ),
  },
  {
    name: 'Yamaha',
    url: 'https://www.yamahaoutboards.com',
    color: '#003087',
    svg: (
      <svg width="110" height="32" viewBox="0 0 110 32" xmlns="http://www.w3.org/2000/svg" aria-label="Yamaha">
        <rect width="110" height="32" rx="2" fill="#003087"/>
        <text x="55" y="22" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="14" fontWeight="800" letterSpacing="2" fill="white">YAMAHA</text>
      </svg>
    ),
  },
  {
    name: 'Shimano',
    url: 'https://www.shimano.com',
    color: '#E8000D',
    svg: (
      <svg width="110" height="32" viewBox="0 0 110 32" xmlns="http://www.w3.org/2000/svg" aria-label="Shimano">
        <text x="55" y="22" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="14" fontWeight="800" letterSpacing="1.5" fill="#E8000D">SHIMANO</text>
        <line x1="8" y1="26" x2="102" y2="26" stroke="#E8000D" strokeWidth="1.5"/>
      </svg>
    ),
  },
  {
    name: 'Rapala',
    url: 'https://www.rapala.com',
    color: '#1A4E8C',
    svg: (
      <svg width="100" height="32" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg" aria-label="Rapala">
        <text x="50" y="21" textAnchor="middle" fontFamily="Georgia, serif" fontSize="15" fontWeight="700" letterSpacing="1" fill="#1A4E8C">Rapala</text>
        <path d="M10 25 Q50 29 90 25" stroke="#E8941A" strokeWidth="2" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Berkley',
    url: 'https://www.berkley-fishing.com',
    color: '#FF6600',
    svg: (
      <svg width="100" height="32" viewBox="0 0 100 32" xmlns="http://www.w3.org/2000/svg" aria-label="Berkley">
        <text x="50" y="22" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="14" fontWeight="900" letterSpacing="1.5" fill="#FF6600">BERKLEY</text>
        <line x1="10" y1="26" x2="90" y2="26" stroke="#FF6600" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    name: 'Humminbird',
    url: 'https://www.humminbird.com',
    color: '#0070C0',
    svg: (
      <svg width="120" height="32" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg" aria-label="Humminbird">
        <text x="60" y="19" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="11" fontWeight="800" letterSpacing="1" fill="#0070C0">HUMMINBIRD</text>
        <text x="60" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7" letterSpacing="2" fill="#0070C0">FISH SMARTER</text>
      </svg>
    ),
  },
  {
    name: 'Abu Garcia',
    url: 'https://www.abugarcia.com',
    color: '#BF0000',
    svg: (
      <svg width="110" height="32" viewBox="0 0 110 32" xmlns="http://www.w3.org/2000/svg" aria-label="Abu Garcia">
        <text x="55" y="16" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="11" fontWeight="800" letterSpacing="1.5" fill="#BF0000">ABU GARCIA</text>
        <line x1="10" y1="21" x2="100" y2="21" stroke="#BF0000" strokeWidth="1.5"/>
        <text x="55" y="30" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="7.5" letterSpacing="2" fill="#888">SINCE 1921</text>
      </svg>
    ),
  },
  {
    name: 'Prince Craft',
    url: 'https://www.princecraft.com',
    color: '#003087',
    svg: (
      <svg width="120" height="32" viewBox="0 0 120 32" xmlns="http://www.w3.org/2000/svg" aria-label="Prince Craft">
        <rect x="2" y="8" width="116" height="18" rx="3" fill="#003087" opacity="0.12"/>
        <text x="60" y="22" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="12" fontWeight="800" letterSpacing="1.5" fill="#003087">PRINCE CRAFT</text>
      </svg>
    ),
  },
  {
    name: 'Thomas Marine',
    url: 'https://www.groupethomasmarine.com',
    color: '#0066CC',
    svg: (
      <svg width="130" height="32" viewBox="0 0 130 32" xmlns="http://www.w3.org/2000/svg" aria-label="Thomas Marine">
        <text x="65" y="15" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="11" fontWeight="800" letterSpacing="1" fill="#0066CC">THOMAS</text>
        <text x="65" y="28" textAnchor="middle" fontFamily="Arial Narrow, Arial, sans-serif" fontSize="9" fontWeight="600" letterSpacing="2" fill="#0066CC">MARINE</text>
      </svg>
    ),
  },
]

export function SiteFooter({ locale }: SiteFooterProps) {
  return (
    <>
      <footer style={{ position: 'relative', overflow: 'hidden', background: '#050810' }}>

        {/* Sponsor strip — Fix 17: real color brand logos */}
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
            gap: '0.75rem 2rem',
          }}>
            {SPONSORS.map(sponsor => (
              <a
                key={sponsor.name}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', opacity: 0.85, transition: 'opacity 0.2s, transform 0.2s' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.opacity = '1'
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.opacity = '0.85'
                  ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
                }}
              >
                {sponsor.svg}
              </a>
            ))}
          </div>
        </div>

        {/* Main footer content — Fix 18: NO navigation links, GLAMMBOX + copyright only */}
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
                    { fr: 'Permis de pêche →', en: 'Fishing Licence →', url: 'https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/peche-sportive/permis', primary: true },
                    { fr: 'Règlements par zone →', en: 'Zone Regulations →', url: 'https://peche.faune.gouv.qc.ca/', primary: false },
                    { fr: 'Mon dossier chasse & pêche →', en: 'My Hunting & Fishing File →', url: 'https://mondossierchassepeche.gouv.qc.ca/', primary: false },
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
                      {locale === 'fr' ? item.fr : item.en}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Fix 18: GLAMMBOX signature + copyright ONLY — NO nav links */}
            <div style={{
              borderTop: '1px solid rgba(0,207,255,0.1)',
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
              textAlign: 'center',
            }}>
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
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '0.75rem', color: '#94A3B8' }}>—</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '0.75rem', color: '#F5F7FA' }}>
                  Patrick Gervais
                </span>
              </div>
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: '#94A3B8' }}>
                © 2026 Appât du Nord · {locale === 'fr' ? 'Fait au Québec' : 'Made in Quebec'} · 🇨🇦
              </div>
            </div>
          </div>
        </div>

        {/* WavyBackground — ultra-subtle water current */}
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
