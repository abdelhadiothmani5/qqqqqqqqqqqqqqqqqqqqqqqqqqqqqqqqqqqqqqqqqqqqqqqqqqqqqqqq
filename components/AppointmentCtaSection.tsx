'use client';

import React from 'react';
import {
  Calendar,
  Phone,
  MapPin,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
} from 'lucide-react';
import { ClinicLogo } from '@/components/ClinicLogo';

interface AppointmentCtaSectionProps {
  onOpenBooking: (treatmentName?: string) => void;
  phone?: string;
  locationText?: string;
  locationDetails?: string;
  mapUrl?: string;
  doctorName?: string;
}

export const AppointmentCtaSection: React.FC<AppointmentCtaSectionProps> = ({
  onOpenBooking,
  phone = '0663419994',
  locationText = 'Hai el salem',
  locationDetails = '(à coté de Sonelgaz)',
  mapUrl = 'https://www.google.com/maps/place/Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA/',
  doctorName = 'Dr Ghaouat Sarra',
}) => {
  return (
    <div
      id="appointment-cta-luxury-section"
      className="relative w-full max-w-5xl mx-auto rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-12 shadow-2xl border border-pink-300/80 dark:border-stone-800 overflow-hidden transition-all duration-500 bg-gradient-to-br from-white via-[#FFF6F8] to-[#FCE8ED] dark:from-[#181513] dark:via-[#1A1615] dark:to-[#151211]"
    >
      {/* Decorative Organic Ambient Shapes & Line Art */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-200/40 dark:bg-pink-950/20 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-rose-200/30 dark:bg-rose-950/20 rounded-full blur-3xl pointer-events-none -z-0" />
      
      {/* Delicate Curved Vector Accents */}
      <svg
        className="absolute top-0 right-0 w-96 h-96 text-pink-300/20 dark:text-pink-900/30 pointer-events-none -z-0"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="100" r="180" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
        <circle cx="300" cy="100" r="140" stroke="currentColor" strokeWidth="1" />
        <path d="M150 20C220 80 320 120 400 100" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* ========================================================================= */}
        {/* LEFT SIDE: Eyebrow, Heading, Description, Actions & Reassurance           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* 1. Small Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-stone-900/90 border border-pink-200/90 dark:border-pink-900/50 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-300" />
            <span className="text-[11px] sm:text-xs font-serif font-bold uppercase tracking-widest text-[#9E2A50] dark:text-pink-300">
              PRENEZ RENDEZ-VOUS
            </span>
          </div>

          {/* 2. Large Elegant Heading */}
          <h3 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 dark:text-[#FAF8F5] tracking-tight leading-[1.15]">
            Votre beauté, <br />
            <span className="italic font-normal bg-gradient-to-r from-[#C73859] via-[#E58C9D] to-[#DFBA9D] dark:from-[#F4C8D4] dark:via-[#DFBA9D] dark:to-[#E58C9D] bg-clip-text text-transparent">
              notre expertise.
            </span>
          </h3>

          {/* 3. Supporting Text */}
          <p className="text-stone-600 dark:text-stone-300 font-light text-sm sm:text-base leading-relaxed max-w-lg">
            Prenez rendez-vous avec le {doctorName} pour bénéficier d’une prise en charge personnalisée dans un cadre médical et confidentiel.
          </p>

          {/* 4. Action Buttons (Primary CTA + Phone Action) */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
            
            {/* Primary CTA Button */}
            <button
              onClick={() => onOpenBooking('consultation')}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 active:scale-98 text-white font-serif tracking-widest text-xs sm:text-sm uppercase font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border border-pink-200/40 group"
              id="luxury-cta-book-btn"
            >
              <Calendar className="w-4 h-4 text-pink-200 group-hover:rotate-6 transition-transform" />
              <span>PRENDRE RENDEZ-VOUS</span>
              <ArrowRight className="w-4 h-4 text-pink-200 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary Action: Call Cabinet */}
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-white/95 dark:bg-stone-800/90 hover:bg-white dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 hover:text-[#C73859] dark:hover:text-[#DFBA9D] border border-pink-200/90 dark:border-stone-700 hover:border-pink-300 font-serif font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 active:scale-98 group"
              id="luxury-cta-call-btn"
            >
              <Phone className="w-4 h-4 text-[#C73859] dark:text-[#DFBA9D] group-hover:scale-110 transition-transform" />
              <span>APPELER LE CABINET</span>
            </a>
          </div>

          {/* 5. Trust / Medical Reassurance Line */}
          <div className="flex items-center gap-2 pt-1 text-stone-600 dark:text-stone-400">
            <div className="w-5 h-5 rounded-full bg-pink-100 dark:bg-pink-950 flex items-center justify-center text-[#C73859] dark:text-pink-300 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <p className="text-xs sm:text-sm font-serif italic text-stone-600 dark:text-stone-300">
              Une prise en charge personnalisée par des professionnels de santé.
            </p>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT SIDE: Compact Appointment Information Panel                        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 w-full">
          <div
            className="w-full rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-[#1C1917]/95 backdrop-blur-md border border-pink-200/90 dark:border-stone-700/80 p-6 sm:p-7 shadow-lg relative overflow-hidden space-y-5"
          >
            {/* Top decorative pink accent line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-pink-300 via-[#C73859] to-pink-300 dark:from-pink-900/40 dark:via-[#C73859] dark:to-pink-900/40" />

            {/* Header: Clinic Identity & Doctor Name */}
            <div className="border-b border-pink-100/90 dark:border-stone-800 pb-4 flex items-center gap-3">
              <ClinicLogo
                size="sm"
                className="w-12 h-12 shrink-0"
                alt="Logo officiel GH Clinic"
              />
              <div>
                <span className="font-serif font-bold text-[11px] tracking-widest text-[#9E2A50] dark:text-pink-300 uppercase block">
                  GH CLINIC
                </span>
                <h4 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5] mt-0.5">
                  {doctorName}
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic mt-0.5">
                  Cabinet Médico-Esthétique & Lasers
                </p>
              </div>
            </div>

            {/* Contact Items List */}
            <div className="space-y-3.5 font-serif">
              
              {/* Phone Action Card */}
              <a
                href={`tel:${phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FFF5F7]/80 dark:bg-stone-900/80 hover:bg-[#FFF5F7] dark:hover:bg-stone-800 border border-pink-200/70 dark:border-stone-700 hover:border-pink-300 dark:hover:border-stone-600 transition-all duration-300 group"
                id="luxury-cta-info-phone"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-2xs border border-pink-200 dark:border-stone-700 flex items-center justify-center text-[#C73859] dark:text-pink-300 shrink-0 group-hover:scale-105 group-hover:bg-[#C73859] group-hover:text-white transition-all">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E2A50] dark:text-[#DFBA9D] block">
                    Téléphone direct
                  </span>
                  <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-100 tracking-wide block group-hover:text-[#C73859] dark:group-hover:text-[#DFBA9D] transition-colors">
                    {phone}
                  </span>
                </div>
              </a>

              {/* Location Card */}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3.5 p-3 rounded-2xl bg-[#FFF5F7]/80 dark:bg-stone-900/80 hover:bg-[#FFF5F7] dark:hover:bg-stone-800 border border-pink-200/70 dark:border-stone-700 hover:border-pink-300 dark:hover:border-stone-600 transition-all duration-300 group"
                id="luxury-cta-info-location"
              >
                <div className="w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-2xs border border-pink-200 dark:border-stone-700 flex items-center justify-center text-[#C73859] dark:text-pink-300 shrink-0 group-hover:scale-105 group-hover:bg-[#C73859] group-hover:text-white transition-all mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#9E2A50] dark:text-[#DFBA9D] block">
                    Localisation
                  </span>
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug group-hover:text-[#C73859] dark:group-hover:text-[#DFBA9D] transition-colors">
                    {locationText}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 font-normal">
                    {locationDetails}
                  </p>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400 font-serif italic block mt-0.5">
                    Khemis Miliana • Aïn Defla
                  </span>
                </div>
              </a>

            </div>

            {/* Opening Hours Footer Badge */}
            <div className="pt-2 border-t border-pink-100/90 dark:border-stone-800 flex items-center gap-2 text-[11px] text-stone-600 dark:text-stone-400 font-serif">
              <Clock className="w-3.5 h-3.5 text-[#C73859] dark:text-pink-300 shrink-0" />
              <span>Samedi – Jeudi : 09h00 – 18h00 (Sur rendez-vous)</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AppointmentCtaSection;
