import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { tips, TipSpecies } from '../lib/tips'

// All species covered, with bilingual labels
const speciesFiltersFr: { id: TipSpecies | 'tous'; label: string }[] = [
  { id: 'tous', label: 'TOUTES' },
  { id: 'maskinonge', label: 'MASKINONGÉ' },
  { id: 'brochet', label: 'BROCHET' },
  { id: 'achigan', label: 'ACHIGAN' },
  { id: 'dore', label: 'DORÉ' },
  { id: 'truite', label: 'TRUITE' },
  { id: 'esturgeon', label: 'ESTURGEON' },
  { id: 'omble-chevalier', label: 'OMBLE CHEVALIER' },
  { id: 'touladi', label: 'TOULADI' },
  { id: 'perchaude', label: 'PERCHAUDE' },
  { id: 'carpe', label: 'CARPE' },
  { id: 'barbotte', label: 'BARBOTTE' },
  { id: 'cisco', label: 'CISCO' },
  { id: 'lotte', label: 'LOTTE' },
  { id: 'coregone', label: 'CORÉGONE' },
  { id: 'crapet', label: 'CRAPET' },
]

const speciesFiltersEn: { id: TipSpecies | 'tous'; label: string }[] = [
  { id: 'tous', label: 'ALL' },
  { id: 'maskinonge', label: 'MUSKELLUNGE' },
  { id: 'brochet', label: 'PIKE' },
  { id: 'achigan', label: 'BASS' },
  { id: 'dore', label: 'WALLEYE' },
  { id: 'truite', label: 'TROUT' },
  { id: 'esturgeon', label: 'STURGEON' },
  { id: 'omble-chevalier', label: 'ARCTIC CHAR' },
  { id: 'touladi', label: 'LAKE TROUT' },
  { id: 'perchaude', label: 'PERCH' },
  { id: 'carpe', label: 'CARP' },
  { id: 'barbotte', label: 'CATFISH' },
  { id: 'cisco', label: 'CISCO' },
  { id: 'lotte', label: 'BURBOT' },
  { id: 'coregone', label: 'WHITEFISH' },
  { id: 'crapet', label: 'BLUEGILL' },
]

const speciesColors: Record<string, string> = {
  maskinonge: '#D4261C',
  brochet: '#2E7D32',
  achigan: '#1565C0',
  dore: '#C8A84B',
  truite: '#6A1B9A',
  esturgeon: '#37474F',
  'omble-chevalier': '#0277BD',
  touladi: '#4A148C',
  perchaude: '#F57C00',
  carpe: '#5D4037',
  barbotte: '#546E7A',
  cisco: '#1B5E20',
  lotte: '#6D4C41',
  coregone: '#455A64',
  crapet: '#E65100',
  tous: 'var(--text-secondary)',
}

