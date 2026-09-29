'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  MessageCircle,
  Calendar
} from 'lucide-react';
import { FAQItem } from '@/lib/clinicData';

interface FAQSectionProps {
  faqs: FAQItem[];
  onOpenBooking: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  onOpenBooking,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 bg-white dark:bg-[#0F0D0C] relative transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-stone-900/90 border border-[#E5D4CB] dark:border-stone-800 shadow-xs">
            <HelpCircle className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55] dark:text-[#DFBA9D]">
              Vos Réponses en Toute Sérénité
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            Foire Aux Questions
          </h2>

          <p className="text-stone-600 dark:text-stone-300 font-light text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Retrouvez les réponses médicales claires aux interrogations les plus fréquentes avant votre venue au cabinet.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une question (laser, douleur, botox...)"
              className="w-full pl-11 pr-4 py-3 rounded-full bg-[#FAF8F5] dark:bg-[#181513] border border-[#E5D4CB] dark:border-stone-800 focus:border-[#9E6B55] dark:focus:border-[#DFBA9D] focus:outline-hidden text-xs sm:text-sm text-stone-800 dark:text-stone-100 transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-4 mb-12">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-10 bg-[#FAF8F5] dark:bg-[#181513] rounded-2xl p-6 text-stone-500 dark:text-stone-400 text-sm border border-[#E5D4CB]/60 dark:border-stone-800">
              Aucune question ne correspond à votre recherche. N’hésitez pas à nous contacter directement !
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-[#FAF8F5] dark:bg-[#181513] border border-[#E5D4CB]/80 dark:border-stone-800 overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-stone-100/50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#9E6B55] dark:bg-[#DFBA9D] shrink-0" />
                      <span className="font-serif font-bold text-base sm:text-lg text-stone-900 dark:text-[#FAF8F5]">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 text-[#9E6B55] dark:text-[#DFBA9D] shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed border-t border-[#E5D4CB]/40 dark:border-stone-800 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Direct Appointment Reassurance Card */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#F4DCD6]/60 via-[#FAF8F5] to-white dark:from-[#1A1615] dark:via-[#181513] dark:to-[#141210] border border-[#E5D4CB] dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1 max-w-xl">
            <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5]">
              Une autre question médicale ou tarifaire ?
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light">
              Notre équipe médicale vous accueille et répond à vos besoins personnalisés au cabinet de Khemis Miliana.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:from-[#d6ad8d] hover:to-[#8c5943] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre RDV au Cabinet</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
