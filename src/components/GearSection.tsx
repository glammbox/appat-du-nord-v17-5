import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { products, SpeciesTag, LureType, Product } from '../lib/products'

// 22 Arsenal cards: 21 species (with Trout as 1 grouped card) + 1 Équipement Général
// Per brief item 16-17: 22 total, Trout = one card for all trout sub-species
const ARSENAL_CARDS: {
  id: SpeciesTag | 'all'
  labelFr: string
  labelEn: string
  subFr?: string
  subEn?: string
  color: string
  image: string
}[] = [
  // Row 1 — Big 5
  { id: 'maskinonge', labelFr: 'Maskinongé', labelEn: 'Muskellunge', color: '#D4261C', image: '/images/fish/muskellunge.png' },
  { id: 'brochet',    labelFr: 'Grand Brochet', labelEn: 'Northern Pike', color: '#2E7D32', image: '/images/fish/northern-pike.png' },
  { id: 'achigan',    labelFr: 'Achigan', labelEn: 'Bass', subFr: 'Grande & Petite Bouche', subEn: 'LM & SM Bass', color: '#1565C0', image: '/images/fish/largemouth-bass.png' },
  { id: 'dore',       labelFr: 'Doré Jaune', labelEn: 'Walleye', color: '#C8A84B', image: '/images/fish/walleye.png' },
  { id: 'truite',     labelFr: 'Truite', labelEn: 'Trout', subFr: 'Mouchetée · Arc-en-ciel · Touladi · Brune · Omble', subEn: 'Brook · Rainbow · Lake · Brown · Char', color: '#6A1B9A', image: '/images/fish/brook-trout.png' },
  // Row 2 — Other species
  { id: 'maskinonge', labelFr: 'Maskinongé-Tigrée', labelEn: 'Tiger Muskie', subFr: 'Hybride Maskinongé × Brochet', subEn: 'Muskie × Pike hybrid', color: '#B71C1C', image: '/images/fish/tiger-muskie.png' },
  { id: 'dore',       labelFr: 'Doré Noir (Sauger)', labelEn: 'Sauger', subFr: 'Cousin du Doré Jaune', subEn: 'Walleye cousin', color: '#A07B20', image: '/images/fish/sauger.png' },
  { id: 'achigan',    labelFr: 'Achigan Petite Bouche', labelEn: 'Smallmouth Bass', subFr: 'Rivières & lacs rocheux', subEn: 'Rocky rivers & lakes', color: '#0D47A1', image: '/images/fish/smallmouth-bass.png' },
  { id: 'truite',     labelFr: 'Saumon Atlantique', labelEn: 'Atlantic Salmon', subFr: 'Ouananiche & saumon de mer', subEn: 'Ouananiche & sea-run', color: '#4A1080', image: '/images/fish/atlantic-salmon.png' },
  { id: 'truite',     labelFr: 'Omble Chevalier', labelEn: 'Arctic Char', subFr: 'Eaux froides du nord', subEn: 'Northern cold waters', color: '#512DA8', image: '/images/fish/arctic-char.png' },
  // Row 3 — Secondary species
  { id: 'maskinonge', labelFr: 'Esturgeon des Lacs', labelEn: 'Lake Sturgeon', subFr: 'Grand migrateur du Saint-Laurent', subEn: 'St. Lawrence giant', color: '#4E342E', image: '/images/fish/lake-sturgeon.png' },
  { id: 'dore',       labelFr: 'Perchaude', labelEn: 'Yellow Perch', subFr: 'Pêche blanche & été', subEn: 'Ice fishing & summer', color: '#F57F17', image: '/images/fish/perch.png' },
  { id: 'brochet',    labelFr: 'Cisco / Ménomini', labelEn: 'Cisco / Whitefish', subFr: 'Appât vivant & hameçon', subEn: 'Live bait & hook', color: '#1B5E20', image: '/images/fish/cisco.png' },
  { id: 'brochet',    labelFr: 'Lotte (Burbot)', labelEn: 'Burbot', subFr: 'Prédateur des profondeurs', subEn: 'Deep water predator', color: '#33691E', image: '/images/fish/burbot.png' },
  { id: 'brochet',    labelFr: 'Carpe Commune', labelEn: 'Common Carp', subFr: 'Pêche à la mouche & feeder', subEn: 'Fly & feeder fishing', color: '#558B2F', image: '/images/fish/carp.png' },
  // Row 4 — Less common
  { id: 'brochet',    labelFr: 'Barbotte / Barbue', labelEn: 'Catfish / Bullhead', subFr: 'Pêche de fond', subEn: 'Bottom fishing', color: '#37474F', image: '/images/fish/catfish.png' },
  { id: 'truite',     labelFr: 'Truite Splake', labelEn: 'Splake Trout', subFr: 'Hybride Touladi × Mouchetée', subEn: 'Lake × Brook trout hybrid', color: '#7B1FA2', image: '/images/fish/splake.png' },
  { id: 'dore',       labelFr: 'Grand Corégone', labelEn: 'Lake Whitefish', subFr: 'Pêche hivernale', subEn: 'Winter fishing', color: '#E65100', image: '/images/fish/whitefish.png' },
  { id: 'achigan',    labelFr: 'Achigan Grande Bouche', labelEn: 'Largemouth Bass', subFr: 'Herbiers & eau chaude', subEn: 'Weeds & warm water', color: '#1A237E', image: '/images/fish/largemouth-bass.png' },
  { id: 'truite',     labelFr: 'Truite Arc-en-ciel', labelEn: 'Rainbow Trout', subFr: 'Rivières & réservoirs', subEn: 'Rivers & reservoirs', color: '#9C27B0', image: '/images/fish/rainbow-trout.png' },
  { id: 'truite',     labelFr: 'Truite Mouchetée', labelEn: 'Brook Trout', subFr: "L'espèce emblématique du Québec", subEn: "Quebec's iconic species", color: '#6A1B9A', image: '/images/fish/brook-trout.png' },
  // Card 22 — Équipement Général
  { id: 'all',        labelFr: 'Équipement Général', labelEn: 'General Gear', subFr: 'Cannes, lignes, hameçons, waders, filets', subEn: 'Rods, lines, hooks, waders, nets', color: '#455A64', image: '/images/lures/bucktail.jpg' },
]

