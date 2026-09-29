'use client';

import React, { useState } from 'react';
import { X, Sparkles, Syringe, Zap, Phone, MapPin, Calendar, FileText } from 'lucide-react';
import { InjectablesPoster } from './InjectablesPoster';
import { LaserPoster } from './LaserPoster';

interface TariffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (treatmentName?: string) => void;
  initialTab?: 'injectables' | 'laser';
}

export const TariffModal: React.FC<TariffModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  initialTab = 'injectables',
}) => {
  const [activeTab, setActiveTab] = useState<'injectables' | 'laser'>(initialTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-stone-950/70 dark:bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl my-auto bg-gradient-to-b from-[#FFF5F7] via-[#FAF8F5] to-[#FDECEF] dark:from-[#181513] dark:via-[#141210] dark:to-[#181513] rounded-3xl shadow-2xl border border-pink-300 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
        id="tariff-full-modal"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-[#1C1917]/95 backdrop-blur-md border-b border-pink-200/80 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/80 border border-pink-300 dark:border-pink-900/50 flex items-center justify-center text-[#C73859] dark:text-pink-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-[#FAF8F5] leading-tight">
                Tarification Officielle GH CLINIC
              </h3>
              <p className="text-[11px] sm:text-xs text-[#9E2A50] dark:text-[#DFBA9D] font-medium font-serif italic">
                Dr. Ghaouat Sarra • Khemis Miliana
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switch inside modal header */}
            <div className="hidden sm:inline-flex items-center p-1 rounded-full bg-pink-50 dark:bg-stone-800 border border-pink-200 dark:border-stone-700">
              <button
                onClick={() => setActiveTab('injectables')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'injectables'
                    ? 'bg-[#C73859] text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-[#DFBA9D]'
                }`}
              >
                <Syringe className="w-3.5 h-3.5" />
                <span>INJECTABLES</span>
              </button>
              <button
                onClick={() => setActiveTab('laser')}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold uppercase tracking-wider transition-all ${
                  activeTab === 'laser'
                    ? 'bg-[#C73859] text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-[#DFBA9D]'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>ÉPILATION LASER</span>
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-pink-100 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 hover:text-[#C73859] dark:hover:text-white flex items-center justify-center transition-colors border border-stone-200 dark:border-stone-700 hover:border-pink-300"
              aria-label="Fermer"
              id="tariff-modal-close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="sm:hidden px-4 pt-3 pb-1 bg-white/70 dark:bg-stone-900/80 border-b border-pink-100 dark:border-stone-800 flex justify-center">
          <div className="inline-flex items-center p-1 rounded-full bg-pink-50 dark:bg-stone-800 border border-pink-200 dark:border-stone-700 w-full max-w-xs">
            <button
              onClick={() => setActiveTab('injectables')}
              className={`flex-1 py-1.5 text-center text-xs font-serif font-bold uppercase tracking-wider rounded-full transition-all ${
                activeTab === 'injectables' ? 'bg-[#C73859] text-white' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              INJECTABLES
            </button>
            <button
              onClick={() => setActiveTab('laser')}
              className={`flex-1 py-1.5 text-center text-xs font-serif font-bold uppercase tracking-wider rounded-full transition-all ${
                activeTab === 'laser' ? 'bg-[#C73859] text-white' : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              ÉPILATION LASER
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto space-y-6">
          {activeTab === 'injectables' ? (
            <InjectablesPoster
              onOpenBooking={(name) => {
                onClose();
                onOpenBooking(name);
              }}
            />
          ) : (
            <LaserPoster
              onOpenBooking={(name) => {
                onClose();
                onOpenBooking(name);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
