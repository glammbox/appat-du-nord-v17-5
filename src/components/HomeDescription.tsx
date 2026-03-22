import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HomeDescriptionProps {
  locale: 'fr' | 'en'
}

const FEATURES = [
  {
    iconFr: '🎣', fr: 'Atlas Complet des Espèces',
    en: 'Complete Species Atlas',
    descFr: '21 espèces de poissons du Québec documentées avec fiches encyclopédiques : biologie, habitats, saisonnalité, techniques éprouvées et règlements en vigueur. Du saumon atlantique à l\'esturgeon, chaque poisson a sa page complète FR/EN.',
    descEn: '21 Quebec fish species documented with full encyclopedia profiles: biology, habitats, seasonality, proven techniques, and current regulations. From Atlantic salmon to lake sturgeon, every fish has its complete FR/EN page.',
  },
  {
    iconFr: '🗺️', fr: '41 Lacs & 5 Rivières Majeures',
    en: '41 Lakes & 5 Major Rivers',
    descFr: 'Cartes interactives, coordonnées GPS précises, mises à l\'eau vérifiées, espèces confirmées présentes, conditions saisonnières et météo intégrée par région. Cliquez sur un plan d\'eau — tout y est.',
    descEn: 'Interactive maps, precise GPS coordinates, verified boat launches, confirmed species present, seasonal conditions, and integrated weather by region. Click a water body — everything is there.',
  },
  {
    iconFr: '⚡', fr: 'Arsenal de 162 Produits',
    en: 'Arsenal of 162 Products',
    descFr: 'Bucktails, crankbaits, jigs, topwater, spinners — triés par espèce cible. Chaque produit lié directement aux meilleurs vendeurs sur Amazon.ca. Ajoutez au panier, recevez chez vous.',
    descEn: 'Bucktails, crankbaits, jigs, topwater, spinners — sorted by target species. Every product linked directly to top sellers on Amazon.ca. Add to cart, delivered to your door.',
  },
  {
    iconFr: '🌤️', fr: 'Météo & Calendrier de Pêche',
    en: 'Weather & Fishing Calendar',
    descFr: 'Grille 30 jours par région avec score de pêche quotidien calculé sur la température, le vent et les précipitations. Données Open-Meteo en temps réel. Planifiez votre sortie avec les bonnes données.',
    descEn: '30-day grid by region with a daily fishing score calculated from temperature, wind, and precipitation. Real-time Open-Meteo data. Plan your outing with accurate information.',
  },
  {
    iconFr: '🔬', fr: 'Identification des Poissons par IA',
    en: 'AI Fish Identification',
    descFr: 'Téléchargez une photo de votre prise — notre outil analyse l\'image et identifie l\'espèce parmi les 21 espèces du Québec avec un score de confiance et un lien vers la fiche complète.',
    descEn: 'Upload a photo of your catch — our tool analyzes the image and identifies the species from Quebec\'s 21 fish species, with a confidence score and a link to the full profile.',
  },
]

export function HomeDescription({ locale }: HomeDescriptionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-raised)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--section-pad) 2rem',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>

        {/* Two-column layout: text left, image right */}
        <div
          className="home-description-top"
          style={{
            display: 'grid',
            gap: '3rem',
            alignItems: 'stretch',
            marginBottom: '3rem',
          }}
        >
          {/* LEFT — Feature beats */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--accent)',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              {locale === 'fr' ? 'La ressource de pêche #1 au Canada' : "Canada's #1 Fishing Resource"}
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 48, scale: 0.985 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.06 }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
                color: 'var(--text-primary)',
                lineHeight: 0.95,
                marginBottom: '2.5rem',
                letterSpacing: '0.03em',
              }}
            >
              {locale === 'fr'
                ? <>Tout ce dont vous avez besoin.<br /><span style={{ color: 'var(--accent)' }}>En un seul endroit.</span></>
                : <>Everything you need.<br /><span style={{ color: 'var(--accent)' }}>In one place.</span></>
              }
            </motion.h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1 }}>
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.en}
                  initial={{ opacity: 0, y: 32 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.07 }}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    fontSize: '1.2rem',
                    flexShrink: 0,
                    width: '2rem',
                    textAlign: 'center',
                    paddingTop: '2px',
                  }}>
                    {feat.iconFr}
                  </div>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '0.3rem',
                    }}>
                      {locale === 'fr' ? feat.fr : feat.en}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                    }}>
                      {locale === 'fr' ? feat.descFr : feat.descEn}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT — Tall photo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <div style={{
              flex: 1,
              minHeight: '420px',
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              position: 'relative',
            }}>
              <img
                src="/images/hero/fisherman-vertical.jpg"
                alt={locale === 'fr' ? 'Pêcheur au bord du lac' : 'Angler fishing at the lake'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  display: 'block',
                  minHeight: '420px',
                }}
              />
              {/* Overlay text */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem',
                background: 'linear-gradient(to top, rgba(10,14,26,0.95) 0%, transparent 100%)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                }}>
                  {locale === 'fr' ? 'Découvrez le Québec' : 'Discover Quebec'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginTop: '0.25rem',
                }}>
                  {locale === 'fr' ? '41 plans d\'eau · 21 espèces · 5 rivières' : '41 water bodies · 21 species · 5 rivers'}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {[
            { value: '41', label: locale === 'fr' ? "Plans d'eau" : 'Water Bodies' },
            { value: '21', label: locale === 'fr' ? 'Espèces' : 'Species' },
            { value: '162', label: locale === 'fr' ? 'Produits' : 'Products' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '1.5rem',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                color: 'var(--amber)',
                lineHeight: 1,
                letterSpacing: '0.02em',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                marginTop: '0.5rem',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Compliance note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{
            marginTop: '1rem',
            padding: '0.75rem 1rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            fontFamily: 'var(--font-body)',
            textAlign: 'center',
          }}
        >
          🇨🇦 {locale === 'fr'
            ? 'Données conformes aux règlements de pêche du Québec · MRNF · Saison 2026'
            : 'Data compliant with Quebec fishing regulations · MRNF · Season 2026'}
        </motion.div>
      </div>
    </section>
  )
}
