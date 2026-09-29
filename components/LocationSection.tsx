'use client';

import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Navigation,
  Calendar,
  ExternalLink,
  Car,
  ShieldCheck
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';

interface LocationSectionProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  settings,
  onOpenBooking,
}) => {
  return (
    <section id="location" className="py-20 bg-[#FAF8F5] dark:bg-[#0C0A09] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900/90 border border-[#E5D4CB] dark:border-stone-800 shadow-xs">
            <MapPin className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9E6B55] dark:text-[#DFBA9D]">
              Accès & Coordonnées
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] dark:text-[#FAF8F5] tracking-tight">
            Venir au Cabinet à Khemis Miliana
          </h2>

          <p className="text-stone-600 dark:text-stone-300 font-light text-base sm:text-lg leading-relaxed">
            Situé au cœur de Khemis Miliana (Wilaya d’Aïn Defla), le cabinet de Dr. Ghaouat Sarra est facilement accessible avec stationnement aisé.
          </p>
        </div>

        {/* Location & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Contact Cards & Practical Info */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            
            {/* Address Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181513] border border-[#E5D4CB] dark:border-stone-800 shadow-xs space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4DCD6] dark:bg-stone-800 text-[#9E6B55] dark:text-[#DFBA9D] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-xl text-stone-900 dark:text-[#FAF8F5]">
                    Adresse du Cabinet
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 font-light leading-relaxed">
                    {settings.address}
                  </p>
                  <p className="text-xs font-semibold text-[#9E6B55] dark:text-[#DFBA9D]">
                    {settings.city}, Wilaya d’{settings.wilaya}
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <a
                  href={settings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-[#1C1917] dark:bg-stone-800 text-white text-xs font-semibold hover:bg-stone-800 dark:hover:bg-stone-700 transition-colors flex items-center gap-1.5 border border-transparent dark:border-stone-700"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#DFBA9D]" />
                  <span>Ouvrir dans Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Opening Hours Schedule */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#181513] border border-[#E5D4CB] dark:border-stone-800 shadow-xs space-y-4">
              <div className="flex items-center gap-3 text-stone-900 dark:text-[#FAF8F5] font-serif font-bold text-lg">
                <Clock className="w-5 h-5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                <span>Horaires de Consultation</span>
              </div>

              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-medium text-stone-700 dark:text-stone-300">Samedi – Mercredi</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">09h00 – 18h00</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-stone-100 dark:border-stone-800">
                  <span className="font-medium text-stone-700 dark:text-stone-300">Jeudi</span>
                  <span className="font-bold text-stone-900 dark:text-stone-100">09h00 – 17h00</span>
                </div>
                <div className="flex items-center justify-between py-2 text-stone-400">
                  <span>Vendredi</span>
                  <span className="text-rose-600 dark:text-rose-400 font-semibold">Fermé (Repos hebdomadaire)</span>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 dark:text-stone-400 bg-[#FAF8F5] dark:bg-stone-900 p-3 rounded-xl border border-[#E5D4CB]/60 dark:border-stone-800">
                Sur rendez-vous uniquement pour garantir votre intimité et zéro temps d’attente en salon.
              </div>
            </div>

            {/* Direct Instant Contact Channels */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-[#DFBA9D]/30 via-[#F4DCD6]/40 to-white dark:from-stone-900 dark:via-stone-900/80 dark:to-[#181513] border border-[#E5D4CB] dark:border-stone-800 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Contact & Urgences</div>
                <div className="text-xs text-stone-600 dark:text-stone-400">{settings.phone}</div>
              </div>

              <a
                href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent("Bonjour Dr. Ghaouat, je souhaite prendre rendez-vous au cabinet.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Preview & Route Guidance */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border-4 border-white dark:border-stone-800 bg-white dark:bg-stone-900 relative min-h-[420px] flex flex-col">
            
            {/* Map iframe */}
            <div className="relative flex-1 w-full min-h-[350px] bg-stone-200 dark:bg-stone-800">
              <iframe
                title="Google Maps GH Clinic Dr Ghaouat Sarra Khemis Miliana"
                src="https://maps.google.com/maps?q=Cabinet+m%C3%A9dico-%C3%A9sthetique+DOCTEUR+GHAOUAT+SARRA+Khemis+Miliana&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="absolute inset-0 border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Floating clinic pointer info card */}
              <div className="absolute top-4 left-4 glass-card dark:bg-stone-900/90 dark:border-stone-700 p-4 rounded-2xl shadow-xl max-w-xs border border-white/90">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#DFBA9D] to-[#9E6B55] text-white flex items-center justify-center font-bold text-xs">
                    GH
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 dark:text-stone-100">Cabinet Dr. Ghaouat Sarra</div>
                    <div className="text-[10px] text-stone-500 dark:text-stone-400">Khemis Miliana • Aïn Defla</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Tips Footer */}
            <div className="p-4 sm:p-5 bg-white dark:bg-stone-900 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 dark:text-stone-300">
              <div className="flex items-center gap-2">
                <Car className="w-4 h-4 text-[#9E6B55] dark:text-[#DFBA9D]" />
                <span>À 45 min de Blida / Chlef • Autoroute Est-Ouest</span>
              </div>

              <button
                onClick={onOpenBooking}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] text-white font-semibold text-xs shadow-xs hover:shadow-md transition-all"
              >
                Bloquer mon créneau
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
