interface SiteFooterProps {
  onSectionChange?: (section: string) => void
  locale: 'fr' | 'en'
  onScrollToGuides?: () => void
}

// Sponsor data — grayscale logos using SVG text fallback (no external CDN dependency)
const SPONSORS = [
  { name: 'Mercury', url: 'https://www.mercurymarine.com' },
  { name: 'Yamaha', url: 'https://www.yamahaoutboards.com' },
  { name: 'Shimano', url: 'https://www.shimano.com' },
  { name: 'Rapala', url: 'https://www.rapala.com' },
  { name: 'Berkley', url: 'https://www.berkley-fishing.com' },
  { name: 'Humminbird', url: 'https://www.humminbird.com' },
  { name: 'Abu Garcia', url: 'https://www.abugarcia.com' },
]

export function SiteFooter({ onSectionChange, locale, onScrollToGuides }: SiteFooterProps) {
  const speciesList = [
    { label: locale === 'fr' ? 'Maskinongé' : 'Muskellunge', id: 'maskinonge' },
    { label: locale === 'fr' ? 'Grand Brochet' : 'Northern Pike', id: 'grand-brochet' },
    { label: locale === 'fr' ? 'Achigan' : 'Bass', id: 'achigan' },
    { label: locale === 'fr' ? 'Doré Jaune' : 'Walleye', id: 'dore-jaune' },
    { label: locale === 'fr' ? 'Truite' : 'Trout', id: 'truite' },
    { label: locale === 'fr' ? 'Esturgeon' : 'Sturgeon', id: 'esturgeon' },
  ]

  const navLinks = [
    { label: locale === 'fr' ? 'Espèces' : 'Species', section: 'especes' },
    { label: locale === 'fr' ? 'Arsenal' : 'Arsenal', section: 'arsenal' },
    { label: locale === 'fr' ? 'Eaux' : 'Waters', section: 'eaux' },
    { label: locale === 'fr' ? 'Calendrier' : 'Calendar', section: 'calendrier' },
    { label: locale === 'fr' ? 'Conseils' : 'Tips', section: 'conseils' },
    { label: locale === 'fr' ? 'Guides des Espèces' : 'Species Guides', section: '__guides__' },
    { label: locale === 'fr' ? 'Bibliothèque' : 'Library', section: '__guides__' },
    { label: locale === 'fr' ? 'Identifier le poisson' : 'Fish Identifier', section: '__identifier__' },
  ]

  return (
    <footer
      className="mt-10"
      style={{ background: 'var(--bg-elevated)', borderTop: '1px solid var(--border)' }}
    >
      {/* ── Bottom Navigation Row ─────────────────────────────────────────── */}
      <nav
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '0.85rem 1.5rem',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          WebkitOverflowScrolling: 'touch',
          background: 'var(--surface)',
        }}
      >
        {navLinks.map((link) => (
          <span
            key={link.section}
            style={{ display: 'inline-block', marginRight: '1.5rem' }}
          >
            <button
              onClick={() => {
                if (link.section === '__guides__') { onScrollToGuides?.() }
                else if (link.section === '__identifier__') { document.getElementById('fish-identifier')?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
                else { onSectionChange?.(link.section) }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--muted-text)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.25rem 0',
                transition: 'color 0.15s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--muted-text)'}
            >
              {link.label}
            </button>
          </span>
        ))}
      </nav>

      {/* ── Sponsor Strip ────────────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: '1px solid var(--border)',
          padding: '1.25rem 1.5rem',
          background: 'var(--surface)',
        }}
      >
        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: '0.62rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--text-muted)',
            marginBottom: '1rem',
          }}
        >
          {locale === 'fr' ? 'Partenaires & Commanditaires' : 'Partners & Sponsors'}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem 2rem',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              title={sponsor.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'opacity 0.2s ease',
                opacity: 0.45,
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '0.45'}
            >
              {/* SVG text logo — clean, always-readable, no external image dependency */}
              <svg
                width="120"
                height="28"
                viewBox="0 0 120 28"
                xmlns="http://www.w3.org/2000/svg"
                aria-label={sponsor.name}
                role="img"
              >
                <text
                  x="60"
                  y="19"
                  textAnchor="middle"
                  fontFamily="Oswald, sans-serif"
                  fontSize="13"
                  fontWeight="600"
                  letterSpacing="1.5"
                  fill="currentColor"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {sponsor.name.toUpperCase()}
                </text>
              </svg>
            </a>
          ))}
        </div>
      </div>

      {/* ── Main Footer ──────────────────────────────────────────────────── */}
      <div className="px-6 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                🎣 APPÂT DU NORD
              </h3>
              <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
                {locale === 'fr'
                  ? 'Votre portail de pêche tout-en-un pour le Québec. Conçu par des pêcheurs passionnés.'
                  : 'Your all-in-one fishing portal for Quebec. Built by passionate anglers.'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {locale === 'fr' ? "46 plans d'eau & rivières · 21 espèces · 162 produits" : '46 water bodies & rivers · 21 species · 162 products'}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                {locale === 'fr' ? 'ESPÈCES' : 'SPECIES'}
              </h4>
              <ul className="space-y-2 text-sm">
                {speciesList.map(sp => (
                  <li key={sp.id}>
                    <button
                      onClick={() => onSectionChange?.('especes')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--accent)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
                    >
                      → {sp.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3" style={{ fontFamily: 'var(--font-display)', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>
                {locale === 'fr' ? 'RÉGLEMENTATION' : 'REGULATIONS'}
              </h4>
              <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--text-muted)' }}>
                {locale === 'fr'
                  ? 'Consultez toujours le règlement officiel avant de pêcher. Les règlements varient par zone et espèce.'
                  : 'Always check official regulations before fishing. Regulations vary by zone and species.'}
              </p>
              {/* FIX 5 — Correct 2026 regulation URLs */}
              <a
                href="https://www.quebec.ca/tourisme-loisirs-sport/activites-sportives-et-de-plein-air/peche-sportive/permis"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  background: 'var(--accent)',
                  color: 'white',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.05em',
                  marginBottom: '0.5rem',
                }}
              >
                {locale === 'fr' ? '📋 RÈGLEMENTS QUÉBEC →' : '📋 QUEBEC REGULATIONS →'}
              </a>
              <br />
              <a
                href="https://www.dfo-mpo.gc.ca/fisheries-peches/index-fra.html"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.05em',
                }}
              >
                {locale === 'fr' ? '🐟 PÊCHES & OCÉANS CANADA →' : '🐟 FISHERIES & OCEANS CANADA →'}
              </a>
            </div>
          </div>

          <div
            className="pt-4 text-center text-xs"
            style={{ borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}
          >
            © 2026 Appât du Nord · {locale === 'fr' ? 'Fait avec ❤️ au Québec' : 'Made with ❤️ in Quebec'} · 🇨🇦
          </div>
        </div>
      </div>
    </footer>
  )
}
