import { Water } from '../lib/waters'
// WaterPermit used via water.permits

const speciesIdMap: Record<string, string> = {
  'Maskinongé': 'muskellunge',
  'Grand Brochet': 'northern-pike',
  'Achigan': 'largemouth-bass',
  'Achigan à Grande Bouche': 'largemouth-bass',
  'Achigan à Petite Bouche': 'smallmouth-bass',
  'Doré Jaune': 'walleye',
  'Doré Noir': 'sauger',
  'Truite Mouchetée': 'brook-trout',
  'Touladi': 'lake-trout',
  'Truite Arc-en-ciel': 'rainbow-trout',
  'Esturgeon': 'lake-sturgeon',
  'Esturgeon Jaune': 'lake-sturgeon',
  'Bar Rayé': 'muskellunge',
  'Ouananiche': 'atlantic-salmon',
  'Saumon Atlantique': 'atlantic-salmon',
  'Perchaude': 'perch',
  'Omble Arctique': 'arctic-char',
  'Omble Chevalier': 'arctic-char',
  'Cisco': 'cisco',
  'Grand Corégone': 'whitefish',
  'Carpe': 'carp',
  'Carpe Commune': 'carp',
  'Barbotte': 'catfish',
  'Barbotte Brune': 'catfish',
  'Lotte': 'burbot',
  'Crapet Soleil': 'crapet-soleil',
  'Marigane Noire': 'crapet-soleil',
  'Maskinongé Tigré': 'tiger-muskie',
}

interface WaterDetailPanelProps {
  water: Water
  onClose: () => void
  onViewGear: () => void
  locale: 'fr' | 'en'
  onViewSpecies?: (id: string) => void
  onViewCalendar?: (region: { lat: number; lon: number; label: string }) => void
}

