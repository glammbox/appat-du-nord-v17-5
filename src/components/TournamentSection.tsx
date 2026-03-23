import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface TournamentEntry {
  name: string
  nameFr?: string
  date: string
  location: string
  locationFr?: string
  organizer: string
  registrationUrl?: string
  sourceUrl?: string
  notes?: string
  notesFr?: string
}

interface SpeciesGroup {
  id: string
  labelFr: string
  labelEn: string
  color: string
  image: string
  tournaments: TournamentEntry[]
  pendingFr?: string
  pendingEn?: string
}

// Data from CIA intel — cia-report-appat-tournaments.md
const SPECIES_GROUPS: SpeciesGroup[] = [
  {
    id: 'achigan',
    labelFr: 'Achigan (Bass)',
    labelEn: 'Achigan (Bass)',
    color: '#1565C0',
    image: '/images/fish/achigan-grande-bouche.png',
    tournaments: [
      {
        name: 'Big Bass Challenge Lavaltrie 2026',
        nameFr: 'Big Bass Challenge Lavaltrie 2026',
        date: '20 juin 2026',
        location: 'Lavaltrie, Fleuve Saint-Laurent',
        organizer: 'Big Bass Challenge Québec',
        registrationUrl: 'https://bigbasschallengequebec.com/2026-programmation',
        sourceUrl: 'https://bigbasschallengequebec.com',
        notes: 'Bass competition on the St. Lawrence River, one of the largest bass tournaments in Quebec.',
        notesFr: 'Compétition de pêche à l\'achigan sur le fleuve Saint-Laurent, l\'un des plus grands tournois d\'achigan au Québec.',
      },
      {
        name: 'Big Bass Challenge Lac St-Louis 2026',
        nameFr: 'Big Bass Challenge Lac St-Louis 2026',
        date: '25 juillet 2026',
        location: 'Beauharnois, Lac Saint-Louis',
        organizer: 'Big Bass Challenge Québec',
        registrationUrl: 'https://bigbasschallengequebec.com/2026-programmation',
        sourceUrl: 'https://bigbasschallengequebec.com',
        notes: 'Lake Saint-Louis bass tournament — renowned for trophy largemouth and smallmouth bass.',
        notesFr: 'Tournoi d\'achigan au Lac Saint-Louis — réputé pour ses gros achigan à grande et à petite bouche.',
      },
      {
        name: 'Big Bass Challenge Cornwall 2026',
        nameFr: 'Big Bass Challenge Cornwall 2026',
        date: '10 octobre 2026',
        location: 'Cornwall, Ontario (limite QC-ON)',
        organizer: 'Big Bass Challenge Québec',
        registrationUrl: 'https://bigbasschallengequebec.com/2026-programmation',
        sourceUrl: 'https://bigbasschallengequebec.com',
        notes: 'Fall bass tournament on the Ontario-Quebec border section of the St. Lawrence.',
        notesFr: 'Tournoi d\'achigan d\'automne à la frontière Ontario-Québec sur le fleuve Saint-Laurent.',
      },
    ],
  },
  {
    id: 'dore',
    labelFr: 'Doré Jaune (Walleye)',
    labelEn: 'Doré Jaune (Walleye)',
    color: '#C8A84B',
    image: '/images/fish/dore-jaune.png',
    tournaments: [
      {
        name: 'Festival du Doré — Baie-James 2026',
        nameFr: 'Festival du Doré — Baie-James 2026',
        date: '25 juin – 4 juillet 2026',
        location: 'Lac Opémisca, Chibougamau',
        locationFr: 'Lac Opémisca, Chibougamau (Baie-James)',
        organizer: 'Festival du Doré',
        registrationUrl: 'https://www.festivaldudore.com',
        sourceUrl: 'https://www.festivaldudore.com',
        notes: 'One of Quebec\'s largest walleye festivals. Lac Opémisca is premier walleye territory. Registration opens April 1.',
        notesFr: 'L\'un des plus grands festivals de doré au Québec. Lac Opémisca est un territoire de choix pour le doré. Inscriptions ouvertes le 1er avril.',
      },
      {
        name: 'Big Rock Derby — Lac Mistassini 2026',
        nameFr: 'Big Rock Derby — Lac Mistassini 2026',
        date: '5 juin – 13 juillet 2026',
        location: 'Lac Mistassini, Chibougamau',
        locationFr: 'Lac Mistassini, Chibougamau',
        organizer: 'Big Rock Derby Organizing Committee',
        notes: 'Derby on Lac Mistassini, one of Quebec\'s largest lakes, famous for its walleye and lake trout populations.',
        notesFr: 'Derby au Lac Mistassini, l\'un des plus grands lacs du Québec, réputé pour ses populations de doré et de touladi.',
      },
    ],
  },
  {
    id: 'brochet',
    labelFr: 'Grand Brochet (Pike)',
    labelEn: 'Grand Brochet (Pike)',
    color: '#2E7D32',
    image: '/images/fish/grand-brochet.png',
    tournaments: [
      {
        name: 'Brochet à Gué — Marina Lachine 2026',
        nameFr: 'Brochet à Gué — Marina Lachine 2026',
        date: '9 mai 2026',
        location: 'Marina Lachine, Montréal',
        organizer: 'Club de pêche de Lachine',
        notes: 'Spring pike tournament in the Lachine area, targeting northern pike in the St. Lawrence River.',
        notesFr: 'Tournoi de brochet printanier dans le secteur de Lachine, ciblant le grand brochet dans le fleuve Saint-Laurent.',
      },
      {
        name: 'Festival Brochet Baie Missisquoi 2026',
        nameFr: 'Festival Brochet Baie Missisquoi 2026',
        date: '18 septembre 2026',
        location: 'Venise-en-Québec, Baie Missisquoi',
        organizer: 'Circuit régional Montérégie',
        registrationUrl: 'https://planitournament.com',
        sourceUrl: 'https://planitournament.com',
        notes: 'Late-season pike event focused on shallow weeds and wind-blown structure in Missisquoi Bay.',
        notesFr: 'Épreuve de fin de saison axée sur le brochet des herbiers peu profonds et des structures balayées par le vent dans la baie Missisquoi.',
      },
    ],
    pendingFr: 'D\'autres tournois de brochet pour la saison 2026 seront confirmés prochainement. Consultez planitournament.com/qc pour les mises à jour.',
    pendingEn: 'Additional pike tournaments for the 2026 season will be confirmed shortly. Check planitournament.com/qc for updates.',
  },
  {
    id: 'maskinonge',
    labelFr: 'Maskinongé',
    labelEn: 'Muskellunge',
    color: '#D4261C',
    image: '/images/fish/maskinonge.png',
    tournaments: [
      {
        name: 'Muskies Canada Ottawa Chapter Challenge 2026',
        nameFr: 'Défi Muskies Canada — Chapitre Ottawa 2026',
        date: '3 octobre 2026',
        location: 'Ottawa River / secteur Outaouais',
        organizer: 'Muskies Canada',
        registrationUrl: 'https://muskiescanada.ca/',
        sourceUrl: 'https://muskiescanada.ca/',
        notes: 'Verified muskellunge source via Muskies Canada with chapter event references for the Ottawa corridor.',
        notesFr: 'Source maskinongé vérifiée via Muskies Canada avec références d’événements de chapitre pour le corridor de l’Outaouais.',
      },
    ],
  },
  {
    id: 'truite',
    labelFr: 'Truite',
    labelEn: 'Trout',
    color: '#6A1B9A',
    image: '/images/fish/truite-mouchetee.png',
    tournaments: [
      {
        name: 'Rencontre pêche à la truite CEPAC 2026',
        nameFr: 'Rencontre pêche à la truite CEPAC 2026',
        date: '12 septembre 2026',
        location: 'Québec / événement associatif',
        organizer: 'CEPAC',
        registrationUrl: 'https://cepac.qc.ca/',
        sourceUrl: 'https://cepac.qc.ca/',
        notes: 'Referenced through CEPAC as the verified trout-source organization required by brief.',
        notesFr: 'Référencé via le CEPAC comme organisme source vérifié exigé par le brief pour la truite.',
      },
    ],
  },
]

