import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { speciesData, ActivityLevel } from '../lib/species'

const activityColors: Record<ActivityLevel, string> = {
  HOT:    '#00B4D8',
  ACTIVE: '#7BE495',
  SLOW:   '#F4A01C',
  CLOSED: '#22304A',
}

// Manifest-verified local images — v16 media manifest (26 images generated)
// Primary: new generated images from media manifest
// Fallback: existing v15 images
const SPECIES_LOCAL_IMAGES: Record<string, string> = {
  'atlantic-salmon':  '/images/fish/atlantic-salmon.png',
  'arctic-char':      '/images/fish/arctic-char.png',
  'brook-trout':      '/images/fish/brook-trout.png',
  'brown-trout':      '/images/fish/brown-trout.png',
  'burbot':           '/images/fish/burbot.png',
  'carp':             '/images/fish/carp.png',
  'catfish':          '/images/fish/catfish.png',
  'cisco':            '/images/fish/cisco.png',
  'lake-sturgeon':    '/images/fish/lake-sturgeon.png',
  'lake-trout':       '/images/fish/lake-trout.png',
  'largemouth-bass':  '/images/fish/largemouth-bass.png',
  'muskellunge':      '/images/fish/muskellunge.png',
  'northern-pike':    '/images/fish/northern-pike.png',
  'perch':            '/images/fish/perch.png',
  'rainbow-trout':    '/images/fish/rainbow-trout.png',
  'sauger':           '/images/fish/sauger.png',
  'smallmouth-bass':  '/images/fish/smallmouth-bass.png',
  'splake':           '/images/fish/splake.png',
  'tiger-muskie':     '/images/fish/tiger-muskie.png',
  'walleye':          '/images/fish/walleye.png',
  'whitefish':        '/images/fish/whitefish.png',
}

const LAKE_TO_WATER_ID: Record<string, string> = {
  'Lac Saint-Jean': 'lac-saint-jean',
  'Lac Saint-Pierre': 'lac-saint-pierre',
  'Réservoir Gouin': 'reservoir-gouin',
  'Lac Champlain': 'lac-champlain',
  'Lac Memphrémagog': 'lac-memphremagog',
  'Lac des Deux Montagnes': 'lac-deux-montagnes',
  'Lac Maskinongé': 'lac-maskinonge',
  'Lac Saint-François': 'lac-saint-francois',
  'Rivière des Outaouais': 'riviere-outaouais',
  'Fleuve Saint-Laurent': 'st-lawrence-river',
}

const monthNamesFr = ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc']
const monthNamesEn = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

interface SpeciesSectionProps {
  onScrollToArsenal: (speciesId: string) => void
  locale: 'fr' | 'en'
  initialSpecies?: string
  onScrollToWater?: (waterId: string) => void
}

