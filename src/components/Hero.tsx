import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface HeroProps {
  locale: 'fr' | 'en'
}

function useCountUp(target: number, duration: number = 1800, started: boolean = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!started) return
    let start = 0
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(ease * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, started])
  return count
}

export function Hero({ locale }: HeroProps) {
  const [statsStarted, setStatsStarted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const countSpecies  = useCountUp(21,  1400, statsStarted)
  const countLacs     = useCountUp(41,  1600, statsStarted)
  const countProduits = useCountUp(162, 1800, statsStarted)

  const stats = [
    { value: countSpecies,  label: locale === 'fr' ? 'Espèces' : 'Species' },
    { value: countLacs,     label: locale === 'fr' ? "Plans d'eau" : 'Water Bodies' },
    { value: countProduits, label: locale === 'fr' ? 'Produits' : 'Products' },
  ]

  return (
    <div
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', background: 'var(--bg)' }}
    >
      {/* Background gradient layers */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, #0F1628 0%, #0A0E1A 58%, #070B14 100%)',
          zIndex: 0,
        }}
      />

      {/* Hero image — right side, full height */}
      <motion.div
        initial={{ opacity: 0, x: 96, rotate: 1.5, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, rotate: 0, scale: 1 }}
        transition={{ duration: 0.84, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <img
          src="/images/hero/fishing-hero.jpg"
          alt={locale === 'fr' ? 'Pêche au Québec' : 'Quebec Fishing'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            display: 'block',
          }}
        />
        {/* Left fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, #0A0E1A 0%, rgba(10,14,26,0.6) 45%, transparent 100%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, #0A0E1A 0%, transparent 40%)',
        }} />
      </motion.div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 2rem',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ maxWidth: '640px', paddingTop: '80px', paddingBottom: '80px' }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            {locale === 'fr' ? '🇨🇦 Atlas de pêche · Québec · 2026' : '🇨🇦 Fishing Atlas · Quebec · 2026'}
          </motion.p>

          {/* H1 — Bebas Neue, giant */}
          <motion.h1
            initial={{ opacity: 0, y: 72, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--display)',
              color: 'var(--text-primary)',
              letterSpacing: '0.03em',
              lineHeight: 0.92,
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            {locale === 'fr' ? (
              <>Lisez l'eau.<br /><span style={{ color: 'var(--accent)' }}>Chassez</span><br />les Géants.</>
            ) : (
              <>Read the water.<br /><span style={{ color: 'var(--accent)' }}>Hunt</span><br />the Giants.</>
            )}
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              lineHeight: 1.65,
              marginBottom: '2.5rem',
              maxWidth: '520px',
            }}
          >
            {locale === 'fr'
              ? "La ressource de pêche #1 au Canada. 21 espèces, 41 plans d'eau, 5 rivières majeures, l'arsenal complet, météo en temps réel et identification des poissons — tout en un."
              : "Canada's #1 fishing resource. 21 species, 41 water bodies, 5 major rivers, the complete arsenal, real-time weather and fish identification — all in one."}
          </motion.p>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1], delay: 0.36 }}
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  color: 'var(--amber)',
                  lineHeight: 0.9,
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
                  marginTop: '0.4rem',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.48 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <div style={{
              display: 'inline-block',
              padding: '0.9rem 2rem',
              background: 'var(--accent)',
              color: '#0A0E1A',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.85rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'default',
              borderRadius: '6px',
            }}>
              {locale === 'fr' ? 'Saison 2026 →' : 'Season 2026 →'}
            </div>
            <div style={{
              display: 'inline-block',
              padding: '0.9rem 2rem',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'default',
              borderRadius: '6px',
            }}>
              {locale === 'fr' ? 'Explorer les espèces' : 'Explore Species'}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          color: 'var(--text-muted)',
          fontSize: '0.7rem',
          fontFamily: 'var(--font-condensed)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <div>↓</div>
      </motion.div>

      {/* Mobile: hide right image via CSS */}
      <style>{`
        @media (max-width: 768px) {
          .hero-image-right { display: none !important; }
        }
      `}</style>
    </div>
  )
}
