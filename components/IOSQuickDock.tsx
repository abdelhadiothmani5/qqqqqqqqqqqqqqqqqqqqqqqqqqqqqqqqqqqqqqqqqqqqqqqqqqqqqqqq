'use client';

import React from 'react';
import { Calendar, MessageCircle, Star, MapPin, BadgePercent } from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';
import { triggerHaptic } from '@/lib/iosHaptics';

interface IOSQuickDockProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
}

export const IOSQuickDock: React.FC<IOSQuickDockProps> = ({
  settings,
  onOpenBooking,
}) => {
  const handleBooking = () => {
    triggerHaptic('medium');
    onOpenBooking();
  };

  const handleWhatsApp = () => {
    triggerHaptic('light');
  };

  const handleScrollTo = (id: string) => {
    triggerHaptic('selection');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="sm:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-1 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-md glass-luxury dark:bg-[#141210]/92 backdrop-blur-2xl rounded-2xl p-1.5 shadow-2xl border border-[#DFBA9D]/40 flex items-center justify-around gap-1">
        
        {/* 1. Tarifs / Soins */}
        <button
          onClick={() => handleScrollTo('tarification')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#9E6B55] dark:hover:text-[#DFBA9D] active:scale-95 transition-transform"
          aria-label="Voir les soins et tarifs"
        >
          <BadgePercent className="w-5 h-5 mb-0.5 text-stone-500 dark:text-stone-400" />
          <span className="text-[10px] font-semibold tracking-tight">Tarifs</span>
        </button>

        {/* 2. Avis Patientes */}
        <button
          onClick={() => handleScrollTo('testimonials')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#9E6B55] dark:hover:text-[#DFBA9D] active:scale-95 transition-transform"
          aria-label="Voir les avis patientes"
        >
          <Star className="w-5 h-5 mb-0.5 text-amber-500 fill-amber-400/30" />
          <span className="text-[10px] font-semibold tracking-tight">Avis</span>
        </button>

        {/* 3. Center CTA: Prendre RDV (Elevated Golden Pill) */}
        <button
          onClick={handleBooking}
          className="flex-[1.4] -mt-3 py-2.5 px-3 rounded-2xl bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white shadow-lg shadow-[#DFBA9D]/30 flex flex-col items-center justify-center active:scale-95 transition-transform border border-white/20"
          aria-label="Prendre rendez-vous"
        >
          <Calendar className="w-5 h-5 mb-0.5 fill-white/20" />
          <span className="text-[11px] font-bold tracking-tight">Prendre RDV</span>
        </button>

        {/* 4. WhatsApp Direct */}
        <a
          href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent("Bonjour Dr. Ghaouat, je souhaite me renseigner et prendre rendez-vous à la clinique.")}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleWhatsApp}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-emerald-600 dark:text-emerald-400 active:scale-95 transition-transform"
          aria-label="WhatsApp Dr. Ghaouat"
        >
          <MessageCircle className="w-5 h-5 mb-0.5 fill-emerald-500/20" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </a>

        {/* 5. Accès / Maps */}
        <button
          onClick={() => handleScrollTo('localisation')}
          className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-stone-600 dark:text-stone-300 hover:text-[#9E6B55] dark:hover:text-[#DFBA9D] active:scale-95 transition-transform"
          aria-label="Plan d'accès et localisation"
        >
          <MapPin className="w-5 h-5 mb-0.5 text-stone-500 dark:text-stone-400" />
          <span className="text-[10px] font-semibold tracking-tight">Accès</span>
        </button>

      </div>
    </div>
  );
};
