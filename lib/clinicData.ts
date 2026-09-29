import fillersImg from '@/src/assets/images/regenerated_image_1788821569480.jpg';
import hydrafacialImg from '@/src/assets/images/regenerated_image_1788821571843.jpg';
import {
  CENTRAL_SERVICES_CATALOG,
  Service,
  ServiceVariant,
  ServiceCategory,
  Appointment as ServiceAppointment,
  Patient as ServicePatient,
  Booking as ServiceBooking,
  getServiceById,
  findServiceByIdOrName,
  searchServices,
  formatPriceDZD
} from './servicesData';

export type { Service, ServiceVariant, ServiceCategory };
export type Booking = ServiceBooking;
export { CENTRAL_SERVICES_CATALOG, getServiceById, findServiceByIdOrName, searchServices, formatPriceDZD };

export type Treatment = Omit<Service, 'availability' | 'isBookable'> & {
  availability?: 'available' | 'limited' | 'consultation_required';
  isBookable?: boolean;
  recoveryDays?: string;
  painLevel?: number;
  recommendedSessions?: string;
  benefits?: string[];
  procedureSteps?: { title: string; desc: string }[];
  contraindications?: string[];
  faqs?: { question: string; answer: string }[];
  doctorAdvice?: string;
};

export interface PricingCategory {
  id: string;
  title: string;
  subtitle: string;
  items: {
    name: string;
    description?: string;
    singleSessionDZD: number;
    pack3DZD?: number;
    pack6DZD?: number;
    popular?: boolean;
  }[];
}

export interface BeforeAfterCase {
  id: string;
  treatmentName: string;
  treatmentCategory: string;
  patientAge: string;
  sessionsCount: string;
  description: string;
  beforeImage: string;
  afterImage: string;
  doctorNotes: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  city: string;
  rating: number;
  treatment: string;
  date: string;
  comment: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'clinic' | 'equipment' | 'doctor' | 'treatment' | 'results';
  categoryLabel: string;
  imageUrl: string;
  description?: string;
}

export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientCity: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  isFirstVisit: boolean;
  createdAt: string;
  totalPriceDZD: number;
}

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

export interface ClinicSettings {
  clinicName: string;
  doctorName: string;
  doctorTitle: string;
  city: string;
  wilaya: string;
  address: string;
  phone: string;
  whatsappPhone: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  googleMapsUrl: string;
  openingHours: {
    weekdays: string;
    friday: string;
  };
  announcementText: string;
}

export const INITIAL_CLINIC_SETTINGS: ClinicSettings = {
  clinicName: 'GH Clinic',
  doctorName: 'Dr. Ghaouat Sarra',
  doctorTitle: 'Médecin Esthétique & Laseriste Certifiée',
  city: 'Khemis Miliana',
  wilaya: 'Aïn Defla',
  address: 'Cabinet Médico-Esthétique, Centre-ville, Boulevard des Martyrs, Khemis Miliana',
  phone: '+213 550 12 34 56',
  whatsappPhone: '213550123456',
  email: 'contact@ghclinic-dz.com',
  instagramUrl: 'https://www.instagram.com/gh_clinic10/',
  facebookUrl: 'https://www.facebook.com/Drsarraghaouat/',
  googleMapsUrl: 'https://www.google.com/maps/place/Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA/',
  openingHours: {
    weekdays: 'Samedi – Jeudi : 09h00 – 18h00',
    friday: 'Vendredi : Fermé (Urgences sur rendez-vous)'
  },
  announcementText: 'Consultations sur rendez-vous à Khemis Miliana — Offres spéciales cure laser d’automne/hiver disponibles.'
};

