'use client';

import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[60] pointer-events-none bg-stone-200/20"
      aria-hidden="true"
      id="luxury-scroll-progress-container"
    >
      <motion.div
        className="h-full bg-gradient-to-r from-[#DFBA9D] via-[#C73859] to-[#9E2A50] origin-left relative"
        style={{ scaleX }}
      >
        {/* Glowing Head Particle */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-amber-200 blur-[2px] shadow-[0_0_10px_rgba(223,186,157,1)]" />
      </motion.div>
    </div>
  );
};
