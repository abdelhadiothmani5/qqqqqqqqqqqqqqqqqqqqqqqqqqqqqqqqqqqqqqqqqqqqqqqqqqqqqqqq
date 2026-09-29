'use client';

import React from 'react';
import { INJECTABLES_TARIFF_DATA } from '@/lib/clinicData';
import { ClinicPosterBadge } from './ClinicPosterBadge';
import { PosterFooter } from './PosterFooter';
import {
  Calendar,
  Sparkles,
  Activity,
  Layers,
  Droplets,
  Syringe,
  Gem,
  Heart
} from 'lucide-react';
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
  return {
    icon: <Sparkles className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D]" />,
    emoji: '✨',
  };
}

interface InjectablesPosterProps {
  onOpenBooking: (treatmentName?: string) => void;
}

export const InjectablesPoster: React.FC<InjectablesPosterProps> = ({ onOpenBooking }) => {
  const leftCategories = INJECTABLES_TARIFF_DATA.filter((c) => c.column === 'left');
  const rightCategories = INJECTABLES_TARIFF_DATA.filter((c) => c.column === 'right');

  return (
    <div
      id="injectables-poster"
      className="relative w-full max-w-5xl mx-auto rounded-3xl p-5 sm:p-10 lg:p-12 shadow-xl border border-pink-300/80 dark:border-stone-800 overflow-hidden bg-gradient-to-br from-[#FDECEF] via-[#FFF5F7] to-[#FDE4EB] dark:from-[#181513] dark:via-[#161312] dark:to-[#1A1615]"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-200/30 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header with Badge, Caduceus & Signature */}
      <div className="relative z-10 flex flex-col items-center text-center mb-8 sm:mb-10">
        <ClinicPosterBadge logoSrc={injectablesLogoImg} />

        {/* Poster Main Title */}
        <div className="mt-4 sm:mt-6">
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-tight">
            Tarification
          </h2>
          <div className="font-serif font-bold text-2xl sm:text-3xl lg:text-4xl text-[#C73859] dark:text-[#F4C8D4] tracking-wider uppercase mt-1">
            INJECTABLES:
          </div>
        </div>
      </div>

      {/* 2. Two-Column Cards Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (SOINS VISAGE, PRP, PEELING) */}
        <div className="flex flex-col gap-6">
          {leftCategories.map((category) => {
            const decor = getCategoryDecoration(category.title);
            return (
              <div
                key={category.id}
                id={`card-${category.id}`}
                className="group rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/90 dark:bg-[#1C1917]/95 backdrop-blur-xs p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
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
                    onClick={() => onOpenBooking(item.serviceId || item.name)}
                    className="flex items-center justify-between gap-2 text-stone-900 dark:text-stone-200 group/item cursor-pointer hover:text-[#C73859] dark:hover:text-[#F4C8D4] transition-colors py-1.5 rounded-lg px-2 -mx-2 hover:bg-rose-50/60 dark:hover:bg-stone-800/60"
                    title={`Réserver pour : ${item.name}`}
                  >
                    <div className="flex items-baseline gap-2 min-w-0 pr-2">
                      <span className="text-[#C73859] dark:text-[#DFBA9D] font-bold text-sm shrink-0">•</span>
                      <span className="text-sm sm:text-base font-normal tracking-tight truncate group-hover/item:font-medium">
                        {item.name}
                      </span>
                    </div>

                    {/* Dotted Leader Line */}
                    <span className="flex-1 border-b border-dotted border-stone-400/60 dark:border-stone-700 mx-1 hidden sm:block relative -top-0.5" />

                    {/* Price in DA & Réserver button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-950 dark:text-[#FAF8F5] group-hover/item:text-[#C73859] dark:group-hover/item:text-[#F4C8D4]">
                        {item.priceDZD.toLocaleString('fr-DZ')} DA
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(item.serviceId || item.name);
                        }}
                        className="text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full bg-[#C73859] text-white hover:bg-[#9E2A50] transition-all flex items-center gap-1 shadow-2xs active:scale-95"
                      >
                        <Calendar className="w-3 h-3 text-pink-200" />
                        <span>Réserver</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        </div>

        {/* Right Column (SKINBOOSTER, BOTOX, FILLER, LIPBOOSTER) */}
        <div className="flex flex-col gap-6">
          {rightCategories.map((category) => {
            const decor = getCategoryDecoration(category.title);
            return (
              <div
                key={category.id}
                id={`card-${category.id}`}
                className="group rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/90 dark:bg-[#1C1917]/95 backdrop-blur-xs p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden"
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
                    onClick={() => onOpenBooking(item.serviceId || item.name)}
                    className="flex items-center justify-between gap-2 text-stone-900 dark:text-stone-200 group/item cursor-pointer hover:text-[#C73859] dark:hover:text-[#F4C8D4] transition-colors py-1.5 rounded-lg px-2 -mx-2 hover:bg-rose-50/60 dark:hover:bg-stone-800/60"
                    title={`Réserver pour : ${item.name}`}
                  >
                    <div className="flex items-baseline gap-2 min-w-0 pr-2">
                      <span className="text-[#C73859] dark:text-[#DFBA9D] font-bold text-sm shrink-0">•</span>
                      <span className="text-sm sm:text-base font-normal tracking-tight truncate group-hover/item:font-medium">
                        {item.name}
                      </span>
                    </div>

                    {/* Dotted Leader Line */}
                    <span className="flex-1 border-b border-dotted border-stone-400/60 dark:border-stone-700 mx-1 hidden sm:block relative -top-0.5" />

                    {/* Price in DA & Réserver button */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-stone-950 dark:text-[#FAF8F5] group-hover/item:text-[#C73859] dark:group-hover/item:text-[#F4C8D4]">
                        {item.priceDZD.toLocaleString('fr-DZ')} DA
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenBooking(item.serviceId || item.name);
                        }}
                        className="text-[11px] font-sans font-semibold px-2.5 py-1 rounded-full bg-[#C73859] text-white hover:bg-[#9E2A50] transition-all flex items-center gap-1 shadow-2xs active:scale-95"
                      >
                        <Calendar className="w-3 h-3 text-pink-200" />
                        <span>Réserver</span>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
        </div>

      </div>

      {/* 3. Poster Bottom Section */}
      <PosterFooter onOpenBooking={onOpenBooking} />
    </div>
  );
};