// Extended tips for all species not in the main tips array
const EXTENDED_TIPS: Record<string, { fr: string; en: string }[]> = {
  'omble-chevalier': [
    {
      fr: "L'omble chevalier se trouve principalement dans les lacs oligotrophes du nord du Québec. Ciblez les pourvoiries éloignées et préparez-vous à des eaux profondes et froides en été.",
      en: "Arctic char are found mainly in oligotrophic lakes of northern Quebec. Target remote outfitters and be ready for deep, cold water in summer.",
    },
    {
      fr: "Les cuillères légères et les tubes récupérés de façon erratique déclenchent souvent des attaques agressives. Adaptez la vitesse à la température de l'eau.",
      en: "Light spoons and tube jigs retrieved erratically often trigger aggressive strikes. Adjust speed to water temperature.",
    },
  ],
  'touladi': [
    {
      fr: "Le touladi impose la précision de profondeur en été. Utilisez l'électronique pour rester près de la thermocline — c'est souvent plus important que le choix de couleur.",
      en: "Lake trout demand depth precision in summer. Use electronics to stay near the thermocline — often more critical than color choice.",
    },
    {
      fr: "La traîne lente avec des leurres de cuillère aux couleurs naturelles est très efficace au printemps et à l'automne sur les lacs profonds du Québec.",
      en: "Slow trolling with naturally colored spoon lures is highly effective in spring and fall on deep Quebec lakes.",
    },
  ],
  'perchaude': [
    {
      fr: "La perchaude se pêche bien à la verticale avec des petits jigs ou des vers. En hiver, c'est la cible idéale pour la pêche sur glace sur les lacs peu profonds.",
      en: "Perch fish well on small vertical jigs or worms. In winter, they are the prime target for ice fishing on shallow lakes.",
    },
    {
      fr: "En été, cherchez les bordures d'herbiers et les structures rocheuses au crépuscule. Les bancs de perchaudes se déplacent ensemble — trouvez-en une, trouvez-en plusieurs.",
      en: "In summer, look for weed edges and rocky structure at dusk. Perch schools move together — find one, find many.",
    },
  ],
  'carpe': [
    {
      fr: "La carpe est très sensible aux bruits et aux vibrations. Approchez-vous lentement, pêchez sur le fond avec des bouillettes ou du maïs, et attendez patiemment.",
      en: "Carp are highly sensitive to noise and vibration. Approach slowly, fish bottom with boilies or corn, and wait patiently.",
    },
  ],
  'barbotte': [
    {
      fr: "La barbotte brune pêche bien la nuit sur les fonds vaseux avec des vifs, des vers ou des appâts naturels. Elle n'est pas sélective — la discrétion de l'appâtage compte plus que le leurre.",
      en: "Brown bullhead fish best at night on muddy bottoms with live bait, worms, or natural offerings. It's not selective — bait presentation matters more than lure choice.",
    },
  ],
  'cisco': [
    {
      fr: "Le cisco (hareng de lac) est souvent une proie clé pour les grands prédateurs. Pêché à la verticale avec des leurres légers scintillants en eau froide.",
      en: "Cisco (lake herring) are often key forage for large predators. Caught vertically with light flashy lures in cold water.",
    },
  ],
  'lotte': [
    {
      fr: "La lotte est un poisson d'eau froide qui fraie en hiver sous la glace. Pêchez de nuit sur les fonds sablonneux ou graveleux avec des montages verticaux.",
      en: "Burbot is a cold-water fish that spawns under ice in winter. Fish at night on sandy or gravelly bottoms with vertical rigs.",
    },
  ],
  'coregone': [
    {
      fr: "Le grand corégone (corégone de lac) se pêche à la traîne lente ou à la verticale en eau froide et profonde. Utilisez des leurres légers d'aspect naturel.",
      en: "Lake whitefish is caught by slow trolling or vertical jigging in cold, deep water. Use light, naturally appearing lures.",
    },
  ],
  'crapet': [
    {
      fr: "Les crapets-soleils et mariganes noires mordent facilement sur les petits poissons-nageurs, vers et mouches en bordure d'herbiers peu profonds.",
      en: "Bluegill and crappie readily strike small swimbaits, worms, and flies along shallow weed edges.",
    },
  ],
}

interface TipsSectionProps {
  locale: 'fr' | 'en'
  onViewSpecies?: (id: string) => void
}

