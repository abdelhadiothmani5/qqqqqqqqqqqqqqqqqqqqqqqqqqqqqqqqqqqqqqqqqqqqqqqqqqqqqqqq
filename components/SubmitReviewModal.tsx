'use client';

import React, { useState } from 'react';
import {
  Star,
  X,
  Sparkles,
  CheckCircle2,
  MapPin,
  Stethoscope,
  User,
  MessageSquare,
  ShieldCheck,
  Send,
  ExternalLink
} from 'lucide-react';
import { Testimonial } from '@/lib/clinicData';
import { useAndroidModalBack } from '@/hooks/useAndroidModalBack';
import { triggerHaptic } from '@/lib/iosHaptics';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<Testimonial, 'id' | 'date'>) => void;
}

const POPULAR_TREATMENTS = [
  'Épilation Laser Haute Précision',
  'Injections Toxine Botulique (Botox)',
  'Comblement Acide Hyaluronique (Lèvres & Sillons)',
  'Hydrafacial MD Prestige & Glow',
  'PRP Visage & Vampire Lift',
  'Skinboosters Restylane & NCTF',
  'Peeling Médical Dermatologique',
  'Consultation & Bilan Esthétique',
];

const POPULAR_CITIES = [
  'Khemis Miliana',
  'Aïn Defla',
  'Alger',
  'Blida',
  'Médéa',
  'Chlef',
  'Tipaza',
];

