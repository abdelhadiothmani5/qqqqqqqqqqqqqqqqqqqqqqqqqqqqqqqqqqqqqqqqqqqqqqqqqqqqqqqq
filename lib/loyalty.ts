export interface LoyaltyTier {
  id: 'bronze' | 'silver' | 'gold' | 'platinum';
  name: string;
  minPoints: number;
  maxPoints: number | null;
  perks: string[];
  discountPercent: number;
  badgeLabel: string;
  accentColor: string;
}

export interface LoyaltyActivity {
  id: string;
  date: string;
  treatmentName: string;
  pointsEarned: number;
  amountDZD: number;
  type: 'treatment' | 'bonus' | 'redemption';
  rewardTitle?: string;
}

export interface LoyaltyReward {
  id: string;
  title: string;
  category: 'Soins' | 'Laser' | 'VIP' | 'Remise';
  description: string;
  pointsRequired: number;
  valueDZD?: number;
  code: string;
}

export const LOYALTY_TIERS: LoyaltyTier[] = [
  {
    id: 'bronze',
    name: 'Éclat Essentiel',
    minPoints: 0,
    maxPoints: 199,
    perks: ['Diagnostic cutané personnalisé', 'Conseils post-soins exclusifs', 'Cumul de 1 pt / 100 DA'],
    discountPercent: 0,
    badgeLabel: 'Membre Essentiel',
    accentColor: '#C5A089',
  },
  {
    id: 'silver',
    name: 'Sérénité Argent',
    minPoints: 200,
    maxPoints: 499,
    perks: ['Masque apaisant post-laser offert', '-5% sur les soins visage éclat', 'Accès prioritaire aux créneaux'],
    discountPercent: 5,
    badgeLabel: 'Membre Argent',
    accentColor: '#9E6B55',
  },
  {
    id: 'gold',
    name: 'Excellence Or',
    minPoints: 500,
    maxPoints: 999,
    perks: ['-10% sur les forfaits périodiques', 'Soin contour des yeux offert', 'Créneaux VIP du samedi garantis'],
    discountPercent: 10,
    badgeLabel: 'Membre Or',
    accentColor: '#C73859',
  },
  {
    id: 'platinum',
    name: 'Privilège Platine',
    minPoints: 1000,
    maxPoints: null,
    perks: ['-15% sur tous les protocoles combinés', 'Séance LED thérapie offerte après chaque soin', 'Ligne WhatsApp directe avec Dr. Ghaouat'],
    discountPercent: 15,
    badgeLabel: 'Membre Platine VIP',
    accentColor: '#8E2842',
  },
];

export const AVAILABLE_REWARDS: LoyaltyReward[] = [
  {
    id: 'reward-1',
    title: '-1 000 DA sur Soin Visage / Peeling',
    category: 'Remise',
    description: 'Valable sur votre prochain soin nettoyant profond ou peeling éclat en cabinet.',
    pointsRequired: 150,
    valueDZD: 1000,
    code: 'GH-ECLAT-1000',
  },
  {
    id: 'reward-2',
    title: 'Diagnostic de Peau & Analyse Visia Offert',
    category: 'VIP',
    description: 'Bilan complet de votre grain de peau et préconisations médicales personnalisées.',
    pointsRequired: 250,
    valueDZD: 2500,
    code: 'GH-DIAG-OFFERT',
  },
  {
    id: 'reward-3',
    title: 'Masque Régénérant & Soin LED Apaisant',
    category: 'Soins',
    description: 'Protocole apaisant haute intensité appliqué directement après un soin laser ou injectable.',
    pointsRequired: 350,
    valueDZD: 3000,
    code: 'GH-LED-CALM',
  },
  {
    id: 'reward-4',
    title: '-2 500 DA sur Forfait Laser ou Skinbooster',
    category: 'Laser',
    description: 'Déduction immédiate sur tout forfait épilation laser DIODE ou séance de skinbooster.',
    pointsRequired: 500,
    valueDZD: 2500,
    code: 'GH-LASER-2500',
  },
  {
    id: 'reward-5',
    title: 'Booster Hydratation Intense Hydrafacial MD®',
    category: 'VIP',
    description: 'Infusion d’actifs d’acide hyaluronique & peptides offerte lors de votre séance Hydrafacial.',
    pointsRequired: 800,
    valueDZD: 5000,
    code: 'GH-HYDRA-BOOST',
  },
];

export interface LoyaltyState {
  points: number;
  totalEarned: number;
  history: LoyaltyActivity[];
  redeemedRewards: string[]; // array of reward IDs
}

export const INITIAL_LOYALTY_STATE: LoyaltyState = {
  points: 120, // Initial welcome points for a good demo experience
  totalEarned: 120,
  history: [
    {
      id: 'act-welcome',
      date: '2026-09-01',
      treatmentName: 'Bienvenue au Programme GH Privilège',
      pointsEarned: 50,
      amountDZD: 0,
      type: 'bonus',
    },
    {
      id: 'act-1',
      date: '2026-09-12',
      treatmentName: 'Hydrafacial Médical (Nettoyage & Éclat)',
      pointsEarned: 70,
      amountDZD: 7000,
      type: 'treatment',
    },
  ],
  redeemedRewards: [],
};

export function calculatePointsFromPrice(priceDZD: number): number {
  return Math.max(10, Math.floor(priceDZD / 100));
}

export function getCurrentTier(points: number): LoyaltyTier {
  for (let i = LOYALTY_TIERS.length - 1; i >= 0; i--) {
    const tier = LOYALTY_TIERS[i];
    if (points >= tier.minPoints) {
      return tier;
    }
  }
  return LOYALTY_TIERS[0];
}

export function getNextTier(points: number): { nextTier: LoyaltyTier | null; pointsNeeded: number; progressPercent: number } {
  const current = getCurrentTier(points);
  const currentIndex = LOYALTY_TIERS.findIndex((t) => t.id === current.id);
  
  if (currentIndex === LOYALTY_TIERS.length - 1) {
    return {
      nextTier: null,
      pointsNeeded: 0,
      progressPercent: 100,
    };
  }

  const nextTier = LOYALTY_TIERS[currentIndex + 1];
  const pointsInCurrentRange = points - current.minPoints;
  const rangeSpan = nextTier.minPoints - current.minPoints;
  const progressPercent = Math.min(100, Math.max(0, Math.round((pointsInCurrentRange / rangeSpan) * 100)));
  const pointsNeeded = Math.max(0, nextTier.minPoints - points);

  return {
    nextTier,
    pointsNeeded,
    progressPercent,
  };
}
