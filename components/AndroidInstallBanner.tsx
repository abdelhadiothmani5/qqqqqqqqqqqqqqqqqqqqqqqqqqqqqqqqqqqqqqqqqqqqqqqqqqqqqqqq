'use client';

import React, { useState } from 'react';
import { Download, Sparkles, X, CheckCircle2, Zap, ArrowRight, ShieldCheck, Compass } from 'lucide-react';
import { usePWAInstall } from '@/hooks/usePWAInstall';
import { triggerHaptic } from '@/lib/iosHaptics';

interface AndroidInstallBannerProps {
  forceOpen?: boolean;
  onClose?: () => void;
}

export const AndroidInstallBanner: React.FC<AndroidInstallBannerProps> = ({
  forceOpen = false,
  onClose,
}) => {
  const { isInstallable, isInstalled, isAndroid, install } = usePWAInstall();
  const [hasDismissed, setHasDismissed] = useState(() => {
    if (typeof window === 'undefined') return false;
    try {
      return localStorage.getItem('gh_clinic_android_install_dismissed') === 'true';
    } catch {
      return false;
    }
  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [installState, setInstallState] = useState<'idle' | 'installing' | 'success'>('idle');

  const handleInstallClick = async () => {
    triggerHaptic('medium');
    setInstallState('installing');
    const accepted = await install();
    if (accepted) {
      setInstallState('success');
      triggerHaptic('success');
      setTimeout(() => {
        setShowDetailsModal(false);
      }, 1800);
    } else {
      setInstallState('idle');
    }
  };

  const handleDismiss = () => {
    triggerHaptic('light');
    setHasDismissed(true);
    try {
      localStorage.setItem('gh_clinic_android_install_dismissed', 'true');
    } catch {}
    if (onClose) onClose();
  };

  // If already installed, hide banner unless force opened
  if (isInstalled && !forceOpen) {
    return null;
  }

  const isModalOpen = showDetailsModal || forceOpen;

  return (
    <>
      {/* 1. Android Ambient Quick Install Pill / Card (shown when installable and not dismissed) */}
      {isAndroid && isInstallable && !hasDismissed && !isModalOpen && (
        <div className="sm:hidden fixed bottom-20 inset-x-3 z-30 animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-stone-900/95 text-white backdrop-blur-xl rounded-2xl p-3.5 shadow-2xl border border-[#DFBA9D]/40 flex items-center justify-between gap-3">
            <div
              onClick={() => {
                triggerHaptic('light');
                setShowDetailsModal(true);
              }}
              className="flex items-center gap-3 flex-1 cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#DFBA9D] to-[#9E6B55] flex items-center justify-center shrink-0 shadow-md">
                <Download className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white font-serif">Installer l&apos;application</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
                    Android
                  </span>
                </div>
                <p className="text-[11px] text-stone-300">
                  Accès direct 1-clic &amp; mode hors-ligne
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleInstallClick}
                className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white text-xs font-bold shadow-md active:scale-95 transition-transform flex items-center gap-1.5"
              >
                <span>Installer</span>
              </button>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-full text-stone-400 hover:text-white"
                aria-label="Ignorer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Detailed Android Installation Sheet / Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/65 backdrop-blur-md animate-in fade-in duration-200 p-0 sm:p-4"
          onClick={() => {
            setShowDetailsModal(false);
            if (onClose) onClose();
          }}
        >
          <div
            className="w-full max-w-md bg-[#FAF8F5] dark:bg-[#141210] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#DFBA9D]/40 overflow-hidden flex flex-col max-h-[90dvh] animate-in slide-in-from-bottom-8 sm:zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
          >
            {/* Top Sheet Drag Pill */}
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
            </div>

            {/* Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-[#E5D4CB]/60 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFBA9D] to-[#9E6B55] flex items-center justify-center shadow-md">
                  <Download className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Application GH Clinic Android
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Dr. Ghaouat Sarra • Khemis Miliana
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  if (onClose) onClose();
                }}
                className="w-8 h-8 rounded-full bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 flex items-center justify-center active:scale-95 transition-transform"
                aria-label="Fermer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Features Content */}
            <div className="p-6 overflow-y-auto space-y-4 text-stone-800 dark:text-stone-200 text-sm">
              <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                  <strong className="text-stone-900 dark:text-stone-100 block mb-0.5">Application Web Progressive Certifiée</strong>
                  Installation ultra-légère sans encombrer la mémoire de votre téléphone Android. Aucune autorisation intrusive.
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-2xs">
                  <Zap className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">Lancement Instantané</h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Ouvrez la clinique directement depuis votre écran d&apos;accueil sans barre Chrome.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-2xs">
                  <Compass className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">Raccourcis d&apos;App Android</h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Faites un appui long sur l&apos;icône pour accéder directement à la prise de RDV ou aux tarifs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-[#1C1917] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">Disponibilité Hors-ligne</h4>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400">
                      Consultez les soins, tarifs et adresses même en zone de faible réseau.
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Feedback */}
              {installState === 'success' && (
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Application installée avec succès sur votre Android !</span>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="px-6 pt-2 pb-4 border-t border-[#E5D4CB]/60 dark:border-stone-800 flex items-center gap-3">
              {isInstallable ? (
                <button
                  onClick={handleInstallClick}
                  disabled={installState === 'installing' || installState === 'success'}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white font-bold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  <Download className="w-4 h-4" />
                  <span>
                    {installState === 'installing'
                      ? 'Installation en cours...'
                      : installState === 'success'
                      ? 'Installé !'
                      : 'Installer sur mon Android'}
                  </span>
                </button>
              ) : (
                <div className="w-full space-y-2">
                  <p className="text-xs text-center text-stone-500">
                    Pour installer sur Chrome Android : appuyez sur les <strong>3 points (⋮)</strong> en haut à droite, puis <strong>« Installer l&apos;application »</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      if (onClose) onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold"
                  >
                    Fermer
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
