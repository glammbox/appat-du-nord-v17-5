import { useState, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { products, SpeciesTag, LureType, Product } from '../lib/products'
import { WobbleCard } from './ui/wobble-card'
import { AnimatedModal } from './ui/animated-modal'
import { BoutiqueTabs } from './ui/boutique-tabs'
import { ShimmerButton } from './ui/ShimmerButton'
import { Button as MovingBorderButton } from './ui/moving-border'

// ─── Species filter tabs ───────────────────────────────────────────────────
const SPECIES_TABS = [
  { id: 'all',        labelFr: 'Tous',       labelEn: 'All',        color: '#F5F7FA' },
  { id: 'maskinonge', labelFr: 'Maskinongé', labelEn: 'Muskie',     color: '#F97316' },
  { id: 'brochet',    labelFr: 'Brochet',    labelEn: 'Pike',       color: '#14B8A6' },
  { id: 'dore',       labelFr: 'Doré',       labelEn: 'Walleye',    color: '#EAB308' },
  { id: 'achigan',    labelFr: 'Achigan',    labelEn: 'Bass',       color: '#22C55E' },
  { id: 'truite',     labelFr: 'Truite',     labelEn: 'Trout',      color: '#3B82F6' },
]

// ─── Lure type filter ─────────────────────────────────────────────────────
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

const CATEGORY_PLACEHOLDERS: Record<string, string> = {
  bucktail:   '/images/lures/bucktail.jpg',
  crankbait:  '/images/lures/crankbait.jpg',
  jig:        '/images/lures/jig.jpg',
  topwater:   '/images/lures/topwater.jpg',
  spinner:    '/images/lures/spinner.jpg',
  swimbait:   '/images/lures/swimbait.jpg',
  'glide-bait': '/images/lures/glide-bait.jpg',
  softbait:   '/images/lures/softbait.jpg',
  cuillere:   '/images/lures/cuillere.jpg',
  equipement: '/images/lures/rod.jpg',
}

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

function getProductImage(product: Product): string {
  if (product.imageFile) return `/images/lures/${product.imageFile}`
  return CATEGORY_PLACEHOLDERS[product.type] || '/images/lures/bucktail.jpg'
}

function getSpeciesColor(speciesId: string): string {
  return SPECIES_TABS.find(t => t.id === speciesId)?.color || '#00CFFF'
}

interface GearSectionProps {
  initialSpeciesFilter?: string
  onAddToCart: (product: { id: string; name: string; price: number }) => void
  locale: 'fr' | 'en'
  isBoutiquePage?: boolean
  onNavigateBoutique?: () => void
}

export function GearSection({
  initialSpeciesFilter,
  onAddToCart,
  locale,
  isBoutiquePage = false,
  onNavigateBoutique,
}: GearSectionProps) {
  const resolvedInitial = initialSpeciesFilter
    ? (SPECIES_ID_TO_TAG[initialSpeciesFilter] || (initialSpeciesFilter as SpeciesTag))
    : 'all'

  const [speciesFilter, setSpeciesFilter] = useState<SpeciesTag | 'all'>(
    (resolvedInitial as SpeciesTag | 'all') || 'all'
  )
  const [lureFilter, setLureFilter] = useState<LureType | 'tous'>('tous')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalQty, setModalQty] = useState(1)
  const [modalAdded, setModalAdded] = useState(false)

  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  const activeSpeciesTab = SPECIES_TABS.find(t => t.id === speciesFilter) || SPECIES_TABS[0]

  const filteredProducts = products.filter(p => {
    const matchSpecies = speciesFilter === 'all' ? true : p.species.includes(speciesFilter as SpeciesTag)
    const matchLure = lureFilter === 'tous' ? true : p.type === lureFilter
    return matchSpecies && matchLure
  })

  const openProductModal = (product: Product) => {
    setSelectedProduct(product)
    setModalQty(1)
    setModalAdded(false)
  }

  const handleModalAddToCart = () => {
    if (!selectedProduct) return
    for (let i = 0; i < modalQty; i++) {
      onAddToCart({ id: selectedProduct.id, name: selectedProduct.name, price: selectedProduct.price })
    }
    setModalAdded(true)
    setTimeout(() => setModalAdded(false), 2000)
  }

  const speciesTabItems = SPECIES_TABS.map(t => ({
    id: t.id,
    label: locale === 'fr' ? t.labelFr : t.labelEn,
    color: t.color,
  }))

  const lureTabItems = [{ id: 'tous', label: locale === 'fr' ? 'Tous' : 'All', color: '#8899AA' }, ...LURE_TYPES.slice(1).map(lt => ({
    id: lt.id,
    label: locale === 'fr' ? lt.labelFr : lt.labelEn,
    color: activeSpeciesTab.color,
  }))]

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--section-pad) 1.5rem',
        background: '#050810',
      }}
    >
      {/* ─── Section Header ─────────────────────────────────────────────── */}
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
          color: '#00CFFF',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          {locale === 'fr' ? '⚡ Boutique · Équipement de pêche' : '⚡ Shop · Fishing Gear'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: isBoutiquePage ? 'clamp(4rem, 8vw, 7rem)' : 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          lineHeight: 0.95,
          marginBottom: '1rem',
        }}>
          BOUTIQUE
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '600px',
        }}>
          {locale === 'fr'
            ? 'Équipement sélectionné par espèce. Filtrez par espèce cible, explorez nos leurres recommandés.'
            : 'Gear curated by target species. Filter by fish, browse recommended lures.'}
        </p>
        {!isBoutiquePage && (
          <motion.button
            whileHover={{ y: -4, x: 6 }}
            transition={{ duration: 0.2 }}
            onClick={onNavigateBoutique}
            style={{
              marginTop: '1.35rem',
              padding: '0.95rem 1.5rem',
              background: '#E63946',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.84rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {locale === 'fr' ? 'BOUTIQUE →' : 'BOUTIQUE →'}
          </motion.button>
        )}
      </motion.div>

      {/* ─── Species Tabs ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.45, delay: 0.12 }}
        style={{ marginBottom: '1.25rem' }}
      >
        <BoutiqueTabs
          tabs={speciesTabItems}
          activeId={speciesFilter}
          onChange={(id) => {
            setSpeciesFilter(id as SpeciesTag | 'all')
            setLureFilter('tous')
          }}
        />
      </motion.div>

      {/* ─── Lure Type Sub-tabs ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.2 }}
        style={{ marginBottom: '2rem' }}
      >
        <BoutiqueTabs
          tabs={lureTabItems}
          activeId={lureFilter}
          onChange={(id) => setLureFilter(id as LureType | 'tous')}
        />
      </motion.div>

      {/* ─── Results count ──────────────────────────────────────────────── */}
      <motion.div
        key={`${speciesFilter}-${lureFilter}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{
          marginBottom: '1.5rem',
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.68rem',
          color: '#5B6F85',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        {filteredProducts.length} {locale === 'fr' ? 'produit(s)' : 'product(s)'}
        {speciesFilter !== 'all' && (
          <span style={{ color: activeSpeciesTab.color, marginLeft: '0.5rem' }}>
            · {locale === 'fr' ? activeSpeciesTab.labelFr : activeSpeciesTab.labelEn}
          </span>
        )}
      </motion.div>

      {/* ─── Product Grid — WobbleCard ──────────────────────────────────── */}
      {filteredProducts.length === 0 ? (
        <div style={{
          padding: '3rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
        }}>
          {locale === 'fr' ? 'Aucun produit pour ce filtre' : 'No products for this filter'}
        </div>
      ) : (
        <div
          className="boutique-product-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(180px, 100%), 1fr))',
            gap: '1rem',
          }}
        >
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.04, 0.6) }}
            >
              <WobbleCard
                containerClassName="boutique-wobble-card"
              >
                {/* Product card inner */}
                <div
                  onClick={() => openProductModal(product)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 0,
                    cursor: 'pointer',
                    height: '100%',
                    padding: 0,
                  }}
                >
                  {/* Product image */}
                  <div style={{
                    width: '100%',
                    aspectRatio: '4/3',
                    overflow: 'hidden',
                    background: '#0A1220',
                    borderRadius: '10px 10px 0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: `2px solid ${activeSpeciesTab.color}22`,
                  }}>
                    <img
                      src={getProductImage(product)}
                      alt={product.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease',
                      }}
                      onError={(e) => {
                        const pl = CATEGORY_PLACEHOLDERS[product.type] || '/images/lures/bucktail.jpg'
                        if ((e.target as HTMLImageElement).src !== pl) {
                          (e.target as HTMLImageElement).src = pl
                        }
                      }}
                    />
                  </div>

                  {/* Card content */}
                  <div style={{
                    padding: '0.85rem 1rem 0.75rem',
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem',
                  }}>
                    {/* Category badge */}
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      color: activeSpeciesTab.color,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                    }}>
                      {locale === 'fr' ? product.typeFR : product.type}
                    </div>

                    {/* Product name */}
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      color: '#F5F7FA',
                      lineHeight: 1.2,
                      letterSpacing: '0.02em',
                    }}>
                      {product.name}
                    </div>

                    {/* Price */}
                    <div style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: '#00CFFF',
                      letterSpacing: '0.04em',
                      marginTop: 'auto',
                      paddingTop: '0.35rem',
                    }}>
                      ${product.price}
                    </div>
                  </div>

                  {/* Add to cart button */}
                  <div
                    style={{ padding: '0 0.85rem 0.85rem' }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ShimmerButton
                      shimmerColor="#00CFFF"
                      background="rgba(0,207,255,0.1)"
                      style={{
                        width: '100%',
                        padding: '0.5rem 0',
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: '0.72rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: '#00CFFF',
                      }}
                      onClick={() => {
                        onAddToCart({ id: product.id, name: product.name, price: product.price })
                      }}
                    >
                      {locale === 'fr' ? 'Ajouter au panier' : 'Add to Cart'}
                    </ShimmerButton>
                  </div>
                </div>
              </WobbleCard>
            </motion.div>
          ))}
        </div>
      )}

      {/* ─── Product Detail Modal — AnimatedModal ──────────────────────── */}
      <AnimatedModal
        open={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div>
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#8899AA',
                borderRadius: '8px',
                width: '34px',
                height: '34px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.12)'
                ;(e.currentTarget as HTMLElement).style.color = '#00CFFF'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'
                ;(e.currentTarget as HTMLElement).style.color = '#8899AA'
              }}
            >
              ✕
            </button>

            {/* Modal layout: image left (desktop), top (mobile) */}
            <div className="modal-layout" style={{
              display: 'flex',
              gap: '1.5rem',
            }}>
              {/* Image */}
              <div style={{
                flexShrink: 0,
                width: '260px',
                minHeight: '260px',
                background: '#0A1220',
                borderRadius: '12px 0 0 12px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="modal-image-panel"
              >
                <img
                  src={getProductImage(selectedProduct)}
                  alt={selectedProduct.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                  onError={(e) => {
                    const pl = CATEGORY_PLACEHOLDERS[selectedProduct.type] || '/images/lures/bucktail.jpg'
                    if ((e.target as HTMLImageElement).src !== pl) {
                      (e.target as HTMLImageElement).src = pl
                    }
                  }}
                />
              </div>

              {/* Info */}
              <div style={{
                flex: 1,
                padding: '1.75rem 1.75rem 1.75rem 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
              className="modal-info-panel"
              >
                {/* Category + species */}
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  color: activeSpeciesTab.color,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? selectedProduct.typeFR : selectedProduct.type}
                </div>

                {/* Name */}
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: '#F5F7FA',
                  letterSpacing: '0.04em',
                  lineHeight: 1.1,
                }}>
                  {selectedProduct.name}
                </div>

                {/* Price */}
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '2rem',
                  color: '#00CFFF',
                  letterSpacing: '0.04em',
                }}>
                  ${selectedProduct.price}
                </div>

                {/* Description */}
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: '#8899AA',
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {selectedProduct.description}
                </p>

                {/* Technique */}
                <div style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.78rem',
                  color: '#00CFFF',
                  fontStyle: 'italic',
                  padding: '0.6rem 0.9rem',
                  background: 'rgba(0,207,255,0.06)',
                  borderRadius: '8px',
                  borderLeft: '2px solid rgba(0,207,255,0.4)',
                }}>
                  → {selectedProduct.technique}
                </div>

                {/* Quantity selector */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginTop: '0.25rem',
                }}>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: '#5B6F85',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                  }}>
                    {locale === 'fr' ? 'Qté' : 'Qty'}
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    padding: '0.2rem 0.4rem',
                  }}>
                    <button
                      onClick={() => setModalQty(q => Math.max(1, q - 1))}
                      style={{
                        width: '28px', height: '28px',
                        background: 'rgba(255,255,255,0.06)',
                        border: 'none',
                        color: '#F5F7FA',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        lineHeight: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      −
                    </button>
                    <span style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.1rem',
                      color: '#F5F7FA',
                      minWidth: '28px',
                      textAlign: 'center',
                    }}>
                      {modalQty}
                    </span>
                    <button
                      onClick={() => setModalQty(q => q + 1)}
                      style={{
                        width: '28px', height: '28px',
                        background: 'rgba(0,207,255,0.12)',
                        border: 'none',
                        color: '#00CFFF',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '1.1rem',
                        lineHeight: 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      +
                    </button>
                  </div>
                  <span style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    color: '#5B6F85',
                  }}>
                    = ${(selectedProduct.price * modalQty).toFixed(2)}
                  </span>
                </div>

                {/* Add to cart — MovingBorder */}
                <div style={{ marginTop: '0.25rem' }}>
                  <MovingBorderButton
                    borderRadius="10px"
                    containerClassName=""
                    className={modalAdded ? '' : ''}
                    borderClassName=""
                    duration={2000}
                    onClick={handleModalAddToCart}
                    style={{
                      width: '100%',
                      height: '52px',
                      background: modalAdded ? 'rgba(34,197,94,0.15)' : 'rgba(0,207,255,0.08)',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '0.88rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: modalAdded ? '#22C55E' : '#00CFFF',
                      transition: 'all 0.25s',
                    }}
                  >
                    {modalAdded
                      ? (locale === 'fr' ? '✓ Ajouté!' : '✓ Added!')
                      : (locale === 'fr' ? 'Ajouter au panier' : 'Add to Cart')}
                  </MovingBorderButton>
                </div>

                {/* Amazon link */}
                <a
                  href={selectedProduct.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    color: '#5B6F85',
                    textDecoration: 'none',
                    textAlign: 'center',
                    transition: 'color 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00CFFF' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#5B6F85' }}
                >
                  Voir sur Amazon.ca →
                </a>
              </div>
            </div>
          </div>
        )}
      </AnimatedModal>

      {/* ─── Responsive styles ──────────────────────────────────────────── */}
      <style>{`
        .boutique-wobble-card {
          background: #0D1525 !important;
          border: 1px solid rgba(0,207,255,0.12) !important;
          border-radius: 14px !important;
          overflow: hidden !important;
          height: 100% !important;
          padding: 0 !important;
          transition: border-color 0.2s;
        }
        .boutique-wobble-card:hover {
          border-color: rgba(0,207,255,0.3) !important;
        }
        .boutique-wobble-card > div {
          padding: 0 !important;
          height: 100% !important;
        }
        .boutique-wobble-card > div > div {
          height: 100% !important;
        }
        @media (max-width: 640px) {
          .boutique-product-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .modal-layout {
            flex-direction: column !important;
          }
          .modal-image-panel {
            width: 100% !important;
            min-height: 200px !important;
            border-radius: 12px 12px 0 0 !important;
          }
          .modal-info-panel {
            padding: 1rem 1.25rem 1.25rem !important;
          }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .boutique-product-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
