import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// Species-based guides (5 species per brief)
const BOOKS_DATA = [
  {
    id: 'maskinonge',
    titleFr: 'Maskinongé — Le Géant des Eaux',
    titleEn: 'Muskellunge — Giant of the Waters',
    subtitleFr: 'Le roi des eaux québécoises',
    subtitleEn: 'The king of Quebec waters',
    emoji: '🦷',
    file: '/guides/book-muskie.md',
    coverImage: '/images/guides/guide-maskinonge.png',
    spineColor: '#D4261C',
  },
  {
    id: 'brochet',
    titleFr: 'Grand Brochet — Le Prédateur des Marais',
    titleEn: 'Northern Pike — Predator of the Marshes',
    subtitleFr: 'Tactiques pour le prédateur vert',
    subtitleEn: 'Tactics for the green predator',
    emoji: '⚡',
    file: '/guides/book-pike.md',
    coverImage: '/images/guides/guide-brochet.png',
    spineColor: '#2E7D32',
  },
  {
    id: 'dore',
    titleFr: "Doré Jaune — L'Or des Lacs",
    titleEn: 'Walleye — Gold of the Lakes',
    subtitleFr: 'Maîtrisez le poisson doré du Québec',
    subtitleEn: 'Master Quebec\'s golden fish',
    emoji: '🌅',
    file: '/guides/book-walleye.md',
    coverImage: '/images/guides/guide-dore.png',
    spineColor: '#C8A84B',
  },
  {
    id: 'truite',
    titleFr: 'La Truite — Reine des Rivières',
    titleEn: 'Trout — Queen of the Rivers',
    subtitleFr: 'Omble, arc-en-ciel, touladi, saumon',
    subtitleEn: 'Brook, rainbow, lake, salmon',
    emoji: '🏔️',
    file: '/guides/book-trout.md',
    coverImage: '/images/guides/guide-truite.png',
    spineColor: '#6A1B9A',
  },
  {
    id: 'achigan',
    titleFr: "L'Achigan — Le Combattant",
    titleEn: 'Bass — The Fighter',
    subtitleFr: 'Grande bouche et petite bouche',
    subtitleEn: 'Largemouth and smallmouth',
    emoji: '💥',
    file: '/guides/book-bass.md',
    coverImage: '/images/guides/guide-achigan.png',
    spineColor: '#1565C0',
  },
]

interface GuidesSectionProps {
  locale?: 'fr' | 'en'
  onViewArsenal?: (speciesId: string) => void
}

const ARSENAL_ID_MAP: Record<string, string> = {
  maskinonge: 'muskellunge',
  brochet: 'northern-pike',
  dore: 'walleye',
  truite: 'brook-trout',
  achigan: 'largemouth-bass',
}

