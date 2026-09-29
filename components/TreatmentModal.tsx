'use client';

import React from 'react';
import {
  X,
  Sparkles,
  Calendar,
  Clock,
  ShieldAlert,
  CheckCircle2,
  HelpCircle,
  Stethoscope,
  ArrowRight,
  Zap,
  Info,
  Share2
} from 'lucide-react';
import { Treatment } from '@/lib/clinicData';
import { useAndroidModalBack } from '@/hooks/useAndroidModalBack';
import { triggerHaptic } from '@/lib/iosHaptics';

interface TreatmentModalProps {
  treatment: Treatment | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (treatmentId: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  isOpen,
  onClose,
  onBook,
}) => {
  useAndroidModalBack(isOpen, onClose);

  if (!isOpen || !treatment) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E5D4CB] my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle Pill on Mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-black/80">
          <div className="w-12 h-1.5 rounded-full bg-white/40" />
        </div>

        {/* Modal Header & Hero Image */}
        <div className="relative h-64 sm:h-80 w-full shrink-0 overflow-hidden">
          <img
            src={treatment.heroImage}
            alt={treatment.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

          {/* Action Buttons (Share + Close) */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              onClick={() => {
                triggerHaptic('light');
                if (typeof navigator !== 'undefined' && navigator.share) {
                  navigator.share({
                    title: `GH Clinic — ${treatment.name}`,
                    text: `Découvrez le soin médico-esthétique ${treatment.name} au cabinet Dr. Ghaouat Sarra (Khemis Miliana).`,
                    url: window.location.href,
                  }).catch(() => {});
                } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
                  navigator.clipboard.writeText(window.location.href);
                }
              }}
              className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all backdrop-blur-md border border-white/20"
              aria-label="Partager ce soin"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 active:scale-95 transition-all backdrop-blur-md border border-white/20"
              aria-label="Fermer le dossier médical"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Title & Category Badge on Image */}
          <div className="absolute bottom-6 inset-x-6 text-white space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#DFBA9D] text-[#1C1917] text-xs font-bold uppercase tracking-wider">
                {treatment.categoryLabel}
              </span>
              {treatment.nameAr && (
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-medium border border-white/30" dir="rtl">
                  {treatment.nameAr}
                </span>
              )}
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-4xl text-white tracking-tight">
              {treatment.name}
            </h2>
            <p className="text-sm text-stone-200 line-clamp-2 max-w-2xl font-light">
              {treatment.shortDescription}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          
          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5D4CB]/80">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Investissement</span>
              <div className="font-bold text-[#9E6B55] text-base">
                Dès {treatment.priceDZD.toLocaleString()} DZD
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Durée Séance</span>
              <div className="font-bold text-stone-800 text-base flex items-center gap-1">
                <Clock className="w-4 h-4 text-[#C5A089]" />
                {treatment.durationMinutes} minutes
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Confort / Douleur</span>
              <div className="font-bold text-stone-800 text-base">
                {treatment.painLevel === 0 ? 'Indolore (0/5)' : `${treatment.painLevel}/5 (Anesthésie dispo)`}
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">Éviction Sociale</span>
              <div className="font-bold text-stone-800 text-base">
                {treatment.recoveryDays}
              </div>
            </div>
          </div>

          {/* Detailed Clinical Description */}
          <div className="space-y-3">
            <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#9E6B55]" />
              Présentation & Protocole Médical
            </h3>
            <p className="text-stone-600 leading-relaxed text-sm sm:text-base font-light">
              {treatment.fullDescription}
            </p>
          </div>

          {/* Benefits Checklist */}
          {treatment.benefits && treatment.benefits.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Bénéfices & Résultats Attendus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {treatment.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-200/60">
                    <CheckCircle2 className="w-5 h-5 text-[#9E6B55] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-stone-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step by step procedure */}
          {treatment.procedureSteps && treatment.procedureSteps.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-xl text-stone-900">
                Déroulement de la Séance au Cabinet
              </h3>
              <div className="space-y-3">
                {treatment.procedureSteps.map((step, i) => (
                  <div key={i} className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5D4CB]/60 flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#9E6B55] text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="font-semibold text-stone-900 text-sm">{step.title}</h4>
                      <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctor's advice banner */}
          {treatment.doctorAdvice && (
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#F4DCD6]/60 to-[#FAF8F5] border border-[#E5D4CB] flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#9E6B55] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-base">
                  Le Conseil Clinique de Dr. Ghaouat Sarra
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 mt-1 italic leading-relaxed">
                  « {treatment.doctorAdvice} »
                </p>
              </div>
            </div>
          )}

          {/* Specific FAQs */}
          {treatment.faqs && treatment.faqs.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#9E6B55]" />
                Questions Fréquentes sur ce Soin
              </h3>
              <div className="space-y-2">
                {treatment.faqs.map((faq, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <div className="font-semibold text-stone-900 text-sm">{faq.question}</div>
                    <div className="text-xs sm:text-sm text-stone-600 mt-1">{faq.answer}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contraindications Warning */}
          {treatment.contraindications && treatment.contraindications.length > 0 && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 space-y-1">
              <div className="flex items-center gap-2 font-semibold text-xs uppercase tracking-wider text-amber-800">
                <ShieldAlert className="w-4 h-4" />
                Contre-indications médicales
              </div>
              <ul className="text-xs list-disc list-inside space-y-0.5 text-amber-900/90 pt-1">
                {treatment.contraindications.map((ci, i) => (
                  <li key={i}>{ci}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

        {/* Modal Footer CTA */}
        <div
          className="p-5 sm:p-6 bg-[#FAF8F5] border-t border-[#E5D4CB] flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
        >
          <div>
            <span className="text-xs text-stone-500">Tarif de référence</span>
            <div className="font-serif font-bold text-xl text-[#9E6B55]">
              {treatment.priceNote || `Dès ${treatment.priceDZD.toLocaleString()} DZD`}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-full bg-white border border-stone-300 text-stone-700 text-sm font-semibold hover:bg-stone-50 active:scale-95 transition-all"
            >
              Fermer
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(treatment.id);
              }}
              className="w-1/2 sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:from-[#d6ad8d] hover:to-[#8c5943] text-white text-sm font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre Rendez-vous</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
