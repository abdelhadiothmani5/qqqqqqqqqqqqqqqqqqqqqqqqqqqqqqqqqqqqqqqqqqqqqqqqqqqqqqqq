export type ServiceCategory =
  | 'laser'
  | 'injectables'
  | 'facial'
  | 'prp'
  | 'peeling'
  | 'skinbooster'
  | 'regeneration';

export interface ServiceVariant {
  id: string;
  name: string;
  priceDZD: number;
  originalPriceDZD?: number;
  durationMinutes?: number;
  description?: string;
  isPopular?: boolean;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  categoryLabel: string;
  subCategory?: string;
  name: string;
  nameAr?: string;
  shortDescription: string;
  fullDescription: string;
  priceDZD: number;
  originalPriceDZD?: number;
  priceNote?: string;
  durationMinutes: number;
  availability: 'available' | 'limited' | 'consultation_required';
  isBookable: boolean;
  featured?: boolean;
  popular?: boolean;
  bestSeller?: boolean;
  heroImage: string;
  galleryImages?: string[];
  notes?: string;
  variants?: ServiceVariant[];
  recoveryDays?: string;
  painLevel?: number;
  recommendedSessions?: string;
  benefits?: string[];
  procedureSteps?: { title: string; desc: string }[];
  contraindications?: string[];
  faqs?: { question: string; answer: string }[];
  doctorAdvice?: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientCity: string;
  treatmentId: string;
  treatmentName: string;
  variantId?: string;
  variantName?: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  isFirstVisit: boolean;
  createdAt: string;
  totalPriceDZD: number;
}

export type Booking = Appointment;

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  firstVisitDate: string;
  totalVisits: number;
  totalSpentDZD: number;
  lastTreatment: string;
  medicalNotes: string;
}

// Fallback images for treatments
const LASER_DEFAULT_IMG = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop';
const INJECTABLE_DEFAULT_IMG = 'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=1200&auto=format&fit=crop';
const FACIAL_DEFAULT_IMG = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop';
const PRP_DEFAULT_IMG = 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop';
const SKINBOOSTER_DEFAULT_IMG = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop';

/**
 * THE SINGLE SOURCE OF TRUTH (CATALOGUE CENTRAL DES SOINS & TARIFS)
 * Every service in the website (Tarification, Poster, Cards, Booking, Admin)
 * is derived strictly from this catalog.
 */
