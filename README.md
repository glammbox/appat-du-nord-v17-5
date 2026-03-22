# Appât du Nord — v15

**The #1 fishing site in Canada. Red Bull × Quebec Fishing.**

Live: https://appat-du-nord-v15.vercel.app

---

## Overview

Appât du Nord v15 is a complete Quebec freshwater fishing atlas built with React + Vite + TypeScript + Framer Motion. The design direction is "Red Bull × Quebec Fishing" — cold, kinetic, dark-water premium.

### Stack
- **Framework:** React 18 + Vite 5 + TypeScript
- **Motion:** Framer Motion 12 (kinetic slam animations on every section)
- **Maps:** React-Leaflet + OpenStreetMap (cyclemap layer, Quebec-focused)
- **Weather:** Open-Meteo API (real-time, no key required)
- **Fish ID:** OpenAI GPT-4o Vision (requires `VITE_OPENAI_API_KEY`)
- **Styling:** Tailwind CSS 3 + CSS custom properties
- **Fonts:** Bebas Neue (display) · IBM Plex Sans Condensed (UI) · Inter (body)

---

## Design System

### Color Palette
- Background abyss: `#0A0E1A`
- Primary accent (electric teal): `#00B4D8`
- Warm amber: `#F4A01C`
- Surface: `#12182B` / `#182238`

### Typography
- Display headlines: **Bebas Neue** — uppercase, aggressive, commanding
- UI labels / tabs: **IBM Plex Sans Condensed** — condensed utility
- Body / data: **Inter** — clean readable

---

## Content

- **21 Quebec freshwater species** — full bilingual encyclopedia profiles (FR/EN)
- **41 lakes + 5 major rivers** — GPS coordinates, boat launches, seasonal conditions
- **162 gear products** — sorted by species, with Amazon.ca affiliate links
- **Calendar** — 30-day fishing forecast with Open-Meteo data, real fishing scores
- **Fish Identifier** — GPT-4o Vision upload tool, identifies from 21 Quebec species

---

## The 22 Fixes (v15)

1. Species menu → single horizontal scrollable strip (all 21 in one line)
2. Arsenal redesign → fish grid first, accordion with gear-type tabs
3. Calendar → 30-day grid, compact month dropdown + region selector
4. Fish images → 21 Imagen 4.0 Ultra portraits, full body visible (no crop)
5. Guide book covers → 5 Imagen-generated premium covers
6. Guides des Espèces / Bibliothèque → header nav + footer nav
7. Fish detail → single "Voir l'arsenal →" CTA button (no lure tag clutter)
8. Fish detail → lake names are clickable links to Eaux section
9. Fish detail → all recommended gear visible (not limited to 3)
10. Fish detail → real MRNF regulation links (peche.faune.gouv.qc.ca)
11. Lake météo button → Calendar pre-set to that region
12. Lake fish links → navigate to species profile
13. HomeDescription → rewritten to fill full height, no maskinongé priority
14. Tips section → all 21 species covered
15. Lake fish accuracy → confirmed species only
16. Lake detail → richer: fishing tips, records, depth/structure notes
17. Rivers added → St. Lawrence, Outaouais, Richelieu, Saint-Maurice, Saguenay
18. Map default zoom → Quebec province with streets visible
19. Boat ramp links → verified per lake
20. GPS pin accuracy → pins on actual water bodies
21. Fish identifier → GPT-4o Vision, confidence score, species link
22. FR/EN verified → every section, every button, every label

---

## Development

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run lint       # ESLint check
npm run preview    # preview production build
```

### Environment Variables

```env
VITE_OPENAI_API_KEY=sk-...   # Required for Fish Identifier feature
```

No other API keys required.

---

## Image Assets

- Fish portraits: `/public/images/fish/` (21 species, Imagen 4.0 Ultra, `.png`)
- Guide covers: `/public/images/guides/` (5 covers, Imagen 4.0 Ultra, `.png`)
- Hero: `/public/images/hero/` (fishing-hero.jpg, fisherman-vertical.jpg)

**IMAGE CROPPING LAW:** All fish portraits use `object-fit: contain` — full subjects always visible.

---

## Deploy

```bash
bash /home/austi/.openclaw/workspace/scripts/deploy.sh appat-du-nord-v15 /home/austi/.openclaw/workspace/agents/builder/build/appat-du-nord-v15
```

---

© 2026 Appât du Nord · Made with ❤️ in Quebec 🇨🇦
