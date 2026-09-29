'use client';

import React from 'react';
import {
  Award,
  Sparkles,
  GraduationCap,
  Calendar,
  Instagram,
  Facebook,
  ShieldCheck,
  Quote,
  CheckCircle2,
  Stethoscope
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';

interface DoctorProfileProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
}

export const DoctorProfile: React.FC<DoctorProfileProps> = ({
  settings,
  onOpenBooking,
}) => {
  return (
    <section id="doctor" className="py-20 bg-gradient-to-b from-white via-[#FAF8F5] to-white dark:from-[#0F0D0C] dark:via-[#141210] dark:to-[#0F0D0C] relative overflow-hidden transition-colors duration-300">
      {/* Soft Glow Background */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FCE8ED]/40 dark:bg-pink-950/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/90 border border-pink-200 dark:border-pink-900/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-300" />
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50] dark:text-pink-300">
              Direction Médicale & Éthique
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            Dr. Ghaouat Sarra
          </h2>

          <p className="text-[#9E2A50] dark:text-[#F4C8D4] font-serif italic text-base sm:text-lg font-medium">
            Médecin Qualifiée en Médecine Esthétique, Laser & Soins Anti-Âge
          </p>
        </div>

        {/* Content Presentation Card (No Pictures) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Doctor Philosophy, Medical Oath & Caduceus Card */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Medical Credentials & Caduceus Box */}
            <div className="p-7 rounded-3xl bg-white dark:bg-[#181513] border border-pink-200/90 dark:border-stone-800 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 dark:bg-pink-950/80 text-[#C73859] dark:text-pink-300 flex items-center justify-center shrink-0 border border-pink-200 dark:border-pink-900/50">
                  <Stethoscope className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-[#FAF8F5]">
                    Ordre des Médecins
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                    Pratique médicale certifiée & enregistrée
                  </p>
                </div>
              </div>

              {/* Doctor's Signature Quote */}
              <div className="p-5 rounded-2xl bg-[#FFF5F7] dark:bg-stone-900/90 border border-pink-200/60 dark:border-stone-700/60 relative">
                <Quote className="w-6 h-6 text-[#E8B4B8]/60 dark:text-[#DFBA9D]/40 absolute top-3 right-3" />
                <p className="font-serif italic text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                  « La véritable médecine esthétique ne cherche jamais à vous transformer, mais à magnifier votre singularité, réparer les effets du temps et vous redonner pleine confiance en vous, avec douceur et rigueur médicale. »
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-[1.5px] bg-[#C73859] dark:bg-[#DFBA9D]" />
                  <span className="text-[11px] font-bold tracking-wider text-[#9E2A50] dark:text-[#DFBA9D] uppercase">
                    Dr. Ghaouat Sarra
                  </span>
                </div>
              </div>

              {/* Guarantees List */}
              <div className="space-y-2 pt-1 text-xs text-stone-700 dark:text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Consultation diagnostique personnalisée</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Traçabilité complète des injectables (CE/FDA)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Plateau laser DIODE haute sécurité</span>
                </div>
              </div>
            </div>

            {/* Quick Contact & Socials */}
            <div className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181513] border border-pink-100 dark:border-stone-800 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Cabinet de Khemis Miliana</div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">{settings.phone}</div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-stone-800 border border-pink-200 dark:border-stone-700 hover:border-[#C73859] dark:hover:border-[#DFBA9D] text-stone-700 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-[#DFBA9D] flex items-center justify-center transition-colors shadow-2xs"
                  title="Instagram Dr. Ghaouat Sarra"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white dark:bg-stone-800 border border-pink-200 dark:border-stone-700 hover:border-[#C73859] dark:hover:border-[#DFBA9D] text-stone-700 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-[#DFBA9D] flex items-center justify-center transition-colors shadow-2xs"
                  title="Facebook Dr. Ghaouat Sarra"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Detailed Biography, Expertise Areas & Booking Action */}
          <div className="lg:col-span-7 bg-white dark:bg-[#181513] rounded-3xl border border-pink-200/90 dark:border-stone-800 p-6 sm:p-8 shadow-sm space-y-6 flex flex-col justify-between">
            
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 dark:text-[#FAF8F5]">
                Parcours & Engagement Médical
              </h3>

              <p className="text-stone-600 dark:text-stone-300 font-light text-sm sm:text-base leading-relaxed">
                Diplômée et passionnée par l’anatomie faciale et les biotechnologies cutanées, <strong className="text-stone-900 dark:text-white">Dr. Ghaouat Sarra</strong> a fondé son cabinet médico-esthétique à <strong className="text-stone-900 dark:text-white">Khemis Miliana</strong> avec pour vocation d’offrir aux patientes de la région un plateau technique de niveau international, alliant protocoles lasers de pointe et gestes d’injections ultra précis.
              </p>

              <p className="text-stone-600 dark:text-stone-300 font-light text-sm leading-relaxed">
                Chaque patiente bénéficie d’une écoute attentive et d’une prise en charge bienveillante, avec l’assurance d’actes médicaux réalisés dans le respect scrupuleux des normes d’hygiène et d’asepsie hospitalière.
              </p>
            </div>

            {/* Core Competencies Matrix */}
            <div className="space-y-2.5 pt-2">
              <div className="text-xs font-serif font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                Pôles d’Expertise Médicale :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-900 border border-pink-100 dark:border-stone-700/80">
                  <ShieldCheck className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D] shrink-0" />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">Injections Botox & Acide Hyaluronique</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-900 border border-pink-100 dark:border-stone-700/80">
                  <ShieldCheck className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D] shrink-0" />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">Épilation Laser DIODE 2025</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-900 border border-pink-100 dark:border-stone-700/80">
                  <ShieldCheck className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D] shrink-0" />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">Biostimulation PRP & Skinboosters</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] dark:bg-stone-900 border border-pink-100 dark:border-stone-700/80">
                  <ShieldCheck className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D] shrink-0" />
                  <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">Hydrafacial MD & Peelings Médicaux</span>
                </div>
              </div>
            </div>

            {/* Appointment Booking Action CTA */}
            <div className="pt-4 border-t border-pink-100 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 dark:text-stone-400 font-serif italic text-center sm:text-left">
                Consultation sur rendez-vous uniquement
              </div>

              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-pink-200" />
                <span>Prendre RDV avec Dr. Sarra</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
