'use client';

import React from 'react';
import {
  Sparkles,
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  ShieldCheck,
  Award,
  Heart,
  Calendar,
  Lock
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';
import { ClinicLogo } from '@/components/ClinicLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import footerLogoImg from '@/src/assets/images/regenerated_image_1790689984841.png';

interface FooterProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
  onOpenDashboard: () => void;
  onReplayIntro?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onOpenBooking,
  onOpenDashboard,
  onReplayIntro,
}) => {
  return (
    <footer className="bg-[#1C1917] dark:bg-[#070605] text-white pt-16 pb-12 border-t border-stone-800 dark:border-stone-900 relative overflow-hidden transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#DFBA9D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pre-Footer Call to Action */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#292524] via-[#1C1917] to-[#292524] dark:from-[#151211] dark:via-[#100E0D] dark:to-[#151211] border border-stone-800 dark:border-stone-850 shadow-2xl mb-16 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#DFBA9D] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Consultation Privée & Sur-Mesure</span>
            </div>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Prête à révéler l’éclat naturel de votre visage ?
            </h3>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Dr. Ghaouat Sarra vous accueille dans son cabinet médical à Khemis Miliana pour un diagnostic précis et des résultats élégants.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#9E6B55] hover:from-[#d6ad8d] hover:to-[#8c5943] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Prendre Rendez-vous</span>
            </button>

            <a
              href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent("Bonjour Dr. Ghaouat, je souhaite me renseigner sur vos consultations.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-full bg-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/40 text-sm font-bold transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Main Footer Links & Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800 dark:border-stone-850">
          
          {/* Brand & Doctor Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <ClinicLogo
                size="md"
                src={footerLogoImg}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF8F5]/10 p-0.5"
                alt="Logo officiel GH Clinic"
              />
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  {settings.clinicName}
                </span>
                <span className="text-[11px] text-stone-400 font-light tracking-wide uppercase">
                  {settings.doctorName} • Khemis Miliana
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 font-light leading-relaxed max-w-sm">
              Cabinet d’excellence en médecine esthétique, laser médical et soins anti-âge à Khemis Miliana (Wilaya d’Aïn Defla). Sécurité, traçabilité médicale et résultats naturels.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-[#DFBA9D] hover:border-[#DFBA9D] flex items-center justify-center transition-colors"
                title="Instagram Dr. Ghaouat Sarra"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-[#1877F2] hover:border-[#1877F2] flex items-center justify-center transition-colors"
                title="Facebook Dr. Ghaouat Sarra"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-stone-900 border border-stone-800 text-stone-400 hover:text-emerald-400 hover:border-emerald-400 flex items-center justify-center transition-colors"
                title="Google Maps Location"
              >
                <MapPin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#DFBA9D] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#tarification" className="hover:text-white transition-colors">Soins & Protocoles</a>
              </li>
              <li>
                <a href="#tarification" className="hover:text-white transition-colors">Tarifs & Forfaits DZD</a>
              </li>
              <li>
                <a href="#doctor" className="hover:text-white transition-colors">Dr. Ghaouat Sarra</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">Questions Fréquentes</a>
              </li>
            </ul>
          </div>

          {/* Medical Protocols */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#DFBA9D] uppercase tracking-wider">
              Pôles d’Expertise
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>Épilation Laser Médicale</li>
              <li>Injections Botox & Baby Botox</li>
              <li>Acide Hyaluronique & Russian Lips</li>
              <li>Hydrafacial MD® Soin Visage</li>
              <li>Mésothérapie & Skinboosters</li>
              <li>PRP Cheveux & Visage</li>
            </ul>
          </div>

          {/* Location & Practice Hours */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#DFBA9D] uppercase tracking-wider">
              Cabinet & Contact
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#DFBA9D] shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#DFBA9D] shrink-0" />
                <span>{settings.phone}</span>
              </div>
              <div className="pt-2 text-[11px] text-stone-500">
                Sam – Mer : 09h00 – 18h00<br />
                Jeu : 09h00 – 17h00<br />
                Ven : Fermé
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright, Theme Switcher & Doctor Admin Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              © {new Date().getFullYear()} GH Clinic • Dr. Ghaouat Sarra. Tous droits réservés.
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Theme Toggle Pill in Footer */}
            <ThemeToggle variant="compact" />

            {onReplayIntro && (
              <button
                onClick={onReplayIntro}
                className="text-stone-400 hover:text-[#DFBA9D] transition-colors flex items-center gap-1.5 text-xs"
                title="Revoir l'introduction cinématique nuageuse"
                id="footer-replay-intro"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#DFBA9D]" />
                <span className="hidden sm:inline">Aperçu Intro</span>
              </button>
            )}

            <button
              onClick={onOpenDashboard}
              className="text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1 border border-stone-800 px-2.5 py-1 rounded-md"
              title="Accès réservé au personnel du cabinet"
            >
              <Lock className="w-3 h-3" />
              <span>Espace Médecin</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
