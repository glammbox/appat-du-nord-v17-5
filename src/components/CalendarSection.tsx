import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { calendarData, ActivityLevel } from '../lib/calendar'

interface DayForecast {
  date: string
  tempMaxC: number
  tempMinC: number
  precipitationMm: number
  windSpeedMaxKmh: number
  windDirectionDeg: number
  avgTempC: number
  fishingScore: number
  fishingLabel: 'Poor' | 'Fair' | 'Good' | 'Excellent'
}

function calcFishingScore(avgTemp: number, wind: number, precip: number): number {
  let score = 5
  if (avgTemp >= 12 && avgTemp <= 20) score += 2
  else if ((avgTemp >= 8 && avgTemp < 12) || (avgTemp > 20 && avgTemp <= 24)) score += 1
  else if ((avgTemp >= 4 && avgTemp < 8) || (avgTemp > 24 && avgTemp <= 27)) score += 0
  else score -= 1
  if (wind >= 8 && wind <= 20) score += 2
  else if (wind >= 21 && wind <= 30) score += 1
  else if (wind >= 5 && wind < 8) score += 0
  else if (wind >= 31 && wind <= 40) score -= 1
  else score -= 2
  if (precip >= 0 && precip <= 2) score += 1
  else if (precip > 2 && precip <= 8) score += 0
  else if (precip > 8 && precip <= 15) score -= 1
  else score -= 2
  return Math.max(1, Math.min(10, score))
}

function getFishingLabel(score: number): 'Poor' | 'Fair' | 'Good' | 'Excellent' {
  if (score <= 3) return 'Poor'
  if (score <= 5) return 'Fair'
  if (score <= 8) return 'Good'
  return 'Excellent'
}

function getScoreColor(score: number): string {
  if (score <= 3) return '#E63946'
  if (score <= 5) return '#C8A84B'
  if (score <= 8) return '#2E7D32'
  return '#C8A84B'
}

const activityColors: Record<ActivityLevel, string> = {
  HOT: '#D4261C',
  ACTIVE: '#C8A84B',
  SLOW: '#4A6A82',
  CLOSED: '#1A2E42',
}

interface WeatherRegion {
  lat: number
  lon: number
  label: string
}

const REGIONS: WeatherRegion[] = [
  { lat: 45.55, lon: -73.55, label: 'Montréal / Saint-Laurent Ouest' },
  { lat: 46.20, lon: -72.85, label: 'Sorel-Tracy / Lac Saint-Pierre' },
  { lat: 45.48, lon: -75.70, label: 'Gatineau / Rivière des Outaouais' },
  { lat: 45.45, lon: -74.00, label: 'Oka / Lac des Deux Montagnes' },
  { lat: 48.35, lon: -74.98, label: 'La Tuque / Réservoir Gouin' },
  { lat: 48.52, lon: -72.00, label: 'Roberval / Lac Saint-Jean' },
  { lat: 45.12, lon: -72.23, label: 'Magog / Lac Memphrémagog' },
  { lat: 45.05, lon: -73.12, label: 'Venise-en-Québec / Lac Champlain' },
  { lat: 45.32, lon: -73.27, label: 'Saint-Jean-sur-Richelieu' },
  { lat: 47.80, lon: -69.54, label: 'Rivière-du-Loup / Saint-Laurent Est' },
  { lat: 46.50, lon: -75.50, label: 'Gatineau / Hull' },
  { lat: 47.50, lon: -73.50, label: 'Shawinigan / Saint-Maurice' },
  { lat: 47.20, lon: -79.50, label: 'Ville-Marie / Témiscamingue' },
  { lat: 48.70, lon: -79.20, label: 'La Sarre / Abitibi' },
  { lat: 48.90, lon: -65.50, label: 'Gaspé / Côte Gaspésienne' },
]

interface CalendarSectionProps {
  locale: 'fr' | 'en'
  weatherRegion?: WeatherRegion
}

interface Weather {
  temp: number
  wind: number
  precip: number
  winddir: number
  desc: string
}

