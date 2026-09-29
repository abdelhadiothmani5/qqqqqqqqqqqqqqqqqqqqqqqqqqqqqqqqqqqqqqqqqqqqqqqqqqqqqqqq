'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Calendar,
  Clock,
  MapPin,
  Menu,
  X,
  ShieldCheck,
  Lock,
  ChevronRight
} from 'lucide-react';
import { ClinicSettings } from '@/lib/clinicData';
import { ClinicLogo } from '@/components/ClinicLogo';
import { ThemeToggle } from '@/components/ThemeToggle';
import headerLogoImg from '@/src/assets/images/regenerated_image_1790689939032.png';

interface NavbarProps {
  settings: ClinicSettings;
  onOpenBooking: (treatmentId?: string) => void;
  onOpenAdmin?: () => void;
  onOpenDashboard?: () => void;
  onReplayIntro?: () => void;
  onOpenIOSGuide?: () => void;
  onOpenInstall?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  onOpenBooking,
  onOpenAdmin,
  onOpenDashboard,
  onReplayIntro,
  onOpenIOSGuide,
  onOpenInstall,
}) => {
  const triggerAdmin = onOpenDashboard || onOpenAdmin || (() => {});
  const triggerInstall = onOpenInstall || onOpenIOSGuide;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [platformLabel] = useState(() => {
    if (typeof window === 'undefined') return 'Mobile';
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) return 'iPhone (iOS)';
    if (/android/.test(ua)) return 'Android';
    return 'Mobile';
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Accueil', href: '#hero' },
    { label: 'Tarification', href: '#tarification' },
    { label: 'Dr. Ghaouat', href: '#doctor' },
    { label: 'Avis & Témoignages', href: '#testimonials' },
    { label: 'Accès & Contact', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div id="announcement-bar" className="bg-[#1C1917] dark:bg-[#0B0908] text-[#FAF8F5] text-xs py-2 px-4 border-b border-[#C5A089]/20 dark:border-stone-800 relative z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#C5A089]/20 text-[#DFBA9D] font-medium text-[11px] border border-[#C5A089]/30">
              <Sparkles className="w-3 h-3 text-[#DFBA9D]" />
              Khemis Miliana
            </span>
            <span className="text-[#E7E5E4] dark:text-stone-300 font-light hidden md:inline">
              {settings.announcementText}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[12px]">
            <a
              href={`tel:${settings.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-1.5 text-[#FAF8F5] hover:text-[#DFBA9D] transition-colors"
              id="topbar-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFBA9D]" />
              <span className="font-medium">{settings.phone}</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <a
              href={`https://wa.me/${settings.whatsappPhone}?text=${encodeURIComponent("Bonjour Dr. Ghaouat, je souhaite me renseigner pour un rendez-vous.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#4ade80] hover:text-green-300 font-medium transition-colors"
              id="topbar-whatsapp-link"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Direct</span>
            </a>
            <span className="text-stone-600 hidden sm:inline">•</span>
            
            {/* Quick Theme Switcher in top announcement bar */}
            <div className="hidden sm:flex items-center">
              <ThemeToggle variant="compact" />
            </div>
            <span className="text-stone-600 hidden sm:inline">•</span>

            {onReplayIntro && (
              <>
                <button
                  onClick={onReplayIntro}
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DFBA9D]/20 hover:bg-[#DFBA9D]/35 text-[#DFBA9D] hover:text-white transition-all text-[11px] border border-[#DFBA9D]/30"
                  title="Revoir l'animation d'introduction nuageuse"
                  id="topbar-replay-intro"
                >
                  <Sparkles className="w-3 h-3 text-[#DFBA9D]" />
                  <span>Aperçu Intro</span>
                </button>
                <span className="text-stone-600 hidden sm:inline">•</span>
              </>
            )}
            <button
              onClick={triggerAdmin}
              className="flex items-center gap-1 text-stone-400 hover:text-[#DFBA9D] transition-colors text-[11px]"
              title="Portail Administration Clinique"
              id="nav-admin-link"
            >
              <Lock className="w-3 h-3" />
              <span>Espace Pro</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'glass-luxury dark:bg-[#141210]/92 dark:border-stone-800/80 shadow-md py-3 border-b border-[#E5D4CB]/60'
            : 'bg-[#FAF8F5]/90 dark:bg-[#0C0A09]/90 backdrop-blur-md py-4 border-b border-[#F0E3DC] dark:border-stone-800/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Doctor Title */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
            id="brand-logo"
          >
            <ClinicLogo
              size="sm"
              src={headerLogoImg}
              className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-105 transition-transform duration-300"
              alt="Logo officiel GH Clinic Dr. Ghaouat Sarra"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif font-bold text-xl sm:text-2xl text-[#1C1917] dark:text-[#FAF8F5] tracking-tight group-hover:text-[#C73859] dark:group-hover:text-[#F4C8D4] transition-colors">
                  GH CLINIC
                </span>
                <span className="hidden sm:inline-block text-[10px] font-serif uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950/70 text-[#9E2A50] dark:text-pink-300 border border-pink-200 dark:border-pink-900/50">
                  Médical
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium tracking-wide">
                Cabinet Médico-Esthétique • Dr. Ghaouat Sarra
              </p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6" id="desktop-navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-[#292524] dark:text-stone-300 hover:text-[#B38867] dark:hover:text-[#DFBA9D] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C5A089] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions: Theme Toggle & Booking Button */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Desktop Theme Switcher */}
            <ThemeToggle variant="icon" />

            {/* Book Appointment CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#C73859] via-[#D8436B] to-[#9E2A50] hover:brightness-105 text-white text-xs sm:text-sm font-serif font-bold tracking-wider shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] border border-pink-200/40"
              id="nav-book-appointment-button"
            >
              <span
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none animate-gh-sweep"
                aria-hidden="true"
              />
              <Calendar className="w-4 h-4 text-pink-200" />
              <span>Prendre Rendez-vous</span>
            </button>
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle variant="icon" />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white dark:bg-stone-800 border border-[#E5D4CB] dark:border-stone-700 text-[#1C1917] dark:text-stone-100"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden glass-luxury dark:bg-[#181513]/95 border-t border-[#E5D4CB] dark:border-stone-800 px-4 pt-4 pb-6 mt-3 space-y-3 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-pink-100 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <ClinicLogo size="sm" src={headerLogoImg} className="w-10 h-10" />
                <div>
                  <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 block">
                    GH CLINIC
                  </span>
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                    Dr. Ghaouat Sarra • Khemis Miliana
                  </span>
                </div>
              </div>

              {/* Mobile Theme Segmented Toggle */}
              <ThemeToggle variant="compact" />
            </div>

            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-stone-800 dark:text-stone-200 hover:bg-[#F4DCD6]/40 dark:hover:bg-stone-800 hover:text-[#B38867] dark:hover:text-[#DFBA9D] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-[#E5D4CB]/60 dark:border-stone-800 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-[#DFBA9D] via-[#C5A089] to-[#A87453] text-white font-semibold shadow-md active:scale-98 transition-transform"
                id="mobile-book-button"
              >
                <Calendar className="w-4 h-4" />
                <span>Prendre Rendez-vous en Ligne</span>
              </button>

              {triggerInstall && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    triggerInstall();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-stone-800/80 border border-[#DFBA9D]/40 text-[#9E6B55] dark:text-[#DFBA9D] font-semibold text-xs active:scale-98 transition-transform"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Installer l&apos;application sur {platformLabel}</span>
                </button>
              )}

              {onReplayIntro && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onReplayIntro();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white dark:bg-stone-800 border border-[#E5D4CB] dark:border-stone-700 text-stone-700 dark:text-stone-300 font-medium text-xs hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#9E6B55] dark:text-[#DFBA9D]" />
                  <span>Revoir l’animation d’introduction</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
