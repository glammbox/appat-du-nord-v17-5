import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const OPENAI_API_KEY = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_OPENAI_API_KEY || ''

const QUEBEC_SPECIES = [
  { id: 'muskellunge', nameFr: 'Maskinongé', nameEn: 'Muskellunge' },
  { id: 'tiger-muskie', nameFr: 'Maskinongé tigré', nameEn: 'Tiger Muskie' },
  { id: 'northern-pike', nameFr: 'Grand Brochet', nameEn: 'Northern Pike' },
  { id: 'largemouth-bass', nameFr: 'Achigan à grande bouche', nameEn: 'Largemouth Bass' },
  { id: 'smallmouth-bass', nameFr: 'Achigan à petite bouche', nameEn: 'Smallmouth Bass' },
  { id: 'walleye', nameFr: 'Doré Jaune', nameEn: 'Walleye' },
  { id: 'sauger', nameFr: 'Doré Noir', nameEn: 'Sauger' },
  { id: 'brook-trout', nameFr: 'Truite Mouchetée', nameEn: 'Brook Trout' },
  { id: 'rainbow-trout', nameFr: 'Truite Arc-en-ciel', nameEn: 'Rainbow Trout' },
  { id: 'lake-trout', nameFr: 'Touladi', nameEn: 'Lake Trout' },
  { id: 'atlantic-salmon', nameFr: 'Ouananiche', nameEn: 'Ouananiche (Atlantic Salmon)' },
  { id: 'arctic-char', nameFr: 'Omble Chevalier', nameEn: 'Arctic Char' },
  { id: 'splake', nameFr: 'Omble Hybride', nameEn: 'Splake' },
  { id: 'perch', nameFr: 'Perchaude', nameEn: 'Yellow Perch' },
  { id: 'lake-sturgeon', nameFr: 'Esturgeon Jaune', nameEn: 'Lake Sturgeon' },
  { id: 'carp', nameFr: 'Carpe Commune', nameEn: 'Common Carp' },
  { id: 'catfish', nameFr: 'Barbotte Brune', nameEn: 'Brown Bullhead' },
  { id: 'cisco', nameFr: 'Cisco', nameEn: 'Cisco' },
  { id: 'burbot', nameFr: 'Lotte', nameEn: 'Burbot' },
  { id: 'whitefish', nameFr: 'Grand Corégone', nameEn: 'Lake Whitefish' },
  { id: 'crapet-soleil', nameFr: 'Crapet Soleil', nameEn: 'Pumpkinseed Sunfish' },
]

interface IdentifyResult {
  speciesId: string
  nameFr: string
  nameEn: string
  confidence: number
  notes: string
  notesEn: string
}

interface FishIdentifierProps {
  locale: 'fr' | 'en'
  onViewSpecies?: (id: string) => void
}

