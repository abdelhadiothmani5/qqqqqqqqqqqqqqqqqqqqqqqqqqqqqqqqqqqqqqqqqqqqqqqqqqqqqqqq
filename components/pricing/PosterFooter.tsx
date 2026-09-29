'use client';

import React from 'react';
import { Phone, MapPin, Calendar, Sparkles } from 'lucide-react';

interface PosterFooterProps {
  onOpenBooking: (treatmentName?: string) => void;
  phone?: string;
  location?: string;
}

export const PosterFooter: React.FC<PosterFooterProps> = ({
  onOpenBooking,
  phone = '0663419994',
  location = 'Hai el salem (à coté de Sonelgaz)',
}) => {
  return (
    <div className="w-full mt-8 sm:mt-10 pt-6 border-t border-pink-300/60 dark:border-stone-700/60 flex flex-col items-center text-center">
      {/* Script Header: "Prenez rendez-vous" */}
      <h4 className="font-serif italic text-2xl sm:text-3xl text-stone-800 dark:text-[#FAF8F5] tracking-wide mb-4">
        Prenez rendez-vous
      </h4>

      {/* Contact & Address Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mb-6 text-stone-800 dark:text-stone-200 text-sm sm:text-base">
        {/* Phone */}
        <a
          href={`tel:${phone.replace(/\s+/g, '')}`}
          className="flex items-center gap-2 font-medium hover:text-[#C73859] dark:hover:text-[#DFBA9D] transition-colors py-1 px-3 rounded-full bg-white/70 dark:bg-stone-800/80 border border-pink-200 dark:border-stone-700 shadow-2xs group"
          id="poster-footer-phone"
        >
          <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-[#D8436B] dark:text-pink-300 group-hover:scale-110 transition-transform">
            <Phone className="w-4 h-4 fill-current text-[#D8436B] dark:text-pink-300" />
          </div>
          <span className="tracking-wider font-serif font-bold text-stone-900 dark:text-stone-100">{phone}</span>
        </a>

        {/* Location */}
        <a
          href="https://www.google.com/maps/place/Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-stone-700 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-[#DFBA9D] transition-colors py-1 px-3 rounded-full bg-white/70 dark:bg-stone-800/80 border border-pink-200 dark:border-stone-700 shadow-2xs group"
          id="poster-footer-location"
        >
          <div className="w-7 h-7 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-[#D8436B] dark:text-pink-300 group-hover:scale-110 transition-transform">
            <MapPin className="w-4 h-4 text-[#D8436B] dark:text-pink-300" />
          </div>
          <span className="text-xs sm:text-sm font-medium">{location}</span>
        </a>
      </div>

      {/* Stethoscope + "Réalisés par des MÉDECINS" */}
      <div className="flex items-center justify-center gap-3 py-2 px-5 rounded-2xl bg-gradient-to-r from-pink-100/80 via-white/90 to-pink-100/80 dark:from-stone-900 dark:via-stone-800/90 dark:to-stone-900 border border-pink-200/90 dark:border-stone-700 shadow-2xs mb-6 max-w-md mx-auto">
        {/* Pink Stethoscope Line Art SVG */}
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 48 48" className="w-7 h-7 text-[#D8436B] dark:text-[#F4C8D4]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Earpieces */}
            <path d="M 14 8 L 14 16 C 14 24 34 24 34 16 L 34 8" />
            <circle cx="14" cy="7" r="2" fill="currentColor" />
            <circle cx="34" cy="7" r="2" fill="currentColor" />
            {/* Tube */}
            <path d="M 24 22 L 24 34 C 24 39 30 40 32 37 L 34 32" />
            {/* Chestpiece */}
            <circle cx="35" cy="30" r="4.5" fill="#FCE4EC" className="dark:fill-stone-900" stroke="currentColor" strokeWidth="2" />
            <circle cx="35" cy="30" r="2" fill="currentColor" />
          </svg>
        </div>

        <div className="text-left font-serif">
          <span className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm tracking-wide">
            Actes médico-esthétiques{' '}
          </span>
          <span className="font-bold text-xs sm:text-sm tracking-wider text-[#9E2A50] dark:text-[#DFBA9D] uppercase">
            Réalisés par des MÉDECINS
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => onOpenBooking()}
        className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] text-white font-serif tracking-widest text-sm uppercase font-semibold shadow-md hover:shadow-lg hover:brightness-105 active:scale-98 transition-all group border border-pink-200/40"
        id="poster-cta-button"
      >
        <Calendar className="w-4 h-4 text-pink-200 group-hover:rotate-6 transition-transform" />
        <span>Prendre rendez-vous</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-200" />
      </button>
    </div>
  );
};
