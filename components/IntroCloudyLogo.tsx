'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Crown } from 'lucide-react';
import headerLogoImg from '@/src/assets/images/regenerated_image_1790689939032.png';

export interface IntroCloudyLogoProps {
  isOpen: boolean;
  onClose: () => void;
  autoCloseDuration?: number; // default 3800ms
}

const emptySubscribe = () => () => {};

export const IntroCloudyLogo: React.FC<IntroCloudyLogoProps> = ({
  isOpen,
  onClose,
  autoCloseDuration = 3800,
}) => {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  // Auto-dismiss timer after duration
  useEffect(() => {
    if (!isOpen || !isClient) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseDuration);

    return () => clearTimeout(timer);
  }, [isOpen, isClient, onClose, autoCloseDuration]);

  // Prevent SSR hydration mismatch
  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="gh-cloudy-intro-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.06,
            filter: 'blur(14px)',
            transition: { duration: 0.95, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#FAF8F5] overflow-hidden select-none"
          id="intro-cloudy-overlay"
        >
          {/* ========================================================================= */}
          {/* 1. LAYERED VOLUMETRIC CLOUDY MIST & SILK VAPOR CANOPY                     */}
          {/* ========================================================================= */}

          {/* Deep Base Amber/Blush Radiant Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: [0.35, 0.85, 0.6], scale: [0.85, 1.2, 1.05] }}
            transition={{ duration: 3.6, ease: "easeInOut" }}
            className="absolute w-[700px] sm:w-[1000px] h-[700px] sm:h-[1000px] rounded-full bg-gradient-to-tr from-[#FCE8ED] via-[#F4DCD6] to-[#FAF8F5] blur-[100px] pointer-events-none"
          />

          {/* Golden Champagne Central Ray Halo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0.2, 0.65, 0.45], scale: [0.7, 1.3, 1.1] }}
            transition={{ duration: 3.4, ease: "easeOut" }}
            className="absolute w-[450px] sm:w-[600px] h-[450px] sm:h-[600px] rounded-full bg-gradient-to-r from-[#DFBA9D]/40 via-[#FCE8ED]/60 to-[#DFBA9D]/40 blur-[80px] pointer-events-none"
          />

          {/* Left Drifting Cloud Cluster (Parting Left on Exit) */}
          <motion.div
            initial={{ x: '-20%', y: '-10%', opacity: 0, scale: 0.85 }}
            animate={{ x: '-5%', y: '0%', opacity: 0.85, scale: 1.1 }}
            exit={{ x: '-60%', opacity: 0, scale: 1.4, transition: { duration: 0.95 } }}
            transition={{ duration: 3.2, ease: "easeOut" }}
            className="absolute -top-32 -left-32 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-br from-white via-[#FFF0F4]/90 to-[#FCE8ED]/60 blur-[70px] pointer-events-none"
          />

          {/* Right Drifting Cloud Cluster (Parting Right on Exit) */}
          <motion.div
            initial={{ x: '20%', y: '10%', opacity: 0, scale: 0.85 }}
            animate={{ x: '5%', y: '0%', opacity: 0.85, scale: 1.15 }}
            exit={{ x: '60%', opacity: 0, scale: 1.4, transition: { duration: 0.95 } }}
            transition={{ duration: 3.2, ease: "easeOut" }}
            className="absolute -bottom-32 -right-32 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-tl from-white via-[#F4DCD6]/85 to-[#FFF0F4]/70 blur-[75px] pointer-events-none"
          />

          {/* Floating Center Silk Mist Orb */}
          <motion.div
            initial={{ opacity: 0, rotate: -10, scale: 0.8 }}
            animate={{ opacity: 0.95, rotate: 10, scale: 1.08 }}
            exit={{ opacity: 0, scale: 1.5, filter: 'blur(20px)', transition: { duration: 0.85 } }}
            transition={{ duration: 3.6, ease: "easeInOut" }}
            className="absolute w-[400px] sm:w-[580px] h-[400px] sm:h-[580px] rounded-full bg-gradient-to-r from-white/95 via-[#FAF8F5]/90 to-white/95 blur-[40px] pointer-events-none shadow-2xl shadow-pink-100"
          />

          {/* ========================================================================= */}
          {/* 2. SACRED GEOMETRY FACIAL PROPORTION & DERMATOLOGY RINGS                  */}
          {/* ========================================================================= */}

          {/* Outer Aesthetic Metric Orbit Ring (Clockwise) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
            animate={{ opacity: 0.55, scale: 1, rotate: 90 }}
            exit={{ opacity: 0, scale: 1.25, transition: { duration: 0.6 } }}
            transition={{ duration: 3.6, ease: "easeOut" }}
            className="absolute w-[360px] sm:w-[440px] h-[360px] sm:h-[440px] rounded-full border border-pink-200/50 pointer-events-none flex items-center justify-center"
          >
            {/* Degree Ticks */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <div
                key={deg}
                style={{ transform: `rotate(${deg}deg) translateY(-50%)` }}
                className="absolute top-0 w-[1.5px] h-2 bg-[#DFBA9D]/60"
              />
            ))}
          </motion.div>

          {/* Inner Golden Ratio Dashed Orbit Ring (Counter-Clockwise) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.75, rotate: 0 }}
            animate={{ opacity: 0.65, scale: 1, rotate: -120 }}
            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.6 } }}
            transition={{ duration: 3.6, ease: "easeOut" }}
            className="absolute w-[280px] sm:w-[340px] h-[280px] sm:h-[340px] rounded-full border border-dashed border-[#DFBA9D]/40 pointer-events-none"
          />

          {/* Glowing Laser Precision Beam Rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [0.7, 1.15, 1], opacity: [0.2, 0.6, 0.35] }}
            transition={{ duration: 3.0, ease: "easeInOut" }}
            className="absolute w-[210px] sm:w-[260px] h-[210px] sm:h-[260px] rounded-full border border-pink-300/40 pointer-events-none"
          />

          {/* ========================================================================= */}
          {/* 3. FLOATING BOKEH PEARL DROPLETS & STARDUST PARTICLES                     */}
          {/* ========================================================================= */}
          {[
            { x: '-35%', y: '-25%', size: 'w-2 h-2', delay: 0.2, duration: 2.6 },
            { x: '35%', y: '-30%', size: 'w-2.5 h-2.5', delay: 0.5, duration: 2.8 },
            { x: '-40%', y: '20%', size: 'w-2 h-2', delay: 0.7, duration: 2.5 },
            { x: '38%', y: '25%', size: 'w-3 h-3', delay: 0.3, duration: 3.0 },
            { x: '-15%', y: '-42%', size: 'w-1.5 h-1.5', delay: 0.9, duration: 2.4 },
            { x: '18%', y: '-40%', size: 'w-2 h-2', delay: 0.6, duration: 2.7 },
            { x: '-22%', y: '42%', size: 'w-2 h-2', delay: 0.4, duration: 2.9 },
            { x: '25%', y: '38%', size: 'w-1.5 h-1.5', delay: 0.8, duration: 2.6 },
          ].map((orb, i) => (
            <motion.div
              key={`bokeh-${i}`}
              initial={{ opacity: 0, scale: 0, y: 15 }}
              animate={{
                opacity: [0, 0.85, 0.3],
                scale: [0.4, 1.2, 0.9],
                y: [15, -15, -30],
              }}
              transition={{
                duration: orb.duration,
                delay: orb.delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
              }}
              style={{
                transform: `translate(${orb.x}, ${orb.y})`,
              }}
              className={`absolute ${orb.size} rounded-full bg-gradient-to-tr from-amber-200 via-pink-200 to-white shadow-[0_0_12px_rgba(223,186,157,0.9)] pointer-events-none`}
            />
          ))}

          {/* Sparkling Diamond Glints */}
          {[
            { top: '28%', left: '32%', delay: 0.4 },
            { top: '26%', right: '30%', delay: 0.9 },
            { bottom: '30%', left: '28%', delay: 1.2 },
            { bottom: '28%', right: '32%', delay: 0.7 },
          ].map((pos, i) => (
            <motion.div
              key={`glint-${i}`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.3, 0],
                rotate: [0, 45, 90],
              }}
              transition={{
                duration: 2.0,
                delay: pos.delay,
                repeat: Infinity,
                repeatDelay: 0.8,
                ease: "easeInOut",
              }}
              style={pos}
              className="absolute pointer-events-none text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]"
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          ))}

          {/* ========================================================================= */}
          {/* 4. CLINICAL EMBLEM & PRESTIGE TYPOGRAPHIC REVEAL                          */}
          {/* ========================================================================= */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-lg mx-auto">
            
            {/* Luminous Pulsing Backing Sphere */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.85, 1.15, 1], opacity: [0.4, 0.9, 0.6] }}
              transition={{ duration: 3.0, ease: "easeInOut" }}
              className="absolute -inset-10 rounded-full bg-gradient-to-tr from-[#9E2A50]/20 via-[#DFBA9D]/40 to-white blur-2xl pointer-events-none"
            />

            {/* Emblem Crystal Bezel with Diagonal Liquid Sheen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, y: 20, filter: 'blur(12px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ scale: 1.12, opacity: 0, filter: 'blur(6px)', transition: { duration: 0.6 } }}
              transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="relative mb-6 group"
            >
              {/* Luxury Triple Gradient Frame */}
              <div className="p-[3px] rounded-full bg-gradient-to-tr from-[#9E2A50] via-[#DFBA9D] to-[#C73859] shadow-[0_15px_40px_-10px_rgba(199,56,89,0.35)]">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white p-1.5 border-2 border-white/90 flex items-center justify-center overflow-hidden relative">
                  
                  {/* Official High-Resolution GH Clinic Logo */}
                  <img
                    src={typeof headerLogoImg === 'string' ? headerLogoImg : headerLogoImg.src}
                    alt="Logo Officiel GH CLINIC Dr. Ghaouat Sarra"
                    className="w-full h-full object-cover rounded-full select-none"
                  />

                  {/* Diagonal Glass Sheen Light Sweep Across Logo Face */}
                  <motion.div
                    initial={{ x: '-150%', opacity: 0 }}
                    animate={{ x: '250%', opacity: [0, 0.75, 0] }}
                    transition={{
                      duration: 1.8,
                      delay: 0.8,
                      repeat: Infinity,
                      repeatDelay: 2.2,
                      ease: "easeInOut"
                    }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent transform -skew-x-25 pointer-events-none"
                  />
                </div>
              </div>

              {/* Verified Medical Aesthetics Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.75, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute -bottom-2 right-1 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#9E2A50] to-[#C73859] text-white text-[9px] font-serif font-bold uppercase tracking-wider shadow-md border border-white flex items-center gap-1"
              >
                <Crown className="w-2.5 h-2.5 text-amber-200" />
                <span>Excellence</span>
              </motion.div>
            </motion.div>

            {/* Brand Title: GH CLINIC with Metallic Gold Gradient Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 14, letterSpacing: '0.18em' }}
              animate={{ opacity: 1, y: 0, letterSpacing: '0.28em' }}
              exit={{ opacity: 0, y: -10, transition: { duration: 0.5 } }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="space-y-2"
            >
              <h1 className="font-serif font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#1C1917] tracking-widest uppercase">
                GH CLINIC
              </h1>

              {/* Aesthetic Subline & Filament Line */}
              <div className="flex items-center justify-center gap-2.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 1.0, delay: 0.6 }}
                  className="h-[1.5px] bg-gradient-to-r from-transparent to-[#C73859]"
                />
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#9E2A50] font-bold">
                  Cabinet Médico-Esthétique
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 1.0, delay: 0.6 }}
                  className="h-[1.5px] bg-gradient-to-l from-transparent to-[#C73859]"
                />
              </div>
            </motion.div>

            {/* Doctor & Location Line */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="mt-2 text-xs sm:text-sm font-serif italic text-stone-600 font-medium"
            >
              Dr. Ghaouat Sarra • Khemis Miliana
            </motion.p>

            {/* Subtle Aesthetic Philosophy Tagline */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 0.9 }}
              className="mt-3 text-[10px] uppercase font-serif tracking-[0.2em] text-[#C5A089] font-semibold"
            >
              L’Art du Naturel • L’Excellence Médicale
            </motion.div>

            {/* Animated Golden Energy Ray Separator */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 160, opacity: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut", delay: 0.5 }}
              className="mt-5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#C73859] to-transparent shadow-[0_0_8px_rgba(199,56,89,0.5)]"
            />

          </div>

          {/* ========================================================================= */}
          {/* 5. LUXURY FROSTED GLASS SKIP PILL                                         */}
          {/* ========================================================================= */}
          <motion.button
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onClose}
            className="absolute top-6 right-6 px-4 py-1.5 rounded-full bg-white/80 hover:bg-white backdrop-blur-md border border-pink-200 text-stone-600 hover:text-[#9E2A50] text-xs font-serif font-semibold tracking-wider transition-all shadow-xs hover:shadow-md z-20 cursor-pointer flex items-center gap-1.5"
            aria-label="Passer l'introduction"
            id="intro-skip-button"
          >
            <span>Passer</span>
            <span className="text-[10px] text-stone-400">✕</span>
          </motion.button>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