export function TipsSection({ locale, onViewSpecies: _onViewSpecies }: TipsSectionProps) {
  const [filter, setFilter] = useState<TipSpecies | 'tous'>('maskinonge')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  const speciesFilters = locale === 'fr' ? speciesFiltersFr : speciesFiltersEn

  // Get main tips for selected filter
  const mainTips = filter === 'tous'
    ? tips
    : tips.filter(t => t.species === filter)

  // Get extended tips for filter
  const extendedTips = filter !== 'tous' && filter !== 'maskinonge' && filter !== 'brochet' && filter !== 'achigan' && filter !== 'dore' && filter !== 'truite' && filter !== 'esturgeon'
    ? (EXTENDED_TIPS[filter] || [])
    : []

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 72 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}
    >
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
        {locale === 'fr' ? 'CONSEILS DE PÊCHE' : 'FISHING TIPS'}
      </h2>

      {/* External links */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
        <a
          href="https://www.quebec.ca/loisirs-sport-plein-air/chasse-peche/peche/especes"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: '3px', fontSize: '0.72rem',
            textDecoration: 'none', fontFamily: 'var(--font-body)',
            fontWeight: 500, letterSpacing: '0.05em',
          }}
        >
          🇨🇦 {locale === 'fr' ? 'Espèces — Québec.ca' : 'Species — Quebec.ca'}
        </a>
        <a
          href="https://apps.apple.com/ca/app/ip%C3%AAche/id1160834366"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: '3px', fontSize: '0.72rem',
            textDecoration: 'none', fontFamily: 'var(--font-body)',
            fontWeight: 500, letterSpacing: '0.05em',
          }}
        >
          🍎 iPêche App Store
        </a>
        <a
          href="https://play.google.com/store/apps/details?id=ca.qc.mddefp.ipeche"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--surface-2)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            borderRadius: '3px', fontSize: '0.72rem',
            textDecoration: 'none', fontFamily: 'var(--font-body)',
            fontWeight: 500, letterSpacing: '0.05em',
          }}
        >
          🤖 iPêche Google Play
        </a>
      </div>

      {/* Species Filter — scrollable */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: '0.4rem', marginBottom: '1.25rem', paddingBottom: '0.25rem', scrollbarWidth: 'thin', scrollbarColor: '#C0392B #1a1a1a' }}>
        {speciesFilters.map((f) => {
          const color = f.id === 'tous' ? 'var(--text-secondary)' : (speciesColors[f.id] || 'var(--text-secondary)')
          return (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as TipSpecies | 'tous')}
              style={{
                flexShrink: 0,
                padding: '0.35rem 0.75rem',
                borderRadius: '20px',
                fontSize: '0.68rem',
                fontFamily: 'var(--font-display)',
                letterSpacing: '0.08em',
                fontWeight: 600,
                background: filter === f.id ? (f.id === 'tous' ? 'var(--water, #2E7D32)' : color) : 'var(--surface)',
                color: filter === f.id ? 'white' : color,
                border: `1px solid ${f.id === 'tous' ? 'var(--border)' : color}`,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s',
              }}
            >
              {f.label}
            </button>
          )
        })}
      </div>

      {/* Tips Grid — main tips */}
      {mainTips.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem', marginBottom: extendedTips.length > 0 ? '1.25rem' : 0 }}>
          {mainTips.map((tip) => {
            const color = speciesColors[tip.species] || 'var(--border)'
            return (
              <div
                key={tip.id}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'var(--surface)',
                  border: `1px solid ${color}44`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{
                    padding: '0.15rem 0.5rem', borderRadius: '20px', fontSize: '0.65rem', fontWeight: 600,
                    background: `${color}22`,
                    color: color,
                    border: `1px solid ${color}44`,
                    fontFamily: 'var(--font-display)',
                  }}>
                    {tip.speciesFR}
                  </span>
                  <div style={{ display: 'flex', gap: '1px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} style={{ color: i < tip.stars ? '#C8A84B' : 'var(--border)', fontSize: '11px' }}>★</span>
                    ))}
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                  {locale === 'en' && tip.textEN ? tip.textEN : tip.text}
                </p>
              </div>
            )
          })}
        </div>
      ) : extendedTips.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', background: 'var(--surface)', borderRadius: '8px', border: '1px solid var(--border)' }}>
          🎣 {locale === 'fr' ? 'Aucun conseil pour cette espèce — consultez notre encyclopédie.' : 'No tips for this species — see our encyclopedia.'}
        </div>
      ) : null}

      {/* Extended tips for less common species */}
      {extendedTips.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '0.85rem' }}>
          {extendedTips.map((tip, i) => {
            const color = speciesColors[filter] || 'var(--border)'
            return (
              <div
                key={i}
                style={{
                  padding: '1rem',
                  borderRadius: '8px',
                  background: 'var(--surface)',
                  border: `1px solid ${color}44`,
                }}
              >
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, margin: 0 }}>
                  {locale === 'en' ? tip.en : tip.fr}
                </p>
              </div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