export function WaterDetailPanel({ water, onClose, onViewGear, locale, onViewSpecies, onViewCalendar }: WaterDetailPanelProps) {
  const fishImages: Record<string, string> = {
    'Maskinongé': 'maskinonge.png',
    'Grand Brochet': 'grand-brochet.png',
    'Achigan': 'achigan-grande-bouche.png',
    'Achigan à Grande Bouche': 'achigan-grande-bouche.png',
    'Achigan à Petite Bouche': 'achigan-petite-bouche.png',
    'Doré Jaune': 'dore-jaune.png',
    'Truite Mouchetée': 'truite-mouchetee.png',
    'Touladi': 'touladi.png',
    'Esturgeon': 'esturgeon-jaune.png',
    'Esturgeon Jaune': 'esturgeon-jaune.png',
    'Bar Rayé': 'bar-raye.jpg',
    'Ouananiche': 'ouananiche.jpg',
    'Truite Arc-en-ciel': 'truite-arc-en-ciel.png',
    'Perchaude': 'perchaude.png',
    'Saumon Atlantique': 'ouananiche.jpg',
    'Omble Arctique': 'omble-chevalier.jpg',
    'Omble Chevalier': 'omble-chevalier.jpg',
    'Cisco': 'cisco.jpg',
    'Grand Corégone': 'menomini.png',
    'Carpe': 'carpe-commune.png',
    'Carpe Commune': 'carpe-commune.png',
    'Barbotte': 'barbotte-brune.png',
    'Barbotte Brune': 'barbotte-brune.png',
    'Lotte': 'lotte.png',
    'Crapet Soleil': 'crapet-soleil.jpg',
    'Marigane Noire': 'marigane-noire.jpg',
    'Maskinongé Tigré': 'tiger-maskinonge.png',
  }

  return (
    <div
      className="rounded-xl overflow-hidden mt-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
    >
      {/* Header */}
      <div className="relative">
        <img
          src={`/images/lakes/${water.imageFile}`}
          alt={water.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/lakes/lake-1.jpg' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(6,14,24,0.95))' }}
        />
        <div className="absolute bottom-0 left-0 p-4">
          <h3
            className="text-2xl font-bold"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          >
            {water.name}
          </h3>
          <p className="text-sm" style={{ color: 'var(--accent-gold)' }}>{water.region}</p>
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
          style={{ background: 'rgba(6,14,24,0.8)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        >
          ×
        </button>
      </div>

      {/* Description */}
      {(water.descFr || water.descEn) && (
        <div className="px-4 pt-3 pb-1">
          <p className="text-sm" style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            {locale === 'fr' ? water.descFr : water.descEn}
          </p>
        </div>
      )}

      {/* Content Grid */}
      <div className="p-4 grid md:grid-cols-2 gap-4">
        {/* Left */}
        <div className="space-y-4">
          {/* Species — clickable badges */}
          <div>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>
              {locale === 'fr' ? 'ESPÈCES PRÉSENTES' : 'PRESENT SPECIES'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {water.species.map((sp) => {
                const speciesId = speciesIdMap[sp]
                return (
                  <button
                    key={sp}
                    onClick={() => speciesId && onViewSpecies && onViewSpecies(speciesId)}
                    className="flex items-center gap-2 px-2 py-1 rounded transition-all"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border)',
                      cursor: speciesId && onViewSpecies ? 'pointer' : 'default',
                      textAlign: 'left',
                    }}
                    title={speciesId && onViewSpecies ? (locale === 'fr' ? `Voir ${sp}` : `View ${sp}`) : undefined}
                  >
                    {fishImages[sp] && (
                      <img
                        src={`/images/fish/${fishImages[sp]}`}
                        alt={sp}
                        className="w-6 h-6 rounded-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{sp}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Lake Characteristics */}
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>
              {locale === 'fr' ? 'MEILLEURE SAISON' : 'BEST SEASON'}
            </h4>
            <p className="text-sm" style={{ color: 'var(--text-primary)' }}>{water.bestSeason}</p>
            {(water.depth || water.size || water.nearestCity) && (
              <div style={{ marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {water.depth && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    📏 {locale === 'fr' ? 'Profondeur' : 'Depth'}: {water.depth}
                  </p>
                )}
                {water.size && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    📐 {locale === 'fr' ? 'Superficie' : 'Size'}: {water.size}
                  </p>
                )}
                {water.nearestCity && (
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    🏙️ {locale === 'fr' ? 'Ville proche' : 'Nearest city'}: {water.nearestCity}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Boat Launches — addresses + Google Maps link */}
          <div>
            <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>
              {locale === 'fr' ? "MISES À L'EAU" : 'BOAT LAUNCHES'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {water.boatLaunches.map((launch) => (
                <li key={launch} style={{ marginBottom: '0.4rem' }}>
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>📍 {launch}</span>
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(launch)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginLeft: '0.5rem', color: 'var(--accent)', fontSize: '0.75rem' }}
                  >
                    Directions →
                  </a>
                </li>
              ))}
            </ul>

            {/* Fishing license(s) */}
            {water.permits && water.permits.length > 0 ? (
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {water.permits.map((permit, i) => (
                  <div key={i} style={{ padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.4rem' }}>
                      {locale === 'fr' ? permit.labelFr : permit.labelEn}
                    </p>
                    <a href={permit.url} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'inline-block', padding: '0.35rem 0.75rem', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.72rem', textDecoration: 'none' }}>
                      {locale === 'fr' ? 'Acheter / Voir →' : 'Buy / View →'}
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--bg)', border: '1px solid var(--accent)', borderRadius: '4px' }}>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0 0 0.5rem' }}>
                  {locale === 'fr' ? '🎫 Un permis de pêche est requis pour pêcher au Québec.' : '🎫 A fishing permit is required to fish in Quebec.'}
                </p>
                <a href="https://mondossierchassepeche.gouv.qc.ca/" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-block', padding: '0.4rem 0.8rem', background: 'var(--accent)', color: 'white', borderRadius: '4px', fontSize: '0.75rem', textDecoration: 'none' }}>
                  {locale === 'fr' ? 'Acheter un permis →' : 'Buy a permit →'}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Right */}
        <div className="space-y-3">
          {/* Weather Widget — click navigates to Calendar preset to this region */}
          <button
            onClick={() => onViewCalendar?.({
              lat: water.coords[0],
              lon: water.coords[1],
              label: `${water.nameFr ?? water.name} — ${water.region}`,
            })}
            className="p-3 rounded-lg w-full text-left"
            style={{
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border)',
              cursor: onViewCalendar ? 'pointer' : 'default',
              transition: 'border-color 0.15s',
            }}
            onMouseEnter={e => { if (onViewCalendar) (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)' }}
          >
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
              {locale === 'fr' ? 'CONDITIONS MÉTÉO' : 'WEATHER CONDITIONS'}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              🌡️ {water.weatherRegion} — {locale === 'fr' ? 'Météo en temps réel (Open-Meteo)' : 'Real-time weather (Open-Meteo)'}
            </p>
            {onViewCalendar && (
              <p className="text-xs mt-1" style={{ color: 'var(--accent)' }}>
                {locale === 'fr' ? '→ Voir calendrier pour ce lac' : '→ View calendar for this lake'}
              </p>
            )}
          </button>

          {/* Fishing Score */}
          <div className="p-3 rounded-lg" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-display)' }}>
              {locale === 'fr' ? 'SCORE DE PÊCHE' : 'FISHING SCORE'}
            </div>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              🎣 {locale === 'fr' ? 'Score de pêche — Voir Calendrier pour le score du jour' : 'Fishing score — See Calendar for today\'s score'}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={onViewGear}
            className="w-full py-3 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: 'var(--accent)',
              color: 'white',
              fontFamily: 'var(--font-display)',
              letterSpacing: '0.05em',
            }}
          >
            {locale === 'fr' ? "Voir l'équipement pour cette zone →" : 'View gear for this zone →'}
          </button>
        </div>
      </div>
    </div>
  )
}
