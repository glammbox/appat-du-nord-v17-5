import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface HeroProps {
  locale: 'fr' | 'en'
  onSectionSelect?: (s: string) => void
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

export function Hero({ locale, onSectionSelect }: HeroProps) {
  const [statsStarted, setStatsStarted] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax — watermark moves slower than content
  const watermarkY = useTransform(scrollY, [0, 600], [0, 60])
  const imageY = useTransform(scrollY, [0, 600], [0, 80])
  const contentY = useTransform(scrollY, [0, 600], [0, 30])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const countSpecies  = useCountUp(21,  1400, statsStarted)
  const countEaux     = useCountUp(45,  1600, statsStarted)
  const countJours    = useCountUp(30,  1200, statsStarted)

  const stats = [
    { value: `${countSpecies}`, label: locale === 'fr' ? 'Espèces' : 'Species', color: '#00B4D8' },
    { value: `${countEaux}+`, label: locale === 'fr' ? "Plans d'eau" : 'Water Bodies', color: '#F4A01C' },
    { value: `${countJours}j`, label: locale === 'fr' ? 'Prévisions' : 'Forecast', color: '#E63946' },
  ]

  return (
    <div
      ref={heroRef}
      className="relative overflow-hidden"
      style={{ minHeight: '100svh', background: 'var(--bg)' }}
    >
      {/* Background gradient — dark base */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(180deg, #0F1628 0%, #0A0E1A 58%, #070B14 100%)',
        zIndex: 0,
      }} />

      {/* Hero gradient overlay — dark→teal→red energy sweep */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(10,14,26,0.95) 0%, rgba(0,100,130,0.18) 45%, rgba(230,57,70,0.12) 100%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Teal atmospheric glow — left zone */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '-10%',
        width: '55%',
        height: '70%',
        background: 'radial-gradient(ellipse, rgba(0,180,216,0.09) 0%, transparent 65%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* Red energy glow — bottom right corner */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        right: '10%',
        width: '45%',
        height: '50%',
        background: 'radial-gradient(ellipse, rgba(230,57,70,0.10) 0%, transparent 65%)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />

      {/* APPÂT DU NORD — Giant watermark layer (parallax + y-drift animation) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '-5%',
          transform: 'translateY(-50%)',
          y: watermarkY,
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 18vw, 16rem)',
          color: 'rgba(0,180,216,0.18)',
          letterSpacing: '0.04em',
          lineHeight: 0.85,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          WebkitTextStroke: '1px rgba(0,180,216,0.35)',
        }}>
          APPÂT<br />DU<br />NORD
        </div>
      </motion.div>

      {/* Hero image — right side, full height (parallax) */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '55%',
          height: '100%',
          zIndex: 2,
          y: imageY,
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: 80, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src="/images/hero/fishing-hero.jpg"
            alt={locale === 'fr' ? 'Pêche au Québec — maskinongé' : 'Quebec Fishing — muskellunge'}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '30% center',
              display: 'block',
            }}
          />
          {/* Left gradient fade */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, #0A0E1A 0%, rgba(10,14,26,0.72) 35%, rgba(10,14,26,0.15) 70%, transparent 100%)',
          }} />
          {/* Bottom fade */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, #0A0E1A 0%, transparent 35%)',
          }} />
        </motion.div>
      </motion.div>

      {/* Content — left side */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 2rem',
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          y: contentY,
        }}
      >
        <div style={{ maxWidth: '580px', paddingTop: '80px', paddingBottom: '80px' }}>

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.72rem',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            🇨🇦 {locale === 'fr' ? 'Portail de pêche · Québec · Saison 2026' : 'Fishing Portal · Quebec · Season 2026'}
          </motion.p>

          {/* H1 — Bebas Neue, giant (min 5rem per spec) */}
          <motion.h1
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.84, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(5rem, 9vw, 7rem)',
              color: 'var(--text-primary)',
              letterSpacing: '0.03em',
              lineHeight: 0.9,
              marginBottom: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            {locale === 'fr' ? (
              <>PÊCHEZ<br />LE <span style={{ color: 'var(--accent)' }}>NORD.</span><br />MAÎTRISEZ<br />CHAQUE SORTIE.</>
            ) : (
              <>FISH<br />THE <span style={{ color: 'var(--accent)' }}>NORTH.</span><br />OWN<br />EVERY OUTING.</>
            )}
          </motion.h1>

          {/* Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              fontWeight: 400,
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '500px',
            }}
          >
            {locale === 'fr'
              ? "La ressource de pêche #1 au Canada. 21 espèces, 45+ plans d'eau, l'arsenal complet, météo & solunar en temps réel — tout en FR et EN."
              : "Canada's #1 fishing resource. 21 species, 45+ water bodies, the complete arsenal, real-time weather & solunar — fully in FR and EN."}
          </motion.p>

          {/* Stats */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{
              display: 'flex',
              gap: '2.5rem',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.2rem, 5vw, 4.5rem)',
                  color: (stat as any).color || 'var(--amber)',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginTop: '0.4rem',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap' }}
          >
            <button
              onClick={() => onSectionSelect?.('especes')}
              style={{
                padding: '0.9rem 1.75rem',
                background: 'var(--accent)',
                color: '#0A0E1A',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                border: 'none',
                borderRadius: '6px',
                transition: 'background 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                /* Red accent on hover — #E63946 per spec */
                (e.currentTarget as HTMLElement).style.background = '#E63946'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'var(--accent)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {locale === 'fr' ? 'Explorer les espèces →' : 'Explore Species →'}
            </button>
            <button
              onClick={() => onSectionSelect?.('arsenal')}
              style={{
                padding: '0.9rem 1.75rem',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                background: 'transparent',
                borderRadius: '6px',
                transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.45)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.2)'
                ;(e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              }}
            >
              {locale === 'fr' ? "Voir l'arsenal" : 'View Arsenal'}
            </button>
            <button
              onClick={() => onSectionSelect?.('calendrier')}
              style={{
                padding: '0.9rem 1.75rem',
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--amber)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'}
            >
              {locale === 'fr' ? '⚡ Prévisions solunar →' : '⚡ Solunar Forecast →'}
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          color: 'var(--text-muted)',
          fontSize: '0.65rem',
          fontFamily: 'var(--font-condensed)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
        }}
      >
        <span style={{ opacity: 0.6 }}>↓</span>
      </motion.div>

      {/* Mobile: stack image behind text */}
      <style>{`
        @media (max-width: 768px) {
          .hero-right { width: 100% !important; opacity: 0.3 !important; }
        }
      `}</style>
    </div>
  )
}
