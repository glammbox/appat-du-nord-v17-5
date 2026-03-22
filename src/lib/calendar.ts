export type ActivityLevel = 'HOT' | 'ACTIVE' | 'SLOW' | 'CLOSED'

export interface MonthData {
  month: string
  monthShort: string
  iceStatus: '❄️' | '🌊' | '🧊'
  waterTemp: string
  activities: { species: string; level: ActivityLevel }[]
  notes: string
}

export const calendarData: MonthData[] = [
  {
    month: 'Janvier',
    monthShort: 'Jan',
    iceStatus: '❄️',
    waterTemp: '0–2°C',
    activities: [
      { species: 'Doré Jaune', level: 'HOT' },
      { species: 'Perchaude', level: 'ACTIVE' },
      { species: 'Touladi', level: 'ACTIVE' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Achigan', level: 'CLOSED' },
    ],
    notes: 'Pêche sous la glace. Doré actif toute la journée.',
  },
  {
    month: 'Février',
    monthShort: 'Fév',
    iceStatus: '❄️',
    waterTemp: '0–2°C',
    activities: [
      { species: 'Doré Jaune', level: 'HOT' },
      { species: 'Perchaude', level: 'ACTIVE' },
      { species: 'Touladi', level: 'ACTIVE' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Achigan', level: 'CLOSED' },
    ],
    notes: 'Pleine saison de pêche blanche. Glace épaisse.',
  },
  {
    month: 'Mars',
    monthShort: 'Mar',
    iceStatus: '🧊',
    waterTemp: '1–4°C',
    activities: [
      { species: 'Doré Jaune', level: 'HOT' },
      { species: 'Perchaude', level: 'ACTIVE' },
      { species: 'Touladi', level: 'ACTIVE' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Achigan', level: 'CLOSED' },
    ],
    notes: 'Fin de saison pêche blanche. Glace instable en fin de mois.',
  },
  {
    month: 'Avril',
    monthShort: 'Avr',
    iceStatus: '🌊',
    waterTemp: '4–10°C',
    activities: [
      { species: 'Grand Brochet', level: 'HOT' },
      { species: 'Doré Jaune', level: 'ACTIVE' },
      { species: 'Truite', level: 'ACTIVE' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Achigan', level: 'SLOW' },
      { species: 'Perchaude', level: 'ACTIVE' },
    ],
    notes: 'Débâcle. Brochet en frai. Conditions changeantes.',
  },
  {
    month: 'Mai',
    monthShort: 'Mai',
    iceStatus: '🌊',
    waterTemp: '10–16°C',
    activities: [
      { species: 'Grand Brochet', level: 'HOT' },
      { species: 'Doré Jaune', level: 'HOT' },
      { species: 'Truite', level: 'HOT' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Achigan', level: 'SLOW' },
      { species: 'Perchaude', level: 'ACTIVE' },
    ],
    notes: 'Excellent pour brochet et doré. Maskinongé ouvre le 15 juin.',
  },
  {
    month: 'Juin',
    monthShort: 'Jun',
    iceStatus: '🌊',
    waterTemp: '16–22°C',
    activities: [
      { species: 'Maskinongé', level: 'ACTIVE' },
      { species: 'Achigan', level: 'HOT' },
      { species: 'Grand Brochet', level: 'ACTIVE' },
      { species: 'Doré Jaune', level: 'ACTIVE' },
      { species: 'Truite', level: 'ACTIVE' },
    ],
    notes: 'Saison maskinongé ouvre 15 juin. Bass en pleine activité.',
  },
  {
    month: 'Juillet',
    monthShort: 'Jul',
    iceStatus: '🌊',
    waterTemp: '22–26°C',
    activities: [
      { species: 'Achigan', level: 'HOT' },
      { species: 'Maskinongé', level: 'ACTIVE' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Doré Jaune', level: 'SLOW' },
      { species: 'Truite', level: 'SLOW' },
    ],
    notes: 'Eau chaude. Bass domine. Brochet/doré en profondeur.',
  },
  {
    month: 'Août',
    monthShort: 'Aoû',
    iceStatus: '🌊',
    waterTemp: '20–25°C',
    activities: [
      { species: 'Achigan', level: 'HOT' },
      { species: 'Maskinongé', level: 'ACTIVE' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Doré Jaune', level: 'SLOW' },
      { species: 'Truite', level: 'SLOW' },
    ],
    notes: 'Pic de chaleur. Bass et maskinongé actifs tôt le matin.',
  },
  {
    month: 'Septembre',
    monthShort: 'Sep',
    iceStatus: '🌊',
    waterTemp: '15–20°C',
    activities: [
      { species: 'Maskinongé', level: 'HOT' },
      { species: 'Grand Brochet', level: 'ACTIVE' },
      { species: 'Achigan', level: 'ACTIVE' },
      { species: 'Doré Jaune', level: 'ACTIVE' },
      { species: 'Truite', level: 'HOT' },
    ],
    notes: 'Fenêtre trophée maskinongé. Excellentes conditions générales.',
  },
  {
    month: 'Octobre',
    monthShort: 'Oct',
    iceStatus: '🌊',
    waterTemp: '8–14°C',
    activities: [
      { species: 'Maskinongé', level: 'HOT' },
      { species: 'Grand Brochet', level: 'HOT' },
      { species: 'Doré Jaune', level: 'HOT' },
      { species: 'Achigan', level: 'ACTIVE' },
      { species: 'Truite', level: 'HOT' },
    ],
    notes: 'Pic absolu maskinongé. Meilleur mois de l\'année.',
  },
  {
    month: 'Novembre',
    monthShort: 'Nov',
    iceStatus: '🌊',
    waterTemp: '4–8°C',
    activities: [
      { species: 'Maskinongé', level: 'SLOW' },
      { species: 'Grand Brochet', level: 'ACTIVE' },
      { species: 'Doré Jaune', level: 'ACTIVE' },
      { species: 'Achigan', level: 'SLOW' },
      { species: 'Truite', level: 'ACTIVE' },
    ],
    notes: 'Maskinongé ferme 1er déc. Doré et brochet actifs.',
  },
  {
    month: 'Décembre',
    monthShort: 'Déc',
    iceStatus: '🧊',
    waterTemp: '0–4°C',
    activities: [
      { species: 'Doré Jaune', level: 'ACTIVE' },
      { species: 'Perchaude', level: 'ACTIVE' },
      { species: 'Touladi', level: 'ACTIVE' },
      { species: 'Maskinongé', level: 'CLOSED' },
      { species: 'Grand Brochet', level: 'SLOW' },
      { species: 'Achigan', level: 'CLOSED' },
    ],
    notes: 'Glace qui se forme. Retour de la pêche blanche fin décembre.',
  },
]
