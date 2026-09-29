'use client';

import React from 'react';
import type { StaticImageData } from 'next/image';
import { ClinicLogo } from '@/components/ClinicLogo';

export interface ClinicPosterBadgeProps {
  logoSrc?: string | StaticImageData;
}

export const ClinicPosterBadge: React.FC<ClinicPosterBadgeProps> = ({ logoSrc }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-2 pb-1">
      {/* Official Emblem Badge: GH CLINIC By Dr. Ghaouat Sarra */}
      <div className="flex items-center gap-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-4 py-2 rounded-full shadow-xs border border-pink-200/80 dark:border-stone-700/80 group">
        <ClinicLogo
          size="sm"
          src={logoSrc}
          className="w-12 h-12 shrink-0 group-hover:scale-105 transition-transform duration-300"
          alt="Logo officiel GH Clinic Dr. Ghaouat Sarra"
        />

        <div className="text-left">
          <div className="font-serif font-bold text-sm tracking-wider text-stone-900 dark:text-[#FAF8F5] leading-tight">
            GH CLINIC
          </div>
          <div className="font-serif italic text-[11px] text-[#C73859] dark:text-[#F4C8D4] tracking-tight">
            By Dr. Ghaouat Sarra
          </div>
        </div>
      </div>

      {/* Caduceus Medical Icon & Signature */}
      <div className="flex items-center gap-2.5">
        {/* Caduceus Pink SVG */}
        <div className="w-8 h-8 flex items-center justify-center text-[#D8436B] dark:text-[#F4C8D4]" title="Médecine Esthétique">
          <svg viewBox="0 0 64 64" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Wings */}
            <path d="M 16 18 C 24 14 30 18 32 24 C 34 18 40 14 48 18 C 44 26 36 26 32 25 C 28 26 20 26 16 18 Z" fill="#FCE4EC" className="dark:fill-pink-950/60" stroke="currentColor" />
            {/* Central Staff */}
            <line x1="32" y1="10" x2="32" y2="58" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="32" cy="10" r="3.5" fill="currentColor" />
            {/* Entwined Serpents */}
            <path d="M 22 28 C 24 33 40 33 42 38 C 44 43 22 45 22 50 C 22 53 26 55 32 54 C 38 55 42 53 42 50" stroke="currentColor" strokeWidth="2" />
          </svg>
        </div>

        {/* Doctor Signature */}
        <span className="font-serif italic text-xl sm:text-2xl text-[#8E2842] dark:text-[#DFBA9D] tracking-wide font-medium">
          Dr Ghaouat Sarra
        </span>
      </div>
    </div>
  );
};