export function FishIdentifier({ locale, onViewSpecies }: FishIdentifierProps) {
  const [dragOver, setDragOver] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<IdentifyResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError(locale === 'fr' ? 'Veuillez télécharger une image.' : 'Please upload an image file.')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string
      setPreviewUrl(dataUrl)
      // Extract base64 part
      const b64 = dataUrl.split(',')[1]
      setImageBase64(b64)
      setResult(null)
      setError(null)
    }
    reader.readAsDataURL(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const identifyFish = async () => {
    if (!imageBase64) return
    setLoading(true)
    setError(null)
    setResult(null)

    const speciesList = QUEBEC_SPECIES.map(s => `${s.nameFr} (${s.nameEn})`).join(', ')

    const prompt = `You are a Quebec freshwater fish identification expert. Analyze this fishing photo.

Quebec freshwater species list: ${speciesList}

Identify the fish species in the image. Respond ONLY with a valid JSON object (no markdown, no backticks):
{
  "speciesId": "<id from list>",
  "nameFr": "<French name>",
  "nameEn": "<English name>",
  "confidence": <number 0-100>,
  "notes": "<2-3 sentences in French about identification features visible>",
  "notesEn": "<same 2-3 sentences in English>"
}

If no fish is visible, use speciesId: "unknown", confidence: 0.`

    try {
      const apiKey = OPENAI_API_KEY
      const resp = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: [
                { type: 'text', text: prompt },
                { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imageBase64}`, detail: 'high' } },
              ],
            },
          ],
        }),
      })

      const data = await resp.json()
      if (data.error) throw new Error(data.error.message)

      const rawContent = data.choices?.[0]?.message?.content || ''
      // Strip potential markdown code blocks
      const cleaned = rawContent.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim()
      const parsed: IdentifyResult = JSON.parse(cleaned)
      setResult(parsed)
    } catch (e) {
      console.error('Identification error:', e)
      setError(
        locale === 'fr'
          ? "Erreur d'identification. Vérifiez la qualité de la photo et réessayez."
          : 'Identification failed. Check photo quality and try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  const resultSpecies = result ? QUEBEC_SPECIES.find(s => s.id === result.speciesId) : null
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={sectionRef}
      id="fish-identifier"
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
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <p className="eyebrow">
          {locale === 'fr' ? 'Identification IA' : 'AI Identification'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--headline)',
          color: 'var(--text)',
          margin: '0.5rem 0 0',
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}>
          {locale === 'fr' ? 'Identifier un Poisson' : 'Identify a Fish'}
        </h2>
        <p style={{ color: 'var(--muted-text)', fontSize: 'var(--small)', marginTop: '0.5rem' }}>
          {locale === 'fr'
            ? 'Téléchargez une photo de votre prise — notre IA identifie parmi 21 espèces du Québec avec GPT-4o Vision.'
            : 'Upload a photo of your catch — our AI identifies among 21 Quebec species using GPT-4o Vision.'}
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="fish-id-grid">
        {/* Left: Upload area */}
        <div>
          <div
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? 'var(--accent)' : 'var(--border)'}`,
              borderRadius: '4px',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              background: dragOver ? 'rgba(192,57,43,0.08)' : 'var(--surface)',
              transition: 'all 0.2s ease',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
            }}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Fish photo"
                style={{ maxWidth: '100%', maxHeight: '220px', objectFit: 'contain', borderRadius: '4px' }}
              />
            ) : (
              <>
                <div style={{ fontSize: '3rem' }}>🐟</div>
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--small)', margin: 0 }}>
                  {locale === 'fr'
                    ? 'Glissez-déposez ou cliquez pour télécharger'
                    : 'Drag & drop or click to upload'}
                </p>
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', margin: 0 }}>
                  JPG, PNG, WEBP
                </p>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />

          {previewUrl && (
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
              <button
                onClick={identifyFish}
                disabled={loading || !imageBase64}
                style={{
                  flex: 1,
                  padding: '0.75rem 1.5rem',
                  background: loading ? 'var(--surface)' : 'var(--accent)',
                  color: loading ? 'var(--muted-text)' : '#0D1418',
                  border: 'none',
                  fontSize: 'var(--eyebrow)',
                  fontWeight: 700,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'wait' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {loading
                  ? (locale === 'fr' ? '🔍 Analyse en cours...' : '🔍 Analyzing...')
                  : (locale === 'fr' ? '🔍 Identifier →' : '🔍 Identify →')}
              </button>
              <button
                onClick={() => { setPreviewUrl(null); setImageBase64(null); setResult(null); setError(null) }}
                style={{
                  padding: '0.75rem 1rem',
                  background: 'var(--surface)',
                  color: 'var(--muted-text)',
                  border: '1px solid var(--border)',
                  fontSize: 'var(--eyebrow)',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>
          )}
        </div>

        {/* Right: Results */}
        <div>
          {error && (
            <div style={{
              padding: '1rem',
              background: 'rgba(184,92,70,0.12)',
              border: '1px solid var(--danger)',
              color: 'var(--danger)',
              fontSize: 'var(--small)',
              borderRadius: '4px',
            }}>
              ⚠ {error}
            </div>
          )}

          {loading && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--muted-text)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</div>
              <p style={{ fontSize: 'var(--small)', margin: 0 }}>
                {locale === 'fr' ? 'GPT-4o analyse votre photo...' : 'GPT-4o is analyzing your photo...'}
              </p>
            </div>
          )}

          {result && !loading && (
            <div style={{
              padding: '1.5rem',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: result.confidence >= 70 ? '3px solid var(--accent)' : '3px solid var(--border)',
            }}>
              {/* Species name */}
              <div style={{ marginBottom: '1rem' }}>
                <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>
                  {locale === 'fr' ? 'Espèce identifiée' : 'Identified species'}
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                  color: 'var(--text)',
                  margin: 0,
                  fontWeight: 600,
                }}>
                  {locale === 'fr' ? result.nameFr : result.nameEn}
                </h3>
                {locale === 'fr' && result.nameEn && (
                  <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', margin: '0.2rem 0 0', fontStyle: 'italic' }}>
                    {result.nameEn}
                  </p>
                )}
              </div>

              {/* Confidence */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <span style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {locale === 'fr' ? 'Confiance' : 'Confidence'}
                  </span>
                  <span style={{
                    color: result.confidence >= 70 ? 'var(--accent)' : result.confidence >= 40 ? 'var(--warning)' : 'var(--muted-text)',
                    fontSize: 'var(--small)',
                    fontWeight: 700,
                  }}>
                    {result.confidence}%
                  </span>
                </div>
                <div style={{ background: 'var(--surface-2)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${result.confidence}%`,
                    background: result.confidence >= 70 ? 'var(--accent)' : result.confidence >= 40 ? 'var(--warning)' : 'var(--border)',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>

              {/* Notes */}
              {(result.notes || result.notesEn) && (
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ color: 'var(--muted-text)', fontSize: 'var(--eyebrow)', letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
                    {locale === 'fr' ? 'Caractéristiques observées' : 'Observed features'}
                  </p>
                  <p style={{ color: 'var(--text)', fontSize: 'var(--small)', lineHeight: 1.6, margin: 0 }}>
                    {locale === 'fr' ? result.notes : result.notesEn}
                  </p>
                </div>
              )}

              {/* Link to species profile */}
              {resultSpecies && result.speciesId !== 'unknown' && onViewSpecies && (
                <button
                  onClick={() => onViewSpecies(result.speciesId)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 1rem',
                    background: 'rgba(192,57,43,0.12)',
                    border: '1px solid var(--accent)',
                    color: 'var(--accent)',
                    fontSize: 'var(--eyebrow)',
                    fontWeight: 700,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {locale === 'fr'
                    ? `→ Voir la fiche ${locale === 'fr' ? result.nameFr : result.nameEn}`
                    : `→ View ${result.nameEn} profile`}
                </button>
              )}
            </div>
          )}

          {!result && !loading && !error && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--muted-text)',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}>
              <div style={{ fontSize: '2rem' }}>🎣</div>
              <p style={{ fontSize: 'var(--small)', margin: 0 }}>
                {locale === 'fr'
                  ? '21 espèces québécoises dans notre base. Téléchargez une photo pour commencer.'
                  : '21 Quebec species in our database. Upload a photo to get started.'}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center' }}>
                {QUEBEC_SPECIES.slice(0, 8).map(s => (
                  <span key={s.id} style={{
                    padding: '0.2rem 0.5rem',
                    background: 'rgba(77,124,138,0.15)',
                    border: '1px solid var(--accent-alt)',
                    color: 'var(--muted-text)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.05em',
                  }}>
                    {locale === 'fr' ? s.nameFr : s.nameEn}
                  </span>
                ))}
                <span style={{
                  padding: '0.2rem 0.5rem',
                  color: 'var(--muted-text)',
                  fontSize: '0.65rem',
                }}>
                  +{QUEBEC_SPECIES.length - 8} {locale === 'fr' ? 'autres' : 'more'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .fish-id-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  )
}
