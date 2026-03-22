import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const BOOKS_DATA = [
  { id: 'automne', titleFr: 'Guide Automne', titleEn: 'Fall Guide', subtitleFr: 'Stratégies de fin de saison', subtitleEn: 'Late-season strategies', emoji: '🍂', file: '/guides/book-muskie.md', coverImage: '/images/guides/guide-automne.png' },
  { id: 'ete', titleFr: 'Guide Été', titleEn: 'Summer Guide', subtitleFr: 'Pêche en eaux chaudes', subtitleEn: 'Warm water fishing', emoji: '☀️', file: '/guides/book-pike.md', coverImage: '/images/guides/guide-ete.png' },
  { id: 'hiver', titleFr: 'Guide Hiver', titleEn: 'Winter Guide', subtitleFr: 'Pêche sous la glace', subtitleEn: 'Ice fishing', emoji: '❄️', file: '/guides/book-walleye.md', coverImage: '/images/guides/guide-hiver.png' },
  { id: 'printemps', titleFr: 'Guide Printemps', titleEn: 'Spring Guide', subtitleFr: 'Débâcle & montaison', subtitleEn: 'Ice-out & spawning', emoji: '🌱', file: '/guides/book-trout.md', coverImage: '/images/guides/guide-printemps.png' },
  { id: 'techniques', titleFr: 'Techniques Avancées', titleEn: 'Advanced Techniques', subtitleFr: "Maîtriser votre art", subtitleEn: 'Master your craft', emoji: '🎣', file: '/guides/book-bass.md', coverImage: '/images/guides/guide-techniques.png' },
]

interface GuidesSectionProps {
  locale?: 'fr' | 'en'
}

export function GuidesSection({ locale = 'fr' }: GuidesSectionProps) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [bookContent, setBookContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const books = BOOKS_DATA.map(b => ({ ...b, title: locale === 'fr' ? b.titleFr : b.titleEn, subtitle: locale === 'fr' ? b.subtitleFr : b.subtitleEn }))

  useEffect(() => {
    if (!selectedBook) return
    const book = books.find(b => b.id === selectedBook)
    if (!book) return
    setLoading(true)
    setBookContent('')
    fetch(book.file)
      .then(r => r.text())
      .then(text => { setBookContent(text); setLoading(false) })
      .catch(() => { setBookContent(locale === 'fr' ? 'Erreur de chargement du guide.' : 'Failed to load guide.'); setLoading(false) })
  }, [selectedBook, locale, books])

  const selectedBookData = books.find(b => b.id === selectedBook)

  // Render markdown-ish content (headings, paragraphs)
  function renderContent(md: string) {
    const lines = md.split('\n')
    const elements: React.ReactNode[] = []
    let i = 0
    while (i < lines.length) {
      const line = lines[i]
      if (line.startsWith('## ')) {
        elements.push(
          <h3 key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            color: '#C0392B',
            margin: '1.5rem 0 0.5rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            borderBottom: '1px solid #2a3540',
            paddingBottom: '0.3rem',
          }}>
            {line.replace(/^## /, '')}
          </h3>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h2 key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            color: 'var(--text-primary)',
            margin: '0 0 1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}>
            {line.replace(/^# /, '')}
          </h2>
        )
      } else if (line.trim().startsWith('- ')) {
        // Collect list items
        const items: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().replace(/^- /, ''))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingLeft: '1.2rem', margin: '0.5rem 0' }}>
            {items.map((item, j) => (
              <li key={j} style={{ color: 'var(--text-primary)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.2rem' }}>
                {item}
              </li>
            ))}
          </ul>
        )
        continue
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} style={{
            color: 'var(--text-primary)',
            fontSize: '0.85rem',
            lineHeight: 1.8,
            margin: '0 0 0.75rem',
          }}>
            {line}
          </p>
        )
      }
      i++
    }
    return elements
  }

  return (
    <motion.div
      ref={sectionRef}
      id="guides"
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: '3rem 1.5rem',
        borderTop: '1px solid var(--border)',
      }}
    >
      {/* Section Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="eyebrow">
          {locale === 'fr' ? 'Bibliothèque de pêche' : 'Fishing Library'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--headline)',
          color: 'var(--text-primary)',
          margin: '0.5rem 0 0',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          {locale === 'fr' ? 'Guides des Espèces' : 'Species Guides'}
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--small)', marginTop: '0.5rem' }}>
          {locale === 'fr'
            ? '5 guides complets · Comportement · Habitat · Techniques · FR/EN'
            : '5 complete guides · Behavior · Habitat · Techniques · FR/EN'}
        </p>
      </div>

      {/* Book Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: selectedBook ? '2rem' : '0',
      }}>
        {books.map((book) => {
          const isActive = selectedBook === book.id
          return (
            <div
              key={book.id}
              style={{
                background: isActive ? 'rgba(192,57,43,0.12)' : 'var(--surface)',
                border: `1px solid ${isActive ? '#C0392B' : 'var(--border)'}`,
                padding: '1.5rem 1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Book cover image */}
              <div style={{ width: '100%', height: '120px', overflow: 'hidden', background: '#0a1520', borderRadius: '2px', marginBottom: '0' }}>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                    if (el.parentElement) el.parentElement.innerHTML = `<div style="font-size:2rem;text-align:center;padding:2rem">${book.emoji}</div>`
                  }}
                />
              </div>
              <div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  marginBottom: '0.2rem',
                }}>
                  {book.title}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  letterSpacing: '0.03em',
                }}>
                  {book.subtitle}
                </div>
              </div>
              <button
                onClick={() => setSelectedBook(isActive ? null : book.id)}
                style={{
                  padding: '0.5rem 0.75rem',
                  background: isActive ? '#C0392B' : 'var(--surface-2)',
                  color: isActive ? '#fff' : 'var(--accent)',
                  border: `1px solid ${isActive ? '#C0392B' : 'var(--border)'}`,
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  textAlign: 'left',
                }}
              >
                {isActive
                  ? (locale === 'fr' ? '✕ Fermer' : '✕ Close')
                  : (locale === 'fr' ? 'Lire le guide →' : 'Read guide →')}
              </button>
            </div>
          )
        })}
      </div>

      {/* Book Content Panel */}
      {selectedBook && (
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderTop: '3px solid #C0392B',
          padding: '2rem',
          maxHeight: '70vh',
          overflowY: 'auto',
          scrollbarColor: '#C0392B #1a1a1a',
          scrollbarWidth: 'thin',
        }}>
          {/* Panel header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
            paddingBottom: '1rem',
            borderBottom: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{selectedBookData?.emoji}</span>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {selectedBookData?.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {selectedBookData?.subtitle}
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedBook(null)}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                padding: '0.35rem 0.75rem',
                cursor: 'pointer',
                fontSize: '0.72rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-body)',
              }}
            >
              {locale === 'fr' ? 'Fermer ✕' : 'Close ✕'}
            </button>
          </div>

          {/* Content */}
          {loading ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem', fontFamily: 'var(--font-body)' }}>
              {locale === 'fr' ? 'Chargement...' : 'Loading...'}
            </div>
          ) : (
            <div>{renderContent(bookContent)}</div>
          )}
        </div>
      )}
    </motion.div>
  )
}
