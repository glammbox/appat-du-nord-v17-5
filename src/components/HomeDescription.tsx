import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface HomeDescriptionProps {
  locale: 'fr' | 'en'
}

const TEXT_FR = [
  "Appât du Nord est né d'une frustration simple : il n'existait pas de vrai portail québécois pour le pêcheur sérieux. Pas de base de données digne de ce nom sur les espèces locales. Pas de carte qui réunit en un seul endroit les lacs, les rivières et leurs espèces confirmées. Pas d'outil qui croise la météo, les phases lunaires et le comportement des poissons pour vous dire réellement quand partir. Alors on l'a construit.",
  "Le Québec est une terre de pêche extraordinaire. Quarante-cinq plans d'eau et rivières majeurs cartographiés — du Fleuve Saint-Laurent à l'immensité du Réservoir Gouin, du Lac Saint-Jean aux eaux froides du Lac Memphrémagog. Chaque plan d'eau a sa personnalité, ses espèces, ses saisons. On a documenté tout ça, avec des sources vérifiées, des coordonnées réelles et des descriptions qui vous aident à choisir votre prochain plan d'eau avec confiance.",
  "Vingt et une espèces documentées — du maskinongé légendaire à l'esturgeon des lacs, en passant par le doré jaune, le grand brochet, l'achigan à grande bouche et toutes les familles de truites québécoises. Pour chaque espèce : identification visuelle, habitat, comportement saisonnier, meilleures techniques, règlements en vigueur, liens gouvernementaux vérifiés. Un vrai dictionnaire de terrain, pas une liste d'espèces Wikipedia.",
  "La boutique Arsenal propose un équipement rigoureusement sélectionné par espèce cible. Bucktails pour le maskinongé. Crankbaits pour le doré. Jigs et streamers pour la truite. Structure Shopify-ready — ajoutez au panier, recevez chez vous. Le calendrier de pêche combine les données météo Open-Meteo en temps réel sur trente jours avec les fenêtres lunaires solutaires, pour vous donner les meilleures fenêtres de pêche de la journée. Les guides des espèces vous plongent dans la biologie, l'écologie et la culture de pêche de chaque espèce. Et la section Tournois répertorie tous les grands événements compétitifs du Québec — parce que pêcher en compétition, c'est une autre façon de vivre ce sport.",
]

const TEXT_EN = [
  "Appât du Nord was born from a simple frustration: there was no real Quebec portal for the serious angler. No worthy database on local species. No map that brought together in one place the lakes, rivers, and their confirmed species. No tool that crossed weather, lunar phases, and fish behavior to tell you when to actually go. So we built it.",
  "Quebec is an extraordinary fishing territory. Forty-five major water bodies and rivers mapped — from the St. Lawrence River to the immensity of Réservoir Gouin, from Lac Saint-Jean to the cold waters of Lac Memphrémagog. Each body of water has its personality, its species, its seasons. We documented all of it, with verified sources, real GPS coordinates, and descriptions that help you choose your next destination with confidence.",
  "Twenty-one species documented — from the legendary muskellunge to lake sturgeon, including walleye, northern pike, largemouth bass, and all Quebec trout families. For each species: visual identification, habitat, seasonal behavior, best techniques, current regulations, and verified government links. A real field reference, not a Wikipedia species list.",
  "The Arsenal shop offers rigorously selected gear by target species. Bucktails for muskie. Crankbaits for walleye. Jigs and streamers for trout. Shopify-ready structure — add to cart, delivered to your door. The fishing calendar combines real-time Open-Meteo weather data over 30 days with solunar lunar windows, giving you the best fishing windows of the day. The species guides take you deep into the biology, ecology, and fishing culture of each species. And the Tournaments section lists all major competitive events in Quebec — because fishing in competition is another way to live this sport.",
]

export function HomeDescription({ locale }: HomeDescriptionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })
  const paragraphs = locale === 'fr' ? TEXT_FR : TEXT_EN

  return (
    <section
      ref={ref}
      style={{
        background: 'var(--bg-raised)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'var(--section-pad) 0',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 2rem' }}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          {locale === 'fr' ? "À propos de la plateforme" : "About the platform"}
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40, scale: 0.985 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            color: 'var(--text-primary)',
            lineHeight: 0.95,
            marginBottom: '3rem',
            letterSpacing: '0.03em',
            maxWidth: '700px',
          }}
        >
          {locale === 'fr'
            ? <>LE QUÉBEC SE PÊCHE MIEUX<br /><span style={{ color: 'var(--accent)' }}>QUAND TOUT EST AU MÊME ENDROIT.</span></>
            : <>QUEBEC FISHES BETTER<br /><span style={{ color: 'var(--accent)' }}>WHEN EVERYTHING IS IN ONE PLACE.</span></>}
        </motion.h2>

        {/* Two-column layout: text left, photo right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'stretch',
          }}
          className="home-desc-grid"
        >
          {/* LEFT — prose */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {/* Teal rule */}
            <div style={{
              width: '48px',
              height: '3px',
              background: 'var(--accent)',
              marginBottom: '2rem',
              borderRadius: '2px',
            }} />

            {paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.15 + i * 0.08 }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.6vw, 1.1rem)',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.78,
                  marginBottom: '1.5rem',
                  fontWeight: 400,
                }}
              >
                {para}
              </motion.p>
            ))}
          </motion.div>

          {/* RIGHT — tall action photo */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
            style={{ position: 'relative' }}
          >
            <div style={{
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
              border: '1px solid var(--border)',
              height: '100%',
              minHeight: '420px',
              position: 'relative',
            }}>
              <img
                src="/images/hero/fisherman-vertical.jpg"
                alt={locale === 'fr' ? 'Pêcheur au bord du lac' : 'Angler fishing at the lake'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 30%',
                  display: 'block',
                  minHeight: '420px',
                }}
              />
              {/* Bottom overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2rem 1.75rem',
                background: 'linear-gradient(to top, rgba(10,14,26,0.96) 0%, transparent 100%)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.06em',
                  marginBottom: '0.3rem',
                }}>
                  {locale === 'fr' ? 'Découvrez le Québec' : 'Discover Quebec'}
                </div>
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? "45+ plans d'eau · 21 espèces · FR/EN" : "45+ waters · 21 species · FR/EN"}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Desktop 2-col */}
      <style>{`
        @media (min-width: 900px) {
          .home-desc-grid {
            grid-template-columns: 58% 42% !important;
          }
        }
      `}</style>
    </section>
  )
}