// Lure type tabs
const LURE_TYPES: { id: LureType | 'tous'; labelFr: string; labelEn: string }[] = [
  { id: 'tous',       labelFr: 'Tous',        labelEn: 'All' },
  { id: 'bucktail',   labelFr: 'Bucktails',   labelEn: 'Bucktails' },
  { id: 'crankbait',  labelFr: 'Crankbaits',  labelEn: 'Crankbaits' },
  { id: 'jig',        labelFr: 'Jigs',        labelEn: 'Jigs' },
  { id: 'topwater',   labelFr: 'Topwater',    labelEn: 'Topwater' },
  { id: 'spinner',    labelFr: 'Spinners',    labelEn: 'Spinners' },
  { id: 'swimbait',   labelFr: 'Swimbaits',   labelEn: 'Swimbaits' },
  { id: 'glide-bait', labelFr: 'Glide Baits', labelEn: 'Glide Baits' },
  { id: 'softbait',   labelFr: 'Softbaits',   labelEn: 'Softbaits' },
  { id: 'cuillere',   labelFr: 'Cuillères',   labelEn: 'Spoons' },
  { id: 'equipement', labelFr: 'Équipement',  labelEn: 'Gear' },
]

// Map species ID strings from SpeciesSection to SpeciesTag
const SPECIES_ID_TO_TAG: Record<string, SpeciesTag | 'all'> = {
  'muskellunge':    'maskinonge',
  'tiger-muskie':   'maskinonge',
  'northern-pike':  'brochet',
  'largemouth-bass':'achigan',
  'smallmouth-bass':'achigan',
  'walleye':        'dore',
  'sauger':         'dore',
  'brook-trout':    'truite',
  'brown-trout':    'truite',
  'lake-trout':     'truite',
  'rainbow-trout':  'truite',
  'atlantic-salmon':'truite',
  'arctic-char':    'truite',
  'splake':         'truite',
}

interface GearSectionProps {
  initialSpeciesFilter?: string
  onAddToCart: (product: { id: string; name: string; price: number }) => void
  locale: 'fr' | 'en'
}

