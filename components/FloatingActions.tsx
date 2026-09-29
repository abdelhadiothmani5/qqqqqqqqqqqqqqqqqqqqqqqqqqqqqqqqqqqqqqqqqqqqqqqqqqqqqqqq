'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageCircle,
  Calendar,
  ChevronUp,
  Phone
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';
import { ThemeToggle } from '@/components/ThemeToggle';

interface FloatingActionsProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({
  settings,
  onOpenBooking,
}) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Action Buttons (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-700 dark:text-stone-200 shadow-lg border border-stone-200 dark:border-stone-800 flex items-center justify-center hover:bg-stone-100 dark:hover:bg-stone-800 transition-all pointer-events-auto hover:scale-105 active:scale-95 mb-16 sm:mb-0"
            aria-label="Retour en haut de page"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Quick Theme Toggle Button */}
        <div className="hidden sm:block pointer-events-auto">
          <ThemeToggle variant="floating" />
        </div>

        {/* Direct WhatsApp Floating Trigger */}
        <a
          href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent("Bonjour Dr. Ghaouat, je souhaite prendre un rendez-vous à la clinique.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex group relative items-center gap-2.5 px-4 py-3 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all pointer-events-auto"
          aria-label="Contacter sur WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white" />
          <span className="text-xs font-bold">WhatsApp Direct</span>
        </a>

      </div>
    </>
  );
};