export const CENTRAL_SERVICES_CATALOG: Service[] = [
  // =========================================================================
  // 1. BEST SELLERS & FLAGSHIP PROTOCOLS
  // =========================================================================
  {
    id: 'laser-hair-removal',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Forfaits & Corps',
    name: 'Épilation Laser Médicale',
    nameAr: 'إزالة الشعر بالليزر الطبي',
    shortDescription: 'Technologie laser triple longueur d’onde (Alexandrite & Diode) pour une élimination définitive et indolore du poil.',
    fullDescription: "L'épilation laser chez GH Clinic est un acte strictement médical supervisé par Dr. Ghaouat Sarra. Équipement laser haute puissance de classe médicale adapté à tous les phototypes de peau. Grâce au système de refroidissement par contact cryogénique (-5°C), la séance est indolore, rapide et sécurisée.",
    heroImage: LASER_DEFAULT_IMG,
    galleryImages: [LASER_DEFAULT_IMG],
    priceDZD: 4500,
    priceNote: 'À partir de 4 500 DA selon la zone',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    bestSeller: true,
    featured: true,
    recoveryDays: 'Immédiate (légère rougeur passagère 1-2h)',
    painLevel: 1,
    recommendedSessions: '6 à 8 séances espacées de 4 à 6 semaines',
    variants: [
      { id: 'laser-standard', name: 'Séance Unitaire (Zone ciblée)', priceDZD: 4500, durationMinutes: 30 },
      { id: 'laser-demi-jambes-pack', name: 'Demi-Jambes + Maillot + Aisselles', priceDZD: 11000, durationMinutes: 50, isPopular: true },
      { id: 'laser-corps-complet-pack', name: 'Corps Complet (Femme)', priceDZD: 18000, durationMinutes: 75, isPopular: true },
    ],
    benefits: [
      'Disparition progressive et durable de 90%+ des poils',
      'Élimination définitive des poils incarnés et folliculites',
      'Protocole 100% sécurisé sous contrôle médical'
    ],
    procedureSteps: [
      { title: '1. Diagnostic Cutané', desc: 'Analyse du phototype et du poil pour ajuster les paramètres laser.' },
      { title: '2. Protection & Refroidissement', desc: 'Port de lunettes médicales et application du gel conducteur.' },
      { title: '3. Balayage Laser Médical', desc: 'Impulsions laser rapides couplées au froid glacial intégré.' },
      { title: '4. Soin Apaisant', desc: 'Application d’émulsion médicale régénérante post-acte.' }
    ]
  },
  {
    id: 'botox-injections',
    category: 'injectables',
    categoryLabel: 'Injectables & Botox',
    subCategory: 'Botox',
    name: 'Injections de Botox (Toxine Botulique)',
    nameAr: 'حقن البوتوكس للوجه',
    shortDescription: 'Lissage naturel des rides d’expression (front, ride du lion, pattes d’oie) et traitement du bruxisme.',
    fullDescription: "Les injections de toxine botulique pratiquées par Dr. Ghaouat Sarra visent à détendre harmonieusement les muscles responsables des rides du haut du visage, sans jamais figer les expressions. Le résultat est un regard reposé, rafraîchi et rayonnant de jeunesse.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    galleryImages: [INJECTABLE_DEFAULT_IMG],
    priceDZD: 6000,
    priceNote: 'À partir de 6 000 DA (selon protocole)',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    bestSeller: true,
    featured: true,
    recoveryDays: 'Aucune éviction sociale',
    painLevel: 1,
    recommendedSessions: '1 séance tous les 5 à 7 mois',
    variants: [
      { id: 'botox-05ml', name: 'Botox 0.5ml (Petite zone / Retouche)', priceDZD: 6000, durationMinutes: 20 },
      { id: 'botox-front-var', name: 'Botox Front (Zone Isolée)', priceDZD: 15000, durationMinutes: 25 },
      { id: 'botox-3zones-var', name: 'Botox 3 Zones (Front + Lion + Pattes d’oie)', priceDZD: 28000, durationMinutes: 30, isPopular: true },
      { id: 'botox-fullface-var', name: 'Botox Full Face Complet', priceDZD: 30000, durationMinutes: 40, isPopular: true },
      { id: 'botox-masseters-var', name: 'Botox Masséters (Bruxisme & Ovale)', priceDZD: 26000, durationMinutes: 30 }
    ],
    benefits: [
      'Atténuation spectaculaire des rides du front et rides d’amertume',
      'Ouverture du regard et effet reposé immédiat',
      'Effet "Baby Botox" naturel sans effet masque figé'
    ]
  },
  {
    id: 'filler-levres',
    category: 'injectables',
    categoryLabel: 'Injectables & Fillers',
    subCategory: 'Filler',
    name: 'Filler Lèvres (Acide Hyaluronique)',
    nameAr: 'الفيلر وحقن حمض الهيالورونيك',
    shortDescription: 'Sublimation et contouring des lèvres (Russian Lips naturel), hydratation profonde et restauration des volumes.',
    fullDescription: "Dr. Ghaouat Sarra utilise exclusivement des acides hyaluroniques certifiés CE & FDA avec anesthésiant intégré (Lidocaïne). Idéal pour redessiner l'ourlet des lèvres, corriger une asymétrie ou hydrater intensément sans projection excessive.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    galleryImages: [INJECTABLE_DEFAULT_IMG],
    priceDZD: 12000,
    priceNote: 'À partir de 12 000 DA (0.5ml)',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true,
    bestSeller: true,
    featured: true,
    recoveryDays: 'Léger œdème possible 24-48h',
    painLevel: 2,
    recommendedSessions: 'Résultat durable entre 9 et 18 mois',
    variants: [
      { id: 'filler-05ml', name: 'Filler Lèvres 0.5ml (Subtil & Hydratation)', priceDZD: 12000, durationMinutes: 30 },
      { id: 'filler-1ml', name: 'Filler Lèvres 1ml (Russian Lips Signature)', priceDZD: 28000, durationMinutes: 45, isPopular: true },
      { id: 'filler-sillons', name: 'Sillons Nasogéniens (1ml)', priceDZD: 29000, durationMinutes: 45 },
      { id: 'filler-jawline', name: 'Pommettes / Jawline Contouring (1ml)', priceDZD: 30000, durationMinutes: 45 },
      { id: 'filler-cernes', name: 'Cernes Creux (Redensity II)', priceDZD: 32000, durationMinutes: 45 }
    ],
    benefits: [
      'Sublimation et hydratation profonde des lèvres',
      'Lignes définies et profil harmonieux',
      'Produit 100% résorbable et biocompatible'
    ]
  },
  {
    id: 'hydrafacial',
    category: 'facial',
    categoryLabel: 'Soins Visage & Éclat',
    subCategory: 'Soins Visage',
    name: 'Hydrafacial MD Médical',
    nameAr: 'علاج الهيدرافيشل الطبي العميق',
    shortDescription: 'Nettoyage en profondeur par vortex-fusion, extraction indolore des impuretés et infusion de sérums antioxydants.',
    fullDescription: "L'Hydrafacial médical chez GH Clinic combine nettoyage breveté, exfoliation douce aux acides de fruits, extraction sous vide indolore et hydratation intense par cocktails vitaminés. Votre peau retrouve un éclat 'Glass Skin' immédiat.",
    heroImage: FACIAL_DEFAULT_IMG,
    galleryImages: [FACIAL_DEFAULT_IMG],
    priceDZD: 6000,
    priceNote: 'Formule Médicale Signature',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    bestSeller: true,
    featured: true,
    recoveryDays: 'Zéro temps d’arrêt (Éclat glow immédiat)',
    painLevel: 0,
    recommendedSessions: '1 séance par mois pour un teint parfait',
    variants: [
      { id: 'hydrafacial-signature', name: 'Hydrafacial Signature (Nettoyage & Éclat)', priceDZD: 6000, durationMinutes: 45, isPopular: true },
      { id: 'hydrafacial-deluxe', name: 'Hydrafacial Deluxe + Booster Anti-Âge + LED', priceDZD: 13500, durationMinutes: 60 },
      { id: 'hydrafacial-pack3', name: 'Cure 3 séances Hydrafacial MD', priceDZD: 25000, durationMinutes: 45 }
    ],
    benefits: [
      'Extraction sans douleur des comédons et points noirs',
      'Teint illuminé, repulpé et détoxifié instantanément',
      'Grain de peau lissé et pores resserrés'
    ]
  },

  // =========================================================================
  // 2. SOINS DU VISAGE (POSTER GAUCHE - SOINS VISAGE)
  // =========================================================================
  {
    id: 'mesotherapie',
    category: 'facial',
    categoryLabel: 'Soins Visage & Éclat',
    subCategory: 'Soins Visage',
    name: 'Mésothérapie Visage',
    nameAr: 'الميزوثيرابي للوجه',
    shortDescription: 'Micro-injections d’un cocktail vitaminé et acide hyaluronique pour revitaliser la peau terne.',
    fullDescription: "La mésothérapie médicale apporte directement au cœur du derme les nutriments essentiels : vitamines A, B, C, E, minéraux et antioxydants. Stimule la micro-circulation et relance l'éclat.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'À partir de 6 500 DA',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'meso-seance', name: '1 séance Mésothérapie Visage', priceDZD: 6500, durationMinutes: 30 },
      { id: 'meso-cure3', name: 'Cure 3 séances Mésothérapie', priceDZD: 17500, durationMinutes: 30 }
    ]
  },
  {
    id: 'microneedling',
    category: 'facial',
    categoryLabel: 'Soins Visage & Éclat',
    subCategory: 'Soins Visage',
    name: 'Microneedling Médical',
    nameAr: 'الميكرونيدلنج الطبي',
    shortDescription: 'Correction des pores dilatés, cicatrices d’acné et ridules par micro-perforations médicales.',
    fullDescription: "Perforation contrôlée de l'épiderme au Dermapen stérile combinée à des sérums d'acide hyaluronique pour relancer puissamment la production naturelle de collagène.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'À partir de 6 500 DA',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'micro-seance', name: 'Séance Microneedling', priceDZD: 6500, durationMinutes: 45 },
      { id: 'micro-vitamines', name: 'Microneedling + Cocktails Vitamines & Masque', priceDZD: 7500, durationMinutes: 50 },
      { id: 'micro-pack3', name: 'Cure 3 séances Microneedling', priceDZD: 18000, durationMinutes: 45 }
    ]
  },

  // =========================================================================
  // 3. PRP (PLASMA RICHE EN PLAQUETTES)
  // =========================================================================
  {
    id: 'prp-visage',
    category: 'prp',
    categoryLabel: 'Régénération PRP',
    subCategory: 'PRP',
    name: 'PRP visage',
    nameAr: 'بلازما الوجه (Vampire Facial)',
    shortDescription: 'Bio-stimulation autologue 100% naturelle pour lisser les traits et régénérer le derme.',
    fullDescription: "Prélèvement de votre propre sang centrifugé pour isoler le plasma riche en plaquettes et facteurs de croissance. Stimule la réparation cellulaire, atténue les ridules et apporte un éclat spectaculaire.",
    heroImage: PRP_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'La séance',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'prp-visage-1', name: '1 séance PRP Visage', priceDZD: 6500, durationMinutes: 45, isPopular: true },
      { id: 'prp-visage-cure3', name: 'Cure 3 séances PRP Visage', priceDZD: 18000, durationMinutes: 45 }
    ]
  },
  {
    id: 'prp-cheveux',
    category: 'prp',
    categoryLabel: 'Régénération PRP',
    subCategory: 'PRP',
    name: 'PRP cheveux',
    nameAr: 'بلازما الشعر لوقف التساقط',
    shortDescription: 'Traitement anti-chute puissant et densification des follicules pileux par plasma autologue.',
    fullDescription: "Micro-injections dans le cuir chevelu pour réveiller les follicules en dormance, freiner la chute de cheveux et stimuler la repousse de cheveux plus forts et plus épais.",
    heroImage: PRP_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'La séance',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'prp-cheveux-1', name: '1 séance PRP Cheveux', priceDZD: 6500, durationMinutes: 45, isPopular: true },
      { id: 'prp-cheveux-cure3', name: 'Cure 3 séances PRP Cheveux', priceDZD: 18000, durationMinutes: 45 }
    ]
  },
  {
    id: 'prp-cheveux-biotine',
    category: 'prp',
    categoryLabel: 'Régénération PRP',
    subCategory: 'PRP',
    name: 'PRP cheveux + biotine',
    nameAr: 'بلازما الشعر مع البيوتين',
    shortDescription: 'Formule enrichie associant le plasma plaquettaire autologue à la biotine (Vitamine B8).',
    fullDescription: "Protocole premium combinant les vertus réparatrices du PRP et l'action stimulante de la biotine pour stopper les chutes saisonnières ou réactionnelles aiguës.",
    heroImage: PRP_DEFAULT_IMG,
    priceDZD: 9500,
    priceNote: 'La séance enrichie',
    durationMinutes: 45,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'prp-biotine-1', name: '1 séance PRP + Biotine', priceDZD: 9500, durationMinutes: 45, isPopular: true },
      { id: 'prp-biotine-cure3', name: 'Cure 3 séances PRP + Biotine', priceDZD: 26000, durationMinutes: 45 }
    ]
  },

  // =========================================================================
  // 4. PEELINGS CHIMIQUES & LASER CO2
  // =========================================================================
  {
    id: 'peeling-visage',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Peeling visage',
    nameAr: 'تقشير الوجه الطبي',
    shortDescription: 'Exfoliation dermatologique aux acides doux pour unifier le teint et éliminer les cellules mortes.',
    fullDescription: "Peeling superficiel à moyen à base d'acides de fruits (glycolique, salicylique, mandélique) pour un grain de peau net et resserré, sans desquamation excessive.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 7000,
    priceNote: 'À partir de 7 000 DA',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'peel-visage-eclat', name: 'Peeling Éclat Coup de Fouet', priceDZD: 7000, durationMinutes: 30, isPopular: true },
      { id: 'peel-visage-anti-taches', name: 'Peeling Dépigmentant Mélasma', priceDZD: 11000, durationMinutes: 35 }
    ]
  },
  {
    id: 'peeling-aisselles',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Peeling aisselles',
    nameAr: 'تقشير الإبطين وتفتيح البقع',
    shortDescription: 'Éclaircissement des zones sombres sous les bras et atténuation des frottements pigmentaires.',
    fullDescription: "Protocole médical dépigmentant doux spécialement calibré pour la peau fine des aisselles afin d'estomper les taches foncées et lisser la peau.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 5500,
    priceNote: 'À partir de 5 500 DA',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'peeling-zone-intime',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Peeling zone intime',
    nameAr: 'تقشير وتفتيح المنطقة الحساسة',
    shortDescription: 'Éclaircissement médical sécurisé des zones intimes et de l’aine.',
    fullDescription: "Formule dermatologique dépigmentante spécifique pour homogénéiser la teinte de la zone intime en toute sécurité sans irritation.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'À partir de 6 500 DA',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'peeling-coudes',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Peeling coudes',
    nameAr: 'تقشير وتنعيم الكوعين',
    shortDescription: 'Lissage de la rugosité et éclaircissement des coudes foncés.',
    fullDescription: "Exfoliation ciblée pour adoucir la couche cornée épaisse des coudes et retrouver une couleur uniforme.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 4000,
    priceNote: 'À partir de 4 000 DA',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'peeling-genoux',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Peeling genoux',
    nameAr: 'تقشير وتفتيح الركبتين',
    shortDescription: 'Traitement dépigmentant et kératolytique pour genoux assombris.',
    fullDescription: "Atténue les hyperpigmentations localisées sur les genoux dues aux frottements répétés.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'À partir de 4 500 DA',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'peeling-laser-co2',
    category: 'peeling',
    categoryLabel: 'Peelings Médicaux',
    subCategory: 'Peeling',
    name: 'Visage par laser CO2',
    nameAr: 'تقشير الوجه بليزر ثاني أكسيد الكربون (CO2)',
    shortDescription: 'Resurfaçage cutané au laser fractionné CO2 pour renouvellement épidermique.',
    fullDescription: "Le peeling au laser CO2 permet un renouvellement tissulaire complet, le lissage des ridules et la correction des cicatrices d'acné en stimulant la synthèse de collagène.",
    heroImage: FACIAL_DEFAULT_IMG,
    priceDZD: 8500,
    priceNote: 'À partir de 8 500 DA',
    durationMinutes: 40,
    availability: 'available',
    isBookable: true,
    popular: true
  },

  // =========================================================================
  // 5. SKINBOOSTERS & BIOREVITALISATION (POSTER DROITE)
  // =========================================================================
  {
    id: 'skinbooster-hyaron',
    category: 'skinbooster',
    categoryLabel: 'Skinboosters',
    subCategory: 'Skinbooster',
    name: 'Hyaron',
    nameAr: 'سكين بوستر هيارون',
    shortDescription: 'Skinbooster coréen à base de hyaluronate de sodium pur pour une hydratation en profondeur.',
    fullDescription: "Désaltère les peaux fatiguées ou déshydratées, repulpe le grain de peau et redonne un éclat instantané.",
    heroImage: SKINBOOSTER_DEFAULT_IMG,
    priceDZD: 9000,
    priceNote: 'La séance',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'skinbooster-nctf-135ha',
    category: 'skinbooster',
    categoryLabel: 'Skinboosters',
    subCategory: 'Skinbooster',
    name: 'NCTF 135 HA',
    nameAr: 'فيلورجا NCTF 135 HA للنضارة الفائقة',
    shortDescription: 'Le complexe polyrevitalisant culte de Filorga aux 55 ingrédients actifs et acide hyaluronique.',
    fullDescription: "Véritable shot de jeunesse dermatologique pour améliorer l'élasticité, resserrer les pores et illuminer le teint durablement.",
    heroImage: SKINBOOSTER_DEFAULT_IMG,
    priceDZD: 13000,
    priceNote: 'La séance',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true,
    popular: true
  },
  {
    id: 'skinbooster-ejal-40',
    category: 'skinbooster',
    categoryLabel: 'Skinboosters',
    subCategory: 'Skinbooster',
    name: 'Ejal 40',
    nameAr: 'إيجال 40 لإعادة هيكلة البشرة',
    shortDescription: 'Bio-revitalisation matricielle avancée à haute concentration en acide hyaluronique pur.',
    fullDescription: "Stimule les récepteurs cellulaires des fibroblastes pour restructurer la matrice extracellulaire et retendre la peau flétrie.",
    heroImage: SKINBOOSTER_DEFAULT_IMG,
    priceDZD: 32000,
    priceNote: 'Protocole complet',
    durationMinutes: 40,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'skinbooster-profhilo',
    category: 'skinbooster',
    categoryLabel: 'Skinboosters',
    subCategory: 'Skinbooster',
    name: 'Profhilo (2ml)',
    nameAr: 'بروفايلو الإيطالي لشد ونضارة البشرة',
    shortDescription: 'Complexe hybride d’acide hyaluronique breveté pour un remodelage dynamique du visage ou du cou.',
    fullDescription: "Technologie NAHYCO injectée selon la technique des 5 points BAP pour un effet tenseur naturel et une hydratation record jusqu’à 9 mois.",
    heroImage: SKINBOOSTER_DEFAULT_IMG,
    priceDZD: 25000,
    priceNote: 'Protocole 2ml',
    durationMinutes: 40,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'profhilo-1', name: '1 séance Profhilo (2ml)', priceDZD: 25000, durationMinutes: 40, isPopular: true },
      { id: 'profhilo-cure2', name: 'Cure 2 séances (recommandée à 1 mois)', priceDZD: 45000, durationMinutes: 40 }
    ]
  },

  // =========================================================================
  // 6. BOTOX DÉTAILLÉ (POSTER DROITE)
  // =========================================================================
  {
    id: 'botox-full-face',
    category: 'injectables',
    categoryLabel: 'Injectables & Botox',
    subCategory: 'Botox',
    name: 'Botox FULL FACE',
    nameAr: 'بوتوكس لكامل الوجه',
    shortDescription: 'Traitement global de toutes les zones musculaires du visage pour un rendu harmonieux et reposé.',
    fullDescription: "Protocole complet englobant le front, la ride du lion, les pattes d’oie, les ridules du nez (bunny lines) et le menton pour un lissage complet sans expressions figées.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    priceDZD: 30000,
    priceNote: 'À partir de 30 000 DA',
    durationMinutes: 40,
    availability: 'available',
    isBookable: true,
    popular: true
  },
  {
    id: 'botox-front',
    category: 'injectables',
    categoryLabel: 'Injectables & Botox',
    subCategory: 'Botox',
    name: 'Botox front',
    nameAr: 'بوتوكس الجبهة والتجاعيد التعبيرية',
    shortDescription: 'Lissage ciblé des lignes horizontales du front tout en préservant la mobilité naturelle.',
    fullDescription: "Détend les fibres du muscle frontal pour effacer les cassures cutanées et ouvrir le haut du visage.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    priceDZD: 15000,
    priceNote: 'À partir de 15 000 DA',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true
  },
  {
    id: 'botox-05ml',
    category: 'injectables',
    categoryLabel: 'Injectables & Botox',
    subCategory: 'Botox',
    name: 'BOTOX 0.5ml',
    nameAr: 'بوتوكس 0.5 مل رتوش ومنطقة محددة',
    shortDescription: 'Micro-dose de toxine botulique pour une retouche ou une petite zone isolée.',
    fullDescription: "Idéal pour une correction subtile (par exemple coin des yeux ou ride du lion légère).",
    heroImage: INJECTABLE_DEFAULT_IMG,
    priceDZD: 6000,
    priceNote: 'Tarif fixe',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true
  },

  // =========================================================================
  // 7. FILLER & LIPBOOSTER (POSTER DROITE)
  // =========================================================================
  {
    id: 'filler-levres-05ml',
    category: 'injectables',
    categoryLabel: 'Injectables & Fillers',
    subCategory: 'Filler',
    name: 'Filler lèvres 0.5ml',
    nameAr: 'فيلر الشفاه 0.5 مل طبيعي',
    shortDescription: 'Volume discret, correction d’asymétrie ou simple réhydratation de la lèvre.',
    fullDescription: "Injection d’une demi-seringue d’acide hyaluronique haut de gamme pour les patientes souhaitant un résultat ultra discret et indétectable.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    priceDZD: 12000,
    priceNote: 'Tarif fixe 0.5ml',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    popular: true
  },
  {
    id: 'lipbooster-bacio',
    category: 'injectables',
    categoryLabel: 'Injectables & Soins',
    subCategory: 'Lipbooster',
    name: 'BACIO (hydratant lips)',
    nameAr: 'ليب بوستر باتشيو لترطيب الشفاه الفائق',
    shortDescription: 'Soin bio-revitalisant exclusif pour des lèvres douces, lisses et intensément hydratées.',
    fullDescription: "Soin repulpant sans sur-volume, idéal pour réparer les lèvres gercées, déshydratées ou ridées par le temps.",
    heroImage: INJECTABLE_DEFAULT_IMG,
    priceDZD: 22000,
    priceNote: 'Tarif protocole complet',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true
  },

  // =========================================================================
  // 8. ÉPILATION LASER DIODE 2025 (POSTER LASER - VISAGE)
  // =========================================================================
  {
    id: 'laser-cou',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Visage',
    name: 'Épilation Laser Cou',
    shortDescription: 'Élimination durable des poils indésirables au niveau du cou.',
    fullDescription: "Séance rapide et sécurisée pour une ligne de cou nette sans irritation de rasage.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 2500,
    priceNote: 'La séance unitaire',
    durationMinutes: 15,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'cou-1', name: '1 séance', priceDZD: 2500, durationMinutes: 15 },
      { id: 'cou-pack3', name: 'Pack 3 séances', priceDZD: 6700, originalPriceDZD: 7500, durationMinutes: 15, isPopular: true }
    ]
  },
  {
    id: 'laser-moustache',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Visage',
    name: 'Épilation Laser Moustache',
    shortDescription: 'Élimination définitive du duvet et des poils de la lèvre supérieure.',
    fullDescription: "Traitement minutieux de la lèvre supérieure avec refroidissement cryogénique pour un confort absolu.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 2000,
    priceNote: 'La séance unitaire',
    durationMinutes: 10,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'moustache-1', name: '1 séance', priceDZD: 2000, durationMinutes: 10 },
      { id: 'moustache-pack3', name: 'Pack 3 séances', priceDZD: 5400, originalPriceDZD: 6000, durationMinutes: 10, isPopular: true }
    ]
  },
  {
    id: 'laser-menton',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Visage',
    name: 'Épilation Laser Menton',
    shortDescription: 'Traitement des poils durs ou hormonaux du menton.',
    fullDescription: "Paramétrage précis pour détruire la racine des poils récalcitrants de la zone mentonnière.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 2500,
    priceNote: 'La séance unitaire',
    durationMinutes: 15,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'menton-1', name: '1 séance', priceDZD: 2500, durationMinutes: 15 },
      { id: 'menton-pack3', name: 'Pack 3 séances', priceDZD: 6700, originalPriceDZD: 7500, durationMinutes: 15, isPopular: true }
    ]
  },
  {
    id: 'laser-pattes',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Visage',
    name: 'Épilation Laser Pattes',
    shortDescription: 'Épilation nette des favoris et pattes devant les oreilles.',
    fullDescription: "Redessine la ligne latérale des tempes pour un profil soigné et propre.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 2000,
    priceNote: 'La séance unitaire',
    durationMinutes: 15,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'pattes-1', name: '1 séance', priceDZD: 2000, durationMinutes: 15 },
      { id: 'pattes-pack3', name: 'Pack 3 séances', priceDZD: 5400, originalPriceDZD: 6000, durationMinutes: 15, isPopular: true }
    ]
  },
  {
    id: 'laser-visage-entier',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Visage',
    name: 'Épilation Laser Visage Entier',
    shortDescription: 'Moustache, menton, joues, favoris et cou pour une peau éclatante et uniforme.',
    fullDescription: "Séance globale du visage traitant l'ensemble des zones de pilosité féminine en 25 minutes.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 5000,
    priceNote: 'La séance unitaire',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'visage-1', name: '1 séance', priceDZD: 5000, durationMinutes: 25 },
      { id: 'visage-pack3', name: 'Pack 3 séances', priceDZD: 13500, originalPriceDZD: 15000, durationMinutes: 25, isPopular: true }
    ]
  },

  // =========================================================================
  // 9. ÉPILATION LASER DIODE 2025 (POSTER LASER - BRAS)
  // =========================================================================
  {
    id: 'laser-aisselles',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Bras',
    name: 'Épilation Laser Aisselles',
    shortDescription: 'La zone la plus demandée : disparition des poils et des boutons sous peau.',
    fullDescription: "Séance ultra rapide (10-15 min) quasi indolore grâce au froid cryogénique. Résultats spectaculaires dès la 2ème séance.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 3700,
    priceNote: 'La séance unitaire',
    durationMinutes: 15,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'aisselles-1', name: '1 séance', priceDZD: 3700, durationMinutes: 15 },
      { id: 'aisselles-pack3', name: 'Pack 3 séances', priceDZD: 10000, originalPriceDZD: 11000, durationMinutes: 15, isPopular: true }
    ]
  },
  {
    id: 'laser-avant-bras',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Bras',
    name: 'Épilation Laser Avant Bras',
    shortDescription: 'Du coude jusqu’au poignet pour des bras nets et lisses.',
    fullDescription: "Traitement efficace des poils fins et épais des avant-bras.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'La séance unitaire',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'avantbras-1', name: '1 séance', priceDZD: 4500, durationMinutes: 25 },
      { id: 'avantbras-pack3', name: 'Pack 3 séances', priceDZD: 12100, originalPriceDZD: 13500, durationMinutes: 25, isPopular: true }
    ]
  },
  {
    id: 'laser-bras-superieur',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Bras',
    name: 'Épilation Laser Bras Supérieur',
    shortDescription: 'Partie haute du bras et épaules.',
    fullDescription: "Idéal pour éliminer les duvets et poils disgracieux du haut des bras.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4000,
    priceNote: 'La séance unitaire',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'brasup-1', name: '1 séance', priceDZD: 4000, durationMinutes: 25 },
      { id: 'brasup-pack3', name: 'Pack 3 séances', priceDZD: 10800, originalPriceDZD: 12000, durationMinutes: 25, isPopular: true }
    ]
  },
  {
    id: 'laser-bras-entiers',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Bras',
    name: 'Épilation Laser Bras Entiers (sans mains)',
    shortDescription: 'Des épaules jusqu’aux poignets pour une douceur intégrale.',
    fullDescription: "Séance complète des deux bras pour une peau uniforme et soyeuse.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 6500,
    priceNote: 'La séance unitaire',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'brasentiers-1', name: '1 séance', priceDZD: 6500, durationMinutes: 35 },
      { id: 'brasentiers-pack3', name: 'Pack 3 séances', priceDZD: 17500, originalPriceDZD: 19500, durationMinutes: 35, isPopular: true }
    ]
  },
  {
    id: 'laser-mains',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Bras',
    name: 'Épilation Laser Mains',
    shortDescription: 'Dessus des mains et doigts.',
    fullDescription: "Zone rapide pour parfaire l'élégance des mains.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 1500,
    priceNote: 'La séance unitaire',
    durationMinutes: 10,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'mains-1', name: '1 séance', priceDZD: 1500, durationMinutes: 10 },
      { id: 'mains-pack3', name: 'Pack 3 séances', priceDZD: 4000, originalPriceDZD: 4500, durationMinutes: 10, isPopular: true }
    ]
  },

  // =========================================================================
  // 10. ÉPILATION LASER DIODE 2025 (POSTER LASER - CORPS)
  // =========================================================================
  {
    id: 'laser-dos-bas',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Dos-Bas',
    shortDescription: 'Zone lombaire et bas du dos.',
    fullDescription: "Séance ciblée sur le bas du dos pour un confort vestimentaire optimal.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'La séance unitaire',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'dosbas-1', name: '1 séance', priceDZD: 4500, durationMinutes: 20 },
      { id: 'dosbas-pack3', name: 'Pack 3 séances', priceDZD: 12100, originalPriceDZD: 13500, durationMinutes: 20, isPopular: true }
    ]
  },
  {
    id: 'laser-dos-haut',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Dos-Haut',
    shortDescription: 'Haut du dos et omoplates.',
    fullDescription: "Élimination des poils et préventions des folliculites dorsales.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'La séance unitaire',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'doshaut-1', name: '1 séance', priceDZD: 4500, durationMinutes: 20 },
      { id: 'doshaut-pack3', name: 'Pack 3 séances', priceDZD: 12100, originalPriceDZD: 13500, durationMinutes: 20, isPopular: true }
    ]
  },
  {
    id: 'laser-dos-entier',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Dos Entier',
    shortDescription: 'Du cou jusqu’au sacrum.',
    fullDescription: "Protocole complet pour une peau dorsale impeccable et douce.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 7000,
    priceNote: 'À partir de 7 000 DA',
    durationMinutes: 35,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'dosentier-1', name: '1 séance', priceDZD: 7000, durationMinutes: 35 },
      { id: 'dosentier-pack3', name: 'Pack 3 séances', priceDZD: 18900, originalPriceDZD: 21000, durationMinutes: 35, isPopular: true }
    ]
  },
  {
    id: 'laser-ventre',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Ventre',
    shortDescription: 'Zone abdominale complète.',
    fullDescription: "Séance douce et efficace pour libérer le ventre de tout duvet visible.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4000,
    priceNote: 'La séance unitaire',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'ventre-1', name: '1 séance', priceDZD: 4000, durationMinutes: 20 },
      { id: 'ventre-pack3', name: 'Pack 3 séances', priceDZD: 10800, originalPriceDZD: 12000, durationMinutes: 20, isPopular: true }
    ]
  },
  {
    id: 'laser-nombril',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Nombril',
    shortDescription: 'Ligne médiane sous-ombilicale.',
    fullDescription: "Petite zone rapide traitée en moins de 10 minutes.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 1500,
    priceNote: 'La séance unitaire',
    durationMinutes: 10,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'nombril-1', name: '1 séance', priceDZD: 1500, durationMinutes: 10 },
      { id: 'nombril-pack3', name: 'Pack 3 séances', priceDZD: 4000, originalPriceDZD: 4500, durationMinutes: 10, isPopular: true }
    ]
  },
  {
    id: 'laser-fesses',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Fesses',
    shortDescription: 'Zone fessière complète.',
    fullDescription: "Élimination des poils et des irritations de frottements.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'À partir de 4 500 DA',
    durationMinutes: 20,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'fesses-1', name: '1 séance', priceDZD: 4500, durationMinutes: 20 },
      { id: 'fesses-pack3', name: 'Pack 3 séances', priceDZD: 12100, originalPriceDZD: 13500, durationMinutes: 20, isPopular: true }
    ]
  },
  {
    id: 'laser-maillot-echancre',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Maillot Échancré',
    shortDescription: 'Contours du maillot élargis pour les sous-vêtements et maillots de bain.',
    fullDescription: "Nettoyage net des bordures latérales et supérieures avec confort maximal.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 4500,
    priceNote: 'La séance unitaire',
    durationMinutes: 25,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'maillotechancre-1', name: '1 séance', priceDZD: 4500, durationMinutes: 25 },
      { id: 'maillotechancre-pack3', name: 'Pack 3 séances', priceDZD: 12100, originalPriceDZD: 13500, durationMinutes: 25, isPopular: true }
    ]
  },
  {
    id: 'laser-maillot-integral',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Maillot Intégral',
    shortDescription: 'Élimination totale de la pilosité intime pour une hygiène et douceur parfaites.',
    fullDescription: "Acte réalisé dans le plus grand respect de votre intimité par du personnel médical féminin attentionné.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 5500,
    priceNote: 'La séance unitaire',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'maillotint-1', name: '1 séance', priceDZD: 5500, durationMinutes: 30 },
      { id: 'maillotint-pack3', name: 'Pack 3 séances', priceDZD: 14800, originalPriceDZD: 16500, durationMinutes: 30, isPopular: true }
    ]
  },
  {
    id: 'laser-sif',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Corps',
    name: 'Épilation Laser Sillon Interfessier (SIF)',
    shortDescription: 'Zone intime postérieure.',
    fullDescription: "Séance rapide pour une hygiène irréprochable.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 1500,
    priceNote: 'La séance unitaire',
    durationMinutes: 10,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'sif-1', name: '1 séance', priceDZD: 1500, durationMinutes: 10 },
      { id: 'sif-pack3', name: 'Pack 3 séances', priceDZD: 4000, originalPriceDZD: 4500, durationMinutes: 10, isPopular: true }
    ]
  },

  // =========================================================================
  // 11. ÉPILATION LASER DIODE 2025 (POSTER LASER - JAMBES)
  // =========================================================================
  {
    id: 'laser-cuisses',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Jambes',
    name: 'Épilation Laser Cuisses',
    shortDescription: 'Du haut des genoux jusqu’à l’aine.',
    fullDescription: "Traitement efficace des cuisses et de l'arrière des jambes.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 5500,
    priceNote: 'À partir de 5 500 DA',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'cuisses-1', name: '1 séance', priceDZD: 5500, durationMinutes: 30 },
      { id: 'cuisses-pack3', name: 'Pack 3 séances', priceDZD: 14800, originalPriceDZD: 16500, durationMinutes: 30, isPopular: true }
    ]
  },
  {
    id: 'laser-demi-jambes',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Jambes',
    name: 'Épilation Laser Demi-Jambes',
    shortDescription: 'Des chevilles jusqu’au-dessus des genoux inclus.',
    fullDescription: "La zone essentielle : fini les poils incarnés et les repousses piquantes.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 5500,
    priceNote: 'La séance unitaire',
    durationMinutes: 30,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'demijambes-1', name: '1 séance', priceDZD: 5500, durationMinutes: 30 },
      { id: 'demijambes-pack3', name: 'Pack 3 séances', priceDZD: 14800, originalPriceDZD: 16500, durationMinutes: 30, isPopular: true }
    ]
  },
  {
    id: 'laser-jambes-completes',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Jambes',
    name: 'Épilation Laser Jambes Complètes (sans pieds)',
    shortDescription: 'Des cuisses jusqu’aux chevilles pour une liberté totale.',
    fullDescription: "Séance d'environ 50 minutes assurant un traitement complet et minutieux des deux jambes.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 9000,
    priceNote: 'À partir de 9 000 DA',
    durationMinutes: 50,
    availability: 'available',
    isBookable: true,
    popular: true,
    variants: [
      { id: 'jambescomp-1', name: '1 séance', priceDZD: 9000, durationMinutes: 50 },
      { id: 'jambescomp-pack3', name: 'Pack 3 séances', priceDZD: 25000, originalPriceDZD: 27000, durationMinutes: 50, isPopular: true }
    ]
  },
  {
    id: 'laser-pieds',
    category: 'laser',
    categoryLabel: 'Épilation Laser Diode',
    subCategory: 'Jambes',
    name: 'Épilation Laser Pieds',
    shortDescription: 'Dessus des pieds et orteils.',
    fullDescription: "Séance de finition pour des pieds nets en sandales ou nu-pieds.",
    heroImage: LASER_DEFAULT_IMG,
    priceDZD: 1500,
    priceNote: 'La séance unitaire',
    durationMinutes: 10,
    availability: 'available',
    isBookable: true,
    variants: [
      { id: 'pieds-1', name: '1 séance', priceDZD: 1500, durationMinutes: 10 },
      { id: 'pieds-pack3', name: 'Pack 3 séances', priceDZD: 4000, originalPriceDZD: 4500, durationMinutes: 10, isPopular: true }
    ]
  }
];