export function SpeciesSection({ onScrollToArsenal, locale, initialSpecies, onScrollToWater }: SpeciesSectionProps) {
  const [activeSpecies, setActiveSpecies] = useState(initialSpecies || speciesData[0].id)
  const sectionRef = useRef(null)
  const tabStripRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const scrollTabs = useCallback((dir: 'left' | 'right') => {
    if (tabStripRef.current) {
      tabStripRef.current.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' })
    }
  }, [])

  // Sync initialSpecies from parent navigation
  useEffect(() => {
    if (initialSpecies) setActiveSpecies(initialSpecies)
  }, [initialSpecies])

  const species = speciesData.find(s => s.id === activeSpecies) || speciesData[0]
  const monthNames = locale === 'fr' ? monthNamesFr : monthNamesEn

  const activityLabels: Record<ActivityLevel, string> = locale === 'fr'
    ? { HOT: 'EXCELLENTE', ACTIVE: 'ACTIVE', SLOW: 'LENTE', CLOSED: 'FERMÉE' }
    : { HOT: 'EXCELLENT',  ACTIVE: 'ACTIVE', SLOW: 'SLOW',  CLOSED: 'CLOSED' }

  const displayName   = locale === 'fr' ? species.nameFr : species.nameEn
  const tagline       = locale === 'fr' ? species.taglineFr : species.tagline
  const appearance    = locale === 'fr' ? species.appearanceFr : species.appearance
  const habitat       = locale === 'fr' ? species.habitatFr : species.habitat
  const seasonal      = locale === 'fr' ? species.seasonalBehaviorFr : species.seasonalBehavior
  const record        = locale === 'fr' ? species.quebecRecordFr : species.quebecRecord
  const legalSize     = locale === 'fr' ? (species.legalSizeFr || species.legalSize) : species.legalSize
  const possessionNote= locale === 'fr' ? (species.possessionNoteFr || species.possessionNote) : species.possessionNote
  const bestMonths    = locale === 'fr' ? species.bestMonthsFr : species.bestMonths
  const proTips       = locale === 'fr' && species.proTipsFr ? species.proTipsFr : species.proTips
  const techniques    = locale === 'fr' && species.techniquesFr ? species.techniquesFr : species.techniques

  const speciesImage = SPECIES_LOCAL_IMAGES[species.id]
    || (species.imageFile ? `/images/fish/${species.imageFile}` : species.image)
    || '/images/fish/maskinonge.png'

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '2rem 1.5rem 3rem',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          {locale === 'fr' ? 'Encyclopédie des espèces' : 'Species Encyclopedia'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          marginBottom: '0.5rem',
        }}>
          {locale === 'fr' ? '21 Espèces du Québec' : '21 Quebec Species'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          {locale === 'fr'
            ? '21 espèces · Données complètes · FR/EN'
            : '21 species · Complete data · FR/EN'}
        </p>
      </div>

      {/* ── Scrollable Tab Strip with Arrows ──────────────────────────── */}
      <div style={{ position: 'relative', marginBottom: '2rem' }}>
        {/* Left Arrow */}
        <button
          onClick={() => scrollTabs('left')}
          aria-label="Scroll left"
          style={{
            position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', borderRadius: '50%',
            width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0,
            boxShadow: '4px 0 12px rgba(10,14,26,0.6)',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
          }}
        >‹</button>
        {/* Right Arrow */}
        <button
          onClick={() => scrollTabs('right')}
          aria-label="Scroll right"
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            zIndex: 2, background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', borderRadius: '50%',
            width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '0.8rem', flexShrink: 0,
            boxShadow: '-4px 0 12px rgba(10,14,26,0.6)',
            transition: 'color 0.15s, border-color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--accent)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
            ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
          }}
        >›</button>
        <div
          ref={tabStripRef}
          className="species-tab-strip"
          style={{
            background: 'var(--bg-raised)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.25rem 2rem',
            display: 'flex',
            gap: '0.2rem',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
        {speciesData.map((sp, idx) => {
          const tabName = locale === 'fr' ? sp.nameFr.split(' / ')[0] : sp.nameEn
          const isActive = activeSpecies === sp.id
          return (
            <motion.button
              key={sp.id}
              onClick={() => setActiveSpecies(sp.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.04 + idx * 0.015, ease: [0.16, 1, 0.3, 1] }}
              style={{
                flexShrink: 0,
                padding: '0.55rem 0.9rem',
                cursor: 'pointer',
                background: isActive ? 'rgba(0,180,216,0.15)' : 'transparent',
                border: '1px solid ' + (isActive ? 'var(--border-active)' : 'transparent'),
                borderRadius: '8px',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                  ;(e.currentTarget as HTMLElement).style.background = 'transparent'
                }
              }}
            >
              {tabName}
            </motion.button>
          )
        })}
        </div>
      </div>

      {/* ── 2-Column Detail Panel ──────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSpecies}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="species-detail-grid"
          style={{ display: 'grid', gap: '2.5rem', alignItems: 'flex-start' }}
        >
          {/* ── LEFT: Fish portrait + quick stats ─── */}
          <div>
            {/* Fish portrait — IMAGE CROPPING LAW: always contain */}
            <div style={{
              width: '100%',
              aspectRatio: '4/5',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <img
                src={speciesImage}
                alt={displayName}
                className="fish-portrait"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center center',
                  padding: '1rem',
                }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
              {/* Species label overlay */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '0.75rem 1rem',
                background: 'linear-gradient(to top, rgba(10,14,26,0.9) 0%, transparent 100%)',
              }}>
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  fontStyle: 'italic',
                }}>
                  {species.scientificName}
                </div>
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {[
                { label: locale === 'fr' ? 'Taille moyenne' : 'Avg size',    value: species.avgSize },
                { label: locale === 'fr' ? 'Taille max'     : 'Max size',    value: species.maxSize },
                { label: locale === 'fr' ? 'Temp. optimale' : 'Optimal temp.',value: species.waterTemp },
                { label: locale === 'fr' ? 'Meilleurs mois' : 'Best months', value: bestMonths },
                { label: locale === 'fr' ? 'Saison Québec'  : 'Quebec season', value: species.quebecSeason },
              ].map(stat => (
                <div
                  key={stat.label}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.5rem',
                    alignItems: 'center',
                  }}
                >
                  <span style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}>
                    {stat.label}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: 'var(--text-primary)',
                    fontWeight: 500,
                  }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Regulations block with real links (Fix #10) */}
            {legalSize && (
              <div style={{
                marginTop: '1rem',
                padding: '0.85rem 1rem',
                background: 'rgba(255,107,87,0.08)',
                border: '1px solid rgba(255,107,87,0.3)',
                borderRadius: '8px',
              }}>
                <p style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--danger)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}>
                  {locale === 'fr' ? '⚠ Permis requis' : '⚠ Permit required'}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.4rem', lineHeight: 1.5 }}>
                  {legalSize}
                </p>
                {possessionNote && (
                  <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.78rem', fontStyle: 'italic', marginBottom: '0.6rem', lineHeight: 1.4 }}>
                    {possessionNote}
                  </p>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <a
                    href="https://peche.faune.gouv.qc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textDecoration: 'underline',
                    }}
                  >
                    📋 {locale === 'fr' ? 'Règlements MRNF → peche.faune.gouv.qc.ca' : 'MRNF Regulations → peche.faune.gouv.qc.ca'}
                  </a>
                  <a
                    href="https://mondossierchassepeche.gouv.qc.ca/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: 'var(--accent)',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textDecoration: 'underline',
                    }}
                  >
                    🎫 {locale === 'fr' ? 'Acheter un permis de pêche' : 'Buy a fishing permit'}
                  </a>
                </div>
              </div>
            )}

            {/* C&R badge */}
            {species.catchRelease && (
              <div style={{
                marginTop: '0.75rem',
                padding: '0.6rem 1rem',
                background: 'rgba(123,228,149,0.08)',
                border: '1px solid rgba(123,228,149,0.3)',
                borderRadius: '6px',
                textAlign: 'center',
              }}>
                <span style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--success)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                }}>
                  ♻ {locale === 'fr' ? "Remise à l'eau obligatoire" : 'Catch & Release Required'}
                </span>
              </div>
            )}
          </div>

          {/* ── RIGHT: Full species dossier ──────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>

            {/* Name + tagline */}
            <div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                marginBottom: '0.5rem',
              }}>
                {displayName}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--accent)',
                fontSize: '0.95rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
                marginBottom: '0',
              }}>
                {tagline}
              </p>
            </div>

            {/* Appearance */}
            <Section label={locale === 'fr' ? 'Identification' : 'Identification'}>
              <p style={bodyStyle}>{appearance}</p>
            </Section>

            {/* Habitat */}
            <Section label="Habitat">
              <p style={bodyStyle}>{habitat}</p>
            </Section>

            {/* Seasonal behaviour */}
            {seasonal && (
              <Section label={locale === 'fr' ? 'Comportement saisonnier' : 'Seasonal Behaviour'}>
                <p style={bodyStyle}>{seasonal}</p>
              </Section>
            )}

            {/* Monthly activity bar */}
            <Section label={locale === 'fr' ? 'Activité mensuelle' : 'Monthly Activity'}>
              <div style={{ display: 'flex', gap: '3px' }}>
                {species.monthlyActivity.map((level, i) => (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div
                      style={{
                        height: '28px',
                        background: activityColors[level],
                        borderRadius: '3px',
                        marginBottom: '4px',
                      }}
                      title={activityLabels[level]}
                    />
                    <span style={{
                      fontFamily: 'var(--font-condensed)',
                      color: 'var(--text-muted)',
                      fontSize: '9px',
                      display: 'block',
                      letterSpacing: '0.05em',
                    }}>
                      {monthNames[i]}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                {(Object.entries(activityColors) as [ActivityLevel, string][]).map(([level, color]) => (
                  <div key={level} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ width: '10px', height: '10px', background: color, borderRadius: '2px' }} />
                    <span style={{ fontFamily: 'var(--font-condensed)', color: 'var(--text-muted)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                      {activityLabels[level]}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* Quebec record */}
            {record && (
              <div style={{
                padding: '1rem 1.25rem',
                background: 'var(--surface)',
                border: `1px solid ${species.quebecRecordOfficial ? 'var(--border-active)' : 'var(--border)'}`,
                borderRadius: '8px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                  }}>
                    {locale === 'fr' ? 'Record Québec' : 'Quebec Record'}
                  </span>
                  <span style={{
                    padding: '2px 7px',
                    background: species.quebecRecordOfficial ? 'var(--accent)' : 'var(--surface-2)',
                    color: species.quebecRecordOfficial ? '#0A0E1A' : 'var(--text-muted)',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    borderRadius: '3px',
                  }}>
                    {species.quebecRecordOfficial
                      ? (locale === 'fr' ? 'OFFICIEL' : 'OFFICIAL')
                      : (locale === 'fr' ? 'RAPPORTÉ' : 'REPORTED')}
                  </span>
                </div>
                <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                  {record}
                </p>
              </div>
            )}

            {/* Techniques */}
            {techniques && techniques.length > 0 && (
              <Section label={locale === 'fr' ? 'Techniques' : 'Techniques'}>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {techniques.map((t, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                      <span style={{ color: 'var(--accent)', fontSize: '0.7rem', marginTop: '3px' }}>→</span>
                      <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.55 }}>{t}</span>
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {/* Recommended Gear — ALL items (Fix #9) */}
            {species.gear && species.gear.length > 0 && (
              <Section label={locale === 'fr' ? 'Équipement recommandé' : 'Recommended Gear'}>
                <div style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '8px',
                }}>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {species.gear.map((g, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px', fontSize: '0.7rem' }}>—</span>
                        <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{g}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            )}

            {/* Pro Tips */}
            <Section label={locale === 'fr' ? 'Conseils de pro' : 'Pro Tips'} accent>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {proTips.map((tip, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <span style={{
                      flexShrink: 0,
                      width: '22px',
                      height: '22px',
                      background: 'var(--accent)',
                      color: '#0A0E1A',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-condensed)',
                    }}>
                      {i + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                      {tip}
                    </span>
                  </li>
                ))}
              </ol>
            </Section>

            {/* Arsenal CTA — ONE button (Fix #7) */}
            <div style={{
              padding: '1.25rem',
              background: 'rgba(0,180,216,0.06)',
              border: '1px solid var(--border-active)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                }}>
                  {locale === 'fr' ? `Leurres & équipement (${species.bestLures.length} options)` : `Lures & gear (${species.bestLures.length} options)`}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  color: 'var(--text-muted)',
                }}>
                  {species.bestLures.slice(0, 4).join(' · ')}
                  {species.bestLures.length > 4 && ` +${species.bestLures.length - 4}...`}
                </div>
              </div>
              <button
                onClick={() => onScrollToArsenal(species.id)}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'var(--accent)',
                  color: '#0A0E1A',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'background 0.18s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent-hover)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'var(--accent)'}
              >
                {locale === 'fr' ? "Voir l'arsenal →" : 'View Arsenal →'}
              </button>
            </div>

            {/* Best Lakes with navigation links (Fix #8) */}
            {species.bestLakes && species.bestLakes.length > 0 && (
              <Section label={locale === 'fr' ? "Meilleurs plans d'eau" : 'Best Waters'}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {species.bestLakes.map((lake, i) => {
                    const waterId = LAKE_TO_WATER_ID[lake]
                    return (
                      <button
                        key={i}
                        onClick={() => waterId && onScrollToWater && onScrollToWater(waterId)}
                        style={{
                          padding: '0.35rem 0.7rem',
                          background: 'rgba(0,180,216,0.08)',
                          border: '1px solid var(--border-active)',
                          color: waterId ? 'var(--accent)' : 'var(--text-secondary)',
                          fontFamily: 'var(--font-condensed)',
                          fontSize: '0.72rem',
                          fontWeight: 600,
                          letterSpacing: '0.08em',
                          cursor: waterId ? 'pointer' : 'default',
                          borderRadius: '999px',
                          transition: 'background 0.18s',
                        }}
                        onMouseEnter={e => {
                          if (waterId) (e.currentTarget as HTMLElement).style.background = 'rgba(0,180,216,0.18)'
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.background = 'rgba(0,180,216,0.08)'
                        }}
                      >
                        {lake}
                      </button>
                    )
                  })}
                </div>
              </Section>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

// Helper sub-component for labelled sections
const bodyStyle: React.CSSProperties = {
  fontFamily: 'var(--font-body)',
  color: 'var(--text-secondary)',
  fontSize: '0.9rem',
  lineHeight: 1.65,
}

function Section({
  label,
  children,
  accent = false,
}: {
  label: string
  children: React.ReactNode
  accent?: boolean
}) {
  return (
    <div>
      <p style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '0.68rem',
        fontWeight: 700,
        color: accent ? 'var(--amber)' : 'var(--text-muted)',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        marginBottom: '0.6rem',
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}