export function GearSection({ initialSpeciesFilter, onAddToCart, locale }: GearSectionProps) {
  const resolvedInitial = initialSpeciesFilter
    ? (SPECIES_ID_TO_TAG[initialSpeciesFilter] || (initialSpeciesFilter as SpeciesTag))
    : null

  const [modalOpen, setModalOpen] = useState<SpeciesTag | 'all' | null>(resolvedInitial)
  const [lureFilter, setLureFilter] = useState<LureType | 'tous'>('tous')

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [modalOpen])

  const activeCard = ARSENAL_CARDS.find(c => c.id === modalOpen)

  const filteredProducts = modalOpen
    ? products.filter(p => {
        const matchSpecies = modalOpen === 'all'
          ? true
          : p.species.includes(modalOpen as SpeciesTag)
        const matchLure = lureFilter === 'tous' || p.type === lureFilter
        return matchSpecies && matchLure
      })
    : []

  const countForCard = (id: SpeciesTag | 'all') =>
    id === 'all'
      ? products.length
      : products.filter(p => p.species.includes(id as SpeciesTag)).length

  const openModal = (id: SpeciesTag | 'all') => {
    setModalOpen(id)
    setLureFilter('tous')
  }

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: 'var(--section-pad) 1.5rem' }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{ marginBottom: '2.5rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: 'var(--accent)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          {locale === 'fr' ? '⚡ Boutique · Équipement par espèce' : '⚡ Shop · Gear by Species'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          lineHeight: 0.95,
          marginBottom: '1rem',
        }}>
          {locale === 'fr' ? "L'ARSENAL" : 'THE ARSENAL'}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '600px',
        }}>
          {locale === 'fr'
            ? "Équipement sélectionné par espèce cible. Cliquez sur une espèce pour voir les leurres et l'équipement recommandés. Shopify-ready."
            : "Gear selected by target species. Click a species to see recommended lures and equipment. Shopify-ready."}
        </p>
      </motion.div>

      {/* 22 Species Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '0.85rem',
        }}
        className="arsenal-grid"
      >
        {ARSENAL_CARDS.map((card, idx) => {
          const count = countForCard(card.id)
          const label = locale === 'fr' ? card.labelFr : card.labelEn
          const sub = locale === 'fr' ? card.subFr : card.subEn

          return (
            <motion.button
              key={card.id}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.08 + idx * 0.04 }}
              onClick={() => openModal(card.id)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: 'var(--surface)',
                border: `1px solid var(--border)`,
                borderTop: `3px solid ${card.color}`,
                borderRadius: 'var(--radius-sm)',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${card.color}`,
                transition: { duration: 0.2 }
              }}
            >
              {/* Fish image */}
              <div style={{
                width: '100%',
                aspectRatio: '4/3',
                overflow: 'hidden',
                background: '#0A1020',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <img
                  src={card.image}
                  alt={label}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    padding: '0.5rem',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                  }}
                />
              </div>
              {/* Card content */}
              <div style={{ padding: '0.7rem 0.75rem', flex: 1 }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.2,
                  marginBottom: '0.2rem',
                }}>
                  {label}
                </div>
                {sub && (
                  <div style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.4,
                    marginBottom: '0.3rem',
                  }}>
                    {sub}
                  </div>
                )}
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: card.color,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}>
                  {count} {locale === 'fr' ? 'produit(s) →' : 'product(s) →'}
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Arsenal Overlay Modal */}
      <AnimatePresence>
        {modalOpen && activeCard && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setModalOpen(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(10,14,26,0.88)',
                zIndex: 200,
                backdropFilter: 'blur(6px)',
              }}
            />

            {/* Panel — desktop: right side panel; mobile: bottom sheet */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: 'min(100vw, 520px)',
                background: 'var(--bg-raised)',
                zIndex: 201,
                display: 'flex',
                flexDirection: 'column',
                borderLeft: `1px solid var(--border)`,
                boxShadow: '-20px 0 60px rgba(0,0,0,0.5)',
              }}
              className="arsenal-modal-panel"
            >
              {/* Modal header */}
              <div style={{
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                flexShrink: 0,
                borderTop: `3px solid ${activeCard.color}`,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    background: '#0A1020',
                    border: '1px solid var(--border)',
                    flexShrink: 0,
                  }}>
                    <img src={activeCard.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                      {locale === 'fr' ? activeCard.labelFr : activeCard.labelEn}
                    </div>
                    <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.65rem', color: activeCard.color, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
                      {filteredProducts.length} {locale === 'fr' ? 'produit(s)' : 'product(s)'}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setModalOpen(null)}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    borderRadius: '6px',
                    padding: '0.4rem 0.8rem',
                    cursor: 'pointer',
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-condensed)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface-2)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'var(--surface)'
                    ;(e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                  }}
                >
                  ✕ {locale === 'fr' ? 'Fermer' : 'Close'}
                </button>
              </div>

              {/* Lure type filter tabs */}
              <div style={{
                padding: '0.75rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                display: 'flex',
                gap: '0.35rem',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                flexShrink: 0,
              }}>
                {LURE_TYPES.map(lt => {
                  const isActive = lureFilter === lt.id
                  return (
                    <button
                      key={lt.id}
                      onClick={() => setLureFilter(lt.id)}
                      style={{
                        flexShrink: 0,
                        padding: '0.3rem 0.65rem',
                        background: isActive ? activeCard.color : 'var(--surface)',
                        border: `1px solid ${isActive ? activeCard.color : 'var(--border)'}`,
                        color: isActive ? '#fff' : 'var(--text-muted)',
                        fontFamily: 'var(--font-condensed)',
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        borderRadius: '4px',
                        transition: 'all 0.15s',
                      }}
                    >
                      {locale === 'fr' ? lt.labelFr : lt.labelEn}
                    </button>
                  )
                })}
              </div>

              {/* Product list */}
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '1rem 1.5rem',
                scrollbarWidth: 'thin',
                scrollbarColor: `${activeCard.color} var(--surface)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.65rem',
              }}>
                {filteredProducts.length === 0 ? (
                  <div style={{
                    padding: '2rem',
                    textAlign: 'center',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.88rem',
                  }}>
                    {locale === 'fr' ? "Aucun produit pour ce filtre" : "No products for this filter"}
                  </div>
                ) : filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    locale={locale}
                    onAddToCart={() => onAddToCart({ id: product.id, name: product.name, price: product.price })}
                    accentColor={activeCard.color}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile responsive style */}
      <style>{`
        @media (max-width: 480px) {
          .arsenal-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .arsenal-modal-panel { width: 100vw !important; top: auto !important; border-left: none !important; border-top: 1px solid var(--border) !important; max-height: 85vh !important; border-radius: 16px 16px 0 0 !important; }
        }
        @media (min-width: 481px) and (max-width: 768px) {
          .arsenal-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </motion.div>
  )
}

