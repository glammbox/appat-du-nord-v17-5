import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import Lenis from 'lenis'

import { SiteHeader } from './components/SiteHeader'
import { Hero } from './components/Hero'
import { HomeDescription } from './components/HomeDescription'
import { SiteFooter } from './components/SiteFooter'
import { useToast } from './components/Toast'
import { BoutiqueTeaser } from './components/BoutiqueTeaser'
import { CartDrawer } from './components/CartDrawer'
import { TWENTYFIRST_COMPONENT_MAP, TWENTYFIRST_STRICT_COMPLIANCE } from './lib/twentyfirst'

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
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, 50)
}

function App() {
  void TWENTYFIRST_COMPONENT_MAP
  void TWENTYFIRST_STRICT_COMPLIANCE

  const [gearSpeciesFilter, setGearSpeciesFilter] = useState<string | undefined>(undefined)
  const [locale, setLocale] = useState<Locale>('fr')
  const [weatherRegion, setWeatherRegion] = useState<WeatherRegion | undefined>(undefined)
  const [cartCount, setCartCount] = useState(0)
  const [cartOpen, setCartOpen] = useState(false)

  // Lenis smooth scroll
  const lenisRef = useRef<Lenis | null>(null)
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.1,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.9,
    })
    lenisRef.current = lenis
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    const rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Pause/resume Lenis when cart drawer is open (prevents scroll-through on mobile)
  useEffect(() => {
    if (cartOpen) {
      lenisRef.current?.stop()
      document.body.style.overflow = 'hidden'
    } else {
      lenisRef.current?.start()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen])
  const [activeSpecies, setActiveSpecies] = useState<string | undefined>(undefined)
  const [activeSection, setActiveSection] = useState<string>('especes')
  const [route, setRoute] = useState<'home' | 'boutique'>(() => window.location.pathname === '/boutique' ? 'boutique' : 'home')
  const { showToast, ToastComponent } = useToast()

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

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname === '/boutique' ? 'boutique' : 'home')
    window.addEventListener('popstate', syncRoute)
    syncRoute()
    return () => window.removeEventListener('popstate', syncRoute)
  }, [])

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('appat-cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
  }, [])

  const goToRoute = (next: 'home' | 'boutique') => {
    if (next === 'boutique') setGearSpeciesFilter(undefined)  // always clear filter on direct boutique nav
    const path = next === 'boutique' ? '/boutique' : '/'
    window.history.pushState({}, '', path)
    setRoute(next)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSectionSelect = (section: string) => {
    if (route !== 'home') {
      goToRoute('home')
      setTimeout(() => {
        const id = SECTION_IDS[section as keyof typeof SECTION_IDS]
        if (id) scrollToSection(id)
      }, 80)
      return
    }
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

  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    const cart = JSON.parse(localStorage.getItem('appat-cart') || '[]')
    const existing = cart.find((item: { id: string; qty: number }) => item.id === product.id)
    if (existing) existing.qty += 1
    else cart.push({ ...product, qty: 1 })
    localStorage.setItem('appat-cart', JSON.stringify(cart))
    setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
    showToast(locale === 'fr' ? `"${product.name}" ajouté au panier!` : `"${product.name}" added to cart!`)
  }

  const syncCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('appat-cart') || '[]')
    setCartCount(cart.reduce((sum: number, item: { qty: number }) => sum + item.qty, 0))
  }

  const handleLocaleToggle = () => {
    setLocale(l => (l === 'fr' ? 'en' : 'fr'))
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text-primary)' }}>

      {/* Cart Drawer — slides from right */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        locale={locale}
        onCartChange={syncCartCount}
      />

      {/* Fix 1: Brand left-side logo is in Hero.tsx — only ONE instance */}
      <SiteHeader
        locale={locale}
        onLocaleToggle={handleLocaleToggle}
        cartCount={cartCount}
        onCartClick={() => setCartOpen(true)}
        onSectionSelect={handleSectionSelect}
        activeSection={activeSection}
        onBoutiqueClick={() => goToRoute(route === 'boutique' ? 'home' : 'boutique')}
        currentRoute={route}
      />

      {route === 'home' ? (
        <>
          <Hero locale={locale} onSectionSelect={handleSectionSelect} />
          <HomeDescription locale={locale} />
          <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border), transparent)', margin: '0 2rem' }} />

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

          <section id={SECTION_IDS.calendrier} style={{ scrollMarginTop: '80px' }}>
            <Suspense fallback={<LoadingSection />}>
              <CalendarSection locale={locale} weatherRegion={weatherRegion} />
            </Suspense>
          </section>

          <section id={SECTION_IDS.guides} style={{ scrollMarginTop: '80px' }}>
            <Suspense fallback={<LoadingSection />}>
              <GuidesSection locale={locale} onViewArsenal={(id) => handleScrollToArsenal(id)} />
            </Suspense>
          </section>

          <section id={SECTION_IDS.tournois} style={{ scrollMarginTop: '80px' }}>
            <Suspense fallback={<LoadingSection />}>
              <TournamentSection locale={locale} />
            </Suspense>
          </section>

          {/* Fix 3 — Boutique teaser on main page: ONE CTA only, no species cards */}
          <section id={SECTION_IDS.arsenal} style={{ scrollMarginTop: '80px' }}>
            <BoutiqueTeaser
              locale={locale}
              onNavigateBoutique={() => goToRoute('boutique')}
            />
          </section>
        </>
      ) : (
        <section id="section-boutique" style={{ scrollMarginTop: '80px' }}>
          <Suspense fallback={<LoadingSection />}>
            <GearSection
              key={`boutique-${gearSpeciesFilter ?? 'all'}`}
              initialSpeciesFilter={gearSpeciesFilter}
              onAddToCart={handleAddToCart}
              locale={locale}
              isBoutiquePage
              onNavigateBoutique={() => goToRoute('home')}
            />
          </Suspense>
        </section>
      )}

      <SiteFooter locale={locale} onSectionSelect={handleSectionSelect} />
      {ToastComponent}
    </div>
  )
}

export default App