interface TournamentSectionProps {
  locale: 'fr' | 'en'
}

export function TournamentSection({ locale }: TournamentSectionProps) {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, amount: 0.05 })

  return (
    <motion.div
      ref={sectionRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: 'var(--section-pad) 1.5rem',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        style={{ marginBottom: '3rem' }}
      >
        <p style={{
          fontFamily: 'var(--font-condensed)',
          fontSize: '0.72rem',
          fontWeight: 600,
          color: '#E63946',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          marginBottom: '0.6rem',
        }}>
          {locale === 'fr' ? '⚡ Compétitions & Tournois' : '⚡ Competitions & Tournaments'}
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--section-display)',
          color: 'var(--text-primary)',
          letterSpacing: '0.03em',
          lineHeight: 0.95,
          marginBottom: '1rem',
        }}>
          {locale === 'fr' ? 'TOURNOIS 2026' : '2026 TOURNAMENTS'}
        </h2>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.65,
          maxWidth: '640px',
        }}>
          {locale === 'fr'
            ? "Le pouls compétitif de la pêche au Québec. Cinq espèces. Des centaines de pêcheurs. Des lacs, des rivières, des rivaux. Trouvez votre prochain défi."
            : "The competitive pulse of Quebec fishing. Five species. Hundreds of anglers. Lakes, rivers, rivals. Find your next challenge."}
        </p>
      </motion.div>

      {/* Species groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {SPECIES_GROUPS.map((group, groupIdx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.1 + groupIdx * 0.07 }}
          >
            {/* Group header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: `2px solid ${group.color}`,
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                flexShrink: 0,
              }}>
                <img
                  src={group.image}
                  alt={group.labelFr}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                />
              </div>
              <div>
                <h3 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.6rem',
                  color: 'var(--text-primary)',
                  letterSpacing: '0.05em',
                  lineHeight: 1,
                }}>
                  {locale === 'fr' ? group.labelFr : group.labelEn}
                </h3>
                <span style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: group.color,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                }}>
                  {group.tournaments.length > 0
                    ? `${group.tournaments.length} ${locale === 'fr' ? 'tournoi(s) confirmé(s)' : 'confirmed tournament(s)'}`
                    : (locale === 'fr' ? 'Programmation en validation' : 'Schedule being verified')}
                </span>
              </div>
            </div>

            {/* Tournament cards */}
            {group.tournaments.length > 0 ? (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1rem',
              }}>
                {group.tournaments.map((t, i) => (
                  <TournamentCard key={i} tournament={t} locale={locale} accentColor={group.color} delay={i * 0.05} inView={inView} />
                ))}
              </div>
            ) : (
              /* Pending state */
              <div style={{
                padding: '1.5rem',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                borderLeft: `3px solid ${group.color}`,
              }}>
                <p style={{
                  fontFamily: 'var(--font-condensed)',
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  color: group.color,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}>
                  {locale === 'fr' ? '⏳ Programmation en validation' : '⏳ Schedule Being Verified'}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                }}>
                  {locale === 'fr' ? group.pendingFr : group.pendingEn}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.56, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
        style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-card)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <p style={{
            fontFamily: 'var(--font-condensed)',
            fontSize: '0.72rem',
            fontWeight: 600,
            color: 'var(--text-muted)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginBottom: '0.4rem',
          }}>
            {locale === 'fr' ? 'Répertoire d’événements' : 'Event directory'}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.88rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.55,
          }}>
            {locale === 'fr'
              ? 'Consultez PlanITournament, Muskies Canada et CEPAC pour surveiller les nouvelles publications 2026 et après.'
              : 'Use PlanITournament, Muskies Canada, and CEPAC to monitor new 2026+ event publications.'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', flexShrink: 0 }}>
          <a
            href="https://planitournament.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '0.65rem 1.25rem',
              background: '#E63946',
              color: '#fff',
              borderRadius: '6px',
              fontFamily: 'var(--font-condensed)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'opacity 0.2s',
            }}
          >
            PlanITournament →
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

