'use client';

import React from 'react';
import { LASER_TARIFF_DATA } from '@/lib/clinicData';
import { ClinicPosterBadge } from './ClinicPosterBadge';
import { PosterFooter } from './PosterFooter';
import { Calendar, Smile, Zap, Sun, Compass } from 'lucide-react';
import laserLogoImg from '@/src/assets/images/regenerated_image_1790689954804.png';

function getLaserCategoryDecoration(title: string) {
  const normalized = title.trim().toUpperCase();
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
  return {
    icon: <Smile className="w-4 h-4 text-[#8E2842] dark:text-pink-300" />,
    emoji: '👩',
  };
}

interface LaserPosterProps {
  onOpenBooking: (treatmentName?: string) => void;
}

export const LaserPoster: React.FC<LaserPosterProps> = ({ onOpenBooking }) => {
  const leftGroups = LASER_TARIFF_DATA.filter((g) => g.column === 'left');
  const rightGroups = LASER_TARIFF_DATA.filter((g) => g.column === 'right');

  return (
    <div
      id="laser-poster"
      className="relative w-full max-w-5xl mx-auto rounded-3xl p-5 sm:p-10 lg:p-12 shadow-xl border border-pink-300/80 dark:border-stone-800 overflow-hidden bg-gradient-to-br from-[#FDECEF] via-[#FFF5F7] to-[#FDE4EB] dark:from-[#181513] dark:via-[#161312] dark:to-[#1A1615]"
    >
      {/* Decorative ambient background accents */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-pink-200/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-rose-200/30 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* 1. Header with Title and Badge + Signature */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 sm:mb-10 text-center lg:text-left">
        {/* Poster Main Title */}
        <div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-tight">
            Tarification
          </h2>
          <div className="flex flex-wrap items-baseline justify-center lg:justify-start gap-2 mt-1">
            <span className="font-serif italic text-2xl sm:text-3xl text-[#C73859] dark:text-[#F4C8D4]">
              épilation laser
            </span>
            <span className="font-serif font-bold text-2xl sm:text-3xl text-[#C73859] dark:text-[#F4C8D4] tracking-wider uppercase">
              DIODE 2025
            </span>
          </div>
        </div>

        {/* Brand Badge & Caduceus Signature */}
        <div className="shrink-0">
          <ClinicPosterBadge logoSrc={laserLogoImg} />
        </div>
      </div>

      {/* 2. Two-Column Layout for Desktop & Stacked Cards for Mobile */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-start">
        
        {/* Left Column (VISAGE & BRAS) */}
        <div className="flex flex-col gap-6">
          {leftGroups.map((group) => {
            const decor = getLaserCategoryDecoration(group.title);
            return (
              <div
                key={group.id}
                id={`table-${group.id}`}
                className="rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs shadow-xs overflow-hidden"
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
                <div className="col-span-2 text-center">1 séance</div>
                <div className="col-span-3 text-center">3 séances</div>
                <div className="col-span-2 text-right">Rendez-vous</div>
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
                      onClick={() => onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`)}
                      className="hidden sm:grid grid-cols-12 items-center px-4 py-2.5 cursor-pointer group"
                      title={`Réserver pour l'épilation ${row.zone}`}
                    >
                      <div className="col-span-5 pr-2">
                        <span className="text-xs sm:text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-200 group-hover:text-[#C73859] dark:group-hover:text-[#F4C8D4] transition-colors">
                          {row.zone}
                        </span>
                      </div>
                      <div className="col-span-2 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                        <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                          {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                        </span>
                      </div>
                      <div className="col-span-3 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                            {row.pack3DZD.toLocaleString('fr-DZ')} DA
                          </span>
                          <span className="text-[11px] font-medium text-[#C73859] dark:text-stone-400 line-through">
                            {row.oldPrice3DZD.toLocaleString('fr-DZ')} DA
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 text-right border-l border-stone-700/20 dark:border-stone-700/40 pl-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`);
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#C73859] text-white text-[11px] font-sans font-semibold hover:bg-[#9E2A50] transition-all inline-flex items-center gap-1 shadow-2xs active:scale-95"
                        >
                          <Calendar className="w-3 h-3 text-pink-200" />
                          <span>Réserver</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Stacked Card View */}
                    <div className="sm:hidden p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 tracking-tight">
                          {row.zone}
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`)}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-[11px] font-sans font-semibold flex items-center gap-1 shadow-2xs active:scale-95"
                        >
                          <Calendar className="w-3 h-3 text-pink-200" />
                          <span>Réserver</span>
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

        {/* Right Column (CORPS & JAMBES) */}
        <div className="flex flex-col gap-6">
          {rightGroups.map((group) => {
            const decor = getLaserCategoryDecoration(group.title);
            return (
              <div
                key={group.id}
                id={`table-${group.id}`}
                className="rounded-2xl sm:rounded-3xl border border-stone-800/80 dark:border-stone-700/80 bg-[#FFF5F7]/95 dark:bg-[#1C1917]/95 backdrop-blur-xs shadow-xs overflow-hidden"
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
                <div className="col-span-2 text-center">1 séance</div>
                <div className="col-span-3 text-center">3 séances</div>
                <div className="col-span-2 text-right">Rendez-vous</div>
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
                      onClick={() => onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`)}
                      className="hidden sm:grid grid-cols-12 items-center px-4 py-2.5 cursor-pointer group"
                      title={`Réserver pour l'épilation ${row.zone}`}
                    >
                      <div className="col-span-5 pr-2">
                        <span className="text-xs sm:text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-200 group-hover:text-[#C73859] dark:group-hover:text-[#F4C8D4] transition-colors">
                          {row.zone}
                        </span>
                      </div>
                      <div className="col-span-2 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                        <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                          {row.singleSessionDZD.toLocaleString('fr-DZ')} DA
                        </span>
                      </div>
                      <div className="col-span-3 text-center border-l border-stone-700/20 dark:border-stone-700/40 px-1">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className="text-xs sm:text-sm font-bold text-[#8E2842] dark:text-[#F4C8D4]">
                            {row.pack3DZD.toLocaleString('fr-DZ')} DA
                          </span>
                          <span className="text-[11px] font-medium text-[#C73859] dark:text-stone-400 line-through">
                            {row.oldPrice3DZD.toLocaleString('fr-DZ')} DA
                          </span>
                        </div>
                      </div>
                      <div className="col-span-2 text-right border-l border-stone-700/20 dark:border-stone-700/40 pl-2">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`);
                          }}
                          className="px-2.5 py-1 rounded-full bg-[#C73859] text-white text-[11px] font-sans font-semibold hover:bg-[#9E2A50] transition-all inline-flex items-center gap-1 shadow-2xs active:scale-95"
                        >
                          <Calendar className="w-3 h-3 text-pink-200" />
                          <span>Réserver</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Stacked Card View */}
                    <div className="sm:hidden p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 tracking-tight">
                          {row.zone}
                        </span>
                        <button
                          type="button"
                          onClick={() => onOpenBooking(row.serviceId || `Épilation Laser ${row.zone}`)}
                          className="px-3 py-1 rounded-full bg-gradient-to-r from-[#C73859] to-[#9E2A50] text-white text-[11px] font-sans font-semibold flex items-center gap-1 shadow-2xs active:scale-95"
                        >
                          <Calendar className="w-3 h-3 text-pink-200" />
                          <span>Réserver</span>
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

      </div>

      {/* 3. Footer: "Prenez rendez-vous", Phone, Location, Stethoscope & CTA */}
      <div className="relative z-10">
        <PosterFooter onOpenBooking={onOpenBooking} />
      </div>
    </div>
  );
};
