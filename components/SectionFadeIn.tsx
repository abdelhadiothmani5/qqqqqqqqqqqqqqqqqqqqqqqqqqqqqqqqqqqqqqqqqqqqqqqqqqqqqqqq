'use client';

import React from 'react';
import { motion } from 'motion/react';

interface SectionFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
}

export const SectionFadeIn: React.FC<SectionFadeInProps> = ({
  children,
  className = '',
  delay = 0,
  id,
}) => {
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
