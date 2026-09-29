'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Phone,
  MapPin,
  Syringe,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Layers,
  Droplets,
  Gem,
  Heart,
  Smile,
  Sun,
  Compass
} from 'lucide-react';
import { Treatment, INJECTABLES_TARIFF_DATA, LASER_TARIFF_DATA } from '@/lib/clinicData';
import { ClinicPosterBadge } from './pricing/ClinicPosterBadge';
import { AppointmentCtaSection } from './AppointmentCtaSection';
import laserImg from '@/src/assets/images/regenerated_image_1788824049965.jpg';
import botoxImg from '@/src/assets/images/regenerated_image_1788824051653.jpg';
import fillersImg from '@/src/assets/images/regenerated_image_1788821569480.jpg';
import hydrafacialImg from '@/src/assets/images/regenerated_image_1788821571843.jpg';
import laserLogoImg from '@/src/assets/images/regenerated_image_1790689954804.png';
import injectablesLogoImg from '@/src/assets/images/regenerated_image_1790689969563.png';

function getCategoryDecoration(title: string) {
  const normalized = title.trim().toUpperCase();
  if (normalized.includes('PRP')) {
    return {
      icon: <Activity className="w-4 h-4 text-rose-600 dark:text-rose-400" />,
      emoji: '🧬',
    };
  }
  if (normalized.includes('PEELING')) {
    return {
      icon: <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />,
      emoji: '🌸',
    };
  }
  if (normalized.includes('SKINBOOSTER')) {
    return {
      icon: <Droplets className="w-4 h-4 text-sky-600 dark:text-sky-400" />,
      emoji: '💧',
    };
  }
  if (normalized.includes('BOTOX')) {
    return {
      icon: <Syringe className="w-4 h-4 text-[#9E2A50] dark:text-pink-300" />,
      emoji: '💉',
    };
  }
  if (normalized.includes('FILLER')) {
    return {
      icon: <Gem className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D]" />,
      emoji: '💎',
    };
  }
  if (normalized.includes('LIPBOOSTER') || normalized.includes('LIP')) {
    return {
      icon: <Heart className="w-4 h-4 text-rose-600 fill-rose-500/20" />,
      emoji: '💋',
    };
  }
  if (normalized.includes('BRAS')) {
    return {
      icon: <Zap className="w-4 h-4 text-[#8E2842] dark:text-pink-300" />,
      emoji: '⚡',
    };
  }
  if (normalized.includes('CORPS')) {
    return {
      icon: <Sun className="w-4 h-4 text-[#8E2842] dark:text-pink-300" />,
      emoji: '🌟',
    };
  }
  if (normalized.includes('JAMBES')) {
    return {
      icon: <Compass className="w-4 h-4 text-[#8E2842] dark:text-pink-300" />,
      emoji: '🦵',
    };
  }
  if (normalized.includes('VISAGE') && (normalized.includes('LASER') || normalized.includes('COU'))) {
    return {
      icon: <Smile className="w-4 h-4 text-[#8E2842] dark:text-pink-300" />,
      emoji: '👩',
    };
  }
  return {
    icon: <Sparkles className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D]" />,
    emoji: '✨',
  };
}

interface BestSellerCardData {
  id: string;
  category: string;
  title: string;
  description: string;
  priceLabel: string;
  priceDZD: number;
  image: string;
  serviceId: string;
  bookingTreatmentName: string;
}

interface TarificationSectionProps {
  treatments?: Treatment[];
  onSelectTreatment?: (treatment: Treatment) => void;
  onBookTreatment: (treatmentNameOrId: string) => void;
}

