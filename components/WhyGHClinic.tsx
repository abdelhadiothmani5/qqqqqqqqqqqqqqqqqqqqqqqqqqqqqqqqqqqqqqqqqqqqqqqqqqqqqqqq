'use client';

import React from 'react';
import {
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Heart,
  Lock,
  Award,
  Zap,
  CheckCircle2
} from 'lucide-react';

export const WhyGHClinic: React.FC = () => {
  const pillars = [
    {
      icon: Stethoscope,
      title: 'Expertise Médicale Directe',
      description: 'Chaque examen et chaque acte est réalisé ou supervisé directement par Dr. Ghaouat Sarra, médecin qualifiée en médecine esthétique et lasers.',
    },
    {
      icon: ShieldCheck,
      title: 'Sécurité & Traçabilité 100%',
      description: 'Nous utilisons uniquement des produits certifiés CE Médical et FDA des plus prestigieux laboratoires mondiaux (Juvéderm, Teoxane, Galderma, IBSA).',
    },
    {
      icon: Zap,
      title: 'Technologies de Pointe Indolores',
      description: 'Équipements lasers de dernière génération avec refroidissement cryogénique intégré pour un confort absolu et une efficacité prouvée.',
    },
    {
      icon: Heart,
      title: 'Sublimation Naturelle & Éthique',
      description: 'Pas d’excès ni d’effets figés. Notre philosophie est de préserver votre charme unique et d’obtenir des résultats harmonieux et indétectables.',
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-white dark:bg-[#0F0D0C] border-b border-[#E5D4CB]/50 dark:border-stone-800/80 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-stone-900/90 border border-[#E5D4CB] dark:border-stone-800 shadow-xs">
            <Award className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55] dark:text-[#DFBA9D]">
              Le Standard GH Clinic
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            Pourquoi Choisir Notre Cabinet ?
          </h2>

          <p className="text-stone-600 dark:text-stone-300 font-light text-base sm:text-lg leading-relaxed">
            La médecine esthétique exige rigueur, sens artistique et sécurité sans compromis. 
            Découvrez les engagements qui font de GH Clinic la référence de confiance à Khemis Miliana.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-3xl bg-[#FAF8F5] dark:bg-[#181513] border border-[#E5D4CB]/60 dark:border-stone-800/80 hover:border-[#C5A089] dark:hover:border-[#DFBA9D]/50 hover:shadow-xl dark:hover:shadow-stone-950/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-white dark:bg-stone-800 text-[#9E6B55] dark:text-[#DFBA9D] flex items-center justify-center mb-6 shadow-xs border border-[#E5D4CB]/60 dark:border-stone-700/60 group-hover:scale-110 group-hover:bg-[#9E6B55] dark:group-hover:bg-[#9E2A50] group-hover:text-white transition-all duration-300">
                    <IconComponent className="w-7 h-7" />
                  </div>

                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5] mb-3 group-hover:text-[#9E6B55] dark:group-hover:text-[#F4C8D4] transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed font-light">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#E5D4CB]/40 dark:border-stone-800 flex items-center gap-1 text-xs font-semibold text-[#9E6B55] dark:text-[#DFBA9D]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Engagement Garanti</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
