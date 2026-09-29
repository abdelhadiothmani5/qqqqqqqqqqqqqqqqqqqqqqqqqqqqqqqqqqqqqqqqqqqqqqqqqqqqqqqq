'use client';

import React from 'react';
import {
  Award,
  Users,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  CheckCircle
} from 'lucide-react';

export const Statistics: React.FC = () => {
  const stats = [
    {
      value: '12 500+',
      label: 'Actes & Séances Réalisés',
      description: 'Protocoles laser, soins et injections de précision avec suivi rigoureux.',
      icon: Sparkles,
    },
    {
      value: '99.4%',
      label: 'Patientes Satisfaites',
      description: 'Résultats naturels, confort maximal et fidélité d’exception à Khemis Miliana.',
      icon: HeartHandshake,
    },
    {
      value: '100%',
      label: 'Produits Certifiés CE / FDA',
      description: 'Traçabilité médicale totale (Juvéderm, Teosyal, Restylane, Profhilo).',
      icon: ShieldCheck,
    },
    {
      value: '8+ Ans',
      label: 'D’Expertise Médicale',
      description: 'Formation continue et maîtrise des dernières technologies esthétiques mondiales.',
      icon: Award,
    },
  ];

  return (
    <section className="py-12 bg-white dark:bg-[#0F0D0C] border-y border-[#E5D4CB]/50 dark:border-stone-800/80 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#181513] border border-[#E5D4CB]/60 dark:border-stone-800/80 hover:border-[#C5A089] dark:hover:border-[#DFBA9D]/50 hover:shadow-md dark:hover:shadow-stone-950/60 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-stone-800 text-[#9E6B55] dark:text-[#DFBA9D] flex items-center justify-center mb-4 shadow-xs border border-[#E5D4CB]/60 dark:border-stone-700/60 group-hover:scale-110 group-hover:bg-[#9E6B55] dark:group-hover:bg-[#9E2A50] group-hover:text-white transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className="font-serif font-bold text-3xl sm:text-4xl text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-[#9E6B55] dark:text-[#DFBA9D] mt-1">
                  {stat.label}
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