export const TarificationSection: React.FC<TarificationSectionProps> = ({
  onBookTreatment,
}) => {
  // 1. The EXACT 4 Best-Seller Treatments required
  const bestSellers: BestSellerCardData[] = [
    {
      id: 'best-seller-laser',
      category: 'Épilation Laser',
      title: 'Épilation Laser Médicale',
      description: 'Une technologie laser médicale pour une peau plus lisse et durablement nette.',
      priceLabel: 'À partir de',
      priceDZD: 4500,
      image: typeof laserImg === 'string' ? laserImg : laserImg.src,
      serviceId: 'laser-hair-removal',
      bookingTreatmentName: 'Épilation Laser Médicale',
    },
    {
      id: 'best-seller-botox',
      category: 'Injectables',
      title: 'Botox',
      description: 'Un soin médical précis pour lisser les rides d’expression et harmoniser les traits.',
      priceLabel: 'À partir de',
      priceDZD: 6000,
      image: typeof botoxImg === 'string' ? botoxImg : botoxImg.src,
      serviceId: 'botox-05ml',
      bookingTreatmentName: 'Injections de Botox',
    },
    {
      id: 'best-seller-filler',
      category: 'Injectables',
      title: 'Filler Lèvres',
      description: 'Redéfinir et sublimer les lèvres avec un résultat naturel et harmonieux.',
      priceLabel: 'À partir de',
      priceDZD: 12000,
      image: typeof fillersImg === 'string' ? fillersImg : fillersImg.src,
      serviceId: 'filler-levres-05ml',
      bookingTreatmentName: 'Filler Lèvres (Acide Hyaluronique)',
    },
    {
      id: 'best-seller-hydrafacial',
      category: 'Soins Visage',
      title: 'Hydrafacial',
      description: 'Un soin complet pour nettoyer, hydrater et révéler l’éclat naturel de la peau.',
      priceLabel: '',
      priceDZD: 6000,
      image: typeof hydrafacialImg === 'string' ? hydrafacialImg : hydrafacialImg.src,
      serviceId: 'hydrafacial',
      bookingTreatmentName: 'Hydrafacial Médical',
    },
  ];

  // 2. Injectables data split by column
  const leftInjectables = INJECTABLES_TARIFF_DATA.filter((c) => c.column === 'left'); // SOINS VISAGE, PRP, PEELING
  const rightInjectables = INJECTABLES_TARIFF_DATA.filter((c) => c.column === 'right'); // SKINBOOSTER, BOTOX, FILLER, LIPBOOSTER

  // 3. Laser data split by column
  const leftLaser = LASER_TARIFF_DATA.filter((g) => g.column === 'left'); // VISAGE, BRAS
  const rightLaser = LASER_TARIFF_DATA.filter((g) => g.column === 'right'); // CORPS, JAMBES

  return (
    <section
      id="tarification"
      className="py-20 sm:py-28 relative overflow-hidden transition-colors duration-500 bg-gradient-to-b from-[#FAF8F5] via-[#FFF5F7] to-[#FAF8F5] dark:from-[#0C0A09] dark:via-[#141210] dark:to-[#0C0A09]"
    >
      {/* Target anchors for backward compatibility */}
      <span id="treatments" className="absolute -top-24 pointer-events-none" />
      <span id="pricing" className="absolute -top-24 pointer-events-none" />

      {/* Soft Ambient Accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-pink-200/25 dark:bg-pink-950/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[400px] bg-rose-200/20 dark:bg-rose-950/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[500px] bg-pink-200/20 dark:bg-pink-950/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================================= */}
        {/* 1. SECTION MAIN TITLE & SUBTITLE                                         */}
        {/* ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 sm:mb-18">
          
          {/* Subtle Clinic Emblem Badge */}
          <div className="flex justify-center mb-2">
            <ClinicPosterBadge />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 dark:bg-stone-900/90 border border-pink-200/90 dark:border-pink-900/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-300" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50] dark:text-pink-300">
              Tarification & Soins
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-tight">
            Tarification
          </h2>

          <p className="text-[#9E2A50] dark:text-[#F4C8D4] font-serif italic text-xl sm:text-2xl font-medium">
            Découvrez nos soins et leurs tarifs
          </p>

          <p className="text-stone-600 dark:text-stone-300 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Chaque acte est personnalisé et réalisé sous contrôle médical strict avec des technologies certifiées de classe médicale, pour révéler l’éclat naturel de votre peau en toute sécurité.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 2. ONLY 4 BEST-SELLER CARDS (Staggered Scroll Reveal & Branded Hover)     */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 items-stretch mb-20 sm:mb-24">
          {bestSellers.map((card, index) => (
            <motion.div
              key={card.id}
              id={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group rounded-3xl bg-white/95 dark:bg-[#181513] backdrop-blur-xs border border-pink-200/80 dark:border-stone-800 p-5 sm:p-6 shadow-xs gh-card-hover flex flex-col justify-between space-y-5 relative overflow-hidden"
            >
              {/* Decorative subtle top border highlight on hover */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-200 via-[#D8436B] to-pink-200 dark:from-pink-900/40 dark:via-[#C73859] dark:to-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Upper Card: Visual Image with Sheen + Badges */}
              <div className="space-y-4">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-pink-50 dark:bg-stone-800 shadow-2xs gh-img-sheen">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-50 transition-opacity" />

                  {/* Category Badge (Top Left) */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 dark:bg-stone-900/90 backdrop-blur-md text-[#9E2A50] dark:text-pink-300 text-[11px] font-serif font-bold uppercase tracking-wider shadow-2xs border border-pink-200 dark:border-stone-700 group-hover:border-pink-300 group-hover:bg-white dark:group-hover:bg-stone-900 transition-all">
                      {card.category === 'Épilation Laser' && <Zap className="w-3 h-3 text-[#C73859] dark:text-[#DFBA9D]" />}
                      {card.category === 'Injectables' && <Syringe className="w-3 h-3 text-[#C73859] dark:text-[#DFBA9D]" />}
                      {card.category === 'Soins Visage' && <Sparkles className="w-3 h-3 text-[#C73859] dark:text-[#DFBA9D]" />}
                      <span>{card.category}</span>
                      <span className="text-xs">
                        {card.category === 'Épilation Laser' ? '⚡' : card.category === 'Injectables' ? '💉' : '✨'}
                      </span>
                    </span>
                  </div>

                  {/* Best-Seller Ribbon Badge (Top Right) */}
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-[10px] font-serif font-bold uppercase tracking-wider shadow-xs group-hover:scale-105 transition-transform">
                      <Sparkles className="w-2.5 h-2.5 text-pink-200" />
                      <span>BEST-SELLER</span>
                    </span>
                  </div>
                </div>

                {/* Treatment Title */}
                <div>
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5] group-hover:text-[#9E2A50] dark:group-hover:text-[#F4C8D4] transition-colors leading-snug">
                    {card.title}
                  </h3>

                  {/* Short Elegant Description */}
                  <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm font-light mt-2 line-clamp-3 leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Lower Card: Pricing & Appointment CTA */}
              <div className="pt-4 border-t border-pink-100/90 dark:border-stone-800 space-y-3.5">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-serif italic">
                    {card.priceLabel ? card.priceLabel : 'Tarif'}
                  </span>
                  <span className="font-serif font-bold text-2xl text-[#8E2842] dark:text-[#F4C8D4] tracking-tight group-hover:scale-105 transition-transform duration-300">
                    {card.priceDZD.toLocaleString('fr-DZ')} DA
                  </span>
                </div>

                <button
                  onClick={() => onBookTreatment(card.serviceId || card.bookingTreatmentName)}
                  className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white text-xs font-serif font-bold tracking-wider uppercase shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
                  id={`btn-book-${card.id}`}
                >
                  <Calendar className="w-3.5 h-3.5 text-pink-200" />
                  <span>Prendre rendez-vous</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* 3. COMPLETE TARIFF IN-PAGE INTRODUCTION BANNER                            */}
        {/* ========================================================================= */}
        <div className="relative mb-14 text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 border border-pink-200/90 dark:border-pink-900/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-300" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50] dark:text-pink-300">
              Grille Tarifaire Complète
            </span>
          </div>

          <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-[#FAF8F5] tracking-tight">
            Tarifs Détaillés des Soins
          </h3>

          <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            Consultez directement ci-dessous l’ensemble de nos tarifs officiels en Dinars Algériens (DZD). Tous les actes médicaux sont pratiqués avec du matériel stérile certifié CE & FDA.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 4. COMPLETE INJECTABLE TARIFF (Directly Visible In-Page)                   */}
        {/* ========================================================================= */}
        <div
          id="injectables-complete-tariff"
          className="relative w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-pink-300/80 dark:border-stone-800 mb-16 sm:mb-20 overflow-hidden bg-gradient-to-br from-[#FDECEF] via-[#FFF5F7] to-[#FDE4EB] dark:from-[#181513] dark:via-[#161312] dark:to-[#1A1615]"
        >
          {/* Decorative ambient background accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-200/30 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Badge & Caduceus */}
          <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-10">
            <ClinicPosterBadge logoSrc={injectablesLogoImg} />

            <div className="mt-4 sm:mt-5">
              <span className="text-xs sm:text-sm font-serif font-bold text-[#9E2A50] dark:text-[#DFBA9D] uppercase tracking-widest block mb-1">
                Tarification Officielle
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-tight">
                INJECTABLES & SOINS DU VISAGE
              </h3>
            </div>
          </div>

          {/* Two-Column Cards Grid */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: SOINS VISAGE, PRP, PEELING */}
            <div className="flex flex-col gap-6">
              {leftInjectables.map((category) => {
                const decor = getCategoryDecoration(category.title);
                return (
                  <div
                    key={category.id}
                    id={`tariff-card-${category.id}`}
                    className="group rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-pink-300/90 dark:hover:border-pink-900/80 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Category Title with Vector Icon, Emoji & Pink/Rose Underline */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 border-b-2 border-[#C73859] dark:border-[#DFBA9D] pb-1">
                        <span className="w-7 h-7 rounded-xl bg-rose-100/90 dark:bg-stone-800 border border-pink-200 dark:border-stone-700 flex items-center justify-center shadow-2xs shrink-0">
                          {decor.icon}
                        </span>
                        <span className="font-serif font-bold text-base sm:text-lg tracking-widest text-[#C73859] dark:text-[#F4C8D4] uppercase">
                          {category.title}
                        </span>
                      </div>
                      <span className="text-base select-none pl-2" role="img" aria-label={category.title}>
                        {decor.emoji}
                      </span>
                    </div>

                  {/* Items List */}
                  <ul className="space-y-3 font-serif">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => onBookTreatment(item.serviceId || item.name)}
                        className="flex items-baseline justify-between gap-2 text-stone-900 dark:text-stone-200 group/item cursor-pointer hover:text-[#C73859] dark:hover:text-[#F4C8D4] transition-colors py-1 rounded-lg px-2 -mx-2 hover:bg-rose-50/60 dark:hover:bg-stone-800/60"
                        title={`Réserver pour : ${item.name}`}
                      >
                        <div className="flex items-baseline gap-2 min-w-0 pr-2">
                          <span className="text-[#C73859] dark:text-[#DFBA9D] font-bold text-sm shrink-0">•</span>
                          <span className="text-sm sm:text-base font-normal tracking-tight truncate group-hover/item:font-medium">
                            {item.name}
                          </span>
                        </div>

                        {/* Dotted Leader Line */}
                        <span className="flex-1 border-b border-dotted border-stone-400/60 dark:border-stone-700 mx-1 hidden sm:block relative -top-1" />

                        {/* Price in DA & booking badge */}
                        <div className="flex items-baseline gap-2 shrink-0">
                          <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-950 dark:text-[#FAF8F5] group-hover/item:text-[#C73859] dark:group-hover/item:text-[#F4C8D4]">
                            {item.priceDZD.toLocaleString('fr-DZ')} DA
                          </span>
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C73859]/10 dark:bg-[#DFBA9D]/20 text-[#C73859] dark:text-[#DFBA9D] group-hover/item:bg-[#C73859] dark:group-hover/item:bg-[#9E2A50] group-hover/item:text-white transition-all hidden sm:inline-block">
                            Réserver
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            </div>

            {/* Right Column: SKINBOOSTER, BOTOX, FILLER, LIPBOOSTER */}
            <div className="flex flex-col gap-6">
              {rightInjectables.map((category) => {
                const decor = getCategoryDecoration(category.title);
                return (
                  <div
                    key={category.id}
                    id={`tariff-card-${category.id}`}
                    className="group rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs p-5 sm:p-6 shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-pink-300/90 dark:hover:border-pink-900/80 transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Category Title with Vector Icon, Emoji & Pink/Rose Underline */}
                    <div className="mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 border-b-2 border-[#C73859] dark:border-[#DFBA9D] pb-1">
                        <span className="w-7 h-7 rounded-xl bg-rose-100/90 dark:bg-stone-800 border border-pink-200 dark:border-stone-700 flex items-center justify-center shadow-2xs shrink-0">
                          {decor.icon}
                        </span>
                        <span className="font-serif font-bold text-base sm:text-lg tracking-widest text-[#C73859] dark:text-[#F4C8D4] uppercase">
                          {category.title}
                        </span>
                      </div>
                      <span className="text-base select-none pl-2" role="img" aria-label={category.title}>
                        {decor.emoji}
                      </span>
                    </div>

                  {/* Items List */}
                  <ul className="space-y-3 font-serif">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        onClick={() => onBookTreatment(item.serviceId || item.name)}
                        className="flex items-baseline justify-between gap-2 text-stone-900 dark:text-stone-200 group/item cursor-pointer hover:text-[#C73859] dark:hover:text-[#F4C8D4] transition-colors py-1 rounded-lg px-2 -mx-2 hover:bg-rose-50/60 dark:hover:bg-stone-800/60"
                        title={`Réserver pour : ${item.name}`}
                      >
                        <div className="flex items-baseline gap-2 min-w-0 pr-2">
                          <span className="text-[#C73859] dark:text-[#DFBA9D] font-bold text-sm shrink-0">•</span>
                          <span className="text-sm sm:text-base font-normal tracking-tight truncate group-hover/item:font-medium">
                            {item.name}
                          </span>
                        </div>

                        {/* Dotted Leader Line */}
                        <span className="flex-1 border-b border-dotted border-stone-400/60 dark:border-stone-700 mx-1 hidden sm:block relative -top-1" />

                        {/* Price in DA & booking badge */}
                        <div className="flex items-baseline gap-2 shrink-0">
                          <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-950 dark:text-[#FAF8F5] group-hover/item:text-[#C73859] dark:group-hover/item:text-[#F4C8D4]">
                            {item.priceDZD.toLocaleString('fr-DZ')} DA
                          </span>
                          <span className="text-[10px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C73859]/10 dark:bg-[#DFBA9D]/20 text-[#C73859] dark:text-[#DFBA9D] group-hover/item:bg-[#C73859] dark:group-hover/item:bg-[#9E2A50] group-hover/item:text-white transition-all hidden sm:inline-block">
                            Réserver
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 5. COMPLETE LASER TARIFF (ÉPILATION LASER DIODE 2025 In-Page)             */}
        {/* ========================================================================= */}
        <div
          id="laser-complete-tariff"
          className="relative w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-pink-300/80 dark:border-stone-800 mb-20 overflow-hidden bg-gradient-to-br from-[#FDECEF] via-[#FFF5F7] to-[#FDE4EB] dark:from-[#181513] dark:via-[#161312] dark:to-[#1A1615]"
        >
          {/* Decorative ambient background accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-200/30 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

          {/* Header with Title and Badge + Signature */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 sm:mb-10 text-center lg:text-left">
            <div>
              <span className="text-xs sm:text-sm font-serif font-bold text-[#9E2A50] dark:text-[#DFBA9D] uppercase tracking-widest block mb-1">
                Tarification Médicale
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-tight">
                ÉPILATION LASER{' '}
                <span className="text-[#C73859] dark:text-[#F4C8D4] tracking-wider uppercase">
                  DIODE 2025
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif italic mt-1">
                Forfaits 3 séances à tarif préférentiel & tarifs à la séance
              </p>
            </div>

            <div className="shrink-0">
              <ClinicPosterBadge logoSrc={laserLogoImg} />
            </div>
          </div>

          {/* Two-Column Layout for Laser Data */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
            
            {/* Left Column: VISAGE & MAILLOT */}
            <div className="flex flex-col gap-6">
              {leftLaser.map((group) => {
                const decor = getCategoryDecoration(`LASER ${group.title}`);
                return (
                  <div
                    key={group.id}
                    id={`laser-table-${group.id}`}
                    className="rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-pink-300/90 dark:hover:border-pink-900/80 transition-all duration-300 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 border-b border-stone-800/80 dark:border-stone-700/80 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-stone-800 border border-[#C73859]/30 flex items-center justify-center shadow-2xs shrink-0">
                          {decor.icon}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E58C9D]/20 dark:bg-pink-950/60 text-[#8E2842] dark:text-pink-300 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase border border-[#C73859]/30 dark:border-pink-900/50">
                          <span>{group.title}</span>
                          <span className="text-xs">{decor.emoji}</span>
                        </span>
                      </div>
                      <span className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 hidden sm:inline">
                        1 séance vs 3 séances
                      </span>
                    </div>

                  {/* Desktop Table Header Row (Hidden on mobile) */}
                  <div className="hidden sm:grid grid-cols-12 items-center bg-pink-50/60 dark:bg-stone-900/60 border-b border-stone-700/20 dark:border-stone-700/40 px-4 py-2 text-xs font-serif italic text-stone-700 dark:text-stone-300 font-medium">
                    <div className="col-span-5">Zone</div>
                    <div className="col-span-3 text-center">1 séance</div>
                    <div className="col-span-2 text-center">3 séances</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>

                  {/* Rows List */}
                  <div className="divide-y divide-stone-700/20 dark:divide-stone-700/40 font-serif">
                    {group.items.map((row, idx) => (
                      <div
                        key={idx}
                        className="hover:bg-rose-50/80 dark:hover:bg-stone-800/60 transition-colors"
                      >
                        {/* Desktop View (Table row) */}
                        <div
                          onClick={() => onBookTreatment(row.serviceId || `Épilation Laser ${row.zone}`)}
                          className="hidden sm:grid grid-cols-12 items-center px-4 py-2.5 cursor-pointer group"
                          title={`Réserver pour l'épilation ${row.zone}`}
                        >
                          <div className="col-span-5 pr-2">
                            <span className="text-xs sm:text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-200 group-hover:text-[#C73859] dark:group-hover:text-[#F4C8D4] transition-colors">
                              {row.zone}
                            </span>
                          </div>
                          <div className="col-span-3 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                            <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                              {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                            </span>
                          </div>
                          <div className="col-span-2 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                            <span className="text-xs sm:text-sm font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                              {row.pack3DZD.toLocaleString('fr-DZ')} DA
                            </span>
                          </div>
                          <div className="col-span-2 text-right pl-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C73859]/10 dark:bg-[#DFBA9D]/20 text-[#C73859] dark:text-[#DFBA9D] group-hover:bg-[#C73859] dark:group-hover:bg-[#9E2A50] group-hover:text-white transition-all shadow-2xs">
                              Réserver
                            </span>
                          </div>
                        </div>

                        {/* Mobile Stacked Card View */}
                        <div className="sm:hidden p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 tracking-tight">
                              {row.zone}
                            </span>
                            <button
                              onClick={() => onBookTreatment(row.serviceId || `Épilation Laser ${row.zone}`)}
                              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-[11px] font-serif font-semibold flex items-center gap-1 shadow-2xs"
                            >
                              <Calendar className="w-3 h-3 text-pink-200" />
                              <span>Rendez-vous</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-pink-100 dark:border-stone-700 flex flex-col">
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-serif italic">1 séance</span>
                              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                                {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                              </span>
                            </div>

                            <div className="p-2 rounded-xl bg-pink-50/80 dark:bg-stone-900 border border-pink-200 dark:border-stone-700 flex flex-col">
                              <span className="text-[10px] text-[#9E2A50] dark:text-pink-300 font-serif italic">3 séances</span>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                                  {row.pack3DZD.toLocaleString('fr-DZ')} DA
                                </span>
                                <span className="text-[10px] font-medium text-[#C73859] dark:text-stone-400 line-through">
                                  {row.oldPrice3DZD.toLocaleString('fr-DZ')} DA
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            </div>

            {/* Right Column: CORPS & JAMBES */}
            <div className="flex flex-col gap-6">
              {rightLaser.map((group) => {
                const decor = getCategoryDecoration(`LASER ${group.title}`);
                return (
                  <div
                    key={group.id}
                    id={`laser-table-${group.id}`}
                    className="rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs shadow-xs hover:shadow-lg hover:-translate-y-1 hover:border-pink-300/90 dark:hover:border-pink-900/80 transition-all duration-300 overflow-hidden"
                  >
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 border-b border-stone-800/80 dark:border-stone-700/80 px-4 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-white dark:bg-stone-800 border border-[#C73859]/30 flex items-center justify-center shadow-2xs shrink-0">
                          {decor.icon}
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E58C9D]/20 dark:bg-pink-950/60 text-[#8E2842] dark:text-pink-300 font-serif font-bold text-xs sm:text-sm tracking-widest uppercase border border-[#C73859]/30 dark:border-pink-900/50">
                          <span>{group.title}</span>
                          <span className="text-xs">{decor.emoji}</span>
                        </span>
                      </div>
                      <span className="text-[11px] font-serif italic text-stone-600 dark:text-stone-400 hidden sm:inline">
                        1 séance vs 3 séances
                      </span>
                    </div>

                  {/* Desktop Table Header Row (Hidden on mobile) */}
                  <div className="hidden sm:grid grid-cols-12 items-center bg-pink-50/60 dark:bg-stone-900/60 border-b border-stone-700/20 dark:border-stone-700/40 px-4 py-2 text-xs font-serif italic text-stone-700 dark:text-stone-300 font-medium">
                    <div className="col-span-5">Zone</div>
                    <div className="col-span-3 text-center">1 séance</div>
                    <div className="col-span-2 text-center">3 séances</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>

                  {/* Rows List */}
                  <div className="divide-y divide-stone-700/20 dark:divide-stone-700/40 font-serif">
                    {group.items.map((row, idx) => (
                      <div
                        key={idx}
                        className="hover:bg-rose-50/80 dark:hover:bg-stone-800/60 transition-colors"
                      >
                        {/* Desktop View (Table row) */}
                        <div
                          onClick={() => onBookTreatment(row.serviceId || `Épilation Laser ${row.zone}`)}
                          className="hidden sm:grid grid-cols-12 items-center px-4 py-2.5 cursor-pointer group"
                          title={`Réserver pour l'épilation ${row.zone}`}
                        >
                          <div className="col-span-5 pr-2">
                            <span className="text-xs sm:text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-200 group-hover:text-[#C73859] dark:group-hover:text-[#F4C8D4] transition-colors">
                              {row.zone}
                            </span>
                          </div>
                          <div className="col-span-3 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                            <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                              {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                            </span>
                          </div>
                          <div className="col-span-2 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                            <span className="text-xs sm:text-sm font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                              {row.pack3DZD.toLocaleString('fr-DZ')} DA
                            </span>
                          </div>
                          <div className="col-span-2 text-right pl-1">
                            <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold px-2 py-0.5 rounded-full bg-[#C73859]/10 dark:bg-[#DFBA9D]/20 text-[#C73859] dark:text-[#DFBA9D] group-hover:bg-[#C73859] dark:group-hover:bg-[#9E2A50] group-hover:text-white transition-all shadow-2xs">
                              Réserver
                            </span>
                          </div>
                        </div>

                        {/* Mobile Stacked Card View */}
                        <div className="sm:hidden p-3.5 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 tracking-tight">
                              {row.zone}
                            </span>
                            <button
                              onClick={() => onBookTreatment(row.serviceId || `Épilation Laser ${row.zone}`)}
                              className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-[11px] font-serif font-semibold flex items-center gap-1 shadow-2xs"
                            >
                              <Calendar className="w-3 h-3 text-pink-200" />
                              <span>Rendez-vous</span>
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2 pt-1">
                            <div className="p-2 rounded-xl bg-white dark:bg-stone-800 border border-pink-100 dark:border-stone-700 flex flex-col">
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-serif italic">1 séance</span>
                              <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                                {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                              </span>
                            </div>

                            <div className="p-2 rounded-xl bg-pink-50/80 dark:bg-stone-900 border border-pink-200 dark:border-stone-700 flex flex-col">
                              <span className="text-[10px] text-[#9E2A50] dark:text-pink-300 font-serif italic">3 séances</span>
                              <div className="flex items-baseline gap-1.5 flex-wrap">
                                <span className="text-xs font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                                  {row.pack3DZD.toLocaleString('fr-DZ')} DA
                                </span>
                                <span className="text-[10px] font-medium text-[#C73859] dark:text-stone-400 line-through">
                                  {row.oldPrice3DZD.toLocaleString('fr-DZ')} DA
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* 6. APPOINTMENT CTA AT THE BOTTOM (PRENEZ RENDEZ-VOUS - LUXURY SECTION)     */}
        {/* ========================================================================= */}
        <div className="pt-8 sm:pt-12 border-t border-pink-200/80 dark:border-stone-800">
          <AppointmentCtaSection
            onOpenBooking={(name) => onBookTreatment(name || 'consultation')}
            phone="0663419994"
            locationText="Hai el salem"
            locationDetails="(à coté de Sonelgaz)"
            doctorName="Dr Ghaouat Sarra"
          />
        </div>

      </div>
    </section>
  );
};

// Backwards compatibility export
export const TreatmentsSection = TarificationSection;
export default TarificationSection;
