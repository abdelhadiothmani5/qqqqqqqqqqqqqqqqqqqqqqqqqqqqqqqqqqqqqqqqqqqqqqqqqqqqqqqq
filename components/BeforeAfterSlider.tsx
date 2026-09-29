'use client';

import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Info,
  CheckCircle2
} from 'lucide-react';
import { BeforeAfterCase } from '@/lib/clinicData';

interface BeforeAfterSliderProps {
  cases: BeforeAfterCase[];
  onOpenBooking: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  cases,
  onOpenBooking,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const currentCase = cases[activeCaseIndex] || cases[0];

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = (x / width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section id="before-after" className="py-20 bg-[#FAF8F5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#E5D4CB] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#9E6B55]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55]">
              Résultats Réels & Authentiques
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            Galerie Avant / Après
          </h2>

          <p className="text-stone-600 font-light text-base sm:text-lg leading-relaxed">
            Faites glisser le curseur pour observer la précision des actes réalisés au cabinet par Dr. Ghaouat Sarra.
          </p>
        </div>

        {/* Case Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          {cases.map((c, index) => (
            <button
              key={c.id}
              onClick={() => {
                setActiveCaseIndex(index);
                setSliderPosition(50);
              }}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                activeCaseIndex === index
                  ? 'bg-[#1C1917] text-white shadow-md'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-[#E5D4CB]'
              }`}
            >
              {c.treatmentName}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Slider Container */}
          <div className="lg:col-span-7">
            <div
              ref={containerRef}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-900 cursor-ew-resize select-none touch-none"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Full background) */}
              <img
                src={currentCase.afterImage}
                alt={`Après - ${currentCase.treatmentName}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />

              {/* Before Image (Clipped by slider position via clipPath) */}
              <img
                src={currentCase.beforeImage}
                alt={`Avant - ${currentCase.treatmentName}`}
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              />

              {/* Badges on Top */}
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 pointer-events-none">
                Avant
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#9E6B55]/90 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20 pointer-events-none">
                Après
              </div>

              {/* Vertical Slider Line & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-xl pointer-events-none flex items-center justify-center"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="w-10 h-10 -ml-0.5 rounded-full bg-white text-[#9E6B55] shadow-2xl flex items-center justify-center border-2 border-[#9E6B55] font-bold text-xs pointer-events-auto cursor-grab active:cursor-grabbing">
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Instruction Hint */}
              <div className="absolute bottom-4 inset-x-0 text-center pointer-events-none">
                <span className="inline-block px-3 py-1 rounded-full bg-black/50 text-white text-[11px] backdrop-blur-md">
                  Glissez horizontalement pour comparer
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Clinical Dossier */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5D4CB] shadow-sm">
            <div className="inline-block px-3 py-1 rounded-full bg-[#F4DCD6] text-[#9E6B55] text-xs font-bold uppercase tracking-wider">
              {currentCase.treatmentCategory}
            </div>

            <h3 className="font-serif font-bold text-2xl text-stone-900">
              {currentCase.treatmentName}
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="text-stone-400 block text-[10px] uppercase">Patiente</span>
                <span className="font-semibold text-stone-800">{currentCase.patientAge}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <span className="text-stone-400 block text-[10px] uppercase">Protocole</span>
                <span className="font-semibold text-stone-800">{currentCase.sessionsCount}</span>
              </div>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed font-light">
              {currentCase.description}
            </p>

            {/* Doctor Note */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-[#E5D4CB] text-xs text-stone-700 space-y-1">
              <div className="font-bold text-[#9E6B55] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Note clinique de Dr. Ghaouat Sarra
              </div>
              <p className="italic">« {currentCase.doctorNotes} »</p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:from-[#d6ad8d] hover:to-[#8c5943] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre RDV pour ce Traitement</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
