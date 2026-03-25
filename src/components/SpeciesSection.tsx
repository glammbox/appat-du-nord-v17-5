import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { speciesData, ActivityLevel } from '../lib/species'

const activityColors: Record<ActivityLevel, string> = {
  HOT:    '#00B4D8',
  ACTIVE: '#7BE495',
  SLOW:   '#F4A01C',
  CLOSED: '#22304A',
}

// v17.3 — Fix 16: 6 species replaced with fully-underwater Imagen 4.0 Ultra images
const SPECIES_LOCAL_IMAGES: Record<string, string> = {
  'atlantic-salmon':  '/images/fish/atlantic-salmon.png',
  'arctic-char':      '/images/fish/arctic-char.png',
  'brook-trout':      '/images/fish/brook-trout.png',
  'brown-trout':      '/images/fish/brown-trout.png',
  'burbot':           '/images/fish/burbot.png',
  'carp':             '/images/fish/carp.png',
  'catfish':          '/images/fish/barbotte-brune.png',     // Fix 16: fully submerged
  'cisco':            '/images/fish/cisco.png',
  'lake-sturgeon':    '/images/fish/lake-sturgeon.png',
  'lake-trout':       '/images/fish/lake-trout.png',
  'largemouth-bass':  '/images/fish/achigan-grande-bouche.png', // Fix 16: fully submerged
  'muskellunge':      '/images/fish/muskellunge.png',        // Fix 16: fully submerged
  'northern-pike':    '/images/fish/northern-pike.png',
  'perch':            '/images/fish/perch.png',
  'rainbow-trout':    '/images/fish/rainbow-trout.png',
  'sauger':           '/images/fish/dore-noir.png',          // Fix 16: fully submerged
  'smallmouth-bass':  '/images/fish/achigan-petite-bouche.png', // Fix 16: fully submerged
  'splake':           '/images/fish/splake.png',
  'tiger-muskie':     '/images/fish/tiger-muskie.png',
  'walleye':          '/images/fish/walleye.png',
  'whitefish':        '/images/fish/whitefish.png',
  // carpe-commune also used in GearSection/WaterDetailPanel
}

