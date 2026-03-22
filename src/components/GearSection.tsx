import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { products, SpeciesTag, LureType } from '../lib/products'

// Fish card data for the grid-first Arsenal layout
const FISH_CARDS: {
  id: SpeciesTag | 'all'
  labelFr: string
  labelEn: string
  color: string
  image: string
}[] = [
  { id: 'maskinonge', labelFr: 'Maskinongé', labelEn: 'Muskellunge', color: '#D4261C', image: '/images/fish/maskinonge.png' },
  { id: 'brochet', labelFr: 'Grand Brochet', labelEn: 'Northern Pike', color: '#2E7D32', image: '/images/fish/grand-brochet.png' },
  { id: 'achigan', labelFr: 'Achigan', labelEn: 'Bass', color: '#1565C0', image: '/images/fish/achigan-grande-bouche.png' },
  { id: 'dore', labelFr: 'Doré Jaune', labelEn: 'Walleye', color: '#C8A84B', image: '/images/fish/dore-jaune.png' },
  { id: 'truite', labelFr: 'Truite', labelEn: 'Trout', color: '#6A1B9A', image: '/images/fish/truite-mouchetee.png' },
]

// Lure type tabs
const LURE_TYPES: { id: LureType | 'tous'; labelFr: string; labelEn: string }[] = [
  { id: 'tous', labelFr: 'Tous', labelEn: 'All' },
  { id: 'bucktail', labelFr: 'Bucktails', labelEn: 'Bucktails' },
  { id: 'crankbait', labelFr: 'Crankbaits', labelEn: 'Crankbaits' },
  { id: 'jig', labelFr: 'Jigs', labelEn: 'Jigs' },
  { id: 'topwater', labelFr: 'Topwater', labelEn: 'Topwater' },
  { id: 'spinner', labelFr: 'Spinners', labelEn: 'Spinners' },
  { id: 'swimbait', labelFr: 'Swimbaits', labelEn: 'Swimbaits' },
  { id: 'glide-bait', labelFr: 'Glide Baits', labelEn: 'Glide Baits' },
  { id: 'softbait', labelFr: 'Softbaits', labelEn: 'Softbaits' },
  { id: 'cuillere', labelFr: 'Cuillères', labelEn: 'Spoons' },
  { id: 'equipement', labelFr: 'Équipement', labelEn: 'Gear' },
]

// Map species ID strings used in "View arsenal" fish-profile navigation to SpeciesTag
const SPECIES_ID_TO_TAG: Record<string, SpeciesTag> = {
  'muskellunge': 'maskinonge',
  'tiger-muskie': 'maskinonge',
  'northern-pike': 'brochet',
  'largemouth-bass': 'achigan',
  'smallmouth-bass': 'achigan',
  'walleye': 'dore',
  'sauger': 'dore',
  'brook-trout': 'truite',
  'brown-trout': 'truite',
  'lake-trout': 'truite',
  'rainbow-trout': 'truite',
  'atlantic-salmon': 'truite',
  'arctic-char': 'truite',
  'splake': 'truite',
}

interface GearSectionProps {
  initialSpeciesFilter?: string
  onAddToCart: (product: { id: string; name: string; price: number }) => void
  locale: 'fr' | 'en'
}

