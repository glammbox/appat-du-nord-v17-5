// Fix 3 — Boutique teaser on main page: ONE CTA only, no product cards
// 21st.dev: ShimmerButton (https://21st.dev/community/components/dillionverma/shimmer-button/default)
// Framer Motion: section fade-up, title letter stagger, CTA hover lift+glow

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShimmerButton } from './ui/ShimmerButton'

interface BoutiqueTeaserProps {
  locale: 'fr' | 'en'
  onNavigateBoutique?: () => void
}

export function BoutiqueTeaser({ locale, onNavigateBoutique }: BoutiqueTeaserProps) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.15 })

  const title = 'BOUTIQUE'
  const descriptor = locale === 'fr'
    ? '160+ produits · Équipement par espèce · Shopify-prêt'
    : '160+ products · Gear by species · Shopify-ready'
  const ctaLabel = locale === 'fr' ? 'OUVRIR LA BOUTIQUE →' : 'OPEN THE BOUTIQUE →'

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        padding: 'clamp(4rem, 7vw, 6rem) 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        maxWidth: '900px',
        margin: '0 auto',
      }}
    >
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#00B4D8',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        {locale === 'fr' ? '⚡ Arsenal & Équipement' : '⚡ Arsenal & Equipment'}
      </motion.p>

      {/* Title with letter stagger */}
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'var(--text-primary)',
          letterSpacing: '0.05em',
          lineHeight: 0.9,
          marginBottom: '1.5rem',
          overflow: 'hidden',
        }}
        aria-label={title}
      >
        {title.split('').map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.15 + i * 0.025,
            }}
            style={{ display: 'inline-block' }}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h2>

      {/* One-line descriptor */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.1rem',
          color: 'rgba(245,240,232,0.6)',
          letterSpacing: '0.04em',
          marginBottom: '2.5rem',
          lineHeight: 1.6,
        }}
      >
        {descriptor}
      </motion.p>

      {/* ONE CTA button — ShimmerButton from 21st.dev */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
        whileHover={{ y: -4 }}
      >
        <ShimmerButton
          onClick={onNavigateBoutique}
          shimmerColor="#00B4D8"
          background="rgba(0,180,216,0.15)"
          borderRadius="6px"
          style={{
            padding: '1rem 2.5rem',
            fontFamily: 'var(--font-condensed)',
            fontSize: '0.88rem',
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#F5F0E8',
          }}
        >
          {ctaLabel}
        </ShimmerButton>
      </motion.div>
    </motion.section>
  )
}
