'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Award,
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';
import { ClinicLogo } from '@/components/ClinicLogo';
import heroImg from '@/src/assets/images/regenerated_image_1788821568121.jpg';
import heroLogoImg from '@/src/assets/images/regenerated_image_1790689924649.png';

interface HeroProps {
  settings: ClinicSettings;
  onOpenBooking: (treatmentId?: string) => void;
  onExploreTreatments: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onOpenBooking,
  onExploreTreatments,
}) => {
  // Smooth entrance transition configuration
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-[#FAF8F5] via-[#FFF8F9] to-[#FAF8F5] dark:from-[#0C0A09] dark:via-[#161312] dark:to-[#0C0A09] transition-colors duration-300"
    >
      {/* ========================================================================= */}
      {/* 1. HERO LIVE BACKGROUND & SIGNATURE BREATHING GLOW (8-20s Cycles)         */}
      {/* ========================================================================= */}
      
      {/* GH CLINIC Signature Breathing Glow (Behind Hero & Branding) */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-pink-200/40 via-rose-100/30 to-pink-300/35 dark:from-pink-950/25 dark:via-rose-950/20 dark:to-pink-900/20 blur-3xl pointer-events-none animate-gh-glow -z-10" />

      {/* Ambient Float Orb 1 (Blush Pink / Warm Cream / Dark Rose) */}
      <div className="absolute -top-10 right-1/4 w-[420px] h-[420px] bg-[#FCE8ED]/60 dark:bg-pink-950/15 rounded-full blur-3xl pointer-events-none animate-gh-float-1 -z-10" />

      {/* Ambient Float Orb 2 (Dusty Rose / Beige / Obsidian) */}
      <div className="absolute bottom-4 left-6 w-[380px] h-[380px] bg-[#F4DCD6]/45 dark:bg-[#1E1918]/60 rounded-full blur-3xl pointer-events-none animate-gh-float-2 -z-10" />

      {/* 5. Decorative Medical Facial Contour & Botanical Lines (SVG Flow) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 opacity-30 sm:opacity-40 dark:opacity-20 animate-gh-contour">
        <svg
          className="w-full h-full text-pink-300/30 dark:text-pink-900/40"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Facial aesthetic contour curve 1 */}
          <path
            d="M-100 200 C300 100, 600 350, 900 150 C1200 -50, 1400 300, 1600 250"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="6 8"
          />
          {/* Facial aesthetic contour curve 2 */}
          <path
            d="M-50 450 C350 300, 750 600, 1100 350 C1350 180, 1500 500, 1650 400"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          {/* Delicate medical cross / caduceus accent */}
          <circle cx="850" cy="220" r="160" stroke="currentColor" strokeWidth="0.8" strokeDasharray="4 6" />
          <circle cx="850" cy="220" r="120" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* ======================================================================= */}
          {/* Left Column: Staggered Hero Typography & Interactive Actions            */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Official GH Clinic Hero Logo & Prestige Eyebrow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.08 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <div className="relative inline-flex items-center justify-center">
                {/* Subtle Ambient Breathing Glow Behind the Logo */}
                <div
                  className="absolute -inset-3 sm:-inset-5 rounded-full bg-gradient-to-tr from-[#FCE8ED]/85 via-[#F4DCD6]/70 to-[#FAF8F5]/90 dark:from-pink-950/40 dark:via-stone-900/50 dark:to-transparent blur-xl pointer-events-none animate-gh-glow"
                  aria-hidden="true"
                />
                <ClinicLogo
                  size="hero"
                  src={heroLogoImg}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
                  alt="Logo officiel GH Clinic Dr. Ghaouat Sarra"
                />
              </div>

              <div className="text-center sm:text-left space-y-1">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-stone-900/90 border border-pink-200/90 dark:border-pink-900/50 shadow-2xs backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#9E2A50] dark:text-pink-300">
                    Médecine Esthétique & Laser • Khemis Miliana
                  </span>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                  Cabinet d’Excellence Dr. Ghaouat Sarra
                </p>
              </div>
            </motion.div>

            {/* 2. Main Luxury Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, ease: easeOutExpo, delay: 0.25 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight leading-[1.15]"
            >
              L’Art de Sublimer <br className="hidden sm:inline" />
              <span className="italic font-normal bg-gradient-to-r from-[#C73859] via-[#E58C9D] to-[#DFBA9D] dark:from-[#F4C8D4] dark:via-[#DFBA9D] dark:to-[#E58C9D] bg-clip-text text-transparent">
                Votre Beauté Naturelle
              </span>
            </motion.h1>

            {/* 3. Refined Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.4 }}
              className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Cabinet d’excellence dirigé par <strong className="font-semibold text-stone-900 dark:text-white">{settings.doctorName}</strong>. 
              Technologies laser de dernière génération, injections d’acide hyaluronique et Botox de haute précision, 
              dans un cadre médicalisé alliant sécurité absolue, élégance et écoute bienveillante.
            </motion.p>

            {/* 4. Quick Medical Guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.55 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 text-xs text-stone-700 dark:text-stone-300 font-medium"
            >
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-stone-900/80 px-3 py-1.5 rounded-full border border-pink-100 dark:border-stone-800 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-400" />
                <span>100% Médecin Diplômée</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-stone-900/80 px-3 py-1.5 rounded-full border border-pink-100 dark:border-stone-800 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-400" />
                <span>Produits Certifiés CE / FDA</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/80 dark:bg-stone-900/80 px-3 py-1.5 rounded-full border border-pink-100 dark:border-stone-800 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-400" />
                <span>Lasers Indolores & Aseptisés</span>
              </div>
            </motion.div>

            {/* 5. Primary & Secondary CTAs (with Hero Light Sweep on CTA) */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: easeOutExpo, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              {/* Primary CTA with periodic subtle light sweep */}
              <button
                onClick={() => onOpenBooking()}
                className="relative overflow-hidden w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white font-serif font-bold tracking-wider text-sm sm:text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group border border-pink-200/40"
                id="hero-primary-cta"
              >
                {/* Light Sweep Sheen */}
                <span
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none animate-gh-sweep"
                  aria-hidden="true"
                />

                <Calendar className="w-5 h-5 text-pink-200" />
                <span>Réserver ma Consultation</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-pink-200" />
              </button>

              <button
                onClick={onExploreTreatments}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/95 dark:bg-stone-900/90 hover:bg-white dark:hover:bg-stone-800 text-stone-800 dark:text-stone-100 hover:text-[#C73859] dark:hover:text-[#DFBA9D] font-serif font-semibold text-sm sm:text-base border border-pink-200/90 dark:border-stone-800 hover:border-pink-300 dark:hover:border-stone-700 shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                id="hero-secondary-cta"
              >
                <Sparkles className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D]" />
                <span>Découvrir les Soins & Tarifs</span>
              </button>
            </motion.div>

            {/* 6. Patient Rating Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.85 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 border-t border-pink-100/90 dark:border-stone-800 max-w-xl mx-auto lg:mx-0"
            >
              <div className="flex items-center -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
                  alt="Patiente GH Clinic"
                  className="w-9 h-9 rounded-full border-2 border-white dark:border-stone-800 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=120&auto=format&fit=crop"
                  alt="Patiente GH Clinic"
                  className="w-9 h-9 rounded-full border-2 border-white dark:border-stone-800 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=120&auto=format&fit=crop"
                  alt="Patiente GH Clinic"
                  className="w-9 h-9 rounded-full border-2 border-white dark:border-stone-800 object-cover"
                />
                <div className="w-9 h-9 rounded-full bg-[#9E2A50] text-white text-[11px] font-bold flex items-center justify-center border-2 border-white dark:border-stone-800">
                  +150
                </div>
              </div>

              <div className="text-left">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                  <span className="text-stone-900 dark:text-stone-100 font-bold text-xs ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Basé sur plus de 150 avis Google & patientes vérifiées
                </p>
              </div>
            </motion.div>

          </div>

          {/* ======================================================================= */}
          {/* Right Column: Hero Visual Frame with Gentle Floating Badges             */}
          {/* ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.35 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Card Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 dark:border-stone-800 bg-white dark:bg-stone-900 group gh-card-hover">
                <div className="aspect-[4/5] relative overflow-hidden gh-img-sheen">
                  <img
                    src={typeof heroImg === 'string' ? heroImg : heroImg.src}
                    alt="Cabinet Médico-Esthétique Dr. Ghaouat Sarra à Khemis Miliana"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Veil */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  {/* Doctor Info Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-medium mb-2">
                      <Award className="w-3.5 h-3.5 text-pink-200" />
                      <span>Excellence & Éthique Médicale</span>
                    </div>
                    <h3 className="font-serif font-bold text-2xl text-white">
                      Dr. Ghaouat Sarra
                    </h3>
                    <p className="text-xs text-stone-200 mt-1 font-light">
                      Médecin diplômée • Spécialiste en injections & lasers dermatologiques
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Live Availability Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 glass-card dark:bg-stone-900/90 dark:border-stone-800 p-3 sm:p-4 rounded-2xl shadow-xl max-w-[200px] border border-white/90 hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-200 dark:border-emerald-800">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 font-medium uppercase">Prochains Créneaux</div>
                    <div className="text-xs font-bold text-stone-800 dark:text-stone-100">Cette Semaine</div>
                  </div>
                </div>
                <div className="mt-2 text-[10px] text-stone-600 dark:text-stone-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  <span>Réservation instantanée</span>
                </div>
              </div>

              {/* Floating Clinic Location Badge */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 glass-card dark:bg-stone-900/90 dark:border-stone-800 p-3.5 rounded-2xl shadow-xl max-w-[220px] border border-white/90 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950 text-[#C73859] dark:text-pink-300 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Khemis Miliana</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                      Wilaya d’Aïn Defla • Parking facile & accès direct
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