const LAKE_TO_WATER_ID: Record<string, string> = {
  // Rivers
  'Fleuve Saint-Laurent':              'st-lawrence-river',
  'Rivière des Outaouais':             'riviere-outaouais',
  'Rivière Richelieu':                 'riviere-richelieu',
  'Rivière Saint-Maurice':             'riviere-saint-maurice',
  'Rivière Saguenay':                  'riviere-saguenay',
  // St. Lawrence fluvial lakes
  'Lac Saint-Pierre':                  'lac-saint-pierre',
  'Lac Saint-Louis':                   'lac-saint-louis',
  'Lac Saint-François':                'lac-saint-francois',
  'Lac des Deux Montagnes':            'lac-deux-montagnes',
  'Lac Maskinongé':                    'lac-maskinonge',
  // Southern Quebec
  'Lac Champlain':                     'lac-champlain-missisquoi',
  'Lac Champlain (Missisquoi Bay)':    'lac-champlain-missisquoi',
  'Lac Memphrémagog':                  'lac-memphremagog',
  'Lac Memphremagog':                  'lac-memphremagog',
  'Lac Brome':                         'lac-brome',
  'Lac Brompton':                      'lac-brompton',
  'Lac Massawippi':                    'lac-massawippi',
  'Lac Aylmer':                        'lac-aylmer',
  'Lac Boivin':                        'lac-boivin',
  'Lac Nantel':                        'lac-nantel',
  // Laurentians / Outaouais
  'Lac Tremblant':                     'lac-tremblant',
  'Lac Nominingue (Grand)':            'lac-nominingue',
  'Réservoir Baskatong':               'reservoir-baskatong',
  'Baskatong Reservoir':               'reservoir-baskatong',
  'Réservoir Cabonga':                 'reservoir-cabonga',
  'Cabonga Reservoir':                 'reservoir-cabonga',
  'Réservoir Dozois':                  'reservoir-dozois',
  'Dozois Reservoir':                  'reservoir-dozois',
  'Lac Kipawa':                        'lac-kipawa',
  'Grand Lac Victoria':                'grand-lac-victoria',
  // Mauricie / Nord
  'Réservoir Gouin':                   'reservoir-gouin',
  'Gouin Reservoir':                   'reservoir-gouin',
  'Lac Saint-Jean':                    'lac-saint-jean',
  'Réservoir Manicouagan':             'reservoir-manicouagan',
  'Lac Pipmuacan':                     'lac-pipmuacan',
  'Lac Edouard':                       'lac-edouard',
  // Shield lakes / North
  'Lac Mistassini':                    'lac-mistassini',
  'Lac Albanel':                       'lac-albanel',
  'Lac Waconichi':                     'lac-waconichi',
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
  // v17.2: default state is null — nothing open on load, show intro text until user clicks
  const [activeSpecies, setActiveSpecies] = useState<string | null>(initialSpecies || null)
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
        {/* FIX 4: Tab bar — dark blue bg, active = cyan */}
        <div
          ref={tabStripRef}
          className="species-tab-strip"
          style={{
            background: '#050810',
            border: '1px solid rgba(0,207,255,0.18)',
            borderRadius: 'var(--radius-sm)',
            padding: '0.3rem 2rem',
            display: 'flex',
            gap: '0.25rem',
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
                padding: '0.42rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                background: isActive ? '#00CFFF' : 'transparent',
                border: '1px solid ' + (isActive ? '#00CFFF' : 'rgba(0,207,255,0.12)'),
                borderRadius: '6px',
                color: isActive ? '#050810' : 'var(--text-muted)',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.72rem',
                fontWeight: isActive ? 800 : 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'all 0.18s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = '#00CFFF'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,207,255,0.4)'
                  ;(e.currentTarget as HTMLElement).style.background = 'rgba(0,207,255,0.08)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,207,255,0.12)'
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
      {/* Empty state — Fix 5: background image + prompt text */}
      {!activeSpecies && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            minHeight: '520px',
            borderRadius: 'var(--radius-card)',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Background: muskie hero photo as empty state */}
          <img
            src="/images/species-placeholder.jpg"
            alt=""
            aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: 0.25,
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,14,26,0.3) 0%, rgba(10,14,26,0.85) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '3rem 2rem' }}>
                        <p style={{
              fontFamily: 'var(--font-condensed)',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 600,
              color: 'var(--accent)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}>
              {locale === 'fr'
                ? 'Cliquez sur une espèce pour voir les détails'
                : 'Click a species to see details'}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              {locale === 'fr'
                ? '21 espèces du Québec — sélectionnez une espèce dans la liste ci-dessus'
                : '21 Quebec species — select a species from the list above'}
            </p>
          </div>
        </motion.div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSpecies}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="species-detail-grid"
          style={{ display: activeSpecies ? 'flex' : 'none', flexDirection: 'column', gap: '1.5rem', alignItems: 'stretch', position: 'relative' }}
        >
          {/* FIX 3: Close button */}
          {activeSpecies && (
            <button
              onClick={() => setActiveSpecies(null)}
              aria-label={locale === 'fr' ? 'Fermer' : 'Close'}
              style={{
                position: 'absolute',
                top: '-0.5rem',
                right: '-0.5rem',
                zIndex: 10,
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(5,8,16,0.9)',
                border: '1px solid rgba(0,207,255,0.35)',
                color: '#C8D3E2',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem',
                fontWeight: 700,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#00CFFF'
                ;(e.currentTarget as HTMLElement).style.color = '#050810'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(5,8,16,0.9)'
                ;(e.currentTarget as HTMLElement).style.color = '#C8D3E2'
              }}
            >
              ✕
            </button>
          )}

          {/* FIX 3: COMPACT TOP ROW — 200x200 image LEFT + name/info RIGHT */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '1.5rem',
            alignItems: 'flex-start',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
            padding: '1.25rem',
          }}
          className="species-top-row"
          >
            {/* Fish image — 200x200 compact */}
            <div style={{
              width: '200px',
              height: '200px',
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              overflow: 'hidden',
              flexShrink: 0,
              position: 'relative',
            }}>
              <img
                src={speciesImage}
                alt={displayName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '0.5rem',
                }}
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>

            {/* Right info: name, description, badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 0 }}>
              {/* Name */}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                color: 'var(--text-primary)',
                letterSpacing: '0.04em',
                lineHeight: 1,
                margin: 0,
              }}>
                {displayName}
              </h3>
              {/* Scientific name */}
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
              {/* Tagline */}
              <p style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--accent)',
                fontSize: '0.85rem',
                fontStyle: 'italic',
                lineHeight: 1.5,
                margin: 0,
              }}>
                {tagline}
              </p>
              {/* Season / Habitat badges (inline) */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                <span style={{
                  padding: '0.25rem 0.6rem',
                  background: 'rgba(0,207,255,0.1)',
                  border: '1px solid rgba(0,207,255,0.25)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#00CFFF',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? 'Saison:' : 'Season:'} {species.quebecSeason}
                </span>
                <span style={{
                  padding: '0.25rem 0.6rem',
                  background: 'rgba(123,228,149,0.1)',
                  border: '1px solid rgba(123,228,149,0.25)',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#7BE495',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}>
                  {locale === 'fr' ? 'Mois:' : 'Months:'} {bestMonths}
                </span>
                {species.waterTemp && (
                  <span style={{
                    padding: '0.25rem 0.6rem',
                    background: 'rgba(244,160,28,0.1)',
                    border: '1px solid rgba(244,160,28,0.25)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#F4A01C',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {species.waterTemp}
                  </span>
                )}
                {/* FIX 7: Réglementation badge for species with size/catch limits */}
                {legalSize && (
                  <a
                    href="https://www.sepaq.com/peche/permis/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: '0.25rem 0.6rem',
                      background: 'rgba(230,57,70,0.15)',
                      border: '1px solid rgba(230,57,70,0.4)',
                      borderRadius: '4px',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#E63946',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      textDecoration: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    ⚠ {locale === 'fr' ? 'Réglementation' : 'Regulations'}
                  </a>
                )}
                {species.catchRelease && (
                  <span style={{
                    padding: '0.25rem 0.6rem',
                    background: 'rgba(123,228,149,0.08)',
                    border: '1px solid rgba(123,228,149,0.3)',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: '#7BE495',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}>
                    {locale === 'fr' ? 'C&R requis' : 'C&R required'}
                  </span>
                )}
              </div>
              {/* Quick stats row */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.25rem' }}>
                {[
                  { label: locale === 'fr' ? 'Taille moy.' : 'Avg size', value: species.avgSize },
                  { label: locale === 'fr' ? 'Taille max' : 'Max size', value: species.maxSize },
                ].filter(s => s.value).map(stat => (
                  <div key={stat.label} style={{
                    padding: '0.25rem 0.6rem',
                    background: 'var(--bg-raised)',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    display: 'flex',
                    gap: '0.35rem',
                    alignItems: 'center',
                  }}>
                    <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      {stat.label}:
                    </span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FIX 3: Compact chips row — Lakes + Gear + Permit */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1rem 1.25rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
          }}>
            {/* Lakes chip list */}
            {species.bestLakes && species.bestLakes.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {locale === 'fr' ? "Meilleurs plans d'eau" : 'Best Waters'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {species.bestLakes.map((lake, i) => {
                    const waterId = LAKE_TO_WATER_ID[lake]
                    return (
                      <button
                        key={i}
                        onClick={() => waterId && onScrollToWater && onScrollToWater(waterId)}
                        style={{
                          padding: '0.2rem 0.55rem',
                          background: 'rgba(0,180,216,0.07)',
                          border: '1px solid rgba(0,207,255,0.2)',
                          color: waterId ? 'var(--accent)' : 'var(--text-secondary)',
                          fontFamily: 'var(--font-condensed)',
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          letterSpacing: '0.06em',
                          cursor: waterId ? 'pointer' : 'default',
                          borderRadius: '4px',
                        }}
                      >
                        {lake}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Gear/lures compact chip list */}
            {species.gear && species.gear.length > 0 && (
              <div>
                <div style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                  {locale === 'fr' ? 'Équipement' : 'Gear'}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                  {species.gear.map((g, i) => (
                    <span key={i} style={{
                      padding: '0.2rem 0.55rem',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      fontFamily: 'var(--font-condensed)',
                      fontSize: '0.68rem',
                      fontWeight: 500,
                      borderRadius: '4px',
                    }}>
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Permit badge */}
            {legalSize && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href="https://www.sepaq.com/peche/permis/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    padding: '0.35rem 0.75rem',
                    background: '#E63946',
                    color: '#fff',
                    borderRadius: '4px',
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  ⚠ {locale === 'fr' ? 'Permis requis' : 'Permit required'}
                </a>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {legalSize}
                </span>
              </div>
            )}

            {/* Arsenal CTA */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {species.bestLures.slice(0, 4).join(' · ')}{species.bestLures.length > 4 && ` +${species.bestLures.length - 4}`}
              </div>
              <button
                onClick={() => onScrollToArsenal(species.id)}
                style={{
                  padding: '0.5rem 1.25rem',
                  background: 'var(--accent)',
                  color: '#0A0E1A',
                  border: 'none',
                  borderRadius: '6px',
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                }}
              >
                {locale === 'fr' ? "Voir l'arsenal →" : 'View Arsenal →'}
              </button>
            </div>
          </div>

          {/* Expanded detail section — full species dossier below chips */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            padding: '1.25rem',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-card)',
          }}>
          {/* ── LEFT: Quick stats (now inline below) ─── */}
          <div>
            {/* Quick stats — kept as compact grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.4rem', marginBottom: '1rem' }}>
              {[
                { label: locale === 'fr' ? 'Taille moyenne' : 'Avg size', value: species.avgSize },
                { label: locale === 'fr' ? 'Taille max' : 'Max size', value: species.maxSize },
                { label: locale === 'fr' ? 'Temp. optimale' : 'Optimal temp.', value: species.waterTemp },
                { label: locale === 'fr' ? 'Meilleurs mois' : 'Best months', value: bestMonths },
                { label: locale === 'fr' ? 'Saison Québec' : 'Quebec season', value: species.quebecSeason },
              ].map(stat => (
                <div key={stat.label} style={{
                  padding: '0.4rem 0.65rem',
                  background: 'var(--bg-raised)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.15rem',
                }}>
                  <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.6rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Catch & release badge */}
            {species.catchRelease && (
              <div style={{
                marginBottom: '0.75rem',
                padding: '0.6rem 0.9rem',
                background: 'rgba(123,228,149,0.08)',
                border: '1px solid rgba(123,228,149,0.3)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', fontWeight: 700, color: 'var(--success)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                  {locale === 'fr' ? "Remise à l'eau obligatoire" : 'Catch & release required'}
                </span>
              </div>
            )}
          </div>

          {/* Full species dossier — expanded detail */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

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

          </div>
          </div>{/* end Expanded detail section */}
        </motion.div>
      </AnimatePresence>
      <style>{`
        @media (max-width: 640px) {
          .species-top-row {
            grid-template-columns: 1fr !important;
          }
          .species-top-row > div:first-child {
            width: 140px !important;
            height: 140px !important;
          }
        }
      `}</style>
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