const RATING_LABELS: Record<number, string> = {
  1: 'Expérience décevante',
  2: 'Moyen',
  3: 'Satisfaisant',
  4: 'Très satisfaisant',
  5: 'Exceptionnel & Recommandé ✨',
};

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  useAndroidModalBack(isOpen, onClose);

  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [patientName, setPatientName] = useState('');
  const [city, setCity] = useState('Khemis Miliana');
  const [treatment, setTreatment] = useState('Épilation Laser Haute Précision');
  const [comment, setComment] = useState('');
  const [isVerified, setIsVerified] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  if (!isOpen) return null;

  const currentActiveRating = hoverRating || rating;

  const handleStarClick = (value: number) => {
    triggerHaptic('medium');
    setRating(value);
  };

  const handleStarHover = (value: number) => {
    setHoverRating(value);
  };

  const handleStarLeave = () => {
    setHoverRating(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName.trim()) {
      setValidationError('Veuillez renseigner votre nom ou prénom.');
      return;
    }

    if (comment.trim().length < 15) {
      setValidationError('Veuillez écrire un commentaire d’au moins 15 caractères.');
      return;
    }

    setValidationError('');
    triggerHaptic('success');

    onSubmitReview({
      patientName: patientName.trim(),
      city: city.trim() || 'Khemis Miliana',
      rating,
      treatment,
      comment: comment.trim(),
      verified: isVerified,
    });

    setIsSubmitted(true);
  };

  const handleCloseAndReset = () => {
    setIsSubmitted(false);
    setPatientName('');
    setComment('');
    setRating(5);
    setValidationError('');
    onClose();

    // Smooth scroll to testimonials to see new review
    const element = document.getElementById('testimonials');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/65 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleCloseAndReset}
    >
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] dark:bg-[#141210] rounded-3xl shadow-2xl overflow-hidden border border-[#E5D4CB] dark:border-stone-800 my-auto max-h-[92dvh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* iOS Drag Handle Pill on Mobile */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center bg-white dark:bg-[#1A1816]">
          <div className="w-12 h-1.5 rounded-full bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-white dark:bg-[#1A1816] border-b border-[#E5D4CB]/70 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#DFBA9D] to-[#9E6B55] flex items-center justify-center shadow-md text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#9E6B55] dark:text-[#DFBA9D] font-serif">
                  Avis Patiente Vérifiée
                </span>
              </div>
              <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-900 dark:text-stone-100">
                {isSubmitted ? 'Merci pour votre confiance !' : 'Partagez votre expérience'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleCloseAndReset}
            className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white flex items-center justify-center transition-colors active:scale-95"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form or Confirmation View */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 text-stone-800 dark:text-stone-200">
          {!isSubmitted ? (
            <form id="submit-review-form" onSubmit={handleSubmit} className="space-y-5">
              
              {/* Star Rating Selector */}
              <div className="text-center p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#E5D4CB]/60 dark:border-stone-800 shadow-2xs space-y-2">
                <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
                  Votre note globale
                </label>
                
                <div className="flex items-center justify-center gap-2 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => handleStarClick(star)}
                      onMouseEnter={() => handleStarHover(star)}
                      onMouseLeave={handleStarLeave}
                      className="p-1 text-stone-300 dark:text-stone-700 hover:scale-110 active:scale-95 transition-all focus:outline-hidden"
                      aria-label={`${star} étoiles sur 5`}
                    >
                      <Star
                        className={`w-8 h-8 transition-colors ${
                          star <= currentActiveRating
                            ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                            : 'text-stone-300 dark:text-stone-700'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <div className="text-xs font-medium text-[#9E6B55] dark:text-[#DFBA9D] min-h-[1.25rem]">
                  {RATING_LABELS[currentActiveRating]}
                </div>
              </div>

              {/* Patient Name & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                    <span>Votre nom ou prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sarah M., Amina B."
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1A1816] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:border-[#9E6B55] dark:focus:border-[#DFBA9D] focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                    <span>Votre Ville / Wilaya</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Khemis Miliana, Alger..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    list="algeria-cities"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1A1816] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:border-[#9E6B55] dark:focus:border-[#DFBA9D] focus:outline-hidden"
                  />
                  <datalist id="algeria-cities">
                    {POPULAR_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>
              </div>

              {/* Treatment Selected */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Stethoscope className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                  <span>Soin ou Traitement réalisé</span>
                </label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1A1816] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:border-[#9E6B55] dark:focus:border-[#DFBA9D] focus:outline-hidden"
                >
                  {POPULAR_TREATMENTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment Textarea */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                    <span>Votre avis détaillé *</span>
                  </label>
                  <span className="text-[10px] text-stone-400">
                    {comment.length} caractères (min. 15)
                  </span>
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Décrivez votre expérience avec Dr. Ghaouat Sarra (douceur, hygiène, explications médicales, résultats obtenus...)"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1A1816] text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:border-[#9E6B55] dark:focus:border-[#DFBA9D] focus:outline-hidden resize-none leading-relaxed"
                />
              </div>

              {/* Verified declaration toggle */}
              <label className="flex items-start gap-2.5 cursor-pointer text-xs text-stone-600 dark:text-stone-400 select-none">
                <input
                  type="checkbox"
                  checked={isVerified}
                  onChange={(e) => setIsVerified(e.target.checked)}
                  className="mt-0.5 rounded text-[#9E6B55] focus:ring-[#9E6B55]"
                />
                <span>
                  Je certifie avoir réalisé ce soin au cabinet du Dr. Ghaouat Sarra à Khemis Miliana.
                </span>
              </label>

              {/* Validation error message */}
              {validationError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-medium border border-rose-200 dark:border-rose-900/50">
                  {validationError}
                </div>
              )}

            </form>
          ) : (
            /* Success confirmation screen */
            <div className="py-6 px-2 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1.5">
                <h4 className="font-serif font-bold text-xl text-stone-900 dark:text-stone-100">
                  Témoignage Enregistré !
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed">
                  Merci infiniment, <strong>{patientName}</strong>. Votre avis a été ajouté en direct à la section Témoignages de la clinique.
                </p>
              </div>

              {/* Google Reviews Recommendation Bridge */}
              <div className="p-4 rounded-2xl bg-white dark:bg-[#1A1816] border border-[#DFBA9D]/40 shadow-xs space-y-2.5 max-w-sm mx-auto text-left">
                <div className="flex items-center gap-2 text-xs font-bold text-stone-900 dark:text-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Soutenez le cabinet sur Google Maps</span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  Vous pouvez également copier votre texte et le poster sur la fiche officielle Google du Dr. Ghaouat Sarra.
                </p>
                <a
                  href="https://www.google.com/maps/place/Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors"
                >
                  <span>Ouvrir Google Avis</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Action Bar */}
        <div
          className="p-4 sm:p-5 bg-white dark:bg-[#1A1816] border-t border-[#E5D4CB]/70 dark:border-stone-800 flex items-center justify-between gap-3 shrink-0"
          style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1.25rem)' }}
        >
          {!isSubmitted ? (
            <>
              <button
                type="button"
                onClick={handleCloseAndReset}
                className="px-5 py-2.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-200 transition-colors active:scale-95"
              >
                Annuler
              </button>

              <button
                form="submit-review-form"
                type="submit"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:brightness-105 active:scale-95 text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-2 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publier mon Avis</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={handleCloseAndReset}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white text-xs sm:text-sm font-bold shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Découvrir mon avis dans la liste</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
