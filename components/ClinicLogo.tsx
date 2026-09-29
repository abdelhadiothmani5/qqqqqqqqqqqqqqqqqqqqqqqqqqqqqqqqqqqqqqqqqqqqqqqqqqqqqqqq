'use client';

import React from 'react';
import { motion } from 'motion/react';
import type { StaticImageData } from 'next/image';
import defaultLogoImg from '@/src/assets/images/regenerated_image_1790689939032.png';

export interface ClinicLogoProps {
  /**
   * Predefined or custom size
   * - 'xs': ~32px (ideal for compact badges)
   * - 'sm': ~40px (ideal for mobile navbar)
   * - 'md': ~52px (ideal for desktop navbar)
   * - 'lg': ~72px (ideal for footer/modals)
   * - 'xl': ~100px (ideal for sections)
   * - 'hero': ~130px - 160px (prominent hero mark)
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'hero' | 'custom';
  className?: string;
  imgClassName?: string;
  animate?: boolean | 'hero';
  withGlow?: boolean;
  priority?: boolean;
  alt?: string;
  src?: string | StaticImageData;
}

const sizeMap = {
  xs: 'w-8 h-8 aspect-square',
  sm: 'w-10 h-10 aspect-square',
  md: 'w-12 h-12 sm:w-14 sm:h-14 aspect-square',
  lg: 'w-16 h-16 sm:w-20 sm:h-20 aspect-square',
  xl: 'w-24 h-24 sm:w-28 sm:h-28 aspect-square',
  hero: 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 aspect-square',
  custom: 'aspect-square',
};

export const ClinicLogo: React.FC<ClinicLogoProps> = ({
  size = 'md',
  className = '',
  imgClassName = '',
  animate = false,
  withGlow = false,
  alt = 'GH Clinic — Cabinet Médico-Esthétique Dr. Ghaouat Sarra (Official Logo)',
  src,
}) => {
  const sizeClasses = sizeMap[size] || sizeMap.md;
  const activeLogo = src || defaultLogoImg;
  const imgSrc = typeof activeLogo === 'string' ? activeLogo : activeLogo.src;

  const content = (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-xs border border-pink-200/60 bg-[#FAF8F5] ${sizeClasses} ${className}`}
      id="gh-clinic-official-logo"
    >
      {/* Subtle Ambient Breathing Glow Behind the Logo */}
      {withGlow && (
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#FCE8ED]/70 via-[#F4DCD6]/60 to-[#FAF8F5]/80 blur-xl pointer-events-none -z-10 animate-gh-glow"
          aria-hidden="true"
        />
      )}

      {/* Official GH Clinic Logo Image Asset */}
      <img
        src={imgSrc}
        alt={alt}
        className={`w-full h-full object-cover rounded-full select-none transition-transform duration-300 ${imgClassName}`}
        referrerPolicy="no-referrer"
        loading="eager"
        decoding="async"
      />
    </div>
  );

  // Hero / Premium Entrance Animation
  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1],
          delay: typeof animate === 'string' && animate === 'hero' ? 0.2 : 0,
        }}
        className="relative inline-flex items-center justify-center"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};
