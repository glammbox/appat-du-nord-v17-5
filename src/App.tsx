import { useState, useRef, useEffect, lazy, Suspense } from 'react'
import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/Hero'
import { HomeDescription } from './components/HomeDescription'
import { SiteFooter } from './components/SiteFooter'
import { useToast } from './components/Toast'

// Lazy-load all heavy sections to prevent startup crashes
const GuidesSection = lazy(() => import('./components/GuidesSection').then(m => ({ default: m.GuidesSection })))
const WatersMap = lazy(() => import('./components/WatersMap').then(m => ({ default: m.WatersMap })))
const SpeciesSection = lazy(() => import('./components/SpeciesSection').then(m => ({ default: m.SpeciesSection })))
const CalendarSection = lazy(() => import('./components/CalendarSection').then(m => ({ default: m.CalendarSection })))
const GearSection = lazy(() => import('./components/GearSection').then(m => ({ default: m.GearSection })))
const TournamentSection = lazy(() => import('./components/TournamentSection').then(m => ({ default: m.TournamentSection })))

type Locale = 'fr' | 'en'

interface WeatherRegion {
  lat: number
  lon: number
  label: string
}

const LoadingSection = () => (
  <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>
    Chargement...
  </div>
)

// Section ids for smooth scrolling
const SECTION_IDS = {
  especes: 'section-especes',
  eaux: 'section-eaux',
  calendrier: 'section-calendrier',
  guides: 'section-guides',
  tournois: 'section-tournois',
  arsenal: 'section-arsenal',
}

function scrollToSection(id: string) {
  setTimeout(() => {
    const el = document.getElementById(id)
    if (el) {
      const offset = 80 // sticky header height
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 50)
}

function App() {
  const [gearSpeciesFilter, setGearSpeciesFilter] = useState<string | undefined>(undefined)
  const [locale, setLocale] = useState<Locale>('fr')
  const [weatherRegion, setWeatherRegion] = useState<WeatherRegion | undefined>(undefined)
  const [cartCount, setCartCount] = useState(0)
  const [activeSpecies, setActiveSpecies] = useState<string | undefined>(undefined)
  const [activeSection, setActiveSection] = useState<string>('especes')
  const { showToast, ToastComponent } = useToast()

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = Object.entries(SECTION_IDS)
      for (const [key, id] of sectionIds.reverse()) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(key)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionSelect = (section: string) => {
    const id = SECTION_IDS[section as keyof typeof SECTION_IDS]
    if (id) scrollToSection(id)
  }

  const handleScrollToArsenal = (speciesId: string) => {
    setGearSpeciesFilter(speciesId)
    scrollToSection(SECTION_IDS.arsenal)
  }

  const handleScrollToWater = (waterId: string) => {
    sessionStorage.setItem('appat-select-water', waterId)
    scrollToSection(SECTION_IDS.eaux)
  }

  const handleLakeMeteoCal = (region: WeatherRegion) => {
    setWeatherRegion(region)
    scrollToSection(SECTION_IDS.calendrier)
  }

  // Shopify-ready cart with localStorage
  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    const cart = JSON.parse(localStorage.getItem('appat-cart') || '[]')
    const existing = cart.find((item: { id: string; qty: number }) => item.id === product.id)
    if (existing) {
      existing.qty += 1
    } else {
      cart.push({ ...product, qty: 1 })
    }
    localStorage.setItem('appat-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
    showToast(locale === 'fr' ? `"${product.name}" ajouté au panier!` : `"${product.name}" added to cart!`)
  }

  const handleLocaleToggle = () => {
    setLocale(l => l === 'fr' ? 'en' : 'fr')
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <SiteHeader
        locale={locale}
        onLocaleToggle={handleLocaleToggle}
        cartCount={cartCount}
        onSectionSelect={handleSectionSelect}
        activeSection={activeSection}
      />
      
      {/* Hero */}
      <Hero locale={locale} onSectionSelect={handleSectionSelect} />
      
      {/* HomeDescription */}
      <HomeDescription locale={locale} />

      {/* Section divider */}
      <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', margin: '0 2rem' }} />

      {/* Section 3 — Espèces */}
      <section id={SECTION_IDS.especes} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <SpeciesSection
            onScrollToArsenal={handleScrollToArsenal}
            locale={locale}
            initialSpecies={activeSpecies}
            onScrollToWater={handleScrollToWater}
          />
        </Suspense>
      </section>

      {/* Section 4 — Eaux */}
      <section id={SECTION_IDS.eaux} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <WatersMap
            onViewGear={() => scrollToSection(SECTION_IDS.arsenal)}
            locale={locale}
            onRegionChange={(region) => setWeatherRegion(region)}
            onViewSpecies={(id) => {
              setActiveSpecies(id)
              scrollToSection(SECTION_IDS.especes)
            }}
            onViewCalendar={handleLakeMeteoCal}
          />
        </Suspense>
      </section>

      {/* Section 5 — Calendrier / Prévisions */}
      <section id={SECTION_IDS.calendrier} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <CalendarSection locale={locale} weatherRegion={weatherRegion} />
        </Suspense>
      </section>

      {/* Section 6 — Guides des Espèces */}
      <section id={SECTION_IDS.guides} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <GuidesSection locale={locale} onViewArsenal={(id) => handleScrollToArsenal(id)} />
        </Suspense>
      </section>

      {/* Section 7 — Tournois */}
      <section id={SECTION_IDS.tournois} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <TournamentSection locale={locale} />
        </Suspense>
      </section>

      {/* Section 8 — Arsenal */}
      <section id={SECTION_IDS.arsenal} style={{ scrollMarginTop: '80px' }}>
        <Suspense fallback={<LoadingSection />}>
          <GearSection
            key={gearSpeciesFilter ?? 'all'}
            initialSpeciesFilter={gearSpeciesFilter}
            onAddToCart={handleAddToCart}
            locale={locale}
          />
        </Suspense>
      </section>

      {/* Footer */}
      <SiteFooter
        locale={locale}
        onSectionSelect={handleSectionSelect}
      />
      
      {ToastComponent}
    </div>
  )
}

export default App
