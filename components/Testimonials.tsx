'use client';

import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Star,
  Quote,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  PenLine,
  Filter,
  ExternalLink
} from 'lucide-react';
import { Testimonial } from '@/lib/clinicData';
import { SubmitReviewModal } from '@/components/SubmitReviewModal';
import { triggerHaptic } from '@/lib/iosHaptics';

interface TestimonialsProps {
  testimonials: Testimonial[];
  onOpenBooking: () => void;
  onAddReview?: (review: Omit<Testimonial, 'id' | 'date'>) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({
  testimonials,
  onOpenBooking,
  onAddReview,
}) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');

  // Compute dynamic average rating
  const averageRating = useMemo(() => {
    if (!testimonials || testimonials.length === 0) return '5.0';
    const sum = testimonials.reduce((acc, t) => acc + t.rating, 0);
    return (sum / testimonials.length).toFixed(1);
  }, [testimonials]);

  // Categories list for filter pills
  const categories = useMemo(() => {
    const list = ['all', 'Laser', 'Botox', 'Acide Hyaluronique', 'Hydrafacial', 'PRP'];
    return list;
  }, []);

  // Filtered reviews
  const filteredTestimonials = useMemo(() => {
    if (selectedCategoryFilter === 'all') return testimonials;
    return testimonials.filter((t) =>
      t.treatment.toLowerCase().includes(selectedCategoryFilter.toLowerCase())
    );
  }, [testimonials, selectedCategoryFilter]);

  const handleOpenSubmit = () => {
    triggerHaptic('medium');
    setIsSubmitModalOpen(true);
  };

  const handleReviewSubmit = (review: Omit<Testimonial, 'id' | 'date'>) => {
    if (onAddReview) {
      onAddReview(review);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-[#FAF8F5] dark:bg-[#0C0A09] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/90 border border-[#E5D4CB] dark:border-stone-800 shadow-xs">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55] dark:text-[#DFBA9D]">
              Expériences &amp; Avis Vérifiés
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            La Voix de Nos Patientes
          </h2>

          <p className="text-stone-600 dark:text-stone-300 font-light text-base sm:text-lg leading-relaxed">
            La plus belle reconnaissance de notre travail réside dans la confiance et le sourire de nos patientes à Khemis Miliana et à travers toute l’Algérie.
          </p>

          {/* Rating Summary & Action Row */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white dark:bg-[#181513] border border-[#E5D4CB] dark:border-stone-800 shadow-xs">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100">
                {averageRating} / 5.0 • <span className="font-normal text-stone-500 dark:text-stone-400">{testimonials.length} avis</span>
              </div>
            </div>

            {/* Direct CTA: Submit Review Button */}
            <button
              onClick={handleOpenSubmit}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:brightness-105 text-white font-semibold text-xs shadow-xs active:scale-95 transition-all"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span>Laisser un Avis Patiente</span>
            </button>
          </div>
        </div>

        {/* Filter Pills for Reviews */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-10 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategoryFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  triggerHaptic('selection');
                  setSelectedCategoryFilter(cat);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#1C1917] dark:bg-stone-100 text-[#DFBA9D] dark:text-[#1C1917] shadow-xs scale-105'
                    : 'bg-white dark:bg-[#181513] text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white border border-[#E5D4CB]/70 dark:border-stone-800'
                }`}
              >
                {cat === 'all' ? 'Tous les avis' : cat}
              </button>
            );
          })}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredTestimonials.map((t) => {
            const isNew = t.id.startsWith('rev-');
            return (
              <div
                key={t.id}
                className="p-6 rounded-3xl bg-white dark:bg-[#181513] border border-[#E5D4CB]/80 dark:border-stone-800 hover:border-[#C5A089] dark:hover:border-[#DFBA9D]/50 hover:shadow-xl dark:hover:shadow-stone-950/60 transition-all duration-300 flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-3">
                  {/* Rating Stars and Date / New Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      {isNew && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[9px] font-bold border border-emerald-200 dark:border-emerald-800">
                          Nouveau
                        </span>
                      )}
                      <span className="text-[11px] text-stone-400 font-medium">
                        {t.date}
                      </span>
                    </div>
                  </div>

                  {/* Treatment Tag */}
                  <div className="inline-block px-2.5 py-1 rounded-full bg-pink-50 dark:bg-pink-950/70 text-[#9E6B55] dark:text-pink-300 text-[11px] font-semibold border border-pink-100 dark:border-pink-900/50">
                    {t.treatment}
                  </div>

                  {/* Review Quote Text */}
                  <p className="text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-light leading-relaxed italic">
                    «&nbsp;{t.comment}&nbsp;»
                  </p>
                </div>

                {/* Patient Info & Verified Badge */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div>
                    <div className="font-serif font-bold text-stone-900 dark:text-stone-100 text-sm">
                      {t.patientName}
                    </div>
                    <div className="text-[11px] text-stone-400 font-light">
                      {t.city}
                    </div>
                  </div>

                  {t.verified && (
                    <div
                      className="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-2xs"
                      title="Patiente certifiée au cabinet"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Dual Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:brightness-105 text-white font-serif font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            <span>Prendre Rendez-vous en Ligne</span>
          </button>

          <button
            onClick={handleOpenSubmit}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white dark:bg-[#181513] border border-[#E5D4CB] dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:text-[#9E6B55] dark:hover:text-[#DFBA9D] font-semibold text-xs shadow-xs hover:shadow-md transition-all active:scale-95"
          >
            <PenLine className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D]" />
            <span>Vous avez réalisé un soin ? Déposez votre avis</span>
          </button>
        </div>

      </div>

      {/* Interactive Submit Review Modal */}
      <SubmitReviewModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSubmitReview={handleReviewSubmit}
      />
    </section>
  );
};
