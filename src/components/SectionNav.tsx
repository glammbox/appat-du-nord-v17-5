import { motion } from 'framer-motion'

type Section = 'eaux' | 'especes' | 'calendrier' | 'arsenal' | 'conseils'

interface SectionNavProps {
  active: Section
  onSelect: (s: Section) => void
  locale: 'fr' | 'en'
}

const sections: { id: Section; labelFr: string; labelEn: string }[] = [
  { id: 'especes',    labelFr: 'Espèces',    labelEn: 'Species' },
  { id: 'arsenal',   labelFr: 'Arsenal',    labelEn: 'Gear' },
  { id: 'eaux',      labelFr: 'Eaux',       labelEn: 'Waters' },
  { id: 'calendrier',labelFr: 'Calendrier', labelEn: 'Calendar' },
  { id: 'conseils',  labelFr: 'Conseils',   labelEn: 'Tips' },
]

export function SectionNav({ active, onSelect, locale }: SectionNavProps) {
  return (
    <div
      className="sticky z-30 py-0"
      style={{
        top: '72px',
        background: 'rgba(16,23,40,0.95)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0 1rem',
        }}
      >
        {sections.map((s) => {
          const isActive = active === s.id
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s.id)}
              style={{
                flexShrink: 0,
                padding: '0.9rem 1.4rem',
                background: 'transparent',
                color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                border: 'none',
                borderBottom: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                fontFamily: 'var(--font-condensed)',
                fontSize: '0.78rem',
                fontWeight: isActive ? 700 : 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.2s, border-bottom-color 0.2s',
                whiteSpace: 'nowrap',
                position: 'relative',
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'
              }}
            >
              {locale === 'fr' ? s.labelFr : s.labelEn}
              {isActive && (
                <motion.div
                  layoutId="section-underline"
                  style={{
                    position: 'absolute',
                    bottom: '-2px',
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'var(--accent)',
                    borderRadius: '2px',
                  }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
