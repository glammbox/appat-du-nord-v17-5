import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { waters, Water } from '../lib/waters'
import { WaterDetailPanel } from './WaterDetailPanel'

interface WatersMapProps {
  onViewGear?: () => void
  locale: 'fr' | 'en'
  onRegionChange?: (region: { lat: number; lon: number; label: string }) => void
  onViewSpecies?: (id: string) => void
  onViewCalendar?: (region: { lat: number; lon: number; label: string }) => void
}

export function WatersMap({ onViewGear, locale, onRegionChange, onViewSpecies, onViewCalendar }: WatersMapProps) {
  const [selectedWater, setSelectedWater] = useState<Water | null>(null)
  const [query, setQuery] = useState('')
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  const handleWaterClick = (water: Water) => {
    setSelectedWater(water)
    if (onRegionChange) {
      onRegionChange({
        lat: water.coords[0],
        lon: water.coords[1],
        label: `${water.nameFr ?? water.name} — ${water.region}`,
      })
    }
    setTimeout(() => {
      document.getElementById('water-detail')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  useEffect(() => {
    const pending = sessionStorage.getItem('appat-select-water')
    if (!pending) return
    const match = waters.find(w => w.id === pending)
    if (match) handleWaterClick(match)
    sessionStorage.removeItem('appat-select-water')
  }, [])

  const filteredWaters = waters.filter((water) => {
    const haystack = `${water.nameFr} ${water.nameEn} ${water.region} ${water.species.join(' ')}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  // Build OpenTopoMap URL (terrain tiles) — zooms to selected water or shows all Quebec
  const mapLat = selectedWater ? selectedWater.coords[0] : 52
  const mapLon = selectedWater ? selectedWater.coords[1] : -72

  // Use OpenTopoMap for terrain view with contour lines and elevation shading
  // Fallback to OSM cycle map layer which shows terrain better than standard mapnik
  const buildTerrainUrl = () => {
    if (selectedWater) {
      const lat = selectedWater.coords[0]
      const lon = selectedWater.coords[1]
      // OpenTopoMap embed via OSM with cycle/terrain layer overlay
      return `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.8}%2C${lat - 0.6}%2C${lon + 0.8}%2C${lat + 0.6}&layer=cyclemap&marker=${lat}%2C${lon}`
    }
    // Quebec overview — zoomed to southern Quebec fishing belt (Montreal to Quebec City corridor)
    return `https://www.openstreetmap.org/export/embed.html?bbox=-76.5%2C44.8%2C-70.0%2C47.5&layer=cyclemap`
  }

  const mapUrl = buildTerrainUrl()

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}
    >
      <p style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '0.72rem',
        fontWeight: 600,
        color: 'var(--accent)',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        marginBottom: '0.5rem',
      }}>
        {locale === 'fr' ? 'Atlas aquatique · Québec' : 'Aquatic Atlas · Quebec'}
      </p>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--section-display)', color: 'var(--text-primary)', marginBottom: '0.5rem', letterSpacing: '0.03em' }}>
        {locale === 'fr' ? "LACS & RIVIÈRES DU QUÉBEC" : 'QUEBEC LAKES & RIVERS'}
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
        {locale === 'fr'
          ? `${waters.length} plans d'eau & rivières — sélectionnez pour voir les détails`
          : `${waters.length} water bodies & rivers — select to see details`}
      </p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.08 }}
        style={{ marginBottom: '1.25rem' }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={locale === 'fr' ? "Rechercher un plan d'eau" : 'Search a water body'}
          style={{
            width: '100%',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            padding: '0.9rem 1rem',
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            borderRadius: '10px',
            outline: 'none',
            boxShadow: '0 0 0 1px rgba(0,180,216,0.05)',
          }}
        />
      </motion.div>

      {/* Terrain Map — OpenStreetMap Cycle/Terrain layer */}
      <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        {/* Terrain label */}
        <div style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0.35rem 0.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}>
          <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
            🗺 {locale === 'fr' ? 'Vue terrain' : 'Terrain view'}
          </span>
          {selectedWater && (
            <span style={{ fontSize: '0.68rem', color: 'var(--accent)', fontFamily: 'var(--font-body)' }}>
              — {selectedWater.nameFr ?? selectedWater.name}
            </span>
          )}
        </div>
        <iframe
          key={`${mapLat}-${mapLon}-${query}`}
          src={mapUrl}
          title={locale === 'fr' ? 'Carte terrain du Québec' : 'Quebec Terrain Map'}
          width="100%"
          height="380"
          style={{ display: 'block', border: 'none' }}
          loading="lazy"
        />
      </div>

      {/* Water selector grid — searchable, capped to ~3 rows */}
      <div className="waters-scroll-list" style={{
        gap: '0.5rem',
        marginBottom: '1.5rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        maxHeight: '380px',
        overflowY: 'auto',
        paddingRight: '0.25rem',
        scrollbarWidth: 'thin',
        scrollbarColor: '#00CFFF #1a1a1a',
      }}>
        {filteredWaters.map((water) => (
          <button
            key={water.id}
            onClick={() => handleWaterClick(water)}
            style={{
              background: selectedWater?.id === water.id ? 'var(--accent)' : 'var(--surface)',
              border: `1px solid ${selectedWater?.id === water.id ? 'var(--accent)' : 'var(--border)'}`,
              color: 'var(--text-primary)',
              padding: '0.65rem 0.8rem',
              textAlign: 'left',
              cursor: 'pointer',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-body)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { if (selectedWater?.id !== water.id) (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { if (selectedWater?.id !== water.id) (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            <div style={{ fontWeight: 600, marginBottom: '0.15rem', fontSize: '0.78rem', lineHeight: 1.3 }}>
              {water.nameFr ?? water.name}
            </div>
            <div style={{
              color: selectedWater?.id === water.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)',
              fontSize: '0.68rem',
              marginBottom: '0.15rem',
            }}>
              {water.region}
            </div>
            <div style={{
              color: selectedWater?.id === water.id ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)',
              fontSize: '0.66rem',
            }}>
              {water.species.slice(0, 2).join(' · ')}
            </div>
          </button>
        ))}
      </div>

      {/* Fix 9: "Sélectionnez un lac" bar removed — people know to click */}

      {/* Lake detail — absolute/fixed OVERLAY on top of content (v17.2) */}
      {selectedWater && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedWater(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(5,8,16,0.75)',
              zIndex: 300,
              backdropFilter: 'blur(4px)',
            }}
          />
          <div style={{
            position: 'fixed',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(96vw, 780px)',
            maxHeight: '90vh',
            overflowY: 'auto',
            zIndex: 301,
            borderRadius: '12px',
            background: 'var(--bg-raised)',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
          }}>
            {/* Fix 8 + Fix 10: Large OpenStreetMap navigation map in EVERY lake detail — 350px+ */}
            {(() => {
              const lat = selectedWater.coords[0]
              const lng = selectedWater.coords[1]
              // cyclemap layer = navigation/road layer per brief Fix 10
              const osmUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.12}%2C${lat - 0.08}%2C${lng + 0.12}%2C${lat + 0.08}&layer=cyclemap&marker=${lat}%2C${lng}`
              return (
                <div style={{ borderRadius: '12px 12px 0 0', overflow: 'hidden', borderBottom: '1px solid var(--border)' }}>
                  <div style={{
                    background: 'var(--surface)',
                    padding: '0.4rem 0.9rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-display)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>
                      🗺 {locale === 'fr' ? 'Carte de navigation' : 'Navigation Map'} — {selectedWater.nameFr ?? selectedWater.name}
                    </span>
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}&zoom=13`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ marginLeft: 'auto', fontSize: '0.62rem', color: 'var(--accent)', textDecoration: 'none' }}
                    >
                      {locale === 'fr' ? 'Voir en grand →' : 'Open full map →'}
                    </a>
                  </div>
                  <iframe
                    src={osmUrl}
                    width="100%"
                    height="380"
                    style={{ display: 'block', border: 'none' }}
                    loading="lazy"
                    title={`${selectedWater.nameFr ?? selectedWater.name} — OpenStreetMap Navigation`}
                  />
                </div>
              )
            })()}
            <WaterDetailPanel
              water={selectedWater}
              onViewGear={onViewGear ?? (() => {})}
              onClose={() => setSelectedWater(null)}
              locale={locale}
              onViewSpecies={onViewSpecies}
              onViewCalendar={onViewCalendar}
            />
          </div>
        </>
      )}
      {/* Mobile scrollbar CSS */}
      <style>{`
        .waters-scroll-list::-webkit-scrollbar { width: 6px; }
          @media (max-width: 640px) {
            .waters-scroll-list { 
              display: flex !important; 
              flex-direction: row !important; 
              overflow-x: auto !important;
              overflow-y: hidden !important;
              max-height: none !important;
              flex-wrap: nowrap !important;
              padding-bottom: 8px;
              -webkit-overflow-scrolling: touch;
              scroll-snap-type: x mandatory;
            }
            .waters-scroll-list > * {
              flex-shrink: 0;
              width: 140px;
              scroll-snap-align: start;
            }
          }
        .waters-scroll-list::-webkit-scrollbar-track { background: #1a1a1a; min-height: 44px; border-radius: 3px; }
        .waters-scroll-list::-webkit-scrollbar-thumb { background: #00CFFF; border-radius: 3px; }
        @media (max-width: 768px) {
          .waters-scroll-list::-webkit-scrollbar { width: 8px; }
          .waters-scroll-list::-webkit-scrollbar-track { min-height: 44px; }
        }
      `}</style>
    </motion.div>
  )
}