export function GuidesSection({ locale = 'fr', onViewArsenal }: GuidesSectionProps) {
  const [selectedBook, setSelectedBook] = useState<string | null>(null)
  const [bookContent, setBookContent] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  const books = BOOKS_DATA.map(b => ({
    ...b,
    title: locale === 'fr' ? b.titleFr : b.titleEn,
    subtitle: locale === 'fr' ? b.subtitleFr : b.subtitleEn,
  }))

  useEffect(() => {
    if (!selectedBook) return
    const book = books.find(b => b.id === selectedBook)
    if (!book) return
    setLoading(true)
    setBookContent('')
    fetch(book.file)
      .then(r => r.text())
      .then(text => { setBookContent(text); setLoading(false) })
      .catch(() => {
        setBookContent(locale === 'fr' ? 'Erreur de chargement du guide.' : 'Failed to load guide.')
        setLoading(false)
      })
  }, [selectedBook]) // eslint-disable-line

  const selectedBookData = books.find(b => b.id === selectedBook)

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
            fontSize: '1.3rem',
            color: selectedBookData?.spineColor || 'var(--accent)',
            margin: '2rem 0 0.75rem',
            letterSpacing: '0.04em',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '0.4rem',
          }}>
            {line.replace(/^## /, '')}
          </h3>
        )
      } else if (line.startsWith('# ')) {
        elements.push(
          <h2 key={i} style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            color: 'var(--text-primary)',
            margin: '0 0 1.25rem',
            letterSpacing: '0.04em',
          }}>
            {line.replace(/^# /, '')}
          </h2>
        )
      } else if (line.trim().startsWith('- ')) {
        const items: string[] = []
        while (i < lines.length && lines[i].trim().startsWith('- ')) {
          items.push(lines[i].trim().replace(/^- /, ''))
          i++
        }
        elements.push(
          <ul key={`ul-${i}`} style={{ paddingLeft: '1.25rem', margin: '0.5rem 0 1rem' }}>
            {items.map((item, j) => (
              <li key={j} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '0.25rem' }}>
                {item}
              </li>
            ))}
          </ul>
        )
        continue
      } else if (line.trim() !== '') {
        elements.push(
          <p key={i} style={{
            color: 'var(--text-secondary)',
            fontSize: '0.92rem',
            lineHeight: 1.8,
            margin: '0 0 1rem',
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
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        padding: 'var(--section-pad) 1.5rem',
      }}
    >
      {/* Section Header */}
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
          color: 'var(--amber)',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          {locale === 'fr' ? '📚 Bibliothèque de pêche' : '📚 Fishing Library'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          lineHeight: 0.95,
          marginBottom: '1rem',
        }}>
          {locale === 'fr' ? 'GUIDES DES ESPÈCES' : 'SPECIES GUIDES'}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '580px',
        }}>
          {locale === 'fr'
            ? "Cinq guides complets. Cinq espèces emblématiques du Québec. Comportement, habitat, techniques, équipement — tout ce qu'un pêcheur sérieux doit savoir."
            : "Five complete guides. Five iconic Quebec species. Behavior, habitat, techniques, gear — everything a serious angler needs to know."}
        </p>
      </motion.div>

      {/* Book Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(190px, 1fr))',
        gap: '1.25rem',
        marginBottom: selectedBook ? '2rem' : '0',
      }}>
        {books.map((book, idx) => {
          const isActive = selectedBook === book.id
          return (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 + idx * 0.07 }}
              style={{
                background: 'var(--surface)',
                border: `1px solid ${isActive ? book.spineColor : 'var(--border)'}`,
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxShadow: isActive ? `0 0 0 1px ${book.spineColor}` : 'none',
              }}
              whileHover={{ y: -6, boxShadow: `0 16px 40px rgba(0,0,0,0.3)` }}
              onClick={() => setSelectedBook(isActive ? null : book.id)}
            >
              {/* Book cover — full bleed */}
              <div style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                overflow: 'hidden',
                background: '#0A1020',
                borderBottom: `3px solid ${book.spineColor}`,
              }}>
                <img
                  src={book.coverImage}
                  alt={book.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    transition: 'transform 0.4s ease',
                  }}
                  onError={(e) => {
                    const el = e.target as HTMLImageElement
                    el.style.display = 'none'
                  }}
                />
                {/* Overlay CTA */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.3) 60%, transparent 100%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1rem',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-condensed)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: isActive ? book.spineColor : 'var(--text-muted)',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    transition: 'color 0.2s',
                  }}>
                    {isActive
                      ? (locale === 'fr' ? 'OUVERT ✓' : 'OPEN ✓')
                      : (locale === 'fr' ? 'LIRE LE GUIDE →' : 'READ GUIDE →')}
                  </div>
                </div>
              </div>

              {/* Book info */}
              <div style={{ padding: '1rem' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.04em',
                  lineHeight: 1.2,
                  marginBottom: '0.3rem',
                }}>
                  {book.title}
                </div>
                <div style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontStyle: 'italic',
                  lineHeight: 1.4,
                }}>
                  {book.subtitle}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Guide full-screen overlay */}
      <AnimatePresence>
        {selectedBook && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.82 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setSelectedBook(null)}
              style={{
                position: 'fixed',
                inset: 0,
                background: '#05070d',
                zIndex: 250,
                backdropFilter: 'blur(8px)',
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 32 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 251,
                display: 'flex',
                flexDirection: 'column',
                background: 'linear-gradient(180deg, rgba(10,14,26,0.98) 0%, rgba(12,18,30,0.98) 100%)',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem 1.5rem',
                borderBottom: '1px solid var(--border)',
                background: 'rgba(255,255,255,0.02)',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{selectedBookData?.emoji}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: 'var(--text-primary)', letterSpacing: '0.04em' }}>
                      {selectedBookData?.title}
                    </div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {selectedBookData?.subtitle}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                  {onViewArsenal && selectedBook && (
                    <button
                      onClick={() => onViewArsenal(ARSENAL_ID_MAP[selectedBook] || selectedBook)}
                      style={{
                        padding: '0.55rem 1rem',
                        background: selectedBookData?.spineColor || 'var(--accent)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'var(--font-condensed)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                      }}
                    >
                      {locale === 'fr' ? "Voir la boutique →" : 'Open boutique →'}
                    </button>
                  )}
                  <button
                    onClick={() => setSelectedBook(null)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      color: 'var(--text-primary)',
                      padding: '0.5rem 0.95rem',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      fontFamily: 'var(--font-condensed)',
                      borderRadius: '8px',
                    }}
                  >
                    {locale === 'fr' ? 'Fermer ✕' : 'Close ✕'}
                  </button>
                </div>
              </div>

              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '2rem 1.5rem 3rem',
                scrollbarWidth: 'thin',
                scrollbarColor: `${selectedBookData?.spineColor || 'var(--accent)'} var(--surface)`,
              }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                  {loading ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem', fontFamily: 'var(--font-body)' }}>
                      {locale === 'fr' ? 'Chargement du guide...' : 'Loading guide...'}
                    </div>
                  ) : (
                    <div>{renderContent(bookContent)}</div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