function WindDir(deg: number): string {
  const dirs = ['N','NE','E','SE','S','SO','O','NO']
  return dirs[Math.round(deg / 45) % 8]
}
function WindDirEn(deg: number): string {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

function getScore(temp: number, wind: number, month: number): number {
  let score = 5
  if ([4,5,8,9].includes(month)) score += 2
  else if ([3,6,7,10].includes(month)) score += 1
  if (temp >= 10 && temp <= 22) score += 2
  else if (temp < 5 || temp > 28) score -= 2
  if (wind < 15) score += 1
  else if (wind > 30) score -= 2
  return Math.max(1, Math.min(10, score))
}

function getBestFishingTimes(month: number): { dawn: string; dusk: string } {
  const times: Record<number, { sunrise: string; sunset: string }> = {
    0:  { sunrise: '7:30', sunset: '16:30' },
    1:  { sunrise: '7:00', sunset: '17:15' },
    2:  { sunrise: '6:30', sunset: '19:00' },
    3:  { sunrise: '6:15', sunset: '19:45' },
    4:  { sunrise: '5:45', sunset: '20:20' },
    5:  { sunrise: '5:30', sunset: '20:45' },
    6:  { sunrise: '5:45', sunset: '20:40' },
    7:  { sunrise: '6:15', sunset: '20:00' },
    8:  { sunrise: '6:50', sunset: '19:00' },
    9:  { sunrise: '7:25', sunset: '18:00' },
    10: { sunrise: '7:00', sunset: '16:45' },
    11: { sunrise: '7:30', sunset: '16:15' },
  }
  const t = times[month] || times[2]
  function addHour(time: string, h: number): string {
    const [hr, min] = time.split(':').map(Number)
    const total = hr * 60 + min + h * 60
    const newHr = Math.floor(total / 60) % 24
    const newMin = total % 60
    return `${newHr}:${newMin.toString().padStart(2, '0')}`
  }
  return { dawn: addHour(t.sunrise, 1), dusk: addHour(t.sunset, -1) }
}

// Solunar window calculation (CIA intel formula)
// Based on: moon transit (overhead) = major period, moon antitransit (underfoot) = major period
// Moonrise/moonset = minor periods. Each period ±1h for major, ±45min for minor.
interface SolunarWindow {
  start: string
  end: string
  type: 'major' | 'minor'
  label: string
  labelFr: string
}

function getSolunarWindows(date: Date): SolunarWindow[] {
  // Calculate moon age (days since new moon) using simplified formula
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const jd = 367 * year - Math.floor(7 * (year + Math.floor((month + 9) / 12)) / 4) + Math.floor(275 * month / 9) + day + 1721013.5
  const moonAge = ((jd - 2451549.5) % 29.53058867)
  const normalizedAge = moonAge < 0 ? moonAge + 29.53058867 : moonAge

  // Moon transit time — varies from ~12:00 (new moon) through the day cycle over 29.5 days
  // At new moon (age 0): moon transits at ~noon
  // At full moon (age 14.76): moon transits at ~midnight
  const transitHour = (12 + (normalizedAge / 29.53058867) * 24) % 24
  const antitransitHour = (transitHour + 12) % 24
  
  // Moonrise/moonset approximation
  // Moonrise is ~50 min later each day
  const riseHour = (6 + (normalizedAge / 29.53058867) * 24) % 24
  const setHour = (riseHour + 12.5) % 24

  function fmt(h: number): string {
    const hours = Math.floor(h)
    const minutes = Math.round((h - hours) * 60)
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  function addMinutes(h: number, min: number): string {
    const total = h * 60 + min
    const hours = Math.floor(total / 60) % 24
    const minutes = total % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  }

  const windows: SolunarWindow[] = [
    { start: addMinutes(transitHour, -60), end: addMinutes(transitHour, 60), type: 'major', label: '🔥 PEAK', labelFr: '🔥 PIC' },
    { start: addMinutes(antitransitHour, -60), end: addMinutes(antitransitHour, 60), type: 'major', label: '🔥 PEAK', labelFr: '🔥 PIC' },
    { start: addMinutes(riseHour, -45), end: addMinutes(riseHour, 45), type: 'minor', label: '✅ BON', labelFr: '✅ BON' },
    { start: addMinutes(setHour, -45), end: addMinutes(setHour, 45), type: 'minor', label: '✅ BON', labelFr: '✅ BON' },
  ]
  // Sort by start time
  return windows.sort((a, b) => a.start.localeCompare(b.start))
}

const activityEmojisFr: Record<ActivityLevel, string> = {
  HOT: '🔴 Pic',
  ACTIVE: '🟠 Actif',
  SLOW: '⚫ Lent',
  CLOSED: '⚪ Fermé',
}
const activityEmojisEn: Record<ActivityLevel, string> = {
  HOT: '🔴 Peak',
  ACTIVE: '🟠 Active',
  SLOW: '⚫ Slow',
  CLOSED: '⚪ Closed',
}

export function CalendarSection({ locale, weatherRegion }: CalendarSectionProps) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0)
  const [forecasts, setForecasts] = useState<DayForecast[]>([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  const region = weatherRegion ?? REGIONS[selectedRegionIdx]

  const monthNamesFr = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
  const monthNamesEn = ['January','February','March','April','May','June','July','August','September','October','November','December']
  const monthNames = locale === 'fr' ? monthNamesFr : monthNamesEn

  useEffect(() => {
    setLoading(true)
    setWeather(null)
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&current=temperature_2m,wind_speed_10m,wind_direction_10m,precipitation&timezone=America/Toronto`)
      .then(r => r.json())
      .then(data => {
        const c = data.current
        const temp = Math.round(c.temperature_2m)
        const wind = Math.round(c.wind_speed_10m)
        const winddir = Math.round(c.wind_direction_10m)
        const precip = c.precipitation ?? 0
        let descFr = '☀️ Clair'; let descEn = '☀️ Clear'
        if (precip > 5) { descFr = '🌧️ Pluie'; descEn = '🌧️ Rain' }
        else if (precip > 0) { descFr = '🌦️ Averses'; descEn = '🌦️ Showers' }
        else if (wind > 30) { descFr = '💨 Venteux'; descEn = '💨 Windy' }
        else if (temp < 5) { descFr = '❄️ Froid'; descEn = '❄️ Cold' }
        setWeather({ temp, wind, precip, winddir, desc: locale === 'fr' ? descFr : descEn })
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [region.lat, region.lon, locale])

  // Fetch 30-day forecast
  useEffect(() => {
    // Open-Meteo free tier: max 16 days live + can use forecast + historical (past) to simulate 30-day range
    // We fetch 16 days forward and show 16 cards (best available with free tier)
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${region.lat}&longitude=${region.lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,wind_direction_10m_dominant&timezone=America/Toronto&forecast_days=16`
    fetch(url)
      .then(r => r.json())
      .then(data => {
        const d = data.daily
        if (!d) return
        const days: DayForecast[] = d.time.map((date: string, i: number) => {
          const tempMaxC = d.temperature_2m_max[i] ?? 10
          const tempMinC = d.temperature_2m_min[i] ?? 5
          const precipitationMm = d.precipitation_sum[i] ?? 0
          const windSpeedMaxKmh = d.wind_speed_10m_max[i] ?? 15
          const windDirectionDeg = d.wind_direction_10m_dominant[i] ?? 180
          const avgTempC = (tempMaxC + tempMinC) / 2
          const fishingScore = calcFishingScore(avgTempC, windSpeedMaxKmh, precipitationMm)
          return {
            date,
            tempMaxC: Math.round(tempMaxC),
            tempMinC: Math.round(tempMinC),
            precipitationMm: Math.round(precipitationMm * 10) / 10,
            windSpeedMaxKmh: Math.round(windSpeedMaxKmh),
            windDirectionDeg,
            avgTempC: Math.round(avgTempC * 10) / 10,
            fishingScore,
            fishingLabel: getFishingLabel(fishingScore),
          }
        })
        setForecasts(days)
      })
      .catch(() => {})
  }, [region.lat, region.lon])

  const now = new Date()
  const todayMonth = now.getMonth()
  const fishingScore = weather ? getScore(weather.temp, weather.wind, todayMonth) : null
  const bestTimes = getBestFishingTimes(todayMonth)
  const solunarWindows = getSolunarWindows(now)
  const activityEmojis = locale === 'fr' ? activityEmojisFr : activityEmojisEn
  const month = calendarData[selectedMonth]
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 72, scale: 0.985 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem 3rem' }}
    >
      {/* Header row: title + selectors on one line */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: 'var(--accent)',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          marginBottom: '0.5rem',
        }}>
          {locale === 'fr' ? 'Météo & prévisions de pêche' : 'Weather & Fishing Forecast'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          marginBottom: '0.5rem',
        }}>
          {locale === 'fr' ? 'CONDITIONS & CALENDRIER' : 'CONDITIONS & CALENDAR'}
        </h2>
        <div style={{ fontSize: '0.85rem', color: 'var(--accent)', fontFamily: 'var(--font-display)', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          {new Date().toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
          }).toUpperCase()}
        </div>

        {/* Region + Month selectors on ONE line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            {locale === 'fr' ? '📍 Région:' : '📍 Region:'}
          </span>
          {!weatherRegion ? (
            <select
              value={selectedRegionIdx}
              onChange={e => setSelectedRegionIdx(Number(e.target.value))}
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                borderRadius: '4px',
                padding: '0.3rem 0.6rem',
                fontSize: '0.78rem',
                fontFamily: 'var(--font-body)',
                cursor: 'pointer',
                maxWidth: '240px',
              }}
            >
              {REGIONS.map((r, i) => (
                <option key={i} value={i}>{r.label}</option>
              ))}
            </select>
          ) : (
            <span style={{ color: 'var(--accent)', fontSize: '0.78rem', fontWeight: 600 }}>{region.label}</span>
          )}

          {/* Month dropdown — compact, beside region */}
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: '0.5rem' }}>
            {locale === 'fr' ? '📅 Mois:' : '📅 Month:'}
          </span>
          <select
            value={selectedMonth}
            onChange={e => setSelectedMonth(Number(e.target.value))}
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              borderRadius: '4px',
              padding: '0.3rem 0.6rem',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-body)',
              cursor: 'pointer',
              minWidth: '140px',
            }}
          >
            {monthNames.map((name, i) => (
              <option key={i} value={i}>
                {name}{i === todayMonth ? (locale === 'fr' ? ' ← Aujourd\'hui' : ' ← Today') : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Live weather dashboard */}
      {loading ? (
        <div style={{ padding: '1.25rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', marginBottom: '1.25rem', color: 'var(--text-muted)', textAlign: 'center', fontSize: '0.85rem' }}>
          {locale === 'fr' ? 'Chargement des conditions météo...' : 'Loading weather conditions...'}
        </div>
      ) : weather ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {locale === 'fr' ? 'Température' : 'Temperature'}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{weather.temp}°C</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{weather.desc}</div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {locale === 'fr' ? 'Vent' : 'Wind'}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: weather.wind > 30 ? '#D4261C' : 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{weather.wind} km/h</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {locale === 'fr' ? `Direction ${WindDir(weather.winddir)}` : `Direction ${WindDirEn(weather.winddir)}`}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {locale === 'fr' ? 'Précipitation' : 'Precipitation'}
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{weather.precip} mm</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {weather.precip === 0 ? (locale === 'fr' ? 'Sec' : 'Dry') : (locale === 'fr' ? 'Précipitation actuelle' : 'Current precipitation')}
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.8rem', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {locale === 'fr' ? 'Meilleure heure de pêche' : 'Best fishing time'}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>
              🌅 {bestTimes.dawn} · 🌆 {bestTimes.dusk}
            </div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>
              {locale === 'fr' ? 'Aube · Crépuscule' : 'Dawn · Dusk'}
            </div>
          </div>
          {/* Solunar windows — full width */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '0.8rem', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              {locale === 'fr' ? 'Fenêtres solunar' : 'Solunar Windows'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {solunarWindows.map((w, i) => (
                <div key={i} style={{
                  padding: '0.3rem 0.65rem',
                  borderRadius: '4px',
                  background: w.type === 'major' ? 'rgba(230,57,70,0.15)' : 'rgba(0,180,216,0.10)',
                  border: `1px solid ${w.type === 'major' ? 'rgba(230,57,70,0.4)' : 'rgba(0,180,216,0.3)'}`,
                  display: 'flex',
                  gap: '0.4rem',
                  alignItems: 'center',
                }}>
                  <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.68rem', fontWeight: 700, color: w.type === 'major' ? '#E63946' : 'var(--accent)', letterSpacing: '0.1em' }}>
                    {locale === 'fr' ? w.labelFr : w.label}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                    {w.start}–{w.end}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Fishing score — full width */}
          <div style={{ background: 'var(--surface)', border: `2px solid ${fishingScore! >= 7 ? '#D4261C' : 'var(--border)'}`, borderRadius: '6px', padding: '0.8rem', textAlign: 'center', gridColumn: 'span 2' }}>
            <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              {locale === 'fr' ? "Score de pêche aujourd'hui" : "Today's fishing score"}
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: fishingScore! >= 7 ? '#D4261C' : fishingScore! >= 5 ? 'var(--accent-gold)' : 'var(--text-secondary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
              {fishingScore}/10
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {locale === 'fr'
                ? (fishingScore! >= 8 ? '🔥 Excellent — sortez ce soir!' : fishingScore! >= 6 ? '✅ Bon — conditions favorables' : fishingScore! >= 4 ? '⚠️ Moyen — essayez tôt le matin' : '❌ Difficile — attendez de meilleures conditions')
                : (fishingScore! >= 8 ? '🔥 Excellent — get out tonight!' : fishingScore! >= 6 ? '✅ Good — favorable conditions' : fishingScore! >= 4 ? '⚠️ Average — try early morning' : '❌ Difficult — wait for better conditions')}
            </div>
          </div>
        </div>
      ) : (
        <div style={{ padding: '1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', marginBottom: '1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
          {locale === 'fr' ? 'Conditions météo temporairement indisponibles' : 'Weather conditions temporarily unavailable'}
        </div>
      )}

      {/* 30-Day Forecast Grid */}
      {forecasts.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>
            {locale === 'fr' ? `PRÉVISIONS ${forecasts.length} JOURS` : `${forecasts.length}-DAY FORECAST`}
          </h3>
          {/* Scrollable row of day cards */}
          <div style={{ display: 'flex', gap: '0.4rem', overflowX: 'auto', paddingBottom: '0.5rem', scrollbarWidth: 'thin', scrollbarColor: '#C0392B #1a1a1a' }}>
            {forecasts.map((day, i) => {
              const dateObj = new Date(day.date + 'T12:00:00')
              const dayName = dateObj.toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', { weekday: 'short' })
              const dayNum = dateObj.getDate()
              const scoreColor = getScoreColor(day.fishingScore)
              const isSelected = selectedDay === i
              return (
                <button
                  key={day.date}
                  onClick={() => setSelectedDay(i)}
                  style={{
                    flexShrink: 0,
                    minWidth: '68px',
                    padding: '0.5rem 0.4rem',
                    borderRadius: '6px',
                    background: isSelected ? 'var(--surface)' : 'var(--bg-elevated)',
                    border: isSelected ? `2px solid ${scoreColor}` : '1px solid var(--border)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>
                    {i === 0 ? (locale === 'fr' ? "Auj." : 'Today') : dayName}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: '0.1rem' }}>
                    {dayNum}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-primary)', marginTop: '0.15rem' }}>
                    {day.tempMaxC}°/{day.tempMinC}°
                  </div>
                  {/* Fishing score dot */}
                  <div style={{
                    marginTop: '0.25rem',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: scoreColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0.3rem auto 0',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    color: 'white',
                    fontFamily: 'var(--font-display)',
                  }}>
                    {day.fishingScore}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Legend row */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { label: locale === 'fr' ? 'Mauvais' : 'Poor', color: '#E63946' },
              { label: locale === 'fr' ? 'Moyen' : 'Fair', color: '#C8A84B' },
              { label: locale === 'fr' ? 'Bon' : 'Good', color: '#2E7D32' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.color }} />
                <span style={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Selected day detail */}
          {forecasts[selectedDay] && (
            <div style={{ marginTop: '0.75rem', padding: '0.75rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {new Date(forecasts[selectedDay].date + 'T12:00:00').toLocaleDateString(locale === 'fr' ? 'fr-CA' : 'en-CA', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>
              {[
                { label: locale === 'fr' ? 'Temp max' : 'Temp max', value: `${forecasts[selectedDay].tempMaxC}°C` },
                { label: locale === 'fr' ? 'Temp min' : 'Temp min', value: `${forecasts[selectedDay].tempMinC}°C` },
                { label: locale === 'fr' ? 'Vent max' : 'Max wind', value: `${forecasts[selectedDay].windSpeedMaxKmh} km/h` },
                { label: locale === 'fr' ? 'Précip.' : 'Precip.', value: `${forecasts[selectedDay].precipitationMm} mm` },
                { label: locale === 'fr' ? 'Score pêche' : 'Fish score', value: `${forecasts[selectedDay].fishingScore}/10` },
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stat.label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>{stat.value}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Monthly Calendar — using compact dropdown already set above */}
      <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '1.1rem', marginBottom: '0.6rem' }}>
        {locale === 'fr'
          ? `CALENDRIER — ${(locale === 'fr' ? monthNamesFr : monthNamesEn)[selectedMonth].toUpperCase()}`
          : `CALENDAR — ${monthNamesEn[selectedMonth].toUpperCase()}`}
      </h3>

      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '6px', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {month.iceStatus} · {month.waterTemp}
          </div>
          {selectedMonth === todayMonth && (
            <span style={{ fontSize: '0.65rem', background: 'rgba(212,38,28,0.15)', color: '#D4261C', padding: '0.15rem 0.5rem', borderRadius: '3px', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
              {locale === 'fr' ? "● CE MOIS" : '● THIS MONTH'}
            </span>
          )}
        </div>
        {month.notes && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.75rem', fontStyle: 'italic' }}>
            {month.notes}
          </p>
        )}
        {/* Activity dots — compact single line */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {month.activities.map(({ species: fish, level }) => (
            <div key={fish} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.3rem 0.5rem', background: 'var(--bg-raised)', borderRadius: '6px' }}>
              <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', fontSize: '0.82rem' }}>{fish}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: activityColors[level], flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-condensed)', fontSize: '0.62rem', fontWeight: 700, color: activityColors[level], whiteSpace: 'nowrap', letterSpacing: '0.1em' }}>
                  {activityEmojis[level]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
