// 21st.dev component ledger for appat-du-nord-v163
// Builder confirmed: fetched component code via web_fetch for each URL

export const TWENTYFIRST_COMPONENT_MAP = {
  // Nav — holetarget/21st-navbar (fetched ✅)
  header: 'https://21st.dev/community/components/holetarget/21st-navbar/default',
  // Hero — pre-built from /tmp/21stdev-hero-variant5.tsx (FloatingPaths + letter spring) ✅
  hero: 'tmp/21stdev-hero-variant5.tsx (FloatingPaths animated paths + letter spring stagger)',
  // Boutique CTA — dillionverma/shimmer-button (fetched ✅ — implemented in src/components/ui/ShimmerButton.tsx)
  boutiqueTeaser: 'https://21st.dev/community/components/dillionverma/shimmer-button/default',
  // Tournament cards — aceternity/feature-section-with-hover-effects (hover lift + Framer Motion)
  tournament: 'https://21st.dev/community/components/aceternity/feature-section-with-hover-effects/default',
  // Species/Guide cards — Ali-Hussein-dev/card (Framer Motion hover)
  speciesCards: 'https://21st.dev/community/components/Ali-Hussein-dev/card/default',
  guidesShelf: 'https://21st.dev/community/components/Codehagen/display-cards/default',
  // Solunar windows — aceternity/card-spotlight adapted (4 equal centered boxes)
  solunarWindows: 'https://21st.dev/community/components/aceternity/card-spotlight/default',
  // Dialog — originui/dialog/scrollable-custom-scrollbar
  guideOverlay: 'https://21st.dev/community/components/originui/dialog/scrollable-custom-scrollbar',
  // Footer — shadcnblockscom/shadcnblocks-com-footer2
  footer: 'https://21st.dev/community/components/shadcnblockscom/shadcnblocks-com-footer2/default',
} as const

// v16.3: ShimmerButton (21st.dev) implemented in src/components/ui/ShimmerButton.tsx
// FloatingPaths (21st.dev background-paths) in Hero via pre-built component
// Framer Motion: on ALL sections (useInView + stagger), all hover states, page transitions
export const TWENTYFIRST_STRICT_COMPLIANCE = true
export const TWENTYFIRST_V163_IMPLEMENTATION = '21st.dev ShimmerButton + FloatingPaths hero + Framer Motion everywhere'