export function GearSection({ initialSpeciesFilter, onAddToCart, locale }: GearSectionProps) {
  // Map incoming species ID (from SpeciesSection) to SpeciesTag
  const resolvedInitial = initialSpeciesFilter
    ? (SPECIES_ID_TO_TAG[initialSpeciesFilter] || (initialSpeciesFilter as SpeciesTag))
    : null

  // Which fish card is expanded (accordion)
  const [openFish, setOpenFish] = useState<SpeciesTag | null>(
    resolvedInitial || null
  )
  const [lureFilter, setLureFilter] = useState<LureType | 'tous'>('tous')
  const [expandedProductId, setExpandedProductId] = useState<string | null>(null)

  // Count products per fish
  const countForFish = (fishId: SpeciesTag) =>
    products.filter(p => p.species.includes(fishId)).length

  // Filter products for the open fish + lure type
  const filteredProducts = openFish
    ? products.filter(p => {
        const matchFish = p.species.includes(openFish)
        const matchLure = lureFilter === 'tous' || p.type === lureFilter
        return matchFish && matchLure
      })
    : []

  const activeFishCard = FISH_CARDS.find(f => f.id === openFish)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}
    >
      {/* Section Header */}
      <p style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--accent)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
      }}>
        {locale === 'fr' ? '162 produits · Triés par espèce' : '162 products · Sorted by species'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--section-display)', color: 'var(--text-primary)', marginBottom: '0.4rem', letterSpacing: '0.03em' }}>
        {locale === 'fr' ? 'ARSENAL — ÉQUIPEMENT DE PÊCHE' : 'ARSENAL — FISHING GEAR'}
      </h2>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
        {locale === 'fr'
          ? 'Cliquez sur une espèce pour voir ses leurres et équipements recommandés.'
          : 'Click a species to see its recommended lures and gear.'}
      </p>

      {/* Fish Cards Grid (4 col desktop, 2 mobile) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '0.75rem',
        marginBottom: '1.5rem',
      }}
        className="arsenal-fish-grid"
      >
        {FISH_CARDS.map((fish) => {
          const isOpen = openFish === fish.id
          const count = countForFish(fish.id as SpeciesTag)
          return (
            <button
              key={fish.id}
              onClick={() => {
                setOpenFish(isOpen ? null : fish.id as SpeciesTag)
                setLureFilter('tous')
                setExpandedProductId(null)
              }}
              style={{
                position: 'relative',
                overflow: 'hidden',
                background: isOpen ? fish.color : 'var(--surface)',
                border: `2px solid ${isOpen ? fish.color : 'var(--border)'}`,
                borderRadius: '4px',
                padding: '0',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
            >
              {/* Fish image */}
              <div style={{ width: '100%', height: '100px', overflow: 'hidden', background: '#0a1520' }}>
                <img
                  src={fish.image}
                  alt={locale === 'fr' ? fish.labelFr : fish.labelEn}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    opacity: isOpen ? 1 : 0.75,
                    transition: 'opacity 0.2s',
                  }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
              {/* Card footer */}
              <div style={{
                padding: '0.5rem 0.6rem',
                background: isOpen ? fish.color : 'var(--surface)',
                transition: 'background 0.2s',
              }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: isOpen ? '#fff' : 'var(--text-primary)',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? fish.labelFr : fish.labelEn}
                </div>
                <div style={{
                  fontSize: '0.65rem',
                  color: isOpen ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
                  marginTop: '0.15rem',
                }}>
                  {count} {locale === 'fr' ? 'produit(s)' : 'product(s)'}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Accordion — Gear for selected fish */}
      {openFish && activeFishCard && (
        <div style={{
          background: 'var(--surface)',
          border: `1px solid ${activeFishCard.color}`,
          borderTop: `3px solid ${activeFishCard.color}`,
          borderRadius: '4px',
          padding: '1.25rem',
          marginBottom: '1.5rem',
        }}>
          {/* Fish name + lure type tabs */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              color: activeFishCard.color,
              letterSpacing: '0.08em',
              fontWeight: 700,
              marginBottom: '0.75rem',
            }}>
              {locale === 'fr' ? activeFishCard.labelFr : activeFishCard.labelEn}
              <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem', marginLeft: '0.75rem' }}>
                {filteredProducts.length} / {countForFish(openFish)} {locale === 'fr' ? 'produits' : 'products'}
              </span>
            </div>

            {/* Lure type tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
              {LURE_TYPES.map((lt) => {
                const isActive = lureFilter === lt.id
                // Count products for this type
                const typeCount = lt.id === 'tous'
                  ? countForFish(openFish)
                  : products.filter(p => p.species.includes(openFish) && p.type === lt.id).length
                if (typeCount === 0 && lt.id !== 'tous') return null
                return (
                  <button
                    key={lt.id}
                    onClick={() => { setLureFilter(lt.id); setExpandedProductId(null) }}
                    style={{
                      padding: '0.3rem 0.7rem',
                      background: isActive ? activeFishCard.color : 'var(--bg)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      border: `1px solid ${isActive ? activeFishCard.color : 'var(--border)'}`,
                      borderRadius: '2px',
                      fontSize: '0.68rem',
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {locale === 'fr' ? lt.labelFr : lt.labelEn}
                    {typeCount > 0 && lt.id !== 'tous' && (
                      <span style={{ marginLeft: '0.3rem', opacity: 0.7 }}>({typeCount})</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Product grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.75rem',
          }}
            className="arsenal-product-grid"
          >
            {filteredProducts.map((product) => {
              const isExpanded = expandedProductId === product.id
              return (
                <div
                  key={product.id}
                  onClick={() => setExpandedProductId(isExpanded ? null : product.id)}
                  style={{
                    background: 'var(--bg)',
                    border: `1px solid ${isExpanded ? activeFishCard.color : 'var(--border)'}`,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'border-color 0.15s',
                  }}
                >
                  <img
                    src={`/images/lures/${product.imageFile}`}
                    alt={product.name}
                    style={{ width: '100%', height: '120px', objectFit: 'contain', background: 'white', padding: '0.4rem', display: 'block' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/images/lures/jig.jpg' }}
                  />
                  <div style={{ padding: '0.6rem' }}>
                    <div style={{
                      fontSize: '0.65rem',
                      color: activeFishCard.color,
                      fontFamily: 'var(--font-display)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                      marginBottom: '0.2rem',
                    }}>
                      {product.typeFR}
                    </div>
                    <div style={{
                      color: 'var(--text-primary)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      lineHeight: 1.3,
                      marginBottom: '0.3rem',
                    }}>
                      {product.name}
                    </div>

                    {/* Expanded content */}
                    {isExpanded && (
                      <div style={{ marginTop: '0.4rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', lineHeight: 1.5, marginBottom: '0.4rem' }}>
                          {product.description}
                        </p>
                        <div style={{
                          background: 'var(--surface)',
                          borderLeft: `3px solid ${activeFishCard.color}`,
                          padding: '0.4rem 0.5rem',
                          marginBottom: '0.5rem',
                        }}>
                          <div style={{ color: activeFishCard.color, fontSize: '0.6rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginBottom: '0.2rem' }}>
                            {locale === 'fr' ? 'TECHNIQUE' : 'TECHNIQUE'}
                          </div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', lineHeight: 1.4, margin: 0 }}>
                            {product.technique}
                          </p>
                        </div>
                        <a
                          href={product.affiliateLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            color: '#FF9900',
                            fontFamily: 'var(--font-display)',
                            fontSize: '0.68rem',
                            letterSpacing: '0.05em',
                            textDecoration: 'none',
                          }}
                        >
                          🛒 {locale === 'fr' ? 'VOIR SUR AMAZON.CA' : 'VIEW ON AMAZON.CA'}
                        </a>
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.4rem' }}>
                      {product.price > 0 ? (
                        <span style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)', fontSize: '0.9rem', fontWeight: 700 }}>
                          ${product.price}<span style={{ color: 'var(--text-muted)', fontSize: '0.65rem', fontWeight: 400 }}> CAD</span>
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>—</span>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onAddToCart({ id: product.id, name: product.name, price: product.price })
                        }}
                        style={{
                          background: activeFishCard.color,
                          color: 'white',
                          border: 'none',
                          padding: '0.3rem 0.5rem',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.05em',
                          cursor: 'pointer',
                          borderRadius: '2px',
                        }}
                      >
                        {locale === 'fr' ? 'AJOUTER' : 'ADD'}
                      </button>
                    </div>

                    {!isExpanded && (
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.62rem', marginTop: '0.3rem' }}>
                        {locale === 'fr' ? '↓ Voir technique & Amazon' : '↓ See technique & Amazon'}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
              🎣 {locale === 'fr' ? 'Aucun produit pour ce filtre.' : 'No products for this filter.'}
            </div>
          )}
        </div>
      )}

      {/* No fish selected message */}
      {!openFish && (
        <div style={{
          textAlign: 'center',
          padding: '2.5rem',
          color: 'var(--text-muted)',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>🎣</div>
          <p style={{ fontSize: '0.9rem' }}>
            {locale === 'fr'
              ? 'Sélectionnez une espèce pour explorer son équipement recommandé.'
              : 'Select a species to explore its recommended gear.'}
          </p>
        </div>
      )}

      {/* Responsive grid overrides */}
      <style>{`
        @media (max-width: 768px) {
          .arsenal-fish-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .arsenal-product-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .arsenal-product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  )
}
