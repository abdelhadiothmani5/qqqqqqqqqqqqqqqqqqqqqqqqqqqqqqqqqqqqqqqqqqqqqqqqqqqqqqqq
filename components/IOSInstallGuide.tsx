'use client';

import React, { useState, useEffect } from 'react';
import { Share, PlusSquare, Smartphone, X, CheckCircle, Sparkles, ChevronRight } from 'lucide-react';
import { triggerHaptic } from '@/lib/iosHaptics';

interface IOSInstallGuideProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const IOSInstallGuide: React.FC<IOSInstallGuideProps> = ({
  forceOpen = false,
  onClose,
}) => {
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    const ua = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  });

  const [isStandalone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });

  const [hasDismissed, setHasDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('gh_clinic_ios_install_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    triggerHaptic('light');
    setIsOpen(true);
  };

  const handleClose = () => {
    triggerHaptic('light');
    setIsOpen(false);
    if (onClose) onClose();
  };

  const handleDismissBanner = () => {
    triggerHaptic('light');
    setHasDismissed(true);
    try {
      localStorage.setItem('gh_clinic_ios_install_dismissed', 'true');
    } catch {}
  };

  // If already running standalone on iOS, do not show install prompt
  if (isStandalone && !forceOpen) {
    return null;
  }

  const isModalVisible = isOpen || forceOpen;

  return (
    <>
      {/* iOS Ambient Suggestion Banner (shown on Safari mobile when not dismissed) */}
      {isIOS && !isStandalone && !hasDismissed && !forceOpen && (
        <div className="sm:hidden fixed top-20 inset-x-3 z-30 animate-in slide-in-from-top-4 duration-300">
          <div className="glass-luxury rounded-2xl p-3 shadow-xl border border-[#DFBA9D]/40 flex items-center justify-between gap-3">
            <button
              onClick={handleOpen}
              className="flex items-center gap-3 text-left flex-1"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1C1917] to-[#292524] p-1 flex items-center justify-center shrink-0 border border-[#DFBA9D]/30 shadow-md">
                <Smartphone className="w-5 h-5 text-[#DFBA9D]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-900 dark:text-stone-100 font-serif">Installer sur iPhone</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#DFBA9D]/25 text-[#9E6B55] dark:text-[#DFBA9D] font-bold">iOS App</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Accès 1-tap, mode plein écran & haptique
                </p>
              </div>
            </button>

            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={handleOpen}
                className="px-2.5 py-1.5 rounded-lg bg-[#9E6B55] text-white text-[11px] font-bold shadow-sm active:scale-95 transition-transform"
              >
                Guide
              </button>
              <button
                onClick={handleDismissBanner}
                className="p-1 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cupertino-grade iOS Installation Modal */}
      {isModalVisible && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={handleClose}
        >
          <div
            className="w-full max-w-md bg-[#FAF8F5] dark:bg-[#141210] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#DFBA9D]/30 overflow-hidden flex flex-col max-h-[90dvh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
          >
            {/* iOS Bottom Sheet Drag Pill */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#E5D4CB]/60 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFBA9D] to-[#9E6B55] flex items-center justify-center shadow-md">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Installer sur votre iPhone
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Cabinet Dr. Ghaouat Sarra
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-stone-800 dark:text-stone-200 text-sm">
              <div className="p-3.5 rounded-2xl bg-[#DFBA9D]/15 dark:bg-[#DFBA9D]/10 border border-[#DFBA9D]/30 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#9E6B55] dark:text-[#DFBA9D] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-stone-100 block mb-0.5">Expérience Native iOS Complète</strong>
                  Profitez de l&apos;application GH Clinic en plein écran, sans la barre d&apos;adresse Safari, avec des animations à 120Hz et un accès instantané à vos rendez-vous.
                </div>
              </div>

              {/* Step 1 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#9E6B55]/10 dark:bg-[#DFBA9D]/15 text-[#9E6B55] dark:text-[#DFBA9D] font-bold text-sm flex items-center justify-center shrink-0">
                  1
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>Touchez l&apos;icône Partager</span>
                    <span className="p-1 rounded-md bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 inline-flex items-center">
                      <Share className="w-4 h-4 text-blue-500" />
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    Dans la barre d&apos;outils inférieure de Safari (en bas de votre écran).
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#9E6B55]/10 dark:bg-[#DFBA9D]/15 text-[#9E6B55] dark:text-[#DFBA9D] font-bold text-sm flex items-center justify-center shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                    <span>Faites défiler et sélectionnez</span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-800 dark:text-stone-200">
                    <PlusSquare className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D]" />
                    <span>Sur l&apos;écran d&apos;accueil</span>
                    <span className="text-[10px] text-stone-400 ml-auto">Add to Home Screen</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-3.5 rounded-2xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#9E6B55]/10 dark:bg-[#DFBA9D]/15 text-[#9E6B55] dark:text-[#DFBA9D] font-bold text-sm flex items-center justify-center shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-stone-900 dark:text-stone-100">
                    Touchez «&nbsp;Ajouter&nbsp;»
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    En haut à droite de l&apos;écran. L&apos;icône dorée GH Clinic apparaîtra sur votre écran d&apos;accueil iPhone.
                  </p>
                </div>
              </div>

              {/* Benefits checklist */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Aucun App Store requis</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Chargement ultra rapide</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% sécurisé</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Mises à jour automatiques</span>
                </div>
              </div>
            </div>

            {/* Bottom Button */}
            <div className="px-6 pt-2 pb-4 border-t border-[#E5D4CB]/60 dark:border-stone-800 flex items-center gap-3">
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <span>J&apos;ai compris</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
