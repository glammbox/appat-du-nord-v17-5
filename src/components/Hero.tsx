import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Spotlight } from './ui/spotlight-new'
import { TextGenerateEffect } from './ui/text-generate-effect'

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
  const [titleReady, setTitleReady] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, 30])
  const watermarkY = useTransform(scrollY, [0, 600], [0, 50])
  const imageY = useTransform(scrollY, [0, 600], [0, 80])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  // Delay title animate for hero entrance feel
  useEffect(() => {
    const t = setTimeout(() => setTitleReady(true), 400)
    return () => clearTimeout(t)
  }, [])

  const countSpecies = useCountUp(21, 1400, statsStarted)
  const countEaux    = useCountUp(45, 1600, statsStarted)
  const countJours   = useCountUp(30, 1200, statsStarted)

  const stats = [
    { value: `${countSpecies}`, label: locale === 'fr' ? 'Espèces' : 'Species', color: '#00CFFF' },
    { value: `${countEaux}+`,   label: locale === 'fr' ? "Plans d'eau" : 'Water Bodies', color: '#1D6BFF' },
    { value: `${countJours}j`,  label: locale === 'fr' ? 'Prévisions' : 'Forecast', color: '#FF2B2B' },
  ]

  return (
    <>

      <div
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100svh',
          background: '#050810',
          overflow: 'hidden',
        }}
      >
        {/* Spotlight — electric cyan sweep — only background effect */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <Spotlight
            gradientFirst="radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(194, 100%, 50%, .12) 0, hsla(194, 100%, 50%, .03) 50%, transparent 80%)"
            gradientSecond="radial-gradient(50% 50% at 50% 50%, hsla(194, 100%, 50%, .08) 0, hsla(194, 100%, 50%, .02) 80%, transparent 100%)"
            gradientThird="radial-gradient(50% 50% at 50% 50%, hsla(220, 100%, 60%, .05) 0, transparent 100%)"
            duration={8}
            xOffset={120}
          />
        </div>

        {/* Film grain + vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* Hero image — right side parallax */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '52%',
            height: '100%',
            zIndex: 3,
            y: imageY,
          }}
          className="hero-image-panel"
        >
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src="/images/hero/fishing-hero.jpg"
              alt={locale === 'fr' ? 'Pêcheur tenant un maskinongé géant' : 'Angler holding a giant muskie'}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                display: 'block',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, #050810 0%, rgba(5,8,16,0.7) 30%, rgba(5,8,16,0.1) 70%, transparent 100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, #050810 0%, transparent 40%)',
            }} />
          </motion.div>
        </motion.div>

        {/* Content — left side */}
        <motion.div
          style={{
            position: 'relative',
            zIndex: 5,
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 2rem',
            minHeight: '100svh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            y: contentY,
          }}
        >
          <div style={{ maxWidth: '580px', paddingTop: '96px', paddingBottom: '200px' }}>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: '0.72rem',
                color: '#00CFFF',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                marginBottom: '1rem',
              }}
            >
              🇨🇦 {locale === 'fr' ? 'Portail de pêche · Québec · Saison 2026' : 'Fishing Portal · Quebec · Season 2026'}
            </motion.p>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.84, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
              style={{
                fontFamily: "'Barlow Condensed', 'Arial Narrow', sans-serif",
                fontWeight: 900,
                fontSize: 'clamp(3rem, 10vw, 9rem)',
                color: '#F5F7FA',
                letterSpacing: '0.03em',
                lineHeight: 0.9,
                marginBottom: '1.5rem',
                textTransform: 'uppercase',
              }}
            >
              {locale === 'fr' ? (
                <>PÊCHEZ<br />LE <span style={{ color: '#00CFFF' }}>NORD.</span><br />MAÎTRISEZ<br />CHAQUE SORTIE.</>
              ) : (
                <>FISH<br />THE <span style={{ color: '#00CFFF' }}>NORTH.</span><br />OWN<br />EVERY OUTING.</>
              )}
            </motion.h1>

            {/* Subtitle — TextGenerateEffect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              style={{ marginBottom: '2rem' }}
            >
              {titleReady && (
                <TextGenerateEffect
                  words={locale === 'fr'
                    ? "La ressource de pêche #1 au Canada. 21 espèces, 45+ plans d'eau, l'arsenal complet, météo et solunar en temps réel."
                    : "Canada's #1 fishing resource. 21 species, 45+ water bodies, the complete arsenal, real-time weather and solunar."}
                  className="text-[1.05rem] text-[#C8D3E2] font-normal leading-relaxed"
                />
              )}
            </motion.div>

            {/* Stats */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.6 }}
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
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(2rem, 5vw, 4rem)',
                    color: stat.color,
                    lineHeight: 0.9,
                    letterSpacing: '0.02em',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '0.65rem',
                    color: '#94A3B8',
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
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.75 }}
              style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.button
                onClick={() => onSectionSelect?.('especes')}
                whileHover={{ y: -2, boxShadow: '0 0 24px rgba(0,207,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '0.9rem 1.75rem',
                  background: '#00CFFF',
                  color: '#050810',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                {locale === 'fr' ? 'Explorer les espèces →' : 'Explore Species →'}
              </motion.button>

              <motion.button
                onClick={() => onSectionSelect?.('arsenal')}
                whileHover={{ y: -2, borderColor: 'rgba(255,255,255,0.45)', color: '#F5F7FA' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '0.9rem 1.75rem',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#C8D3E2',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  background: 'transparent',
                  borderRadius: '4px',
                }}
              >
                {locale === 'fr' ? "Voir l'arsenal" : 'View Arsenal'}
              </motion.button>

              <motion.button
                onClick={() => onSectionSelect?.('calendrier')}
                whileHover={{ color: '#00CFFF' }}
                transition={{ duration: 0.2 }}
                style={{
                  padding: '0.9rem 1rem',
                  border: 'none',
                  background: 'none',
                  color: '#94A3B8',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                }}
              >
                {locale === 'fr' ? '⚡ Prévisions solunar →' : '⚡ Solunar Forecast →'}
              </motion.button>
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
            zIndex: 6,
            color: '#94A3B8',
            fontSize: '0.65rem',
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}
        >
          ↓
        </motion.div>

        <style>{`
          /* FIX 2: Hero mobile — show fisherman/lure clearly */
          @media (max-width: 640px) {
            .hero-image-panel {
              width: 100% !important;
              opacity: 0.55 !important;
              left: 0 !important;
              right: 0 !important;
            }
            .hero-image-panel img {
              object-fit: cover !important;
              object-position: 60% center !important;
            }
          }
          @media (min-width: 641px) and (max-width: 768px) {
            .hero-image-panel {
              width: 100% !important;
              opacity: 0.35 !important;
            }
          }
        `}</style>
      </div>
    </>
  )
}