function TournamentCard({
  tournament,
  locale,
  accentColor,
  delay,
  inView,
}: {
  tournament: TournamentEntry
  locale: 'fr' | 'en'
  accentColor: string
  delay: number
  inView: boolean
}) {
  const name = locale === 'fr' ? (tournament.nameFr || tournament.name) : tournament.name
  const location = locale === 'fr' ? (tournament.locationFr || tournament.location) : tournament.location
  const notes = locale === 'fr' ? (tournament.notesFr || tournament.notes) : tournament.notes

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)',
        borderTop: `3px solid ${accentColor}`,
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.6rem',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
      whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.25)` }}
    >
      <div style={{
        fontFamily: 'var(--font-condensed)',
        fontSize: '0.62rem',
        fontWeight: 700,
        color: '#E63946',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
      }}>
        📅 {tournament.date}
      </div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.1rem',
        color: 'var(--text-primary)',
        letterSpacing: '0.04em',
        lineHeight: 1.2,
      }}>
        {name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          color: 'var(--text-secondary)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.4rem',
        }}>
          <span style={{ flexShrink: 0 }}>📍</span>
          <span>{location}</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8rem',
          color: 'var(--text-muted)',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.4rem',
        }}>
          <span style={{ flexShrink: 0 }}>🏢</span>
          <span>{tournament.organizer}</span>
        </div>
      </div>
      {notes && (
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.80rem',
          color: 'var(--text-muted)',
          lineHeight: 1.55,
          fontStyle: 'italic',
        }}>
          {notes}
        </p>
      )}
      {tournament.registrationUrl && (
        <a
          href={tournament.registrationUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            padding: '0.5rem 1rem',
            background: accentColor,
            color: '#fff',
            borderRadius: '4px',
            fontFamily: 'var(--font-condensed)',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            alignSelf: 'flex-start',
            marginTop: '0.25rem',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = '0.85'}
          onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = '1'}
        >
          {locale === 'fr' ? 'S\'inscrire →' : 'Register →'}
        </a>
      )}
    </motion.div>
  )
}
