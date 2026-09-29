'use client';

import React, { useState } from 'react';
import { InjectablesPoster } from './pricing/InjectablesPoster';
import { LaserPoster } from './pricing/LaserPoster';
import { PricingCategory } from '@/lib/clinicData';
import { Sparkles, Syringe, Zap, ShieldCheck, HelpCircle } from 'lucide-react';

interface PricingSectionProps {
  categories?: PricingCategory[];
  onOpenBooking: (treatmentName?: string) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({
  onOpenBooking,
}) => {
  const [activeTab, setActiveTab] = useState<'injectables' | 'laser'>('injectables');

  return (
    <section
      id="pricing"
      className="py-16 sm:py-24 relative overflow-hidden transition-colors duration-500"
      style={{
        background: 'linear-gradient(180deg, #FAF8F5 0%, #FDF0F3 25%, #FCE4EC 60%, #FAF8F5 100%)',
      }}
    >
      {/* Ambient background glow elements */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[500px] bg-gradient-to-br from-pink-200/30 via-rose-100/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Introduction */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859]" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50]">
              Tarifs Officiels • Dr. Ghaouat Sarra
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-stone-900 tracking-tight">
            Nos Tarifs & Forfaits
          </h2>

          <p className="text-stone-600 font-normal text-sm sm:text-base leading-relaxed">
            Consultez notre grille tarifaire officielle en Dinars Algériens (DZD). Tous les actes médicaux sont pratiqués avec du matériel de pointe et des protocoles certifiés.
          </p>
        </div>

        {/* Tab Switcher: Injectables vs. Laser Diode 2025 */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div className="inline-flex items-center p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm">
            {/* Tab 1: Injectables */}
            <button
              id="tab-injectables"
              onClick={() => setActiveTab('injectables')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-serif font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'injectables'
                  ? 'bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] text-white shadow-md'
                  : 'text-stone-700 hover:text-[#C73859] hover:bg-rose-50/50'
              }`}
            >
              <Syringe className={`w-4 h-4 ${activeTab === 'injectables' ? 'text-pink-200' : 'text-[#C73859]'}`} />
              <span>Injectables & Soins</span>
            </button>

            {/* Tab 2: Laser Diode */}
            <button
              id="tab-laser"
              onClick={() => setActiveTab('laser')}
              className={`flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-full text-xs sm:text-sm font-serif font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'laser'
                  ? 'bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] text-white shadow-md'
                  : 'text-stone-700 hover:text-[#C73859] hover:bg-rose-50/50'
              }`}
            >
              <Zap className={`w-4 h-4 ${activeTab === 'laser' ? 'text-pink-200' : 'text-[#C73859]'}`} />
              <span>Épilation Laser DIODE 2025</span>
            </button>
          </div>
        </div>

        {/* Authoritative Poster Content Display */}
        <div className="transition-all duration-300">
          {activeTab === 'injectables' ? (
            <InjectablesPoster onOpenBooking={onOpenBooking} />
          ) : (
            <LaserPoster onOpenBooking={onOpenBooking} />
          )}
        </div>

        {/* Small Medical Reassurance Note */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500 text-center font-serif">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#C73859]" />
            <span>Consultation médicale diagnostique personnalisée</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C73859]" />
            <span>Produits d’injection stériles aux normes CE & FDA</span>
          </div>
          <span className="hidden sm:inline text-stone-300">•</span>
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-[#C73859]" />
            <span>Devis remis avant chaque acte médical</span>
          </div>
        </div>

      </div>
    </section>
  );
};