function ProductCard({
  product,
  locale,
  onAddToCart,
  accentColor,
}: {
  product: Product
  locale: 'fr' | 'en'
  onAddToCart: () => void
  accentColor: string
}) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      padding: '0.85rem 1rem',
      display: 'flex',
      gap: '0.75rem',
      alignItems: 'flex-start',
      transition: 'border-color 0.15s',
    }}>
      {/* Product info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.6rem',
          fontWeight: 700,
          color: accentColor,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: '0.2rem',
        }}>
          {product.typeFR}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          marginBottom: '0.25rem',
          lineHeight: 1.3,
        }}>
          {product.name}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.78rem',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          marginBottom: '0.5rem',
        }}>
          {locale === 'fr' ? product.description : product.description}
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          color: 'var(--accent)',
          fontStyle: 'italic',
          marginBottom: '0.5rem',
        }}>
          → {product.technique}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.1rem',
            color: 'var(--amber)',
            letterSpacing: '0.04em',
          }}>
            ${product.price}
          </span>
          <button
            onClick={handleAdd}
            style={{
              padding: '0.35rem 0.85rem',
              background: added ? '#7BE495' : accentColor,
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background 0.25s',
            }}
          >
            {added ? (locale === 'fr' ? '✓ Ajouté' : '✓ Added') : (locale === 'fr' ? '+ Panier' : '+ Cart')}
          </button>
          <a
            href={product.affiliateLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.35rem 0.75rem',
              border: '1px solid var(--border)',
              color: 'var(--text-muted)',
              borderRadius: '4px',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
              ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
            }}
          >
            Amazon.ca →
          </a>
        </div>
      </div>
    </div>
  )
}
