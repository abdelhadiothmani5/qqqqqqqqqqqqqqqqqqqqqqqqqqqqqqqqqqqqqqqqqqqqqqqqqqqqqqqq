'use client';

import React from 'react';
import { Sparkles, Calendar, ChevronRight, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { Treatment } from '@/lib/clinicData';

interface TreatmentCardProps {
  treatment: Treatment;
  isFeatured?: boolean;
  onSelectTreatment: (treatment: Treatment) => void;
  onBookTreatment: (treatmentName: string) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  treatment,
  isFeatured = false,
  onSelectTreatment,
  onBookTreatment,
}) => {
  if (isFeatured) {
    return (
      <div
        id={`card-treatment-${treatment.id}`}
        className="group relative rounded-3xl overflow-hidden bg-white dark:bg-[#181513] border border-pink-200/80 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row hover:border-pink-300 dark:hover:border-stone-700 md:col-span-2 lg:col-span-2"
      >
        {/* Image Container with Luxury Overlay */}
        <div className="relative md:w-5/12 h-64 md:h-auto overflow-hidden bg-pink-50 dark:bg-stone-800 shrink-0">
          <img
            src={treatment.heroImage}
            alt={treatment.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/60 via-black/20 to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-[#9E2A50] dark:text-pink-300 text-xs font-serif font-bold uppercase tracking-wider shadow-xs border border-pink-200 dark:border-stone-700">
              {treatment.categoryLabel}
            </span>
          </div>

          {/* Arabic Label if available */}
          {treatment.nameAr && (
            <div className="absolute top-4 right-4">
              <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium border border-white/20" dir="rtl">
                {treatment.nameAr}
              </span>
            </div>
          )}

          {/* Featured Ribbon */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#C73859]/90 backdrop-blur-xs text-[11px] font-serif font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3 h-3 text-pink-200" />
              Soin Signature
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-6 sm:p-8 md:w-7/12 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-serif italic text-xs text-[#C73859] dark:text-pink-400 tracking-wider uppercase font-semibold">
                Actes Médicaux Personnalisés
              </span>
              <span className="h-px flex-1 bg-pink-200 dark:bg-stone-800" />
            </div>

            <h3 className="font-serif font-bold text-2xl text-stone-900 dark:text-[#FAF8F5] group-hover:text-[#9E2A50] dark:group-hover:text-[#F4C8D4] transition-colors leading-tight">
              {treatment.name}
            </h3>

            <p className="text-stone-600 dark:text-stone-400 text-sm font-light mt-2.5 leading-relaxed">
              {treatment.shortDescription}
            </p>

            {/* Quick Benefits Checklist */}
            {treatment.benefits && treatment.benefits.length > 0 && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700 dark:text-stone-300">
                {treatment.benefits.slice(0, 2).map((benefit, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-400 shrink-0 mt-0.5" />
                    <span className="leading-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & Actions Row */}
          <div className="pt-4 border-t border-pink-100 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-serif italic block uppercase tracking-wider">
                Tarif officiel
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-xs text-stone-500 dark:text-stone-400 font-light">À partir de</span>
                <span className="font-serif font-bold text-2xl text-[#8E2842] dark:text-[#F4C8D4] tracking-tight">
                  {treatment.priceDZD.toLocaleString('fr-DZ')} DA
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => onSelectTreatment(treatment)}
                className="flex-1 sm:flex-initial py-2.5 px-4 rounded-full bg-white dark:bg-stone-800 hover:bg-pink-50/70 dark:hover:bg-stone-700 border border-pink-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 text-xs font-serif font-semibold transition-all flex items-center justify-center gap-1 group/btn"
              >
                <span>Protocole</span>
                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover/btn:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={() => onBookTreatment(treatment.id)}
                className="flex-1 sm:flex-initial py-2.5 px-5 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white text-xs font-serif font-bold tracking-wider uppercase shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 shrink-0 active:scale-98"
              >
                <Calendar className="w-3.5 h-3.5 text-pink-200" />
                <span>Prendre RDV</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Standard Refined Medical-Aesthetic Card
  return (
    <div
      id={`card-treatment-${treatment.id}`}
      className="group rounded-3xl bg-white/95 dark:bg-[#181513] backdrop-blur-xs border border-pink-200/80 dark:border-stone-800 p-6 sm:p-7 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between space-y-6 hover:border-pink-300 dark:hover:border-stone-700 relative overflow-hidden"
    >
      {/* Decorative subtle top line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-200 via-[#D8436B] to-pink-200 dark:from-pink-900/40 dark:via-[#C73859] dark:to-pink-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Category Label & Line */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-serif font-bold text-[11px] uppercase tracking-widest text-[#C73859] dark:text-pink-300 border-b border-[#C73859]/40 dark:border-pink-900/50 pb-0.5">
            {treatment.categoryLabel}
          </span>
          {treatment.nameAr && (
            <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium" dir="rtl">
              {treatment.nameAr}
            </span>
          )}
        </div>

        {/* Treatment Title */}
        <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5] group-hover:text-[#9E2A50] dark:group-hover:text-[#F4C8D4] transition-colors leading-snug mt-2">
          {treatment.name}
        </h3>

        {/* Short Medical Description */}
        <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm font-light mt-2.5 line-clamp-3 leading-relaxed">
          {treatment.shortDescription}
        </p>
      </div>

      {/* Pricing and Action Area */}
      <div className="pt-4 border-t border-pink-100/90 dark:border-stone-800 space-y-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-stone-500 dark:text-stone-400 font-serif italic">À partir de</span>
          <span className="font-serif font-bold text-2xl text-[#8E2842] dark:text-[#F4C8D4] tracking-tight group-hover:scale-105 transition-transform">
            {treatment.priceDZD.toLocaleString('fr-DZ')} DA
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onSelectTreatment(treatment)}
            className="flex-1 py-2.5 px-3 rounded-full bg-white dark:bg-stone-800 hover:bg-pink-50 dark:hover:bg-stone-700 border border-pink-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-serif font-semibold transition-all flex items-center justify-center gap-1 group/btn"
          >
            <span>Détails</span>
            <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover/btn:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onBookTreatment(treatment.id)}
            className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white text-xs font-serif font-bold tracking-wider uppercase shadow-2xs hover:shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-98"
          >
            <Calendar className="w-3.5 h-3.5 text-pink-200" />
            <span>Prendre RDV</span>
          </button>
        </div>
      </div>
    </div>
  );
};