export const TREATMENTS: Treatment[] = [
  {
    id: 'laser-hair-removal',
    name: 'Épilation Laser Médicale',
    nameAr: 'إزالة الشعر بالليزر الطبي',
    category: 'laser',
    categoryLabel: 'Laser Médical',
    shortDescription: 'Technologie laser triple longueur d’onde (Alexandrite & Diode) pour une élimination définitive et indolore du poil.',
    fullDescription: "L'épilation laser chez GH Clinic est un acte strictement médical supervisé par Dr. Ghaouat Sarra. Nous utilisons un équipement laser haute puissance de classe médicale adapté à tous les phototypes de peau (peaux claires à mates). Grâce au système de refroidissement par contact cryogénique, la séance est rapide, sécurisée et d'un confort optimal.",
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 4500,
    priceNote: 'À partir de 4 500 DZD selon la zone / Forfait corps complet disponible',
    durationMinutes: 45,
    recoveryDays: 'Immédiate (légère rougeur passagère 1-2h)',
    painLevel: 1,
    recommendedSessions: '6 à 8 séances espacées de 4 à 6 semaines',
    benefits: [
      'Disparition progressive et durable de 90%+ des poils',
      'Élimination définitive des poils incarnés et folliculites',
      'Texture de peau lisse, nette et soyeuse',
      'Protocole 100% sécurisé sous contrôle médical'
    ],
    procedureSteps: [
      { title: '1. Diagnostic Cutané & Paramétrage', desc: 'Analyse du phototype, de la couleur et de l’épaisseur du poil pour ajuster les paramètres laser sur-mesure.' },
      { title: '2. Préparation & Protection Oculaire', desc: 'Nettoyage de la zone, port de lunettes de protection médicale et application de gel conducteur apaisant.' },
      { title: '3. Balayage Laser & Refroidissement', desc: 'Impulsions laser précises couplées au système de froid glacial intégré pour une séance ultra confortable.' },
      { title: '4. Soin Apaisant Post-Acte', desc: 'Application d’une émulsion médicale régénérante et protection solaire indice 50+.' }
    ],
    contraindications: ['Grossesse et allaitement', 'Exposition solaire intense récente (moins de 2 semaines)', 'Traitement médicamenteux photosensibilisant actif'],
    faqs: [
      { question: 'Est-ce douloureux ?', answer: 'Non, nos appareils disposent d’un embout cryogénique réfrigérant à -5°C qui neutralise la sensation de chaleur.' },
      { question: 'Combien de séances sont nécessaires ?', answer: 'En moyenne 6 à 8 séances permettent d’obtenir un résultat durable à 95%.' }
    ],
    doctorAdvice: 'Rasez la zone traitée 24h avant votre séance avec un rasoir classique (évitez la cire et l’épilateur électrique 4 semaines avant).',
    featured: true
  },
  {
    id: 'botox-injections',
    name: 'Injections de Botox (Toxine Botulique)',
    nameAr: 'حقن البوتوكس للوجه',
    category: 'injectables',
    categoryLabel: 'Injectables',
    shortDescription: 'Lissage naturel des rides d’expression (front, ride du lion, pattes d’oie) et traitement du bruxisme.',
    fullDescription: "Les injections de toxine botulique pratiquées par Dr. Ghaouat Sarra visent à détendre harmonieusement les muscles responsables des rides du haut du visage, sans jamais figer les expressions. Le résultat est un regard reposé, rafraîchi et rayonnant de jeunesse, tout en préservant le charme naturel de votre visage.",
    heroImage: 'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 22000,
    priceNote: 'Par zone ou forfait 3 zones (Front + Glabelle + Pattes d’oie)',
    durationMinutes: 30,
    recoveryDays: 'Aucune éviction sociale (reprise immédiate des activités)',
    painLevel: 1,
    recommendedSessions: '1 séance tous les 5 à 7 mois pour maintenir les résultats',
    benefits: [
      'Atténuation spectaculaire des rides du front et rides d’amertume',
      'Ouverture du regard et effet reposé immédiat',
      'Prévention durable du vieillissement cutané',
      'Effet "Baby Botox" naturel sans effet masque figé'
    ],
    procedureSteps: [
      { title: '1. Cartographie Faciale Dynamique', desc: 'Dr. Sarra étudie vos mimiques pour cibler précisément les points d’injection.' },
      { title: '2. Micro-Injections Ciblées', desc: 'Injection indolore avec des micro-aiguilles ultra fines de produit pur certifié.' },
      { title: '3. Contrôle & Conseils', desc: 'Vérification immédiate et remise des consignes post-injections.' }
    ],
    contraindications: ['Maladies neuromusculaires', 'Grossesse / allaitement', 'Infection cutanée locale active'],
    faqs: [
      { question: 'Quand les résultats sont-ils visibles ?', answer: 'Les premiers effets apparaissent dès 3-5 jours, avec un résultat optimal et stabilisé à 14 jours.' },
      { question: 'Vais-je perdre mes expressions ?', answer: 'Absolument pas. Dr. Sarra privilégie un dosage précis et mesuré pour un rendu chic et indétectable.' }
    ],
    doctorAdvice: 'Évitez le sport intensif, les saunas et de masser la zone pendant 24 à 48 heures suivant la séance.',
    featured: true
  },
  {
    id: 'hyaluronic-acid-fillers',
    name: 'Comblement Acide Hyaluronique (Fillers)',
    nameAr: 'الفيلر وحقن حمض الهيالورونيك',
    category: 'injectables',
    categoryLabel: 'Injectables',
    shortDescription: 'Restauration des volumes, contouring des lèvres (Russian Lips naturel), jawline et comblement des sillons.',
    fullDescription: "L'acide hyaluronique est une molécule naturellement présente dans notre derme. Utilisé en injection de précision, il permet de redessiner l'ourlet des lèvres, restaurer les volumes perdus des pommettes, estomper les sillons nasogéniens ou harmoniser l'ovale du visage (Jawline). Dr. Ghaouat Sarra utilise exclusivement des acides hyaluroniques premium avec anesthésiant intégré (Lidocaïne).",
    heroImage: typeof fillersImg === 'string' ? fillersImg : fillersImg.src,
    galleryImages: [
      typeof fillersImg === 'string' ? fillersImg : fillersImg.src,
      'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 28000,
    priceNote: 'Par seringue de 1ml (Produits certifiés CE/FDA : Juvéderm, Teosyal, Restylane)',
    durationMinutes: 45,
    recoveryDays: 'Léger œdème possible 24-48h',
    painLevel: 2,
    recommendedSessions: 'Résultat immédiat durable entre 9 et 18 mois selon la zone',
    benefits: [
      'Sublimation et hydratation profonde des lèvres',
      'Rajeunissement immédiat du tiers moyen et inférieur du visage',
      'Lignes définies et profil harmonieux',
      'Produit 100% résorbable et biocompatible'
    ],
    procedureSteps: [
      { title: '1. Consultation & Design Morphologique', desc: 'Définition précise des proportions idéales selon l’anatomie de votre visage.' },
      { title: '2. Pose de Crème Anesthésiante', desc: 'Confort maximal garanti avant le début des micro-canules ou aiguilles fines.' },
      { title: '3. Injection de Précision & Modelage', desc: 'Dépôt méticuleux du gel d’acide hyaluronique et façonnage symétrique.' },
      { title: '4. Contrôle du Résultat en Miroir', desc: 'Validation conjointe du rendu avec la patiente.' }
    ],
    contraindications: ['Maladies auto-immunes non stabilisées', 'Antécédents d’allergies sévères', 'Grossesse'],
    faqs: [
      { question: 'Le résultat est-il immédiat ?', answer: 'Oui, l’effet volumateur est visible instantanément, le résultat final se stabilise en 7 à 10 jours.' }
    ],
    doctorAdvice: 'Appliquez des compresses fraîches en cas de léger gonflement et buvez abondamment de l’eau pour optimiser l’hydratation du produit.',
    featured: true
  },
  {
    id: 'hydrafacial-md',
    name: 'Soin Hydrafacial MD Médical',
    nameAr: 'علاج الهيدرافيشل الطبي العميق',
    category: 'facial',
    categoryLabel: 'Soins Visage & Éclat',
    shortDescription: 'Nettoyage en profondeur par vortex-fusion, extraction des comédons et infusion de sérums antioxydants haut de gamme.',
    fullDescription: "Bien plus qu'un simple soin en institut, l'Hydrafacial médical chez GH Clinic combine nettoyage breveté, exfoliation douce aux acides de fruits, extraction sous vide indolore et hydratation intense par cocktails vitaminés et acide hyaluronique. Votre peau retrouve un éclat 'Glass Skin' immédiat et une pureté incomparable.",
    heroImage: typeof hydrafacialImg === 'string' ? hydrafacialImg : hydrafacialImg.src,
    galleryImages: [
      typeof hydrafacialImg === 'string' ? hydrafacialImg : hydrafacialImg.src,
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 9500,
    priceNote: 'Formule Médicale Signature / Option Booster Personnalisé + Luminothérapie LED',
    durationMinutes: 60,
    recoveryDays: 'Zéro temps d’arrêt (Éclat glow immédiat)',
    painLevel: 0,
    recommendedSessions: '1 séance par mois pour un teint parfait et des pores resserrés',
    benefits: [
      'Extraction sans douleur des points noirs et impuretés',
      'Hydratation en profondeur et lissage du grain de peau',
      'Teint illuminé, repulpé et détoxifié',
      'Idéal avant un événement ou mariage'
    ],
    procedureSteps: [
      { title: '1. Nettoyage & Exfoliation Douce', desc: 'Élimination des cellules mortes et ouverture douce des pores.' },
      { title: '2. Peeling Doux Acide Salicylique/Glycolique', desc: 'Désincrustation des impuretés sans desquamation visible.' },
      { title: '3. Extraction par Aspiration Vortex', desc: 'Aspiration indolore du sébum et des bouchons comédoniques.' },
      { title: '4. Infusion Sérums Antioxydants & Peptides', desc: 'Bain d’hydratation protecteur et stimulant de collagène.' },
      { title: '5. Luminothérapie Médicale LED', desc: 'Lumière rouge anti-âge ou bleue antibactérienne pour sceller les bienfaits.' }
    ],
    contraindications: ['Coup de soleil récent', 'Acné kystique sévère inflammatoire'],
    faqs: [
      { question: 'Puis-je me maquiller après le soin ?', answer: 'Nous recommandons de laisser respirer votre peau 6h à 12h pour profiter pleinement des actifs infusés.' }
    ],
    doctorAdvice: 'Le soin coup d’éclat par excellence à réaliser 2 à 3 jours avant une cérémonie ou un mariage.',
    featured: true
  },
  {
    id: 'prp-therapy',
    name: 'PRP — Plasma Riche en Plaquettes',
    nameAr: 'علاج البلازما الغنية بالصفائح (PRP)',
    category: 'regeneration',
    categoryLabel: 'Régénération Médicale',
    shortDescription: 'Bio-stimulation autologue 100% naturelle pour la régénération du visage (Vampire Facial) et la repousse capillaire.',
    fullDescription: "Le PRP utilise vos propres facteurs de croissance plaquettaires pour stimuler le renouvellement cellulaire, relancer la production d'élastine et de collagène, ou fortifier les follicules pileux affaiblis. En médecine esthétique du visage, il procure un coup d'éclat spectaculaire et estompe les cernes colorés.",
    heroImage: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 14000,
    priceNote: 'Par séance (Visage ou Cuir Chevelu) / Tarif dégressif en cure de 3 séances',
    durationMinutes: 45,
    recoveryDays: '24 heures (petites rougeurs discrètes)',
    painLevel: 1,
    recommendedSessions: 'Cure de 3 séances espacées de 3 à 4 semaines',
    benefits: [
      'Traitement 100% autologue et biocompatible (zéro risque d’allergie)',
      'Freine la chute de cheveux et densifie la masse capillaire',
      'Améliore la fermeté et l’élasticité de la peau du visage et du cou',
      'Atténuation des cernes foncés et poches péri-orbitaires'
    ],
    procedureSteps: [
      { title: '1. Prélèvement Sanguin Stérile', desc: 'Prise de sang classique de quelques millilitres dans des tubes stériles certifiés.' },
      { title: '2. Centrifugation Haute Précision', desc: 'Séparation du plasma enrichi en plaquettes et facteurs de croissance.' },
      { title: '3. Réinjection en Mésothérapie / Microneedling', desc: 'Micro-injections ciblées sur la zone du cuir chevelu ou du visage.' }
    ],
    contraindications: ['Troubles de la coagulation sanguine', 'Affections hématologiques', 'Grossesse'],
    faqs: [
      { question: 'Y a-t-il des risques d’allergie ?', answer: 'Aucun, car le produit provient de votre propre organisme (100% naturel).' }
    ],
    doctorAdvice: 'Évitez la prise d’anti-inflammatoires (Aspirine, Ibuprofène) 48h avant la séance pour préserver l’activité plaquettaire.',
    featured: true
  },
  {
    id: 'skinboosters-profhilo',
    name: 'Skinboosters & Biorévitalisation',
    nameAr: 'سكين بوستر وبروفايلو لنضارة البشرة',
    category: 'regeneration',
    categoryLabel: 'Régénération & Hydratation',
    shortDescription: 'Micro-injections d’acide hyaluronique fluide non réticulé pour repulper la peau et lisser les ridules en profondeur.',
    fullDescription: "Les Skinboosters (Restylane Vital, Profhilo, Juvéderm Volite) agissent comme un véritable réservoir d'eau dans les couches profondes du derme. Contrairement aux fillers classiques qui modifient les volumes, les skinboosters améliorent la qualité, la densité et la luminosité intrinsèque de la peau.",
    heroImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 24000,
    priceNote: 'Protocole complet 2ml / Visage, cou, décolleté ou mains',
    durationMinutes: 40,
    recoveryDays: 'Légères papules résorbées en 12 à 24 heures',
    painLevel: 1,
    recommendedSessions: '2 séances à 1 mois d’intervalle, puis 1 entretien tous les 6 mois',
    benefits: [
      'Hydratation durable jusqu’à 9 mois',
      'Effet tenseur doux et amélioration de l’élasticité cutanée',
      'Lissage des fines ridules de déshydratation du visage et du cou',
      'Idéal pour les peaux fatiguées, ternes ou exposées au soleil'
    ],
    procedureSteps: [
      { title: '1. Nettoyage & Repérage des 5 Points BAP', desc: 'Technique d’injection optimisée pour une diffusion homogène sans hématomes.' },
      { title: '2. Micro-Injections Profondes', desc: 'Dépôt précis du complexe hybride d’acide hyaluronique haut et bas poids moléculaire.' },
      { title: '3. Massage Apaisant & Masque Régénérant', desc: 'Application d’un soin calmant riche en panthénol.' }
    ],
    contraindications: ['Infection active de la zone', 'Grossesse'],
    faqs: [
      { question: 'Est-ce que cela change la forme de mon visage ?', answer: 'Non, les skinboosters ne créent aucun volume artificiel : ils restaurent la souplesse et la fraîcheur naturelle de votre peau.' }
    ],
    doctorAdvice: 'Le soin coup de cœur pour les femmes de 30 à 60 ans souhaitant un résultat naturel et lumineux.',
    featured: true
  },
  {
    id: 'microneedling-medical',
    name: 'Microneedling Médical & Exosomes',
    nameAr: 'الميكرونيدلنج الطبي لعلاج المسام والندبات',
    category: 'facial',
    categoryLabel: 'Soins Visage',
    shortDescription: 'Perforation contrôlée par micro-aiguilles médicales couplée à des sérums stériles pour corriger cicatrices et pores.',
    fullDescription: "Le microneedling médical chez GH Clinic utilise un stylo électrique de précision médicale créant des milliers de micro-canaux dans le derme. Ce processus déclenche une régénération tissulaire intense tout en faisant pénétrer des cocktails d'acides aminés, vitamines et peptides bioactifs. Idéal pour estomper les cicatrices d'acné, resserrer les pores dilatés et unifier le teint.",
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 7500,
    priceNote: 'Par séance / Forfait cure 4 séances avec masque bio-cellulosique offert',
    durationMinutes: 50,
    recoveryDays: 'Rougeurs modérées 24-48h (type coup de soleil léger)',
    painLevel: 2,
    recommendedSessions: '3 à 5 séances espacées de 3 semaines',
    benefits: [
      'Resserrement visible des pores dilatés',
      'Atténuation des cicatrices d’acné et taches pigmentaires',
      'Amélioration globale de la texture et régularité de la peau',
      'Stimulation puissante de la synthèse de collagène'
    ],
    procedureSteps: [
      { title: '1. Désinfection & Anesthésie Topique', desc: 'Application préalable d’une crème anesthésiante pour un confort total.' },
      { title: '2. Micro-Perforations Ciblées', desc: 'Passage méthodique du Dermapen avec embouts à aiguilles stériles à usage unique.' },
      { title: '3. Infusion d’Actifs Cutanés', desc: 'Pénétration maximale de sérums d’acide hyaluronique et facteurs de croissance.' },
      { title: '4. Masque Apaisant Post-Traitement', desc: 'Masque froid réparateur apaisant instantanément la sensation d’échauffement.' }
    ],
    contraindications: ['Acné active inflammatoire en poussée', 'Eczéma ou psoriasis sur la zone'],
    faqs: [
      { question: 'Combien de temps durent les rougeurs ?', answer: 'Généralement entre 24h et 48h. Une crème réparatrice et un écran total vous sont prescrits.' }
    ],
    doctorAdvice: 'Évitez le maquillage pendant les 24h qui suivent et appliquez une protection solaire SPF 50+ quotidienne.',
    featured: false
  },
  {
    id: 'chemical-peelings',
    name: 'Peelings Chimiques Médicaux',
    nameAr: 'التقشير الكيميائي الطبي',
    category: 'facial',
    categoryLabel: 'Soins Visage & Dépigmentation',
    shortDescription: 'Peelings superficiels à moyens (acide glycolique, salicylique, TCA, dépigmentant mélasma) pour un teint neuf et sans taches.',
    fullDescription: "Nos peelings médicaux formulés par les plus grands laboratoires dermatologiques permettent d'exfolier les couches superficielles et moyennes de l'épiderme afin d'éliminer les cellules pigmentées, réguler le sébum et lisser les imperfections. Protocoles spécifiques pour mélasma (masque de grossesse), taches solaires et teint terne.",
    heroImage: 'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=800&auto=format&fit=crop'
    ],
    priceDZD: 8000,
    priceNote: 'Selon le type de peeling (Éclat, Anti-Acné, Dépigmentant Mélasma)',
    durationMinutes: 35,
    recoveryDays: '2 à 5 jours selon la profondeur du peeling',
    painLevel: 1,
    recommendedSessions: 'Cure de 3 à 4 séances espacées de 15 jours en période automne/hiver',
    benefits: [
      'Éradication des taches brunes et masque de grossesse (Mélasma)',
      'Éclat spectaculaire et uniformisation du teint',
      'Réduction des comédons et resserrement des pores',
      'Peau neuve, lisse et purifiée'
    ],
    procedureSteps: [
      { title: '1. Préparation Cutanée & Dégraissage', desc: 'Nettoyage minutieux et application de la solution préparatrice.' },
      { title: '2. Application du Peeling Médical', desc: 'Dépôt précis de la solution d’acides avec temps de pose chronométré.' },
      { title: '3. Neutralisation & Soin Réparateur', desc: 'Neutralisation de l’action chimique et pose d’une crème émolliente haute protection.' }
    ],
    contraindications: ['Exposition solaire récente ou programmée', 'Grossesse', 'Herpès cutané actif'],
    faqs: [
      { question: 'Vais-je beaucoup peler ?', answer: 'Pour un peeling éclat doux, la desquamation est quasi invisible. Pour un peeling dépigmentant moyen, une légère desquamation survient entre J3 et J5.' }
    ],
    doctorAdvice: 'Protégez impérativement votre peau avec un écran solaire SPF 50+ réappliqué toutes les 2 heures pendant les semaines suivant le peeling.',
    featured: false
  }
];

export const PRICING_CATEGORIES: PricingCategory[] = [
  {
    id: 'laser',
    title: 'Épilation Laser Médicale',
    subtitle: 'Équipement de pointe dernière génération – Tarifs par séance & forfaits avantageux',
    items: [
      { name: 'Corps Complet (Femme)', description: 'Jambes complètes + Maillot intégral + Aisselles + Bras complets + Ligne', singleSessionDZD: 18000, pack3DZD: 48000, pack6DZD: 90000, popular: true },
      { name: 'Demi-Jambes + Maillot + Aisselles', description: 'Le pack essentiel le plus demandé', singleSessionDZD: 11000, pack3DZD: 30000, pack6DZD: 55000, popular: true },
      { name: 'Jambes Complètes', description: 'Des cuisses jusqu’aux chevilles', singleSessionDZD: 8000, pack3DZD: 22000, pack6DZD: 40000 },
      { name: 'Maillot Intégral + SIF', description: 'Zone intime complète avec confort anesthésiant', singleSessionDZD: 4500, pack3DZD: 12000, pack6DZD: 22500 },
      { name: 'Aisselles', description: 'Séance rapide de 10 minutes', singleSessionDZD: 2500, pack3DZD: 6800, pack6DZD: 12500 },
      { name: 'Visage Complet (Femme)', description: 'Menton, lèvre supérieure, joues, favoris', singleSessionDZD: 3500, pack3DZD: 9500, pack6DZD: 17500 },
      { name: 'Lèvre Supérieure / Menton isolé', description: 'Petite zone', singleSessionDZD: 1500, pack3DZD: 4000, pack6DZD: 7500 }
    ]
  },
  {
    id: 'injectables',
    title: 'Injections & Toxine Botulique (Botox & Fillers)',
    subtitle: 'Actes réalisés exclusivement par Dr. Ghaouat Sarra avec produits certifiés CE / FDA',
    items: [
      { name: 'Botox 3 Zones (Front + Lion + Pattes d’oie)', description: 'Lissage complet du haut du visage, résultat naturel garanti', singleSessionDZD: 28000, popular: true },
      { name: 'Botox 1 Zone Isolée', description: 'Au choix : Ride du lion ou Front ou Pattes d’oie', singleSessionDZD: 15000 },
      { name: 'Baby Botox / Prévention Rides', description: 'Micro-dosage doux pour peaux jeunes', singleSessionDZD: 20000 },
      { name: 'Botox Masséters (Bruxisme & Affinement Ovale)', description: 'Soulage le serrement de dents et affine les angles de la mâchoire', singleSessionDZD: 26000 },
      { name: 'Acide Hyaluronique — Lèvres (Russian Lips / Hydratation)', description: 'Seringue de 1ml Juvéderm / Teosyal avec anesthésiant', singleSessionDZD: 28000, popular: true },
      { name: 'Acide Hyaluronique — Sillons Nasogéniens & Plis d’Amertume', description: 'Restauration des volumes du bas du visage (1ml)', singleSessionDZD: 29000 },
      { name: 'Acide Hyaluronique — Pommettes / Jawline Contouring', description: 'Restructuration élégante des angles faciaux (1ml)', singleSessionDZD: 30000 },
      { name: 'Comblement Cernes Creux', description: 'Acide hyaluronique spécifique très fluide (Redensity II)', singleSessionDZD: 32000 }
    ]
  },
  {
    id: 'facial',
    title: 'Soins Visage Médicaux & Peelings',
    subtitle: 'Technologies d’extraction, vortex-fusion et régénération épidermique',
    items: [
      { name: 'Hydrafacial MD Médical Signature', description: 'Nettoyage en profondeur, extraction vortex, sérums antioxydants + Masque', singleSessionDZD: 9500, pack3DZD: 25000, pack6DZD: 48000, popular: true },
      { name: 'Hydrafacial Deluxe + Booster Anti-Âge + LED', description: 'Avec booster personnalisé et luminothérapie médicale', singleSessionDZD: 13500, pack3DZD: 36000 },
      { name: 'Microneedling Médical + Cocktails Vitamines', description: 'Correction cicatrices d’acné, pores et fermeté', singleSessionDZD: 7500, pack3DZD: 20000, pack6DZD: 38000 },
      { name: 'Peeling Médical Éclat & Anti-Teint Terne', description: 'Acides de fruits doux pour une peau neuve sans desquamation', singleSessionDZD: 7000, pack3DZD: 18500 },
      { name: 'Peeling Dépigmentant / Anti-Mélasma Spécifique', description: 'Formule dermatologique puissante contre taches rebelles', singleSessionDZD: 11000, pack3DZD: 29000 }
    ]
  },
  {
    id: 'regeneration',
    title: 'Biostimulation & Régénération Tissulaire (PRP & Skinboosters)',
    subtitle: 'Traitements autologues et complexes polyrevitalisants haute concentration',
    items: [
      { name: 'PRP Visage — Vampire Facial', description: 'Régénération cutanée autologue, fermeté et coup d’éclat', singleSessionDZD: 14000, pack3DZD: 36000, popular: true },
      { name: 'PRP Cheveux — Anti-Chute & Repousse', description: 'Renforcement folliculaire et stimulation de la densité capillaire', singleSessionDZD: 13000, pack3DZD: 33000 },
      { name: 'Skinbooster Profhilo (2ml)', description: 'Remodelage dynamique et hydratation intense visage ou cou', singleSessionDZD: 25000, pack3DZD: 45000, popular: true },
      { name: 'Mésothérapie Polyvitaminée NCTF 135HA', description: 'Cocktail de 55 ingrédients actifs pour revitaliser la peau', singleSessionDZD: 9000, pack3DZD: 24000 }
    ]
  }
];

export const BEFORE_AFTER_CASES: BeforeAfterCase[] = [
  {
    id: 'case-1',
    treatmentName: 'Sublimation des Lèvres (Russian Lips Naturel)',
    treatmentCategory: 'Injectables',
    patientAge: '28 ans',
    sessionsCount: '1 séance (1ml Juvéderm Volift)',
    description: 'Correction d’une asymétrie de la lèvre supérieure et redéfinition nette de l’arc de Cupidon avec un galbe subtil et harmonieux sans projection excessive.',
    beforeImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1512290900672-1f02e71d34f0?q=80&w=600&auto=format&fit=crop',
    doctorNotes: 'Résultat immédiat et naturel qui respecte parfaitement la morphologie du visage de la patiente.'
  },
  {
    id: 'case-2',
    treatmentName: 'Lissage Front & Ride du Lion (Botox)',
    treatmentCategory: 'Injectables',
    patientAge: '37 ans',
    sessionsCount: '1 séance (Protocole 3 Zones)',
    description: 'Atténuation complète des rides horizontales du front et de la ride du lion tout en conservant une mobilité naturelle des sourcils sans regard figé.',
    beforeImage: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    doctorNotes: 'Photo de contrôle prise à J+14. Regard reposé et décongestionné.'
  },
  {
    id: 'case-3',
    treatmentName: 'Soin Hydrafacial MD Médical + Peeling Doux',
    treatmentCategory: 'Soins Visage',
    patientAge: '25 ans',
    sessionsCount: '1 séance Signature',
    description: 'Nettoyage en profondeur des pores comblés de sébum, extraction des points noirs sur la zone T et effet Glass Skin ultra lumineux.',
    beforeImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    doctorNotes: 'Teint clarifié, grain de peau immédiatement unifié sans aucune rougeur résiduelle.'
  },
  {
    id: 'case-4',
    treatmentName: 'Épilation Laser Médicale Jambes & Maillot',
    treatmentCategory: 'Laser',
    patientAge: '31 ans',
    sessionsCount: '5 séances',
    description: 'Disparition de 92% de la pilosité, élimination totale des folliculites et des boutons sous peau récurrents.',
    beforeImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
    afterImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=600&auto=format&fit=crop',
    doctorNotes: 'Texture de peau soyeuse et nette, gain de confort au quotidien.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Amina B.',
    city: 'Khemis Miliana',
    rating: 5,
    treatment: 'Injections Lèvres & Botox Front',
    date: 'Il y a 2 semaines',
    comment: 'Dr. Ghaouat Sarra est tout simplement une artiste. J’avais tellement peur d’avoir des lèvres trop gonflées ou pas naturelles, mais le résultat est juste sublime et élégant. Le cabinet est d’une propreté irréprochable digne des meilleures cliniques d’Alger ou de l’étranger.',
    verified: true
  },
  {
    id: 't-2',
    patientName: 'Yasmine M.',
    city: 'Aïn Defla',
    rating: 5,
    treatment: 'Épilation Laser Corps Complet',
    date: 'Il y a 1 mois',
    comment: 'Le laser chez GH Clinic n’a rien à voir avec ce que j’ai testé ailleurs ! C’est quasi indolore grâce au froid pulsé et après seulement 4 séances je n’ai presque plus aucun poil. Merci à Dr. Sarra pour son accueil chaleureux et son professionnalisme.',
    verified: true
  },
  {
    id: 't-3',
    patientName: 'Khadidja L.',
    city: 'Blida / Khemis Miliana',
    rating: 5,
    treatment: 'Soin Hydrafacial MD & Peeling',
    date: 'Il y a 3 semaines',
    comment: 'J’ai fait le soin Hydrafacial 3 jours avant mon mariage. Ma peau n’a jamais été aussi lumineuse, douce et hydratée. Tout le monde m’a complimentée sur mon teint. Je recommande les yeux fermés !',
    verified: true
  },
  {
    id: 't-4',
    patientName: 'Soumia R.',
    city: 'Chlef',
    rating: 5,
    treatment: 'PRP Visage & Skinbooster Profhilo',
    date: 'Il y a 1 mois',
    comment: 'Je fais le déplacement depuis Chlef spécialement pour le Dr. Ghaouat. Son diagnostic est très précis, elle ne pousse pas à la consommation et conseille ce qui convient vraiment à notre morphologie. Un vrai cabinet médical de confiance.',
    verified: true
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Salle de Soin Haute Précision',
    category: 'clinic',
    categoryLabel: 'Le Cabinet',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=800&auto=format&fit=crop',
    description: 'Espace médicalisé aseptisé aux normes européennes les plus strictes.'
  },
  {
    id: 'g-2',
    title: 'Équipement Laser Triple Onde',
    category: 'equipment',
    categoryLabel: 'Haute Technologie',
    imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    description: 'Appareil laser médical certifié CE avec refroidissement cryogénique intégré.'
  },
  {
    id: 'g-3',
    title: 'Espace Consultation Médicale Privé',
    category: 'clinic',
    categoryLabel: 'Le Cabinet',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop',
    description: 'Cadre feutré, intime et lumineux dédié à l’écoute de vos attentes.'
  },
  {
    id: 'g-4',
    title: 'Protocole Hydrafacial Médical',
    category: 'treatment',
    categoryLabel: 'Soins en Action',
    imageUrl: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop',
    description: 'Infusion sous vide d’actifs dermo-cosmétiques concentrés.'
  },
  {
    id: 'g-5',
    title: 'Dr. Ghaouat Sarra en Consultation',
    category: 'doctor',
    categoryLabel: 'L’Équipe Médicale',
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    description: 'Examen attentif et plan de traitement sur-mesure.'
  },
  {
    id: 'g-6',
    title: 'Espace Accueil & Salon d’Attente VIP',
    category: 'clinic',
    categoryLabel: 'Le Cabinet',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
    description: 'Ambiance raffinée, café et rafraîchissements pour une expérience d’exception.'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Général & Rendez-vous',
    question: 'Comment se déroule la première consultation chez GH Clinic ?',
    answer: 'La première consultation avec Dr. Ghaouat Sarra comprend une écoute approfondie de vos souhaits, une analyse morphologique et cutanée détaillée, la validation des contre-indications, ainsi que la remise d’un devis personnalisé transparent sans aucun engagement.'
  },
  {
    id: 'faq-2',
    category: 'Injectables & Botox',
    question: 'Les injections de Botox et d’acide hyaluronique sont-elles douloureuses ?',
    answer: 'Non, les gestes sont très délicats. Nous utilisons des micro-aiguilles ultra fines et nos produits de comblement contiennent un anesthésique local (Lidocaïne). Une crème anesthésiante est également appliquée au préalable pour un confort optimal.'
  },
  {
    id: 'faq-3',
    category: 'Épilation Laser',
    question: 'Combien de séances d’épilation laser faut-il pour un résultat définitif ?',
    answer: 'En moyenne 6 à 8 séances espacées de 4 à 6 semaines permettent d’éliminer plus de 90% des poils de manière permanente, grâce au respect du cycle pilaire de renouvellement.'
  },
  {
    id: 'faq-4',
    category: 'Général & Rendez-vous',
    question: 'Où se situe exactement le cabinet à Khemis Miliana ?',
    answer: 'Le cabinet de Dr. Ghaouat Sarra est idéalement situé en plein centre-ville de Khemis Miliana (Wilaya d’Aïn Defla), avec des facilités de stationnement et un accès direct depuis la route nationale et l’autoroute Est-Ouest.'
  },
  {
    id: 'faq-5',
    category: 'Soins Visage & Peelings',
    question: 'À quelle fréquence peut-on faire un soin Hydrafacial MD ?',
    answer: 'Une séance par mois est le rythme idéal pour maintenir une peau pure, débarrassée de ses toxines et des impuretés, et prévenir le vieillissement prématuré.'
  },
  {
    id: 'faq-6',
    category: 'Sécurité & Produits',
    question: 'Quelles marques de produits injectables utilisez-vous ?',
    answer: 'Nous utilisons exclusivement des laboratoires pharmaceutiques de premier rang mondial (Juvéderm Allergan, Teosyal Teoxane, Restylane Galderma, Bocouture Merz, Profhilo IBSA), certifiés conformes aux normes CE médicales et FDA.'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientName: 'Rania Haddad',
    patientPhone: '+213 551 22 33 44',
    patientEmail: 'rania.haddad@gmail.com',
    patientCity: 'Khemis Miliana',
    treatmentId: 'botox-injections',
    treatmentName: 'Botox 3 Zones (Front, Lion, Pattes d’oie)',
    date: '2026-09-10',
    timeSlot: '10:30',
    status: 'confirmed',
    notes: 'Souhaite un rendu très naturel (Baby Botox effect). Première visite.',
    isFirstVisit: true,
    createdAt: '2026-09-06T14:20:00Z',
    totalPriceDZD: 28000
  },
  {
    id: 'apt-102',
    patientName: 'Nadia Benali',
    patientPhone: '+213 662 44 55 66',
    patientEmail: 'nadia.benali@yahoo.fr',
    patientCity: 'Aïn Defla',
    treatmentId: 'laser-hair-removal',
    treatmentName: 'Épilation Laser Corps Complet',
    date: '2026-09-10',
    timeSlot: '14:00',
    status: 'confirmed',
    notes: 'Séance 4/6. Excellents progrès sur les demi-jambes.',
    isFirstVisit: false,
    createdAt: '2026-09-05T11:15:00Z',
    totalPriceDZD: 18000
  },
  {
    id: 'apt-103',
    patientName: 'Meriem Zenati',
    patientPhone: '+213 770 88 99 00',
    patientEmail: 'meriem.z@outlook.com',
    patientCity: 'Blida',
    treatmentId: 'hydrafacial-md',
    treatmentName: 'Hydrafacial MD Deluxe + LED',
    date: '2026-09-11',
    timeSlot: '11:00',
    status: 'pending',
    notes: 'Préparation peau avant fiançailles.',
    isFirstVisit: true,
    createdAt: '2026-09-07T08:10:00Z',
    totalPriceDZD: 13500
  },
  {
    id: 'apt-104',
    patientName: 'Fatima Zohra K.',
    patientPhone: '+213 540 11 22 33',
    patientEmail: 'fz.khelif@gmail.com',
    patientCity: 'Khemis Miliana',
    treatmentId: 'hyaluronic-acid-fillers',
    treatmentName: 'Acide Hyaluronique Lèvres Russian',
    date: '2026-09-12',
    timeSlot: '16:00',
    status: 'confirmed',
    notes: 'Retouche 0.5ml demandée.',
    isFirstVisit: false,
    createdAt: '2026-09-06T18:45:00Z',
    totalPriceDZD: 28000
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Rania Haddad',
    phone: '+213 551 22 33 44',
    email: 'rania.haddad@gmail.com',
    city: 'Khemis Miliana',
    firstVisitDate: '2026-09-10',
    totalVisits: 1,
    totalSpentDZD: 28000,
    lastTreatment: 'Botox 3 Zones',
    medicalNotes: 'Pas d’allergies connues. Peau fine, phototype III.'
  },
  {
    id: 'pat-2',
    name: 'Nadia Benali',
    phone: '+213 662 44 55 66',
    email: 'nadia.benali@yahoo.fr',
    city: 'Aïn Defla',
    firstVisitDate: '2026-05-12',
    totalVisits: 4,
    totalSpentDZD: 72000,
    lastTreatment: 'Épilation Laser Corps Complet',
    medicalNotes: 'Excellente tolérance au laser Diode/Alexandrite. Phototype IV.'
  },
  {
    id: 'pat-3',
    name: 'Meriem Zenati',
    phone: '+213 770 88 99 00',
    email: 'meriem.z@outlook.com',
    city: 'Blida',
    firstVisitDate: '2026-09-11',
    totalVisits: 1,
    totalSpentDZD: 13500,
    lastTreatment: 'Hydrafacial MD Deluxe',
    medicalNotes: 'Peau mixte à tendance déshydratée.'
  },
  {
    id: 'pat-4',
    name: 'Fatima Zohra K.',
    phone: '+213 540 11 22 33',
    email: 'fz.khelif@gmail.com',
    city: 'Khemis Miliana',
    firstVisitDate: '2026-01-20',
    totalVisits: 3,
    totalSpentDZD: 64000,
    lastTreatment: 'Acide Hyaluronique Lèvres',
    medicalNotes: 'Bonne réponse au Juvéderm Volift.'
  }
];

export interface InjectableItem {
  id?: string;
  serviceId?: string;
  name: string;
  priceDZD: number;
  formattedPrice?: string;
  note?: string;
}

export interface InjectableCategory {
  id: string;
  title: string;
  column: 'left' | 'right';
  items: InjectableItem[];
}

export interface LaserTariffItem {
  id?: string;
  serviceId?: string;
  zone: string;
  singleSessionDZD: number;
  pack3DZD: number;
  oldPrice3DZD: number;
  note?: string;
}

export interface LaserTariffGroup {
  id: string;
  title: string;
  column: 'left' | 'right';
  items: LaserTariffItem[];
}

export const INJECTABLES_TARIFF_DATA: InjectableCategory[] = [
  // LEFT COLUMN
  {
    id: 'soins-visage',
    title: 'SOINS VISAGE',
    column: 'left',
    items: [
      { serviceId: 'hydrafacial', name: 'Hydrafacial', priceDZD: 6000 },
      { serviceId: 'mesotherapie', name: 'Mésothérapie à partir de:', priceDZD: 6500 },
      { serviceId: 'microneedling', name: 'Microneedling à partir de :', priceDZD: 6500 }
    ]
  },
  {
    id: 'prp',
    title: 'PRP',
    column: 'left',
    items: [
      { serviceId: 'prp-visage', name: 'PRP visage', priceDZD: 6500 },
      { serviceId: 'prp-cheveux', name: 'PRP cheveux', priceDZD: 6500 },
      { serviceId: 'prp-cheveux-biotine', name: 'PRP cheveux+biotine', priceDZD: 9500 }
    ]
  },
  {
    id: 'peeling',
    title: 'PEELING',
    column: 'left',
    items: [
      { serviceId: 'peeling-visage', name: 'Visage à partir de:', priceDZD: 7000 },
      { serviceId: 'peeling-aisselles', name: 'Aisselles à partir de:', priceDZD: 5500 },
      { serviceId: 'peeling-zone-intime', name: 'Zone intime à partir de:', priceDZD: 6500 },
      { serviceId: 'peeling-coudes', name: 'Coudes à partir de:', priceDZD: 4000 },
      { serviceId: 'peeling-genoux', name: 'Genoux à partir de:', priceDZD: 4500 },
      { serviceId: 'peeling-laser-co2', name: 'Visage par laser co2 à partir', priceDZD: 8500 }
    ]
  },
  // RIGHT COLUMN
  {
    id: 'skinbooster',
    title: 'SKINBOOSTER',
    column: 'right',
    items: [
      { serviceId: 'skinbooster-hyaron', name: 'Hyaron', priceDZD: 9000 },
      { serviceId: 'skinbooster-nctf-135ha', name: 'NCTF 135 HA', priceDZD: 13000 },
      { serviceId: 'skinbooster-ejal-40', name: 'Ejal 40', priceDZD: 32000 }
    ]
  },
  {
    id: 'botox',
    title: 'BOTOX',
    column: 'right',
    items: [
      { serviceId: 'botox-full-face', name: 'Botox FULL FACE a partir', priceDZD: 30000 },
      { serviceId: 'botox-front', name: 'Botox FRONT a partir', priceDZD: 15000 },
      { serviceId: 'botox-05ml', name: 'BOTOX 0.5ml', priceDZD: 6000 }
    ]
  },
  {
    id: 'filler',
    title: 'FILLER',
    column: 'right',
    items: [
      { serviceId: 'filler-levres-05ml', name: 'Filler leveres 0.5ml', priceDZD: 12000 }
    ]
  },
  {
    id: 'lipbooster',
    title: 'LIPBOOSTER',
    column: 'right',
    items: [
      { serviceId: 'lipbooster-bacio', name: 'BACIO(hydratant lips)', priceDZD: 22000 }
    ]
  }
];

export const LASER_TARIFF_DATA: LaserTariffGroup[] = [
  // LEFT COLUMN
  {
    id: 'visage',
    title: 'VISAGE',
    column: 'left',
    items: [
      { serviceId: 'laser-cou', zone: 'COU', singleSessionDZD: 2500, pack3DZD: 6700, oldPrice3DZD: 7500 },
      { serviceId: 'laser-moustache', zone: 'MOUSTACHE', singleSessionDZD: 2000, pack3DZD: 5400, oldPrice3DZD: 6000 },
      { serviceId: 'laser-menton', zone: 'MENTON', singleSessionDZD: 2500, pack3DZD: 6700, oldPrice3DZD: 7500 },
      { serviceId: 'laser-pattes', zone: 'PATTES', singleSessionDZD: 2000, pack3DZD: 5400, oldPrice3DZD: 6000 },
      { serviceId: 'laser-visage-entier', zone: 'VISAGE ENTIER', singleSessionDZD: 5000, pack3DZD: 13500, oldPrice3DZD: 15000 }
    ]
  },
  {
    id: 'bras',
    title: 'BRAS',
    column: 'left',
    items: [
      { serviceId: 'laser-aisselles', zone: 'AISSELLES', singleSessionDZD: 3700, pack3DZD: 10000, oldPrice3DZD: 11000 },
      { serviceId: 'laser-avant-bras', zone: 'AVANT BRAS', singleSessionDZD: 4500, pack3DZD: 12100, oldPrice3DZD: 13500 },
      { serviceId: 'laser-bras-superieur', zone: 'BRAS SUPÉRIEUR', singleSessionDZD: 4000, pack3DZD: 10800, oldPrice3DZD: 12000 },
      { serviceId: 'laser-bras-entiers', zone: 'BRAS ENTIERS (SANS MAINS)', singleSessionDZD: 6500, pack3DZD: 17500, oldPrice3DZD: 19500 },
      { serviceId: 'laser-mains', zone: 'MAINS', singleSessionDZD: 1500, pack3DZD: 4000, oldPrice3DZD: 4500 }
    ]
  },
  // RIGHT COLUMN
  {
    id: 'corps',
    title: 'CORPS',
    column: 'right',
    items: [
      { serviceId: 'laser-dos-bas', zone: 'DOS-BAS', singleSessionDZD: 4500, pack3DZD: 12100, oldPrice3DZD: 13500 },
      { serviceId: 'laser-dos-haut', zone: 'DOS-HAUT', singleSessionDZD: 4500, pack3DZD: 12100, oldPrice3DZD: 13500 },
      { serviceId: 'laser-dos-entier', zone: 'DOS ENTIER A PARTIR', singleSessionDZD: 7000, pack3DZD: 18900, oldPrice3DZD: 21000 },
      { serviceId: 'laser-ventre', zone: 'VENTRE', singleSessionDZD: 4000, pack3DZD: 10800, oldPrice3DZD: 12000 },
      { serviceId: 'laser-nombril', zone: 'NOMBRIL', singleSessionDZD: 1500, pack3DZD: 4000, oldPrice3DZD: 4500 },
      { serviceId: 'laser-fesses', zone: 'FESSES A PARTIR', singleSessionDZD: 4500, pack3DZD: 12100, oldPrice3DZD: 13500 },
      { serviceId: 'laser-maillot-echancre', zone: 'MAILLOT ECHANCRE', singleSessionDZD: 4500, pack3DZD: 12100, oldPrice3DZD: 13500 },
      { serviceId: 'laser-maillot-integral', zone: 'MAILLOT INTEGRAL', singleSessionDZD: 5500, pack3DZD: 14800, oldPrice3DZD: 16500 },
      { serviceId: 'laser-sif', zone: 'SILLON INTERFESSIER (SIF)', singleSessionDZD: 1500, pack3DZD: 4000, oldPrice3DZD: 4500 }
    ]
  },
  {
    id: 'jambes',
    title: 'JAMBES',
    column: 'right',
    items: [
      { serviceId: 'laser-cuisses', zone: 'CUISSES A PARTIR', singleSessionDZD: 5500, pack3DZD: 14800, oldPrice3DZD: 16500 },
      { serviceId: 'laser-demi-jambes', zone: 'DEMI-JAMBES', singleSessionDZD: 5500, pack3DZD: 14800, oldPrice3DZD: 16500 },
      { serviceId: 'laser-jambes-completes', zone: 'JAMBES COMPLETES (SANS PIEDS) A PARTIR', singleSessionDZD: 9000, pack3DZD: 25000, oldPrice3DZD: 27000 },
      { serviceId: 'laser-pieds', zone: 'PIEDS', singleSessionDZD: 1500, pack3DZD: 4000, oldPrice3DZD: 4500 }
    ]
  }
];