// Helper functions for easy lookup across the codebase

export function getServiceById(id: string): Service | undefined {
  if (!id) return undefined;
  return CENTRAL_SERVICES_CATALOG.find((s) => s.id.toLowerCase() === id.toLowerCase());
}

export function findServiceByIdOrName(identifier?: string): Service | undefined {
  if (!identifier) return undefined;
  const clean = identifier.trim().toLowerCase();
  
  // 1. Exact ID match
  const byId = CENTRAL_SERVICES_CATALOG.find((s) => s.id.toLowerCase() === clean);
  if (byId) return byId;

  // 2. Exact Name match
  const byName = CENTRAL_SERVICES_CATALOG.find((s) => s.name.toLowerCase() === clean);
  if (byName) return byName;

  // 3. Dash vs Space normalization (e.g. "prp-visage" <=> "prp visage")
  const dashToSpace = clean.replace(/-/g, ' ');
  const spaceToDash = clean.replace(/\s+/g, '-');
  const byDashSpace = CENTRAL_SERVICES_CATALOG.find((s) => {
    const sId = s.id.toLowerCase();
    const sName = s.name.toLowerCase();
    return (
      sId === spaceToDash ||
      sId.replace(/-/g, ' ') === dashToSpace ||
      sName === dashToSpace ||
      sName.toLowerCase().replace(/\s+/g, '-') === spaceToDash
    );
  });
  if (byDashSpace) return byDashSpace;

  // 4. Normalized Diacritic match
  const cleanNorm = clean.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const byNorm = CENTRAL_SERVICES_CATALOG.find((s) => {
    const sNameNorm = s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sIdNorm = s.id.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return sNameNorm === cleanNorm || sIdNorm === cleanNorm;
  });
  if (byNorm) return byNorm;

  // 5. Laser Zone match (e.g. "Épilation Laser COU" or "COU" matches "laser-cou")
  if (clean.includes('laser') || clean.length < 20) {
    const laserZone = CENTRAL_SERVICES_CATALOG.find((s) => {
      if (s.category !== 'laser') return false;
      const sIdNorm = s.id.toLowerCase().replace('laser-', '');
      const sNameNorm = s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return cleanNorm.includes(sIdNorm) || sNameNorm.includes(cleanNorm) || cleanNorm.includes(sNameNorm);
    });
    if (laserZone) return laserZone;
  }

  // 6. Substring match in name or short description
  const byPartial = CENTRAL_SERVICES_CATALOG.find((s) => {
    const sName = s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sId = s.id.toLowerCase();
    return sName.includes(cleanNorm) || cleanNorm.includes(sName) || sId.includes(cleanNorm) || cleanNorm.includes(sId);
  });
  if (byPartial) return byPartial;

  // 7. Fallback: check if identifier matches any variant name
  const byVariant = CENTRAL_SERVICES_CATALOG.find((s) =>
    s.variants?.some((v) => v.name.toLowerCase().includes(cleanNorm) || cleanNorm.includes(v.name.toLowerCase()))
  );
  if (byVariant) return byVariant;

  return undefined;
}

export function getServicesByCategory(category: string): Service[] {
  if (category === 'all' || !category) return CENTRAL_SERVICES_CATALOG;
  return CENTRAL_SERVICES_CATALOG.filter((s) => s.category === category);
}

export function searchServices(query: string): Service[] {
  if (!query || !query.trim()) return CENTRAL_SERVICES_CATALOG;
  const q = query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return CENTRAL_SERVICES_CATALOG.filter((s) => {
    const name = s.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const desc = s.shortDescription.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const sub = (s.subCategory || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cat = s.categoryLabel.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return name.includes(q) || desc.includes(q) || sub.includes(q) || cat.includes(q);
  });
}

export function formatPriceDZD(price: number): string {
  return `${price.toLocaleString('fr-DZ')} DA`;
}
